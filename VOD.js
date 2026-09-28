var WidgetMetadata = {
  id: "dytt_vod",
  title: "電影天堂 (MacCMS)",
  description: "基於MacCMS API的在線VOD影視資源",
  author: "Ethan",
  version: "2.0.1",
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

// ==========================================
// 若要製作其他影視源，只需修改下方的 API 網址
// ==========================================
var MAC_CMS_URL = "http://caiji.dyttzyapi.com/api.php/provide/vod/";

// 輔助函數：精準判斷是否為電視劇或綜藝
function checkIsTvShow(item) {
  var tName = item.type_name || "";
  var remarks = item.vod_remarks || "";
  // 如果分類名稱有劇、綜藝、動漫，或是備註裡寫著「集」、「期」，就認定是 TV 模式 (支援選集)
  if (tName.indexOf("劇") !== -1 || tName.indexOf("綜") !== -1 || tName.indexOf("漫") !== -1) return true;
  if (remarks.indexOf("集") !== -1 || remarks.indexOf("期") !== -1) return true;
  return false;
}

// 核心函數：搜尋影片
async function search(params) {
  params = params || {};
  var keyword = encodeURIComponent(params.keyword || "");
  var page = params.page || "1";
  var url = MAC_CMS_URL + "?ac=detail&wd=" + keyword + "&pg=" + page;
  
  try {
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
        link: item.vod_id.toString(), // 傳遞給 loadDetail 的參數
        mediaType: isTv ? "tv" : "movie", 
        durationText: item.vod_remarks || "更新中",
        description: item.vod_blurb || item.vod_content || "暫無簡介"
      });
    }
    return results;
  } catch (error) {
    throw new Error("搜尋失敗，請檢查網路或源站狀態: " + error.message);
  }
}

// 核心函數：載入影片詳細資訊與播放清單
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
  
  try {
    var response = await Widget.http.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15"
      }
    });
    
    var data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
    var item = data.list[0];
    if (!item) throw new Error("無法獲取影片資料，可能已被刪除");

    var playUrlStr = item.vod_play_url || "";
    var sourceGroups = playUrlStr.split("$$$");
    var sourceNames = (item.vod_play_from || "").split("$$$");
    
    var firstVideoUrl = "";
    var playlistsData = []; 
    var totalEpisodesCount = 0;

    // 解析 MacCMS 多線路與多集數格式
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
          
          // 提取數字供 TMDB 或進度配對
          var epNumMatch = epName.match(/\d+/);
          var epIndex = epNumMatch ? parseInt(epNumMatch[0], 10) : (j + 1);
          totalEpisodesCount++;
          
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
      
      // 將線路加入播放清單中
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
    var cleanDescription = rawDescription.replace(/<[^>]+>/g, '').trim(); // 清除 HTML 標籤
    
    // 再次確保判斷是否為 TV 模式 (集數 > 1 強制轉為 TV 介面)
    var isTv = checkIsTvShow(item) || totalEpisodesCount > 1;

    return {
      id: link,
      type: "detail",
      videoUrl: firstVideoUrl,
      mediaType: isTv ? "tv" : "movie", 
      title: item.vod_name,
      description: cleanDescription,
      playlists: playlistsData, 
      playlist: playlistsData
    };
  } catch (error) {
    throw new Error("載入詳情失敗: " + error.message);
  }
}