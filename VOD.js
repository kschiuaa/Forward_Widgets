var WidgetMetadata = {
  id: "dytt_vod",
  title: "在線影視搜索",
  description: "基於MacCMS API的VOD資源",
  author: "Ethan",
  version: "3.0.0",
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
    },
    // 【關鍵修正 1】：在模塊中明確註冊 detail 函數，告訴 Forward 點擊後要執行誰
    {
      title: "影片詳情",
      description: "載入影片播放清單",
      requiresWebView: false,
      functionName: "detail"
    }
  ]
};

var MAC_CMS_URL = "http://caiji.dyttzyapi.com/api.php/provide/vod/";

function checkIsTvShow(item) {
  var tName = item.type_name || "";
  var remarks = item.vod_remarks || "";
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
      // 【關鍵修正 2】：不可以使用 type: "url"，這會導致 Forward 把結果當成網頁而不是影片詳情
      type: "detail", 
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

// 【關鍵修正 3】：明確將函數命名為 detail，因為 WidgetMetadata 中宣告的是 detail
async function detail(params) {
  try {
    // 取得要解析的影片 ID
    var link = "";
    if (typeof params === 'object') {
      link = params.id || params.link || "";
    } else {
      link = params;
    }
    
    if (!link) {
      throw new Error("無法取得影片 ID");
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
    
    var playlistsData = []; 
    var totalEpisodesCount = 0;

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
          var epNumMatch = epName.match(/\d+/);
          var epIndex = epNumMatch ? parseInt(epNumMatch[0], 10) : (j + 1);
          totalEpisodesCount++;
          
          currentEpisodes.push({
            id: videoUrl,
            title: epName,
            name: epName,
            // 【關鍵修正 4】：Forward 的直鏈播放識別欄位通常是 url 或 videoUrl
            url: videoUrl,
            videoUrl: videoUrl, 
            seasonNumber: 1,
            episodeNumber: epIndex
          });
        }
      }
      
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

    // 【關鍵修正 5】：嚴格遵守 Forward 的返回值結構
    return {
      id: link,
      type: "detail",
      title: item.vod_name,
      description: cleanDescription,
      mediaType: isTv ? "tv" : "movie", 
      backdropPath: item.vod_pic,
      previewUrl: item.vod_pic,
      // 直接把整理好的資料放到 playlists 陣列裡
      playlists: playlistsData,
      sources: playlistsData
    };
    
  } catch (err) {
    // 如果發生錯誤，至少回傳基本結構與錯誤訊息，避免白屏或無限轉圈
    return {
      id: params.id || params,
      type: "detail",
      title: "載入失敗",
      description: err.toString(),
      playlists: [],
      sources: []
    };
  }
}