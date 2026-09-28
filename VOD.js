WidgetMetadata = {
  id: "dytt_vod",
  title: "在線影視搜索",
  description: "基於MacCMS API的VOD資源",
  author: "Ethan",
  version: "1.0.0",
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
  
  // 判斷 response.data 是否已被 Forward 底層自動解析為 Object
  var data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
  
  var list = data.list || [];
  var results = [];
  
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    results.push({
      id: item.vod_id.toString(),
      type: "url",
      title: item.vod_name,
      backdropPath: item.vod_pic,
      previewUrl: item.vod_pic,
      link: item.vod_id.toString(),
      mediaType: "movie",
      durationText: item.vod_remarks || "更新中",
      description: item.vod_blurb || item.vod_content || "暫無簡介"
    });
  }
  return results;
}

async function loadDetail(link) {
  // 攔截集數點擊，直接返回播放器直鏈
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
  
  var firstVideoUrl = "";
  var seasons = [];
  var totalEpisodes = 0;

  // 為了適配 TMDB，我們通常取第一個有效線路作為 Season 1 寫入
  if (sourceGroups.length > 0 && sourceGroups[0]) {
    var parts = sourceGroups[0].split("#");
    var currentSourceEpisodes = [];
    
    for (var j = 0; j < parts.length; j++) {
      var part = parts[j];
      var splitPart = part.split("$");
      var epName = splitPart[0];
      var videoUrl = splitPart[1];
      
      if (videoUrl) {
        if (!firstVideoUrl) firstVideoUrl = videoUrl;
        
        // 【關鍵】：從「第43集」、「20261004期」等字串中提取數字
        // 如果提取不到數字，則默認使用陣列索引 (j+1)
        var epNumMatch = epName.match(/\d+/);
        var epIndex = epNumMatch ? parseInt(epNumMatch[0], 10) : (j + 1);
        
        totalEpisodes++;

        currentSourceEpisodes.push({
          id: "play://" + videoUrl,
          title: epName,           // 顯示名稱 (例如: 第43集)
          videoUrl: videoUrl,      // 實際播放連結
          link: "play://" + videoUrl,
          seasonNumber: 1,         // TMDB 綁定需要：第 1 季
          episodeNumber: epIndex   // TMDB 綁定需要：第 N 集
        });
      }
    }
    
    // 構建 Forward 預期的 seasons 結構
    seasons.push({
      seasonNumber: 1,
      title: "第1季",
      episodes: currentSourceEpisodes
    });
  }

  var rawDescription = item.vod_blurb || item.vod_content || "暫無簡介";
  var cleanDescription = rawDescription.replace(/<[^>]+>/g, '').trim();
  
  // 判斷是否為影集/綜藝：集數大於1，或是分類名稱包含劇/綜藝
  var isTvShow = totalEpisodes > 1 || (item.type_name && (item.type_name.indexOf("劇") !== -1 || item.type_name.indexOf("綜藝") !== -1));

  return {
    id: link,
    type: "detail",
    videoUrl: firstVideoUrl,
    mediaType: isTvShow ? "tv" : "movie", 
    title: item.vod_name,
    description: cleanDescription,
    // 傳入結構化的 seasons，Forward 就能自動點亮 image_5.png 裡的資源
    seasons: seasons 
  };
}
