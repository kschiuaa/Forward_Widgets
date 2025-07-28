WidgetMetadata = {
  id: "jable",
  title: "Jable",
  description: "獲取 Jable 視頻",
  author: "nibiru",
  version: "1.0.8",
  requiredVersion: "0.0.1",
  detailCacheDuration: 60,
  modules: [
    // 搜索模塊
    {
      title: "搜尋",
      description: "搜尋",
      requiresWebView: false,
      functionName: "search",
      cacheDuration: 3600,
      params: [
        {
          name: "keyword",
          title: "關鍵詞",
          type: "input",
          description: "關鍵詞",
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序",
          enumOptions: [
            { title: "最多觀看", value: "video_viewed" },
            { title: "近期最佳", value: "post_date_and_popularity" },
            { title: "最近更新", value: "post_date" },
            { title: "最多收藏", value: "most_favourited" },
          ],
        },
        { name: "from", title: "頁碼", type: "page", description: "頁碼", value: "1" },
      ],
    },
    // 熱門模塊
    {
      title: "熱門",
      description: "熱門影片",
      requiresWebView: false,
      functionName: "loadPage",
      cacheDuration: 3600,
      params: [
        {
          name: "url",
          title: "列表地址",
          type: "constant",
          description: "列表地址",
          value: "https://jable.tv/hot/?mode=async&function=get_block&block_id=list_videos_common_videos_list",
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序",
          enumOptions: [
            { title: "今日熱門", value: "video_viewed_today" },
            { title: "本週熱門", value: "video_viewed_week" },
            { title: "本月熱門", value: "video_viewed_month" },
            { title: "所有時間", value: "video_viewed" },
          ],
        },
        { name: "from", title: "頁碼", type: "page", description: "頁碼", value: "1" },
      ],
    },
    // 最新模块
    {
      title: "最新",
      description: "最新上市影片",
      requiresWebView: false,
      functionName: "loadPage",
      cacheDuration: 3600,
      params: [
        {
          name: "url",
          title: "列表地址",
          type: "constant",
          description: "列表地址",
          value: "https://jable.tv/new-release/?mode=async&function=get_block&block_id=list_videos_common_videos_list",
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序",
          enumOptions: [
            { title: "最新發佈", value: "latest-updates" },
            { title: "最多觀看", value: "video_viewed" },
            { title: "最多收藏", value: "most_favourited" },
          ],
        },
        { name: "from", title: "頁碼", type: "page", description: "頁碼", value: "1" },
      ],
    },
    // 中文模塊
    {
      title: "中文",
      description: "中文字幕影片",
      requiresWebView: false,
      functionName: "loadPage",
      cacheDuration: 3600,
      params: [
        {
          name: "url",
          title: "列表地址",
          type: "constant",
          description: "列表地址",
          value: "https://jable.tv/categories/chinese-subtitle/?mode=async&function=get_block&block_id=list_videos_common_videos_list",
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序",
          enumOptions: [
            { title: "最近更新", value: "post_date" },
            { title: "最多觀看", value: "video_viewed" },
            { title: "最多收藏", value: "most_favourited" },
          ],
        },
        { name: "from", title: "頁碼", type: "page", description: "頁碼", value: "1" },
      ],
    },
    // 絲襪美腿
    {
      title: "絲襪美腿",
      description: "絲襪美腿影片",
      requiresWebView: false,
      functionName: "loadPage",
      cacheDuration: 3600,
      params: [
        {
          name: "url",
          title: "列表地址",
          type: "constant",
          description: "列表地址",
          value: "https://jable.tv/categories/pantyhose/?mode=async&function=get_block&block_id=list_videos_common_videos_list",
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序",
          enumOptions: [
            { title: "最近更新", value: "post_date" },
            { title: "最多觀看", value: "video_viewed" },
            { title: "最多收藏", value: "most_favourited" },
          ],
        },
        { name: "from", title: "頁碼", type: "page", description: "頁碼", value: "1" },
      ],
    },
    // 凌辱快感
    {
      title: "凌辱快感",
      description: "凌辱快感影片",
      requiresWebView: false,
      functionName: "loadPage",
      cacheDuration: 3600,
      params: [
        {
          name: "url",
          title: "列表地址",
          type: "constant",
          description: "列表地址",
          value: "https://jable.tv/categories/insult/?mode=async&function=get_block&block_id=list_videos_common_videos_list",
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序",
          enumOptions: [
            { title: "最近更新", value: "post_date" },
            { title: "最多觀看", value: "video_viewed" },
            { title: "最多收藏", value: "most_favourited" },
          ],
        },
        { name: "from", title: "頁碼", type: "page", description: "頁碼", value: "1" },
      ],
    },
    // 女優模塊
    {
      title: "女優",
      description: "按女優分類瀏覽影片",
      requiresWebView: false,
      functionName: "loadPage",
      cacheDuration: 3600,
      params: [
        {
          name: "url",
          title: "選擇女優",
          type: "enumeration",
          belongTo: {
            paramName: "sort_by",
            value: ["post_date","video_viewed","most_favourited"],
            },
          enumOptions: [
            { 
              title: "三上悠亞", 
              value: "https://jable.tv/s1/models/yua-mikami/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "本庄鈴", 
              value: "https://jable.tv/models/honjou-suzu/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "橋本ありな", 
              value: "https://jable.tv/models/arina-hashimoto/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "明里䌷", 
              value: "https://jable.tv/models/tsumugi-akari/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "小湊よつ葉", 
              value: "https://jable.tv/models/ff8ce98f2419126e00a90bc1f3385824/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "流川夕", 
              value: "https://jable.tv/models/21af3447a7f11cf062e91b4807590ce8/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "未步奈奈", 
              value: "https://jable.tv/s1/models/c9535c2f157202cd0e934d62ef582e2e/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "設樂夕日", 
              value: "https://jable.tv/models/14b217a589718e5e5f723de3841e9468/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "森日向子", 
              value: "https://jable.tv/models/1a7543f89b125421e489d98de472ebf4/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "設楽ゆうひ", 
              value: "https://jable.tv/models/14b217a589718e5e5f723de3841e9468/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "美谷朱里", 
              value: "https://jable.tv/s1/models/mitani-akari/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "河北彩伽", 
              value: "https://jable.tv/models/saika-kawakita2/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "金松季歩", 
              value: "https://jable.tv/models/48ace5552227a2a4f867af73efa18f2d/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            }
          ],
          value: "https://jable.tv/s1/models/yua-mikami/?mode=async&function=get_block&block_id=list_videos_common_videos_list",
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序",
          enumOptions: [
            { title: "最近更新", value: "post_date" },
            { title: "最多觀看", value: "video_viewed" },
            { title: "最多收藏", value: "most_favourited" },
          ],
        },
        { name: "from", title: "頁碼", type: "page", description: "頁碼", value: "1" },
      ],
    },

    // 衣著模塊
    {
      title: "衣著",
      description: "按衣著分類瀏覽影片",
      requiresWebView: false,
      functionName: "loadPage",
      cacheDuration: 3600,
      params: [
        {
          name: "url",
          title: "選擇衣著",
          type: "enumeration",
          belongTo: {
            paramName: "sort_by",
            value: ["post_date","video_viewed","most_favourited"],
            },
          enumOptions: [
            { 
              title: "黑絲", 
              value: "https://jable.tv/tags/black-pantyhose/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "肉絲", 
              value: "https://jable.tv/tags/flesh-toned-pantyhose/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "絲襪", 
              value: "https://jable.tv/tags/pantyhose/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "獸耳", 
              value: "https://jable.tv/tags/kemonomimi/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "漁網", 
              value: "https://jable.tv/tags/fishnets/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "水著", 
              value: "https://jable.tv/tags/swimsuit/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "校服", 
              value: "https://jable.tv/tags/school-uniform/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "旗袍", 
              value: "https://jable.tv/tags/cheongsam/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "婚紗", 
              value: "https://jable.tv/tags/wedding-dress/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "女僕", 
              value: "https://jable.tv/tags/maid/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "和服", 
              value: "https://jable.tv/tags/kimono/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "眼鏡娘", 
              value: "https://jable.tv/tags/glasses/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "過膝襪", 
              value: "https://jable.tv/tags/knee-socks/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "運動裝", 
              value: "https://jable.tv/tags/sportswear/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "兔女郎", 
              value: "https://jable.tv/tags/bunny-girl/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "Cosplay", 
              value: "https://jable.tv/tags/Cosplay/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            }
          ],
          value: "https://jable.tv/tags/black-pantyhose/?mode=async&function=get_block&block_id=list_videos_common_videos_list",
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序",
          enumOptions: [
            { title: "最近更新", value: "post_date" },
            { title: "最多觀看", value: "video_viewed" },
            { title: "最多收藏", value: "most_favourited" },
          ],
        },
        { name: "from", title: "頁碼", type: "page", description: "頁碼", value: "1" },
      ],
    },
    // 劇情模塊
    {
      title: "劇情",
      description: "按劇情分類瀏覽影片",
      requiresWebView: false,
      functionName: "loadPage",
      cacheDuration: 3600,
      params: [
        {
          name: "url",
          title: "選擇劇情",
          type: "enumeration",
          belongTo: {
            paramName: "sort_by",
            value: ["post_date","video_viewed","most_favourited"],
            },
          enumOptions: [
            { 
              title: "出軌", 
              value: "https://jable.tv/tags/affair/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "醉男", 
              value: "https://jable.tv/tags/ugly-man/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "親屬", 
              value: "https://jable.tv/tags/kinship/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "童貞", 
              value: "https://jable.tv/tags/virginity/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "復仇", 
              value: "https://jable.tv/tags/avenge/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "巨漢", 
              value: "https://jable.tv/tags/giant/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "媚藥", 
              value: "https://jable.tv/tags/love-potion/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "催眠", 
              value: "https://jable.tv/tags/hypnosis//?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "偷拍", 
              value: "https://jable.tv/tags/private-cam/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "NTR", 
              value: "https://jable.tv/tags/ntr/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "年齡差", 
              value: "https://jable.tv/tags/age-difference/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "下雨天", 
              value: "https://jable.tv/tags/rainy-day/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "時間停止", 
              value: "https://jable.tv/tags/time-stop/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            }
          ],
          value: "https://jable.tv/tags/affair/?mode=async&function=get_block&block_id=list_videos_common_videos_list",
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序",
          enumOptions: [
            { title: "最近更新", value: "post_date" },
            { title: "最多觀看", value: "video_viewed" },
            { title: "最多收藏", value: "most_favourited" },
          ],
        },
        { name: "from", title: "頁碼", type: "page", description: "頁碼", value: "1" },
      ],
    },
    // 地點模塊
    {
      title: "地點",
      description: "按地點分類瀏覽影片",
      requiresWebView: false,
      functionName: "loadPage",
      cacheDuration: 3600,
      params: [
        {
          name: "url",
          title: "選擇地點",
          type: "enumeration",
          belongTo: {
            paramName: "sort_by",
            value: ["post_date","video_viewed","most_favourited"],
            },
          enumOptions: [
            { 
              title: "電車", 
              value: "https://jable.tv/tags/tram/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "處女", 
              value: "https://jable.tv/tags/first-night/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "監獄", 
              value: "https://jable.tv/tags/prison/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "溫泉", 
              value: "https://jable.tv/tags/hot-spring/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "泳池", 
              value: "https://jable.tv/tags/swimming-pool/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "汽車", 
              value: "https://jable.tv/tags/car/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "廁所", 
              value: "https://jable.tv/tags/toilet/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "學校", 
              value: "https://jable.tv/tags/school/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "魔鏡號", 
              value: "https://jable.tv/tags/magic-mirror/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "洗浴場", 
              value: "https://jable.tv/tags/bathing-place/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "圖書館", 
              value: "https://jable.tv/tags/library/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "健身房", 
              value: "https://jable.tv/tags/gym-room/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "便利店", 
              value: "https://jable.tv/tags/store/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            }
          ],
          value: "https://jable.tv/tags/tram/?mode=async&function=get_block&block_id=list_videos_common_videos_list",
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序",
          enumOptions: [
            { title: "最近更新", value: "post_date" },
            { title: "最多觀看", value: "video_viewed" },
            { title: "最多收藏", value: "most_favourited" },
          ],
        },
        { name: "from", title: "頁碼", type: "page", description: "頁碼", value: "1" },
      ],
    },
    // 身材模塊
    {
      title: "身材",
      description: "按身材分類瀏覽影片",
      requiresWebView: false,
      functionName: "loadPage",
      cacheDuration: 3600,
      params: [
        {
          name: "url",
          title: "選擇身材",
          type: "enumeration",
          belongTo: {
            paramName: "sort_by",
            value: ["post_date","video_viewed","most_favourited"],
            },
          enumOptions: [
            { 
              title: "長身", 
              value: "https://jable.tv/tags/tall/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "軟體", 
              value: "https://jable.tv/tags/flexible-body/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "貧乳", 
              value: "https://jable.tv/tags/small-tits/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "美腿", 
              value: "https://jable.tv/tags/beautiful-leg/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "美尻", 
              value: "https://jable.tv/tags/beautiful-butt/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "紋身", 
              value: "https://jable.tv/tags/tattoo/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "短髮", 
              value: "https://jable.tv/tags/short-hair/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "白虎", 
              value: "https://jable.tv/tags/hairless-pussy/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "熟女", 
              value: "https://jable.tv/tags/mature-woman/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "巨乳", 
              value: "https://jable.tv/tags/big-tits/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "少女", 
              value: "https://jable.tv/tags/girl/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "嬌小", 
              value: "https://jable.tv/tags/dainty/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            }
          ],
          value: "https://jable.tv/tags/tall/?mode=async&function=get_block&block_id=list_videos_common_videos_list",
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序",
          enumOptions: [
            { title: "最近更新", value: "post_date" },
            { title: "最多觀看", value: "video_viewed" },
            { title: "最多收藏", value: "most_favourited" },
          ],
        },
        { name: "from", title: "頁碼", type: "page", description: "頁碼", value: "1" },
      ],
    },    
    // 角色模塊
    {
      title: "角色",
      description: "按角色分類瀏覽影片",
      requiresWebView: false,
      functionName: "loadPage",
      cacheDuration: 3600,
      params: [
        {
          name: "url",
          title: "選擇角色",
          type: "enumeration",
          belongTo: {
            paramName: "sort_by",
            value: ["post_date","video_viewed","most_favourited"],
            },
          enumOptions: [
            { 
              title: "人妻", 
              value: "https://jable.tv/tags/wife/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "醫生", 
              value: "https://jable.tv/tags/doctor/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "護士", 
              value: "https://jable.tv/tags/nurse/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "老師", 
              value: "https://jable.tv/tags/teacher/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "空姐", 
              value: "https://jable.tv/tags/flight-attendant/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "逃犯", 
              value: "https://jable.tv/tags/fugitive/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "情侶", 
              value: "https://jable.tv/tags/couple/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "主播", 
              value: "https://jable.tv/tags/female-anchor/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "風俗娘", 
              value: "https://jable.tv/tags/club-hostess-and-sex-worker/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "家政婦", 
              value: "https://jable.tv/tags/housewife/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "搜查官", 
              value: "https://jable.tv/tags/detective/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "未亡人", 
              value: "https://jable.tv/tags/widow/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "家庭教師", 
              value: "https://jable.tv/tags/private-teacher/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "球隊經理", 
              value: "https://jable.tv/tags/team-manager/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            }
          ],
          value: "https://jable.tv/tags/wife/?mode=async&function=get_block&block_id=list_videos_common_videos_list",
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序",
          enumOptions: [
            { title: "最近更新", value: "post_date" },
            { title: "最多觀看", value: "video_viewed" },
            { title: "最多收藏", value: "most_favourited" },
          ],
        },
        { name: "from", title: "頁碼", type: "page", description: "頁碼", value: "1" },
      ],
    },
    // 交合模塊
    {
      title: "交合",
      description: "按交合分類瀏覽影片",
      requiresWebView: false,
      functionName: "loadPage",
      cacheDuration: 3600,
      params: [
        {
          name: "url",
          title: "選擇交合",
          type: "enumeration",
          belongTo: {
            paramName: "sort_by",
            value: ["post_date","video_viewed","most_favourited"],
            },
          enumOptions: [
            { 
              title: "顏射", 
              value: "https://jable.tv/tags/facial/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "足交", 
              value: "https://jable.tv/tags/footjob/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "痙攣", 
              value: "https://jable.tv/tags/spasms/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "潮吹", 
              value: "https://jable.tv/tags/squirting/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "深喉", 
              value: "https://jable.tv/tags/deep-throat/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "接吻", 
              value: "https://jable.tv/tags/kiss/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "口爆", 
              value: "https://jable.tv/tags/cum-in-mouth/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "口交", 
              value: "https://jable.tv/tags/blowjob/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "乳交", 
              value: "https://jable.tv/tags/tit-wank/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "中出", 
              value: "https://jable.tv/tags/creampie/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            }
          ],
          value: "https://jable.tv/tags/facial/?mode=async&function=get_block&block_id=list_videos_common_videos_list",
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序",
          enumOptions: [
            { title: "最近更新", value: "post_date" },
            { title: "最多觀看", value: "video_viewed" },
            { title: "最多收藏", value: "most_favourited" },
          ],
        },
        { name: "from", title: "頁碼", type: "page", description: "頁碼", value: "1" },
      ],
    },
    // 玩法模塊
    {
      title: "玩法",
      description: "按玩法分類瀏覽影片",
      requiresWebView: false,
      functionName: "loadPage",
      cacheDuration: 3600,
      params: [
        {
          name: "url",
          title: "選擇玩法",
          type: "enumeration",
          belongTo: {
            paramName: "sort_by",
            value: ["post_date","video_viewed","most_favourited"],
            },
          enumOptions: [
            { 
              title: "露出", 
              value: "https://jable.tv/tags/outdoor/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "侵犯", 
              value: "https://jable.tv/tags/intrusion/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "調教", 
              value: "https://jable.tv/tags/tune/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "捆綁", 
              value: "https://jable.tv/tags/bondage/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "痴漢", 
              value: "https://jable.tv/tags/chikan/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "痴女", 
              value: "https://jable.tv/tags/chizyo/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "男M", 
              value: "https://jable.tv/tags/masochism-guy/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "泥醉", 
              value: "https://jable.tv/tags/crapulence/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "泡姬", 
              value: "https://jable.tv/tags/soapland/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "母乳", 
              value: "https://jable.tv/tags/breast-milk/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "放尿", 
              value: "https://jable.tv/tags/piss/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "按摩", 
              value: "https://jable.tv/tags/massage/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "多P", 
              value: "https://jable.tv/tags/groupsex/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "瞬間插入", 
              value: "https://jable.tv/tags/quickie/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "集團侵犯", 
              value: "https://jable.tv/tags/gang-intrusion/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            }
          ],
          value: "https://jable.tv/tags/outdoor/?mode=async&function=get_block&block_id=list_videos_common_videos_list",
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序",
          enumOptions: [
            { title: "最近更新", value: "post_date" },
            { title: "最多觀看", value: "video_viewed" },
            { title: "最多收藏", value: "most_favourited" },
          ],
        },
        { name: "from", title: "頁碼", type: "page", description: "頁碼", value: "1" },
      ],
    },    
    // 主題模塊
    {
      title: "主題",
      description: "按主題分類瀏覽影片",
      requiresWebView: false,
      functionName: "loadPage",
      cacheDuration: 3600,
      params: [
        {
          name: "url",
          title: "選擇主題",
          type: "enumeration",
          belongTo: {
            paramName: "sort_by",
            value: ["post_date","video_viewed","most_favourited"],
            },
          enumOptions: [
            { 
              title: "角色劇情", 
              value: "https://jable.tv/categories/roleplay/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "制服誘惑", 
              value: "https://jable.tv/categories/uniform/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "直接開啪", 
              value: "https://jable.tv/categories/sex-only/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "絲襪美腿", 
              value: "https://jable.tv/categories/pantyhose/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "主奴調教", 
              value: "https://jable.tv/categories/bdsm/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "多P群交", 
              value: "https://jable.tv/categories/groupsex/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "男友視角", 
              value: "https://jable.tv/categories/pov/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "凌辱快感", 
              value: "https://jable.tv/categories/insult/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "盜攝偷拍", 
              value: "https://jable.tv/categories/private-cam/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "無碼解放", 
              value: "https://jable.tv/categories/uncensored/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "女同歡愉", 
              value: "https://jable.tv/categories/lesbian/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            }
          ],
          value: "https://jable.tv/categories/roleplay/?mode=async&function=get_block&block_id=list_videos_common_videos_list",
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序",
          enumOptions: [
            { title: "最近更新", value: "post_date" },
            { title: "最多觀看", value: "video_viewed" },
            { title: "最多收藏", value: "most_favourited" },
          ],
        },
        { name: "from", title: "頁碼", type: "page", description: "頁碼", value: "1" },
      ],
    },
    // 雜項模塊
    {
      title: "雜項",
      description: "按雜項分類瀏覽影片",
      requiresWebView: false,
      functionName: "loadPage",
      cacheDuration: 3600,
      params: [
        {
          name: "url",
          title: "選擇雜項",
          type: "enumeration",
          belongTo: {
            paramName: "sort_by",
            value: ["post_date","video_viewed","most_favourited"],
            },
          enumOptions: [
            { 
              title: "錄像", 
              value: "https://jable.tv/tags/video-recording/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "綜藝", 
              value: "https://jable.tv/tags/variety-show/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "感謝祭", 
              value: "https://jable.tv/tags/thanksgiving/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "節日主題", 
              value: "https://jable.tv/tags/festival/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "四小時以上", 
              value: "https://jable.tv/tags/more-than-4-hours/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            },
            { 
              title: "處女作/隱退作", 
              value: "https://jable.tv/tags/debut-retires/?mode=async&function=get_block&block_id=list_videos_common_videos_list"
            }
          ],
          value: "https://jable.tv/tags/video-recording/?mode=async&function=get_block&block_id=list_videos_common_videos_list",
        },
        {
          name: "sort_by",
          title: "排序",
          type: "enumeration",
          description: "排序",
          enumOptions: [
            { title: "最近更新", value: "post_date" },
            { title: "最多觀看", value: "video_viewed" },
            { title: "最多收藏", value: "most_favourited" },
          ],
        },
        { name: "from", title: "頁碼", type: "page", description: "頁碼", value: "1" },
      ],
    },
  ],
};


async function search(params = {}) {
  const keyword = encodeURIComponent(params.keyword || "");
  
  let url = `https://jable.tv/search/${keyword}/?mode=async&function=get_block&block_id=list_videos_videos_list_search_result&q=${keyword}`;
  
  if (params.sort_by) {
    url += `&sort_by=${params.sort_by}`;
  }
  
  if (params.from) {
    url += `&from=${params.from}`;
  }
  
  return await loadPage({ ...params, url });
}

async function loadPage(params = {}) {
  const sections = await loadPageSections(params);
  const items = sections.flatMap((section) => section.childItems);
  return items;
}

async function loadPageSections(params = {}) {
  try {
    let url = params.url;
    if (!url) {
      throw new Error("地址不能為空");
    }
    if (params["sort_by"]) {
      url += `&sort_by=${params.sort_by}`;
    }
    if (params["from"]) {
      url += `&from=${params.from}`;
    }
    const response = await Widget.http.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      },
    });

    if (!response || !response.data || typeof response.data !== "string") {
      throw new Error("無法獲取有效的HTML內容");
    }

    const htmlContent = response.data;

    return parseHtml(htmlContent);
  } catch (error) {
    console.error("測試過程出錯:", error.message);
    throw error;
  }
}

async function parseHtml(htmlContent) {
  const $ = Widget.html.load(htmlContent);
  const sectionSelector = ".site-content .py-3,.pb-e-lg-40";
  const itemSelector = ".video-img-box";
  const coverSelector = "img";
  const durationSelector = ".absolute-bottom-right .label";
  const titleSelector = ".title a";

  let sections = [];
  const sectionElements = $(sectionSelector).toArray();
  
  for (const sectionElement of sectionElements) {
    const $sectionElement = $(sectionElement);
    var items = [];
    const sectionTitle = $sectionElement.find(".title-box .h3-md").first();
    const sectionTitleText = sectionTitle.text();
    const itemElements = $sectionElement.find(itemSelector).toArray();
    
    if (itemElements && itemElements.length > 0) {
      for (const itemElement of itemElements) {
        const $itemElement = $(itemElement);
        const titleId = $itemElement.find(titleSelector).first();
        const url = titleId.attr("href") || "";
        
        if (url && url.includes("jable.tv")) {
          const durationId = $itemElement.find(durationSelector).first();
          const coverId = $itemElement.find(coverSelector).first();
          const cover = coverId.attr("data-src");
          const video = coverId.attr("data-preview");
          const title = titleId.text();
          const duration = durationId.text().trim();
          
          const item = {
            id: url,
            type: "url",
            title: title,
            backdropPath: cover,
            previewUrl: video,
            link: url,
            mediaType: "movie",
            durationText: duration,
            description: duration
          };
          items.push(item);
        }
      }
    }
    
    if (items.length > 0) {
      sections.push({
        title: sectionTitleText,
        childItems: items
      });
    }
  }
  
  return sections;
}

async function loadDetail(link) {
  const response = await Widget.http.get(link, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    },
  });
  const hlsUrl = response.data.match(/var hlsUrl = '(.*?)';/)[1];
  if (!hlsUrl) {
    throw new Error("無法獲取有效的HLS URL");
  }
  const item = {
    id: link,
    type: "detail",
    videoUrl: hlsUrl,
    mediaType: "movie",
    customHeaders: {
      "Referer": link,
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    },
  };
  const sections = await parseHtml(response.data);
  const items = sections.flatMap((section) => section.childItems);
  if (items.length > 0) {
    item.childItems = items;
  }
  return item;
}