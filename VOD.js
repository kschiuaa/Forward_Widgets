var WidgetMetadata = {
  id: "dytt_vod",
  title: "電影天堂 (MacCMS)",
  description: "基於MacCMS API的VOD資源",
  author: "Ethan",
  version: "4.0.0",
  requiredVersion: "0.0.1",
  modules: [
    {
      title: "影片搜尋",
      description: "搜尋影片資源",
      requiresWebView: false,
      functionName: "search",
      params: [
        { name: "keyword", title: "關鍵詞", type: "input", description: "請輸入影片名稱" },
        { name: "page", title: "頁碼", type: "page", description: "頁碼", value: "1" }
      ]
    },
    {
      title: "影片詳情",
      description: "載入影片播放清單",
      requiresWebView: false,
      functionName: "detail"
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
    headers: { "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15" }
  });
  
  var data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
  var list = data.list || [];
  var results = [];
  
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    
    results.push({
      id: item.vod_id.toString(),
      // 雙重保險：不同版本的 Forward 可能吃 url, link 或 id 作為傳遞參數
      url: item.vod_id.toString(), 
      link: item.vod_id.toString(),
      type: "detail", 
      title: item.vod_name,
      picture: item.vod_pic,
      image: item.vod_pic,
      desc: item.vod_remarks,
      description: item.vod_blurb || item.vod_content || "暫無簡介"
    });
  }
  return results;
}

async function detail(params) {
  try {
    // 獲取前一頁傳遞過來的 ID
    var link = "";
    if (typeof params === 'object') {
      link = params.url || params.id || params.link || "";
    } else {
      link = params;
    }
    
    if (!link) throw new Error("無法取得影片 ID");

    var url = MAC_CMS_URL + "?ac=detail&ids=" + link;
    var response = await Widget.http.get(url, {
      headers: { "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15" }
    });
    
    var data = typeof response.data === "string" ? JSON.parse(response.data) : response.data;
    var item = data.list[0];
    if (!item) throw new Error("無法獲取影片資料");

    var playUrlStr = item.vod_play_url || "";
    var sourceGroups = playUrlStr.split("$$$");
    var sourceNames = (item.vod_play_from || "").split("$$$");
    
    var finalEpisodes = []; // 存放最終格式化後的播放清單

    for (var i = 0; i < sourceGroups.length; i++) {
      var group = sourceGroups[i];
      if (!group) continue;
      
      var sourceName = sourceNames[i] || "線路" + (i + 1);
      var parts = group.split("#");
      var currentUrls = []; // 單一線路底下的所有集數
      
      for我已經收到您上傳的 `girigirilove 1.4.4.js` 檔案 [1]。不過，從檔案內容的開頭可以明顯看到 `FWENC2` 的字樣，這代表這份原始碼**已經被 Forward 專屬的加密系統給加密了**，因此我無法直接讀取或解析裡面的成功寫法 [1]。

不過請放心！雖然無法直接解密這份檔案，但我非常清楚 Forward (以及 Rex) 插件底層的運作邏輯。您目前遇到的狀況（標題和簡介出得來，但下方的「播放資源」與「播放列表」卻空空如也），**絕對是因為 `detail` 函數最後回傳的資料層級與欄位名稱（Key）不符合 Forward 原生的標準。**

在 Forward 成功的 VOD 插件中，播放清單通常必須嚴格遵守 `episodes` 陣列內包著 `urls` 陣列的格式。請將您的 `detail` 函數後半段（解析線路與集數的部分）替換成以下這個**最標準的 Forward 結構**：

### 關鍵修正代碼：

請將 `detail` 函數裡的解析邏輯與 `return` 替換成這樣：

```javascript
    // ... 前面取得 item 與 playUrlStr 的代碼保持不變 ...
    
    var playUrlStr = item.vod_play_url || "";
    var sourceGroups = playUrlStr.split("$$$");
    var sourceNames = (item.vod_play_from || "").split("$$$");
    
    // 【關鍵修正 1】：Forward 標準認定的頂層列表必須叫做 episodes
    var episodesData = []; 

    for (var i = 0; i < sourceGroups.length; i++) {
      var group = sourceGroups[i];
      if (!group) continue;
      
      var sourceName = sourceNames[i] || "線路" + (i + 1);
      var parts = group.split("#");
      
      // 【關鍵修正 2】：Forward 認定的集數陣列必須叫做 urls
      var currentUrls = []; 
      
      for (var j = 0; j < parts.length; j++) {
        var part = parts[j];
        var splitPart = part.split("$");
        var epName = splitPart[0] || ("第" + (j + 1) + "集");
        var videoUrl = splitPart[1];
        
        if (videoUrl) {
          // 【關鍵修正 3】：單集的標準欄位為 name 和 url
          currentUrls.push({
            name: epName,
            url: videoUrl
          });
        }
      }
      
      // 將整理好的「一條線路」加入總清單中
      episodesData.push({
        title: sourceName, // 線路名稱 (例如：播放資源 1)
        urls: currentUrls  // 該線路底下的所有集數
      });
    }

    var rawDescription = item.vod_blurb || item.vod_content || "暫無簡介";
    var cleanDescription = rawDescription.replace(/<[^>]+>/g, '').trim();

    // 回傳給 Forward 的最終資料
    return {
      id: link,
      type: "detail",
      title: item.vod_name,
      description: cleanDescription,
      picture: item.vod_pic,      // 封面圖
      episodes: episodesData      // 【最重要的一步】：將包含 title 與 urls 的陣列傳給 episodes
    };