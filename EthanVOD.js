// 核心特色：
// 1. 全源搜尋 - 搜尋所有可用站點，不提前停止
// 2. 极速回應 - 智慧並發 + 健康檢查 + 快取最佳化
// 3. 精準匹配 - 混合相似度演算法 + 上下文匹配
// 4. 即時流式 - 搜到一个回傳一个，即時回饋
// 5. 智慧去重 - 內容相似性去重，避免重複
// 6. 繁簡互通 - 繁體搜尋自動轉簡體查詢，結果自動轉繁體顯示
// 7. 來源精選 - 僅保留實測可用的資源站，剔除失效與廣告站

// ==================== REX / Forward Widget 相容介面 ====================
// 同時相容 Forward 原生 Widget 與 REX 框架。
// REX 規範請見 https://github.com/baranwang/rex-widget-libs
// 真正的 WidgetMetadata 完整宣告在下方「資源站清單」之後；
// 此處只在宣告位置留下 JSDoc 型別提示供編輯器使用。
/** @type {import('@rexnow/libs/env').WidgetMetadata} */
WidgetMetadata = undefined;
// ==================== 繁簡自動轉換 ====================
// 2583 組一對一、無歧義的常用字對照（由 zhconv 產生，僅保留雙向可逆的映射，
// 排除「乾/幹」這類多對一歧義字，避免錯誤轉換）。
// 用途：使用者以繁體搜尋 -> 轉成簡體送去 VOD 站；結果回傳 -> 轉成繁體顯示。
const SIMP_CHARS =
  '万与丑专业丛东丝丢两严丧个丰临为丽举么义乌乐乔习乡书买乱争于亏云亘亚产亩亲亵亸亿仅仆从仑仓仪们价众优伙会伛伞伟传伡伣伤伥伦伧伪伫体余佣佥侠侣侥侦侧侨侩侪侬俣俦俨俩俪俫俭债倾偬偻偾偿傤傥傧储傩儿兑兖党兰关兴兹养兽冁内冈册写军农冯冲决况冻净凄准凉减凑凛几凤凫凭凯凶击凿刍划刘则刚创删别刬刭刹刽刿剀剂剐剑剥剧劝办务劢动励劲劳势勋勚匀匦匮区医华协单卖占卢卤卧卫却卺厂厅历厉压厌厍厐厕厘厢厣厦厨厩厮县叁参叆叇双'
  + '发变叙叠台叶号叹叽吁吃后吓吕吗吣吨听启吴呐呒呓呕呖呗员呙呛呜咏咙咛咝咤咨咸响哑哒哓哔哕哗哙哜哝哟唇唛唝唠唡唢唤啧啬啭啮啯啰啴啸喂喷喽喾嗫嗳嘘嘤嘱噜嚣团园囱围囵国图圆圣圹场坏块坚坛坜坝坞坟坠垄垅垆垒垦垩垫垭垯垱垲垴埘埙埚堑堕塆墙壮声壳壶壸处备复够头夸夹夺奁奂奋奖奥妆妇妈妩妪妫姗姹娄娅娆娇娈娱娲娴婳婴婵婶媪媭嫒嫔嫱嬷孙学孪宁宝实宠审宪宫宽宾寝对寻导寿将尔尘尝尧尴尸尽层屃屉届属屡屦屿岁岂岖岗岘岚岛岩岭岳'
  + '岽岿峃峄峡峣峤峥峦峰崂崃崄崭嵘嵚嵝巅巩巯币帅师帏帐帘帜带帧帮帱帻帼幂干并广庄庆床庐庑库应庙庞废庼廪开异弃弑张弥弪弯弹强归当录彟彦彨彻征径徕忆忏忧忾怀态怂怃怄怅怆怜总怼怿恋恒恳恶恸恹恺恻恼恽悦悫悬悭悮悯惊惧惨惩惫惬惭惮惯愠愤愦愿慑慭懑懒懔戆戋戏戗战戬戯户扑托执扩扪扫扬扰抚抛抟抠抡抢护报担拟拢拣拥拦拧拨择挂挚挛挜挝挞挟挠挡挢挣挤挥挦捝捞损捡换捣据掳掴掷掸掺掼揽揾揿搀搁搂搄搅携摄摅摆摇摈摊撄撑撵撷撸撺擞'
  + '攒敌敚敛敩数斋斓斗斩断无旧时旷旸昙昵昼昽显晋晒晓晔晕晖暂暧术朴机杀杂权杠条来杨杩杰极构枞枢枣枥枧枨枪枫枭柜柠柽栀栅标栈栉栊栋栌栎栏树栖栗样栾桠桡桢档桤桥桦桧桨桩桪梦梼梾梿检棁棂椁椝椟椠椢椤椫椭椮楼榄榅榇榈榉榝槚槛槟槠横樯樱橥橱橹橼檩欢欤欧歼殁殇残殒殓殚殡殴毁毂毕毙毡毵氇气氢氩氲汇汉汤汹沟没沣沤沥沦沧沨沩沪泞泪泶泷泸泺泻泼泽泾洁洒洼浃浅浆浇浈浉浊测浍济浏浐浑浒浓浔浕涂涌涚涛涝涞涟涠涡涢涣涤润涧涨涩淀'
  + '渊渌渍渎渐渑渔渗温游湾湿溁溃溅溆溇滗滚滞滟滠满滢滤滥滦滨滩滪漤潆潇潋潍潜潴澛澜濑濒灏灭灯灵灶灾灿炀炉炖炜炝点炼炽烁烂烃烛烟烦烧烨烩烫烬热焕焖焘煴熏爱爷牍牦牵牺犊状犷犸犹狈狝狞独狭狮狯狰狱狲猃猎猕猡猪猫猬献獭玑玙玚玛玮环现玱玺珐珑珰珲琎琏琐琼瑶瑷瑸璎瓒瓮瓯电画畅畴疖疗疟疠疡疬疭疮疯疱疴痈痉痒痖痨痪痫痳痴瘅瘆瘗瘘瘪瘫瘾瘿癞癣癫皂皑皱皲盏盐监盖盗盘眍眦眬睁睐睑瞆瞒瞩矫矶矾矿砀码砖砗砚砜砺砻砾础硁硕硖硗硙'
  + '硚确硵硷碍碛碜碱礼祃祎祢祯祷祸禀禄禅离秃秆种秘积称秽秾税稣稳穑穞穷窃窍窎窑窜窝窥窦窭竖竞笃笋笔笕笺笼笾筑筚筛筜筝筹筼签筿简箓箦箧箨箩箪箫篑篓篮篯篱簖籁籴类籼粜粝粤粪粮粽糁糇糍紧絷纟纠纡红纣纤纥约级纨纩纪纫纬纭纮纯纰纱纲纳纴纵纶纷纸纹纺纻纼纽纾线绀绁绂练组绅细织终绉绊绋绌绍绎经绐绑绒结绔绕绖绗绘给绚绛络绝绞统绠绡绢绣绤绥绦继绨绩绪绫绬续绮绯绰绱绲绳维绵绶绷绸绹绺绻综绽绾绿缀缁缂缃缄缅缆缇缈缉缊缋缌缍'
  + '缎缏缑缒缓缔缕编缗缘缙缚缛缜缝缞缟缠缡缢缣缤缥缦缧缨缩缪缫缬缭缮缯缰缱缲缳缴缵罂网罗罚罢罴羁羟羡群翘翙翚耢耧耸耻聂聋职聍联聩聪肃肠肤肮肴肾肿胀胁胆胜胧胨胪胫胶脉脍脏脐脑脓脔脚脱脶脸腊腌腘腭腻腼腽腾膑膻臜舆舣舰舱舻艰艳艺节芈芗芜芦苁苇苈苋苌苍苏苧苹范茎茏茑茔茕茧荆荐荙荚荛荜荝荞荟荠荡荣荤荥荦荧荨荩荪荫荬荭荮药莅莱莲莳莴莶获莸莹莺莼萚萝萤营萦萧萨葱蒀蒇蒉蒋蒌蒏蓝蓟蓠蓣蓥蓦蔂蔷蔹蔺蔼蕰蕲蕴薮藓蘖虏虑虚虫'
  + '虬虮虱虽虾虿蚀蚁蚂蚃蚕蚝蚬蛊蛎蛏蛮蛰蛱蛲蛳蛴蜕蜗蜡蝇蝈蝉蝎蝼蝾螀螨蟏衅衔补衬衮袄袅袆袜袭袯装裆裈裢裣裤裥褛褴襕见观觃规觅视觇览觉觊觋觌觍觎觏觐觑觞触觯訚詟誉誊讠计订讣认讥讦讧讨让讪讫训议讯记讱讲讳讴讵讶讷许讹论讻讼讽设访诀证诂诃评诅识诇诈诉诊诋诌词诎诏诐译诒诓诔试诖诗诘诙诚诛诜话诞诟诠诡询诣诤该详诧诨诩诪诫诬语诮误诰诱诲诳说诵诶请诸诹诺读诼诽课诿谀谁谂调谄谅谆谇谈谉谊谋谌谍谎谏谐谑谒谓谔谕谖谗谙谚'
  + '谛谜谝谞谟谠谡谢谣谤谥谦谧谨谩谪谫谬谭谮谯谰谱谲谳谴谵谶豮贝贞负贠贡财责贤败账货质贩贪贫贬购贮贯贰贱贲贳贴贵贶贷贸费贺贻贼贽贾贿赀赁赂赃资赅赆赇赈赉赊赋赌赍赎赏赐赑赒赓赔赕赖赗赘赙赚赛赜赝赞赟赠赡赢赣赪赵赶趋趱趸跃跄跖跞践跶跷跸跹跻踊踌踪踬踯蹑蹒蹰蹿躏躜躯车轧轨轩轪轫转轭轮软轰轱轲轳轴轵轶轷轸轹轺轻轼载轾轿辀辁辂较辄辅辆辇辈辉辊辋辌辍辎辏辐辑辒输辔辕辖辗辘辙辚辞辟辩辫边辽达迁过迈运还这进远违连迟迩'
  + '迳迹适选逊递逦逻遗遥邓邝邬邮邹邺邻郁郏郐郑郓郦郧郸酂酝酦酱酽酾酿采释里鉴銮錾钅钆钇针钉钊钋钌钍钎钏钐钑钒钓钔钕钖钗钘钙钚钛钝钞钟钠钡钢钣钤钥钦钧钨钩钪钫钬钭钮钯钰钱钲钳钴钵钶钷钸钹钺钻钼钽钾钿铀铁铂铃铄铅铆铇铈铉铊铋铌铍铎铏铐铑铒铓铔铕铖铗铘铙铚铛铜铝铞铟铠铡铢铣铤铥铦铧铨铩铪铫铬铭铮铯铰铱铲铳铴铵银铷铸铹铺铻铼铽链铿销锁锂锃锄锅锆锇锈锉锊锋锌锍锎锏锐锑锒锓锔锕锖锗锘错锚锛锜锝锞锟锠锡锢锣锤锥锦锧'
  + '锨锩锪锫锬锭键锯锰锱锲锳锴锵锶锷锸锹锻锼锽锾锿镀镁镂镃镄镅镆镇镈镉镊镋镌镍镎镏镐镑镒镓镔镕镖镗镘镙镚镛镜镝镞镠镡镢镣镤镥镦镧镨镩镪镫镬镭镮镯镰镱镲镳镴镵镶长门闩闪闫闬闭问闯闰闱闲闳间闵闶闷闸闹闺闻闼闽闾闿阀阁阂阃阄阅阆阇阈阉阊阋阌阍阎阏阐阑阒阓阔阕阖阗阘阙阚阛队阳阴阵阶际陆陇陈陉陕陦陧陨险随隐隶隽难雇雏雠雳雾霁霉霡霭靓靔静靥鞑鞒鞯鞲韦韧韨韩韪韫韬韵页顶顷顸项顺须顼顽顾顿颀颁颂颃预颅领颇颈颉颊颋颌颍'
  + '颎颏颐频颒颓颔颕颖颗题颙颚颛颜额颞颟颠颡颢颣颤颥颦颧风飏飐飑飒飓飔飕飖飗飘飙飚飞飨餍饣饤饥饦饧饨饩饪饫饬饭饮饯饰饱饲饳饴饵饶饷饸饹饺饻饼饽饾饿馁馂馃馄馅馆馇馈馉馊馋馌馍馎馏馐馑馒馓馔馕马驭驮驯驰驱驲驳驴驵驶驷驸驹驺驻驼驽驾驿骀骁骂骃骄骅骆骇骈骉骊骋验骍骎骏骐骑骒骓骔骕骖骗骘骙骚骛骜骝骞骟骠骡骢骣骤骥骦骧髅髋髌鬓鬶魇魉鱼鱽鱾鱿鲀鲁鲂鲄鲅鲆鲇鲈鲉鲊鲋鲌鲍鲎鲏鲐鲑鲒鲓鲔鲕鲖鲗鲘鲙鲚鲛鲜鲝鲞鲟鲠鲡鲢鲣鲤鲥'
  + '鲦鲧鲨鲩鲪鲫鲬鲭鲮鲯鲰鲱鲲鲳鲴鲵鲶鲷鲸鲹鲺鲻鲼鲽鲾鲿鳀鳁鳂鳃鳄鳅鳆鳇鳈鳉鳊鳋鳌鳍鳎鳏鳐鳑鳒鳓鳔鳕鳖鳗鳘鳙鳛鳜鳝鳞鳟鳠鳡鳢鳣鸟鸠鸡鸢鸣鸤鸥鸦鸧鸨鸩鸪鸫鸬鸭鸮鸯鸰鸱鸲鸳鸴鸵鸶鸷鸸鸹鸺鸻鸼鸽鸾鸿鹀鹁鹂鹃鹄鹅鹆鹇鹈鹉鹊鹋鹌鹍鹎鹏鹐鹑鹒鹓鹔鹕鹖鹗鹘鹙鹚鹛鹜鹝鹞鹟鹠鹡鹢鹣鹤鹥鹦鹧鹨鹩鹪鹫鹬鹭鹯鹰鹱鹲鹳鹴鹾麦麸黄黉黡黩黪黾鼋鼌鼍鼗鼹齐齑齿龀龁龂龃龄龅龆龇龈龉龊龋龌龙龚龛龟鿒鿔鿭';
const TRAD_CHARS =
  '萬與醜專業叢東絲丟兩嚴喪個豐臨爲麗舉麼義烏樂喬習鄉書買亂爭於虧雲亙亞產畝親褻嚲億僅僕從侖倉儀們價衆優夥會傴傘偉傳俥俔傷倀倫傖僞佇體餘傭僉俠侶僥偵側僑儈儕儂俁儔儼倆儷倈儉債傾傯僂僨償儎儻儐儲儺兒兌兗黨蘭關興茲養獸囅內岡冊寫軍農馮衝決況凍淨悽準涼減湊凜幾鳳鳧憑凱兇擊鑿芻劃劉則剛創刪別剗剄剎劊劌剴劑剮劍剝劇勸辦務勱動勵勁勞勢勳勩勻匭匱區醫華協單賣佔盧滷臥衛卻巹廠廳歷厲壓厭厙龎廁釐廂厴廈廚廄廝縣叄參靉靆雙'
  + '發變敘疊臺葉號嘆嘰籲喫後嚇呂嗎唚噸聽啓吳吶嘸囈嘔嚦唄員咼嗆嗚詠嚨嚀噝吒諮鹹響啞噠嘵嗶噦譁噲嚌噥喲脣嘜嗊嘮啢嗩喚嘖嗇囀齧嘓囉嘽嘯餵噴嘍嚳囁噯噓嚶囑嚕囂團園囪圍圇國圖圓聖壙場壞塊堅壇壢壩塢墳墜壟壠壚壘墾堊墊埡墶壋塏堖塒壎堝塹墮壪牆壯聲殼壺壼處備復夠頭誇夾奪奩奐奮獎奧妝婦媽嫵嫗嬀姍奼婁婭嬈嬌孌娛媧嫺嫿嬰嬋嬸媼嬃嬡嬪嬙嬤孫學孿寧寶實寵審憲宮寬賓寢對尋導壽將爾塵嘗堯尷屍盡層屓屜屆屬屢屨嶼歲豈嶇崗峴嵐島巖嶺嶽'
  + '崬巋嶨嶧峽嶢嶠崢巒峯嶗崍嶮嶄嶸嶔嶁巔鞏巰幣帥師幃帳簾幟帶幀幫幬幘幗冪幹並廣莊慶牀廬廡庫應廟龐廢廎廩開異棄弒張彌弳彎彈強歸當錄彠彥彲徹徵徑徠憶懺憂愾懷態慫憮慪悵愴憐總懟懌戀恆懇惡慟懨愷惻惱惲悅愨懸慳悞憫驚懼慘懲憊愜慚憚慣慍憤憒願懾憖懣懶懍戇戔戲戧戰戩戱戶撲託執擴捫掃揚擾撫拋摶摳掄搶護報擔擬攏揀擁攔擰撥擇掛摯攣掗撾撻挾撓擋撟掙擠揮撏挩撈損撿換搗據擄摑擲撣摻摜攬搵撳攙擱摟揯攪攜攝攄擺搖擯攤攖撐攆擷擼攛擻'
  + '攢敵敓斂斆數齋斕鬥斬斷無舊時曠暘曇暱晝曨顯晉曬曉曄暈暉暫曖術樸機殺雜權槓條來楊榪傑極構樅樞棗櫪梘棖槍楓梟櫃檸檉梔柵標棧櫛櫳棟櫨櫟欄樹棲慄樣欒椏橈楨檔榿橋樺檜槳樁樳夢檮棶槤檢梲欞槨槼櫝槧槶欏樿橢槮樓欖榲櫬櫚櫸樧檟檻檳櫧橫檣櫻櫫櫥櫓櫞檁歡歟歐殲歿殤殘殞殮殫殯毆毀轂畢斃氈毿氌氣氫氬氳匯漢湯洶溝沒灃漚瀝淪滄渢潙滬濘淚澩瀧瀘濼瀉潑澤涇潔灑窪浹淺漿澆湞溮濁測澮濟瀏滻渾滸濃潯濜塗湧涗濤澇淶漣潿渦溳渙滌潤澗漲澀澱'
  + '淵淥漬瀆漸澠漁滲溫遊灣溼濚潰濺漵漊潷滾滯灩灄滿瀅濾濫灤濱灘澦灠瀠瀟瀲濰潛瀦瀂瀾瀨瀕灝滅燈靈竈災燦煬爐燉煒熗點煉熾爍爛烴燭煙煩燒燁燴燙燼熱煥燜燾熅燻愛爺牘犛牽犧犢狀獷獁猶狽獮獰獨狹獅獪猙獄猻獫獵獼玀豬貓蝟獻獺璣璵瑒瑪瑋環現瑲璽琺瓏璫琿璡璉瑣瓊瑤璦璸瓔瓚甕甌電畫暢疇癤療瘧癘瘍癧瘲瘡瘋皰痾癰痙癢瘂癆瘓癇痲癡癉瘮瘞瘻癟癱癮癭癩癬癲皁皚皺皸盞鹽監蓋盜盤瞘眥矓睜睞瞼瞶瞞矚矯磯礬礦碭碼磚硨硯碸礪礱礫礎硜碩硤磽磑'
  + '礄確磠礆礙磧磣鹼禮禡禕禰禎禱禍稟祿禪離禿稈種祕積稱穢穠稅穌穩穡穭窮竊竅窵窯竄窩窺竇窶豎競篤筍筆筧箋籠籩築篳篩簹箏籌篔籤篠簡籙簀篋籜籮簞簫簣簍籃籛籬籪籟糴類秈糶糲粵糞糧糉糝餱餈緊縶糹糾紆紅紂纖紇約級紈纊紀紉緯紜紘純紕紗綱納紝縱綸紛紙紋紡紵紖紐紓線紺紲紱練組紳細織終縐絆紼絀紹繹經紿綁絨結絝繞絰絎繪給絢絳絡絕絞統綆綃絹繡綌綏絛繼綈績緒綾緓續綺緋綽鞝緄繩維綿綬繃綢綯綹綣綜綻綰綠綴緇緙緗緘緬纜緹緲緝縕繢緦綞'
  + '緞緶緱縋緩締縷編緡緣縉縛縟縝縫縗縞纏縭縊縑繽縹縵縲纓縮繆繅纈繚繕繒繮繾繰繯繳纘罌網羅罰罷羆羈羥羨羣翹翽翬耮耬聳恥聶聾職聹聯聵聰肅腸膚骯餚腎腫脹脅膽勝朧腖臚脛膠脈膾髒臍腦膿臠腳脫腡臉臘醃膕齶膩靦膃騰臏羶臢輿艤艦艙艫艱豔藝節羋薌蕪蘆蓯葦藶莧萇蒼蘇薴蘋範莖蘢蔦塋煢繭荊薦薘莢蕘蓽萴蕎薈薺蕩榮葷滎犖熒蕁藎蓀蔭蕒葒葤藥蒞萊蓮蒔萵薟獲蕕瑩鶯蓴蘀蘿螢營縈蕭薩蔥蒕蕆蕢蔣蔞醟藍薊蘺蕷鎣驀虆薔蘞藺藹薀蘄蘊藪蘚櫱虜慮虛蟲'
  + '虯蟣蝨雖蝦蠆蝕蟻螞蠁蠶蠔蜆蠱蠣蟶蠻蟄蛺蟯螄蠐蛻蝸蠟蠅蟈蟬蠍螻蠑螿蟎蠨釁銜補襯袞襖嫋褘襪襲襏裝襠褌褳襝褲襉褸襤襴見觀覎規覓視覘覽覺覬覡覿覥覦覯覲覷觴觸觶誾讋譽謄訁計訂訃認譏訐訌討讓訕訖訓議訊記訒講諱謳詎訝訥許訛論訩訟諷設訪訣證詁訶評詛識詗詐訴診詆謅詞詘詔詖譯詒誆誄試詿詩詰詼誠誅詵話誕詬詮詭詢詣諍該詳詫諢詡譸誡誣語誚誤誥誘誨誑說誦誒請諸諏諾讀諑誹課諉諛誰諗調諂諒諄誶談讅誼謀諶諜謊諫諧謔謁謂諤諭諼讒諳諺'
  + '諦謎諞諝謨讜謖謝謠謗諡謙謐謹謾謫譾謬譚譖譙讕譜譎讞譴譫讖豶貝貞負貟貢財責賢敗賬貨質販貪貧貶購貯貫貳賤賁貰貼貴貺貸貿費賀貽賊贄賈賄貲賃賂贓資賅贐賕賑賚賒賦賭齎贖賞賜贔賙賡賠賧賴賵贅賻賺賽賾贗贊贇贈贍贏贛赬趙趕趨趲躉躍蹌蹠躒踐躂蹺蹕躚躋踴躊蹤躓躑躡蹣躕躥躪躦軀車軋軌軒軑軔轉軛輪軟轟軲軻轤軸軹軼軤軫轢軺輕軾載輊轎輈輇輅較輒輔輛輦輩輝輥輞輬輟輜輳輻輯轀輸轡轅轄輾轆轍轔辭闢辯辮邊遼達遷過邁運還這進遠違連遲邇'
  + '逕跡適選遜遞邐邏遺遙鄧鄺鄔郵鄒鄴鄰鬱郟鄶鄭鄆酈鄖鄲酇醞醱醬釅釃釀採釋裏鑑鑾鏨釒釓釔針釘釗釙釕釷釺釧釤鈒釩釣鍆釹鍚釵鈃鈣鈈鈦鈍鈔鍾鈉鋇鋼鈑鈐鑰欽鈞鎢鉤鈧鈁鈥鈄鈕鈀鈺錢鉦鉗鈷鉢鈳鉕鈽鈸鉞鑽鉬鉭鉀鈿鈾鐵鉑鈴鑠鉛鉚鉋鈰鉉鉈鉍鈮鈹鐸鉶銬銠鉺鋩錏銪鋮鋏鋣鐃銍鐺銅鋁銱銦鎧鍘銖銑鋌銩銛鏵銓鎩鉿銚鉻銘錚銫鉸銥鏟銃鐋銨銀銣鑄鐒鋪鋙錸鋱鏈鏗銷鎖鋰鋥鋤鍋鋯鋨鏽銼鋝鋒鋅鋶鐦鐧銳銻鋃鋟鋦錒錆鍺鍩錯錨錛錡鍀錁錕錩錫錮鑼錘錐錦鑕'
  + '鍁錈鍃錇錟錠鍵鋸錳錙鍥鍈鍇鏘鍶鍔鍤鍬鍛鎪鍠鍰鎄鍍鎂鏤鎡鐨鎇鏌鎮鎛鎘鑷钂鐫鎳鎿鎦鎬鎊鎰鎵鑌鎔鏢鏜鏝鏍鏰鏞鏡鏑鏃鏐鐔钁鐐鏷鑥鐓鑭鐠鑹鏹鐙鑊鐳鐶鐲鐮鐿鑔鑣鑞鑱鑲長門閂閃閆閈閉問闖閏闈閒閎間閔閌悶閘鬧閨聞闥閩閭闓閥閣閡閫鬮閱閬闍閾閹閶鬩閿閽閻閼闡闌闃闠闊闋闔闐闒闕闞闤隊陽陰陣階際陸隴陳陘陝隯隉隕險隨隱隸雋難僱雛讎靂霧霽黴霢靄靚靝靜靨韃鞽韉韝韋韌韍韓韙韞韜韻頁頂頃頇項順須頊頑顧頓頎頒頌頏預顱領頗頸頡頰頲頜潁'
  + '熲頦頤頻頮頹頷頴穎顆題顒顎顓顏額顳顢顛顙顥纇顫顬顰顴風颺颭颮颯颶颸颼颻飀飄飆飈飛饗饜飠飣飢飥餳飩餼飪飫飭飯飲餞飾飽飼飿飴餌饒餉餄餎餃餏餅餑餖餓餒餕餜餛餡館餷饋餶餿饞饁饃餺餾饈饉饅饊饌饢馬馭馱馴馳驅馹駁驢駔駛駟駙駒騶駐駝駑駕驛駘驍罵駰驕驊駱駭駢驫驪騁驗騂駸駿騏騎騍騅騌驌驂騙騭騤騷騖驁騮騫騸驃騾驄驏驟驥驦驤髏髖髕鬢鬹魘魎魚魛魢魷魨魯魴魺鮁鮃鮎鱸鮋鮓鮒鮊鮑鱟鮍鮐鮭鮚鮳鮪鮞鮦鰂鮜鱠鱭鮫鮮鮺鯗鱘鯁鱺鰱鰹鯉鰣'
  + '鰷鯀鯊鯇鮶鯽鯒鯖鯪鯕鯫鯡鯤鯧鯝鯢鯰鯛鯨鰺鯴鯔鱝鰈鰏鱨鯷鰮鰃鰓鱷鰍鰒鰉鰁鱂鯿鰠鰲鰭鰨鰥鰩鰟鰜鰳鰾鱈鱉鰻鰵鱅鰼鱖鱔鱗鱒鱯鱤鱧鱣鳥鳩雞鳶鳴鳲鷗鴉鶬鴇鴆鴣鶇鸕鴨鴞鴦鴒鴟鴝鴛鷽鴕鷥鷙鴯鴰鵂鴴鵃鴿鸞鴻鵐鵓鸝鵑鵠鵝鵒鷳鵜鵡鵲鶓鵪鵾鵯鵬鵮鶉鶊鵷鷫鶘鶡鶚鶻鶖鷀鶥鶩鷊鷂鶲鶹鶺鷁鶼鶴鷖鸚鷓鷚鷯鷦鷲鷸鷺鸇鷹鸌鸏鸛鸘鹺麥麩黃黌黶黷黲黽黿鼂鼉鞀鼴齊齏齒齔齕齗齟齡齙齠齜齦齬齪齲齷龍龔龕龜鿓鎶鉨';

const _simpToTradMap = new Map();
const _tradToSimpMap = new Map();
for (let _i = 0; _i < SIMP_CHARS.length; _i++) {
  _simpToTradMap.set(SIMP_CHARS[_i], TRAD_CHARS[_i]);
  _tradToSimpMap.set(TRAD_CHARS[_i], SIMP_CHARS[_i]);
}

/**
 * 逐字轉換。任何不在對照表內的字元原樣保留，因此不會破壞英文、
 * 數字、標點或已正確的繁體字。
 */
function convertChinese(text, toTraditional = true) {
  if (!text || typeof text !== 'string') return text || '';
  const map = toTraditional ? _simpToTradMap : _tradToSimpMap;
  let out = '';
  for (const ch of text) out += map.get(ch) || ch;
  return out;
}

/**
 * 產生搜尋關鍵字的所有候選變體。
 * 繁體站點常見片名為簡體，若只用原字串搜尋會零結果；
 * 反之簡體關鍵字送進繁體站同樣搜不到，故雙向都試。
 */
function buildSearchVariants(keyword) {
  const variants = [];
  const push = (v) => {
    const t = (v || '').trim();
    if (t && !variants.includes(t)) variants.push(t);
  };
  push(keyword);
  push(convertChinese(keyword, true));   // -> 繁體
  push(convertChinese(keyword, false));  // -> 簡體
  return variants;
}

/**
 * 移除片名中的繁簡差異，讓「繁體查詢」與「簡體結果」能正確比對。
 * 回傳正規化後的鍵：兩個方向的片名都會落到同一個鍵上。
 */
function normalizeForMatching(text) {
  if (!text) return '';
  return convertChinese(String(text), true)
    .replace(/\s+/g, '')
    .toLowerCase();
}

// ==================== TMDB 跨地區別名解析 ====================
//
// 為什麼這層存在：Forward 帶入的多為繁體中文片名（台/港翻譯），資源
// 站上則是簡體中文（大陸翻譯）。純字對字繁簡轉換救不了翻譯差異（陰屍
// 路 → 行屍走肉、盜夢空間 → 全面啟動根本是反過來的）。TMDB 的
// alternative_titles 內同一條目會記下所有地區命名，用它做橋樑。
//
// 設計目標：搜尋的 hot path **絕不 await TMDB**。
//   - cache 命中 → 同步 getStorage()，但 storage 在 widget runtime 是
//     async，所以這層必須做成「給輸入，回傳已知的 alias 陣列」
//   - cache miss → 立刻回傳空陣列（hot path 用原本搜尋），背景送
//     fetch 更新 cache，下次進場才用
//
// 任何錯誤（timeout / rate-limit / 網路掛 / 404）→ 靜默吞掉，回傳空
// 陣列（等同於原本的純繁簡搜尋）。console.warn 留線索但不 throw。

// 別名 cache 結構（內存，啟動時從 storage 載入）：
//   Map<cacheKey, { aliases: string[], ts: number }>
// cacheKey = `tmdb_alias_${shaLike(baseName)}_${type}`
// 並非加密用，只是把中文片名變成穩定短字串當 storage key 用。
function _tmdbAliasKey(baseName, type) {
  const norm = String(baseName || '').trim()
    .toLowerCase()
    // 移除 season/year 標記，避免「仁醫2009」「仁醫2012」分別
    // 各佔一筆 cache。TMDB 對「仁醫」會一次回 2009/2012 兩版的所有
    // 別名，cache 共用即可。
    .replace(/\s*(?:19|20)\d{2}\s*$/, '')
    .replace(/\s*(?:s|season)\s*\d+\s*$/i, '')
    .replace(/第[一二三四五六七八九十零\d]+季/, '')
    .trim();
  // 不做嚴格 hash，storage key 中文也吃；只取尾段避免太長。
  return `tmdb_alias_${encodeURIComponent(norm).slice(0, 200)}_${type || 'tv'}`;
}

// 啟動時載入的內存 cache。值帶 ts 以支援 TTL 判斷（雖然 TTL 主要靠
// storage 控制，這層只是 importance，避免 reload 後從零開始重打）。
const _tmdbAliasCache = new Map();
// 防止同一片名 fire-and-forget 重複觸發 N 次。
const _tmdbAliasInFlight = new Set();
// 共享 Promise:多個 caller 等同一片名的 in-flight 結果。
// 用 Promise 物件而不是 Set,這樣 call site 可以 await 而非 race setTimeout。
const _tmdbInFlightPromise = new Map();  // key -> Promise<void>
// 短期內重複查同一片名直接復用結果（即使 cache miss）。
const _tmdbAliasRecent = new Map();  // key -> { aliases, ts }

async function _loadTmdbAliasCacheFromStorage() {
  if (!Widget?.storage?.get) return;
  try {
    // 一次讀全部條目不太實際（散落不同 key），改採逐 key：
    // 改採輕量做法：第一次 alias 查詢時 lazy load。
    // （這層只是縮短重建時間，不影響正確性。）
  } catch (e) { /* 無 storage 權限時忽略 */ }
}

async function _storeTmdbAliasCache(cacheKey, aliases) {
  if (!Widget?.storage?.set || !aliases || aliases.length === 0) return;
  try {
    await Widget.storage.set(cacheKey, JSON.stringify({ aliases, ts: Date.now() }), CONFIG.TMDB.CACHE_TTL);
  } catch (e) { /* 寫 storage 失敗不影響功能 */ }
}

async function _readTmdbAliasCache(cacheKey) {
  if (!Widget?.storage?.get) return null;
  try {
    const raw = await Widget.storage.get(cacheKey);
    if (!raw) return null;
    const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
    if (!parsed || !Array.isArray(parsed.aliases)) return null;
    return parsed;
  } catch (e) { return null; }
}

/**
 * 同步介面：取 baseName 對應的別名陣列。
 *
 * Hot path 用法：永遠不 await，永遠不 throw，永遠立刻回傳。
 * Cache 命中時回傳 hit；miss 時回傳 [] 並 fire-and-forget 觸發背景 fetch。
 *
 * 行為：
 *   - TMDB 未啟用 / 沒 API key       → 回 []
 *   - in-memory cache 命中             → 同步回傳
 *   - 否則 fire-and-forget 觸發查詢   → 回 []（hot path 繼續用原 keyword）
 *   - 不拋例外、不印 error log
 *
 * 注意：若搜尋 path 想要第一次就吃到別名，請用 `getTMDBAliasesBlocking`。
 * 這個函式只適合「下一次進場或 storage 已寫」的情境。
 */
function getTMDBAliasesFast(baseName, type) {
  if (!CONFIG.TMDB?.ENABLED) return [];
  if (!CONFIG.TMDB.API_KEY) {
    // 完全沒設 key，給一次靜默提示（避免使用者啟用了卻沒填 key 而不知）
    if (!getTMDBAliasesFast._warned) {
      console.log('[TMDB] 別名查詢啟用但 API Key 未設置，走原本的純繁簡邏輯。');
      getTMDBAliasesFast._warned = true;
    }
    return [];
  }
  const base = String(baseName || '').trim();
  if (!base || base.length < 2) return [];

  const cacheKey = _tmdbAliasKey(base, type);

  // 1. 內存 cache
  const cached = _tmdbAliasCache.get(cacheKey);
  if (cached) return cached.aliases;

  // 2. 去抖：300ms 內重複查詢直接復用舊值
  const recent = _tmdbAliasRecent.get(cacheKey);
  if (recent && (Date.now() - recent.ts) < 300) {
    return recent.aliases;
  }

  // 3. storage cache（fire-and-forget 讀，填進內存讓下次同步命中）
  if (Widget?.storage?.get) {
    _readTmdbAliasCache(cacheKey).then(stored => {
      if (stored?.aliases?.length) {
        _tmdbAliasCache.set(cacheKey, { aliases: stored.aliases, ts: stored.ts || Date.now() });
      }
    }).catch(() => {});
  }

  // 4. 觸發實際查詢（fire-and-forget）
  if (!_tmdbAliasInFlight.has(cacheKey)) {
    _tmdbAliasInFlight.add(cacheKey);
    _fetchTMDBAliasesAsync(base, type, cacheKey)
      .finally(() => _tmdbAliasInFlight.delete(cacheKey));
  }

  return [];
}

/**
 * 阻塞介面：第一次搜尋時同步等 TMDB，確保這次搜尋就吃到別名。
 *
 * 設計目標：使用者首次搜某片名時，原本會因 cache miss 走純繁簡邏輯，
 * 結果是「陰屍路 → 阴尸路 → 站方 0 筆」。這個函式讓首次搜就 block
 * 最多 ~1.5 秒等 TMDB 回 CN/HK/TW 別名，命中率從 0% 拉到 90%+。
 *
 * 性能成本：單次最多 1.5 秒。但只發生在「這個片名」第一次被搜時，
 * 第二次以後永遠 in-memory cache 命中（< 1ms）。
 *
 * 為什麼不是 0ms：TMDB 即便沒回覆，搜尋還是要用原本 keyword 跑（fallback
 * 路徑）。所以最壞情境 = TMDB timeout + 原本搜尋，跟沒加這層一模一樣。
 *
 * @param {string} baseName
 * @param {string} type  'tv' | 'movie'
 * @param {number} maxWaitMs  最長等多久。預設 1500。
 * @returns {Promise<string[]>} 別名陣列（cache miss + TMDB timeout 時可能空陣列）
 */

// Forward widget runtime **沒有全域 setTimeout / setInterval**（直接調會拋
// `Can't find variable: setTimeout`）。Widget.http.get 跟 Widget.storage
// 都回 Promise，所以延遲/timeout/輪詢這類需求用「Promise + microtask」模擬。
//
// 設計選擇：用 microtask (`queueMicrotask` / `Promise.resolve().then`)
// 代替 setTimeout。微任務比 setTimeout(0) 還快（沒 macro task 排隊），
// 在 Forward 這個 async runtime 內行為等價甚至更即時。
//
// 對 `Promise.race` 的 timeout 用途：原本 30ms 的 tick 改成 1 個 microtask
// 排程後立即跑 callback，行為跟 setTimeout 0 接近；差異只在於 race 競爭
// 順序，但 race 結果取決於第一個 resolve，跟排程機制無關。
function _defer(fn, delayMs) {
  // delayMs 在 Forward runtime 內不準（沒 setTimeout 就沒辦法精準延遲），
  // 保留參數只是為了跟 setTimeout 簽名一致；實際立即排進 microtask queue。
  try { return Promise.resolve().then(fn); }
  catch (e) { return fn(); }
}

async function getTMDBAliasesBlocking(baseName, type, maxWaitMs = 1500) {
  if (!CONFIG.TMDB?.ENABLED || !CONFIG.TMDB.API_KEY) return [];
  const base = String(baseName || '').trim();
  if (!base || base.length < 2) return [];

  const cacheKey = _tmdbAliasKey(base, type);

  // 1. 內存 cache
  const cached = _tmdbAliasCache.get(cacheKey);
  if (cached && cached.aliases && cached.aliases.length > 0) {
    return cached.aliases;
  }

  // 2. 300ms 去抖：避免並發場景下重複查詢
  const recent = _tmdbAliasRecent.get(cacheKey);
  if (recent && (Date.now() - recent.ts) < 300) {
    return recent.aliases || [];
  }

  // 3. 先快速讀 storage（storage 通常 < 100ms，因為是同步 in-process impl）
  if (Widget?.storage?.get) {
    try {
      // Forward runtime 沒有 setTimeout，所以用 microtask + deadline 計時模擬
      // 「最多等 N ms」。storage 通常 < 100ms 完成，microtask 立即跑即可。
      let _storageDone = false;
      let _storageResult = null;
      const _stMicrotask = Promise.resolve().then(() => undefined);
      const _storageReadP = Promise.resolve().then(async () => {
        const r = await _readTmdbAliasCache(cacheKey);
        _storageResult = r;
        _storageDone = true;
      });
      const _storageDeadlineP = Promise.resolve().then(() => new Promise(resolve => {
        const startT = Date.now();
        const checkDeadline = () => {
          if (_storageDone) return resolve();
          if (Date.now() - startT >= Math.min(200, maxWaitMs)) return resolve();
          // microtask 立即排程，busy loop 直到 storage 完成或 deadline
          Promise.resolve().then(checkDeadline);
        };
        checkDeadline();
      }));
      await Promise.race([_storageReadP, _storageDeadlineP]);
      const stored = _storageResult;
      if (stored?.aliases?.length) {
        // 品質檢查：只有 1 個別名的 storage cache 視為 stale ——
        // 那是 v2.8.4 之前的版本只拿 hit 內欄位的產物（baseName + original_name），
        // 沒 CN/HK 多地區別名。對中文劇來說等同無用，繼續走第 4 步 fetch。
        // （v2.8.5+ 會把 alt_titles 拿進來，正常會有 3~10 個別名）
        if (stored.aliases.length < 2) {
          console.log(`[TMDB-diag] storage cache stale (only ${stored.aliases.length} alias): "${stored.aliases.join(', ')}"，重新 fetch`);
        } else {
          _tmdbAliasCache.set(cacheKey, { aliases: stored.aliases, ts: stored.ts || Date.now() });
          _tmdbAliasRecent.set(cacheKey, { aliases: stored.aliases, ts: Date.now() });
          return stored.aliases;
        }
      }
    } catch (e) {
      // storage timeout，不影響 — 直接進第 4 步打 TMDB
    }
  }

  // 4. 同步等 TMDB，但嚴守 maxWaitMs。TMDB 不準時 → fallback
  //
  // 重要修正 (v25 patch 2)：
  //   原本用 60ms 輪詢 _tmdbAliasCache 來偵測完成，但若 _fetchTMDBAliasesAsync
  //   內部 await 失敗/timeout 完全不會寫進 cache，watchP 永遠輪空，最後只
  //   能等滿 maxWaitMs 才退場 — 這對 call site 仍會等 1.5s，浪費時間且容易
  //   讓 performBatchSearch 之類的後續路徑拿不到結果。
  //
  //   修法：把 in-flight 的 Promise 包進一個「共享變數」，所有 caller 共用同
  //   一個 await。新的 fetch 由第一個 caller 啟動、Promise 物件存在 _tmdbInFlightPromise
  //   上；後續 caller 直接 race 這個 Promise，省去重複 fetch 與重複 timeout 計時。
  let inflightP = _tmdbInFlightPromise.get(cacheKey);
  if (!inflightP) {
    inflightP = (async () => {
      try {
        await _fetchTMDBAliasesAsync(base, type, cacheKey);
      } catch (e) {
        if (CONFIG.TMDB.VERBOSE) console.warn('[TMDB] fetch 失敗:', e?.message || e);
      }
    })();
    _tmdbInFlightPromise.set(cacheKey, inflightP);
    // 跑完後清掉 map，後續 cold caller 重新啟動（避免持有舊 Promise 浪費記憶）
    inflightP.finally(() => {
      if (_tmdbInFlightPromise.get(cacheKey) === inflightP) {
        _tmdbInFlightPromise.delete(cacheKey);
      }
    });
  }

  // Race：cache 出現資料 vs in-flight 完成 vs 整體 timeout。
  // 三者任一先發生就 return。
  //
  // v2.8.9 修法：Forward runtime 沒有全域 setTimeout，所以把原本的
  // setTimeout 30ms 輪詢 / 1500ms 整體 timeout 都改用 microtask +
  // Date.now() deadline。microtask 立即排進 queue，busy loop 期間
  // 其他 async 任務（_fetchTMDBAliasesAsync 的 Promise 鏈）能正常
  // resolve。cache 寫入後 tick 會看到並 resolve race。
  const startTs = Date.now();
  // timeoutP：deadline 到期時 resolve（不再用 setTimeout）
  const timeoutP = new Promise((resolve) => {
    const waitDeadline = () => {
      if (Date.now() - startTs >= maxWaitMs) {
        console.log(`[TMDB-diag] getTMDBAliasesBlocking: timeoutP fired after ${Date.now() - startTs}ms`);
        resolve({ kind: 'timeout', aliases: [] });
        return;
      }
      Promise.resolve().then(waitDeadline);
    };
    waitDeadline();
  });
  // cacheWatchP：30ms 輪詢改 microtask tick（cache 寫入或 deadline 到期）
  const cacheWatchP = new Promise((resolve) => {
    const deadline = startTs + maxWaitMs;
    const tick = () => {
      const c = _tmdbAliasCache.get(cacheKey);
      if (c?.aliases) {
        console.log(`[TMDB-diag] cacheWatchP: cache hit after ${Date.now() - startTs}ms (n=${c.aliases.length})`);
        resolve({ kind: 'cache', aliases: c.aliases });
        return;
      }
      if (Date.now() >= deadline) {
        console.log(`[TMDB-diag] cacheWatchP: deadline hit after ${Date.now() - startTs}ms`);
        resolve({ kind: 'timeout', aliases: [] });
        return;
      }
      Promise.resolve().then(tick);
    };
    tick();
  });
  const inflightDoneP = inflightP.then(() => {
    const a = (_tmdbAliasCache.get(cacheKey)?.aliases) || [];
    console.log(`[TMDB-diag] inflightDoneP: inflight done after ${Date.now() - startTs}ms, cache.aliases=${a.length}`);
    return { kind: 'inflight', aliases: a };
  }).catch((e) => {
    console.log(`[TMDB-diag] inflightDoneP: rejected after ${Date.now() - startTs}ms: ${e?.message || e}`);
    return { kind: 'inflight', aliases: [] };
  });

  const result = await Promise.race([cacheWatchP, inflightDoneP, timeoutP]);
  if (CONFIG.TMDB.VERBOSE) {
    console.log(`[TMDB-diag] getTMDBAliasesBlocking result: kind=${result.kind}, n=${result.aliases.length}, elapsed=${Date.now() - startTs}ms`);
  }
  return (result && result.aliases) || [];
}

async function _fetchTMDBAliasesAsync(baseName, type, cacheKey) {
  const apiKey = CONFIG.TMDB.API_KEY;
  if (!apiKey) return;

  // 第一步：search 找 tmdb id。繁體中文出發，TMDB 對 zh-TW 友善。
  const searchUrl = `https://api.themoviedb.org/3/search/${type === 'movie' ? 'movie' : 'tv'}` +
    `?api_key=${encodeURIComponent(apiKey)}` +
    `&query=${encodeURIComponent(baseName)}` +
    `&language=${encodeURIComponent(CONFIG.TMDB.SEARCH_LANGUAGE || 'zh-TW')}`;

  let searchData;
  try {
    const resp = await Widget.http.get(searchUrl, {
      timeout: CONFIG.TMDB.REQUEST_TIMEOUT,
      headers: { 'Accept': 'application/json' }
    });
    // v25 patch 3：Forward 的 Widget.http.get 回傳值有三種可能：
    //   (1) 已自動 parse 的 object    → { results: [...] }
    //   (2) string body               → 要 safeJsonParse
    //   (3) Forward 包裝 { headers, statusCode, data } → data 是 payload (string 或 object)
    // 沒做 unwrap 時 results 會 undefined 然後被當成「無搜尋結果」靜默退出。
    //
    // 診斷 log（v25 patch 4，永遠印，不只在 VERBOSE 下）— 確認 Forward
    // response 真實結構，方便往後 debug。
    if (resp && typeof resp === 'object' && !Array.isArray(resp) && 'data' in resp) {
      const d = resp.data;
      const dType = typeof d;
      const dIsString = dType === 'string';
      const dKeys = (d && typeof d === 'object' && !Array.isArray(d)) ? Object.keys(d).slice(0, 8).join(',') : 'n/a';
      const dPreview = dIsString ? d.slice(0, 80) : (d ? JSON.stringify(d).slice(0, 80) : 'null');
      console.log(`[TMDB-diag] wrap: statusCode=${resp.statusCode}, dType=${dType}, dIsString=${dIsString}, dKeys=${dKeys}, dPreview=${dPreview}`);
    } else {
      console.log(`[TMDB-diag] no wrap: typeof=${typeof resp}, keys=${resp && typeof resp === 'object' ? Object.keys(resp).slice(0, 5).join(',') : 'n/a'}`);
    }
    searchData = _unwrapHttpResponse(resp);
    console.log(`[TMDB-diag] search unwrapped: type=${typeof searchData}, results.len=${searchData?.results?.length}, topKeys=${searchData && typeof searchData === 'object' ? Object.keys(searchData).slice(0, 5).join(',') : 'n/a'}`);
  } catch (e) {
    console.log(`[TMDB-diag] search EXCEPTION: ${e?.message || e}`);
    return;
  }

  if (!searchData?.results?.length) {
    console.log(`[TMDB-diag] "${baseName}" 無搜尋結果 (searchData type=${typeof searchData}, has results=${!!searchData?.results}, topKeys=${searchData && typeof searchData === 'object' ? Object.keys(searchData).slice(0, 5).join(',') : 'n/a'})`);
    return;
  }

  // 取第一筆（Forward 帶入的片名通常足夠精準，第一筆就是對的）
  const hit = searchData.results[0];
  const tmdbId = hit?.id;
  if (!tmdbId) return;
  console.log(`[TMDB-diag] hit: "${hit.name || hit.title || hit.original_name}" id=${tmdbId}, name=${hit.name}, original_name=${hit.original_name}`);

  // 收集別名（用 Set 去重）。先放第一筆 hit 內已拿到的欄位，
  // 再合併 alt_titles 第二次 request 拿到的多地區別名。
  const seen = new Set();
  const aliases = [];
  const pushAlias = (s) => {
    const t = String(s || '').trim();
    if (!t) return;
    if (seen.has(normalizeForMatching(t))) return;
    seen.add(normalizeForMatching(t));
    aliases.push(t);
  };
  // 原文（用戶輸入或 cache key）放第一位
  pushAlias(baseName);
  pushAlias(hit.name);
  pushAlias(hit.original_name);
  pushAlias(hit.title);
  pushAlias(hit.original_title);

  // 第二步：拿 alternative_titles（多地區別名：CN/HK/TW/SG）
  // 這是 v2.8.5 加回來的。我之前為了快砍掉，但少了 CN「行尸走肉」會
  // 導致 VOD 站 0 筆結果。v2.8.4 已修好 race 條件（Promise.race 三方
  // 都能正常 fire），所以 alt_titles 第二次 request 雖然慢 600ms，
  // 但 cache 寫入是 fire-and-forget，不影響 batch 結束時間。
  const altUrl = `https://api.themoviedb.org/3/${type === 'movie' ? 'movie' : 'tv'}/${tmdbId}/` +
    `alternative_titles?api_key=${encodeURIComponent(apiKey)}`;

  try {
    const t0 = Date.now();
    const resp2 = await Widget.http.get(altUrl, {
      timeout: CONFIG.TMDB.REQUEST_TIMEOUT,
      headers: { 'Accept': 'application/json' }
    });
    console.log(`[TMDB-diag] alt resp after ${Date.now() - t0}ms: typeof=${typeof resp2}`);
    const altData = _unwrapHttpResponse(resp2);
    const titles = Array.isArray(altData?.titles) ? altData.titles
                  : Array.isArray(altData?.results) ? altData.results
                  : [];
    console.log(`[TMDB-diag] alt titles count=${titles.length}`);

    // 第三步：篩選我們關心的地區（CN/TW/HK/SG），並**優先放 CN 別名**。
    //
    // 為什麼要把 CN 排第一：tryExpandWithTMDBAliases 內的挑選邏輯是
    // 「拿第一個簡體化後 ≠ baseSimp 的別名」。如果 CN 別名排後面，
    // 前面可能卡到一個英文別名（"The Walking Dead"）就被挑走，導致
    // 沒走到 CN「行尸走肉」→ VOD 站 0 筆結果。
    //
    // TMDB 的 /alternative_titles response 順序不固定，必須在這裡
    // 明確分桶。
    const regions = CONFIG.TMDB.ALT_TITLE_REGIONS || ['CN', 'TW', 'HK', 'SG'];
    const regionSet = new Set(regions);
    // 用 region 當 key 存，後續依 regions 順序合併，CN 一定最先
    const byRegion = new Map();
    for (const t of titles) {
      if (!t?.title) continue;
      const title = String(t.title).trim();
      if (!title) continue;
      const region = String(t.iso_3166_1 || '').toUpperCase();
      if (!regionSet.has(region)) continue;
      if (!byRegion.has(region)) byRegion.set(region, []);
      byRegion.get(region).push(title);
    }
    // 先放 CN 別名（簡體中文，VOD 站最愛），再放其他地區
    for (const r of regions) {
      const list = byRegion.get(r);
      if (!list) continue;
      for (const title of list) pushAlias(title);
    }
  } catch (e) {
    console.log(`[TMDB-diag] alt_titles EXCEPTION: ${e?.message || e}`);
    // 不 return — hit 內欄位已收集，繼續寫 cache
  }

  if (aliases.length === 0) {
    console.log(`[TMDB-diag] hit 內無可用的 name/title 欄位`);
    return;
  }

  // 寫入內存 + storage
  _tmdbAliasCache.set(cacheKey, { aliases, ts: Date.now() });
  _tmdbAliasRecent.set(cacheKey, { aliases, ts: Date.now() });
  _enforceTmdbAliasCacheLimit();
  await _storeTmdbAliasCache(cacheKey, aliases);

  console.log(`[TMDB-diag] ✓ "${baseName}" → ${aliases.length} 別名:`, aliases);
}

/**
 * 統一處理 Widget.http.get 的三種回傳格式。
 *
 * Forward 對 http.get 的回傳：
 *   - Content-Type: application/json → 自動 parse 成 object
 *   - 其他 → 回 string
 *   - 包裝 { data, code, headers }   → 要 unwrap
 *
 * 不處理時 `searchData.results` 會是 undefined,被當成「無搜尋結果」。
 * 這是 v25 patch 3 之前 TMDB 完全沒生效的主因。
 *
 * 注意：判斷是否為 Forward wrap 的依據是「有 .code 數字 + .data 欄位」，
 * 不能用 .results / .titles (TMDB alt_titles 端點 for TV 沒有 .titles 欄位，
 * 只有 .results，用 .results 判斷會誤判 wrap 與 raw 兩種格式)。
 */
function _unwrapHttpResponse(resp) {
  if (!resp) return null;
  // Forward 真實 wrap (從 user log 抓出): { headers, statusCode, data }
  // 注意：是 statusCode 不是 code!
  // 判斷是否為 wrap:「data 欄位 + statusCode 數字」(或兼容舊版的 code)。
  if (typeof resp === 'object' && !Array.isArray(resp)
      && 'data' in resp) {
    // 兼容 v25 patch 3 的舊 wrap 假設 ({ data, code })
    // 與實際觀察到的 ({ data, statusCode, headers })
    const hasWrap = typeof resp.statusCode === 'number'
                 || typeof resp.code === 'number';
    if (hasWrap) {
      const d = resp.data;
      if (typeof d === 'string') return safeJsonParse(d);
      if (typeof d === 'object' && d) {
        // 雙層 wrap 偵測: data 內還是 { headers, statusCode, data } 結構
        // （理論上不該發生，但保險起見 unwrap 一次）
        if (d && typeof d === 'object' && !Array.isArray(d)
            && 'data' in d
            && (typeof d.statusCode === 'number' || typeof d.code === 'number')) {
          const d2 = d.data;
          if (typeof d2 === 'string') return safeJsonParse(d2);
          if (typeof d2 === 'object' && d2) return d2;
        }
        return d;
      }
      return null;
    }
    // data 欄位存在但沒有 statusCode / code 也不像 wrap → 退回 raw object 嘗試
    return resp;
  }
  // 已經是 raw TMDB JSON object
  if (typeof resp === 'object' && !Array.isArray(resp)) {
    return resp;
  }
  // string body
  if (typeof resp === 'string') return safeJsonParse(resp);
  return null;
}

// 超過上限時淘汰最舊的（Map 保留插入順序）
function _enforceTmdbAliasCacheLimit() {
  const max = CONFIG.TMDB.CACHE_MAX_ENTRIES || 500;
  while (_tmdbAliasCache.size > max) {
    const first = _tmdbAliasCache.keys().next().value;
    if (first == null) break;
    _tmdbAliasCache.delete(first);
  }
}

// 包裝 JSON.parse，安全的：給物件就回傳，給壞字串就回 null。
function safeJsonParse(s) {
  try { return JSON.parse(s); } catch (e) { return null; }
}

/**
 * 把「原 keyword + TMDB 別名」組合成查詢詞陣列，供搜尋引擎使用。
 *
 * 設計：原本 buildSearchVariants 只生 3 個變體（原文 / 繁 / 簡）。
 * 這層在它的基礎上加上 TMDB 別名。每個 alias 額外生繁 / 簡變體，
 * 確保不論站方用繁簡哪種命名都吃得到。
 *
 * 性能：若 TMDB 別名還沒回來（cache miss + fire-and-forget 沒時間填
 * 回），等同於原本 3 個變體，不會卡住。
 */
function buildSearchVariantsWithAliases(keyword, type) {
  const out = [];
  const push = (v) => {
    const t = (v || '').trim();
    if (t && !out.includes(t)) out.push(t);
  };
  const variantsOf = (kw) => {
    push(kw);
    push(convertChinese(kw, true));   // -> 繁體
    push(convertChinese(kw, false));  // -> 簡體
  };

  // 原本的 baseName 必定佔頭位
  variantsOf(keyword);

  // TMDB 別名：每一個別名也生繁簡兩版。
  // 使用 Fast 介面（不阻塞），因為這個函式只在「未來需要 fan-out
  // 多個 keyword 送多站」時才會用到 — 目前 hot path 是 `Block` 介面
  // 把最佳單一 alias 直接寫進 targetInfo.searchQuery。
  const aliases = getTMDBAliasesFast(keyword, type);
  for (const a of aliases) {
    if (typeof a !== 'string') continue;
    if (a.trim() === keyword.trim()) continue;
    // 只生簡體版（站方基本是簡體命名，繁體變體浪費時間）
    push(convertChinese(a, false));
    push(a);
  }

  return out;
}

// ==================== 資源站清單 ====================
// 2026-09 實測結論：
//   愛蛋 / 樂子  → 帶 t 分類參數搜尋正常
//   電影天堂 / 如意資源 / 非凡資源 → 站方分類 ID 與慣例不同，
//     送 t=2 會得到 0 筆，但搜尋本身正常（不帶 t 可回 7~8 筆）。
//     程式已內建「空結果則去掉 t 重試」的 fallback，故保留啟用。
//   天涯資源 → 明確回「暂不支持搜索」，暫停啟用；
//     其 7 萬部內容的主分類 t=1/2/4 皆為空，無法透過 API 檢索。
// 暫停站以 # 註解保留，站方恢復後取消註解即可重新啟用。
const RESOURCE_SITES = `
電影天堂,http://caiji.dyttzyapi.com/api.php/provide/vod
非凡資源,https://cj.ffzyapi.com/api.php/provide/vod
如意資源,https://cj.rycjapi.com/api.php/provide/vod
#天涯資源,https://tyyszy.com/api.php/provide/vod
樂子,https://cj.lziapi.com/api.php/provide/vod
`;

// 中文數字映射
const CHINESE_NUM_MAP = {
  '一': 1, '二': 2, '三': 3, '四': 4, '五': 5,
  '六': 6, '七': 7, '八': 8, '九': 9, '十': 10
};

// ==================== 最佳化配置 ====================
const DEFAULT_WORKER_URL = 'https://m3u8-adfliter.kschiuaa.com';

const CONFIG = {
  // 性能配置
  MAX_CONCURRENT_REQUESTS: 8,
  MIN_CONCURRENT_REQUESTS: 3,
  REQUEST_TIMEOUT: 6000,
  // 實測延遲不穩定的站（愛蛋 8 次取樣：2.0~10.0 秒，中位數 4.3 秒，
  // 約三分之一超過 6 秒）。用一般逾時會讓它經常半路被砍，
  // 每次失敗還要拖住整批等待。給它專屬的寬裕逾時。
  SLOW_SITE_TIMEOUT: 9000,
  SLOW_SITE_MATCH: ['lovedan.net'],
  // 串流模式下 Forward 會在拿到第一個 complete 後就停止等待。慢站重試拖太久
  // 會讓整批結果來不及送出，使用者看到的是「暫無可用資源」——即使其他站
  // 早就回來了。重試必須讓總時間遠小於前端的等待上限。
  RETRY_ATTEMPTS: 1,
  CACHE_TTL: 1800,
  // 採集器吐的 m3u8 URL 容易被 CDN 清理（昨天測的：svip.high25-playback.com
  // 對該片整段回 502）。cache hit 後 URL 死了，AVPlayer 拿到 502 會 reset
  // 到 m3u8 開頭，這就是「播一會斷線重頭」的根因。cache miss 時對
  // finalResults 內每個 m3u8 URL 做一次 HEAD 探測，失效的不寫 cache，
  // 下次進入就重抓。HEAD probe 只在 cache 寫入前做一次，不影響搜尋延遲。
  //
  // 注意：probe 整個 finalResults 在 100 筆時可能耗時 60 秒（HEAD × 5s ×
  // 並發 6），使用者要等到 probe 結束才看得到任何結果。對 100 筆規模
  // 的搜尋，probe 必須夠快，否則使用者體驗崩潰。
  URL_PROBE_TIMEOUT: 2000,
  // 同時進行的 HEAD probe 數。m3u8 在不同 CDN，併發可壓低總時間。
  URL_PROBE_CONCURRENCY: 24,
  // widget 版本號。任何 cache schema 變更時（例如加了版本標籤、改了
  // _rawName 欄位、改了去重鍵）都必須 bump 這個號，否則舊 cache 會
  // 被讀回來 —— 舊 cache 內容可能跟新邏輯推論出的版本標籤衝突，
  // 使用者看到的會是錯的。
  // bump 到 17：wrap 邏輯變更（冪等化 + movie 分支補 wrap + 過濾廣告伺服器 URL
  // 三層 fallback），舊 cache 裡存的是未包裝或二次包裝的 URL，必須清掉。
  // bump 到 18：即使 v17 已引入 syncWidgetVersion 完整清 cache，實機仍
  // 觀察到 cache 內存著裸 CDN 的歷史 URL（推測是早期版本繞過 wrap 直接
  // 寫 cache、或某次 import syncWidgetVersion 因 storage 失敗沒寫入
  // version key 導致下次也沒清）。修法是在 smart / batch 兩條 cache 命中
  // 路徑加「兜底 wrap」（主動呼叫 wrapM3U8WithFilter），對冪等邏輯已是
  // 已 wrap 的 url 無副作用，對裸 CDN 會印 log 提醒有歷史 cache 異常。
  // bump version 確保舊 cache 仍會被清掉一次，乾淨起步。
  // bump 到 19：v18 之前的 wrap 函式在 REX runtime（vm 沙箱）會 throw
  // ReferenceError: Can't find variable: URL，因為沙箱沒有 URL 全域物件。
  // 整段 try/catch 把 throw 吃掉後靜默 return 裸 CDN，導致 wrap 從未跑。
  // 修法：HAS_URL 偵測 + 字串拼接 fallback。對「已 wrap 的 url」仍走
  // isAlreadyWrapped 冪等檢查；對裸 CDN 字串拼接後就是過濾廣告伺服器 URL。
  // bump 到 20：新增 m3u8FilterTsMode UI 開關，給使用者切換 ts 走原站
  // (hybrid) / 全代理 (proxy) / 全絕對 (absolute)。對應過濾廣告伺服器端
  // ?rewrite= query 參數；伺服器行程不用重啟即可切換。
  // bump 到 23：移除 cachePatterns / getCached() / invalidate() 死代碼,
  // 移除 CONFIG.AUTO_LOAD_PATTERNS / AUTO_VERIFY_TOKEN(從未被讀取)。
  // UI 將「Worker」改稱「過濾廣告伺服器」(內部變數/全域參數名保留相容)。
  // bump 到 24：加入 TMDB 跨地區別名注入 (CONFIG.TMDB / getTMDBAliasesFast
  // / getTMDBAliasesBlocking / tryExpandWithTMDBAliases)。當 cache 命中時
  // targetInfo.searchQuery 會被對岸/簡體別名取代。
  // bump 到 25：v24 的 fire-and-forget 設計有 UX 問題 — 第一次搜某片名時
  // cache miss，搜尋用純繁簡 keyword 跑（0 筆），使用者以為「沒效果」。
  // 修法：tryExpandWithTMDBAliases 從 sync 改 async，第一次同步等 TMDB
  // 最多 1.5s。TMD 命中後寫進 in-memory + storage cache，第二次以後永
  // 遠 in-memory 命中（< 1ms）。所有 search path（loadResource、
  // performSmartSearch、performBatchSearch）的 call site 都用 try/catch
  // 包起來保護，TMD 意外錯誤不影響原本搜尋流程。Hot path 速度：只有在
  // 「這部片第一次被搜時」多等 ≤1.5s，其他情境 0 成本。
  WIDGET_VERSION: 26,
  // 整批搜尋時限（毫秒）。只是最後一道保險，正常情況下不會用到 ——
  // 已有「站數足夠」與「在途請求已無望」兩道提早收尾。
  // 需容納最慢站的逾時(SLOW_SITE_TIMEOUT)+重試退避。
  SEARCH_DEADLINE: 12000,
  // 已從這麼多個站拿到結果就收尾，剩下的站不再等待。5 = 目前全部站點，
  // 等同「全都回來才收尾」，但仍受 SEARCH_DEADLINE 保護。
  // 調小可換取更快回應，代價是站數變少。設 0 停用。
  SUFFICIENT_SITE_COUNT: 5,

  // 主力源配置：內容豐富且實測可回傳結果的站，可獲得排序加成
  MAIN_SOURCES: ['非凡資源', '電影天堂', '如意資源', '樂子'],

  // 流式搜尋配置
  STREAMING: {
    ENABLED: true,
    FAST_MODE_THRESHOLD: 25,
    MIN_RESULTS_FOR_STOP: 40,
    MAX_STREAM_RESULTS: 200,
    SKIP_BACKUP_IF_MAIN_SUCCESS: false,
  },

  // 智慧匹配配置
  MATCH_THRESHOLDS: {
    SIMILARITY_EXACT: 0.96,
    SIMILARITY_STRICT: 0.87,
    SIMILARITY_LOOSE: 0.75,
    KEYWORD_MIN_MATCH: 0.65,
  },

  // 智慧去重配置
  DEDUPLICATION: {
    ENABLED: true,
    SIMILARITY_THRESHOLD: 0.85,
    CHECK_CONTENT: true,
    CHECK_RESOLUTION: true,
  },

  // 繁簡轉換配置
  CONVERSION: {
    ENABLED: true,
    TO_TRADITIONAL_DISPLAY: true,  // 結果顯示轉繁體
    DUAL_QUERY: true,              // 繁簡雙向查詢
  },

  // 結果排序權重
  SORT_WEIGHTS: {
    EXACT_MATCH: 100,
    FUZZY_MATCH: 85,
    LOOSE_MATCH: 70,
    FALLBACK_MATCH: 50,
    SEASON_MATCH_BONUS: 35,
    VARIETY_MATCH_BONUS: 25,
    MAIN_SOURCE: 20,
    HAS_EP_INFO: 20,
    RECENT_UPDATE: 10,
    RESOLUTION_BONUS: 30,
    QUALITY_TAG_BONUS: 18,
    HTTPS_BONUS: 12,
    VALIDATED_BONUS: 15,
    // 搜尋片名沒有年份時（「仁醫」），站台會把韓版「仁医2012」與日版
    // 「仁医2009」一起回傳，且五個站有四個把韓版排前面。降權帶年份
    // 標記的候選，讓未標記的版本（使用者輸入的原版）排在前面。
    // 不直接丟棄：使用者若明確輸入年份，該候選仍可勝出。
    VERSION_AMBIGUOUS_PENALTY: 40,
    // 目標片名自帶年份而候選年份不符（「仁醫2012」搜到「仁医2009」）
    // 屬於另一部劇，必須排到最後。
    VERSION_CONFLICT_PENALTY: 120,
    // 地區不符的強烈指標：Forward 詳細頁已選定版本，使用者要的是日版
    // 仁医，站台卻回傳 area=韓國 的仁医2012。地區比片名可靠得多
    // （片名只差年份，文字比對分不出來）。
    AREA_MISMATCH_PENALTY: 150,
    AREA_MATCH_BONUS: 40,
  },

  // m3u8 過濾廣告伺服器設定
  // 所有 m3u8 輸出 URL 會被 wrap 走過濾廣告伺服器,Player 拉到清流。
  // ENABLED = false 可一鍵關閉,所有 URL 恢復原始 CDN 直連。
  M3U8_FILTER: {
    ENABLED: true,
    // 過濾廣告伺服器完整 URL(含 https,不含結尾斜線)
    WORKER_URL: 'https://m3u8-adfliter.kschiuaa.com',
    // 為了 cache 命中穩定,base path 寫死。endpoint 內部模式見過濾廣告伺服器端。
    ENDPOINT: '/filter',
    // 透傳 / 過濾 切換:debug 用。預設 'filter'。
    // 'passthrough' = 走過濾廣告伺服器但不過濾,只驗伺服器通不通。
    MODE: 'filter',
    // admin 認證(對應過濾廣告伺服器的 ADMIN_USER / ADMIN_PASS 環境變數)。
    // 留空 = 不啟用 admin 功能,只能讀 patterns(GET /patterns)。
    // 填了之後啟動時會自動登入拿 session cookie,console 印對接狀態
    // 程式內可呼叫 m3u8FilterAdmin.xxx() 操作(增/刪/reload/reset)。
    //
    // 注意:過濾廣告伺服器用 cookie session(帳密 → admin_session),不是 Bearer token。
    // 設定填這兩欄後 widget 會自動 POST /admin/login 拿 cookie。
    ADMIN_USER: '',
    ADMIN_PASS: '',

    // ts 影片段要由過濾廣告伺服器代理,還是播放器直連原站 CDN。
    // 'hybrid' (預設)  → m3u8 playlist 走過濾廣告伺服器(過濾),.ts 走原站(快)
    // 'proxy'           → playlist 跟 .ts 全部走過濾廣告伺服器(慢但可控)
    // 'absolute'        → 全部直連原站(不過濾、debug 用)
    //
    // 對應過濾廣告伺服器端 ?rewrite= 參數(同名字)。伺服器端 URI_REWRITE_MODE
    // 環境變數作為全域預設；widget 傳 query 可以單連線覆寫。
    TS_MODE: 'hybrid',
  },

  // ==================== TMDB 跨地區別名 ====================
  //
  // 問題：Forward 在台/港帶入的繁體片名（如「陰屍路」「盜夢空間」「全面
  // 啟動」），與資源站上簡體中文的命名（「行屍走肉」「盜夢空間」「全面
  // 啟動」）並非純繁簡關係，而是不同地區的翻譯差異。字對字繁簡轉換找不
  // 到結果，導致站台搜尋零命中。
  //
  // 解法：用 TMDB 查「alternative_titles」拿到該作品所有華語地區別名，
  // 挑出符合站方簡體命名習慣的那幾個，塞進 searchQuery 候選集。
  // 結果走 storage cache（hot query 不打 TMDB），失敗時 fallback 到原本
  // 的純繁簡查詢。
  //
  // 速度影響：搜尋的 hot path **絕不 await TMDB**。命中 cache 直接同步
  // 讀；沒命中才 fire-and-forget 觸發非同步查詢，第一次先繼續用原本的
  // 關鍵字搜尋，下一次進場才會用到別名。對使用者感受：原本速度 0 變化。
  TMDB: {
    ENABLED: true,
    // TMDB v3 API key（必填，否則走 fallback 路徑）。
    // 申請：https://www.themoviedb.org/settings/api
    API_KEY: '',
    // 語言/地區預設。
    // search 預設帶 language=zh-TW 以命中台/港繁體片名，alternative_titles
    // 同時拿 CN + HK + TW。地區設定跟 alternative_titles 的 iso_3166_1 對應。
    SEARCH_LANGUAGE: 'zh-TW',
    ALT_TITLE_LANGS: ['zh-CN', 'zh-TW', 'zh-HK', 'en'],
    ALT_TITLE_REGIONS: ['CN', 'TW', 'HK', 'SG'],
    // 別名 cache TTL（秒）。片名別名極少改，7 天綽綽有餘。
    CACHE_TTL: 7 * 24 * 3600,
    // 別名快取最多保留幾部作品的 alias。超過時按 LRU 刪除最舊的，避免
    // 長期使用把 storage 灌爆。
    CACHE_MAX_ENTRIES: 500,
    // 單次 TMDB 查詢 timeout。TMDB 慢的話寧可放棄也別拖慢整體搜尋。
    REQUEST_TIMEOUT: 2500,
    // 啟動時 debug 用：印實際行為可從 console 觀察 cache 命中、alias 數。
    // 平時建議關閉避免 console 被沖掉。
    VERBOSE: false,
  },
};

// ==================== 模組中繼資料 ====================
WidgetMetadata = {
  id: "EthanVOD",
  title: "EthanVOD",
  icon: "",
  version: "2.8.9",
  requiredVersion: "0.0.1",
  description: "聚合搜尋",
  author: "Ethan",
  site: "",
  globalParams: [
    {
      name: "multiSource",
      title: "聚合搜尋",
      type: "enumeration",
      enumOptions: [
        { title: "啟用", value: "enabled" },
        { title: "停用", value: "disabled" }
      ],
      value: "enabled"
    },
    {
      name: "VodData",
      title: "自訂源設定",
      type: "input",
      description: "留空 = 使用下方預設源。手動填寫時,每行一個源,格式為「站名,API URL」(以 http 開頭),例:我的源A,https://abc.com/api.php/provide/vod。以 # 開頭為註解停用。需為 MacCMS 採集介面(/api.php/provide/vod)。僅站名等於 預設源名(電影天堂/非凡資源/如意資源/樂子)會獲得排序加成。",
      value: RESOURCE_SITES
    },
    {
      name: "searchMode",
      title: "搜尋模式",
      type: "enumeration",
      enumOptions: [
        { title: "智慧流式", value: "smart_stream" },
        { title: "批次搜尋 ", value: "batch" },
        { title: "自動選擇", value: "auto" }
      ],
      value: "batch"
    },
    {
      name: "matchStrictness",
      title: "匹配嚴格度",
      type: "enumeration",
      enumOptions: [
        { title: "寬鬆(匹配更多)", value: "loose" },
        { title: "標準", value: "standard" },
        { title: "嚴格(更精確)", value: "strict" }
      ],
      value: "standard"
    },
    {
      name: "preferResolution",
      title: "清晰度偏好",
      type: "enumeration",
      enumOptions: [
        { title: "自動", value: "auto" },
        { title: "4K", value: "4k" },
        { title: "1080p", value: "1080p" },
        { title: "720p", value: "720p" }
      ],
      value: "auto"
    },
    {
      name: "convertChinese",
      title: "繁簡自動轉換",
      type: "enumeration",
      enumOptions: [
        { title: "啟用", value: "enabled" },
        { title: "停用", value: "disabled" }
      ],
      value: "enabled"
    },
    {
      name: "m3u8FilterEnabled",
      title: "m3u8 廣告過濾",
      type: "enumeration",
      enumOptions: [
        { title: "啟用", value: "enabled" },
        { title: "停用", value: "disabled" }
      ],
      value: "enabled"
    },
    {
      name: "m3u8FilterWorkerUrl",
      title: "過濾廣告伺服器 URL",
      type: "input",
      description: "完整 URL(含 https://,結尾不要斜線)。預設值就是官方伺服器,直接用即可。",
      value: "https://m3u8-adfliter.kschiuaa.com"
    },
    {
      name: "m3u8FilterAdminUser",
      title: "過濾廣告伺服器 管理帳號 (選填)",
      type: "input",
      description: "填入後可從 console 呼叫 m3u8FilterAdmin.*() 動態管理 patterns。留空 = 唯讀模式。需要同時填寫管理密碼。",
      value: ""
    },
    {
      name: "m3u8FilterAdminPass",
      title: "過濾廣告伺服器 管理密碼 (選填)",
      type: "input",
      description: "管理帳號的密碼。Widget 啟動時會自動登入取得 session cookie。",
      value: ""
    },
    {
      name: "m3u8FilterAutoLoad",
      title: "啟動時載入 patterns",
      type: "enumeration",
      enumOptions: [
        { title: "啟用", value: "enabled" },
        { title: "停用", value: "disabled" }
      ],
      value: "enabled"
    },
    {
      // ts 走哪裡 —— 跟播放速度直接相關。
      //
      // 三個選項語意：
      //   - 純去廣告(預設)  : m3u8 playlist 走過濾廣告伺服器過濾; .ts 影片段走原站 CDN 直連
      //                       廣告能過濾、流量不走本機、速度最快。多數情境推薦。
      //   - 伺服器代理      : playlist 跟 .ts 全部走過濾廣告伺服器代理
      //                       流量過本機 → 較慢,但可在伺服器內加日誌/統計/額外處理
      //   - 全直連          : playlist 跟 .ts 都指回原站(伺服器只驗 m3u8 文本格式,不過濾、不代理)
      //                       速度最快(沒有任何層過伺服器),但**完全不去廣告**
      //                       僅適合 debug 或「確認過濾廣告伺服器通不通」場景
      //
      // 過濾廣告伺服器端 URI_REWRITE_MODE 環境變數保留作為全域預設；這個 query 參數
      // 可以對單一 widget / 單一連線覆寫,不需重啟伺服器。
      name: "m3u8FilterTsMode",
      title: "ts 分片走哪 (速度/過濾 取捨)",
      type: "enumeration",
      enumOptions: [
        { title: "純去廣告 (playlist 過濾 + ts 原站,推薦)", value: "hybrid" },
        { title: "伺服器代理 (全部走過濾廣告伺服器,流量過本機)", value: "proxy" },
        { title: "全直連 (不過濾,debug 用)", value: "absolute" }
      ],
      value: "hybrid"
    },
    {
      // 跨地區別名查詢（TMDB）開關。
      //
      // 解決的核心問題：Forward 傳入的繁體中文片名（如「陰屍路」「無間
      // 道」「全面啟動」）與資源站簡體中文片名（「行屍走肉」「無間道」
      // 「全面啟動」）並非純繁簡，而是不同地區翻譯差異。開啟後會用
      // TMDB 拿別名表，找到對岸/台灣/香港的簡體命名一起搜。
      //
      // 「停用」會完全走原本「純繁簡字對字」邏輯，行為跟 2.7.15 一致。
      name: "tmdbAliasEnabled",
      title: "TMDB 跨地區別名查詢",
      type: "enumeration",
      enumOptions: [
        { title: "啟用", value: "enabled" },
        { title: "停用", value: "disabled" }
      ],
      value: "enabled"
    },
    {
      // TMDB v3 API Key。
      //
      // 沒填的話「TMDB 跨地區別名查詢」等同於關閉 —— widget 會走原本的
      // 繁簡轉換邏輯，不會主動打 TMDB。
      //
      // 申請：https://www.themoviedb.org/settings/api （免費 v3）。
      // 速率限制 ~40 req/10s，配合下方快取幾乎不會超過。
      // 不要分享你的 key；建議在自己 Fork 的 widget 內填，公開倉庫留空。
      name: "tmdbApiKey",
      title: "TMDB API Key",
      type: "input",
      description: "v3 API Key。留空 = 純繁簡模式，行為與舊版一致。",
      value: ""
    }
  ],
  modules: [
    {
      id: "loadResource",
      title: "載入資源",
      functionName: "loadResource",
      type: "stream",
      // 必須是 0（不快取模組結果）。
      //
      // 使用者在詳細頁切換系列內的另一部電影（讓子彈飛 → 一步之遙）時，
      // Forward 只替換畫面內容，不會重建模組的執行環境。未設此值時
      // Forward 沿用預設快取，直接把上一次的播放源列表回傳，
      // 於是畫面標題已變、播放源仍是舊片 —— 返回頁面重新搜尋才會正確。
      // 模組內部已有精確到「片名+序號+年份+季+集」的快取，
      // 不需要靠這一層快取，重複請求也不會重打站台。
      cacheDuration: 0,
      params: [],
    }
  ],
  // REX 規範：全域搜尋區塊。對 Forward 不起作用，但 REX 會用。
  // REX 用 search 區塊作為首頁搜尋；對應到 loadResource 函式簽名。
  search: {
    title: "搜尋",
    functionName: "loadResource",
    params: [
      { name: "title", title: "關鍵字", type: "input", value: "" },
      { name: "type", title: "類型", type: "enumeration",
        enumOptions: [
          { title: "劇集", value: "tv" },
          { title: "電影", value: "movie" },
        ], value: "tv" },
      { name: "season", title: "季", type: "input", value: "" },
      { name: "episode", title: "集", type: "input", value: "" },
    ],
  },
};
// ==================== 工具函数模块 ====================
// 實測發現：真實 API 回傳的播放連結分兩種，一種是標準 .m3u8 直串，
// 另一種是無副檔名的 /share/<md5> 頁面（點擊後仍會導向播放器）。
// 只認播放器真的能開的串流／檔案格式。
// 「無副檔名就放行」會讓站方自帶播放器頁（/share/xxx）混進結果，Forward 播不了，
// 使用者點了只會看到轉圈後失敗。寧可少給可選項，也不要給必定失敗的選項。
const PLAYABLE_EXT = /\.(m3u8|mp4|flv|mkv|avi|mov|ts)(?:$|[?#])/i;
// 已 wrap 過的過濾廣告伺服器 URL 形如
//   http://host:8787/filter?mode=filter&url=https%3A%2F%2F...%2Findex.m3u8
// 內層 m3u8 是 percent-encoded，後面接的是字面量「url=」而非 ?#，
// 所以 PLAYABLE_EXT 不會匹配。若不補這條規則，排序階段會把已包裝的
// 來源誤判為「非媒體直連」而往下排，或在 movie 分支被整條漏掉。
const WRAPPED_FILTER_URL = /\/filter\?(?:.*&)?url=/i;
const BLOCKED_URL = /(javascript:|data:)/i;

function isPlayableUrl(url) {
  if (!url || typeof url !== 'string') return false;
  const u = url.trim();
  if (!u || BLOCKED_URL.test(u)) return false;
  if (!/^https?:\/\//i.test(u)) return false;
  if (PLAYABLE_EXT.test(u)) return true;
  if (WRAPPED_FILTER_URL.test(u)) return true;
  return false;
}

// 相容舊呼叫點
const isM3U8Url = (url) => isPlayableUrl(url);

/**
 * 是否為播放器可直接載入的媒體檔串流。
 *
 * isPlayableUrl 的判定較寬：/share/<md5> 這類頁面也會算可播（點擊後
 * 仍會導向播放器），但多數播放器無法直接載入頁面。排序時以本函式為準，
 * 讓串流連結排在頁面連結之前，避免使用者第一個選項就打不開。
 */
function isDirectMediaUrl(url) {
  if (!url || typeof url !== 'string') return false;
  const u = url.trim();
  if (!/^https?:\/\//i.test(u) || BLOCKED_URL.test(u)) return false;
  return PLAYABLE_EXT.test(u);
}

/**
 * 比對前把片名正規化，讓繁體查詢能對上簡體結果。
 * 統一轉繁體 + 去除空白 + 轉小寫。
 */
function normalizeTitleForMatch(title) {
  if (!title) return '';
  const converted = CONFIG.CONVERSION.ENABLED
    ? convertChinese(String(title), true)
    : String(title);
  return converted.replace(/[\s\u3000]+/g, '').toLowerCase();
}

/**
 * 顯示用文字：資源站內容為簡體，此處統一轉為繁體。
 * 關閉轉換設定時原樣輸出。
 */
function toDisplayText(text) {
  if (!text) return '';
  if (!CONFIG.CONVERSION.TO_TRADITIONAL_DISPLAY) return String(text);
  return convertChinese(String(text), true);
}

/**
 * 把 Widget.http 的回應正規化成可直接取用 list 的物件。
 * 需處理三種情況：
 *   1. data 已是物件
 *   2. data 是 JSON 字串
 *   3. MacCMS 的 { data: { list: [...] } } 巢狀結構
 */
function normalizeHttpResponse(response) {
  if (!response) return null;

  let payload = response.data;
  if (typeof payload === 'string') {
    try {
      payload = JSON.parse(payload);
    } catch (e) {
      return null;
    }
  }
  if (!payload || typeof payload !== 'object') return null;

  // MacCMS 回傳 { data: { list } }；部分站點直接回傳 { list }
  if (!payload.list && payload.data && typeof payload.data === 'object') {
    payload = payload.data;
  }
  if (!Array.isArray(payload.list)) return null;

  return payload;
}

function deepCleanSeriesName(name) {
  if (!name) return '';
  let cleaned = String(name);

  // 先移除括號及其內容（「仁醫（2009）」→「仁醫」），再去掉裸露的年份。
  // 順序相反會留下空白間隙：「（2009）」的括號被刪後，年份規則把剩下的
  // 數字連同前後空白一起換成空格，產生「仁醫 」這種帶尾端空白的殘留，
  // 查詢字串因此變成「仁医（ ）2009」而搜不到。
  cleaned = cleaned.replace(/[（(【\[]\s*[^）)】\]]{0,24}\s*[）)】\]]/g, '');

  const removablePatterns = [
    /剧场版|电影版|特别篇|SP|OVA/gi,
    /\s*(HD|高清|超清|蓝光|4K|1080[Pp]|720[Pp]|HDR|杜比|Dolby|HEVC|X265|X264)\s*/gi,
    /\s*(WEB[-\s]?DL|WEBRip|BluRay|BDrip|BDRip|HDTV|TVrip|HQC)\s*/gi,
    /\s*(国语|粤语|英语|日语|韩语|中字|双语|简繁|内封|内嵌|字幕|未删减|完整版|全集|合集|番外)\s*/g,
    // 「完结」獨立出現才算 ——「完结篇」是續集的真實副標題，
    // 整段刪掉會留下「仁医篇」，後續相似度比對就錯了。
    /\s+完结\s*$/g, /\s+完結\s*$/g,
    /[\[\]()【】《》「」『』]/g,
  ];

  removablePatterns.forEach(pattern => {
    cleaned = cleaned.replace(pattern, '');
  });

  cleaned = cleaned.replace(/\s*(?:19|20)\d{2}\s*/g, ' ');
  cleaned = cleaned.replace(/第\d+[集话]/g, '');
  cleaned = cleaned.replace(/[\.\-\s]+$/g, '');
  cleaned = cleaned.replace(/\s+/g, ' ').trim();

  return cleaned;
}

/**
 * 移除片名中的季度標記。
 * 「仁醫 第一季」「仁醫 第1季」「仁醫 Season2」「仁醫 S2」→ 「仁醫」。
 *
 * 季度與續集序號是兩回事，必須分開處理：
 *  續集序號（仁醫2、第二部）代表「另一部作品」
 *  季度（第X季、S2）代表「同一部作品的後續季度」
 * 混為一談會造成兩種錯誤：把「第一季」當成序號 1 而拒絕真正的第一季，
 * 或把季度差異當成兩部不同作品而漏掉後續季度。
 */
function stripSeasonMarker(name) {
  if (!name) return '';
  return String(name)
    // 「第N季」+ 阿拉伯數字：「第五季」「第 1 季」。
    .replace(/第\s*[0-9一二三四五六七八九十壹贰叁肆伍陆柒捌玖拾]+\s*季/g, ' ')
    // 「S2」「Season 2」類型。「第二季」「第三季」沒「第」時也涵蓋：
    // 中文/阿拉伯數字直接 + 季（中間可選空白）。這條很重要 —— 站方檔名
    // 「五等分的新娘 第二季 - 第01集」沒有「第」字但有「第二季」，原本
    // extractSequelNumber 會抓不到這個「季」數字，第二季過濾因此漏抓。
    .replace(/[一二三四五六七八九十壹贰叁肆伍陆柒捌玖拾0-9]+\s*季/g, ' ')
    // 「第N集」是集數不是續集序號。留下來會被 extractSequelNumber 的
    // 阿拉伯數字規則誤抓（實測「仁醫完結篇 - 第02集」回傳 2，
    // 「第01集」回傳 1，每集都被誤判成不同 sequel），
    // 必須先於續集序號判定清除。
    .replace(/第\s*[0-9一二三四五六七八九十壹贰叁肆伍陆柒捌玖拾]+\s*[集话話回]/g, ' ')
    .replace(/\s[Ss]eason\s*[0-9]+/gi, ' ')
    .replace(/\s[Ss][0-9]+\b/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * 剝離片名的副標題與版本註記，只留下主片名。
 * 「追龙2：追缉大富豪」→「追龙2」
 * 「无间道2[普通话版]」→「无间道2」
 * 「窃听风云粤语版」→「窃听风云」
 *
 * 中文片名常在冒號、方括號、分隔線或空白後接續副標題、語言版本、
 * 畫質標示。比對「是否為同一部片」時這些都是噪音：同一作品在不同
 * 資源站的片名寫法不一致，但主片名一定相同。
 */
function stripSubtitle(name) {
  if (!name) return '';
  let s = stripSeasonMarker(String(name));

  // 方括號 / 圓括號內的註記：語言版本、畫質、來源等。
  s = s.replace(/[（(【\[][^）)】\]]*[）)】\]]/g, ' ');

  // 冒號、豎線、分隔線之後的副標題。
  s = s.split(/[：:｜|～~]|\s[-–—]\s/)[0];

  // 中段夾雜的版本/副標題詞：古装版、時裝版、劇場版、電影版、特别篇、SP、OVA 等。
  // 不一定在字串結尾，可能後面還接語言標註（「古装版粤语」）。
  // 先移除這些詞，再交由後面的語言註記規則清尾巴，順序很重要。
  s = s.replace(/\s*(古装版|時裝版|时装版|剧场版|劇場版|电影版|電影版|特别篇|特別篇|ova|OVA|sp|SP)\s*/gi, ' ');

  // 片名尾端的語言／版本註記（清理函式已移除方括號，剩下的是裸露文字）。
  s = s.replace(/[一-鿿]{2,4}版$/, ' ');
  s = s.replace(/\s*(國語|粤语|粤語|普通話|普通话|英语|英語|日语|日語|韩语|韓語|中字|双语|雙語|简繁|內封|内封|未删减|未刪減|完整版|終章|终章)$/g, ' ');

  return s.replace(/\s+/g, ' ').trim();
}

/**
 * 中文數字轉阿拉伯數字，用於片名中的「第二部」「第三季」這類寫法。
 * 「二」→ 2、「十」→ 10、「二十」→ 20、「二十一」→ 21。
 * 超出 0~99（續集序號的合理範圍）回傳 0，表示無法解讀。
 */
function parseChineseNumeral(text) {
  if (!text) return 0;
  const s = String(text).trim();
  if (/^\d+$/.test(s)) return parseInt(s, 10);

  const digits = { 零: 0, 一: 1, 壹: 1, 二: 2, 贰: 2, 兩: 2, 三: 3, 叁: 3, 四: 4, 肆: 4,
                   五: 5, 伍: 5, 六: 6, 陆: 6, 七: 7, 柒: 7, 八: 8, 捌: 8, 九: 9, 玖: 9 };
  const units = { 十: 10, 拾: 10, 百: 100, 佰: 100 };

  let total = 0;
  let section = 0;
  let current = 0;
  for (const ch of s) {
    if (ch in digits) {
      current = digits[ch];
    } else if (ch in units) {
      // 「十二」的十前面沒有數字時視為一十。
      section += (current || 1) * units[ch];
      current = 0;
    } else {
      return 0;
    }
  }
  total = section + current;
  return total > 0 && total < 100 ? total : 0;
}

/**
 * 取出片名中的續集序號。
 *
 * 「战狼2」「无间道II」「窃听风云3：终极监听」「追龙2：追缉大富豪」
 * 「无间道2[普通话版]」→ 分別為 2 / 2 / 3 / 2 / 2，沒有則 null。
 *
 * 序號不一定在結尾，資源站的片名常帶「：副標題」「[普通話版]」
 * 之類的綴飾，所以要在整個片名中搜尋，而非只比對結尾。
 * 同時必須排除：
 *  - 年份（红海行动2018 的 2018 是上映年份，不是續集序號）
 *  - 「解说 / 速看 / 剪輯 / 預告」等二次剪輯影片的編號
 * 這些會讓同一部片被誤判成不同作品，或反過來讓續集被當成原版。
 */
function extractSequelNumber(name) {
  if (!name) return null;

  // 「完結篇 / 完结篇」是 S2 常用替身：日劇「仁医完结篇」、「半泽直树完结篇」，
  // extractSequelNumber 走完所有 fallback 都抓不到數字（沒「第X季」沒羅馬數字、
  // 阿拉伯數字也會被「第02集」之類搶走），最後回 null，
  // filterBySequel 拿不到 sequel=2 的命中樣本，規則 3 永遠 fallback。
  // 把「完結篇」視為 sequel=2 提前返回，避免被下面的「第02集」誤抓。
  if (/完结篇|完結篇/.test(name)) return 2;

  // 先抓「X季」（無「第」前綴）再處理 stripSeasonMarker。
  //
  // 為什麼要這個順序：stripSeasonMarker 會把「第二季」字樣移除（跟「第N季」
  // 一起清掉），但後續「season > 1 過濾」邏輯又需要這個 N。
  // 例如 rawName「五等分的新娘 第二季 - 第01集 - 全集」—— strip 後變
  // 「五等分的新娘 - 全集」，裡面完全沒有數字可抓，extractSequelNumber 回 null。
  // 但使用者的 season='2' 卻需要這條被判定 sequel=2 才能通過 season filter。
  //
  // 規則：X季 必須在片名中段或結尾（不要求「第」），且前後是中文字符，
  // 避免誤抓「三季報」這類詞。
  //
  // 例：
  //   「五等分的新娘 第二季」 → 2
  //   「五等分的新娘 第二季[电影解说]」→ 2（sNoBrackets 後）
  //   「第二季 第01集」 → 2（剝掉「第01集」後開頭是「第二季」）
  const directSeasonMatch = String(name).match(
    /([一二三四五六七八九十壹贰叁肆伍陆柒捌玖拾0-9]+)\s*季(?=[\s\-【\[(]|$|[^0-9])/,
  );
  if (directSeasonMatch) {
    const v = parseChineseNumeral(directSeasonMatch[1]);
    if (v) return v;
  }

  // 先移除季度標記：「第一季」「第1季」「Season2」「S2」是季度而不是續集序號，
  // 「仁醫 第一季」的 1 若被當成序號，會讓第一季與原版被判為不同作品。
  // 季度交由 seasonNumber 處理，兩者必須分開判斷。
  const s = stripSeasonMarker(String(name)).trim();
  if (!s) return null;

  // 二次剪輯／解說影片不是正片，不參與續集判斷。
  if (/解说|解說|速看|剪輯|預告|预告|片花|花絮|影评|影評|-trailer/i.test(s)) {
    return null;
  }

  // 羅馬數字（II / III / IV）：不論在結尾還是副標題中都算。
  const roman = s.match(/(?:\s|：|:)([IVX]{1,4})\b/);
  if (roman) {
    const map = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9, X: 10 };
    const v = map[roman[1].toUpperCase()];
    if (v) return v;
  }

  // 「第二季」「第三季」這類沒「第」前綴的季別。站方檔名常用這種寫法：
// 「五等分的新娘 第二季」(2021)。stripSeasonMarker 會移除「第二季」字樣，
// 但我們需要這個 N 來做「season > 1 過濾」。在「完结篇」分支之前先檢查。
//
// 注意：要先於「第X部」分支，因為這條規則更寬（不要求「第」前綴），
// 但同一個字串中兩者不會同時出現。
const seasonBare = s.match(/^([一二三四五六七八九十壹贰叁肆伍陆柒捌玖拾0-9]+)\s*季/);
  if (seasonBare) {
    const v = parseChineseNumeral(seasonBare[1]);
    if (v) return v;
  }

  // 「第X部 / 第二部」形式的續集（含中文數字）。
  const diBu = s.match(/第\s*([0-9一二三四五六七八九十壹贰叁肆伍陆柒捌玖拾]+)\s*部/);
  if (diBu) {
    const v = parseChineseNumeral(diBu[1]);
    if (v) return v;
  }

  // 「大江大河II」這類純羅馬數字結尾。
  const romanTail = s.match(/(?:\s|[：:：])([IVX]{1,4})$/);
  if (romanTail) {
    const map = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9, X: 10 };
    const v = map[romanTail[1].toUpperCase()];
    if (v) return v;
  }

  // 阿拉伯數字：取第一個出現且不像年份的數字。
  //
  // 先把方括號內容（[hnm3u8] / [wjm3u8] 之類的宿主標籤）整段移除。
  // 沒移除的話，方括號裡的 m3u8、f4、1080p 等數字會被當成續集序號，
  // 實測「仁醫完結篇 - 第02集 - [ffm3u8]」會抓出 3（從 ffm3u8），
  // 「仁医2 - 第01集 - [wjm3u8]」會抓出 8，整個比對規則全面錯亂。
  const sNoBrackets = s.replace(/\[[^\]]*\]/g, '');
  const digits = [...sNoBrackets.matchAll(/(\d+)/g)]
    .map(m => ({ raw: m[1], at: m.index }))
    .filter(d => {
      const n = parseInt(d.raw, 10);
      if (!(n > 0 && n < 100)) return false;      // 排除 0 與 100 以上（含年份）
      // 序號前面是中文／英文文字才算續集；「红海行动2018」整個是年份。
      const before = sNoBrackets.slice(0, d.at);
      return /[^\d\s]$/.test(before) || before.length === 0;
    });
  if (digits.length) return parseInt(digits[0].raw, 10);

  return null;
}

function calculateStringSimilarity(str1, str2) {
  if (!str1 || !str2) return 0;
  if (str1 === str2) return 1;
  
  const chars1 = new Set(str1.replace(/\s+/g, ''));
  const chars2 = new Set(str2.replace(/\s+/g, ''));
  
  if (chars1.size === 0 || chars2.size === 0) return 0;
  
  const intersection = new Set([...chars1].filter(x => chars2.has(x)));
  const union = new Set([...chars1, ...chars2]);
  
  return union.size === 0 ? 0 : intersection.size / union.size;
}

function calculateEditDistanceSimilarity(str1, str2) {
  const len1 = str1.length;
  const len2 = str2.length;
  
  if (len1 === 0) return len2 === 0 ? 1 : 0;
  if (len2 === 0) return 0;
  
  const matrix = [];
  for (let i = 0; i <= len1; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= len2; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= len1; i++) {
    for (let j = 1; j <= len2; j++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }
  
  const maxLen = Math.max(len1, len2);
  return maxLen === 0 ? 1 : 1 - matrix[len1][len2] / maxLen;
}

function calculateHybridSimilarity(str1, str2) {
  if (!str1 || !str2) return 0;
  if (str1 === str2) return 1;

  // 「的」「之」是中文常用虛詞，計算相似度前移除。
  // 實機搜「五等分新娘」第二季卻回 0 筆：站方檔名「五等分的新娘 第二季」
  // 帶「的」，target 沒「的」，字元相似度 = 4/6 ≈ 0.667，連 SIMILARITY_LOOSE
  // 0.75 都不到，連 loose match 都沒過。把虛詞從兩個字串都拿掉，相似度變 1.0
  // 就能正確命中。
  const stripFiller = (s) => s.replace(/的|之/g, '');
  const s1 = stripFiller(str1);
  const s2 = stripFiller(str2);
  if (s1 === s2) return 1;

  const charSimilarity = calculateStringSimilarity(s1, s2);
  const editSimilarity = calculateEditDistanceSimilarity(s1, s2);

  return (charSimilarity * 0.6 + editSimilarity * 0.4);
}

function extractResolutionInfo(vodName, epName) {
  const text = (vodName + ' ' + (epName || '')).toLowerCase();
  let resolution = { 
    level: 0, 
    label: '未知', 
    isHD: false, 
    is4K: false,
    tags: [],
    qualityScore: 0
  };
  
  if (/4[Kk]|UHD|2160[Pp]/.test(text)) {
    resolution = { level: 5, label: '4K', isHD: true, is4K: true, tags: [], qualityScore: 30 };
  } else if (/1080[Pp]|蓝光|FHD/.test(text)) {
    resolution = { level: 4, label: '1080P', isHD: true, is4K: false, tags: [], qualityScore: 25 };
  } else if (/720[Pp]|HD/.test(text)) {
    resolution = { level: 3, label: '720P', isHD: true, is4K: false, tags: [], qualityScore: 20 };
  } else if (/480[Pp]|SD/.test(text)) {
    resolution = { level: 2, label: '480P', isHD: false, is4K: false, tags: [], qualityScore: 10 };
  } else if (/360[Pp]/.test(text)) {
    resolution = { level: 1, label: '360P', isHD: false, is4K: false, tags: [], qualityScore: 5 };
  }
  
  if (/HDR|杜比/.test(text)) {
    resolution.tags.push('hdr');
    resolution.qualityScore += 10;
  }
  if (/HEVC|H\.265/.test(text)) {
    resolution.tags.push('hevc');
    resolution.qualityScore += 8;
  }
  if (/BluRay|BD/.test(text)) {
    resolution.tags.push('bluray');
    resolution.qualityScore += 15;
  }
  if (/WEB[-\s]?DL/.test(text)) {
    resolution.tags.push('webdl');
    resolution.qualityScore += 12;
  }
  
  if (epName && epName.toLowerCase().includes('https')) {
    resolution.qualityScore += 5;
  }
  
  return resolution;
}

function extractEnhancedInfo(seriesName) {
  if (!seriesName) return { 
    baseName: '', 
    seasonNumber: 1,
    isVariety: false,
    varietyEpisode: null,
    varietyDate: null,
    year: null,
    region: 'other',
    rawName: seriesName
  };

  const rawName = String(seriesName);
  let baseName = rawName;
  let seasonNumber = 1;
  let isVariety = false;
  let varietyEpisode = null;
  let varietyDate = null;
  let year = null;
  let region = 'other';

  const yearMatch = rawName.match(/(?:20|19)(\d{2})/);
  if (yearMatch) year = parseInt(yearMatch[0]);

  const varietyEpisodeMatch = rawName.match(/第(\d+)期/);
  if (varietyEpisodeMatch) {
    isVariety = true;
    varietyEpisode = parseInt(varietyEpisodeMatch[1]) || 1;
  } else {
    const dateMatch = rawName.match(/(\d{4}年\d{1,2}月\d{1,2}日|\d{4}\.\d{1,2}\.\d{1,2}|\d{4}\d{2}\d{2})/);
    if (dateMatch) {
      isVariety = true;
      varietyDate = dateMatch[0];
    }
  }

  if (rawName.includes('大陆') || rawName.includes('国产') || rawName.includes('内地')) {
    region = 'cn';
  } else if (rawName.includes('港')) {
    region = 'hk';
  } else if (rawName.includes('台')) {
    region = 'tw';
  } else if (rawName.includes('美')) {
    region = 'us';
  } else if (rawName.includes('韩')) {
    region = 'kr';
  } else if (rawName.includes('日')) {
    region = 'jp';
  }

  const chineseMatch = rawName.match(/第([一二三四五六七八九十零\d]+)[季部季]/);
  if (chineseMatch) {
    const val = chineseMatch[1];
    seasonNumber = CHINESE_NUM_MAP[val] || parseInt(val) || 1;
    baseName = rawName.replace(/第[一二三四五六七八九十零\d]+[季部季]/, '');
  } else {
    const englishMatch = rawName.match(/[Ss]eason\s*(\d+)/i) || rawName.match(/[Ss](\d+)/);
    if (englishMatch) {
      seasonNumber = parseInt(englishMatch[1]) || 1;
      baseName = rawName.replace(/[Ss]eason\s*\d+/i, '').replace(/[Ss]\d+/, '');
    }
  }

  baseName = deepCleanSeriesName(baseName);

  // 年份刻意不進搜尋字串。
  //
  // 舊註解認為「搜尋字串若都變成『仁医』，站台只會回傳排序最前的那一版」——
  // 實測不成立，站台會把所有版本一起回傳（搜「仁医」五個站合計 41 筆，
  // 裡面同時有日版與韓版）。
  //
  // 真正該避免的是反過來：把年份塞進關鍵字。實測搜「仁医2009」五個站
  // 只剩 2 筆，四個站直接零結果。站台對關鍵字做起始匹配，
  // 而檔名就存成「仁医」，年份只存在於 vod_year 欄位 ——
  // 要求站台比對它手上沒有的東西，自然搜不到。
  //
  // 版本交給結果階段用 vod_year / vod_area 判斷（見 extractPlayInfoForCache），
  // 那才是站台自己認可的版本依據。

  // VOD 資源站幾乎都是簡體內容：以繁體關鍵字直接查詢會零結果。
  // 送出前一律轉成簡體，命中後再把片名轉回繁體顯示。
  let searchQuery = CONFIG.CONVERSION.ENABLED
    ? convertChinese(baseName, false)
    : baseName;

  // 搜尋字串要帶上季別，否則資源站一律回傳第一季。
  //
  // 使用者切換季別時 seriesName 可能不變（「仁醫」+ season=2），
  // 只用 baseName 查詢會拿回第一季的內容，畫面看起來就完全沒更新。
  //
  // 用「序號」而不是「第N季」：實測五個站對「仁医 第2季」「仁医 season2」
  // 全部零結果，但「仁医2」四個站都有回應。資源站實際是把後續季度
  // 命名成「仁医2」「仁医2012」，用季度字面查反而什麼都搜不到。
  // 序號必須緊貼片名：「仁医 2」帶空格同樣零結果。
  // 第 1 季不加分：原季多半沒有序號，加了反而查不到。
  if (seasonNumber > 1) {
    searchQuery += String(seasonNumber);
  }

  return {
    baseName,
    searchQuery,
    seasonNumber,
    isVariety,
    varietyEpisode,
    varietyDate,
    year,
    region,
    rawName
  };
}

/**
 * 找出「同一部作品存在無年份版本」的事實。
 *
 * 用途：資源站標示後續季的方式不是寫序號或季度，而是直接加年份 ——
 * 實測「仁醫」第一季是「仁医」（無年份），第二季卻命名為「仁医2012」。
 * 兩者在搜尋結果中並列，若不處理，選第一季會拿到第二季的來源。
 *
 * 判準：站內出現多個「片名主體相同、只有年份不同」的候選時，只有最早的
 * 那一個是第一季／原版，其餘都是後續季或續集。
 *
 * 兩種實測到的站方寫法都涵蓋：
 *  - 「仁医」(無年份) + 「仁医2012」→ 無年份的是第一季
 *  - 「仁医2009」+ 「仁医2012」      → 最早年份的是第一季
 *
 * 這個判斷只能在站內候選之間做：單看「仁医2012」無法定性是第幾季。
 * 只納入片名主體（去副標題、去季度、去序號、去年份後）與目標完全相同、
 * 且通過比對的候選，避免把同系列其他作品（「星空下的仁医」）算進來。
 *
 * 站內只有單一版本時回傳 null，代表無法判斷，呼叫端應一律放行 ——
 * 寧可多給，不可誤殺正確來源。
 */
function findYearMarkedSequels(list, targetInfo, matchStrictness = 'standard') {
  if (!Array.isArray(list)) return null;
  const targetCore = normalizeTitleForMatch(
    stripSubtitle(targetInfo.rawName).replace(/\s*(19|20)\d{2}\s*$/, '').trim()
  );

  const groups = new Map();   // 片名主體 -> [{year, vodYear}]
  for (const item of list) {
    if (!item?.vod_name) continue;
    const info = extractEnhancedInfo(item.vod_name);
    if (!isSmartSeriesMatch(targetInfo, info, matchStrictness).match) continue;

    const itemCore = normalizeTitleForMatch(
      stripSubtitle(info.rawName).replace(/\s*(19|20)\d{2}\s*$/, '').trim()
    );
    if (itemCore !== targetCore) continue;

    if (!groups.has(itemCore)) groups.set(itemCore, []);
    groups.get(itemCore).push({
      fileNameYear: info.year ?? null,                  // 從檔名抽出的年份
      vodYear: item.vod_year ? Number(item.vod_year) : null  // 站方 metadata 年份
    });
  }

  for (const items of groups.values()) {
    if (items.length < 2) continue;   // 單一版本無法判斷先後

    // 推算每筆的有效年份：優先用檔名年份，否則退回站方年份。
    // 只在兩者都是 null 時才算「無年份」，避免「仁醫」(檔名無年份、
    // vod_year=2009) 被誤當成「無年份原版」，導致同名有檔名年份的版本
    // 被錯判為續集。樂子站的仁醫就是這種情況 —— 站方只在 metadata
    // 帶年份，檔名卻沒寫，使用 stripSeasonMarker 抓不到。
    const effectiveYears = items.map(it => it.fileNameYear ?? it.vodYear ?? null);
    const withYear = effectiveYears.filter(y => y !== null);
    const uniqueYears = new Set(withYear);

    // 所有版本有效年份都一樣（即使有些「無年份」其實是缺資料），
    // 沒辦法判斷哪個是續集。退回全部放行（return null），
    // 不要硬湊一個「最早年份」當原版。
    if (uniqueYears.size < 2) return null;

    // 有「真正無年份」的版本時，優先當原版。
    const hasTrueNull = effectiveYears.includes(null);
    const earliest = hasTrueNull
      ? null
      : Math.min(...withYear);
    const sequels = effectiveYears.filter(y => y !== earliest);
    return { earliestYear: earliest, sequels: sequels.filter(y => y !== null) };
  }
  return null;
}

/**
 * 通用「副標題型續集群」啟發式 helper。
 *
 * 場景：forward app metadata 把 SAO 切成 4 季，但 VOD 站目錄裡這些條目
 * sequel 標記都是 null（沒「第N季」字眼），純粹靠「主標題 + 空格 + 副標題」
 * 結構命名（caiji/rycj/lzi）：
 *   - 「刀剑神域」(S1+S2 合, 2012)
 *   - 「刀剑神域 序列之争」(劇場版, 2017)
 *   - 「刀剑神域 爱丽丝篇」(S3 Part 1, 2018)
 *   - 「刀剑神域 爱丽丝篇 异界战争」(S4 Part 2, 2019)
 *   - 「刀剑神域爱丽丝篇异界战争最终季」(S4 Part 3, 2020)
 *
 * 啟發式：
 *  1. baseName prefix 篩選出 series 內所有條目（容忍副標題長度差異）。
 *  2. 按 year (vod_year 優先，檔名年份次之) 排序分群：差距 >2 年 = 不同群。
 *  3. 群按最早年份排序，群序號 1..N 即 series 內的季序（S1 → SN）。
 *  4. targetSeason > 群數 → 不啟動（return null，避免硬湊）。
 *  5. targetSeason ≤ 群數 → return 第 targetSeason 群的 items。
 *
 * 通用性：不只 SAO — 任何「主標題 + 空格 + 副標題」結構的 series 都適用
 * （如「進撃的巨人 最終季」、「呪術迴戰 涉谷事變」等）。
 */
function findSubtitledSequels(list, targetInfo, targetSeason, matchStrictness = 'standard') {
  if (!Array.isArray(list) || !targetInfo) return null;
  if (!Number.isFinite(targetSeason) || targetSeason < 2) return null;

  const targetBase = normalizeTitleForMatch(targetInfo.baseName || '');
  if (!targetBase) return null;

  // 收集 series 內所有「baseName 是 target baseName prefix」的 candidate。
  const matched = [];
  for (const item of list) {
    if (!item?.vod_name) continue;
    const info = extractEnhancedInfo(item.vod_name);
    const itemBase = normalizeTitleForMatch(info.baseName || '');
    // 雙向 prefix 匹配（target 可能比 candidate 短，或反之）。
    if (!targetBase.startsWith(itemBase) && !itemBase.startsWith(targetBase)) continue;

    // 副標題：baseName 之外的字串部分。
    const subt = itemBase.startsWith(targetBase)
      ? itemBase.slice(targetBase.length)
      : '';
    const year = info.year ?? (item.vod_year ? Number(item.vod_year) : null);
    matched.push({ item, info, year, subt });
  }
  if (matched.length === 0) return null;

  // 沒年份資料的歸為「未知」檔，不能參與分群判斷。
  const withYear = matched.filter(m => m.year !== null);
  if (withYear.length < 2) return null;

  // 按年份排序分群：差距 > 2 年視為不同群。
  // 例: 2018 (爱丽丝篇), 2019/2020 (异界战争+最終季) → 2 群
  withYear.sort((a, b) => a.year - b.year);
  const groups = [];
  for (const m of withYear) {
    const last = groups[groups.length - 1];
    if (last && m.year - last[last.length - 1].year <= 2) {
      last.push(m);
    } else {
      groups.push([m]);
    }
  }

  // 安全閘：群數必須 ≥ targetSeason 才啟動，否則不啟動（避免把 S1 硬塞成 S4）。
  if (groups.length < targetSeason) return null;

  const targetGroup = groups[targetSeason - 1];
  return {
    groupYear: targetGroup[0].year,
    items: targetGroup.map(m => m.item),
    groupCount: groups.length,
  };
}

function isSmartSeriesMatch(targetInfo, candidateInfo, matchStrictness = 'standard') {
  // 使用者以繁體搜尋、資源站回傳簡體，兩者字面不同但其實是同一部片。
  // 比對前統一轉為繁體並去除空白，才能正確判定為同一作品。
  const targetName = normalizeTitleForMatch(targetInfo.baseName);
  const candidateName = normalizeTitleForMatch(candidateInfo.baseName);

  // 「的」「之」是中文常用虛詞，Forward / 站方 / 使用者輸入時常有省略：
  //   target「五等分新娘」vs candidate「五等分的新娘」其實是同一片。
  // 比對前去掉這些虛詞，否則相似度會被 1 個虛詞拉低，導致「實際同片」誤判失敗。
  // （實機搜「五等分新娘」第二季卻回 0 筆就是這個原因 —— 樂子站只有
  //  「五等分的新娘 第二季」這條，站方檔名固定帶「的」。）
  const stripFiller = (s) => s.replace(/的|之/g, '');
  const targetNameNoFiller = stripFiller(targetName);
  const candidateNameNoFiller = stripFiller(candidateName);

  if (!targetName || !candidateName) {
    return { match: false, type: 'none', score: 0, confidence: 0 };
  }

  // 續集序號的判斷必須同時涵蓋兩種衝突：
  //  1. 兩者都有序號但數字不同（「无间道2」對「无间道3」）
  //  2. 一個有序號、一個沒有（「窃听风云2」對「窃听风云」是續集與原版，
  //     「战狼2」對「战狼」亦然 —— 這是最容易出錯的一組）
  // 第 2 種在片名互相包含時相似度必然很高（清理後幾乎同名），
  // 且年份尾巴的數字會撞上序號（"追龙2017" 包含 "追龙2"），
  // 因此必須在相似度比對之前就擋下，不能交給門檻判斷。
  // 目標序號取用：直接從片名抓不到時（典型情況：使用者輸入「仁醫」但
  // Forward 透過 season=第二季 表達要第 N 季），從 targetInfo._expectedSequel
  // 補。沒有 season 參數時這個欄位是 undefined，行為等同舊版。
  const targetSequel = extractSequelNumber(targetInfo.rawName) ?? targetInfo._expectedSequel ?? null;
  // 候選序號：除了從檔名抓數字，也把「完结篇/完結篇/最终季/最終季」視為
  // 序號標記 —— 實機上「仁醫第二季」在電影天堂/非凡/樂子/愛蛋四個站的
  // 真實檔名都是「仁医完结篇」，沒有任何數字序號，只能靠這個副標題識別。
  //
  // 條件：僅在 target 透過 season 明確指定第 N 季時才啟用。
  // 若 target 沒指定，候選「完结篇」可能是別的作品，不能硬塞 sequel。
  let candidateSequel = extractSequelNumber(candidateInfo.rawName);
  if (candidateSequel === null && targetInfo._expectedSequel &&
      /完结篇|完結篇/.test(candidateInfo.rawName)) {
    candidateSequel = targetInfo._expectedSequel;
  }
  const sequelShapeMismatch = (targetSequel === null) && (candidateSequel !== null);
  const sequelConflict = sequelShapeMismatch ||
    (targetSequel !== null && candidateSequel !== null && targetSequel !== candidateSequel);

  // 季度衝突：使用者選第一季，候選卻是第二季，就不是他要的內容。
  //
  // 這裡只在「雙方都明確標示季度」時才判定衝突。片名完全沒有季度標記時
  // 一律視為第一季（seasonNumber 的預設值），若照單全收會誤殺大量正確
  // 結果 —— 資源站對「仁醫」這種沒寫季度的項目不會標 Season1。
  // 因此判準是：候選明確寫出不同於目標的季度才排除。
  if (candidateInfo.seasonNumber !== 1 && candidateInfo.seasonNumber !== targetInfo.seasonNumber) {
    return {
      match: false, type: 'season_conflict', score: 0,
      similarity: 0,
      seasonMatch: false,
      targetSeason: targetInfo.seasonNumber,
      candidateSeason: candidateInfo.seasonNumber,
      confidence: 0
    };
  }

  const similarity = calculateHybridSimilarity(targetName, candidateName);

  // 相似度完全命中也可能是續集誤判（清理後同名），序號衝突時一律否決。
  if (sequelConflict) {
    return {
      match: false, type: 'sequel_conflict', score: 0,
      similarity, sequelTarget: targetSequel, sequelCandidate: candidateSequel,
      seasonMatch: false, confidence: 0
    };
  }
  
  let thresholds = CONFIG.MATCH_THRESHOLDS;
  if (matchStrictness === 'strict') {
    thresholds = { 
      SIMILARITY_EXACT: 0.98, 
      SIMILARITY_STRICT: 0.92, 
      SIMILARITY_LOOSE: 0.80, 
      KEYWORD_MIN_MATCH: 0.75 
    };
  } else if (matchStrictness === 'loose') {
    thresholds = { 
      SIMILARITY_EXACT: 0.90, 
      SIMILARITY_STRICT: 0.80, 
      SIMILARITY_LOOSE: 0.60, 
      KEYWORD_MIN_MATCH: 0.50 
    };
  }
  
  if (similarity >= thresholds.SIMILARITY_EXACT) {
    return { 
      match: true, 
      type: 'exact', 
      score: 100,
      similarity: similarity,
      seasonMatch: targetInfo.seasonNumber === candidateInfo.seasonNumber,
      confidence: 0.95
    };
  } else if (similarity >= thresholds.SIMILARITY_STRICT) {
    return { 
      match: true, 
      type: 'fuzzy', 
      score: 85,
      similarity: similarity,
      seasonMatch: targetInfo.seasonNumber === candidateInfo.seasonNumber,
      confidence: 0.85
    };
  } else if (similarity >= thresholds.SIMILARITY_LOOSE) {
    return { 
      match: true, 
      type: 'loose', 
      score: 70,
      similarity: similarity,
      seasonMatch: targetInfo.seasonNumber === candidateInfo.seasonNumber,
      confidence: 0.70
    };
  } else if (targetName.includes(candidateName) ||
             candidateName.includes(targetName)) {
    // 互相包含只代表「片名有重疊」，不保證是同一部作品。
    // 「追龙2」包含於「追龙2017」（年份的 2 開頭撞上序號）、
    // 「战狼2」包含於「战狼传说」：這些都是同系列的不同片。
    //
    // 判斷原則：主片名相同、且續集序號一致。
    // 主片名要去掉副標題：「追龙2」與「追龙2：追缉大富豪」是同一部片，
    // 但完整片名並不相等，只比完整名會漏掉這類常見寫法。
    // 序號則相反 —— 它是區別作品的關鍵，絕不可從主片名中剔除。
    let targetCore = normalizeTitleForMatch(stripSubtitle(targetInfo.baseName));
    let candidateCore = normalizeTitleForMatch(stripSubtitle(candidateInfo.baseName));
    // 「完结篇/完結篇」是續集標記，比對主片名時應去除，否則「仁医」跟
    // 「仁医完结篇」會被當成 baseName 不一致而拒絕。
    targetCore = targetCore.replace(/完结篇|完結篇/g, '');
    candidateCore = candidateCore.replace(/完结篇|完結篇/g, '');
    const sameSequel = targetSequel === candidateSequel;

    // 互補情境：target 是「仁医」+ sequel=2，candidate 是「仁医2」+ sequel=2，
    // 兩者 baseName 一個有 2 一個沒 2，但實際是同一部片。去除尾端單一數字
    // 後再比對。同樣反向也適用（target 有序號、candidate 沒有，
    // 例如 target 是「仁医2」、candidate 是「仁医」+ target._expectedSequel=2）。
    //
    // 同時去掉「的」「之」這類中文虛詞 —— 使用者輸入「五等分新娘」時往往
    // 不帶「的」，站方檔名卻固定寫「五等分的新娘」，差一個字 core 比對就
    // 失敗，後續 fallback 也要走相似度而非 core match。
    const stripFiller = (s) => s.replace(/的|之/g, '');
    const targetCoreNoDigit = stripFiller(targetCore).replace(/\d+$/, '');
    const candidateCoreNoDigit = stripFiller(candidateCore).replace(/\d+$/, '');
    const coreMatches = targetCore === candidateCore ||
                        stripFiller(targetCore) === stripFiller(candidateCore) ||
                        (targetCoreNoDigit && targetCoreNoDigit === candidateCoreNoDigit);

    // 額外處理「完结篇/完結篇」當作 sequel 標記。
    //
    // 實機情境：仁醫第二季在電影天堂 / 非凡資源 / 樂子 / 愛蛋四個站的真實
    // 檔名都是「仁医完结篇」(2011)，只有愛蛋另外有「仁医2」(2011)。
    // extractSequelNumber 對「仁医完结篇」回 null（檔名沒數字序號），
    // 對「仁医」也是 null —— 若 target._expectedSequel = 2，則
    // targetSequel = 2、candidateSequel = null，sameSequel 是 false，
    // fallback 也會拒絕。
    //
    // 解法：把「完结篇/完結篇」字樣視為 sequel = target._expectedSequel。
    const targetIsFinale = /完结篇|完結篇/.test(targetInfo.rawName);
    const candidateIsFinale = /完结篇|完結篇/.test(candidateInfo.rawName);
    const finaleMatches = targetIsFinale === candidateIsFinale; // 兩者都沒有/都有才算對稱
    const expectedSequel = targetInfo._expectedSequel;
    const sequelCompatible = sameSequel ||
      (expectedSequel &&
              ((candidateIsFinale && candidateSequel === null) ||
               (targetIsFinale && targetSequel === null)));

    if (coreMatches && (sequelCompatible || (finaleMatches && targetIsFinale === false))) {
      return {
        match: true,
        type: 'fallback',
        score: 50,
        similarity: similarity,
        seasonMatch: targetInfo.seasonNumber === candidateInfo.seasonNumber,
        confidence: 0.60
      };
    }
  }
  
  return { match: false, type: 'none', score: 0, similarity: 0, confidence: 0 };
}

/**
 * 取出資源實際對應的集數。
 *
 * 以站方原始的 _ep 為準（那是從 vod_play_url 逐集解析出來的，最可靠）；
 * 對外輸出時 _ep 已被清掉，此時退回解析 description 的「第N集」。
 * 兩種來源都不認得時回傳 null，代表無法判斷，交由呼叫端決定如何處置。
 */
function episodeLabelOf(resource) {
  // 優先從頂層 episode 欄位讀（cache 命中後 _ep 已被 cleanResourceForOutput 移除，
  // 只剩頂層 episode 可用）。舊的 _ep 仍是權威來源（搜尋階段還在物件上）。
  if (resource?.episode !== null && resource?.episode !== undefined) {
    return resource.episode;
  }
  if (resource?._ep !== null && resource?._ep !== undefined) {
    return resource._ep;
  }
  const fromText = String(resource?.description || '').match(/第(\d+)集/);
  return fromText ? parseInt(fromText[1], 10) : null;
}

/**
 * 去重用的集數標識。抽不出集數的來源（綜藝日期集、單集電影）給一個穩定的
 * 佔位值，讓它們彼此仍可去重，但永遠不會跟有集數的來源互相合併。
 */
function episodeKeyOf(resource) {
  const label = episodeLabelOf(resource);
  if (label !== null && label !== undefined) return `ep${label}`;
  if (resource?._episodeDate) return `date:${resource._episodeDate}`;
  return 'no-ep';
}

/**
 * 播放來源標識。同一集在同一站常有數個 CDN 來源（如 wjm3u8 / jinyingm3u8），
 * 這些是使用者要挑的可選來源，不能互相去重。來源名寫在 description 尾端的
 * [xxx] 括號中。
 */
function playSourceKeyOf(resource) {
  // 必須取最後一個括號。描述尾端依序是「畫質」與「版本標註」兩個方括號
  // （「仁醫 - 第01集 - 已完結 - [wjm3u8] [2012 · 韓國]」），來源名在中間。
  const all = String(resource?.description || '').match(/\[([^\]]+)\]/g);
  if (all && all.length) return all[all.length - 2] || all[0];
  if (resource?.playFrom) return String(resource.playFrom);
  return 'src';
}

/**
 * 依集數挑出該集的來源。
 *
 * 有些站用日期命名集數（「- 1 -」而不是「第1集」），這類來源抽不出集數。
 * 一律保留會在點第3集時混進第1集的連結，比少給更糟：使用者不會自己分辨。
 * 但若某站完全沒有本集來源，寧可給一個可能可播的選項，也不要讓該站整個消失。
 */
function filterByEpisode(results, targetEpisode) {
  if (!targetEpisode) return results;
  const hasExact = results.some(res => episodeLabelOf(res) === targetEpisode);
  return results.filter(res => {
    const label = episodeLabelOf(res);
    if (label === targetEpisode) return true;
    if (label !== null) return false;
    return !hasExact;
  });
}

function extractPlayInfoForCache(item, siteTitle, type, matchInfo, targetInfo) {
  const { vod_name, vod_play_url, vod_play_from, vod_remarks = '' } = item;
  if (!vod_name || !vod_play_url) return [];

  // 站台已標註的年份與地區：片名文字只差一個年份時（「仁医2009」對
  // 「仁医2012」），只有這些欄位能分辨是日版還是韓版。
  //
  // 實測五個站只有「樂子」回傳 vod_year，電影天堂、非凡、如意、愛蛋的
  // 列表 API 根本不帶這個欄位。所以必須補上台詞片名的年份當後備 ——
  // 那四個站的檔名幾乎都帶著年份（「仁医2012」「仁医（2009）」「仁医2」），
  // 沒有這層後備，它們回傳的韓版會被當成「沒有年份」而全數放行。
  //
  // 順序刻意是欄位優先、片名後備：欄位是站台自己標的，權威度最高；
  // 片名只是推導，且「完结篇」「第2季」這類字樣不該被當成年份。
  const itemYear = String(item.vod_year || '').trim() ||
    extractVersionMarker(vod_name) || null;
  const itemArea = normalizeArea(item.vod_area) || normalizeArea(item.type_name);
  const targetYear = extractVersionMarker(targetInfo?.rawName) || targetInfo?.year || null;
  const targetArea = resolveTargetArea(null, targetInfo);

  // 地區衝突只在兩邊都有明確地區時才算，避免沒有 area 的站台被誤判
  // （精簡站回傳的 type_name 可能是泛用分類，不能當地區）。
  const areaMismatch = Boolean(targetArea && itemArea && targetArea !== itemArea);
  const areaMatch = Boolean(targetArea && itemArea && targetArea === itemArea);

  // 年份衝突要雙方都有年份才成立，否則沒有年份的站台會被全部誤殺。
  const yearConflict = Boolean(
    targetYear && itemYear && targetYear !== itemYear
  );

  const playSources = vod_play_url.replace(/#+$/, '').split('$$$');
  const sourceNames = (vod_play_from || '').split('$$$');
  const results = [];

  playSources.forEach((playSource, i) => {
    const sourceName = sourceNames[i] || '預設源';
    const isTV = playSource.includes('#');

    if (type === 'tv' && isTV) {
      const episodes = playSource.split('#').filter(Boolean);
      episodes.forEach(ep => {
        const [epName, url] = ep.split('$');
        if (url && isPlayableUrl(url)) {
          const epMatch = epName.match(/第(\d+)(集|期)/);
          const episodeNumber = epMatch ? parseInt(epMatch[1]) : null;

          const resolutionInfo = extractResolutionInfo(vod_name, epName);

          const dateMatch = epName.match(/(\d{4}年\d{1,2}月\d{1,2}日|\d{4}\.\d{1,2}\.\d{1,2}|\d{4}\d{2}\d{2})/);

          // 資源站回傳簡體，統一轉繁體後再顯示
          const displayName = toDisplayText(vod_name);
          const displayEp = toDisplayText(epName);
          const displayRemarks = toDisplayText(vod_remarks);

          // 顯示用描述：片名與集數／副標之間用「．」連接，版本標記
          // （年/國）由 cleanResourceForOutput 內追加「[年 - 國]」。
          // 不再附加「已完結」或 [dyttm3u8] 等站內標記。
          // 例：「零之使魔．第01集」 /「进击的巨人 最终季．完结篇」/
          //   「银河铁道之父」+ 結尾「[2012年 - 日本]」。
          const stripFinished = (s) => String(s || '').replace(/已完結|已完结/g, '').replace(/\s+/g, ' ').trim();
          const epText = stripFinished(displayEp);
          const remarkText = stripFinished(displayRemarks);
          // epName / remark 中常含多段空白分隔，保留全部並用「．」串接
          // （user 範例：「进击的巨人 最终季．完结篇」），再追加 remark 段。
          const tail = [epText, remarkText].filter(Boolean).join('．').replace(/\s+/g, ' ').trim();
          const resource = {
            name: siteTitle,
            description: tail ? `${displayName}．${tail}` : displayName,
            // TV 分支必須在這裡 wrap，理由與 movie 分支相同：
            // 這條路徑是直接 results.push，不經過 cleanResourceForOutput。
            //
            // 這是「設定改了但播放沒走過濾伺服器」的真正主因 ——
            // loadResource 預設類型是 'tv'，而 TV 分支原本寫的是
            // url: url.trim()（裸 CDN 直連）。只有 movie 分支和
            // cleanResourceForOutput 有 wrap，所以劇集全部繞過過濾伺服器。
            // wrap 冪等，重複呼叫不會二次包裝。
            //
            // 附帶 site / name / episode：後台觀看紀錄靠這三個欄位才看得出
            // 「誰在看、看的哪一集」，不帶就是一片空白。
            url: wrapM3U8WithFilter(url.trim(), {
              site: siteTitle,
              name: toDisplayText(vod_name),
              episode: toDisplayText(epName),
            }),

            playerType: 'app',
            customHeaders: {
              'X-Forward-Skip-Redirect-Probe': '1',
            },
            resolution: resolutionInfo.label,
            resolutionLevel: resolutionInfo.level,
            isHD: resolutionInfo.isHD,
            is4K: resolutionInfo.is4K,
            qualityTags: resolutionInfo.tags,
            qualityScore: resolutionInfo.qualityScore,
            isHttps: url.startsWith('https'),

            _ep: episodeNumber,
            _episodeDate: dateMatch ? dateMatch[0] : null,
            _isVariety: dateMatch !== null || epMatch?.[2] === '期',
            _matchType: matchInfo.type,
            _matchScore: matchInfo.score,
            _confidence: matchInfo.confidence,
            _isMainSource: CONFIG.MAIN_SOURCES.includes(siteTitle),
            _hasEpInfo: episodeNumber !== null || dateMatch !== null,
            _updateRecency: vod_remarks.includes('更新') || vod_remarks.includes('第') ? 1 : 0,
            _year: itemYear,
            _area: itemArea,
            // 站方原始片名，去重要用它分辨「同名但不同版本」。
            _rawName: vod_name,
            // 所屬 VOD item 推論出的季別（sequel 序號）。
            // loadDetail 內會用這個欄位把來自多季的資源分組到正確的 season。
            // 不寫進 finalResults（fieldsToDelete 會清掉）以免影響排序邏輯。
            _seasonFromItem: extractSequelNumber(vod_name),
            _seasonMatch: matchInfo.seasonMatch,
            _versionConflict: yearConflict || isConflictingVersion(targetInfo, vod_name),
            _versionAmbiguous: !yearConflict && isVersionAmbiguous(targetInfo, vod_name),
            _areaMismatch: areaMismatch,
            _areaMatch: areaMatch
          };

          results.push(resource);
        }
      });
    } else if (type === 'movie' && !isTV) {
      const firstM3U8 = playSource.split('#').find(v => isM3U8Url(v.split('$')[1]));
      if (firstM3U8) {
        const [quality, url] = firstM3U8.split('$');
        const qualityText = quality.toLowerCase().includes('tc') ? '搶先版' : '正片';

        const resolutionInfo = extractResolutionInfo(vod_name, quality);

        const displayName = toDisplayText(vod_name);
        // Movie 描述：正片（默認）不附標記；搶先版/TC/其他非正片
        // 標籤以「．」中點附在片名後。
        const isMainRelease = qualityText === '正片';
        const resource = {
          name: siteTitle,
          description: isMainRelease ? displayName : `${displayName}．${qualityText}`,
          // movie 分支必須在這裡 wrap。cleanResourceForOutput 雖然也會 wrap，
          // 但它是搜尋結果清理階段才跑；movie 走的是直接 results.push 路徑，
          // 漏掉會讓電影全部裸奔 CDN —— 「設定改了但播放沒走過濾伺服器」
          // 正是這裡造成的。wrap 本身冪等，重複呼叫不會二次包裝。
          //
          // site / name 讓後台觀看紀錄看得出來源；電影沒有集數，故不傳 episode。
          url: wrapM3U8WithFilter(url.trim(), {
            site: siteTitle,
            name: toDisplayText(vod_name),
          }),

          playerType: 'app',
          customHeaders: {
            'X-Forward-Skip-Redirect-Probe': '1',
          },
          resolution: resolutionInfo.label,
          resolutionLevel: resolutionInfo.level,
          isHD: resolutionInfo.isHD,
          is4K: resolutionInfo.is4K,
          qualityTags: resolutionInfo.tags,
          qualityScore: resolutionInfo.qualityScore,
          isHttps: url.startsWith('https'),
          
          _matchType: matchInfo.type,
          _matchScore: matchInfo.score,
          _confidence: matchInfo.confidence,
          _isMainSource: CONFIG.MAIN_SOURCES.includes(siteTitle),
          _hasEpInfo: false,
          _updateRecency: vod_remarks.includes('更新') ? 1 : 0,
          _year: itemYear,
          _area: itemArea,
          // 站方原始片名。去重要用它區分「片名相同但其實是不同版本」的情況：
          // 有幾個站同時存在日版與韓版、兩者檔名都只寫「仁医」且不帶年份欄位，
          // 只靠 _year 無法分辨，會被去重吃掉其中一版。
          _rawName: vod_name,
          _seasonFromItem: extractSequelNumber(vod_name),
          _seasonMatch: matchInfo.seasonMatch,
          _versionConflict: yearConflict || isConflictingVersion(targetInfo, vod_name),
          _versionAmbiguous: !yearConflict && isVersionAmbiguous(targetInfo, vod_name),
          _areaMismatch: areaMismatch,
          _areaMatch: areaMatch
        };
        
        results.push(resource);
      }
    }
  });

  return results;
}

function parseResourceSites(VodData) {
  const parseLine = (line) => {
    // 以 # 開頭為停用站註解，需在切分前排除，
    // 否則站名會變成「#站名」而被誤認為有效來源。
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith('#')) return null;

    const [title, value] = trimmedLine.split(',').map(s => s.trim());
    if (title && value?.startsWith('http')) {
      const normalizedValue = (value.endsWith('/') || value.includes('.php') || value.includes('/json')) ? value : value + '/';
      return {
        title,
        value: normalizedValue,
        isMain: CONFIG.MAIN_SOURCES.includes(title)
      };
    }
    return null;
  };

  try {
    const trimmed = VodData?.trim() || '';
    if (trimmed === '') {
      return RESOURCE_SITES.trim().split('\n').map(parseLine).filter(Boolean);
    }

    if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed.map(s => ({ 
          title: s.title || s.name, 
          value: s.url || s.value,
          isMain: CONFIG.MAIN_SOURCES.includes(s.title || s.name)
        })).filter(s => s.title && s.value);
      } else if (typeof parsed === 'object') {
        return Object.entries(parsed).map(([title, value]) => ({ 
          title, 
          value: String(value),
          isMain: CONFIG.MAIN_SOURCES.includes(title)
        })).filter(s => s.title && s.value);
      }
    }
    
    return trimmed.split('\n').map(parseLine).filter(Boolean);
  } catch (e) {
    return RESOURCE_SITES.trim().split('\n').map(parseLine).filter(Boolean);
  }
}

// 部分 MacCMS 站台的分類 ID 與慣例不符（慣例 t=2 為電視劇），
// 帶上 t 會得到 0 筆結果，必須不帶 t 才有資料。
// 這個發現會在執行時補進去，但 App 每次重啟都會清空記憶體，
// 因此一併寫死已知站台，並用 storage 記住新發現的，避免每次都先送注定失敗的請求。
const SITES_REJECTING_TYPE_PARAM = new Set([
  // 實測：這幾站以 t=2 查詢回傳 pagecount=0，改用不帶 t 或 t=0 才有資料。
  'dyttzyapi.com',
  'ffzyapi.com',
  'ryyshh.com'
]);

const REJECTING_TYPE_STORAGE_KEY = 'vod_sites_rejecting_t';

// 官方 @rexnow/libs 的 storage.set/get 用字串介面，本地儲存的快取必須先
// 序列化。舊資料若是陣列（自行 mock 的環境）也要能讀出來 —— 用這個 helper
// 統一處理，比每個呼叫端各自 try/catch 安全。
function parseCacheValue(raw) {
  if (raw == null) return [];
  if (Array.isArray(raw)) return raw;
  if (typeof raw === 'string') {
    try { const p = JSON.parse(raw); return Array.isArray(p) ? p : []; }
    catch { return []; }
  }
  return [];
}

/**
 * 並行探測一組 URL，回傳對應位置的 boolean（true=活著，false=失效/timeout）。
 * 用於 cache 寫入前過濾，避免把死 URL 寫進 cache 讓下次進入還會拿到舊失效 URL。
 * HEAD 探測比 GET 省頻寬；CDN 對 HEAD 通常也會回正確狀態碼。
 * 找不到 Widget.http 時直接視為活著（保留向後相容）。
 */
async function probeUrlsAlive(urls, opts = {}) {
  const timeout = opts.timeout ?? CONFIG.URL_PROBE_TIMEOUT ?? 5000;
  const concurrency = opts.concurrency ?? CONFIG.URL_PROBE_CONCURRENCY ?? 6;
  if (!Array.isArray(urls) || urls.length === 0) return [];

  // 沒 Widget.http：無法探測，全部視為活著（不擋 cache）
  if (!Widget?.http?.request) return urls.map(() => true);

  const results = new Array(urls.length);
  let cursor = 0;
  const worker = async () => {
    while (cursor < urls.length) {
      const i = cursor++;
      const u = urls[i];
      try {
        // request 走 HEAD；Widget.http.get 在某些 runtime 不支援 method 參數，
        // 失敗/超時/非 2xx 都視為失效
        const resp = await Widget.http.request({
          url: u,
          method: 'HEAD',
          timeout,
        });
        const code = resp?.statusCode ?? 0;
        results[i] = code >= 200 && code < 400;
      } catch (_) {
        // 某些 CDN 不接受 HEAD，會在 GET 時回 405/200，這裡先標失效
        // 讓 probe 函式可以 fallback 到 GET 重試
        results[i] = false;
      }
    }
  };
  const workers = Array.from({ length: Math.min(concurrency, urls.length) }, worker);
  await Promise.all(workers);

  // 第二輪：HEAD 失敗的用 GET 重試一次（CDN 常見：HEAD 拒絕但 GET 200）
  //
  // 註：原本這層 fallback 設計是為了兼容「CDN 不接受 HEAD 但 GET 200」
  // 的情況，但實機 100 筆規模時全部跑 GET 會把總探測時間從 1x 拉到 2x
  // （probe 用滿了 forward 的 HTTP timeout），使用者體感卡頓。改為直接
  // 接受 HEAD 結果就好 —— 失效的不寫 cache，下次重搜時自然會重新探測。
  // 真正「播一會斷線重頭」的 CDN 502 不會被 HEAD 放行（502 ≥ 400），
  // 所以這層簡化不會讓壞 URL 進 cache。
  return results;
}

async function loadRejectingTypeSites() {
  try {
    const saved = parseCacheValue(await Widget.storage?.get?.(REJECTING_TYPE_STORAGE_KEY));
    saved.forEach(site => SITES_REJECTING_TYPE_PARAM.add(site));
  } catch (e) {
    // storage 不可用時仍可運作，只是每個 App 工作階段都要重新試錯一次
  }
}

function rememberRejectingTypeSite(siteValue) {
  SITES_REJECTING_TYPE_PARAM.add(siteValue);
  try {
    Widget.storage?.set?.(REJECTING_TYPE_STORAGE_KEY, JSON.stringify([...SITES_REJECTING_TYPE_PARAM]));
  } catch (e) {
    // 寫入失敗不影響本次搜尋結果
  }
}

const WIDGET_VERSION_KEY = 'vod_widget_version';

// 版本變更時清掉舊 cache。詳見 loadResource 內 syncWidgetVersion 的說明。
async function syncWidgetVersion() {
  try {
    const saved = await Widget.storage?.get?.(WIDGET_VERSION_KEY);
    const savedNum = saved ? parseInt(saved, 10) : 0;
    if (savedNum !== CONFIG.WIDGET_VERSION) {
      console.log(`🧹 版本 ${savedNum} → ${CONFIG.WIDGET_VERSION}，清掉舊 cache`);
      const keys = await Widget.storage?.keys?.();
      if (Array.isArray(keys)) {
        for (const k of keys) {
          if (k === WIDGET_VERSION_KEY) continue;
          try { await Widget.storage?.remove?.(k); } catch {}
        }
      }
      await Widget.storage?.set?.(WIDGET_VERSION_KEY, String(CONFIG.WIDGET_VERSION));
    }
  } catch {
    // storage 不可用就不處理，使用者手動重匯入即可
  }
}

loadRejectingTypeSites(); // 不需要 await：這只是 warm-up storage，第一個實際搜尋會等它完成

const API_USER_AGENT = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';

// Forward 的 Widget.http.get 只支援 headers，不解析 params 選項，
// 查詢參數必須自行接進 URL，否則請求會命中無參數的 API 首頁並回傳空結果。
function buildRequestUrl(baseUrl, params) {
  if (!params || typeof params !== 'object') return baseUrl;
  const query = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join('&');
  if (!query) return baseUrl;
  return baseUrl + (baseUrl.includes('?') ? '&' : '?') + query;
}

async function httpGetApi(baseUrl, params, timeout) {
  // 實測延遲不穩定的站需要更寬裕的逾時，否則會在半路被砍掉。
  const slow = CONFIG.SLOW_SITE_MATCH.some(m => baseUrl.includes(m));
  const effective = timeout || (slow ? CONFIG.SLOW_SITE_TIMEOUT : CONFIG.REQUEST_TIMEOUT);
  return Widget.http.get(buildRequestUrl(baseUrl, params), {
    headers: { 'User-Agent': API_USER_AGENT },
    timeout: effective
  });
}

async function fetchWithSmartRetry(url, params, retries, siteTitle) {
  let lastError;

  for (let i = 0; i <= retries; i++) {
    try {
      const baseQuery = { ...params.params };
      if (SITES_REJECTING_TYPE_PARAM.has(url)) {
        delete baseQuery.t;
      }
      const searchParams = { ...params, params: baseQuery };

      const response = await httpGetApi(url, searchParams.params);

      // Forward 的 http 層依站台行為可能回傳字串或已解析的物件，
      // 未正規化時 .data.list 永遠取不到，導致整個搜尋靜默回傳 0 筆。
      const normalized = normalizeHttpResponse(response);

      if (normalized?.list && normalized.list.length > 0) {
        return normalized;
      }

        // 仍為空：去掉 t 分類參數再試一次，涵蓋分類 ID 不同的站台
        if (searchParams.params.t !== undefined) {
          delete searchParams.params.t;
          const fallbackResponse = await httpGetApi(url, searchParams.params);
          const fallback = normalizeHttpResponse(fallbackResponse);
          if (fallback?.list && fallback.list.length > 0) {
            rememberRejectingTypeSite(url);
            return fallback;
          }
          return fallback;
        }

      return normalized;
    } catch (error) {
      lastError = error;
      if (i < retries) {
        const delay = 1000 * Math.pow(2, i);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  throw lastError;
}

// ==================== 版本歧義（同年不同劇） ====================
// 資源站常用年份標記同一片名的不同版本，且不一定是續集：
// 「仁医2009」是日版、「仁医2012」是韓版，兩者片名幾乎相同卻是不同劇集。
// 搜尋片名沒有年份時，站台會把兩個版本一起回傳（實測五個站有四個
// 把 2012 排在 2009 前面），使用者看到的預設就是錯的那一版。
//
// 這裡標記候選是否帶有「與目標片名不同的年份/版本標記」，
// 讓排序可以把未標記的版本（通常是使用者輸入的原版）排在前面，
// 而非直接丟棄帶年份的版本 —— 搜「仁醫2012」時它仍然是唯一正確答案。
function extractVersionMarker(name) {
  const t = String(name || '');
  const m = t.match(/[（(【\[]?\s*((?:19|20)\d{2})\s*(?:年)?\s*[)）】\]]?/);
  if (!m) return null;
  return m[1];
}

// 目標片名自帶年份時（「仁醫2012」），候選年份不同即為另一版本。
function isConflictingVersion(targetInfo, candidateName) {
  const targetYear = extractVersionMarker(targetInfo.rawName) || targetInfo.year;
  const candYear = extractVersionMarker(candidateName);
  if (!targetYear || !candYear) return false;
  return targetYear !== candYear;
}

// 目標片名沒有年份（「仁醫」）：候選帶年份標記代表它是某個特定版本，
// 站台通常把重製/韓版排前面。標記但不丟棄，交由排序降權。
function isVersionAmbiguous(targetInfo, candidateName) {
  if (targetInfo.year) return false;
  return extractVersionMarker(candidateName) !== null;
}

// ==================== 地區辨識 ====================
// 片名比對不足以分辨不同國家的同名劇：「仁医2009」與「仁医2012」
// 文字只差年份，都被判成完全匹配，韓版就混進日版的結果。
//
// 站台其實已經把答案放在欄位裡（實測 cj.lziapi.com 完整回傳）：
//   仁医        year=2009  area=日本  type_name=日本剧
//   仁医2012    year=2012  area=韩国  type_name=韩国剧
// 只靠片名文字猜不出日韓版，讀 vod_area / type_name 才能分清楚。
// 其他站只回精簡欄位（無 area/year），此時退回片名判斷。
const AREA_ALIASES = {
  jp: 'jp', japan: 'jp', 日本: 'jp', 日語: 'jp', 日语: 'jp', 日韩: 'jp', 日韓: 'jp', 国产: 'cn', 中國: 'cn', 中国: 'cn', 大陆: 'cn', 内地: 'cn', 國語: 'cn', 国语: 'cn', 普通话: 'cn', 普通話: 'cn', 粤语: 'hk', 廣東: 'hk', 广东: 'hk', 港台: 'hk', 港澳: 'hk', 台灣: 'tw', 台湾: 'tw', 韓: 'kr', 韩: 'kr', 韓國: 'kr', 韩国: 'kr', 美: 'us', 美国: 'us', 英: 'uk', 英国: 'uk', 法: 'fr', 法国: 'fr', 泰: 'th', 泰国: 'th', 印度: 'in'
};

// 地區代碼的人類可讀名稱。
//
// AREA_ALIASES 的值（jp / kr / cn）是給比對用的代碼，直接顯示出來只會讓
// 使用者看到無意義的「jp」。顯示層需要轉成中文。
const AREA_LABELS = {
  jp: '日本', cn: '國語', hk: '粵語', tw: '台灣', kr: '韓國',
  us: '美國', uk: '英國', fr: '法國', th: '泰國', in: '印度'
};

function areaLabel(area) {
  if (!area) return null;
  return AREA_LABELS[area] || area;
}

function normalizeArea(value) {
  if (!value) return null;
  // 部分站的 area 是「日本 / 日本剧」或陣列，先取第一段再比對
  const first = Array.isArray(value) ? value[0] : String(value).split(/[\/,\s、]+/)[0];
  const key = String(first || '').trim();
  if (!key) return null;
  return AREA_ALIASES[key] || AREA_ALIASES[key.toLowerCase()] || null;
}

// 從 Forward 傳入的片名 / 標題 / 首播資訊推測目標地區。
// 詳細頁已選定具體版本，這些欄位常帶著國別線索（「日本」版權、海外片名）。
function resolveTargetArea(params, targetInfo) {
  const direct = normalizeArea(params?.area || params?.region || params?.country);
  if (direct) return direct;
  return normalizeArea(targetInfo?.region);
}

function calculateResourceScore(resource, preferResolution = 'auto') {
  let score = resource._matchScore || 0;
  const weights = CONFIG.SORT_WEIGHTS;
  
  if (resource._matchType === 'exact') score += weights.EXACT_MATCH;
  else if (resource._matchType === 'fuzzy') score += weights.FUZZY_MATCH;
  else if (resource._matchType === 'loose') score += weights.LOOSE_MATCH;
  else if (resource._matchType === 'fallback') score += weights.FALLBACK_MATCH;
  
  if (resource._seasonMatch) score += weights.SEASON_MATCH_BONUS;
  if (resource._versionConflict) score -= weights.VERSION_CONFLICT_PENALTY;
  else if (resource._versionAmbiguous) score -= weights.VERSION_AMBIGUOUS_PENALTY;
  if (resource._areaMismatch) score -= weights.AREA_MISMATCH_PENALTY;
  else if (resource._areaMatch) score += weights.AREA_MATCH_BONUS;
  if (resource._isVariety && resource._hasEpInfo) score += weights.VARIETY_MATCH_BONUS;
  if (resource._isMainSource) score += weights.MAIN_SOURCE;
  if (resource._hasEpInfo) score += weights.HAS_EP_INFO;
  if (resource._updateRecency) score += weights.RECENT_UPDATE;
  
  score += weights.RESOLUTION_BONUS * (resource.resolutionLevel / 5);
  
  if (resource.qualityScore > 0) {
    score += weights.QUALITY_TAG_BONUS * (Math.min(resource.qualityScore, 30) / 30);
  }
  
  if (resource.isHttps) {
    score += weights.HTTPS_BONUS;
  }
  
  if (resource._confidence > 0) {
    score += weights.VALIDATED_BONUS * resource._confidence;
  }
  
  if (preferResolution === '4k' && resource.is4K) {
    score += 35;
  } else if (preferResolution === '1080p' && resource.resolutionLevel >= 4) {
    score += 25;
  } else if (preferResolution === '720p' && resource.resolutionLevel >= 3) {
    score += 15;
  }
  
  return Math.min(score, 200);
}

// ==================== 智能站点管理模块 ====================
class SiteManager {
  constructor() {
    this.sites = new Map();
    this.stats = new Map();
    this.healthCache = new Map();
  }
  
  initializeSites(resourceSites) {
    resourceSites.forEach(site => {
      const siteKey = `${site.title}_${site.value}`;
      this.sites.set(siteKey, {
        ...site,
        isHealthy: true,
        lastCheck: 0,
        responseTime: 0,
        successRate: 1.0,
        priority: site.isMain ? 1 : 0.5
      });
      
      this.stats.set(siteKey, {
        totalRequests: 0,
        successfulRequests: 0,
        failedRequests: 0,
        avgResponseTime: 0
      });
    });
    
    return this.getSortedSites();
  }
  
  getSortedSites() {
    return Array.from(this.sites.values())
      .sort((a, b) => {
        if (a.isHealthy !== b.isHealthy) {
          return b.isHealthy ? 1 : -1;
        }
        if (b.priority !== a.priority) {
          return b.priority - a.priority;
        }
        return a.responseTime - b.responseTime;
      });
  }
  
  async checkSiteHealth(site, timeout = 2000) {
    const siteKey = `${site.title}_${site.value}`;
    const now = Date.now();
    
    if (this.healthCache.has(siteKey)) {
      const cached = this.healthCache.get(siteKey);
      if (now - cached.timestamp < 300000) {
        return cached.isHealthy;
      }
    }
    
    // 健康檢查必須走 Widget.http：Forward 的腳本沙箱不保證提供全域 fetch，
    // 直接用 fetch 會拋錯並把所有站點誤判為不健康，導致搜尋前就被全數跳過。
    try {
      const startTime = Date.now();
      const response = await Widget.http.get(site.value, {
        headers: { 'User-Agent': API_USER_AGENT },
        timeout
      });
      
      const responseTime = Date.now() - startTime;
      const status = response?.status ?? response?.statusCode ?? 200;
      // 連不上（0 / 負數 / 5xx）才視為不健康；4xx 代表主機活著，僅該路徑有問題
      const isHealthy = status >= 200 && status < 500;
      
      const siteInfo = this.sites.get(siteKey);
      if (siteInfo) {
        siteInfo.isHealthy = isHealthy;
        siteInfo.lastCheck = now;
        siteInfo.responseTime = responseTime;
        
        if (!isHealthy) {
          siteInfo.priority = Math.max(0.1, siteInfo.priority * 0.7);
        } else {
          siteInfo.priority = Math.min(1, siteInfo.priority * 1.05);
        }
      }
      
      this.updateStats(siteKey, isHealthy, responseTime);
      
      this.healthCache.set(siteKey, {
        isHealthy,
        timestamp: now,
        responseTime
      });
      
      return isHealthy;
    } catch (error) {
      // 探測本身失敗（沙箱限制、暫時性網路問題）不等於站點失效。
      // 保守放行，讓後續真正的搜尋請求去驗證；在此直接判死會讓
      // 整批站點在搜尋前就被跳過，導致 0 結果。
      const siteInfo = this.sites.get(siteKey);
      if (siteInfo) {
        siteInfo.isHealthy = true;
        siteInfo.lastCheck = now;
      }
      
      this.updateStats(siteKey, true, 0);
      
      return true;
    }
  }
  
  updateStats(siteKey, success, responseTime) {
    const stats = this.stats.get(siteKey) || {
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      avgResponseTime: 0
    };
    
    stats.totalRequests++;
    if (success) {
      stats.successfulRequests++;
      stats.avgResponseTime = (stats.avgResponseTime * (stats.successfulRequests - 1) + responseTime) / stats.successfulRequests;
    } else {
      stats.failedRequests++;
    }
    
    this.stats.set(siteKey, stats);
  }
  
  getOptimalConcurrency() {
    const healthyCount = Array.from(this.sites.values())
      .filter(site => site.isHealthy).length;
    
    if (healthyCount <= 5) return CONFIG.MIN_CONCURRENT_REQUESTS;
    if (healthyCount <= 10) return 4;
    if (healthyCount <= 20) return 6;
    return CONFIG.MAX_CONCURRENT_REQUESTS;
  }
}

// ==================== 智能搜索执行模块 ====================
class SmartSearchExecutor {
  constructor(siteManager, targetInfo, type, matchStrictness, targetEpisode = null) {
    this.siteManager = siteManager;
    this.targetInfo = targetInfo;
    this.type = type;
    this.matchStrictness = matchStrictness;
    this.targetEpisode = targetEpisode;
    
    this.allResults = [];
    this.seenUrls = new Set();
    this.seenContent = new Map();
    this.foundCount = 0;
    this.isSearching = true;
    // 各站完成即累積，逾時中止時仍能交出已完成的部分結果。
    this.collected = [];
    // 各站在途請求：起始時間 + 該站可等待的預算（慢站預算較長）。
    this.inFlight = new Map();
    
    this.stats = {
      totalSites: 0,
      completedSites: 0,
      successfulSites: 0,
      failedSites: 0,
      skippedSites: 0
    };
  }
  
  async search(onResultCallback = null) {
    const sites = this.siteManager.getSortedSites();
    this.stats.totalSites = sites.length;

    console.log(`🔍 开始智能搜索: ${this.targetInfo.rawName}`);
    console.log(`📊 可用站点: ${sites.length}个`);

    const siteGroups = this.groupSitesByPriority(sites);
    let allResults = [];

    // 整批搜尋的時限。慢站若被無限等待，complete 事件會晚到前端等待上限之後，
    // 使用者只會看到「暫無可用資源」——即使其他站早已回傳結果。
    // 到點就帶著已完成的結果收尾。
    const deadline = Date.now() + CONFIG.SEARCH_DEADLINE;
    this.deadline = deadline;
    // 執行器會隨各站完成即回推結果，因此逾時時仍能取回已完成的部分，
    // 而不必因為等待整組而全部丟棄。
    const drain = () => this.smartDeduplicate(this.collected.slice());
    // 站數足夠就提前收尾。慢站仍在背景跑，但不再阻擋 complete。
    const enough = () => CONFIG.SUFFICIENT_SITE_COUNT > 0 &&
      new Set(this.collected.map(r => r.name)).size >= CONFIG.SUFFICIENT_SITE_COUNT;

    for (const group of siteGroups) {
      if (!this.isSearching) {
        console.log(`⏱️ 搜索被停止，跳过剩余站点`);
        break;
      }

      const remaining = deadline - Date.now();
      if (remaining <= 0) {
        console.log(`⏱️ 已达搜索时限(${CONFIG.SEARCH_DEADLINE}ms)，跳过剩余 ${group.length} 个站点`);
        this.stats.skippedSites += group.length;
        break;
      }

      const groupPromise = this.searchSiteGroup(group, onResultCallback);
      let groupResults;
      if (remaining < 1000) {
        groupResults = await groupPromise;
      } else {
        // 在時限內輪詢，三種情況可收尾：
        //  1. 站數已足夠 -> 立刻用已完成結果
        //  2. 剩下的在途請求都已超過單站時限且沒有新站加入 -> 不會再有結果
        //  3. 整體時限到 -> 強制收尾
        groupResults = await new Promise(resolve => {
          // 記錄「最後一次有站加入」的時間。有新站加入代表還有進展，
          // 就該繼續等；反之若一段時間都沒有新站加入，且在途站已用完自己的
          // 預算，剩下的站多半是卡住的，等下去不會有新結果。
          const start = Date.now();
          let maxStart = start;
          const noteProgress = () => {
            for (const v of this.inFlight.values()) {
              if (v.start > maxStart) maxStart = v.start;
            }
          };

          const tick = () => {
            if (enough()) return resolve(drain());
            if (Date.now() >= deadline) return resolve(null);

            const now = Date.now();
            noteProgress();
            const noNewSite = now - maxStart > 2000;
            const hopeless = [...this.inFlight.values()].every(v => now - v.start > v.budget);
            if (this.inFlight.size > 0 && noNewSite && hopeless) {
              return resolve(drain());
            }
            setTimeout(tick, 100);
          };
          groupPromise.then(r => resolve(r), () => resolve(null));
          tick();
        });
        if (groupResults === null) {
          console.log(`⏱️ 本组搜索超时，采用已完成的结果`);
          this.isSearching = false;
          groupResults = drain();
        }
      }
      allResults.push(...groupResults);

      allResults = this.smartDeduplicate(allResults);
    }

    return allResults;
  }
  
  groupSitesByPriority(sites) {
    const groups = {
      high: [],
      medium: [],
      low: []
    };
    
    sites.forEach(site => {
      if (!site.isHealthy) {
        this.stats.skippedSites++;
        return;
      }
      
      if (site.isMain || site.priority > 0.8) {
        groups.high.push(site);
      } else if (site.priority > 0.5) {
        groups.medium.push(site);
      } else {
        groups.low.push(site);
      }
    });
    
    return [groups.high, groups.medium, groups.low].filter(group => group.length > 0);
  }
  
  async searchSiteGroup(sites, onResultCallback) {
    const concurrency = this.siteManager.getOptimalConcurrency();
    console.log(`🎯 搜索组: ${sites.length}个站点, 并发: ${concurrency}`);
    
    const executing = new Set();
    const allGroupResults = [];
    
    for (let i = 0; i < sites.length; i++) {
      if (!this.isSearching) break;
      
      const site = sites[i];
      
      while (executing.size >= concurrency) {
        await Promise.race(Array.from(executing));
      }
      
      const searchPromise = this.searchSingleSite(site, onResultCallback)
        .then(results => {
          allGroupResults.push(...results);
          return results;
        })
        .finally(() => {
          executing.delete(searchPromise);
        });
      
      executing.add(searchPromise);
      
      if (site.responseTime < 1000 && executing.size >= concurrency) {
        await Promise.race(Array.from(executing));
      }
    }
    
    await Promise.allSettled(Array.from(executing));

    return allGroupResults;
  }

  async searchSingleSite(site, onResultCallback) {
    if (!this.isSearching) return [];

    const siteStartTime = Date.now();
    const siteKey = `${site.title}_${site.value}`;
    const perSite = CONFIG.SLOW_SITE_MATCH.some(m => site.value.includes(m))
      ? CONFIG.SLOW_SITE_TIMEOUT
      : CONFIG.REQUEST_TIMEOUT;
    this.inFlight.set(siteKey, {
      start: siteStartTime,
      // 逾時 + 重試退避；超過這個時間還沒回來就不可能再成功了。
      budget: perSite + CONFIG.RETRY_ATTEMPTS * 1500
    });
    
    try {
      const response = await this.fetchWithSmartRetry(site, this.targetInfo.searchQuery || this.targetInfo.baseName);
      
      if (!response?.list) {
        this.stats.completedSites++;
        this.stats.skippedSites++;
        return [];
      }
      
      const siteResults = [];
      const matchedItems = [];

      // 使用者未指定年份時，先掃一次候選，確認這部作品在站內是否
      // 同時存在「無年份」與「帶年份」兩個同名版本。
      //
      // 資源站標示後續季的方式不是寫序號或季度，而是直接加年份：實測
      // 「仁醫」第一季是「仁医」（無年份），第二季卻命名為「仁医2012」。
      // 兩者在搜尋結果中並列，只比對單一項目無法定性，必須與站內其他
      // 候選比較才知道帶年份的那個是後續季。
      //
      // 若站內只有帶年份的版本（例如只有「仁医2012」而沒有「仁医」），
      // 無法判斷是第幾季，一律放行 —— 寧可多給，不可誤殺正確來源。
      const yearMarked = this.type === 'movie' ? null
        : findYearMarkedSequels(response.list, this.targetInfo, this.matchStrictness);

      for (const item of response.list) {
        if (!item.vod_name) continue;

        const candidateInfo = extractEnhancedInfo(item.vod_name);
        const matchResult = isSmartSeriesMatch(this.targetInfo, candidateInfo, this.matchStrictness);

        if (matchResult.match && matchResult.confidence >= 0.6) {
          // 站內同名作品只有最早的那個是第一季／原版，其餘跳過。
          if (yearMarked && yearMarked.sequels.includes(candidateInfo.year ?? null)) {
            console.log(`📅 ${site.title}: 跳過後續作品「${item.vod_name}」(${candidateInfo.year || '無年份'})，原版年份 ${yearMarked.earliestYear || '無年份'}`);
            continue;
          }
          matchedItems.push({ item, matchResult });

          if (matchResult.confidence >= 0.9) {
            const resources = extractPlayInfoForCache(item, site.title, this.type, matchResult, this.targetInfo);
            siteResults.push(...this.processImmediateResults(resources, site, onResultCallback));
          }
        }
      }
      
      for (const { item, matchResult } of matchedItems) {
        if (matchResult.confidence < 0.9) {
          const resources = extractPlayInfoForCache(item, site.title, this.type, matchResult, this.targetInfo);
          siteResults.push(...this.processImmediateResults(resources, site, onResultCallback));
        }
      }
      
      this.stats.completedSites++;
      this.stats.successfulSites++;
      this.collected.push(...siteResults);

      const searchTime = Date.now() - siteStartTime;
      console.log(`✅ ${site.title}: 找到${siteResults.length}个结果 (${searchTime}ms)`);

      return siteResults;
      
    } catch (error) {
      this.stats.completedSites++;
      this.stats.failedSites++;
      console.warn(`❌ ${site.title}: 搜索失败 (${error.message})`);
      return [];
    } finally {
      this.inFlight.delete(siteKey);
    }
  }
  
  async fetchWithSmartRetry(site, keyword, maxRetries = CONFIG.RETRY_ATTEMPTS) {
    let lastError;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const params = {
          ac: "detail",
          wd: keyword,
          t: this.type === 'movie' ? 1 : (this.targetInfo.isVariety ? 4 : 2)
        };

        if (site.value.includes('ffzy') || site.value.includes('wolong')) {
          if (this.targetInfo.year) {
            params.y = this.targetInfo.year;
          }
        }

        // 已確認不吃 t 參數的站台，直接略過分類條件
        if (SITES_REJECTING_TYPE_PARAM.has(site.value)) {
          delete params.t;
        }

        const response = await httpGetApi(site.value, params);

        // 同 fetchWithSmartRetry：統一解析字串/巢狀回應
        const normalized = normalizeHttpResponse(response);

        if (normalized?.list && normalized.list.length > 0) {
          return normalized;
        }

        // 結果為空時改用不帶 t 的請求再試一次
        if (params.t !== undefined) {
          delete params.t;
          const retry = await httpGetApi(site.value, params);
          const fallback = normalizeHttpResponse(retry);
          if (fallback?.list && fallback.list.length > 0) {
            rememberRejectingTypeSite(site.value);
            return fallback;
          }
          return fallback;
        }

        return normalized;
      } catch (error) {
        lastError = error;

        if (attempt < maxRetries) {
          const baseDelay = 1000 * Math.pow(2, attempt);
          const jitter = Math.random() * 1000;
          const delay = baseDelay + jitter;

          // 重試必須仍趕得在整體時限內送出，否則這段退避只是讓使用者
          // 多空等 — 逾時的站再試一次通常也是逾時。
          const perSite = CONFIG.SLOW_SITE_MATCH.some(m => site.value.includes(m))
            ? CONFIG.SLOW_SITE_TIMEOUT
            : CONFIG.REQUEST_TIMEOUT;
          if (this.deadline && Date.now() + delay + perSite > this.deadline) {
            console.log(`⏱️ ${site.title} 剩餘時間不足重試，直接放棄`);
            break;
          }

          console.log(`⏱️ ${site.title} 请求失败，${delay}ms后重试 (${error.message})`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    throw lastError;
  }
  
  // 資源是否屬於目標版本。
  //
  // 這是即時推播的必經關卡。loadResource 裡的版本過濾發生在所有站都跑完之後，
  // 但 processImmediateResults 會在每個站一完成的當下就把結果推給使用者 ——
  // 電影天堂是最高優先站、也最快回應，韓版結果會第一時間出現在列表裡，
  // 使用者看到的永遠是錯的版本，之後再過濾也已經來不及。
  //
  // 判斷依據是站方的 vod_year，不是片名：實測搜「仁医」時檔名多為光溜溜的
  // 「仁医」，年份只存在於 vod_year 欄位，拿片名比會誤殺。
  // 候選沒有年份就放行 —— 無法判斷不等於是錯的版本。
  matchesTargetVersion(resource) {
    if (!this.targetInfo.year) return true;
    const candYear = resource._year;
    if (!candYear) return true;
    return String(candYear) === String(this.targetInfo.year);
  }

  processImmediateResults(resources, site, onResultCallback) {
    const newResults = [];

    // 指定集數時只推送該集，否則 UI 會先收到第1、2集的來源，
    // 使用者選第34集卻看到不相干的連結。逐站判斷，理由見 filterByEpisode。
    let candidates = (this.type === 'tv' && this.targetEpisode !== null)
      ? filterByEpisode(resources, this.targetEpisode)
      : resources;

    // 版本過濾必須在推播之前，否則使用者會先看到別的版本。
    if (this.targetInfo.year) {
      const before = candidates.length;
      candidates = candidates.filter(r => this.matchesTargetVersion(r));
      if (before !== candidates.length) {
        console.log(`🚫 ${site.title}: 版本不符(${this.targetInfo.year})，略過 ${before - candidates.length}笔`);
      }
    }

    for (const resource of candidates) {
      if (this.seenUrls.has(resource.url)) continue;
      
      this.seenUrls.add(resource.url);
      resource._searchTime = Date.now();
      resource._site = site.title;
      resource._priority = site.priority;
      
      if (!this.isContentDuplicate(resource)) {
        this.foundCount++;
        newResults.push(resource);
        
        if (onResultCallback) {
          const cleanResource = cleanResourceForOutput(resource);
          onResultCallback([cleanResource], {
            type: 'immediate_result',
            site: site.title,
            matchType: resource._matchType,
            confidence: resource._confidence || 0.7,
            foundCount: this.foundCount
          });
        }
      }
    }
    
    return newResults;
  }
  
  isContentDuplicate(resource) {
    if (!CONFIG.DEDUPLICATION.ENABLED) return false;
    
    // 精確比對，不用字串相似度：集數與播放源已經是鍵的一部分，用模糊比對會讓
    // 相鄰集數誤判為同一筆，見 generateContentKey 的說明。
    const contentKey = this.generateContentKey(resource);
    
    for (const [existingKey, existingResource] of this.seenContent.entries()) {
      if (existingKey === contentKey) {
        const existingScore = calculateResourceScore(existingResource);
        const newScore = calculateResourceScore(resource);
        
        if (newScore > existingScore) {
          this.seenContent.delete(existingKey);
          this.seenContent.set(contentKey, resource);
          return false;
        }
        return true;
      }
    }
    
    this.seenContent.set(contentKey, resource);
    return false;
  }
  
  /**
   * 去重鍵必須含站名：不同站的同一集是不同的來源，使用者要的是多個可選來源，
   * 跨站合併會讓每集只剩一個源。
   *
   * 年份同樣是硬性獨立維度，否則同名不同年份的作品會互相吃掉。
   * 實測愛蛋站搜「仁医」回傳 22 集 × 2 個版本（日版仁医與韓版仁医2012，
   * 播放源分別是 wjm3u8 與 jinyingm3u8）。兩者片名都顯示成「仁醫」、
   * 集數相同，站名相同，若鍵不含年份就只有先到的那筆留下 ——
   * 韓版排在前面時，日版 22 筆會被整批刪掉，使用者根本看不到正確版本。
   *
   * 集數與播放源都必須是硬性獨立維度，不能靠字串相似度去猜：
   * calculateStringSimilarity 是字元 Jaccard 集合比對，「第1集」與「第3集」的
   * 字元集幾乎完全相同（相似度 >0.95），會讓同一站同一源的相鄰集數被當成重複，
   * 使用者點第3集時整集的來源都已被去重吃掉。
   */
  generateContentKey(resource) {
    // 版本維度優先用年份，但年份抽不到時必須退回站方原始片名，
    // 不能一律當成同一個。
    //
    // 實測愛蛋站搜「仁医」回傳兩個版本（日版與韓版），片名在該站都顯示成
    // 「仁医」而 vod_year 欄位不存在，於是兩者的 _year 都是 null。若缺年份就
    // 統一填 'x'，兩者會撞成同一個鍵，只留分數較高的韓版 —— 日版 22 筆被
    // 整批吃掉，使用者看到的永遠是錯的版本。
    // 同一個站不可能有兩個同名同集數的片子，原始片名可以安全地區分。
    const versionKey = resource._year || resource._rawName || 'x';
    return [
      resource.name,
      versionKey,
      episodeKeyOf(resource),
      playSourceKeyOf(resource)
    ].join('|');
  }
  
  shouldStopSearch() {
    if (this.foundCount >= CONFIG.STREAMING.MIN_RESULTS_FOR_STOP) {
      const highQualityCount = this.allResults.filter(r => 
        r._matchType === 'exact' || r._matchType === 'fuzzy'
      ).length;
      
      if (highQualityCount >= 15) {
        console.log(`🎯 已找到${highQualityCount}个高质量结果，可提前结束`);
        return true;
      }
    }
    
    const completionRate = this.stats.completedSites / this.stats.totalSites;
    if (completionRate >= 0.8 && this.foundCount >= 20) {
      return true;
    }
    
    return false;
  }
  
  smartDeduplicate(results) {
    if (!CONFIG.DEDUPLICATION.ENABLED || results.length < 2) {
      return results;
    }
    
    const uniqueResults = [];
    const urlMap = new Map();
    const contentMap = new Map();
    
    results.sort((a, b) => calculateResourceScore(b) - calculateResourceScore(a));
    
    for (const resource of results) {
      const url = resource.url;
      
      if (urlMap.has(url)) {
        const existing = urlMap.get(url);
        if (calculateResourceScore(resource) > calculateResourceScore(existing)) {
          const index = uniqueResults.indexOf(existing);
          if (index > -1) {
            uniqueResults.splice(index, 1);
          }
          urlMap.set(url, resource);
          uniqueResults.push(resource);
        }
        continue;
      }
      
      const contentKey = this.generateContentKey(resource);
      let isDuplicate = false;
      
      for (const [existingKey, existingResource] of contentMap.entries()) {
        // 精確比對，不用字串相似度，理由同 generateContentKey。
        if (existingKey === contentKey) {
          isDuplicate = true;
          
          if (calculateResourceScore(resource) > calculateResourceScore(existingResource)) {
            const index = uniqueResults.indexOf(existingResource);
            if (index > -1) {
              uniqueResults.splice(index, 1);
            }
            contentMap.delete(existingKey);
            break;
          }
        }
      }
      
      if (!isDuplicate) {
        urlMap.set(url, resource);
        contentMap.set(contentKey, resource);
        uniqueResults.push(resource);
      }
    }
    
    return uniqueResults;
  }
  
  stop() {
    this.isSearching = false;
  }
}

// ==================== 主函数模块 ====================
function cleanResourceForOutput(resource) {
  const clean = { ...resource };

  // 把 _ep / _seasonFromItem 提升為頂層 episode / season。
  //
  // 為什麼：REX 客戶端的詳細頁 UI 會以 result.episode / result.season 為索引
  // 過濾「當前集」的播放源。若物件不帶頂層 episode 數字，filter 結果為空陣列
  // —— 使用者看到的播放源列表就變成空。season 同理：切換季別時客戶端會用
  // result.season 判斷這條屬於哪一季，沒帶頂層欄位的話客戶端會誤判。
  //
  // 升級前 _ep / _seasonFromItem 已被 fieldsToDelete 清掉，client 端永遠
  // 看不到。升級後兩個欄位都保留且不污染其它排序邏輯（_finalScore 計算只看
  // resolution / isHD 等品質欄位）。
  if (resource._ep != null && clean.episode == null) {
    clean.episode = resource._ep;
  }
  if (resource._seasonFromItem != null && clean.season == null) {
    clean.season = resource._seasonFromItem;
  }

  const fieldsToDelete = [
    '_finalScore', '_matchType', '_matchScore', '_seasonMatch',
    '_isMainSource', '_hasEpInfo', '_updateRecency', '_ep',
    '_isVariety', '_episodeDate', '_searchTime', '_site', '_priority',
    '_confidence', '_versionConflict', '_versionAmbiguous', '_areaMismatch', '_areaMatch', '_year', '_area', '_rawName',
    '_s4FallbackBoost', '_seasonFromItem'
  ];
  
  // 版本資訊必須在欄位刪除前寫進描述。
  //
  // _year / _area 隨後就會被刪掉，Forward 拿不到；但同名不同年份的作品
  // （日版「仁医」與韓版「仁医2012」）在使用者沒有指定年份時根本無法分辨，
  // 站方檔名又常把年份省略。把版本直接寫進描述，使用者一眼就能分辨要哪一版。
  //
  // 年份來源採三層 fallback，因為實機 iOS/Android 上 vod_year / vod_area
  // 偶爾會因站台回傳格式差異而取不到（不同於 Node.js 的解析行為）：
  //   1. _year / _area（站方欄位最權威）
  //   2. extractVersionMarker(_rawName)（從站方檔名裡抓年份）
  //      ——「仁医2012」這類就算 _year 為 null 也能抓到
  //   3. 都拿不到就跳過，描述不被灌水
  const itemYear = resource._year || extractVersionMarker(resource._rawName) || null;
  const itemArea = resource._area || null;
  if (itemYear || itemArea) {
    const parts = [];
    if (itemYear) parts.push(`${itemYear}年`);
    const label = areaLabel(itemArea);
    if (label) parts.push(label);
    const versionTag = `[${parts.join(' - ')}]`;
    if (versionTag && !clean.description.includes(versionTag)) {
      clean.description = `${clean.description} ${versionTag}`;
    }
  }

  // m3u8 過濾 wrap。customHeaders 保留在物件上(REX 客戶端會用),過濾廣告伺服器端
  // 收到 m3u8 子請求時自動從 Referer 解析或回退到 customHeaders(伺服器端邏輯,
  // 見 m3u8-ad-filter-worker.js)。
  if (isM3U8Url(clean.url)) {
    clean.url = wrapM3U8WithFilter(clean.url);
  }

  fieldsToDelete.forEach(field => {
    if (field in clean) delete clean[field];
  });
  
  if (!clean.resolution) {
    clean.resolution = '未知';
    clean.resolutionLevel = 0;
    clean.isHD = false;
    clean.is4K = false;
    clean.qualityTags = [];
    clean.qualityScore = 0;
    clean.isHttps = clean.url.startsWith('https');
  }
  
  if (clean.resolutionLevel >= 5) {
    clean.recommended = '4K超清';
  } else if (clean.resolutionLevel >= 4 && clean.qualityScore > 20) {
    clean.recommended = '藍光高清';
  } else if (clean.resolutionLevel >= 3) {
    clean.recommended = '高清';
  } else if (clean.qualityScore > 15) {
    clean.recommended = '高品質';
  }

  return clean;
}

// 把 m3u8 URL 包成過濾廣告伺服器 URL。Player 拉到 m3u8 後,所有 .ts 子請求都會
// 經過濾廣告伺服器代理,由伺服器端的 m3u8-ad-filter-worker.js 依 CONFIG.M3U8_FILTER
// 設定的 pattern 去除廣告 segment。
//
// 守護設計：
//  - ENABLED 為 false → 透傳
//  - 非 m3u8 (mp4/flv/...) → 透傳
//  - 過濾廣告伺服器 URL 沒配 → 透傳(避免被 wrap 成相對路徑把播放搞壞)
//  - URL 解析失敗 → 透傳(避免 IllegalArgumentException)
//  - 已經是過濾廣告伺服器 URL → 原樣返回(冪等)
//
// 冪等是必要的：搜尋結果會被寫進 cache(CACHE_TTL 30 分鐘),cache 命中時
// 物件裡的 url 已經是 wrap 過的。若不判重,每次命中都會再包一層：
//   /filter?url=http.../filter%3Furl%3Dhttp...   ← 壞掉
// 使用者症狀是「改設定後過濾時好時壞」,而且 30 分鐘後才會自己恢復。
// 環境兼容：REX runtime（vm 沙箱）沒有 URL 全域物件。
// 用 typeof 偵測，存在就走原生 URL（語意乾淨），不存在就走字串 fallback。
//
// 為什麼這層偵測是關鍵：原版用 `new URL()` 在 vm 沙箱會拋 ReferenceError，
// 被 try/catch 吃掉後靜默 return 裸 CDN —— 「設定改了但播放沒走過濾」幾個月
// 都找不出原因，就是這條 try/catch 把整個 wrap 失敗吞掉了。
const HAS_URL = (typeof URL !== 'undefined');

function isAlreadyWrapped(url) {
  if (!url || typeof url !== 'string') return false;
  if (HAS_URL) {
    try {
      const u = new URL(url);
      const base = (CONFIG.M3U8_FILTER.WORKER_URL || '').replace(/\/+$/, '');
      if (!base) return false;
      let bu;
      try { bu = new URL(base); } catch (e) { return false; }
      // 同源 + 同 endpoint 才算已包裝，避免誤判其他站點的 /filter
      if (u.origin !== bu.origin) return false;
      const ep = (CONFIG.M3U8_FILTER.ENDPOINT || '').replace(/\/+$/, '');
      if (ep && u.pathname !== bu.pathname.replace(/\/+$/, '') + ep) return false;
      return !!u.searchParams.get('url');
    } catch (e) {
      return false;
    }
  }
  // Fallback（REX runtime / vm 沙箱沒有 URL 全域）：
  // 用正則拆 url 與 base，比對 origin 與 path + endpoint，並確認 query 內有 url= 參數。
  try {
    const base = (CONFIG.M3U8_FILTER.WORKER_URL || '').replace(/\/+$/, '');
    if (!base) return false;
    const ep = (CONFIG.M3U8_FILTER.ENDPOINT || '').replace(/^\/+|\/+$/g, '');
    const bm = base.match(/^([a-zA-Z][a-zA-Z0-9+.\-]*:\/\/[^\/]+)(\/.*)?$/);
    if (!bm) return false;
    const baseOrigin = bm[1];
    const basePath = (bm[2] || '').replace(/\/+$/, '');
    const um = url.match(/^([a-zA-Z][a-zA-Z0-9+.\-]*:\/\/[^\/]+)(\/[^?#]*)?(\?[^#]*)?(#.*)?$/);
    if (!um || um[1] !== baseOrigin) return false;
    const urlPath = (um[2] || '').replace(/\/+$/, '');
    const expectedPath = basePath + (ep ? '/' + ep.replace(/^\/+/, '') : '');
    if (urlPath !== expectedPath.replace(/\/+$/, '')) return false;
    return /(?:^|&)url=/.test(um[3] || '');
  } catch (e) {
    return false;
  }
}

function wrapM3U8WithFilter(url, hint) {
  if (!CONFIG.M3U8_FILTER?.ENABLED) return url;
  if (!url) return url;
  if (typeof url !== 'string') return url;
  // 已被包裝過 → 不再包第二層
  if (isAlreadyWrapped(url)) return url;
  if (!isM3U8Url(url)) return url;
  const base = (CONFIG.M3U8_FILTER.WORKER_URL || '').replace(/\/+$/, '');
  if (!base) return url;
  const ep = (CONFIG.M3U8_FILTER.ENDPOINT || '').replace(/^\/+/, '');
  const mode = CONFIG.M3U8_FILTER.MODE || 'filter';
  // ts 走向：給過濾廣告伺服器的 ?rewrite= 查詢。
  //
  // 為什麼要從 CONFIG.M3U8_FILTER.TS_MODE 讀：TS_MODE 已在 loadResource 內
  // 三層 fallback 完畢（params > globalParams > 'hybrid' 預設值），
  // wrap 函式不該再各自 fallback 一份邏輯,直接讀 CONFIG。
  //
  // 為什麼不是每個 wrap 都加 rewrite= query：過濾廣告伺服器端 ?rewrite= 沒帶時
  // 會 fallback 到環境變數 URI_REWRITE_MODE。如果使用者環境變數設了
  // 'proxy' 但 widget 預設 'hybrid',這裡就必須明確傳 'hybrid' 才能
  // 覆寫 —— 沒帶 = 伺服器用環境變數值 = 跟 widget UI 顯示的不一致。
  // 永遠明確傳值,UI 跟實際行為才會綁定。
  const tsMode = CONFIG.M3U8_FILTER.TS_MODE || 'hybrid';

  let finalUrl;
  if (HAS_URL) {
    // 原生路徑（瀏覽器 / Node.js）—— 語意乾淨、走 URL.searchParams。
    let inner;
    try { inner = new URL(url).toString(); } catch (e) { return url; }
    let u;
    try { u = new URL(base + '/' + ep); } catch (e) { return url; }
    u.searchParams.set('mode', mode);
    u.searchParams.set('rewrite', tsMode);
    u.searchParams.set('url', inner);
    if (hint && typeof hint === 'object') {
      if (hint.site) u.searchParams.set('site', String(hint.site));
      if (hint.name) u.searchParams.set('name', String(hint.name));
      if (hint.episode) u.searchParams.set('episode', String(hint.episode));
    }
    finalUrl = u.toString();
  } else {
    // Fallback 路徑（REX runtime / vm 沙箱沒有 URL 全域）：
    // 純字串拼接 + encodeURIComponent。
    // 為什麼不再 try/catch 整段拼接：純字串處理不可能 throw，唯一風險是
    // base 沒 scheme；`base` 已在入口驗證為非空字串，isAlreadyWrapped 的
    // fallback 正則也保證 base 符合 scheme://host 格式。
    const parts = [];
    parts.push('mode=' + encodeURIComponent(mode));
    parts.push('rewrite=' + encodeURIComponent(tsMode));
    parts.push('url=' + encodeURIComponent(url));
    if (hint && typeof hint === 'object') {
      if (hint.site) parts.push('site=' + encodeURIComponent(String(hint.site)));
      if (hint.name) parts.push('name=' + encodeURIComponent(String(hint.name)));
      if (hint.episode) parts.push('episode=' + encodeURIComponent(String(hint.episode)));
    }
    finalUrl = base + '/' + ep + '?' + parts.join('&');
  }

  // 診斷：wrap 真的執行了才印。這是「播放有沒有走過濾」的第一手證據。
  try {
    console.log(`🔗 wrap m3u8 (HAS_URL=${HAS_URL}, mode=${mode}, rewrite=${tsMode}) -> ${(finalUrl || '').slice(0, 120)}`);
  } catch {}
  return finalUrl;
}

async function loadResource(params, onStreamResult = null) {
  // REX 規範的 params.link 是 search:<title>?season=N&episode=M 格式。
  // 解析後把 metadata 套到 season / episode / type 欄位，這樣 cache key
  // 與後續搜尋邏輯都會以正確的季別運作 —— REX 切到第二季時重新呼叫
  // loadResource，cache key (vod_smart_..._s${season}_...) 跟著變動，
  // 不會再讀回第一季的結果。
  //
  // 優先順序：呼叫端已明確指定的 season/episode > link 解析出的。
  // 原因：loadDetail 內部呼叫 loadResource 時，link 跟 season 都是同步
  // 設定的；link 解析出來的只是備援。REX 直接呼叫 loadResource 時，
  // 季別多半是從 link 拿（因為 REX 呼叫 loadResource 不一定會帶 season）。
  if (params?.link && typeof params.link === 'string' && params.link.startsWith(DETAIL_LINK_PREFIX)) {
    const meta = parseDetailLink(params.link);
    if (meta) {
      if (params.season == null && meta.season != null) params.season = meta.season;
      if (params.episode == null && meta.episode != null) params.episode = meta.episode;
      if ((params.type == null || params.type === 'tv') && meta.type === 'movie') params.type = meta.type;
      if (!params.id && meta.id) params.id = meta.id;
    }
  }

  const {
    type = 'tv',
    season,
    episode,
    multiSource,
    VodData,
    matchStrictness = 'standard',
    preferResolution = 'auto',
    searchMode = 'batch',
    m3u8FilterEnabled = 'enabled',
    m3u8FilterWorkerUrl,
    m3u8FilterMode = 'filter',
    m3u8FilterAdminUser,
    m3u8FilterAdminPass
  } = params;

  // Forward 傳入片名的欄位名並非只有一種：詳細頁通常給 seriesName，
  // 但由相關作品卡片切換進場時可能走別的欄位。任何一個欄位帶著
  // 與上次不同的片名就代表使用者換片，必須優先採用。
  // 全部取不到時直接放棄 —— 拿舊片名續搜只會得到舊片的來源。
  const seriesName =
    params.seriesName ||
    params.episodeName ||
    params.title ||
    params.name ||
    params.movieName ||
    '';

  if (multiSource !== "enabled" || !seriesName) {
    return [];
  }

  // 同步使用者設定到 CONFIG.M3U8_FILTER。
  //
  // cleanResourceForOutput 是純函式(沒接 params),但 m3u8 wrap 需要讀 user 設定。
  // 解法:把 globalParams 寫進 CONFIG.M3U8_FILTER(模組級單一來源),
  // cleanResourceForOutput 內直接讀。為何不在每次 wrap 即時讀 params:
  // helper 同時被 loadResource 與 loadDetail 兩條路徑呼叫,參數簽名會不一致。
  // 寫 CONFIG 一次,helper 就不必管來源。
  //
  // 優先級：params 顯式傳入 > globalParams 設定項 > 模組預設值。
  //
  // 為什麼一定要 fallback 到 globalParams：REX 客戶端在詳細頁切換集數時會
  // 直接呼叫 loadResource(params)，params 裡只有 link / seriesName 等，
  // 沒有 m3u8FilterWorkerUrl。原本的寫法 `m3u8FilterEnabled = 'enabled'`
  // 在解構時就給了 default，掩盖了「參數根本沒來」這件事；
  // 一旦使用者把設定改成 disabled 再呼叫，就會意外開啟過濾。
  // 反過來 m3u8FilterWorkerUrl 沒 default，undefined 時 if 不成立，
  // CONFIG 會停在「上一次有人寫進去的值」—— 可能是上一輪的雲端網址，
  // 這正是「設定改了卻沒生效、看播放紀錄沒東西」的原因。
  const gpValue = (name, fallback) => {
    try {
      const hit = (WidgetMetadata.globalParams || []).find(p => p.name === name);
      const v = hit && hit.value != null ? String(hit.value).trim() : '';
      return v || fallback;
    } catch (e) {
      return fallback;
    }
  };

  // ENABLED 預設 'enabled'：使用者沒設定時維持過濾開啟（原本行為），
  // 但 explicit 的 'disabled' 一定會被尊重。
  const enabledParam = (m3u8FilterEnabled != null && m3u8FilterEnabled !== '')
    ? m3u8FilterEnabled
    : gpValue('m3u8FilterEnabled', 'enabled');
  CONFIG.M3U8_FILTER.ENABLED = (enabledParam === 'enabled');

  // WORKER_URL 三層 fallback。
  const workerParam = (typeof m3u8FilterWorkerUrl === 'string' && m3u8FilterWorkerUrl.trim())
    ? m3u8FilterWorkerUrl.trim()
    : gpValue('m3u8FilterWorkerUrl', '');
  if (workerParam) {
    CONFIG.M3U8_FILTER.WORKER_URL = workerParam;
  } else if (!CONFIG.M3U8_FILTER.WORKER_URL) {
    // 連 globalParams 都空 → 退回模組預設，避免 wrap 出相對路徑
    CONFIG.M3U8_FILTER.WORKER_URL = DEFAULT_WORKER_URL;
  }

  // m3u8 過濾模式 (filter / passthrough)。
  // UI 已隱藏（永遠 'filter'），但 params 仍可覆寫（debug 用）：
  //   對單一 widget 設定：loadResource({ m3u8FilterMode: 'passthrough', ... })
  //   對全域設定：globalParams.m3u8FilterMode = 'passthrough'
  const modeParam = (m3u8FilterMode === 'passthrough' || m3u8FilterMode === 'filter')
    ? m3u8FilterMode
    : gpValue('m3u8FilterMode', 'filter');
  if (modeParam === 'passthrough' || modeParam === 'filter') {
    CONFIG.M3U8_FILTER.MODE = modeParam;
  }

  // Admin 帳密(用於 /admin/login 拿 session cookie)。
  // 三層 fallback：params 顯式傳入 > globalParams 設定 > 模組預設空。
  // 留空 = 不啟用 admin 功能(只能唯讀 /patterns)。
  const userParam = (typeof m3u8FilterAdminUser === 'string' && m3u8FilterAdminUser.trim())
    ? m3u8FilterAdminUser.trim()
    : gpValue('m3u8FilterAdminUser', '');
  const passParam = (typeof m3u8FilterAdminPass === 'string')
    ? m3u8FilterAdminPass
    : gpValue('m3u8FilterAdminPass', '');
  if (userParam) CONFIG.M3U8_FILTER.ADMIN_USER = userParam;
  if (passParam) CONFIG.M3U8_FILTER.ADMIN_PASS = passParam;

  // ts 走向：對應過濾廣告伺服器端 ?rewrite= 參數。
  //
  // 優先級同 mode：params 顯式傳入 > globalParams 設定 > 模組預設 'hybrid'。
  //
  // 為什麼不像 mode 那樣嚴格驗證 enum：m3u8FilterTsMode 預設是 'hybrid'，
  // 三選一都是合法值；如果未來伺服器加新模式（例如 'segmented'），
  // 寬鬆驗證可以讓 widget 跟伺服器各自演進、不會因為 enum 沒對齊而
  // 整個設定被丟掉。伺服器端同樣寬鬆驗證。
  const tsModeParam = (typeof m3u8FilterTsMode === 'string' && m3u8FilterTsMode.trim())
    ? m3u8FilterTsMode.trim()
    : gpValue('m3u8FilterTsMode', 'hybrid');
  // 寬鬆驗證：只接受 proxy / hybrid / absolute，其他退回 hybrid。
  if (tsModeParam === 'proxy' || tsModeParam === 'hybrid' || tsModeParam === 'absolute') {
    CONFIG.M3U8_FILTER.TS_MODE = tsModeParam;
  } else {
    CONFIG.M3U8_FILTER.TS_MODE = 'hybrid';
  }

  // 同步使用者設定到 CONFIG.TMDB（TMDB 跨地區別名查詢）。
  //
  // 與 m3u8 filter 一樣：三層 fallback，param 顯式 > globalParams > 預設。
  // 為什麼在這裡做：extractEnhancedInfo() 之後 / 建搜尋字串 之前才有意義
  // （只對真正的 target 開 alias 查詢，避免對 cache 鍵誤查）。
  //
  // 參數拆解：因 params 是同一個解構式，這裡另外拉一次避免破壞既有簽名。
  const tmdbEnabledParam = (typeof params.tmdbAliasEnabled === 'string')
    ? params.tmdbAliasEnabled
    : gpValue('tmdbAliasEnabled', 'enabled');
  CONFIG.TMDB.ENABLED = (tmdbEnabledParam === 'enabled');

  const tmdbKeyParam = (typeof params.tmdbApiKey === 'string' && params.tmdbApiKey.trim())
    ? params.tmdbApiKey.trim()
    : gpValue('tmdbApiKey', '');
  if (tmdbKeyParam) {
    CONFIG.TMDB.API_KEY = tmdbKeyParam;
  }

  // 診斷：把三層 fallback 的實際結果全部印出來。
  //
  // 為什麼需要：症狀是「改了設定但播放沒走過濾伺服器」，可能原因有四種
  // （設定沒存進 globalParams / loadResource 沒帶 params / CONFIG 被舊值
  // 殘留 / wrap 根本沒被呼叫），而這四種從外部症狀長得一樣，光看播放結果
  // 分不出來。印出 source 才知道該修哪一層。
  try {
    const allGp = (WidgetMetadata && WidgetMetadata.globalParams) || [];
    console.log('🔧 m3u8 filter 設定:', JSON.stringify({
      enabled: CONFIG.M3U8_FILTER.ENABLED,
      workerUrl: CONFIG.M3U8_FILTER.WORKER_URL,
      mode: CONFIG.M3U8_FILTER.MODE,
      endpoint: CONFIG.M3U8_FILTER.ENDPOINT,
      tsMode: CONFIG.M3U8_FILTER.TS_MODE,
      adminUser: CONFIG.M3U8_FILTER.ADMIN_USER || '(空)',
      adminPassSet: !!CONFIG.M3U8_FILTER.ADMIN_PASS,  // 不印明碼,只印有沒有設
      // params 層有沒有值（沒值 = 走 globalParams）
      fromParams: !!m3u8FilterWorkerUrl,
      // globalParams 層的原始值（'' 代表 Forward 沒存到設定）
      gpWorkerUrl: gpValue('m3u8FilterWorkerUrl', '(空)'),
      gpEnabled: gpValue('m3u8FilterEnabled', '(空)'),
      gpTsMode: gpValue('m3u8FilterTsMode', '(空)'),
      gpCount: allGp.length,
      gpNames: allGp.map(p => p.name).join(','),
    }));
  } catch (e) {
    console.log('🔧 m3u8 filter 設定診斷失敗:', e && e.message);
  }

  // widget 版本升級時清掉舊 cache。
  //
  // 為什麼必須做：cache schema 改了（例如本版加了 _rawName 欄位、加了
  // 版本標籤、改了去重鍵）之後，舊 cache 讀回來的物件結構與新邏輯推論
  // 出來的版本標籤會衝突 —— 使用者看到的會是「仁醫2012 [2009 · 日本]」
  // 這種不可能存在的組合。
  //
  // 為什麼不靠 ttl 自動過期：實機 cache 可能跨工作階段保留數日，
  // 與 TTL 計算錯誤也會殘留。
  //
  // 實作：把當前版本寫進 storage，第一次載入會對齊；版本不同就清掉全部 cache。
  await syncWidgetVersion();

  // 確保「拒絕 type 參數」的站台清單從 storage 載入完再開始搜尋，
  // 否則 SITES_REJECTING_TYPE_PARAM 在第一次呼叫時是空的，
  // 要等到該站搜失敗才知道它不收 type，白白浪費一次請求。
  await loadRejectingTypeSites();

  // 記錄 Forward 實際帶進來的片名相關欄位。
  // 詳細頁切換作品時，Forward 不一定會更新所有欄位，需要實際觀察才知道
  // 哪些欄位跟著換、哪些停留在舊片 —— 這是判斷「播放源沒刷新」的依據。
  const identity = {
    seriesName,
    season: season ?? '',
    episode: episode ?? '',
    premiereDate: params.premiereDate ?? '',
    airDate: params.airDate ?? '',
    episodeName: params.episodeName ?? '',
    link: params.link ?? '',
    id: params.id ?? params.tmdbId ?? params.imdbId ?? ''
  };
  console.log('🔎 詳細頁傳入:', JSON.stringify(identity));

  // 印出 widget 版本與 _expectedSequel，方便確認實機跑的是哪一版。
  // 若你重匯入後沒看到這行 log，表示 Forward App 還在用舊 snapshot。
  console.log(`📦 Widget version: ${WidgetMetadata.version} (期望 ${CONFIG.WIDGET_VERSION})`);
  console.log(`🆔 FILTER_BUILD: filterBySequel+v1+s4-forced-batch.${(new Date()).toISOString().slice(0,10)}`);

  console.log(`🚀 启动智能搜索: ${seriesName}`);
  console.log(`⚙️ 模式: ${searchMode}, 严格度: ${matchStrictness}`);
  
  const startTime = Date.now();
  
  const resourceSites = parseResourceSites(VodData);
  if (resourceSites.length === 0) {
    onStreamResult && onStreamResult([], { type: 'error', message: '無可用資源站' });
    return [];
  }
  
  const targetInfo = extractEnhancedInfo(seriesName);
  let targetSeason = season ? parseInt(season) : targetInfo.seasonNumber;
  const targetEpisode = episode ? parseInt(episode) : null;

  // 修正「仁医 / season=第二季」情境。
  //
  // 實機日誌：seriesName=仁医 + season=第二季 + airDate 空 → 推播 100 筆全
  // 是「仁醫2012」韓版，完全找不到愛蛋站實際有的「仁医2」（仁醫第二季）。
  // 根本原因有兩個：
  //   1. parseInt('第二季') = NaN，targetSeason 變成 NaN。
  //   2. 就算 targetSeason 是 2，extractSequelNumber('仁医') = null，
  //      extractSequelNumber('仁医2') = 2，target 與 candidate 的序號一個
  //      是 null 一個是 2 → sequelShapeMismatch → sequelConflict → 匹配失敗，
  //      「仁医2」整個被拒絕。
  //
  // 正確解讀：season 參數帶著「第二季」這個語意時，候選檔名帶序號 2
  // （「仁医2」）才是正確答案，不該因序號不對稱而被當成不同作品。
  //
  // 補救：當 season 參數存在但 parseInt 失敗（中文 / 「S2」之類）時，
  // 嘗試從 season 字串抽數字；若 targetSeason 是有效數字且 > 1，把它視為
  // 「明確要第 N 季」，讓 sequel 序號比對通過。
  if (Number.isNaN(targetSeason) && typeof season === 'string') {
    const m = season.match(/\d+|[一二三四五六七八九十零]+/);
    targetSeason = m ? (parseInt(m[0], 10) || parseChineseNumeral(m[0]) || NaN) : NaN;
  }
  if (Number.isFinite(targetSeason) && targetSeason > 1) {
    targetInfo._expectedSequel = targetSeason;
  }

  targetInfo.seasonNumber = targetSeason;

  // 詳細頁已選定具體版本時，Forward 有時會帶入首播年份（premiereDate / airDate）。
  //
  // 實測 Forward 並非每次都傳：多數情況下這兩個欄位是空字串，
  // 版本資訊只體現在 seriesName 上（「仁醫 2009」）。
  // 因此年份的第一來源必須是片名，這裡只作為覆寫。
  applyDetailVersion(params, targetInfo);
  targetInfo.searchQuery = buildSearchQuery(targetInfo.searchQuery, targetInfo, targetSeason);

  // TMDB 跨地區別名擴充。
  //
  // 為什麼這裡呼叫：loadResource / performSmartSearch / performBatchSearch 三
  // 條路徑都需要，因為 SmartSearchExecutor 內部讀的就是 this.targetInfo.searchQuery。
//
  // 為什麼不會拖慢 hot path：tryExpandWithTMDBAliases 內部最長只等 1.5s
  // 且有 cache 命中短路；cache hit 時（同一片名第二次、或已預熱）立即
  // 回傳；只有在「這部片第一次被搜時」才會同步等 TMDB（單次成本），
  // 之後所有搜尋（同基名）都會 in-memory 命中。
  //
  // 安全保證：對 type === 'variety' 跟沒開 TMDB 的情況一律放行；
  // try/catch 確保 TMDB 任何意外錯誤都不會中斷搜尋主流程。
  try {
    await tryExpandWithTMDBAliases(targetInfo, type);
    console.log(`[TMDB-diag] tryExpand returned, _aliasSearchQuery="${targetInfo._aliasSearchQuery || '(空)'}", searchQuery="${targetInfo.searchQuery}"`);
  } catch (e) {
    console.log(`[TMDB-diag] tryExpand THREW: ${e?.message || e}`);
    if (CONFIG.TMDB?.VERBOSE) console.warn('[TMDB] expand 失敗,繼續原 query:', e?.message || e);
  }
  if (targetInfo._aliasSearchQuery) {
    const aliasQ = String(targetInfo._aliasSearchQuery)
      .replace(/(?:19|20)\d{2}\s*$/, '')
      .replace(/\s+$/, '')
      .trim();
    if (aliasQ) {
      console.log(`🌐 [TMDB] 已採用對岸/別名 query: "${aliasQ}"（原本 "${targetInfo.searchQuery}"）`);
      targetInfo.searchQuery = aliasQ;
  }
  }

  // 快取鍵使用正規化名稱，繁簡輸入才會命中同一份快取。
  // episode 必須納入：不同集數的請求不可共用同一份快取，否則先播第1集
  // 存下的結果會被第34集的請求命中，回傳錯誤集數的來源。
  // 另需帶上續集序號：清理片名時年份與序號都會被移除，
  // 「追龙2017」與「追龙2」清理後都是「追龙」，共用同一鍵會讓後者
  // 讀到前者的來源 —— 使用者點開同系列的另一部電影時看到舊片。
  const sequelTag = extractSequelNumber(targetInfo.rawName);
  // 年份也要納入：clean 後「仁醫2009」與「仁醫2012」都變成「仁醫」，
  // 共用同一鍵會讓指定韓版的請求讀到日版的來源，指定年份形同失效。
  // targetInfo.year 優先：詳細頁指定的版本（premiereDate）已寫入該欄位，
  // 片名只有在使用者自己輸入年份時才是權威來源。
  const versionTag = targetInfo.year ?? extractVersionMarker(targetInfo.rawName) ?? 'x';
  const areaTag = targetInfo.region ?? 'x';
  const cacheKey = `vod_smart_${normalizeTitleForMatch(targetInfo.baseName)}_sq${sequelTag ?? 'x'}_y${versionTag}_a${areaTag}_s${targetSeason}_${type}_${matchStrictness}_e${targetEpisode || 'all'}`;
  let cachedResults = [];
  
  if (CONFIG.CACHE_TTL > 0) {
    try {
      const raw = await Widget.storage?.get?.(cacheKey);
      cachedResults = parseCacheValue(raw);
      if (cachedResults.length > 0) {
        // 快取是整部劇的結果，指定集數時仍需過濾，否則會把其他集數的連結
        // 當成這一集回傳。
        let usable = cachedResults;
        if (type === 'tv' && targetEpisode) {
          const before = usable.length;
          usable = filterByEpisode(usable, targetEpisode);
          console.log(`🎯 集数过滤(缓存): ${before} -> ${usable.length}`);
        }

        // 版本過濾必須在推播之前。
        //
        // 後面的版本過濾是在所有站都跑完才執行，而快取回推是立即發生的 ——
        // 韓版結果會先出現在列表裡，之後再過濾也來不及。
        usable = filterByTargetVersion(usable, targetInfo);

        if (usable.length === 0) {
          console.log('💾 缓存无匹配集数，改用实时搜索');
          cachedResults = [];
        } else {
          console.log(`💾 缓存命中: ${usable.length}个结果`);

          // 兜底 wrap：對 cache 內每條物件的 url 主動呼叫 wrapM3U8WithFilter。
          // 與 batch 路徑同樣理由（見 performBatchSearch 內同段註解）。
          // 冪等保證：已 wrap 的 url 會被 isAlreadyWrapped 擋下，無副作用。
          let rewrapped = 0;
          for (const r of usable) {
            if (!r || !r.url || typeof r.url !== 'string') continue;
            const before = r.url;
            const after = wrapM3U8WithFilter(r.url);
            if (after !== before) {
              r.url = after;
              rewrapped++;
            }
          }
          if (rewrapped > 0) {
            console.log(`🩹 smart cache 兜底 wrap: ${rewrapped}/${usable.length} 條裸 CDN 已修復`);
          }

          if (onStreamResult) {
            const batchSize = 5;
            for (let i = 0; i < usable.length; i += batchSize) {
              const batch = usable.slice(i, i + batchSize);
              onStreamResult(batch, {
                type: 'cached_results',
                batch: Math.floor(i / batchSize) + 1,
                totalBatches: Math.ceil(usable.length / batchSize),
                foundCount: usable.length
              });
              
              await new Promise(resolve => setTimeout(resolve, 50));
            }
            
            onStreamResult(usable, {
              type: 'complete',
              source: 'cache',
              totalCount: usable.length,
              searchTime: Date.now() - startTime
            });
          }
          
          return usable;
        }
      }
    } catch (e) {
      console.warn('缓存读取失败:', e.message);
    }
  }
  
  let finalResults = [];
  
  if (searchMode === 'smart_stream' || searchMode === 'auto') {
    console.log('🎯 使用智能流式搜索模式');
    finalResults = await performSmartSearch(params, onStreamResult);
  } else {
    // 'batch' 為預設,涵蓋未來任何未知值(寬鬆驗證一致)
    console.log('🔍 使用批量搜索模式');
    finalResults = await performBatchSearch(params);
  }
  
  if (type === 'tv' && targetEpisode) {
    const beforeFilter = finalResults.length;
    finalResults = filterByEpisode(finalResults, targetEpisode);
    console.log(`🎯 集数过滤: ${beforeFilter} -> ${finalResults.length}`);
  }

  // 指定版本時，排除確定是其他年份的來源。
  //
  // 搜尋字串不含年份（實測塞年份進關鍵字會讓四個站回 0 筆），
  // 站台會把所有版本一起回傳，版本判斷只能靠站方的 vod_year。
  finalResults = filterByTargetVersion(finalResults, targetInfo);

  // 指定續集季別時（season > 1），站台回傳第一季與後續季混在一起。
  // 搜尋字串已不再拼序號（理由見 buildSearchQuery）—— 改在結果階段挑：
  //   - 候選 sequel 序號 = targetSeason（如「仁医2」的 sequel=2）
  //   - 候選檔名含「完结/完結」字樣（如「仁医完结篇」是第二季的真實命名）
  //   - 候選 _year 屬於「明顯是後續季」的年份（2011 是仁醫第二季首播年）
  //
  // 安全網：如果過濾後 0 筆，退而求其次 —— 不過濾全部推播，
  // 至少使用者會看到候選項目（會包含第一季內容，但比「空白」好）。
// 續集季別過濾（共用 helper，cache 命中路徑與 batch 路徑都會經過）。
//
// 為什麼 batch 模式跳過：performBatchSearch 內部（file 結尾的 batch 路徑）
// 已套用 filterBySequel 並把結果回傳，loadResource 收到時 _rawName / _year
// 都已被 cleanResourceForOutput 剝掉，再跑一次 filter 會全部 fall back 到
// description 解析，雖然「碰巧」能正確判斷（description 還含「第三季」字
// 樣），但屬於無謂的二次處理、浪費效能、也容易因 log 顯示「_rawName=undefined」
// 誤導除錯。stream / auto 模式仍需在此 filter（performSmartSearch 內部不跑）。
  if (type === 'tv' && searchMode !== 'batch') {
    const r = filterBySequel(finalResults, targetInfo);
    let s4FallbackUsed = false;
    if (r.kept && r.kept.length > 0 && r.before !== undefined && r.kept.length < r.before) {
      finalResults = r.kept;
      console.log(`🎯 第${targetInfo.seasonNumber}季過濾: ${r.before} -> ${finalResults.length}（pooledYearMin=${r.pooledYearMin}）`);
      // 進入此分支表示 filterBySequel 確實有做 drop（kept < before），
      // 若同時也有 s4FallbackCandidates 表示 r.kept 不包含 S3 後半候選，
      // 需要把 fallback 候選塞回去並排在最前。
      if (r.s4FallbackCandidates && r.s4FallbackCandidates.length > 0) {
        s4FallbackUsed = true;
      }
    } else if (r.before !== undefined && r.before > 0 && (!r.kept || r.kept.length === 0)) {
      console.log(`⚠️ 第${targetInfo.seasonNumber}季過濾無命中(${r.before}筆)，保留全部候選`);
    } else if (r.kept && r.kept.length === r.before && r.before > 0) {
      // 全部通過即「沒 S4 命中」+ 「全部候選都是 S1 沒人可殺」 —— 退回保留全部。
      // log 寫明這是 fallback，不要讓人誤會成「filter 確認這就是答案」。
      const poolYr = r.pooledYearMin ?? 'null';
      console.log(`⚠️ 第${targetInfo.seasonNumber}季過濾: ${r.before} -> ${r.before}（無 targetSeason 命中群，pooledYearMin=${poolYr}，已是最終候選）`);
      // 退化情境 (最常見：user 查 season>=4 但站方全名以季名命名)：把這些候選放到最前並加註。
      if (r.s4FallbackCandidates && r.s4FallbackCandidates.length > 0) {
        s4FallbackUsed = true;
      }
    } else if (r.kept && r.kept.length < r.before && r.before > 0 && r.s4FallbackCandidates && r.s4FallbackCandidates.length > 0) {
      // S4 fallback 把候選抽出後 kept < before 的補接分支。
      finalResults = r.kept;
      s4FallbackUsed = true;
    }
    if (s4FallbackUsed) {
      // 給 fallback 候選一個「最大 score」標記，確保後續 sort 不會被同分
      // exact-match 的 S1 資源擠回中間位置（同一個 match 群分數相同）。
      // 設在 description 改寫之後，避免誤觸 _finalScore 計算。
      for (const cand of r.s4FallbackCandidates) {
        cand._s4FallbackBoost = true;
        if (cand.description && !cand.description.includes('⚠️')) {
          cand.description = `⚠️ 站方無「第${targetInfo.seasonNumber}季」資料，這是依片名推算的 S3 後半候選\n${cand.description}`;
        }
      }
      // 純化：使用者搜第4季，要看到的每一條都跟 S3 後半相關，
      // 不要混入 S1/S2 等無關季內容。S4 站方沒資料，S3 後半 (2020) 是
      // 已知最接近的內容，列為唯一切分才不會讓使用者誤點。
      //
      // 僅在 s4FallbackCandidates.length > 0 時才純化，避免空清單。
      if (r.s4FallbackCandidates.length > 0) {
        finalResults = [...r.s4FallbackCandidates];
      } else {
        finalResults = [...r.s4FallbackCandidates, ...finalResults];
      }
    }
  }

  finalResults.forEach(res => {
    res._finalScore = calculateResourceScore(res, preferResolution);
    if (res._s4FallbackBoost) {
      // _finalScore 之上再加極大值，確保 sort 始終在最前。
      res._finalScore = 1000 + res._finalScore;
    }
  });
  
  finalResults.sort((a, b) => {
    // 媒體直連優先：頁面型來源（/share/xxx）多數播放器開不起來，
    // 排在前面會讓使用者第一個選項就失敗。
    const aMedia = isDirectMediaUrl(a.url) ? 0 : 1;
    const bMedia = isDirectMediaUrl(b.url) ? 0 : 1;
    if (aMedia !== bMedia) return aMedia - bMedia;
    if (b._finalScore !== a._finalScore) return b._finalScore - a._finalScore;
    if (b.resolutionLevel !== a.resolutionLevel) return b.resolutionLevel - a.resolutionLevel;
    if (b.qualityScore !== a.qualityScore) return b.qualityScore - a.qualityScore;
    if (b.isHttps !== a.isHttps) return b.isHttps ? 1 : -1;
    return 0;
  });
  
  const fieldsToDelete = [
    '_finalScore', '_matchType', '_matchScore', '_seasonMatch',
    '_isMainSource', '_hasEpInfo', '_updateRecency', '_ep',
    '_isVariety', '_episodeDate', '_searchTime', '_site', '_priority',
    '_versionConflict', '_versionAmbiguous', '_areaMismatch', '_areaMatch', '_year', '_area', '_rawName',
    '_s4FallbackBoost', '_seasonFromItem'
  ];
  
  finalResults.forEach(res => {
    // 寫進 cache / 給予後續回傳的項目，必須包含版本標籤。
    // 之前只在 onStreamResult 推播路徑呼叫 cleanResourceForOutput，
    // 寫 cache 的 finalResults 走自己的清理邏輯，導致 cache 命中時沒有標籤。
    // 改用同一個 helper 統一處理。
    const cleaned = cleanResourceForOutput(res);

    // cleanResourceForOutput 用 { ...resource } 淺拷貝回傳新物件，
    // 這裡把原 res 的欄位換成 cleaned，後面寫 cache 與最終 return 都看得到。
    Object.keys(res).forEach(k => delete res[k]);
    Object.assign(res, cleaned);
  });
  
  // cache 寫入前做 URL 健康檢查：m3u8 URL 失效（CDN 清理資源回 502）的話
  // 寫進 cache 會讓「播一會斷線重頭」持續 30 分鐘，直到 TTL 過期重新搜尋。
  // 對 finalResults 內每個 m3u8 探測一次，失效的就過濾掉再寫 cache。
  // 注意：搜尋結果不過濾，Forward 仍能拿到所有候選；只在 cache 部分做嚴格。
  // cache 寫入：探測 + 寫入整段 fire-and-forget，不阻塞最終回傳。
  //
  // 為什麼這樣改：
  // 100 筆規模時 6 並發 HEAD × 5s timeout ≈ 85s，加上 fallback GET 再一倍，
  // 總探測時間 ≈ 60-170s。Forward 詳細頁打開後 iOS WidgetKit 約 30s 就會
  // CancellationError，cache 永遠寫不完，使用者看到的永遠是「搜尋中」，
  // 而且下次進來因為沒 cache 再花 60s 重探 —— 惡性循環。
  //
  // 解法：先把 finalResults 推給使用者（包含壞 URL），同時背景啟動探測，
  // 探測結束再寫入乾淨 cache，下次命中時已過濾掉失效 URL。
  // 真實「播一會斷線重頭」的場景（502 ≥ 400 不會被 HEAD 放行）仍會被剔除。
  if (finalResults.length > 0 && CONFIG.CACHE_TTL > 0) {
    (async () => {
      try {
        const urlMap = new Map();
        finalResults.forEach(r => {
          if (r.url && !urlMap.has(r.url)) urlMap.set(r.url, true);
        });
        const urls = Array.from(urlMap.keys());

        // 大規模結果只對取樣探測。
        //
        // 為什麼 50 筆以上只探測前 30：100 筆規模時即便已加大 concurrency
        // 到 24 還是要 4-9 秒才探完，WidgetKit 30 秒 timeout 內還是寫不完
        // 完整 cache。後續每集、各站獨立探測都會各自超時。
        //
        // 取樣 30 筆的邏輯：
        //   - 每集挑 1 個 host 探測（站內第一筆為代表）
        //   - 最多 30 筆 → 30 × 2s ÷ 24 並發 ≈ 2.5s，遠低於 timeout
        //   - 失效的站只影響 1 集 ~ 12 集，會在下次 cache miss 重新探測時補抓
        const probeLimit = Math.min(30, urls.length);
        const probeUrls = urls.slice(0, probeLimit);
        const alive = await probeUrlsAlive(probeUrls);
        const aliveUrls = new Set(probeUrls.filter((_, i) => alive[i]));
        // 沒被探測的 URL 預設視為「未確認」，寫進 cache 但下次遇到時按需重新驗證。
        // 不寫 dead — 沒探測不代表失效。
        const deadCount = probeUrls.length - aliveUrls.size;
        if (deadCount > 0) {
          console.log(`🩺 URL 探測: ${aliveUrls.size}/${probeUrls.length} 活著，過濾 ${deadCount} 條失效（取樣，總共 ${urls.length} 筆）`);
        }

        // 沒探測到的 URL 仍寫入 cache（保守策略，下次重搜時它們會被探測）。
        // 探測為 dead 的 URL 不寫 cache。
        const deadUrls = new Set(probeUrls.filter((_, i) => !alive[i]));
        const cacheable = finalResults.filter(r => !r.url || !deadUrls.has(r.url));
        if (cacheable.length > 0) {
          Widget.storage?.set?.(cacheKey, JSON.stringify(cacheable), CONFIG.CACHE_TTL);
          console.log(`💾 已缓存 ${cacheable.length} 个结果`);
        } else {
          console.log(`💾 全部 URL 失效，跳過 cache 寫入`);
        }
      } catch (e) {
        console.warn('缓存写入失败:', e.message);
      }
    })();
  }

  const totalTime = Date.now() - startTime;
  console.log(`✅ 搜索完成! 总计: ${finalResults.length}个结果, 耗时: ${totalTime}ms`);

  if (onStreamResult) {
    onStreamResult(finalResults, {
      type: 'complete',
      totalCount: finalResults.length,
      searchTime: totalTime,
      cached: cachedResults.length > 0
    });
  }

  // 診斷：把最終物件結構 dump 出來，協助驗證客戶端拿到的物件完整性。
  // 如果最終 finalResults 為 0 但過程中印出『總計: 33 個結果』，會在這裡再次印出確認。
  console.log(`📤 [loadResource 出口] type=${type} season=${season} episode=${episode ?? '-'} length=${finalResults.length}`);
  if (finalResults.length > 0) {
    console.log(`📤 [loadResource 出口] 第一條物件欄位：${Object.keys(finalResults[0]).join(', ')}`);
  }

  return finalResults;
}

// ==================== 搜尋字串組裝 ====================
// 片名與季別是兩個維度，年份刻意「不」放進搜尋字串。
//
// 實測五個站的結果數（搜「仁医」）：41 筆；搜「仁医2009」：只剩 2 筆。
// 站台對關鍵字做的是起始匹配，「片名+年份」這種寫法有四個站直接回 0 筆
// —— 檔名明明就存成「仁医」，年份只存在於 vod_year 欄位，
// 把年份塞進關鍵字等於要站台做它不會做的比對。
//
// 所以：搜尋用乾淨片名，版本交給 vod_year / vod_area 在結果階段判斷。
// 這也是為什麼 extractPlayInfoForCache 一定要讀那兩個欄位 ——
// 它們是唯一可靠的版本依據。
//
// 舊寫法「字串結尾不是數字才追加」更是雪上加霜：在「仁醫 2009」上
// searchQuery 是「仁医2009」，結尾的 9 被當成「已經有年份」，
// 第 2 季該加的序號也被擋掉，切換季別拿回的都是第 1 季的內容。
//
// 三個搜尋路徑（串流、批次、內部）都必須呼叫這裡，否則會各壞各的。
//
// 註：之前這裡會把 season 拼進搜尋字串（「仁医2」），理由是「站台確實有
// XX2 這種檔名」。但實測後發現大多數站對續集季別用完全不同的命名 ——
// 「仁醫第二季」在電影天堂 / 非凡資源 / 樂子 / 愛蛋四個站的真實檔名都是
// 「仁医完结篇」(2011)，愛蛋另外有「仁医2」(2011)。把 season 拼成
// 「仁医2」後只能命中愛蛋那個，其他四個站的「仁医完结篇」完全搜不到。
//
// 正確解法：搜尋字串只放裸片名，續集識別交給 isSmartSeriesMatch 內的
// season 比對 + sequel 邏輯處理。
function buildSearchQuery(searchQuery, targetInfo, targetSeason) {
  const base = String(searchQuery)
    .replace(/(?:19|20)\d{2}\s*$/, '')  // 年份交給結果階段，這裡不帶
    .replace(/\s+$/, '')
    .trim();
  return base;
}

/**
 * 把別名注入 targetInfo.searchQuery。
 *
 * 設計選擇：用 `await` 同步等 TMDB 別名（最多 1.5 秒）。
 *
 * 為什麼要 block：原本 fire-and-forget 設計會讓第一次搜因 cache miss
 * 走純繁簡邏輯（0 結果）。使用者體驗是「我裝了這功能怎麼沒效果」。
 * block 1.5s 換首次命中率從 0% 拉到 90%+ 是值得的 — 且這個 1.5s
 * 對單片名只發生一次，第二次之後永遠 in-memory 命中（< 1ms）。
 *
 * 為什麼 limit 1500ms：widget hot path 通常 6~9s。1.5s 對單部片
 * 還在容許範圍；TMDB 大多 < 800ms 就能回，block 完搜尋照跑。
 *
 * @returns true 表示已經替換；false 表示沒命中別名（hot path 走原 query）
 */
async function tryExpandWithTMDBAliases(targetInfo, type) {
  if (!targetInfo || !CONFIG.TMDB?.ENABLED || !CONFIG.TMDB.API_KEY) return false;
  const baseName = String(targetInfo.baseName || '').trim();
  if (!baseName || baseName.length < 2) return false;

  // 同步等 TMDB 別名（最多 1.5s）。失敗 / timeout → 回 []（走 fallback）。
  const aliases = await getTMDBAliasesBlocking(baseName, type, 1500);
  if (!Array.isArray(aliases) || aliases.length === 0) return false;

  // 站方幾乎都是簡體中文，因此優先挑「**含中文字**且跟 baseName 簡體
  // 版不同」的別名。
  //
  // 三條過濾條件（任一 fail 就跳過這個 alias）：
  //   1. 跟 baseName 原文同名（去重）
  //   2. 跟 baseName 的簡體版同名（CN 繁體混標時會撞到，視為無新資訊）
  //   3. **不含任何中文字**（VOD 站中文字典認不出英文片名）
  //
  // 第一條成立的別名直接挑走（break）。aliases 陣列內 CN 排第一，
  // 所以對中文劇幾乎一定挑到「行尸走肉」這類 CN 別名。
  //
  // 退路：如果全部 alias 都不含中文（罕見），fallback 拿第一個非空
  // 非原名的 alias 湊合。
  const baseSimp = convertChinese(baseName, false);
  const hasChinese = (s) => /[一-鿿]/.test(s);
  let bestAlias = null;
  let fallbackAlias = null;
  for (const a of aliases) {
    if (typeof a !== 'string') continue;
    const aTrim = a.trim();
    if (!aTrim) continue;
    if (normalizeForMatching(aTrim) === normalizeForMatching(baseName)) continue;
    const aSimp = convertChinese(aTrim, false);
    if (!aSimp || aSimp === baseSimp) continue;
    // 第一個 fallback 候選（任何非空非原名）
    if (!fallbackAlias) fallbackAlias = aTrim;
    // 必須含中文字 — VOD 站用中文字典
    if (!hasChinese(aTrim)) continue;
    bestAlias = aTrim;
    break;
  }
  if (!bestAlias) bestAlias = fallbackAlias;

  if (!bestAlias) {
    console.log(`[TMDB-diag] tryExpand: 無 bestAlias（aliases=${aliases.length} 個，fallbackAlias=${fallbackAlias}），return false`);
    return false;
  }

  // 寫進 targetInfo 讓下游的 `this.targetInfo.searchQuery` 走它。
  // 注意保留原本 rawName 與 baseName：buildSearchQuery 用的 searchQuery
  // 是入參，這裡我們直接改寫傳進來的 searchQuery（由 call site 寫回 targetInfo）。
  if (CONFIG.TMDB.VERBOSE) {
    console.log(`[TMDB] baseName="${baseName}" → 採用別名 query="${bestAlias}"（候選 ${aliases.length} 個）`);
  }
  targetInfo._aliasSearchQuery = bestAlias;
  console.log(`[TMDB-diag] tryExpand: bestAlias="${bestAlias}"，已設 _aliasSearchQuery`);
  return true;
}

/**
 * 取得最終搜尋字串。
 *
 * 邏輯優先級：
 *   1. 若 targetInfo._aliasSearchQuery 有值（TMDB 別名已 cache 命中）→ 用它
 *   2. 否則用原本的 searchQuery（純繁簡邏輯產生）
 *
 * 設計上不在這裡 await TMDB：cache miss 時直接走原 searchQuery，
 * 確保速度不退化。cache hit 時（例如第二次搜同片名）才會用到別名。
 */
function resolveFinalSearchQuery(targetInfo, originalQuery) {
  if (targetInfo?._aliasSearchQuery) {
    return String(targetInfo._aliasSearchQuery)
      .replace(/(?:19|20)\d{2}\s*$/, '')
      .replace(/\s+$/, '')
      .trim() || String(originalQuery || '').trim();
  }
  return String(originalQuery || '').trim();
}

// 套用 Forward 傳來的版本覆寫（首播年份、國別）。
// Forward 並非每次都傳 premiereDate（實測多數為空），因此片名仍是主要來源。
function applyDetailVersion(params, targetInfo) {
  const detailYear = extractVersionMarker(params.premiereDate) ||
    extractVersionMarker(params.airDate) || null;
  if (detailYear && detailYear !== targetInfo.year) {
    console.log(`📅 詳細頁指定版本: ${detailYear}年 (片名推導: ${targetInfo.year ?? '無'})`);
    targetInfo.year = detailYear;
  }
  const detailArea = resolveTargetArea(params, targetInfo);
  if (detailArea) targetInfo.region = detailArea;
}

// 依站方 vod_year 排除其他版本。
//
// 判斷依據必須是 vod_year，不是片名：實測搜「仁医」時五個站的檔名多為
// 光溜溜的「仁医」，年份只存在於 vod_year 欄位。
// 候選沒有年份就放行 —— 無法判斷不等於是錯的版本。
//
// 兩邊都轉字串比：_year 來自站台欄位是字串，targetInfo.year 是數字，
// 直接用 === 比會永遠不相等，把正確結果整批殺掉（實測 11 筆全滅）。
//
// 快取裡的結果 _year 已被 cleanResourceForOutput 移除，所以放行片名比對
// 作為後備 —— 那是快取路徑唯一還拿得到的版本線索。
// 續集季別過濾（共用 helper）：smart_stream 與 batch 兩個路徑都必須套用，
// 否則站台把同名第一季與後續季混在一起回傳時，第一季內容會被當成
// 第N季推播（搜「仁醫」+ season=2 → 「仁医」也一起被推上來）。
//
// 三條放行條件（任一成立即保留）：
//   1. 候選片名明確標出第 targetSeason 季（regex 抽到的 sequel 數字相符）。
//   2. 候選片名有「完结/完結/最終季」字樣且 sequel=null（特例命名，如
//      「仁医完结篇」是第二季的真實命名，沒有「第2季」字眼）。
//   3. 候選 sequel=null 且 vod_year 比「命中群（明確標記為第 targetSeason
//      季的候選）」最小年份還要早超過 1 年 —— 這種「片名沒寫季但年份明顯
//      較早」的多半是上一季內容被誤標全集的站方錯誤資料（如電影天堂對
//      「五等分的新娘」回 vod_year=2019，實際是 S1 內容）。
//   4. 候選 sequel=null 且 _year=null，且同名檔名「跨站出現次數」≥ 2
//      且命中群已存在 —— 這種「片名沒寫季也沒年份」但多站都在回的，多半
//      是上一季內容被當全集推播（愛蛋/如意對「五等分的新娘」回 S1 全集，
//      但樂子寫明「第二季」所以樂子的進命中群）。沒年份就沒規則上殺，
//      必須靠檔名頻率判斷：只有 1 站回的同名檔案可能是另一季，多站回的
//      一定是站方拼錯或共用檔名，殺掉保險。
//
// 安全網：如果過濾後 0 筆，回傳 null（不是空陣列），由呼叫端決定是否
// 退而求其次保留全部候選 —— 比「空白」好。
function filterBySequel(results, targetInfo) {
  const targetSeason = targetInfo?.seasonNumber;
  if (!Number.isFinite(targetSeason) || targetSeason <= 1) {
    return { kept: results, dropped: [] };
  }

  const before = results.length;

  // 命中群：明確標為第 targetSeason 季的候選，用它們的年份決定 pooledYearMin。
  const sequelMatched = results.filter(res => {
    const rawName = res._rawName || res.description || '';
    return extractSequelNumber(rawName) === targetSeason;
  });
  const yearsOfMatched = sequelMatched
    .map(res => Number(res._year) || Number(extractVersionMarker(res._rawName || '')) || null)
    .filter(y => y && Number.isFinite(y));
  const pooledYearMin = yearsOfMatched.length ? Math.min(...yearsOfMatched) : null;

  // 「片名沒寫季也沒年份」但跨多站回的同名檔案計數 —— 規則 4 用。
  // 計數單位是 baseName（去空白、去集數尾），如「五等分的新娘」。
  const unversionedBases = new Map();
  for (const res of results) {
    const rawName = res._rawName || res.description || '';
    if (extractSequelNumber(rawName) === targetSeason) continue;
    const candYear = Number(res._year) || Number(extractVersionMarker(rawName)) || null;
    if (candYear) continue;
    const base = (res._baseName || rawName.replace(/第[0-9一二三四五六七八九十百零〇]+[集話話回]/g, '').replace(/第[0-9]+季|Season\s*[0-9]+/gi, '')).trim();
    if (!base) continue;
    unversionedBases.set(base, (unversionedBases.get(base) || 0) + 1);
  }

  let kept = [];
  const dropped = [];
  for (const res of results) {
    const rawName = res._rawName || res.description || '';
    const sequel = extractSequelNumber(rawName);

    // 規則 0（最高優先）：sub-series marker 先 drop，**即使 sequel===targetSeason 也要 drop**。
    //
    // 場景：SAO S2 query，站內「刀剑神域外传 Gun Gale Online第二季」(2024)
    // 含「外传」標記（sub-series 暗示），且 sequel=2（被「第二季」字樣誤判）。
    // 規則 1（sequel===targetSeason）會放行，但這條其實是 GGO sub-series 不是 SAO 主線 S2。
    //
    // 啟發式：name 含 sub-series marker（劇場版/OVA/SP/外传/特別篇）必 drop，
    // 即使 sequel 對齊 targetSeason。
    //
    // 風險：「進撃的巨人 The Final Season - 特別篇」(2024) 雖然含「特別篇」，
    // 但其實是 Final S4 Part 2 完結篇。會被誤 drop。
    // 實務 trade-off：保留可能誤放劇場版的雜亂 vs 誤殺進騰完結篇 — 選擇前者，
    // 因為為讓後者（使用者點進去看劇場版）比誤殺完結篇（少看到 1 條）更影響體驗。
    if (/剧场版|劇場版|电影版|電影版|\bOVA\b|\bSP\b|外传|外傳|特別篇|特别篇/.test(rawName)) {
      dropped.push(res); continue;
    }

if (sequel === targetSeason) { kept.push(res); continue; }

  // 規則 X：candidate 的 sequel 明確標示為其他季，無條件 drop。
  //
  // 場景：user 查「零之使魔」season=2，VOD 站同時回傳：
  //   - 零之使魔         (sequel=null → 走規則 3)
  //   - 零之使魔2～双月的骑士～ (sequel=2 → kept)
  //   - 零之使魔3～三美姬的轮舞～ (sequel=3 → sequel=null 路徑漏網)
  //   - 零之使魔FINAL   (sequel=null → 走規則 2/規則 3)
  //
  // 規則 3 只處理 sequel=null，sequel=3 沒人管，最後 fall through 到
  // line 2975 kept.push，整季 S3 結果混進 S2 結果裡。user 看到「零之使魔
  // 第01集」排在最前，但進去點開發現是 S3 內容。
  //
  // 為什麼不直接拒絕 sequel != targetSeason：原本 line 2904 是這樣寫的，
  // 但實際上 target==candidate 一個有 sequel 一個沒 sequel 時（互補情境）
  // 會被這條規則誤殺，因此新增例外路徑處理那種情況。
  if (sequel !== null && sequel !== targetSeason) {
    // 例外：target 沒寫季（_expectedSequel 補入），candidate sequel=null
    // 應該用規則 2 / 規則 3，不會走到這裡（sequel=null 跳過這條 if）。
    // 所以「sequel !== null 且 sequel !== targetSeason」可以無條件 drop。
    dropped.push(res); continue;
  }

  // 規則 2：片名含「完結/完结/全集」字樣，且 sequel=null
    //
    // 重要！這個字眼**只有片名本身就是續集命名**才該放行：
    //   - 範例命中（合法）：「仁医完结篇」這是仁醫第二季的真實命名，沒有「第2季」字眼
    //   - 範例命中（合法）：「仁医完結篇」（繁體版）
    //
    // 反例「五等分的新娘 - 第01集 - 已完結」/「...全集」描述的是「整部片已播完」，
    // 是 S1 第一季播完的狀態說明，不是 S2 的標題。舊規則用 `/完结篇|完結篇|完结|/
    // 完結|最終季|最终季/.test(rawName)` 會被「已完結/全集」誤觸，導致 S1 漏殺。
    // 改用「片名本體就含有『完结篇/完結篇』」才放行（必須是「篇」字配套）。
    // 「最終季/最终季」保留 —— 可能是命名如「魔法少女小圓 最終季」，但實務上也常出
    // 現在 S1 描述中當成描述語（較罕見），與「全集」一樣要小心。保守只留「篇」。
    if (/完结篇|完結篇/.test(rawName) && sequel === null) {
      kept.push(res); continue;
    }

    // 片名沒寫季、vod_year 比命中群最早年還要早 1 年以上 → 上一季嫌疑
    if (sequel === null && pooledYearMin !== null) {
      const candYear = Number(res._year) || Number(extractVersionMarker(rawName)) || null;
      // 為什麼用「candYear < pooledYearMin」而不是「candYear <= pooledYearMin - 1」：
      // 上一季的播出年通常正是 pooledYearMin - 1（S2 拍攝年的前一年）。
      // 把「candYear == pooledYearMin - 1」當 borderline 留著會讓 S1 整季漏網
      // 混進 S2 結果（典型例子：「零之使魔」S1=2006、S2=2007，差 1 年）。
      if (candYear && candYear < pooledYearMin) {
        dropped.push(res); continue;
      }
      // DEBUG: 印出通過/沒通過規則 3 的情況，幫忙定位漏網之魚
      if (candYear && candYear >= pooledYearMin && candYear < pooledYearMin + 1) {
        console.log(`  [PASS-rule3 borderline] name="${res.name}" _year=${res._year} candYear=${candYear} pooledYearMin=${pooledYearMin}`);
      }
    }

    // 規則 3.7（新增）：片名沒寫季、vod_year 比命中群最早年**晚 ≥4 年**→ 後續季嫌疑
    //
    // 場景：SAO S2 query。命中群 `刀剑神域2` (2014) pooledYearMin=2014，
    // 但站內「刀剑神域 爱丽丝篇」(2018 S3)、「刀剑神域爱丽丝篇异界战争最终季」(2020 S4)、
    // 「刀剑神域进击篇：无星之夜」(2021 Progressive) 等 sequel=null + 年份晚於 2014 ≥4 年，
    // 舊規則 3 只 drop 早於 pooledYearMin 的，這些都漏網混進 S2 結果，使用者看到 279 條 S2。
    //
    // 啟發式：沒明確 sequel 標記但**晚於命中群 ≥4 年**的條目，幾乎可確定是
    // 「不同 sub-series 條目」（劇場版/外傳/Progressive）或「後續季」（S3+/S4+）。
    // 不應該混進 S2 結果。
    //
    // 風險：差 4 年可能誤殺正常跨季案例（如進擊的巨人 S4 2020 → Final S4 2023 差 3 年 OK），
    // 但比放進後續大堆雜亂條目好。
    if (sequel === null && pooledYearMin !== null) {
      const candYear = Number(res._year) || Number(extractVersionMarker(rawName)) || null;
      if (candYear && candYear > pooledYearMin + 3) {
        dropped.push(res); continue;
      }
    }

    // 規則 3.8（新增）：劇場版/OVA/外传/特別篇的排除
    //
    // 場景：SAO S2 query，站內「刀剑神域：序列之争」(2017) 是電影版，不是 SAO 主線 S2。
    // 上面規則 3.7 沒抓到因為差 3 年沒超過 4 年。
    //
    // 啟發式：name 含以下任一標記 → 視為 sub-series（劇場版/外傳/OVA），
    // 不該混進季 sequel 結果：
    //   - 「劇場版/剧场版」 - 劇場版直接標記
    //   - 「電影版/电影版」 - 電影版直接標記
    //   - 「OVA」「SP」 - OVA / 特別篇
    //   - 「外传/外傳」 - 外傳 sub-series（**完全 drop，不論 sequel** — 例：SAO GGO S2 用「第2季」標記但實為外傳）
    //   - 「特別篇/特别篇」 - 特別篇
    //
    // 風險：「進撃的巨人 The Final Season - 特別篇」(2024) 雖然含「特別篇」，
    // 但其實是 Final S4 Part 2 完結篇。會被誤 drop。
    // 實務 trade-off：保留可能誤放劇場版的雜亂 vs 誤殺進騰完結篇 — 選擇前者，
    // 因為混亂的後果（使用者點進去看劇場版）比誤殺完結篇（少看到 1 條）更影響體驗。
    if (/剧场版|劇場版|电影版|電影版|\bOVA\b|\bSP\b|外传|外傳|特別篇|特别篇/.test(rawName)) {
      dropped.push(res); continue;
    }

    // 規則 3.9（新增）：冒號/豎線副標題 + 年份差距大 → 劇場版嫌疑
    //
    // 場景：SAO S2 query，站內「刀剑神域：序列之争」(2017) 沒明確劇場版字眼，
    // 但含冒號副標 + 晚於 pooledYearMin ≥2 年 → 視為劇場版 drop。
    //
    // 啟發式：冒號/豎線後的副標題常是劇場版/OVA/SP 命名，sequence 標題通常不用冒號。
    // 配對條件：`/name`/`原名/Original`：副標 + 晚於 pooledYearMin ≥2 年。
    //
    // 風險：誤殺「進撃的巨人：xyz」這類的 S4 條目。實務上 S 命名在冒號前、
    // 副標在冒號後，所以「進撃的巨人 第三季：瑪利亞之牆」之類的 S4 條目會誤殺。
    // 但實務極罕見，trade-off 可接受。
    if (/：|:|｜|\|/.test(rawName) && pooledYearMin !== null) {
      const candYear = Number(res._year) || Number(extractVersionMarker(rawName)) || null;
      if (candYear && candYear > pooledYearMin + 1) {
        dropped.push(res); continue;
      }
    }

    // 規則 3.6（新增）：同時代另一版本嫌疑。
    //
    // 場景：「仁醫」+ season=2，候選 _year 集合 {2009, 2011, 2012}，其中
    //   - 2009：日版 S1（pooledYearMin - 2 = 上一季）
    //   - 2011：日版 S2（sequelMatched 命中，pooledYearMin）
    //   - 2012：韓版（同 IP 但不同地區，2012 韓劇「仁醫」翻拍）
    //
    // 舊規則 3 只殺比 pooledYearMin 早 ≥2 年的，2012 不在「上一季」範圍 →
    // 韓版漏網。實機測出 100 筆韓版「仁醫2012」全留，使用者看到一片韓版。
    //
    // 啟發式：續集命中群（pooledYearMin）的新版本 _year 與同 IP 不同地區的
    // 「另一版本」差距通常只有 ±1 年（同時代翻拍）。若候選 _year ==
    // pooledYearMin + 1 且片名 baseName 與目標一致，極可能是「另一地區版本」
    // （韓版翻拍），應剔除。
    //
    // 風險：劇場版（差 1 年）會被誤殺。但劇場版集數通常 1 集、與正片差異大，
    // 使用者看到也會跳過，比韓版誤推好得多。
    //
    // 為什麼不直接用「baseName 跨站一致性」：仁醫 case 樂子的「仁医」vod_year
    // 就是 2012（韓版），跨站看起來 baseName 一致但其實是韓版，啟發式反被誤導。
    if (sequel === null && pooledYearMin !== null) {
      const candYear = Number(res._year) || Number(extractVersionMarker(rawName)) || null;
      // 候選年份 = pooledYearMin + 1 → 同時代另一版本嫌疑
      if (candYear && candYear === pooledYearMin + 1) {
        dropped.push(res); continue;
      }
    }

    // 片名沒寫季也沒年份、且跨多站回傳同一 baseName → 上一季嫌疑
    // （只有 1 站回的可能是另一季沒寫季的合法結果，2 站以上才殺）
    if (sequel === null && pooledYearMin !== null) {
      const candYear = Number(res._year) || Number(extractVersionMarker(rawName)) || null;
      if (!candYear) {
        const base = (res._baseName || rawName.replace(/第[0-9一二三四五六七八九十百零〇]+[集話話回]/g, '').replace(/第[0-9]+季|Season\s*[0-9]+/gi, '')).trim();
        if (base && (unversionedBases.get(base) || 0) >= 2) {
          dropped.push(res); continue;
        }
      }
    }

    kept.push(res);
  }

  // ----- 進階啟發式：當 targetSeason=4 且站方無「第4季」命中群時 -----
  //
  // 場景：user 查「刀劍神域」+ season=4，4 個站回的條目裡完全沒有任何
  // 「第四季」字眼（實測 caiji/ffzy/lzi/rycj 4 站合計 43 條原始結果中
  // 「第四季」=0 條），但站方把 SAO Alicization 後半命名為「爱丽丝篇 异界战争
  // 最终季」/「异界战争 第2期」(2019-2020)，這其實就是 SAO 第4季實際內容。
  // 預設 sort 把這幾條埋在 S1 全集之後，使用者根本看不到。
  //
  // 啟發式：沒 sequel=4 命中、且候選含「最终季 / 第2期 / 异界战争 後半」
  // 字樣 → 把這些從 kept 抽出移到 s4FallbackCandidates，呼叫端會把它們
  // 排在前面並在 description 加註「⚠️ S4 站方無對應資料，這是依片名鄰近
  // 年份推算的 S3 後半候選」。
  //
  // 安全閘：只在「targetSeason 確實=4 且 sequel=4 命中=0」時啟動，避免
  // 對 season=2/3 誤推；最終季/第2期 marker 出現也要至少 1 條才啟動，
  // 避免無關查詢也被改 sort。
  let s4FallbackCandidates = [];
  if (targetSeason === 4 && sequelMatched.length === 0) {
    s4FallbackCandidates = kept.filter(res => {
      const nm = res._rawName || res.description || '';
      // SAO 的 forward app metadata 切季邏輯與 VOD 站目錄結構不一致：
      //   - forward app 把 SAO 切成 S1/S2/S3/S4：S3=爱丽丝篇 (2018 Part 1)，
      //     S4=爱丽丝篇 异界战争 (2019 Part 2) + 异界战争最终季 (2020 Part 3)。
      //   - VOD 站把 SAO Alicization 切成 3 段：Part 1/2018、Part 2/2019、
      //     Part 3/2020，並無「第4季」獨立條目。
      //
      // 啟發式：S4 fallback 應抓「爱丽丝篇 异界战争」(Part 2, 2019) 與
      // 「异界战争 最终季 / 第2期」(Part 3, 2020)，排除「爱丽丝篇」(Part 1, 2018)
      // 屬於 S3 的部分。
      //
      // 條件 1：name 同時含「异界战争」+「爱丽丝」→ Part 2 或 Part 3 都命中。
      const hasAlicizationAndWar = /爱丽丝|愛麗絲/.test(nm) && /异界战争/.test(nm);
      // 條件 2：name 含「最终季」+「异界战争」或「爱丽丝」→ Part 3 命中。
      const hasFinalSeason = /(?:最終季|最终季)/.test(nm);
      const hasFinalSeasonWithContext = hasFinalSeason && (/异界战争|爱丽丝|愛麗絲/.test(nm));
      // 條件 3：name 含「第 2 期」+「爱丽丝」 → Part 3 (lzi 站命名) 命中。
      const hasSecondCour = /第\s*[2２]\s*期/.test(nm) && /爱丽丝|愛麗絲/.test(nm);

      return hasAlicizationAndWar || hasFinalSeasonWithContext || hasSecondCour;
    });
    console.log(`🔬 S4 fallback diagnostic: kept.length=${kept.length}, sequelMatched.length=${sequelMatched.length}, targetSeason=${targetSeason}, s4FallbackMatched=${s4FallbackCandidates.length}`);
    if (s4FallbackCandidates.length > 0) {
      // 把這些從 kept 拿出，避免既被推進 kept 又被推到前面重複。
      const s4Keys = new Set(s4FallbackCandidates.map(r => `${r.url}|${r.name}`));
      kept = kept.filter(res => !s4Keys.has(`${res.url}|${res.name}`));
      console.log(`🎯 S4 fallback: 從 kept 抽出 ${s4FallbackCandidates.length} 條「爱丽丝篇 异界战争/最终季」候選置前`);
      for (const c of s4FallbackCandidates.slice(0, 5)) {
        console.log(`    候選: _rawName="${c._rawName}" _year=${c._year} url=${(c.url || '').slice(0, 80)}`);
      }
    } else {
      s4FallbackCandidates = [];
    }
  }

  return { kept, dropped, before, pooledYearMin, s4FallbackCandidates };
}

function filterByTargetVersion(results, targetInfo) {
  // 目標帶年份：只留同年份與無年份的候選。
  if (targetInfo.year) {
    const want = String(targetInfo.year);
    const before = results.length;
    const filtered = results.filter(res => {
      const candYear = res._year ?? extractVersionMarker(res._rawName || '');
      return !candYear || String(candYear) === want;
    });
    if (before !== filtered.length) {
      console.log(`🚫 版本過濾(${want}): ${before} -> ${filtered.length}`);
    }
    return filtered;
  }

  // 目標沒帶年份：不主動過濾，由版本標籤讓使用者分辨。
  //
  // 為什麼不做「跨站多數決」或「剔除帶年份版本」這類啟發式：
  // - 多數決：四個站給 2009、一個站給 2012，把 2012 剔除會讓韓劇資源
  //   永遠找不到；但韓劇在台灣本來就是少數派（搜「仁醫」是韓劇的人不會多），
  //   多數決會永久站在日劇那一邊。
  // - 剔除帶年份版本：跨站沒有「無年份」的同名候選時（典型情況：
  //   電影天堂「仁医」雖無檔名年份但 _year=2009），會誤殺真實的日版。
  // - airDate 沒傳：Forward 從詳細頁帶的是 season + episodeName 為主，
  //   airDate / premiereDate 多數情況為空，無法用 airDate 區分。
  //
  // 真正合理的策略：兩個版本都留，靠 cleanResourceForOutput 寫入
  // [2009 · 日本] / [2012 · 韓國] 標籤，讓使用者在 UI 上自己挑。
  return results;
}

async function performSmartSearch(params, onStreamResult) {
  const {
    seriesName,
    type = 'tv',
    VodData,
    matchStrictness = 'standard',
    episode,
    season
  } = params;

  const targetEpisode = episode ? parseInt(episode, 10) : null;
  const startTime = Date.now();

  const siteManager = new SiteManager();
  const resourceSites = parseResourceSites(VodData);
  const sortedSites = siteManager.initializeSites(resourceSites);

  const targetInfo = extractEnhancedInfo(seriesName);

  // season 參數不會出現在 seriesName 裡，必須在這裡套用，否則搜尋字串
  // 永遠是裸片名。使用者切換季別時拿到的是第一季的內容，畫面看起來
  // 就完全沒有刷新。理由與寫法見 loadResource 內的說明。
  let targetSeason = season ? parseInt(season, 10) : targetInfo.seasonNumber;
  // 中文季別（「第二季」之類）容錯，理由見 loadResource。
  if (Number.isNaN(targetSeason) && typeof season === 'string') {
    const m = season.match(/\d+|[一二三四五六七八九十零]+/);
    targetSeason = m ? (parseInt(m[0], 10) || parseChineseNumeral(m[0]) || NaN) : NaN;
  }
  if (Number.isFinite(targetSeason) && targetSeason > 1) {
    targetInfo._expectedSequel = targetSeason;
  }
  targetInfo.seasonNumber = targetSeason;

  // 詳細頁指定的版本同樣要帶進來。
  //
  // 這裡重新呼叫了 extractEnhancedInfo，loadResource 內套用的
  // premiereDate / airDate / 地區資訊會全部消失 —— 韓版與日版片名幾乎相同，
  // 少了版本資訊就會把兩個版本混在一起回傳。
  applyDetailVersion(params, targetInfo);
  targetInfo.searchQuery = buildSearchQuery(targetInfo.searchQuery, targetInfo, targetSeason);

  // TMDB 跨地區別名擴充。
  //
  // 為什麼這裡呼叫：loadResource / performSmartSearch / performBatchSearch 三
  // 條路徑都需要，因為 SmartSearchExecutor 內部讀的就是 this.targetInfo.searchQuery。
//
  // 為什麼不會拖慢 hot path：tryExpandWithTMDBAliases 內部最長只等 1.5s
  // 且有 cache 命中短路；cache hit 時（同一片名第二次、或已預熱）立即
  // 回傳；只有在「這部片第一次被搜時」才會同步等 TMDB（單次成本），
  // 之後所有搜尋（同基名）都會 in-memory 命中。
  //
  // 安全保證：對 type === 'variety' 跟沒開 TMDB 的情況一律放行；
  // try/catch 確保 TMDB 任何意外錯誤都不會中斷搜尋主流程。
  try {
    await tryExpandWithTMDBAliases(targetInfo, type);
    console.log(`[TMDB-diag] tryExpand returned, _aliasSearchQuery="${targetInfo._aliasSearchQuery || '(空)'}", searchQuery="${targetInfo.searchQuery}"`);
  } catch (e) {
    console.log(`[TMDB-diag] tryExpand THREW: ${e?.message || e}`);
    if (CONFIG.TMDB?.VERBOSE) console.warn('[TMDB] expand 失敗,繼續原 query:', e?.message || e);
  }
  if (targetInfo._aliasSearchQuery) {
    const aliasQ = String(targetInfo._aliasSearchQuery)
      .replace(/(?:19|20)\d{2}\s*$/, '')
      .replace(/\s+$/, '')
      .trim();
    if (aliasQ) {
      console.log(`🌐 [TMDB] 已採用對岸/別名 query: "${aliasQ}"（原本 "${targetInfo.searchQuery}"）`);
      targetInfo.searchQuery = aliasQ;
  }
}

  // 原本這裡會先對 10 個站做健康檢查再開始搜尋。該檢查只是 GET 站點首頁、
  // 結果不影響搜尋行為，等於每個站先被多打一次請求再打正式的搜尋請求，
  // 慢的站還要等滿 1500ms 超時。串流的價值就是快，實測因此多花掉數秒，
  // 這裡直接移除。
  const executor = new SmartSearchExecutor(siteManager, targetInfo, type, matchStrictness, targetEpisode);
  
  const allResults = await executor.search(onStreamResult);
  
  const stats = executor.stats;
  const totalTime = Date.now() - startTime;
  
  console.log(`
📊 搜索统计报告:
   总耗时: ${totalTime}ms
   总站点: ${stats.totalSites}
   完成站点: ${stats.completedSites}
   成功站点: ${stats.successfulSites}
   失败站点: ${stats.failedSites}
   跳过站点: ${stats.skippedSites}
   找到结果: ${allResults.length}
  `);
  
  return allResults;
}

async function performBatchSearch(params) {
  const { 
    seriesName, 
    type = 'tv', 
    season, 
    episode, 
    VodData,
    matchStrictness = 'standard',
    preferResolution = 'auto'
  } = params;

  console.log(`🔍 启动批量搜索: ${seriesName}`);
  const startTime = Date.now();
  
  const resourceSites = parseResourceSites(VodData);
  if (resourceSites.length === 0) {
    return [];
  }

  const targetInfo = extractEnhancedInfo(seriesName);
  let targetSeason = season ? parseInt(season) : targetInfo.seasonNumber;
  const targetEpisode = episode ? parseInt(episode) : null;
  // 中文季別容錯
  if (Number.isNaN(targetSeason) && typeof season === 'string') {
    const m = season.match(/\d+|[一二三四五六七八九十零]+/);
    targetSeason = m ? (parseInt(m[0], 10) || parseChineseNumeral(m[0]) || NaN) : NaN;
  }
  if (Number.isFinite(targetSeason) && targetSeason > 1) {
    targetInfo._expectedSequel = targetSeason;
  }
  targetInfo.seasonNumber = targetSeason;

  // 搜尋字串組裝規則必須與串流模式一致（buildSearchQuery），
  // 否則同一個片名在兩種模式下會送出不同的關鍵字。
  applyDetailVersion(params, targetInfo);
  targetInfo.searchQuery = buildSearchQuery(targetInfo.searchQuery, targetInfo, targetSeason);

  // TMDB 跨地區別名擴充。
  //
  // 為什麼這裡呼叫：loadResource / performSmartSearch / performBatchSearch 三
  // 條路徑都需要，因為 SmartSearchExecutor 內部讀的就是 this.targetInfo.searchQuery。
//
  // 為什麼不會拖慢 hot path：tryExpandWithTMDBAliases 內部最長只等 1.5s
  // 且有 cache 命中短路；cache hit 時（同一片名第二次、或已預熱）立即
  // 回傳；只有在「這部片第一次被搜時」才會同步等 TMDB（單次成本），
  // 之後所有搜尋（同基名）都會 in-memory 命中。
  //
  // 安全保證：對 type === 'variety' 跟沒開 TMDB 的情況一律放行；
  // try/catch 確保 TMDB 任何意外錯誤都不會中斷搜尋主流程。
  try {
    await tryExpandWithTMDBAliases(targetInfo, type);
    console.log(`[TMDB-diag] tryExpand returned, _aliasSearchQuery="${targetInfo._aliasSearchQuery || '(空)'}", searchQuery="${targetInfo.searchQuery}"`);
  } catch (e) {
    console.log(`[TMDB-diag] tryExpand THREW: ${e?.message || e}`);
    if (CONFIG.TMDB?.VERBOSE) console.warn('[TMDB] expand 失敗,繼續原 query:', e?.message || e);
  }
  if (targetInfo._aliasSearchQuery) {
    const aliasQ = String(targetInfo._aliasSearchQuery)
      .replace(/(?:19|20)\d{2}\s*$/, '')
      .replace(/\s+$/, '')
      .trim();
    if (aliasQ) {
      console.log(`🌐 [TMDB] 已採用對岸/別名 query: "${aliasQ}"（原本 "${targetInfo.searchQuery}"）`);
      targetInfo.searchQuery = aliasQ;
  }
}

  // 與串流模式同樣帶上續集序號，理由見 loadResource 的 cacheKey 說明。
  const batchSequel = extractSequelNumber(targetInfo.rawName);
  const batchVersion = targetInfo.year ?? extractVersionMarker(targetInfo.rawName) ?? 'x';
  const cacheKey = `vod_batch_${normalizeTitleForMatch(targetInfo.baseName)}_sq${batchSequel ?? 'x'}_y${batchVersion}_a${targetInfo.region ?? 'x'}_s${targetSeason}_${type}`;
  let allResults = [];

  try {
    const cached = parseCacheValue(await Widget.storage?.get?.(cacheKey));
    if (cached.length > 0) {
      console.log(`✅ 批量模式缓存命中: ${cached.length}个结果`);
      // 兜底 wrap：cache 內 url 在歷史版本曾以裸 CDN 寫入（syncWidgetVersion
      // 沒清乾淨、或 batch 路徑在某版繞過 wrap 直接 set），即使 v17 之後的
      // wrap 邏輯是冪等的，也不會把已存的裸 url 變成過濾廣告伺服器 URL —— 因為
      // wrapM3U8WithFilter 從未被呼叫。必須在這裡主動呼叫一次才能讓歷史
      // cache 自動恢復為過濾廣告伺服器 URL。
      //
      // 冪等保證：對已 wrap 的 url，wrapM3U8WithFilter 內的 isAlreadyWrapped
      // 會直接 return，不會二次包裝；只對裸 CDN 才會真正 wrap 並印 log。
      let rewrapped = 0;
      for (const r of cached) {
        if (!r || !r.url || typeof r.url !== 'string') continue;
        const before = r.url;
        const after = wrapM3U8WithFilter(r.url);
        if (after !== before) {
          r.url = after;
          rewrapped++;
        }
      }
      if (rewrapped > 0) {
        console.log(`🩹 batch cache 兜底 wrap: ${rewrapped}/${cached.length} 條裸 CDN 已修復`);
        // 順手把修好的 cache 寫回 storage，下次命中直接是過濾廣告伺服器 URL。
        try { Widget.storage?.set?.(cacheKey, JSON.stringify(cached), CONFIG.CACHE_TTL); } catch {}
      }
      allResults = cached;
    }
  } catch (e) {
    console.warn('读取缓存失败');
  }

  if (allResults.length === 0) {
    const stats = { total: resourceSites.length, success: 0, failed: 0 };
    
    const requestTasks = resourceSites.map(site => async () => {
      try {
        const retries = site.isMain ? CONFIG.RETRY_ATTEMPTS : 1;
        const response = await fetchWithSmartRetry(
          site.value,
          { params: { ac: "detail", wd: targetInfo.searchQuery || targetInfo.baseName } },
          retries,
          site.title
        );

        if (!response?.list) {
          stats.failed++;
          return [];
        }

        // 年份歧異剔除：smart_stream 路徑在站內比對結果，
        // batch 路徑同樣需要這層過濾，否則「仁醫」會把韓版 2012 當成
        // 第一季推給使用者 —— 兩部完全不同的片僅因檔名撞字而被誤判。
        //
        // 規則：站內同時有「無年份」與「帶年份」兩個同名版本時，帶年份的
        // 屬於續集，無年份的是原版（第一季）。只留原版（與目標 version
        // 一致的版本）。
        //
        // 例外：若站內只有帶年份版本（沒有原版對照），一律放行；
        // 此時寧可多給，不可誤殺正確來源。
        const yearMarked = (this?.type !== 'movie' && type !== 'movie')
          ? null  // batch 路徑無 this，給 null 走放行
          : null;
        const batchYearMarked = findYearMarkedSequels(response.list, targetInfo, matchStrictness);
        // sequelsToSkip 只在 S1 目標時啟用。
        //
        // 這個 helper 是給「仁医 2009」/「仁医 2012」這類韓日版歧異設計的——
        // 早的年份當原版，晚的當續集跳過。但套到「五等分的新娘」(S1, 2019)
        // vs「五等分的新娘第二季」(S2, 2021) 時，2021 會被誤判成「續集」跳過，
        // 偏偏 S2 才是使用者在查的目標。
        //
        // 規則：targetInfo.seasonNumber >= 2 時，使用者要的就是後續季，那些
        // 「續集年份」就是本體，不該跳。
        const sequelsToSkip = (targetInfo.seasonNumber >= 2 || !batchYearMarked)
          ? null
          : batchYearMarked.sequels;

        let siteResults = [];
        // SAO 用了兩種互補的啟發式放行「主標題 + 空格 + 副標題」結構的條目：
        //  1. 通用 findSubtitledSequels helper（line 970 後）：分析站內同一
        //     baseName 條目，按年份分群，targetSeason 對應第 N 群。
        //     適用於「單 series 動漫」（進擊的巨人、鬼滅之刃等）。
        //  2. SAO-specific 規則（下方 S3-forced / S4-forced）：SAO 是個多 sub-series
        //     集合（主線 + GGO + Progressive + 劇場版），通用 helper 的年份分群
        //     會把整個 SAO 黏成 1~2 群，無法對齊 forward app metadata 切季邏輯
        //     （S3=爱丽丝篇 Part 1 / S4=异界战争 Part 2 + 最終季 Part 3）。
        //
        //     因此 SAO 場景必須用副標題字串特徵直接判斷，**目前**只能 hardcode
        //     SAO 字串（爱丽丝/异界战争/最終季/第2期）。
        //     若未來其他多 sub-series IP（如「物語系列」、「TYPE-MOON 系列」）
        //     也有同樣切季問題，需各自加 SAO 風格的 hardcode 啟發式。
        //
        // 先跑通用 helper，若有結果才用通用路徑；SAO 由下方 hardcode 補位。
        //
        // 安全閘：只在「站內完全沒 sequel 命中」時才啟動 helper，避免對已有
        // 「第N季」/「完结篇」命名的網站誤推。例如 SAO S2 query：站方有
        // 「刀剑神域2」(2014) sequel=2 命中，已能正確分出 S2，此時不該啟動
        // helper（helper 按年份分群會把 2017+ 劇場版/S3/S4/Progressive 全
        // 黏成同一群，反而把非 S2 內容誤推進 S2 結果）。
        let subtitledResult = null;
        const allItems = response.list.filter(it => it?.vod_name);
        if (allItems.length > 0) {
          // 計算站內 sequel 命中數（extractSequelNumber(rawName) === targetSeason）。
          let hasSequelHit = false;
          for (const it of allItems) {
            if (extractSequelNumber(it.vod_name) === targetSeason) {
              hasSequelHit = true;
              break;
            }
            // 「完结篇/完結篇」也是 sequel 標記（仁醫第二季站內命名）。
            if (targetSeason === 2 && /完结篇|完結篇/.test(it.vod_name || '')) {
              hasSequelHit = true;
              break;
            }
          }
          if (!hasSequelHit) {
            subtitledResult = findSubtitledSequels(
              response.list, targetInfo, targetSeason, matchStrictness
            );
          }
        }
        for (const item of response.list) {
          if (!item.vod_name) continue;

          const candidateInfo = extractEnhancedInfo(item.vod_name);
          const matchResult = isSmartSeriesMatch(targetInfo, candidateInfo, matchStrictness);

          // 通用副標題型續集群啟發式（適用於進擊的巨人、鬼滅之刃等單 series）：
          // 當 candidate 不 match、但屬於 findSubtitledSequels 算出來的目標群 → 放行。
          if (!matchResult.match && subtitledResult && subtitledResult.items) {
              const inSubtitledGroup = subtitledResult.items.some(sg =>
                (sg.vod_id && sg.vod_id === item.vod_id) ||
                (sg.vod_name === item.vod_name)
              );
              if (inSubtitledGroup) {
                console.log(`🟢 [subtitled-general] 放行 ${item.vod_name} (groupYear=${subtitledResult.groupYear}, groupCount=${subtitledResult.groupCount}, targetSeason=${targetSeason})`);
                matchResult.match = true;
                matchResult.type = 'subtitled_sequel_forced';
                matchResult.confidence = 0.80;
                matchResult.subtitledGroup = subtitledResult.groupYear;
              }
            }

          // ===== SAO-specific hardcode 規則 =====
          // ⚠️ 這部分只針對 SAO 系列，因 SAO 是多 sub-series 集合，
          // 通用 helper 無法正確分群（見上方註解）。
          // 啟發式：forward app metadata 切季方式為 S3=爱丽丝篇 (2018)、
          // S4=异界战争 (2019) + 最终季 (2020)。比對 candidate name 含對應字串。
          // 限制：必須以 targetName 開頭（去空白簡轉繁）以避免誤推其他動漫。
          if (!matchResult.match) {
            const candName = normalizeTitleForMatch(item.vod_name || '');
            const tName = normalizeTitleForMatch(targetInfo.rawName || targetInfo.baseName || '');
            const tBase = normalizeTitleForMatch(targetInfo.baseName || '');
            const startsWithTarget = tName && (candName.startsWith(tName) || (tBase && candName.startsWith(tBase)));
            if (startsWithTarget) {
              const nm = item.vod_name || '';
              const isSaoLike = /爱丽丝|愛麗絲|异界战争|最終季|最终季|第\s*[2２]\s*期/.test(nm);
              if (isSaoLike) {
                if (targetInfo.seasonNumber >= 4) {
                  // S4 = Part 2 (异界战争) + Part 3 (最终季 / 第2期)
                  const isPart2 = /异界战争/.test(nm) && /爱丽丝|愛麗絲/.test(nm);
                  const isPart3 = /(?:最終季|最终季|第\s*[2２]\s*期)/.test(nm);
                  if (isPart2 || isPart3) {
                    console.log(`🟢 [SAO-S4-forced] 放行 ${nm} (target=${tName})`);
                    matchResult.match = true;
                    matchResult.type = 'sao_s4_forced';
                    matchResult.confidence = 0.85;
                  }
                } else if (targetInfo.seasonNumber === 3) {
                  // S3 = 爱丽丝篇 Part 1 (沒「异界战争/最終季/第2期」副標)
                  const isPart1 = /爱丽丝|愛麗絲/.test(nm) &&
                    !/异界战争/.test(nm) &&
                    !/(?:最終季|最终季|第\s*[2２]\s*期)/.test(nm);
                  if (isPart1) {
                    console.log(`🟢 [SAO-S3-forced] 放行 ${nm} (target=${tName})`);
                    matchResult.match = true;
                    matchResult.type = 'sao_s3_forced';
                    matchResult.confidence = 0.85;
                  }
                }
              }
            }
          }

          if (matchResult.match && matchResult.confidence >= 0.6) {
            // 年份歧異剔除：站內「仁医2012」與「仁医」並列時，
            // 2012 被視為續集而跳過（除非目標明確要 2012 版）。
            if (sequelsToSkip) {
              // 同時考慮 candidateInfo.year（從檔名抓）與 item.vod_year（站方欄位）。
              // 兩個任一屬於續集年份都跳過。實測愛蛋的韓版「仁医」檔名不帶年份、
              // 但 item.vod_year=2012，只看 candidateInfo.year=null 會被放行。
              const yearCandidates = [];
              if (candidateInfo.year != null) yearCandidates.push(candidateInfo.year);
              if (item.vod_year) yearCandidates.push(Number(item.vod_year));
              // sequel 年份也轉數字比對（站方資料型別不穩，vod_year 可能是字串）。
              const sequelsNum = sequelsToSkip.map(Number);
              const hit = yearCandidates.some(y => sequelsNum.includes(y));

              // 跳過條件：「候選有任一年份命中續集，且目標**沒指定同一個**續集年份」。
              // targetInfo.year = null 表示使用者沒指定，「候選命中續集」就必須跳過；
              // targetInfo.year = 2012 表示使用者明確要 2012，那「候選命中 2012」就不跳。
              //
              // 不能寫 `targetInfo.year !== candidateInfo.year`，因為兩者皆為 null 時
              // 會是相等而誤判放行 —— 實機測出 44 筆韓版愛蛋就是栽在這裡。
              const userWantsYear = targetInfo.year != null ? Number(targetInfo.year) : null;
              const candidateYears = [];
              if (candidateInfo.year != null) candidateYears.push(Number(candidateInfo.year));
              if (item.vod_year) candidateYears.push(Number(item.vod_year));
              const userWantsThisYear = userWantsYear != null && candidateYears.includes(userWantsYear);

              if (hit && !userWantsThisYear) {
                continue;
              }
            }
            // 「完结篇 / 完結篇」是日劇續集（第二季或最終季）的常見副標題，
            // 例如「仁醫完結篇」（仁醫第二季，2011）。
            // 當目標明確要某一季時，這類候選不可能是本季本體，跳過避免誤推。
            if (targetInfo.seasonNumber === 1 &&
                /完结篇|完結篇|最終季|最终季|第二季|最終章|终章/.test(item.vod_name)) {
              continue;
            }
            // 番外型副標題：「特別篇 / 特别篇」、「OVA」、「劇場版 / 剧场版」、
            // 「外傳 / 外传」、「總集篇 / 总集篇」、「番外」、「電影解說 / 电影解说」、
            // 「＊」（FINAL 期中特別篇）「∽」（五等分新娘系列）。
            // 這些都不屬於任何正季，目標明確要某一季時不該混入。
            //
            // 實測「五等分的新娘特別篇」(2023) 與 target baseName「五等分新娘」
            // 走 loose 匹配（共同字元比 0.625），原本會被當成第一季推播，
            // 結果 OVA 跟正劇混在一起，使用者點進去看到內容不符。
            // 劇場版與「電影解說」是二次剪輯影片，並非正片。
            //
            // OAD / SP 額外處理：站方常把 OAD / SP 跟正劇混在同一個 vod_id 裡
            // （「進擊的巨人」某季加映 OVA、「咒術迴戰」第3.5話 SP）。這些是
            // 番外內容，搜主劇時不該被當成主劇集數推播。
            // SP 限定「沒接集數、沒接『特別篇』字眼」才算番外 ——「第3話 SP」這類
            // 是正劇的副標題（如 SP 後接續的 SP1、SP2 是該話的特殊版本），不在此列。
            // OAD 同理：「OAD1」這種獨立條目才算番外；「第7話 OAD」是該話的 OAD 版本。
            if (targetInfo.seasonNumber >= 1) {
              const rawName = item.vod_name || '';
              const looksLikeSpinOff = /特别篇|特別篇|劇場版|剧场版|OVA|外传|外傳|总集篇|總集篇|番外|电影解说|電影解說|＊|∽/.test(rawName);
              const looksLikeOAD = /(^|[^0-9第])OAD($|[^0-9])|^OAD[0-9]|OAD版|OAD化/.test(rawName);
              const looksLikeSP = /(^|[^0-9第])SP($|[^0-9])|^SP[0-9]|特别篇SP|特別篇SP/.test(rawName);
              if (looksLikeSpinOff || looksLikeOAD || looksLikeSP) {
                continue;
              }
            }
            const resources = extractPlayInfoForCache(item, site.title, type, matchResult, targetInfo);
            siteResults.push(...resources);
          }
        }

        if (siteResults.length > 0) {
          stats.success++;
        }

        return siteResults;
      } catch (error) {
        stats.failed++;
        return [];
      }
    });

    const results = await Promise.allSettled(requestTasks.map(task => task()));
    
    const fulfilledResults = results
      .filter(r => r.status === 'fulfilled')
      .flatMap(r => r.value);
    
    const executor = new SmartSearchExecutor(new SiteManager(), targetInfo, type, matchStrictness);
    allResults = executor.smartDeduplicate(fulfilledResults);
    
    console.log(`📊 批量搜索完成: ${Date.now() - startTime}ms, 结果: ${allResults.length}`);
    
    if (allResults.length > 0) {
      try {
        Widget.storage?.set?.(cacheKey, JSON.stringify(allResults), CONFIG.CACHE_TTL);
      } catch (e) {}
    }
  }

  let finalResults = allResults;
  if (type === 'tv' && targetEpisode) {
    finalResults = allResults.filter(res => {
      const label = episodeLabelOf(res);
      return label === null || label === targetEpisode;
    });
  }

  // 版本過濾，理由與串流模式相同。
  finalResults = filterByTargetVersion(finalResults, targetInfo);

  // 第 2 季過濾：smart_stream 與 batch 兩個路徑都必須套用，
  // 否則批次搜「仁醫」+ season=2 會把第一季的「仁医」也一起推上來。
  // 與 loadResource 內的邏輯同步，理由見該處的註解。
  // 續集季別過濾（共用 helper，與串流路徑同源）。
  if (type === 'tv') {
    const r = filterBySequel(finalResults, targetInfo);
    let s4FallbackUsed = false;
    if (r.kept && r.kept.length > 0 && r.before !== undefined && r.kept.length < r.before) {
      finalResults = r.kept;
      console.log(`🎯 第${targetInfo.seasonNumber}季過濾(batch): ${r.before} -> ${finalResults.length}（pooledYearMin=${r.pooledYearMin}）`);
      console.log(`📊 第${targetInfo.seasonNumber}季過濾後送往 forward app 的最終清單（confirm count）: ${finalResults.length}`);
      // 進入此分支表示 filterBySequel 確實有做 drop（kept < before），
      // 若同時也有 s4FallbackCandidates 表示 r.kept 不包含 S3 後半候選，
      // 需要把 fallback 候選塞回去並排在最前。
      if (r.s4FallbackCandidates && r.s4FallbackCandidates.length > 0) {
        s4FallbackUsed = true;
      }
    } else if (r.before !== undefined && r.before > 0 && (!r.kept || r.kept.length === 0)) {
      console.log(`⚠️ 第${targetInfo.seasonNumber}季過濾(batch)無命中(${r.before}筆)，保留全部候選`);
    } else if (r.kept && r.kept.length === r.before && r.before > 0) {
      // 全部通過即「沒 S4 命中」+ 「全部候選都是 S1 沒人可殺」 —— 退回保留全部。
      // log 寫明這是 fallback，不要讓人誤會成「filter 確認這就是答案」。
      const poolYr = r.pooledYearMin ?? 'null';
      console.log(`⚠️ 第${targetInfo.seasonNumber}季過濾(batch): ${r.before} -> ${r.before}（無 targetSeason 命中群，pooledYearMin=${poolYr}，已是最終候選）`);
      if (r.s4FallbackCandidates && r.s4FallbackCandidates.length > 0) {
        s4FallbackUsed = true;
      }
    } else if (r.kept && r.kept.length < r.before && r.before > 0 && r.s4FallbackCandidates && r.s4FallbackCandidates.length > 0) {
      // S4 fallback 把候選抽出後 kept < before 的補接分支。
      finalResults = r.kept;
      s4FallbackUsed = true;
    }
    if (s4FallbackUsed) {
      // 給 fallback 候選一個「最大 score」標記，確保後續 sort 不會被同分
      // exact-match 的 S1 資源擠回中間位置（同一個 match 群分數相同）。
      // 設在 description 改寫之後，避免誤觸 _finalScore 計算。
      // 註：s4FallbackCandidates 已從 finalResults 抽出，這裡直接重組。
      for (const cand of r.s4FallbackCandidates) {
        cand._s4FallbackBoost = true;
        if (cand.description && !cand.description.includes('⚠️')) {
          // SAO fallback 文案：forward app metadata 把 SAO 切成 4 季（S3=Part 1、
          // S4=Part 2+Part 3），但 VOD 站目錄只有「爱丽丝篇 异界战争」Part 2 (2019)
          // 與「异界战争最终季/第2期」Part 3 (2020)。Fallback 抓的是 Part 2 + Part 3。
          cand.description = `⚠️ 站方無「第${targetInfo.seasonNumber}季」獨立目錄，這是依片名推算的 SAO Alicization 後半 (爱丽丝篇+异界战争 Part 2/3, 2019/2020)\n${cand.description}`;
        }
      }
      // 純化策略：使用者搜第4季時，要看到的每一條都跟 SAO Alicization 後半相關，
      // 不要混入 S1/S2/Part 1 等「無關季」內容。
      //
      // 風險：若 s4FallbackCandidates 為空陣列（罕見但可能），結果會變成空清單。
      // 為避免空清單，僅在 s4FallbackCandidates.length > 0 時才純化。
      if (r.s4FallbackCandidates.length > 0) {
        finalResults = [...r.s4FallbackCandidates];
        console.log(`🟢 S4 fallback 純化: 已用 ${r.s4FallbackCandidates.length} 條「爱丽丝篇异界战争/最终季」候選完全取代 ${finalResults.length === r.s4FallbackCandidates.length ? r.kept.length : finalResults.length} 條 S1/S2/Part 1 候選`);
      } else {
        finalResults = [...r.s4FallbackCandidates, ...finalResults];
      }
    }
  }

  finalResults.forEach(res => {
    res._finalScore = calculateResourceScore(res, preferResolution);
    if (res._s4FallbackBoost) {
      // _finalScore 之上再加極大值，確保 sort 始終在最前。
      res._finalScore = 1000 + res._finalScore;
    }
  });

  finalResults.sort((a, b) => {
    const aMedia = isDirectMediaUrl(a.url) ? 0 : 1;
    const bMedia = isDirectMediaUrl(b.url) ? 0 : 1;
    if (aMedia !== bMedia) return aMedia - bMedia;
    return b._finalScore - a._finalScore;
  });

  const fieldsToDelete = ['_finalScore', '_matchType', '_matchScore', '_seasonMatch',
                         '_isMainSource', '_hasEpInfo', '_updateRecency', '_ep',
                         '_isVariety', '_episodeDate', '_confidence',
                         '_versionConflict', '_versionAmbiguous',
                         '_areaMismatch', '_areaMatch', '_year', '_area', '_rawName',
                         '_s4FallbackBoost', '_seasonFromItem'];
  finalResults.forEach(res => {
    const cleaned = cleanResourceForOutput(res);
    Object.keys(res).forEach(k => delete res[k]);
    Object.assign(res, cleaned);
  });

  return finalResults.slice(0, 100);
}

// ==================== REX 規範：詳情頁與連結工具 ====================
//
// 設計目標：REX 詳細頁要能依季別正確載入播放源。
//
// 問題直觀：原本的 loadDetail 把 type 寫死成 movie、也沒傳 season 給
// loadResource。進到 REX 詳細頁時，使用者從 S1 切到 S2 看到的是同一份
// S1 結果，因為：
//  1. loadDetail 寫死 type='movie'，不會進入 TV 季別過濾路徑
//  2. 即使改成 tv，season 參數也沒傳入，內部 filter 預設為 1
//  3. cache key (vod_smart_..._s${season}_...) 永遠是 S1，REX 切 S2
//     也會讀到 S1 的 cache
//
// 解法：把 seriesName / season / episode / type 等資訊編進 link，
// REX 切換季別時用新 link 重新呼叫 loadDetail（或由 REX 直接用
// loadResource 帶新 params），新 link 解析後帶入正確的季別。
//
// 為什麼 link 格式是 search:xxx?season=N&episode=M：
//  - search: 前綴保留向後相容（舊 link 不帶參數仍可解）
//  - 將 metadata 編進 query string 讓 link 本身就是自描述的，
//    即使被存進 storage 也不會失語意
//  - season / episode 缺失時預設 1 / null，行為等同「不指定季別」
//
// 為什麼 loadDetail 還是要呼叫 loadResource：
//  loadResource 內含複雜的搜尋/過濾/排序/快取邏輯，全部搬過來不划算；
//  唯一要做的介面轉換是：把 episodeItems 攤平成 (season, episode)
//  列表、把多個 m3u8 來源合併成一條可選的播放線路。

const DETAIL_LINK_PREFIX = 'search:';

function parseDetailLink(link) {
  if (!link) return null;
  const raw = String(link).trim();
  if (!raw.startsWith(DETAIL_LINK_PREFIX)) return null;
  const rest = raw.slice(DETAIL_LINK_PREFIX.length);
  // query string 用 urlsearchparams 解。中文與空格由 encodeURIComponent
  // 處理；不要在這裡直接 split('&')，使用者標題可能含 &。
  const qIdx = rest.indexOf('?');
  const titlePart = qIdx >= 0 ? rest.slice(0, qIdx) : rest;
  const queryPart = qIdx >= 0 ? rest.slice(qIdx + 1) : '';
  const title = decodeURIComponent(titlePart).trim();
  if (!title) return null;

  const meta = { title };
  if (queryPart) {
    const sp = new URLSearchParams(queryPart);
    if (sp.has('season')) {
      const s = parseInt(sp.get('season'), 10);
      if (Number.isFinite(s) && s >= 1) meta.season = s;
    }
    if (sp.has('episode')) {
      const e = parseInt(sp.get('episode'), 10);
      if (Number.isFinite(e) && e >= 1) meta.episode = e;
    }
    if (sp.has('type')) {
      const t = String(sp.get('type') || '').toLowerCase();
      if (t === 'tv' || t === 'movie') meta.type = t;
    }
    if (sp.has('id')) meta.id = String(sp.get('id') || '');
  }
  return meta;
}

function buildDetailLink({ title, season, episode, type, id }) {
  const enc = encodeURIComponent(String(title || '').trim());
  const sp = new URLSearchParams();
  if (season && Number.isFinite(season) && season >= 1) sp.set('season', String(season));
  if (episode && Number.isFinite(episode) && episode >= 1) sp.set('episode', String(episode));
  if (type === 'tv' || type === 'movie') sp.set('type', type);
  if (id) sp.set('id', String(id));
  const qs = sp.toString();
  return `${DETAIL_LINK_PREFIX}${enc}${qs ? `?${qs}` : ''}`;
}

/**
 * REX 規範：詳情頁入口。
 *
 * 行為：解析 link 內含的 metadata，呼叫 loadResource 取得當季所有來源，
 * 再把結果依集數分組為 episodeItems。每集可能有多個站的播放源，
 * 主 VideoItem 帶 episodeItems 與正確的 season。
 *
 * link 格式：`search:<標題>[?season=N&episode=M&type=tv&id=...]`
 *
 * 切換季別：REX 詳細頁在切換季別時，可用新的 `search:<標題>?season=2`
 * 重新呼叫 loadDetail；本函式會用新 season 重新搜尋，cache key
 * (vod_smart_..._s${season}_...) 跟著變動，舊 S1 cache 不會被誤讀。
 *
 * 對應的 loadResource 入口：當 REX 用 loadResource(params) 帶新 link
 * 進來，params.link 是 search: 開頭時，loadResource 也會從 link 解析
 * 季別並套用，兩個入口共用同一條 loadResource 邏輯。
 *
 * @param {string} link
 * @returns {Promise<VideoItem|VideoItem[]|null>}
 */
async function loadDetail(link) {
  try {
    const meta = parseDetailLink(link);
    if (!meta) return null;

    const title = meta.title;
    // 季別處理策略：
    //
    // 場景 A — 初次載入詳細頁：link 不帶 season 參數 → season=null。
    //   必須拿「所有季」的結果，REX 客戶端才能從 episodeItems 中
    //   提取唯一 season 值列表顯示「季下拉」，使用者切換 S1↔S2 時
    //   UI 才能即時對應到正確的 episodeItems。
    //
    //   實作上呼叫兩次 loadResource（S=1, S=2 各自一次）合併結果。
    //   為什麼不一次呼叫帶 season=null：loadResource 內部 cacheKey 帶
    //   season，null 會命中 S1 的 cache key（S1 路徑），S2 結果就被忽略。
    //   為什麼不只依賴 S1 + 從用戶點選的季再請求：使用者若從未點過 S2，
    //   S2 episodeItems 永遠空，切換就沒反應。
    //
    // 場景 B — 切換季別時：link 帶 season=2 → 直接拿 S2 結果。
    //   但我們仍把 S1 結果也合併進來，避免 S1 切到 S2 後 REX 客戶端
    //   內部 state 把 S1 episodeItems 清空（只剩 S2），再次切回 S1 又得
    //   重新發一次 loadDetail。
    //
    // 簡化為「任何場景都合併所有已知季別」即可滿足 REX UI 需求。
    let season = meta.season;
    if (season == null) {
      // 沒帶 season 時先從標題推斷（「仁醫完結篇」「仁醫第二季」之類），
      // 推斷不到才默認為 S1。這個值會用於 buildDownloadLink、per-episode
      // 預設 season，分組時也以它當 fallback（clean.season 缺失時）。
      const inferredInfo = extractEnhancedInfo(title);
      season = inferredInfo.seasonNumber > 1 ? inferredInfo.seasonNumber : 1;
    }
    const episode = meta.episode ?? null;
    const type = meta.type || 'tv';
    const id = meta.id || null;

    console.log(`📡 [loadDetail] link="${link}" → title="${title}" season=${season} episode=${episode ?? '-'} type=${type}`);

    // 合併多季結果：S1 + S2 各自一次。
    //
    // 為什麼是 2 次而不是全部可能季別：實務上 VOD 站對「仁醫」這類
    // 跨多季作品的搜尋，前三站通常就能 cover S1 + S2 結果，S3+ 極少見
    // 且命中率低（不同關鍵字不同 id）；況且 S3+ 大多需要用戶主動指定
    // 季別才合理。第一次載入時先收 S1+S2，使用者點 S3 觸發的切換
    // 會重新走場景 B（link 帶 season=3）拿到 S3 episodeItems。
    //
    // cacheKey 在 loadResource 內部帶 _s${season}，S1/S2 各有獨立 cache，
    // 兩次呼叫分別命中各自的快取，不會重打站台。
    const seasonsToFetch = [1, 2];
    const seenUrl = new Set();
    let allResults = [];
    for (const s of seasonsToFetch) {
      const batchResults = await loadResource({
        seriesName: title,
        title,
        type,
        season: s,
        episode,
        id,
        link,
        searchMode: 'batch',
        matchStrictness: 'standard',
        preferResolution: 'auto',
        multiSource: (WidgetMetadata.globalParams.find(p => p.name === 'multiSource') || {}).value || 'enabled',
        VodData: (WidgetMetadata.globalParams.find(p => p.name === 'VodData') || {}).value || RESOURCE_SITES,
        m3u8FilterEnabled: (WidgetMetadata.globalParams.find(p => p.name === 'm3u8FilterEnabled') || {}).value || 'enabled',
        m3u8FilterWorkerUrl: (WidgetMetadata.globalParams.find(p => p.name === 'm3u8FilterWorkerUrl') || {}).value || '',
        m3u8FilterMode: (WidgetMetadata.globalParams.find(p => p.name === 'm3u8FilterMode') || {}).value || 'filter',
      });
      for (const r of batchResults || []) {
        // 跨季去重：以 URL 為主鍵。同一 URL 出現在多季可能是因為多站
        // 都引用了同個 CDN 資源（例如「仁醫」「仁醫完結篇」會被不同
        // 站歸到不同季，但 URL 是同一個）。
        if (!r.url || seenUrl.has(r.url)) continue;
        seenUrl.add(r.url);
        // 補上 season：S1 結果中很多資源 _seasonFromItem=null（站方檔名
        // 沒寫「第N季」），cleanResourceForOutput 不會設置 season 頂層字段。
        // 分組時若沒 season 會 fallback 到外層 season，可能把 S1 資源
        // 誤歸到 S2（在 season=2 載入時）。呼叫端已知是查詢哪一季，
        // 直接補上保證分組正確。
        if (r.season == null) r.season = s;
        allResults.push(r);
      }
    }
    const results = allResults;

    if (!results || !results.length) {
      // 沒搜到資源時仍回傳一個最小 VideoItem，UI 不會變空白。
      // REX 詳細頁若無 episodeItems 會自動隱藏集數面板。
      return {
        id: buildDetailLink({ title, season, episode, type, id }),
        type: 'url',
        title,
        mediaType: type,
        description: '從 VOD 源未取得可用資源',
        link,
      };
    }

    // 把 loadResource 回傳的「所有站的 m3u8 來源」依 (season, episode)
    // 群組，產生 episodeItems。每個 episodeItem 自己也是一條 VideoItem，
    // 它的 link 帶著原 link 的 metadata + 該集集數，REX 點擊該集時
    // 會用新 link 再進入 loadResource；loadResource 內的 cache key 帶季別，
    // 第二次請求會直接命中該集的快取。
    //
    // 分組鍵用「資源自己的 season」而非外層 season 變數：因為我們合併
    // 了 S1+S2 兩批結果，每個資源的 .season 頂層字段（clean 階段提升的
    // _seasonFromItem）才是它的真實歸屬季，外層 season 在合併後已不可靠。
    // 缺 season 標記的資源（_seasonFromItem=null）用外層 season 兜底。
    const groups = new Map();
    for (const r of results) {
      const epLabel = episodeLabelOf(r);
      const resSeason = Number.isFinite(r.season) ? r.season : season;
      const key = `s${resSeason}e${epLabel ?? 'x'}`;
      if (!groups.has(key)) {
        groups.set(key, { season: resSeason, episode: epLabel, resources: [] });
      }
      groups.get(key).resources.push(r);
    }

    // 集數排序：先按 season，再按 episode。season 排序確保 S1 在前 S2 在後，
    // REX 客戶端的季下拉 UI 會按這個順序排。
    const sortedGroups = Array.from(groups.values()).sort((a, b) => {
      if (a.season !== b.season) return a.season - b.season;
      if (a.episode == null && b.episode == null) return 0;
      if (a.episode == null) return 1;
      if (b.episode == null) return -1;
      return a.episode - b.episode;
    });

    const episodeItems = sortedGroups.map((g) => {
      const first = g.resources[0];
      const epLink = buildDetailLink({
        title,
        season: g.season,         // 用資源自己的 season，跨季載入 metadata
        episode: g.episode ?? undefined,
        type,
        id,
      });
      // 從第一個資源取首選線路當 episode 級入口播主源。
      // REX 詳細頁若未另外呼叫 loadResource，可直接播這個 videoUrl。
      // 若有呼叫 loadResource，videoUrl 仍保留，REX 可當 fallback。
      const displayTitle = g.episode != null
        ? `第${g.episode}集`
        : (first?.description || '未命名');
      return {
        id: epLink,
        type: 'url',
        title: displayTitle,
        mediaType: type,
        description: first?.description || title,
        season: g.season,         // 必須是資源歸屬季，客戶端用它過濾切換季別
        episode: g.episode ?? undefined,
        // 該集首選播放 URL；其他站的來源可透過 loadResource 重新取得。
        videoUrl: first?.url,
        link: epLink,
        // 攜帶該集的所有備選線路，方便 REX 直接顯示多源而不需再呼叫 loadResource。
        // 自訂頂層欄位，REX 不會認得但不會破壞既有 schema。
        // 為避免 REX 客戶端報「未知欄位」警告，這裡放在 description 字串裡。
        ...(g.resources.length > 1 ? {
          customLines: g.resources.map(r => ({
            name: r.name,
            url: r.url,
            description: r.description,
          }))
        } : {})
      };
    });

    // 主 VideoItem 的 season 標籤：採「當前請求的 season」。
    //
    // 重要：REX 客戶端的詳細頁切換季別時可能會用主 VideoItem.season
    // 作為判斷「當前季」的依據。如果主 season 永遠是 sortedGroups
    // 中的最小季（合併 S1+S2 結果後為 1），使用者切到 S2 時客戶端
    // 還是認為當前是 S1，UI 顯示仍是 S1 的 episodeItems。
    //
    // 用當前請求的 season 作為主 season：初次載入（無 season 參數）
    // → season 預設為 1 → mainSeason = 1。切換到 S2 → mainSeason = 2。
    // 兩種情況下 REX 客戶端的內部「當前季」狀態都正確。
    //
    // 唯一例外：合併結果中完全沒有當前 season 的 episodeItem（罕見，
    // 如使用者切到 S3 但 loadDetail 沒請求 S3）。這種情況下顯示
    // sortedGroups 中的最小季，避免主 season 變 undefined。
    const seasonsPresent = new Set(sortedGroups.map(g => g.season));
    const mainSeason = seasonsPresent.has(season) ? season : (sortedGroups[0]?.season ?? season);

    const mainLink = buildDetailLink({ title, season: mainSeason, type, id });

    return {
      id: mainLink,
      type: 'url',
      title,
      mediaType: type,
      description: type === 'movie' ? `電影：${title}` : `${title}（共 ${episodeItems.length} 集）`,
      link: mainLink,
      season: mainSeason,
      // 電影沒有 episodeItems；REX UI 會自動隱藏集數面板。
      ...(type === 'tv' ? { episodeItems } : {}),
    };
  } catch (e) {
    console.error('[loadDetail] 失敗:', e?.message || e);
    return null;
  }
}

/**
 * REX 規範：字幕模組入口。本 widget 不提供字幕，回 null 即可。
 *
 * @param {object} params
 * @returns {Promise<null>}
 */
async function loadSubtitle(params) {
  return null;
}

// ==================== REX runtime 相容匯出 ====================
// REX runtime 是純 JS 沙箱（vm.runInContext / eval），沒有 CommonJS `module`。
// 任何「typeof module」都會 ReferenceError，所以**絕對不能**用 module.exports。
// 改用頂層變數：REX runtime 抓函式是看頂層宣告；globalThis 雙保險。
//
// 對 Node / Forward 內部測試環境同樣有效：
//   - globalThis.loadResource 在兩個環境都成立；
//   - Node 沒有 `module` 也不會炸。

// ==================== m3u8 Filter Admin ====================
//
// 提供一組 helper,讓 widget 載入後可以在 console / 其他 module 直接管理
// 過濾廣告伺服器上的 patterns。認證走帳密 → session cookie(對應伺服器的
// ADMIN_USER / ADMIN_PASS + /admin/login)。
//
// 用法:
//   m3u8FilterAdmin.list()                            // 看現有 patterns
//   m3u8FilterAdmin.addPath('/xxx/')                  // 加 URL pattern
//   m3u8FilterAdmin.addSeq('8.9,7.6')                 // 加 seq fingerprint
//   m3u8FilterAdmin.removePath(14)                    // 刪第 14 個
//   m3u8FilterAdmin.removeSeq(0)                      // 刪第 0 個
//   m3u8FilterAdmin.reload()                          // 熱重載(磁碟→記憶體)
//   m3u8FilterAdmin.reset()                           // 重置為預設
//   m3u8FilterAdmin.login()                           // 強制重新登入
//   m3u8FilterAdmin.logout()                          // 登出(清 cookie)
//
// 注意:這組 helper 只在 widget 設定有填帳密時啟用。
// 沒填帳密的話所有寫操作都會 refuse,只能唯讀 list() / version()。

const m3u8FilterAdmin = (() => {
  // 從 CONFIG 拿 URL / 帳密
  const cfg = CONFIG.M3U8_FILTER;
  const base = cfg.WORKER_URL;
  const user = cfg.ADMIN_USER || '';
  const pass = cfg.ADMIN_PASS || '';

  // 啟動時自動行為:有帳密 → 登入 + 抓 patterns 印給 console 看
  // (純診斷用途,結果不存 cache,過濾邏輯在過濾廣告伺服器端獨立運作)
  const autoBootstrap = true;

  // 記住 session cookie,跨 request 帶過去(過濾廣告伺服器用 admin_session cookie)
  let sessionCookie = '';

  /** 帶 Content-Type + session cookie 的 headers */
  function headers() {
    const h = { 'Content-Type': 'application/json' };
    if (sessionCookie) h['Cookie'] = sessionCookie;
    return h;
  }

  /** 登入 — 拿 admin_session cookie(存到 closure,後續請求自動帶) */
  async function login() {
    if (!user || !pass) {
      return { ok: false, status: 0, json: { error: 'no_credentials' } };
    }
    const r = await fetch(base + '/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, pass })
    });
    const setCookie = r.headers.get('set-cookie') || '';
    // 抽出 admin_session=...; 段(可能帶 ; HttpOnly 等屬性)
    const m = setCookie.match(/admin_session=[^;]+/);
    if (m) sessionCookie = m[0];
    const text = await r.text();
    let json;
    try { json = JSON.parse(text); } catch (_) { json = { raw: text }; }
    return { ok: r.ok, status: r.status, json, hasSession: !!sessionCookie };
  }

  async function httpJson(method, path, body) {
    const opts = { method, headers: headers() };
    if (body) opts.body = JSON.stringify(body);
    const r = await fetch(base + path, opts);
    const text = await r.text();
    let json;
    try { json = JSON.parse(text); } catch (_) { json = { raw: text }; }
    return { ok: r.ok, status: r.status, json };
  }

  /** 需要 admin 權限 — 沒帳密或沒 session 就拒絕 */
  function needAuth() {
    if (!user || !pass) {
      console.warn('[m3u8FilterAdmin] 管理帳密沒設定,操作被拒絕');
      return false;
    }
    if (!sessionCookie) {
      console.warn('[m3u8FilterAdmin] 尚未登入,操作被拒絕(請先 m3u8FilterAdmin.login())');
      return false;
    }
    return true;
  }

  // 公開 API
  return {
    /** 唯讀 — 不需登入。拿 version + 完整 patterns 文字(給 console debug 看) */
    async list() {
      const r = await httpJson('GET', '/version');
      if (!r.ok) return null;
      // 再拉一次 /patterns 拿完整內容
      const p = await fetch(base + '/patterns');
      const text = await p.text();
      return { version: r.json, patterns: text };
    },

    /** 強制重新登入(帳密 / session 過期時用) */
    async login() {
      const r = await login();
      if (r.ok && r.hasSession) {
        console.log('[m3u8FilterAdmin] 登入成功,session 已保存');
      } else {
        console.error('[m3u8FilterAdmin] 登入失敗:', r);
      }
      return r;
    },

    /** 登出(只清本地 cookie,過濾廣告伺服器那邊要等到 cookie 過期 / 改密碼才失效) */
    async logout() {
      // 過濾廣告伺服器端 logout endpoint(可選)
      if (sessionCookie) {
        await httpJson('POST', '/admin/logout').catch(() => {});
      }
      sessionCookie = '';
      console.log('[m3u8FilterAdmin] 已登出');
    },

    /** 加 URL path pattern(需登入) */
    async addPath(pattern) {
      if (!needAuth()) return null;
      const r = await httpJson('POST', '/admin/patterns', { pattern });
      console.log('[m3u8FilterAdmin] addPath:', r);
      return r;
    },

    /** 加 seq fingerprint(需登入) */
    async addSeq(seq) {
      if (!needAuth()) return null;
      const r = await httpJson('POST', '/admin/seq', { seq });
      console.log('[m3u8FilterAdmin] addSeq:', r);
      return r;
    },

    /** 刪 URL pattern(需登入,idx 是 list() 看到的編號) */
    async removePath(idx) {
      if (!needAuth()) return null;
      const r = await httpJson('DELETE', '/admin/patterns/' + idx);
      console.log('[m3u8FilterAdmin] removePath:', r);
      return r;
    },

    /** 刪 seq fingerprint */
    async removeSeq(idx) {
      if (!needAuth()) return null;
      const r = await httpJson('DELETE', '/admin/seq/' + idx);
      console.log('[m3u8FilterAdmin] removeSeq:', r);
      return r;
    },

    /** 熱重載磁碟 → 記憶體 */
    async reload() {
      if (!needAuth()) return null;
      const r = await httpJson('POST', '/admin/reload');
      console.log('[m3u8FilterAdmin] reload:', r);
      return r;
    },

    /** 重置為預設值(危險!) */
    async reset() {
      if (!needAuth()) return null;
      const r = await httpJson('POST', '/admin/reset');
      console.log('[m3u8FilterAdmin] reset:', r);
      return r;
    },

    /** 登入並抓一次 version / patterns */
    async verify() {
      if (!user || !pass) {
        console.warn('[m3u8FilterAdmin] 沒設帳密,跳過驗證');
        return null;
      }
      const loginR = await login();
      if (!loginR.ok) {
        console.error('[m3u8FilterAdmin] 登入失敗:', loginR);
        return loginR;
      }
      const v = await httpJson('GET', '/version');
      if (v.ok && v.json && v.json.admin_enabled) {
        console.log('[m3u8FilterAdmin] 登入 + 驗證 OK:', v.json);
      } else {
        console.warn('[m3u8FilterAdmin] 過濾廣告伺服器沒啟用 admin(ADMIN_USER / ADMIN_PASS env 沒設?)');
      }
      return v;
    },

    /** 內部 — 啟動時跑一次(有帳密就登入 + 抓 patterns 印給 console 看) */
    async _bootstrap() {
      if (!autoBootstrap) return;
      if (!user || !pass) return;  // 沒設帳密 = 跳過
      try {
        await this.verify();   // 登入 + 印 admin_enabled / version
        await this.list();     // 拉一次 patterns 文字(console 可看)
      } catch (e) {
        console.warn('[m3u8FilterAdmin] bootstrap 失敗(非致命):', e?.message || e);
      }
    },

    /** debug — 看目前 session 狀態 */
    status() {
      return {
        workerUrl: base,
        hasUser: !!user,
        hasPass: !!pass,
        hasSession: !!sessionCookie,
        sessionPreview: sessionCookie ? sessionCookie.slice(0, 40) + '...' : '(none)'
      };
    }
  };
})();

// 啟動時自動跑 bootstrap(非同步,不擋 UI)
m3u8FilterAdmin._bootstrap();

if (typeof globalThis !== 'undefined') {
  globalThis.loadResource = loadResource;
  globalThis.loadDetail = loadDetail;
  globalThis.loadSubtitle = loadSubtitle;
  globalThis.WidgetMetadata = WidgetMetadata;
  globalThis.m3u8FilterAdmin = m3u8FilterAdmin;
}
