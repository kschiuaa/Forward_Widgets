WidgetMetadata = {
  id: "dytt_vod",
  title: "在線影視搜索",
  description: "基於MacCMS API的VOD資源",
  author: "Ethan",
  version: "2.0.0",
  requiredVersion: "0.0.1",
  detailCacheDuration: 60,
  modules: [
    {
      title: "影片搜尋",
      description: "搜尋影片資源",
      requiresWebView: false,
      functionName: "search",
      cacheDuration: 3600,
      params: [
        {
          name: "keyword",
          title: "關鍵詞",
          type: "input",
          description: "請輸入影片名稱"
        },
        {
          name: "page",
          title: "頁碼",
          type: "page",
          description: "頁碼",
          value: "1"
        }
      ]
    }
  ]
};

var MAC_CMS_URL = "http://caiji.dyttzyapi.com/api.php/provide/vod/";

// 輔助函數：精準判斷是否為電視劇或綜藝
function checkIsTvShow(item) {
  var tName = item.type_name || "";
  var remarks = item.vod_remarks || "";
  // 如果分類名稱有劇、綜藝、動漫，或是備註裡寫著「集」、「期」，就認定是 TV
  if (tName.indexOf("劇") !== -1 || tName.indexOf("綜") !== -1 || tName.indexOf("漫") !== -1) return true;
  if (remarks.indexOf("集") !== -1 || remarks.indexOf("期") !== -1) return true;
  return false;
}

async function search(params) {
  params = params || {};
  var keyword = encodeURIComponent(params.keyword || "");
  var page = params.page || "1";
  var url = MAC_CMS_URL + "?ac=detail&wd=" + keyword + "&pg=" + page;
  
  var response = await Widget.http.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15"
    }
  });
  
  var data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
  var list = data.list || [];
  var results = [];
  
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var isTv = checkIsTvShow(item);
    
    results.push({
      id: item.vod_id.toString(),
      type: "url",
      title: item.vod_name,
      backdropPath: item.vod_pic,
      previewUrl: item.vod_pic,
      link: item.vod_id.toString(),
      // 【關鍵修正】：在搜尋結果就必須正確標記 "tv" 或 "movie"
      mediaType: isTv ? "tv" : "movie", 
      durationText: item.vod_remarks || "更新中",
      description: item.vod_blurb || item.vod_content || "暫無簡介"
    });
  }
  return results;
}

async function loadDetail(link) {
  // 處理點擊集數時的直鏈播放
  if (link && link.indexOf("play://") === 0) {
    return {
      id: link,
      type: "detail",
      videoUrl: link.replace("play://", ""),
      mediaType: "movie"
    };
  }

  var url = MAC_CMS_URL + "?ac=detail&ids=" + link;
  var response = await Widget.http.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15"
    }
  });
  
  var data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
  var item = data.list[0];
  if (!item) throw new Error("無法獲取影片資料");

  var playUrlStr = item.vod_play_url || "";
  var sourceGroups = playUrlStr.split("$$$");
  var sourceNames = (item.vod_play_from || "").split("$$$");
  
  var firstVideoUrl = "";
  var playlistsData = []; 
  var totalEpisodesCount = 0;

  // 完美建構 Forward 支援的 playlists (包含多線路與集數)
  for (var i = 0; i < sourceGroups.length; i++) {
    var group = sourceGroups[i];
    if (!group) continue;
    
    var sourceName = sourceNames[i] || "線路" + (i + 1);
    var parts = group.split("#");
    var currentEpisodes = [];
    
    for (var j = 0; j < parts.length; j++) {
      var part = parts[j];
      var splitPart = part.split("$");
      var epName = splitPart[0] || ("第" + (j + 1) + "集");
      var videoUrl = splitPart[1];
      
      if (videoUrl) {
        if (!firstVideoUrl) firstVideoUrl = videoUrl;
        
        // 提取數字供 TMDB 配對
        var epNumMatch = epName.match(/\d+/);
        var epIndex = epNumMatch ? parseInt(epNumMatch[0], 10) : (j + 1);
        totalEpisodesCount++;
        
        // 【關鍵】將所有 Forward 可能讀取的集數變數全部寫入，確保 100% 觸發
        currentEpisodes.push({
          id: videoUrl,
          title: epName,
          name: epName,
          url: videoUrl,
          videoUrl: videoUrl,
          link: "play://" + videoUrl,
          seasonNumber: 1,
          episodeNumber: epIndex
        });
      }
    }
    
    // 【關鍵】將所有 Forward 可能讀取的線路變數全部寫入
    playlistsData.push({
      id: sourceName,
      title: sourceName,
      name: sourceName,
      episodes: currentEpisodes, // 相容 TMDB 模式
      items: currentEpisodes,    // 相容純列表模式
      list: currentEpisodes      // 相容舊版模式
    });
  }

  var rawDescription = item.vod_blurb || item.vod_content || "暫無簡介";
  var cleanDescription = rawDescription.replace(/<[^>]+>/g, '').trim();
  
  // 判斷是否為 TV 模式
  var tName = item.type_name || "";
  var remarks = item.vod_remarks || "";
  var isTv = (tName.indexOf("劇") !== -1 || tName.indexOf("綜") !== -1 || tName.indexOf("漫") !== -1 || remarks.indexOf("集") !== -1 || remarks.indexOf("期") !== -1) || totalEpisodesCount > 1;

  return {
    id: link,
    type: "detail",
    videoUrl: firstVideoUrl,
    mediaType: isTv ? "tv" : "movie", 
    title: item.vod_name,
    description: cleanDescription,
    
    // 將整理好的多線路/多集數資料交給 Forward
    playlists: playlistsData, 
    playlist: playlistsData
  };
}
