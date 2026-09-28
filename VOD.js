var WidgetMetadata = {
  id: "com.forward.maccms",
  name: "MacCMS 影視源", 
  description: "接入 MacCMS 提供在線影片搜尋和直鏈播放",
  author: "Ethan",
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
      id: "detail",
      name: "影片詳情",
      type: "detail",
      functionName: "loadDetail",
      params: []
    },
    {
      id: "stream",
      name: "解析播放資源",
      type: "stream",
      functionName: "loadResource",
      params: []
    }
  ]
};

const MAC_CMS_URL = "http://caiji.dyttzyapi.com/api.php/provide/vod/";

// 1. 搜尋模組
async function loadSearch(params = {}) {
  const keyword = params.keyword || "";
  const page = params.page || 1;
  const url = `${MAC_CMS_URL}?ac=detail&wd=${encodeURIComponent(keyword)}&pg=${page}`;
  
  const response = await Widget.http.get(url);
  const data = JSON.parse(response.data);
  const list = data.list || [];
  
  return list.map(item => ({
    id: item.vod_id.toString(),
    type: "url", 
    mediaType: "movie", 
    title: item.vod_name,
    coverUrl: item.vod_pic,
    description: item.vod_blurb || item.vod_content,
    link: item.vod_id.toString() 
  }));
}

// 2. 詳情模組
async function loadDetail(params = {}) {
  // Forward 有時會將 link 包裝在 params 裡，有時直接傳 id
  const link = params.link || params.id; 
  if (!link) return null;
  
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

// 3. 播放資源解析
async function loadResource(params = {}) {
  const link = params.link || params.id; 
  if (!link) return [];

  const url = `${MAC_CMS_URL}?ac=detail&ids=${link}`;
  const response = await Widget.http.get(url);
  const data = JSON.parse(response.data);
  const item = data.list && data.list[0];
  
  if (!item || !item.vod_play_url) return [];
  
  const streams = [];
  const sourceGroups = item.vod_play_url.split('$$$');   const sourceNames = (item.vod_play_from \vert{}\vert{} "").split('$$$');
  
  sourceGroups.forEach((group, index) => {
    const sourceName = sourceNames[index] || `線路 ${index + 1}`;
    const parts = group.split('#');
    
    parts.forEach((part) => {
      const splitPart = part.split('$');
      const name = splitPart[0];
      const videoUrl = splitPart[1];
      
      if (videoUrl) {
        streams.push({
          name: `${sourceName} - ${name}`,
          description: sourceName,
          url: videoUrl,
          playerType: "system" 
        });
      }
    });
  });
  
  return streams;
}
