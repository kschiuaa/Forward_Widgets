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
  var sourceNames = (item.vod_play_from || "").split("$$$");
  
  var firstVideoUrl = "";
  var episodesList = [];
  var playlist = [];

  // 解析多線路與多集數
  for (var i = 0; i < sourceGroups.length; i++) {
    var group = sourceGroups[i];
    if (!group) continue;
    
    var sourceName = sourceNames[i] || "線路" + (i + 1);
    var parts = group.split("#");
    var currentSourceEpisodes = [];
    
    for (var j = 0; j < parts.length; j++) {
      var part = parts[j];
      var splitPart = part.split("$");
      var epName = splitPart[0];
      var videoUrl = splitPart[1];
      
      if (videoUrl) {
        if (!firstVideoUrl) {
          firstVideoUrl = videoUrl;
        }
        
        // 構建單集物件 (多種鍵值命名以相容 Forward 底層的不同解析)
        var epObj = {
          id: videoUrl,
          name: epName,
          title: epName,
          url: videoUrl,
          videoUrl: videoUrl
        };
        currentSourceEpisodes.push(epObj);
        episodesList.push(epObj);
      }
    }
    
    // 按線路分組的播放列表
    playlist.push({
      name: sourceName,
      title: sourceName,
      episodes: currentSourceEpisodes
    });
  }

  // 清理 HTML 標籤，讓簡介乾淨顯示
  var rawDescription = item.vod_blurb || item.vod_content || "暫無簡介";
  var cleanDescription = rawDescription.replace(/<[^>]+>/g, '').trim();
  
  // 動態判斷：超過1集就告訴 Forward 這是 TV 劇集，觸發選集 UI
  var isTvShow = episodesList.length > 1;

  return {
    id: link,
    type: "detail",
    videoUrl: firstVideoUrl,
    mediaType: isTvShow ? "tv" : "movie", 
    title: item.vod_name,
    description: cleanDescription,
    
    // 輸出三種最常見的影視 App 陣列格式，確保 Forward 能抓到集數
    episodes: episodesList, 
    playlist: playlist,
    seasons: [{
      seasonNumber: 1,
      episodes: episodesList
    }]
  };
}
