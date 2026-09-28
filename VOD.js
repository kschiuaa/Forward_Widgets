var WidgetMetadata = {
  id: "dytt_vod",
  title: "在線影視搜索",
  description: "基於MacCMS API的VOD資源",
  author: "Ethan",
  version: "2.1.0",
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
  if (tName.indexOf("劇") !== -1 || tName.indexOf("綜") !== -1 || tName.indexOf("漫") !== -1) return true;
  if (remarks.indexOf("集") !== -1 || remarks.indexOf("期") !== -1) return true;
  return false;
}

// 核心：搜尋
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
      mediaType: isTv ? "tv" : "movie", 
      durationText: item.vod_remarks || "更新中",
      description: item.vod_blurb || item.vod_content || "暫無簡介"
    });
  }
  return results;
}

// 核心：載入詳情與播放列表 (修正參數崩潰問題)
async function loadDetail(params) {
  // 【關鍵修復】: 解析 Forward 傳遞進來的 Object 參數
  var link = typeof params === 'object' ? (params.id || params.link) : params;

  // 處理點擊集數時的直鏈播放
  if (typeof link === 'string' && link.indexOf("play://") === 0) {
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
  var firstEpisodes = [];
  var totalEpisodesCount = 0;

  // 解析 MacCMS 線路與集數格式
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
        var epNumMatch = epName.match(/\d+/);
        var epIndex = epNumMatch ? parseInt(epNumMatch[0], 10) : (j + 1);
        totalEpisodesCount++;
        
        currentEpisodes.push({
          id: videoUrl,
          title: epName,
          name: epName,
          url: videoUrl,
          videoUrl: videoUrl, // 提供直接播放連結
          link: "play://" + videoUrl, 
          seasonNumber: 1,
          episodeNumber: epIndex
        });
      }
    }
    
    if (i === 0) firstEpisodes = currentEpisodes; // 記錄第一條線路的集數
    
    // 【關鍵修復】: 增加 Forward 支援的 sources 結構
    playlistsData.push({
      id: sourceName,
      name: sourceName,
      title: sourceName,
      episodes: currentEpisodes, 
      list: currentEpisodes      
    });
  }

  var rawDescription = item.vod_blurb || item.vod_content || "暫無簡介";
  var cleanDescription = rawDescription.replace(/<[^>]+>/g, '').trim();
  
  var isTv = checkIsTvShow(item) || totalEpisodesCount > 1;

  // 返回給 Forward 的最終資料格式
  return {
    id: link,
    type: "detail",
    videoUrl: firstVideoUrl,         // 預設播放地址 (電影用)
    mediaType: isTv ? "tv" : "movie", 
    title: item.vod_name,
    description: cleanDescription,
    
    // Forward / Rex 常見識別多線路與集數的陣列欄位 (全上確保相容)
    episodes: firstEpisodes,         // 頂層集數陣列 (部分播放器需此欄位)
    sources: playlistsData,          // "播放資源" 模塊
    playlists: playlistsData,        // 備用
    playlist: playlistsData          // 備用
  };
}

// 為了相容部分版本的 Forward 呼叫約定，加入 detail 指向
var detail = loadDetail; 