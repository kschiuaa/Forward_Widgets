var WidgetMetadata = {
  id: "ti.bemarkt.javday",
  title: "JAVDay",
  description: "影片",
  author: "et",
  site: "https://javday.app",
  version: "1.0.0",
  requiredVersion: "0.0.1",
  detailCacheDuration: 60,
  modules: [
    // 搜尋模塊
    {
      title: "搜尋影片",
      description: "搜尋JAVDay影片庫",
      requiresWebView: false,
      functionName: "search",
      cacheDuration: 3600,
      params: [
        {
          name: "keyword",
          title: "女優/番號/關鍵字搜尋…",
          type: "input",
          value: "",
          description: "女優/番號/關鍵字搜尋…",
        },
        { 
          name: "page", 
          title: "頁碼", 
          type: "page", 
          description: "搜尋結果頁碼" 
        }
      ]
    },
    // 最新模塊
    {
      title: "最新更新",
      description: "瀏覽最新更新影片",
      requiresWebView: false,
      functionName: "loadPage",
      cacheDuration: 3600,
      params: [
        {
          name: "url",
          title: "列表地址",
          type: "constant",
          description: "列表地址",
          value: "https://javday.app/label/new/"
        },
        {
          name: "page",
          title: "頁碼",
          type: "page"
        }
      ]
    },
    // 人氣模塊
    {
      title: "人氣系列",
      description: "瀏覽人氣系列影片",
      requiresWebView: false,
      functionName: "loadPage",
      cacheDuration: 3600,
      params: [
        {
          name: "url",
          title: "列表地址",
          type: "constant",
          description: "列表地址",
          value: "https://javday.app/label/hot/"
        },
        {
          name: "page",
          title: "頁碼",
          type: "page"
        }
      ]
    },
    // 新作模塊
    {
      title: "新作上市",
      description: "瀏覽新作上市影片",
      requiresWebView: false,
      functionName: "loadPage",
      cacheDuration: 3600,
      params: [
        {
          name: "url",
          title: "列表地址",
          type: "constant",
          description: "列表地址",
          value: "https://javday.app/category/new-release/"
        },
        {
          name: "sort_by",
          title: "排序方式",
          type: "enumeration",
          enumOptions: [
            { title: "最新上架", value: "new" },
            { title: "人氣最高", value: "popular" }
          ],
          description: "選擇影片排序方式",
          value: "new"
        },
        {
          name: "page",
          title: "頁碼",
          type: "page"
        }
      ]
    },
    // 有碼模塊
    {
      title: "有碼影片",
      description: "瀏覽有碼分類影片",
      requiresWebView: false,
      functionName: "loadPage",
      cacheDuration: 3600,
      params: [
        {
          name: "url",
          title: "列表地址",
          type: "constant",
          description: "列表地址",
          value: "https://javday.app/category/censored/"
        },
        {
          name: "sort_by",
          title: "排序方式",
          type: "enumeration",
          enumOptions: [
            { title: "最新上架", value: "new" },
            { title: "人氣最高", value: "popular" }
          ],
          description: "選擇影片排序方式",
          value: "popular"
        },
        {
          name: "page",
          title: "頁碼",
          type: "page"
        }
      ]
    },
    // 無碼模塊
    {
      title: "無碼影片",
      description: "瀏覽無碼分類影片",
      requiresWebView: false,
      functionName: "loadPage",
      cacheDuration: 3600,
      params: [
        {
          name: "url",
          title: "列表地址",
          type: "constant",
          description: "列表地址",
          value: "https://javday.app/category/uncensored/"
        },
        {
          name: "sort_by",
          title: "排序方式",
          type: "enumeration",
          enumOptions: [
            { title: "最新上架", value: "new" },
            { title: "人氣最高", value: "popular" }
          ],
          description: "選擇影片排序方式",
          value: "new"
        },
        {
          name: "page",
          title: "頁碼",
          type: "page"
        }
      ]
    },
    // 流出模塊
    {
      title: "無碼流出",
      description: "瀏覽無碼流出影片",
      requiresWebView: false,
      functionName: "loadPage",
      cacheDuration: 3600,
      params: [
        {
          name: "url",
          title: "列表地址",
          type: "constant",
          description: "列表地址",
          value: "https://javday.app/category/uncensored-leaked/"
        },
        {
          name: "sort_by",
          title: "排序方式",
          type: "enumeration",
          enumOptions: [
            { title: "最新上架", value: "new" },
            { title: "人氣最高", value: "popular" }
          ],
          description: "選擇影片排序方式",
          value: "new"
        },
        {
          name: "page",
          title: "頁碼",
          type: "page"
        }
      ]
    },
    // 杏吧模塊
    {
      title: "杏吧影片",
      description: "瀏覽杏吧分類影片",
      requiresWebView: false,
      functionName: "loadPage",
      cacheDuration: 3600,
      params: [
        {
          name: "url",
          title: "列表地址",
          type: "constant",
          description: "列表地址",
          value: "https://javday.app/category/sex8/"
        },
        {
          name: "sort_by",
          title: "排序方式",
          type: "enumeration",
          enumOptions: [
            { title: "最新上架", value: "new" },
            { title: "人氣最高", value: "popular" }
          ],
          description: "選擇影片排序方式",
          value: "popular"
        },
        {
          name: "page",
          title: "頁碼",
          type: "page"
        }
      ]
    },
    // 玩偶模塊
    {
      title: "玩偶姐姐",
      description: "瀏覽玩偶姐姐影片",
      requiresWebView: false,
      functionName: "loadPage",
      cacheDuration: 3600,
      params: [
        {
          name: "url",
          title: "列表地址",
          type: "constant",
          description: "列表地址",
          value: "https://javday.app/category/hongkongdoll/"
        },
        {
          name: "sort_by",
          title: "排序方式",
          type: "enumeration",
          enumOptions: [
            { title: "最新上架", value: "new" },
            { title: "人氣最高", value: "popular" }
          ],
          description: "選擇影片排序方式",
          value: "popular"
        },
        {
          name: "page",
          title: "頁碼",
          type: "page"
        }
      ]
    },
    // 國產模塊
    {
      title: "國產 AV",
      description: "瀏覽國產 AV影片",
      requiresWebView: false,
      functionName: "loadPage",
      cacheDuration: 3600,
      params: [
        {
          name: "url",
          title: "列表地址",
          type: "constant",
          description: "列表地址",
          value: "https://javday.app/category/chinese-av/"
        },
        {
          name: "sort_by",
          title: "排序方式",
          type: "enumeration",
          enumOptions: [
            { title: "最新上架", value: "new" },
            { title: "人氣最高", value: "popular" }
          ],
          description: "選擇影片排序方式",
          value: "popular"
        },
        {
          name: "page",
          title: "頁碼",
          type: "page"
        }
      ]
    },
    // 廠商模塊
    {
      title: "國產廠商",
      description: "按廠商標籤瀏覽國產廠商影片",
      requiresWebView: false,
      functionName: "loadPage",
      cacheDuration: 3600,
      params: [
        {
          name: "url",
          title: "廠商選擇",
          type: "enumeration",
          belongTo: {
            paramName: "sort_by",
            value: ["new","popular"],
            },
          enumOptions: [ 
            { title: "麻豆傳媒", value: "https://javday.app/index.php/category/madou/" }, 
            { title: "果凍傳媒", value: "https://javday.app/index.php/category/91zhipianchang/" }, 
            { title: "天美傳媒", value: "https://javday.app/index.php/category/timi/" }, 
            { title: "星空無限", value: "https://javday.app/index.php/category/xingkong/" }, 
            { title: "皇家華人", value: "https://javday.app/index.php/category/royalasianstudio/" }, 
            { title: "蜜桃影像", value: "https://javday.app/index.php/category/mtgw/" }, 
            { title: "精東影業", value: "https://javday.app/index.php/category/jdav/" }, 
            { title: "台灣 AV", value: "https://javday.app/index.php/category/twav/" }, 
            { title: "JVID", value: "https://javday.app/index.php/category/jvid/" }, 
            { title: "蘿莉社", value: "https://javday.app/index.php/category/luolisheus/" }, 
            { title: "糖心VLOG", value: "https://javday.app/index.php/category/txvlog/" }, 
            { title: "Psychoporn TW", value: "https://javday.app/index.php/category/psychoporn-tw/" } 
          ],
          value: "https://javday.app/index.php/category/madou/",
          description: "選擇要瀏覽的廠商"
        },
        {
          name: "sort_by",
          title: "🔢 排序方式",
          type: "enumeration",
          enumOptions: [
            { title: "最新上架", value: "new" },
            { title: "人氣最高", value: "popular" }
          ],
          value: "new",
          description: "選擇影片排序方式"
        },
        {
          name: "page",
          title: "頁碼",
          type: "page"
        }
      ]
    }
  ]
};

const JAVDAY_LOG_PREFIX = "ForwardWidget: JAVDay -";
const JAVDAY_USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36";

function extractCategoryId(url) {
  const match = url.match(/\/([^/]+)\/?$/);
  if (match && match[1]) {
    return match[1].replace(/\/+$/, '');
  }
  
  const parts = url.split('/').filter(part => part.length > 0);
  return parts[parts.length - 1] || url.split('/').slice(-2, -1)[0] || 'unknown';
}

function buildPageUrl(baseUrl, sortBy, page) {
  const categoryId = extractCategoryId(baseUrl);
  
  const cleanBaseUrl = baseUrl.replace(/index\.php\//g, '');
  
  let path;
  if (sortBy === "popular") {
    path = `/fiter/by/hits/id/${categoryId}`;
  } else {
    path = cleanBaseUrl.includes('label/') 
      ? cleanBaseUrl.replace(/\/page\/\d+\/?$/, '')
      : `/category/${categoryId}`;
  }
  
  if (page > 1) {
    return `${path}/page/${page}/`;
  }
  
  return `${path}/`;
}

function getFullUrl(path) {
  if (path.startsWith("http")) return path;
  
  return `https://javday.app${path}`;
}

function getCoverImgSrc($item) {
  const coverElement = $item.find(".videoBox-cover");
  const styleAttr = coverElement.attr("style");
  
  if (styleAttr) {
    const match = styleAttr.match(/url\(\s*['"]?([^'")]+)['"]?\s*\)/);
    if (match && match[1]) {
      const extractedUrl = match[1];
      
      if (extractedUrl.startsWith("//")) {
        return `https:${extractedUrl}`;
      } 
      
      if (extractedUrl.startsWith("http")) {
        return extractedUrl;
      }
      
      return `https://javday.app${extractedUrl.startsWith("/") ? "" : "/"}${extractedUrl}`;
    }
  }
  return "";
}

function extractVideoUrlFromDPlayerScript(scriptContent) {
  if (!scriptContent) return null;
  
  const regexes = [
    /video\s*:\s*{\s*[^}]*url\s*:\s*['"]([^'"]+)['"]/,
    /url\s*:\s*['"]([^'"]+\.m3u8[^'"]*)['"]/
  ];
  
  for (const regex of regexes) {
    const match = scriptContent.match(regex);
    if (match && match[1]) return match[1];
  }
  
  return null;
}

async function loadPage(params = {}) {
  const baseUrl = params.url;
  const sortBy = params.sort_by || "new";
  const page = parseInt(params.page, 10) || 1;
  
  const pagePath = buildPageUrl(baseUrl, sortBy, page);
  const targetUrl = getFullUrl(pagePath);

  try {
    const response = await Widget.http.get(targetUrl, {
      headers: {
        "User-Agent": JAVDAY_USER_AGENT,
        Referer: "https://javday.app/",
      },
    });

    if (!response?.data) {
      throw new Error("無法獲取頁面內容");
    }

    const $ = Widget.html.load(response.data);
    const videoItems = [];

    $(".video-wrapper .videoBox").each((index, element) => {
      const $item = $(element);
      let link = $item.attr("href");
      const title = $item.find(".videoBox-info .title").text().trim();
      const imgSrc = getCoverImgSrc($item);

      if (!link || !title) return;
      
      if (!link.startsWith("http")) {
        link = link.startsWith("//") 
          ? `https:${link}`
          : `https://javday.app${link.startsWith("/") ? "" : "/"}${link}`;
      }

      link = link.replace(/([^:]\/)\/+/g, '$1');

      videoItems.push({
        id: `${index}|${link}`,
        type: "url",
        title: title,
        imgSrc: imgSrc,
        backdropPath: imgSrc,
        link: link,
        description: `來自JAVDay | 排序:${sortBy === "new" ? "最新上架" : "人氣最高"}`,
        mediaType: "movie",
      });
    });
    
    return videoItems;
  } catch (error) {
    console.error(`${JAVDAY_LOG_PREFIX} 获取视频失败: ${error.message}`);
    throw error;
  }
}

async function search(params = {}) {
  const keyword = params.keyword || "";
  const page = parseInt(params.page, 10) || 1;
  
  if (!keyword) {
    throw new Error("請輸入搜尋關鍵詞");
  }

  let searchUrl;
  if (page === 1) {
    searchUrl = `https://javday.app/search/?wd=${keyword}`;
  } else {
    searchUrl = `https://javday.app/search/page/${page}/wd/${keyword}/`;
  }

  try {
    const response = await Widget.http.get(searchUrl, {
      headers: {
        "User-Agent": JAVDAY_USER_AGENT,
        Referer: "https://javday.app/",
      },
    });

    if (!response?.data) {
      throw new Error("無法獲取搜尋結果");
    }

    const $ = Widget.html.load(response.data);
    const videoItems = [];

    $(".video-wrapper .videoBox").each((index, element) => {
      const $item = $(element);
      let link = $item.attr("href");
      const title = $item.find(".videoBox-info .title").text().trim();
      const imgSrc = getCoverImgSrc($item);

      if (!link || !title) return;
      
      if (!link.startsWith("http")) {
        link = link.startsWith("//") 
          ? `https:${link}`
          : `https://javday.app${link.startsWith("/") ? "" : "/"}${link}`;
      }

      link = link.replace(/([^:]\/)\/+/g, '$1');

      videoItems.push({
        id: `${index}|${link}`,
        type: "url",
        title: title,
        imgSrc: imgSrc,
        backdropPath: imgSrc,
        link: link,
        description: `搜尋: ${params.keyword}`,
        mediaType: "movie",
      });
    });
    
    return videoItems;
  } catch (error) {
    console.error(`${JAVDAY_LOG_PREFIX} 搜尋失敗: ${error.message}`);
    throw error;
  }
}

async function loadDetail(link) {
  
  try {
    const response = await Widget.http.get(link, {
      headers: {
        "User-Agent": JAVDAY_USER_AGENT,
        Referer: link,
      },
    });

    if (!response?.data) {
      throw new Error("無法獲取詳情頁內容");
    }

    const $ = Widget.html.load(response.data);
    
    const dplayerScript = Array.from($("script"))
      .find(el => {
        const scriptContent = $(el).html();
        return scriptContent && scriptContent.includes("new DPlayer");
      });
    
    if (dplayerScript) {
      const scriptContent = $(dplayerScript).html();
      const videoUrl = extractVideoUrlFromDPlayerScript(scriptContent);
      if (videoUrl) {
        return {
          id: link,
          type: "url",
          videoUrl: videoUrl,
          customHeaders: {
            Referer: link,
            "User-Agent": JAVDAY_USER_AGENT,
          },
        };
      }
    }
    
    const videoSrc = $("video#J_prismPlayer").attr("src") || 
                   $("source[src*='.m3u8']").attr("src") ||
                   $("video source").attr("src");
    
    if (videoSrc) {
      return {
        id: link,
        type: "url",
        videoUrl: videoSrc,
        customHeaders: {
          Referer: link,
            "User-Agent": JAVDAY_USER_AGENT,
          },
        };
      }
      
      const scriptSources = Array.from($("script"))
      .map(el => $(el).html())
      .find(content => content && content.includes(".m3u8"));
    
    if (scriptSources) {
      const m3u8Match = scriptSources.match(/['"](https?:\/\/[^'"]+\.m3u8[^'"]*)['"]/);
      if (m3u8Match && m3u8Match[1]) {
        return {
          id: link,
          type: "url",
          videoUrl: m3u8Match[1],
          customHeaders: {
            Referer: link,
            "User-Agent": JAVDAY_USER_AGENT,
          },
        };
      }
    }

    const playerVideo = $("video[src]").attr("src") || 
                      $("iframe[src*='player']").attr("src");
    
    if (playerVideo) {
      return {
        id: link,
        type: "url",
        videoUrl: playerVideo,
        customHeaders: {
          Referer: link,
          "User-Agent": JAVDAY_USER_AGENT,
        },
      };
    }

    throw new Error("無法找到影片源");
  } catch (error) {
    console.error(`${JAVDAY_LOG_PREFIX} 加載詳情失敗: ${error.message}`);
    throw error;
  }
}
