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

async function search(params) {
  params = params || {};
  var keyword = encodeURIComponent(params.keyword || "");
  var page = params.page || "1";
  var url = "http://caiji.dyttzyapi.com/api.php/provide/vod/?ac=detail&wd=" + keyword + "&pg=" + page;
  
  var response = await Widget.http.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15"
    }
  });
  
  var data = JSON.parse(response.data);
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
  // 如果點擊了相關集數，直接返回播放直鏈
  if (link && link.indexOf("play://") === 0) {
    return {
      id: link,
      type: "detail",
      videoUrl: link.replace("play://", ""),
      mediaType: "movie"
    };
  }

  var url = "http://caiji.dyttzyapi.com/api.php/provide/vod/?ac=detail&ids=" + link;
  var response = await Widget.http.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15"
    }
  });
  
  var data = JSON.parse(response.data);
  var item = data.list[0];
  if (!item) throw new Error("無法獲取影片資料");

  var playUrlStr = item.vod_play_url || "";
  var sourceGroups = playUrlStr.split("$$$");
  var sourceNames = (item.vod_play_from || "").split("$$$");
  
  var firstVideoUrl = "";
  var episodes = [];

  for (var i = 0; i < sourceGroups.length; i++) {
    var group = sourceGroups[i];
    var sourceName = sourceNames[i] || "線路" + (i + 1);
    var parts = group.split("#");
    
    for (var j = 0; j < parts.length; j++) {
      var part = parts[j];
      var splitPart = part.split("$");
      var epName = splitPart[0];
      var videoUrl = splitPart[1];
      
      if (videoUrl) {
        if (!firstVideoUrl) {
          firstVideoUrl = videoUrl;
        }
        episodes.push({
          id: "play://" + videoUrl,
          type: "url",
          title: sourceName + " - " + epName,
          backdropPath: item.vod_pic,
          link: "play://" + videoUrl,
          mediaType: "movie",
          description: epName
        });
      }
    }
  }

  return {
    id: link,
    type: "detail",
    videoUrl: firstVideoUrl,
    mediaType: "movie",
    title: item.vod_name,
    description: item.vod_content,
    childItems: episodes
  };
}
