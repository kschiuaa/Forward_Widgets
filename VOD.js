WidgetMetadata = {
  id: "maccms_vod",
  title: "線上影視搜尋",
  description: "提供 VOD 影視資源搜尋與播放",
  author: "Ethan",
  version: "1.0.0",
  requiredVersion: "0.0.1",
  detailCacheDuration: 60,
  modules: [
    {
      title: "影片搜尋",
      description: "搜尋資源",
      requiresWebView: false,
      functionName: "search",
      cacheDuration: 3600,
      params: [
        {
          name: "keyword",
          title: "關鍵詞",
          type: "input",
          description: "請輸入影片名稱",
        },
        { 
          name: "page", 
          title: "頁碼", 
          type: "page", 
          description: "頁碼", 
          value: "1" 
        }
      ],
    }
  ],
};

const MAC_CMS_URL = "http://caiji.dyttzyapi.com/api.php/provide/vod/";

// 1. 搜尋函數 (對應 modules 中的 functionName)
async function search(params = {}) {
  const keyword = encodeURIComponent(params.keyword || "");
  const page = params.page || 1;
  const url = `${MAC_CMS_URL}?ac=detail&wd=${keyword}&pg=${page}`;
  
  const response = await Widget.http.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    },
  });
  
  const data = JSON.parse(response.data);
  const list = data.list || [];
  
  // 回傳格式對齊 ja.js 的要求
  return list.map(item => ({
    id: item.vod_id.toString(),
    type: "url",
    title: item.vod_name,
    backdropPath: item.vod_pic, 
    previewUrl: item.vod_pic,
    link: item.vod_id.toString(), // 傳遞給 loadDetail 的參數
    mediaType: "movie",
    durationText: item.vod_remarks || "更新中",
    description: item.vod_blurb || item.vod_content || "暫無簡介"
  }));
}

// 2. 詳情與播放函數 (全域調用)
async function loadDetail(link) {
  // 【巧妙設計】如果 link 帶有 play:// 前綴，代表使用者點擊了下方集數列表，直接返回播放器 URL
  if (link && link.startsWith("play://")) {
    const directVideoUrl = link.replace("play://", "");
    return {
      id: link,
      type: "detail",
      videoUrl: directVideoUrl,
      mediaType: "movie"
    };
  }

  // 正常獲取影片詳情
  const url = `${MAC_CMS_URL}?ac=detail&ids=${link}`;
  const response = await Widget.http.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    },
  });
  
  const data = JSON.parse(response.data);
  const item = data.list && data.list[0];
  
  if (!item) throw new Error("無法獲取影片資料");

  // 解析多線路與多集數
  const playUrlStr = item.vod_play_url || "";
  const sourceGroups = playUrlStr.split('$$$');   const sourceNames = (item.vod_play_from \vert{}\vert{} "").split('$$$');
  
  let firstVideoUrl = "";
  let episodes = [];

  sourceGroups.forEach((group, index) => {
    const sourceName = sourceNames[index] || `線路 ${index + 1}`;
    const parts = group.split('#');
    
    parts.forEach((part) => {
      const splitPart = part.split('$');
      const epName = splitPart[0];
      const videoUrl = splitPart[1];
      
      if (videoUrl) {
        if (!firstVideoUrl) firstVideoUrl = videoUrl; // 預設播放第一集
        
        // 將所有集數塞入 childItems 中，做為相關影片顯示在下方
        episodes.push({
          id: `play://${videoUrl}`,
          type: "url", 
          title: `${sourceName} - ${epName}`,
          backdropPath: item.vod_pic,
          link: `play://${videoUrl}`, // 點擊時再次呼叫 loadDetail，並觸發上方 play:// 判斷
          mediaType: "movie",
          description: epName
        });
      }
    });
  });

  // 回傳包含播放連結 (videoUrl) 與集數列表 (childItems) 的詳情物件
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
