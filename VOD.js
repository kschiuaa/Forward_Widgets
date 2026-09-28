var WidgetMetadata = {
  id: "com.yourname.maccms",
  title: "MacCMS 線上影視源",
  description: "接入 MacCMS 提供在線影片搜尋和直鏈播放",
  author: "Forward User",
  version: "1.0.0",
  modules: [
    {
      id: "search",
      name: "搜尋源",
      type: "search",
      functionName: "loadSearch",
      params: [
        { name: "keyword", type: "input", description: "搜尋關鍵字" },
        { name: "page", type: "page", description: "頁碼" }
      ]
    },
    {
      id: "loadResource",
      name: "解析播放資源",
      type: "stream",
      functionName: "loadResource",
      params: []
    }
  ]
};

// 你可以將此處替換為你的其他 MacCMS 採集接口
const MAC_CMS_URL = "http://caiji.dyttzyapi.com/api.php/provide/vod/";

// 1. 搜尋模組：接收搜尋關鍵字並返回列表
async function loadSearch(params = {}) {
  const keyword = params.keyword || "";
  const page = params.page || 1;
  const url = `${MAC_CMS_URL}?ac=detail&wd=${encodeURIComponent(keyword)}&pg=${page}`;
  
  const response = await Widget.http.get(url);
  const data = JSON.parse(response.data);
  const list = data.list || [];
  
  return list.map(item => ({
    id: item.vod_id.toString(),
    type: "url", // 非 Forward 官方網盤資源需使用 'url' 類型，以便觸發 loadDetail
    mediaType: "movie", 
    title: item.vod_name,
    coverUrl: item.vod_pic,
    description: item.vod_blurb || item.vod_content,
    link: item.vod_id.toString() // 將 vod_id 當作 link 傳遞，供後續詳情和播放取用
  }));
}

// 2. 全局函數：載入影片詳情頁資料
async function loadDetail(link) {
  const url = `${MAC_CMS_URL}?ac=detail&ids=${link}`;
  const response = await Widget.http.get(url);
  const data = JSON.parse(response.data);
  const item = data.list && data.list[0];
  
  if (!item) return null;
  
  return {
    id: item.vod_id.toString(),
    type: "url",
    mediaType: "movie",
    title: item.vod_name,
    coverUrl: item.vod_pic,
    description: item.vod_content,
    link: item.vod_id.toString()
  };
}

// 3. 資源解析模組：點擊播放時動態解析並獲取播放直鏈 (支援多線路與多集數)
async function loadResource(params = {}) {
  const link = params.link || params.id; 
  if (!link) return [];

  const url = `${MAC_CMS_URL}?ac=detail&ids=${link}`;
  const response = await Widget.http.get(url);
  const data = JSON.parse(response.data);
  const item = data.list && data.list[0];
  
  if (!item || !item.vod_play_url) return [];
  
  // MacCMS vod_play_url 格式一般為： 
  // 線路1$$$線路2 (播放源碼由 $$$ 分隔)
  // 第1集$url#第2集$url (集數由 # 分隔，標題與真實連結由 $ 分隔)   const streams = [];   const sourceGroups = item.vod_play_url.split('$$$');   const sourceNames = (item.vod_play_from \vert{}\vert{} "").split('$$$');
  
  sourceGroups.forEach((group, index) => {
    const sourceName = sourceNames[index] || `線路 ${index + 1}`;
    const parts = group.split('#');
    
    parts.forEach((part) => {
      const [name, videoUrl] = part.split('$');
      if (videoUrl) {
        streams.push({
          name: `${sourceName} - ${name}`, // 顯示名稱，例如：m3u8 - 第1集
          description: sourceName,         // 資源描述
          url: videoUrl,                   // 最終交給 Forward 播放的 m3u8 或 mp4 直鏈
          playerType: "system" 
        });
      }
    });
  });
  
  return streams;
}
