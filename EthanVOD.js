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
 * 台港繁體「異體字」→ 對應簡體字。
 *
 * 為什麼需要（這是搜尋 0 結果的根因）：
 *   上面的對照表來自 zhconv，刻意只收「一一對應、無歧義」的常用字，
 *   因此漏掉了台港地區專用、而 VOD 站目錄只收簡體的那批字。實測：
 *
 *     「咒術迴戰」→ 轉成「咒术迴战」
 *                    ^^^^^^^ 簡體   ^^^^^^^ 還是繁體！
 *     四個 MacCMS 站（dytt/ffzy/rycj/lzi）全部回 0 筆。
 *
 *     「鋼之鍊金術師」→ 「钢之鍊金术师」—— 混體，同樣 0 筆。
 *
 *   只要殘留一個繁體字，關鍵字就不存在於站方的簡體目錄裡 → 零結果。
 *   而 loadDetail 進媒體頁時才第一次搜尋，cache 還是空的，所以使用者
 *   看到的就是「第一次進去沒有資源」；返回上一頁再進時第二次搜尋
 *   命中了 cache 或站方索引，就看起來「第二次就好了」。
 *
 * 為什麼安全：
 *   這組都是「台港用字 → 大陸用字」的固定對應，不存在一對多歧義
 *   （不像 乾/幹 那種），所以雙向寫入不會造成誤轉。
 *   反向（簡→繁）只在顯示層生效，且顯示層本來就要繁體化。
 */
const VARIANT_CHARS = {
  // 台港異體 → 大陸標準簡體
  '迴': '回', '鍊': '炼', '裡': '里', '裏': '里', '臺': '台', '檯': '台',
  '週': '周', '餘': '余', '髮': '发', '佈': '布', '纔': '才', '纔': '才',
  '眾': '众', '傢': '家', '牀': '床', '綫': '线', '絨': '绒', '網': '网',
  '嶽': '岳', '麪': '面', '麵': '面', '祕': '秘', '菸': '烟', '囉': '啰',
  '啟': '启', '剋': '克', '勩': '勚', '囑': '嘱', '彆': '别', '註': '注',
  '讚': '赞', '昇': '升', '誌': '志', '裏': '里', '爲': '为', '牠': '它',
  '衆': '众', '妳': '你', '衹': '只', '祗': '只', '鍾': '钟', '靑': '青',
  '儘': '尽', '顛': '颠', '佈': '布', '睏': '困', '稜': '棱', '糉': '粽',
};
for (const _t of Object.keys(VARIANT_CHARS)) {
  const _s = VARIANT_CHARS[_t];
  // 只補「表裡沒有」的，不覆蓋既有正確映射。
  if (!_tradToSimpMap.has(_t)) _tradToSimpMap.set(_t, _s);
  if (!_simpToTradMap.has(_s)) _simpToTradMap.set(_s, _t);
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

/**
 * 兩個片名的「雙向字元重疊率」，取較小值。
 *
 * 用於空結果安全網（見 performBatchSearch 的 RELAX_ON_EMPTY 分支），
 * 判斷「站方片名與使用者輸入是否其實是同一部片，只是譯名不同」。
 *
 * 取雙向（交集 ÷ 較長者）而非單向的理由：
 *   單向包含會讓短片名被長片名「100% 包含」而全數通過 ——
 *   搜「間諜家家酒」時，任何叫「間諜」的條目都會 100% 命中。
 *   雙向取小值後，「間諜」對「間諜傢傢酒」只有 2/5，會被門檻擋掉。
 *
 * 實測（繁簡正規化後）：
 *   間諜傢傢酒 ↔ 間諜過傢傢   = 4/5 = 0.80  ← 同一部（地區譯名）
 *   間諜傢傢酒 ↔ 間諜        = 2/5 = 0.40  ← 不同部，擋掉
 */
function _charOverlap(a, b) {
  if (!a || !b) return 0;
  const sa = new Set([...a]);
  let common = 0;
  for (const ch of new Set([...b])) if (sa.has(ch)) common++;
  return common / Math.max(sa.size, new Set([...b]).size);
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
  // 5s timeout — storage 卡住不能阻塞 inflightP
  // v2.9.3：改用 _timeoutSignal（setTimeout）而非 microtask busy-loop
  // v2.9.4：直接 await 寫入。storage 是 in-process 同步實作，log 顯示
  // setItem 同一 tick 內完成，不需要 timeout race（舊版的 cancel() 反而
  // 可能在寫入完成前就結束等待）。寫入是 fire-and-forget 呼叫端使用，
  // 這裡的 await 不會阻塞 inflightP。
  try {
    await Promise.resolve(Widget.storage.set(
      cacheKey,
      JSON.stringify({ aliases, ts: Date.now() }),
      CONFIG.TMDB.CACHE_TTL
    )).catch(() => {});
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
 * v2.9.2 新增：啟動時一次性從 storage 預載所有已 cache 的 CN 簡體別名到內存。
 *
 * 目的：cold caller 第一個搜就能命中 in-memory cache（不再等 200ms storage 讀
 * + race 6s TMDB 慢回）。後續 caller 同步命中。
 *
 * 限制：
 *   - 只載入「aliases 內有 CN 簡體」的（v2.8.15 早寫入版本的 stale cache 跳過）
 *   - 啟動時 1 次性載入，新寫入的 entry 由 IIFE 寫入（in-memory + storage）
 *   - storage 讀失敗不影響（內存 cache 仍會由 IIFE 填充）
 */
async function _preloadTmdbAliasCacheFromStorage() {
  if (!Widget?.storage?.keys || !Widget?.storage?.get) return;
  let keys = [];
  try {
    keys = await Widget.storage.keys();
  } catch (e) {
    return;
  }
  if (!Array.isArray(keys) || keys.length === 0) return;
  const aliasKeys = keys.filter(k => typeof k === 'string' && k.startsWith('tmdb_alias_'));
  console.log(`[TMDB-diag] 預載 storage: ${aliasKeys.length} 個 tmdb_alias_* key`);
  let loaded = 0, skipped = 0;
  for (const key of aliasKeys) {
    try {
      const stored = await _readTmdbAliasCache(key);
      if (!stored?.aliases?.length) { skipped++; continue; }
      // 只載入有 CN 簡體的（v2.8.15 早寫入版本會被 quality check 跳過）
      const hasCnSimp = stored.aliases.some(a => {
        const t = String(a || '').trim();
        return /[一-鿿]/.test(t) && convertChinese(t, false) === t;
      });
      if (!hasCnSimp) { skipped++; continue; }
      _tmdbAliasCache.set(key, { aliases: stored.aliases, ts: stored.ts || Date.now() });
      loaded++;
    } catch (e) { skipped++; }
  }
  console.log(`[TMDB-diag] 預載完成: ${loaded} 個有效（${skipped} 跳過）`);
}

/**
 * v2.9.2 新增：清掉 storage 內的 stale tmdb_alias entry
 * （v2.8.15 早寫入但 IIFE 沒覆蓋完成的，只有 baseName + hit 內欄位，無 CN 簡體）。
 *
 * 為什麼要清：cold caller 拿到這種 stale 進 tryExpand → 無 CN 簡體別名 →
 * return false → fallback。預先清掉可讓 cold caller 直接走 TMDB 完整路徑。
 */
async function _purgeStaleTmdbAliasCache() {
  if (!Widget?.storage?.keys) return;
  let keys = [];
  try {
    keys = await Widget.storage.keys();
  } catch (e) {
    return;
  }
  if (!Array.isArray(keys) || keys.length === 0) return;
  const aliasKeys = keys.filter(k => typeof k === 'string' && k.startsWith('tmdb_alias_'));
  let purged = 0;
  for (const key of aliasKeys) {
    try {
      const stored = await _readTmdbAliasCache(key);
      if (!stored?.aliases?.length) continue;
      const hasCnSimp = stored.aliases.some(a => {
        const t = String(a || '').trim();
        return /[一-鿿]/.test(t) && convertChinese(t, false) === t;
      });
      if (!hasCnSimp) {
        // stale — 刪除
        try { await Widget.storage.delete(key); } catch (_) {}
        purged++;
      }
    } catch (_) {}
  }
  console.log(`[TMDB-diag] 清除 stale tmdb_alias: ${purged} 個`);
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
// ────────────────────────────────────────────────────────────────────
// v2.9.3 關鍵修正：不要再用「無限排 microtask」當計時器。
//
// 舊做法（busy-loop）：
//     const tick = () => {
//       if (Date.now() - start >= maxMs) return resolve();
//       Promise.resolve().then(tick);   // ← 無限自我排隊
//     };
//
// 這會造成 **microtask starvation**：JS 引擎在進入下一個 macrotask
// （也就是網路 I/O 的回調）之前，會先把 microtask queue 清空。這個無限
// 鏈讓引擎永遠排不到 I/O 回應，於是 `Widget.http.get` 的 resolve 被餓死。
//
// 實測證據（端點本身很快，用 curl 量）：
//     search/tv            ~0.9s
//     alternative_titles   ~0.9s
// 但 busy-loop 版本在 Forward 內量到 5.0s / 17.0s，且 race 一定 timeout。
//
// 正確做法：**事件驅動 + 單次真正的 timeout**，不要輪詢。
// 這裡用 setTimeout（Forward 有），並保留 microtask fallback。
// ────────────────────────────────────────────────────────────────────
function _defer(fn, delayMs) {
  // 首選 setTimeout：會讓出事件迴圈，I/O 回調才排得進來。
  if (typeof setTimeout === 'function') {
    try { return new Promise(resolve => setTimeout(() => { try { resolve(fn()); } catch (e) { /* 忽略 */ } }, Math.max(0, delayMs || 0))); }
    catch (e) { /* 落到 microtask */ }
  }
  // 沒有 setTimeout 的環境：退化成 microtask（單次，不 busy-loop）。
  try { return Promise.resolve().then(fn); }
  catch (e) { return Promise.resolve(fn); }
}

/**
 * 建立一個「會自己到點 resolve」的 timeout promise。
 * 用 setTimeout（讓出事件迴圈），不會像 busy-loop 那樣餓死 I/O。
 * 回傳 { promise, cancel }，cancel 可在提早 resolve 時清掉計時器避免洩漏。
 */
function _timeoutSignal(ms) {
  let timer = null;
  let settled = false;
  let resolveFn = null;
  const promise = new Promise((resolve) => {
    resolveFn = (v) => {
      if (settled) return;
      settled = true;
      if (timer !== null) { try { clearTimeout(timer); } catch (e) {} timer = null; }
      resolve(v);
    };
    if (typeof setTimeout === 'function') {
      try { timer = setTimeout(() => resolveFn(undefined), ms); return; }
      catch (e) { timer = null; }
    }
    // 沒有 setTimeout：永遠 pending。**絕對不能用 microtask 假裝計時**。
    //
    // v2.9.4 修掉 v2.9.3 缺陷：v2.9.3 在此用「有限 microtask 鏈」當退場計時器，
    // 實測 `timeoutP fired after 0ms` —— N 個 microtask 會在**同一個 tick 內
    // 連續跑完**，`Date.now()` 幾乎沒前進，tick 計數先達標 → timeout 立刻
    // resolve → race 0ms 結束 → caller 永遠拿不到別名（搜尋永遠 0 筆）。
    //
    // microtask 排程無法模擬「經過 N 毫秒」，任何基於它的 deadline 都是假的。
    // 沒有 setTimeout 就不假裝計時：timeout 永遠 pending，race 由
    // inflightDoneP 收尾（search 本身有 REQUEST_TIMEOUT 保護，不會真的卡死）。
    console.log('[TMDB-diag] 無 setTimeout，timeout 降級為 pending（由 inflight 或 http timeout 收尾）');
  });
  return { promise, cancel: () => resolveFn(undefined) };
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

  // 3. 讀 storage
  //
  // v2.9.4：直接 await，不用 timeout race。
  //
  // 為什麼不需要 timeout：Forward 的 storage 是 in-process 同步實作，
  // log 顯示每次 getItem 都在同一個 tick 內完成。若它真的卡住，那本來
  // 就會卡住整條流程，加 timeout 也救不了（而且舊版的 cancel() 反而會
  // 在 storage 回來之前就讓 race 結束 → 讀不到 cache）。
  if (Widget?.storage?.get) {
    try {
      const stored = await _readTmdbAliasCache(cacheKey);
      if (stored?.aliases?.length) {
        // 品質檢查：只有 1 個別名，或無 CN 簡體別名的 storage cache 視為 stale —
        // 那是 v2.8.15 之後「早寫入但 IIFE 未覆蓋」或舊版本只拿 hit 內欄位的產物
        // （無 CN/HK 多地區別名）。對中文劇來說等同無用，繼續走第 4 步 fetch。
        const hasCnSimp = stored.aliases.some(a => {
          const t = String(a || '').trim();
          return /[一-鿿]/.test(t) && convertChinese(t, false) === t;
        });
        if (stored.aliases.length < 2 || !hasCnSimp) {
          console.log(`[TMDB-diag] storage cache stale (n=${stored.aliases.length}, hasCnSimp=${hasCnSimp}): "${stored.aliases.join(', ')}"，重新 fetch`);
        } else {
          console.log(`[TMDB-diag] ✓ storage cache hit (n=${stored.aliases.length}): ${JSON.stringify(stored.aliases)}`);
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

  // Race：in-flight 完成（含 CN 別名已寫入 cache）vs 整體 timeout。
  //
  // v2.9.3 修法：拿掉 cacheWatchP / timeoutP 兩個「無限排 microtask」的
  // busy-loop。舊版會造成 microtask starvation：引擎在處理下一個 macrotask
  // （= 網路 I/O 回調）前必須清空 microtask queue，而無限鏈讓它永遠清不空，
  // 導致 Widget.http.get 的 resolve 被餓死。
  // 實測證據（curl 量同一組端點）：search 0.9s、alternative_titles 0.9s；
  // 但 busy-loop 版本在 Forward 內量到 12s / 5s，race 必然 timeout。
  //
  // 新版純事件驅動：
  //   - inflightDoneP：_fetchTMDBAliasesAsync 完成後讀 cache.aliases
  //     （IIFE 保證 resolve 前已寫入含 CN 的 cache）
  //   - timeoutP：單一 setTimeout（讓出事件迴圈，I/O 才排得進來）
  //
  // v2.9.4：Forward runtime 實際上沒有 setTimeout，_timeoutSignal 的
  // fallback 是「永不 resolve」。v2.9.3 那個 microtask 計數器因為 N 個
  // microtask 在同一 tick 內跑完，deadline 是假的 → 實測 `timeoutP fired
  // after 0ms` → race 0ms 結束 → caller 拿不到別名 → 搜尋 0 筆。
  //
  // 現在：沒有 setTimeout 時 timeout 永不觸發，完全交給 inflightP 收尾；
  // inflightP 內 Widget.http.get 自帶 REQUEST_TIMEOUT（2500ms），
  // 所以最壞 ~2.5s 一定返回 —— 不卡死，也不餓死 I/O。
  const startTs = Date.now();
  const timeoutSig = _timeoutSignal(maxWaitMs);
  const timeoutP = timeoutSig.promise.then(() => {
    console.log(`[TMDB-diag] getTMDBAliasesBlocking: timeoutP fired after ${Date.now() - startTs}ms`);
    return { kind: 'timeout', aliases: [] };
  });
  // cacheWatchP 已刪除（v2.9.3）：原本用無限 microtask busy-loop 輪詢 cache，
  // 會 microtask starvation 餓死網路 I/O。其用途（等 cache 有 CN 別名）已被
  // inflightDoneP 完全涵蓋 —— IIFE 保證 inflightP resolve 前 cache 已寫入含 CN。
  const inflightDoneP = inflightP.then(() => {
    const a = (_tmdbAliasCache.get(cacheKey)?.aliases) || [];
    console.log(`[TMDB-diag] inflightDoneP: inflight done after ${Date.now() - startTs}ms, cache.aliases=${a.length}`);
    return { kind: 'inflight', aliases: a };
  }).catch((e) => {
    console.log(`[TMDB-diag] inflightDoneP: rejected after ${Date.now() - startTs}ms: ${e?.message || e}`);
    return { kind: 'inflight', aliases: [] };
  });

  const result = await Promise.race([inflightDoneP, timeoutP]);
  // race 已定案 → 清掉 timeout 計時器，避免留下無用的 pending timer
  timeoutSig.cancel();
  if (CONFIG.TMDB.VERBOSE) {
    console.log(`[TMDB-diag] getTMDBAliasesBlocking result: kind=${result.kind}, n=${result.aliases.length}, elapsed=${Date.now() - startTs}ms`);
  }
  return (result && result.aliases) || [];
}

async function _fetchTMDBAliasesAsync(baseName, type, cacheKey) {
  const apiKey = CONFIG.TMDB.API_KEY;
  if (!apiKey) return;

  // 第一步：search 找 tmdb id。
  //
  // v2.9.3：同時打 zh-CN + zh-TW 兩個 search。
  //
  // 為什麼要 zh-CN：實測 `search/tv?query=陰屍路&language=zh-CN` 直接回
  // `name=行尸走肉`（簡體）—— 正是我們要的 CN 別名；而 zh-TW 只回繁體。
  // 有了 zh-CN 結果就能寫 cache 給 caller，**不必再等 alternative_titles**
  // （那一步在 Forward 內實測要 5s，是整體延遲的大頭）。
  //
  // 失敗時退回單一 zh-TW search（維持相容）。
  const searchUrlBase = (lang) =>
    `https://api.themoviedb.org/3/search/${type === 'movie' ? 'movie' : 'tv'}` +
    `?api_key=${encodeURIComponent(apiKey)}` +
    `&query=${encodeURIComponent(baseName)}` +
    `&language=${encodeURIComponent(lang)}`;
  const searchUrl = searchUrlBase(CONFIG.TMDB.SEARCH_LANGUAGE || 'zh-TW');
  const searchUrlCn = searchUrlBase(CONFIG.TMDB.SEARCH_LANGUAGE_CN || 'zh-CN');

  let searchData;
  let resp;
  try {
    // zh-CN 與 zh-TW 並行打：zh-CN 拿到結果就不用等 zh-TW（省一輪 RTT）
    const cnP = Widget.http.get(searchUrlCn, {
      timeout: CONFIG.TMDB.REQUEST_TIMEOUT,
      headers: { 'Accept': 'application/json' }
    }).then(_unwrapHttpResponse).catch((e) => {
      console.log(`[TMDB-diag] zh-CN search EXCEPTION: ${e?.message || e}`);
      return null;
    });
    const cnData = await cnP;
    if (cnData?.results?.length) {
      searchData = cnData;
      resp = { __zhCn: true };
      console.log(`[TMDB-diag] zh-CN search hit n=${cnData.results.length}（不需等 alternative_titles）`);
    } else {
      resp = await Widget.http.get(searchUrl, {
        timeout: CONFIG.TMDB.REQUEST_TIMEOUT,
        headers: { 'Accept': 'application/json' }
      });
    }
    // v25 patch 3：Forward 的 Widget.http.get 回傳值有三種可能：
    //   (1) 已自動 parse 的 object    → { results: [...] }
    //   (2) string body               → 要 safeJsonParse
    //   (3) Forward 包裝 { headers, statusCode, data } → data 是 payload (string 或 object)
    // 沒做 unwrap 時 results 會 undefined 然後被當成「無搜尋結果」靜默退出。
    //
    // 診斷 log（v25 patch 4，永遠印，不只在 VERBOSE 下）— 確認 Forward
    // response 真實結構，方便往後 debug。
    //
    // v2.9.3：zh-CN 命中時 searchData 已就緒，resp 是佔位物件 → 跳過這段診斷
    if (!searchData) {
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
    }
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

  // v2.9.3：若 hit 內已經有「簡體中文」別名（例如 zh-CN search 回的
  // name=行尸走肉），把它排到 aliases 最前面 —— tryExpand 取第一個符合
  // 條件的別名，排前面才能立刻被選中，不必等 alternative_titles。
  const firstSimpIdx = aliases.findIndex(a => {
    const t = String(a || '').trim();
    return /[一-鿿]/.test(t) && convertChinese(t, false) === t;
  });
  if (firstSimpIdx > 0) {
    const simp = aliases.splice(firstSimpIdx, 1)[0];
    aliases.unshift(simp);
  }

  // v2.8.15 修法：早寫入 + fire-and-forget IIFE + inflightP 等 IIFE 寫完 cache
  //
  // v2.8.14 inline await 整個流程 30s+：search 就要 20s，alt_titles 雖然 2ms
  // 但 inline await 串行等 20s 後才進 alt_titles → 寫 cache → inflightP
  // resolve。Caller 30s 拿不到別名。
  //
  // v2.8.15 改回 fire-and-forget 但保證 inflightP resolve 在 IIFE 寫完 cache 後：
  //   1. search 拿到 hit 立即早寫入 cache（hit 內欄位，無 CN）
  //   2. 啟動 IIFE：拿 alt_titles → 篩 CN → 覆蓋 cache → storage
  //   3. inflightP = IIFE 的 promise。inflightP resolve 必在 cache 覆蓋後
  //   4. inflightDoneP 等 inflightP resolve 拿 cache.aliases → 一定有 CN
  //
  // 為什麼只取 CN：VOD 站都是簡體中文，HK/TW/SG 繁體別名站方字典不認。
  // ALT_TITLE_REGIONS 改為 ['CN'] 後，cache 內就只會有 CN 別名，tryExpand
  // 拿第一個非空 CN 別名就對。

  // 早寫入：search 拿到 hit 立即寫入 cache（至少 2 個，baseName
  // + hit.name + original_name）。這讓 race 2~3s 內 caller 至少能拿到
  // 早期別名（沒 CN 但有 baseName 繁簡變體），alt_titles background 跑
  // 完再覆蓋。
  console.log(`[TMDB-diag] 早寫入 cache，n=${aliases.length}: ${JSON.stringify(aliases)}`);
  _tmdbAliasCache.set(cacheKey, { aliases: [...aliases], ts: Date.now() });
  _tmdbAliasRecent.set(cacheKey, { aliases: [...aliases], ts: Date.now() });
  _enforceTmdbAliasCacheLimit();
  _storeTmdbAliasCache(cacheKey, [...aliases]).catch(() => {});

  // v2.9.3 短路：已經有簡體中文別名時，**不等** alternative_titles 就 return。
  //
  // 理由：alt_titles 在 Forward 內實測要 ~5s（curl 只要 0.9s，差額來自
  // busy-loop 造成的 I/O starvation）。既然 zh-CN search 已給了可用的簡體
  // 別名，等 alt_titles 只會延遲 caller，沒有實質收益。
  const hasSimpNow = aliases.some(a => {
    const t = String(a || '').trim();
    return /[一-鿿]/.test(t) && convertChinese(t, false) === t;
  });
  if (hasSimpNow) {
    console.log(`[TMDB-diag] ✓ hit 已含簡體別名，略過 alternative_titles（省 ~5s）`);
    return;
  }

  const altUrl = `https://api.themoviedb.org/3/${type === 'movie' ? 'movie' : 'tv'}/${tmdbId}/` +
    `alternative_titles?api_key=${encodeURIComponent(apiKey)}`;

  // IIFE：fire-and-forget 拿 alt_titles，覆蓋 cache。inflightP resolve
  // 必在 cache 覆蓋後，inflightDoneP 拿到的 cache.aliases 一定有 CN。
  const inflightP = (async () => {
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

      // 篩選 CN 別名（v2.8.14 簡化：只取 CN）。CN 別名本身就是簡體中文，
      // tryExpand 內的 convertChinese 簡體化判斷會放行，VOD 站字典能認。
      const regions = CONFIG.TMDB.ALT_TITLE_REGIONS || ['CN'];
      const regionSet = new Set(regions);
      const cnTitles = [];
      for (const t of titles) {
        if (!t?.title) continue;
        const title = String(t.title).trim();
        if (!title) continue;
        const region = String(t.iso_3166_1 || '').toUpperCase();
        if (!regionSet.has(region)) continue;
        cnTitles.push(title);
      }
      console.log(`[TMDB-diag] CN titles count=${cnTitles.length}: ${JSON.stringify(cnTitles)}`);

      // 合併：CN 別名放最前面，hit 內欄位放後面
      const finalAliases = [];
      const seenLocal = new Set();
      for (const title of cnTitles) {
        const tn = normalizeForMatching(title);
        if (seenLocal.has(tn)) continue;
        seenLocal.add(tn);
        finalAliases.push(title);
      }
      for (const a of aliases) {
        const tn = normalizeForMatching(a);
        if (seenLocal.has(tn)) continue;
        seenLocal.add(tn);
        finalAliases.push(a);
      }

      if (finalAliases.length === 0) {
        console.log(`[TMDB-diag] alt_titles 回但無 CN 別名（已早寫入 ${aliases.length} 個）`);
        return;
      }

      // 覆蓋內存 + storage（storage 寫 fire-and-forget，inflightP 立即 resolve）
      console.log(`[TMDB-diag] IIFE 覆蓋 cache，finalAliases=${JSON.stringify(finalAliases)}`);
      try {
        _tmdbAliasCache.set(cacheKey, { aliases: finalAliases, ts: Date.now() });
        _tmdbAliasRecent.set(cacheKey, { aliases: finalAliases, ts: Date.now() });
      } catch (e) {
        console.log(`[TMDB-diag] 寫 cache 失敗: ${e?.message || e}`);
      }
      const cachedAfterSet = _tmdbAliasCache.get(cacheKey);
      console.log(`[TMDB-diag] IIFE 寫入後 cache 確認：${JSON.stringify(cachedAfterSet?.aliases || [])} (n=${cachedAfterSet?.aliases?.length})`);
      _enforceTmdbAliasCacheLimit();
      // v2.9.2：storage 寫 fire-and-forget，inflightP 立即 resolve。
      // race 6s 內 caller 拿得到完整 CN 別名。storage 寫失敗不影響功能。
      _storeTmdbAliasCache(cacheKey, finalAliases).catch(() => {});

      console.log(`[TMDB-diag] ✓ "${baseName}" → ${finalAliases.length} 別名:`, finalAliases);
    } catch (e) {
      console.log(`[TMDB-diag] IIFE EXCEPTION: ${e?.message || e}`);
    }
  })();

  return inflightP;
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

// 中文數字映射（單字，保留給舊呼叫端相容；複合數字請用 parseChineseNumeral）
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
  // 從 6000 縮到 4000：搭配下方 SUFFICIENT_SITE_COUNT=3 與 adapter hard=4500
  // 形成「快站先收尾」鏈式提早返回。MacCMS 站 search 端點實測 p50 ≈ 1.2s、
  // p90 ≈ 2.5s，4s 足以覆蓋絕大多數健康站；逾時的站本來就要靠 SUFFICIENT_SITE_COUNT
  // 早收，重試只是拖累。功能完全一致，只是慢站更早被放棄。
  REQUEST_TIMEOUT: 4000,
  // 實測延遲不穩定的站（愛蛋 8 次取樣：2.0~10.0 秒，中位數 4.3 秒，
  // 約三分之一超過 6 秒）。用一般逾時會讓它經常半路被砍，
  // 每次失敗還要拖住整批等待。給它專屬的寬裕逾時。
  // 從 9000 縮到 7000：lovedan.net 站實測 p90 ≈ 5s；7s 已覆蓋慢尾，
  // 比原 9s 省 2s。仍可涵蓋 99% 健康場景。
  SLOW_SITE_TIMEOUT: 7000,
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
  // bump 到 27：新增「簽名型站 adapter」管線（ADAPTER_SITES / CONFIG.ADAPTERS）。
  // 這條管線與既有 MacCMS 來源完全並行：adapter 產出的 item 會被偽裝成
  // MacCMS 欄位，因此下游去重 / 年份季別過濾 / m3u8 wrap 全部共用同一套
  // 邏輯。extractPlayInfoForCache 改為 async（新增 adapter 分支會 await
  // 換 URL），舊 cache 內的結果格式雖仍可讀，但 adapter 的延遲 token
  // 不可跨版本重用，故一併清掉。
  // bump 到 28：修正「切換集數後結果沒變」的三個根因。
  // (1) performBatchSearch 的 cacheKey 漏了 episode —— 串流模式本來就有
  //     _e${targetEpisode}，只有 batch 漏了。adapter 的結果是綁定集數的
  //     （回傳的是「當下那一集」換來的 m3u8），所以 ep=1 的結果被 ep=5
  //     讀回去，使用者切集後看到第 1 集。MacCMS 站不會中招，因為它們一次
  //     回傳全部集數的連結。
  // (2) adapter 只接在 performBatchSearch，串流模式（SmartSearchExecutor）
  //     完全沒去問它 —— 選「智慧流式」時金牌影視整個不存在。而且即使接上，
  //     也必須在 search() 尾端 await：MacCMS 站組常常在幾百 ms 內就達到
  //     SUFFICIENT_SITE_COUNT 而提前返回，那時 adapter 還在飛。
  // (3) 目標集不存在時（如跳到第 9999 集而站方只有 46 集），fallback 到
  //     最後一集後照實回報 episode=46，會被後段 filterByEpisode 以
  //     「46 !== 9999」殺掉整條資源。現在標記 _adapterFallbackEp 並回報
  //     目標集數，真實集數留在 _epActualEp。
  // bump 到 29：修正 adapter 站的顯示格式。
  // (1) 不顯示評分。原來 _adapterDefaultSearch 把豆瓣分塞進 vod_remarks，
  //     而 vod_remarks 在 MacCMS 慣例裡是「狀態標記」的位置，會直接被
  //     拼在片名後面 —— 實測輸出「慶餘年1．3．7.9」，7.9 排在集數旁邊
  //     極像另一個集號。改用站方本來就有的 vodRemarks（"(36全)"），
  //     並在顯示層加 _adapterSafeRemark 二次過濾。
  // (2) 集數補「第x集」。簽名站的 episodeList 只給純數字（"3"），
  //     與 MacCMS 站的「第03集」並排顯示時突兀且難以辨識。
  // (3) 順手收斂 movie：電影不該顯示「第01集」，也不該帶更新集數。
  // bump 到 30：季別也補上「第N季」(_adapterSeasonLabel)。
  // 簽名站的 vodName 用「庆余年2」「乡村爱情9」這種裸序號表示續集，
  // 跟 MacCMS 站的「人民的名义第二季」並排不統一，且容易被誤讀成片名。
  // 三道閘門避免誤傷：站方已寫季別字樣就不動；序號交給 extractSequelNumber
  // 判定（因此「寻秦记2018」的年份、「1917」這種數字片名都不會被當季別）；
  // 序號為 1 代表原作也不加。只影響 description，比對邏輯仍吃原始 vod_name。
  // bump 到 31：版本標記「[2019年 - 國語]」改為獨立成行。
  // 原本接在描述後面同一行（中間一個半形空白），方括號與片名的中點
  // 混在同一段，掃過一整列時難以一眼分辨哪個是片名、哪個是版本註記。
  // 順帶修掉兩個相關缺陷：
  //   - adapter 資源沒帶 _year / _area，導致金牌影視是唯一沒有版本
  //     標記的來源（同樣搜慶餘年，其他站都帶著）。
  //   - areaLabel 對未正規化的地區字串直接原樣輸出，簽名站的简体
  //     「中国大陆」會變成全站唯一的簡體字串；改走 toDisplayText。
  // bump 到 32：新增「簽名型來源走不走廣告過濾」開關 (m3u8FilterAdapterMode)。
  // 金牌影視 / jpyy 這類站的 m3u8 是自己簽發的延遲 token，串流本身沒有
  // 廣告片頭，讓它們繞過濾廣告伺服器純粹白繞（多一次往返、拉長啟動時間）。
  // 預設 'skip'；與全站總開關 m3u8FilterEnabled 分層，可獨立控制。
  // bump 到 33：新增第二個簽名型來源「AGE動漫」(agedm)。
  // 動畫專站，內容與金牌影視不重疊（AGE 查不到真人劇、金牌查不到動畫番），
  // 所以 adapterSiteLimit 預設從 1 調到 2。
  //
  // 順帶修掉兩個只有 AGE 才會踩到的框架缺陷：
  //   - parseInt(episodes[idx].name) 假設集數名是純數字，但 AGE 是
  //     「第195集」「HD中字」「正片」→ NaN，episode 變空值會讓這條
  //     來源在選集時消失。
  //   - AGE 的 playlists 結構是「來源 → 集數」而非「集數 → 來源」，
  //     不轉置的話一部單集電影會變成 5-7 集（每個來源算一集）。
  //
  // bump 到 34：統一 adapter 集數解析 + 併發去重。
  //   - 新增 _adapterEpNumber，集數名解析只留一份實作，修正「顯示第2集
  //     但 episode 欄位是 1」的前後矛盾。
  //   - _adapterGet 加入 inflight 去重，同一個 detail 不再重複送出
  //     （原本同一秒送 5~6 次，導致 api.agedm.io 回 429）。
  //
  // bump 到 35：adapter 搜尋路徑全面併發化（純效能，輸出不變）。
  //   原本三處都是「for 迴圈內 await」：
  //     - _adapterSearch 抓詳情頁
  //     - smart_stream 的 extractPlayInfoForCache
  //     - batch 路徑的 extractPlayInfoForCache
  //   每處都是多跳網路鏈，串起來會超過串流模式的 hard 上限，
  //   導致整個 adapter 來源被靜靜丟棄。改用 _adapterPool（併發上限 4，
  //   見 ADAPTERS.DETAIL_CONCURRENCY），實測 3.6s → 0.31s。
  // bump 到 36：補上 Forward 契約必填欄位 id / type / title。
  // 實測症狀：DecodingError.dataCorrupted: Data was corrupted.
  // Path: [0].id. Debug description: Invalid id format —— Swift runtime 把
  // loadResource 回傳的陣列解碼成 VideoItemChild，該型別要求 id 必填，
  // 而舊輸出只有 name/description/url，整批結果在 UI 載入失敗。
  // 同時修正三處資料正確性：規則 0/3.8 補 `＊` 外傳標記、adapter 路徑
  // 補 sub-series 過濾（MacCMS 迴圈有、adapter 分支沒有）、_adapterSafeRemark
  // 過濾「第12集(完結)」這種帶尾綴的重複標記。cache schema 變更必須 bump，
  // 否則舊 cache 讀回來仍沒有 id，decode 錯誤不會消失。
  // bump 到 37：純效能最佳化，不改變任何輸出內容。
  //   (1) /detail 端點加 30s 短 TTL 快取 —— 同一次搜尋對同一 vodId 會打兩次
  //       detail（一次取播放清單、一次取 vip 前綴），原本第二次必定重新下載，
  //       實測單獨就佔 1.3 秒。只快取 player_jx 前綴這種非短效資料，
  //       播放 token 不走這條路徑，所以結果與原本逐位元組相同。
  //   (2) adapter 各站由「逐站 await」改為併發（_adapterPool），總時間
  //       從 sum(各站) 變成 max(各站)。
  //   (3) _agePlayUrls 逐來源循序試改成併發發出、依序取第一個成功，
  //       輸出順序與結果與原本完全相同。
  //   (4) TMDB 別名擴充原本每次搜尋跑兩次（loadResource + 下游路徑各一次），
  //       改成上游算完把 query 傳給下游，只跑一次。
  // cache 內容格式未變，但因 (4) 改變了搜尋 query 的來源，仍需 bump 一次
  // 讓舊 cache 清掉，避免使用者拿到舊別名邏輯的結果。
  //
  // bump 到 38：修「第一次進媒體頁顯示沒有資源、返回再進才有」。
  //   這是搜尋關鍵字本身的兩個缺陷，不是速度問題：
  //   (1) 繁簡對照表（zhconv）刻意只收無歧義的一對一字，漏掉台港
  //       專用異體字 → 轉出混體關鍵字，站台根本沒這個名字。
  //       實測「咒術迴戰」→「咒术迴战」（殘留「迴」），四站全 0 筆。
  //       修法：新增 VARIANT_CHARS（迴→回、鍊→炼、裡→里…）。
  //   (2) 即使關鍵字正確，地區譯名差異仍會讓字面比對全數否決。
  //       實測「間諜家家酒」(台) vs 站方「间谍过家家」(陸)：
  //       正規化後「間諜傢傢酒」/「間僜過傢傢」互不包含 → standard → 0 筆。
  //       修法：新增 RELAX_ON_EMPTY 空結果安全網 —— 只在整批篩選後
  //       0 筆時，用字元重疊率(≥0.6)放寬重試一次。正常搜得到時
  //       行為完全不變，仍然嚴格比對。
  //   實測三個片名由 0 筆恢復為：咒術迴戰 47 集、間諜家家酒 12 集、
  //   鋼之鍊金術師 51 集。
  //   bump 到 39：語言版本（粵語/國語）從 1 維。
  //   去重鍵新增語言維度 + 版本標記顯示語言，舊 cache 裡缺這個維度，
  //   會讓已合併掉的語言版本永遠補不回來（只會繼續維持合併狀態）。
  //   必須清掉重搜，否則使用者看不到粵語/國語兩版。
  //   bump 到 40：adapterSiteLimit 從 input 改成 enumeration。
  //   舊 input 欄位在 Forward 客戶端有「使用者輸入的值可能沒存進
  //   WidgetMetadata.globalParams」的現象（解讀為空字串 → 退回預設 2），
  //   導致設 1 仍然查到 AGE。改 enum 強制只能存 "1" / "2" 後，
  //   問題從設定層消失，但舊 cache 內可能還存著「上一次設定為 2 時
  //   抓到的 AGE 結果」—— 直接讀出來仍會看到 AGE。bump 版本強迫
  //   syncWidgetVersion 清掉全部 cache，下次搜會依新設定只查金牌。
  // bump 到 48：修正 REX 詳細頁「切季不換內容」。
  //   REX 切季不是靠 loadDetail，而是走 stream 模組重新呼叫
  //   loadResource（REX 客戶端二進位的 stage=resources.route
  //   stream=%{bool}d season=%ld episode=%ld 明確記錄了這條路徑）。
  //   兩根因：
  //   (1) 「未指定季別」原本用 `params.season == null` 判斷，但 REX 的
  //       參數型別是 season?: string，未選季時傳的是**空字串**而非省略
  //       欄位。空字串對 == null 而言是「已指定」→ link 裡的 season=2
  //       被忽略 → 整批結果退回 S1。實測：同一組參數在修正前回 S1 的
  //       31 筆，修正後回 S2 第 3 集（4 筆，season=2）。
  //   (2) type 只認 params.type，但 REX 二進位裡 mediaType 與 type
  //       兩種寫法並存，只認 type 會讓某些呼叫點的 type 落到預設 'tv'
  //       （電影被當影集搜，結果是空）。
  //   兩者都屬「輸入解析」層修正，不改變任何輸出內容，cache 內容格式
  //   也不變 —— 但舊 cache 內的 S1 結果正是 bug 症狀，bump 版本讓
  //   syncWidgetVersion 清掉重搜。
  //
  // bump 到 49：補上 loadResource 輸出的 link 欄位（真正的根因修法）。
  //   前一版（48）修的是「參數解析」：REX 若帶了 season=2 就能拿對。
  //   但 REX 切季時**不一定**帶 season 參數 —— 它帶的是「上一層
  //   傳下來的 link」。而我們的 loadResource 輸出**完全沒有 link 欄位**
  //   （Forward 契約 video.d.ts 的 VideoItemChild.link 是必填字串，
  //   我們一直沒給），所以 REX 手上沒有可帶季別的載體 → 切季時
  //   季別只能是「未指定」→ widget 端自然回第一季。
  //
  //   這一版讓 loadResource 的每筆結果都帶 link：
  //     search:<片名>?season=<N>&episode=<M>&type=<tv|movie>
  //   季別取自 clean.season（clean 階段提升後的頂層欄位，單一真相），
  //   集數取自 clean.episode。cache 命中路徑（繞過 cleanResourceForOutput）
  //   另外就地補 link，避免舊 cache 讀回來永遠缺欄位。
  //
  //   ★ 這也解釋了「有些劇可以切、有些不行」：
  //     站方檔名帶季別（「仁醫 第2季 完結篇」）時，該筆結果的
  //     _seasonFromItem 推得出季別，切季就正常；檔名沒季別
  //     （「白粉飛」）的結果就掉回 S1 —— 同一個 bug 落在不同劇上
  //     症狀看起來不一樣。
  //
  //   ★ 不影響既有功能：link 只被 REX/Forward 用來「開詳情頁」，
  //     搜尋結果的顯示、排序、去重、季別過濾都不讀它。
  //     Forward 端本來就要求 link 必填，補上是讓欄位符合契約。
  //
  // bump 到 50：修掉 v49 引入的沙箱迴歸 + 補齊 link 的一致性。
  //   (1) ★ v49 把 buildDetailLink 拉進 loadResource 的熱路徑，而它
  //       內部用 URLSearchParams —— Forward 的 widget 沙箱
  //       （iOS/Android JavaScriptCore）沒有那個全域，於是整個模組爆掉：
  //         [error] 模組執行錯誤：Can't find variable: URLSearchParams
  //       Node 測試環境有 URLSearchParams，所以本機全綠、真機才炸。
  //       修法：buildDetailLink / parseDetailLink 都不再用 URLSearchParams，
  //       改為手動組與解析 query string（參數值都是數字或 tv/movie，
  //       encodeURIComponent 後用 '&' 串接，語意與 toString() 一致）。
  //       新增 test/verify_forward_sandbox.mjs：模擬真實沙箱（拿掉
  //       URLSearchParams / TextEncoder / Buffer…），讓同類問題本機就現形。
  //   (2) 電影的 link 不再帶 season。電影沒有季別概念（clean 階段刻意
  //       不提升 season），但 v49 的 fallback 會塞 season=1，造成
  //       「link 說 season=1、資源 season 欄位是 undefined」的矛盾。
  //
  // bump 到 51：修掉「有些劇可以切季、有些不行」的主因 —— loadDetail
  //   的回傳結構不符 Forward / REX 的官方 VideoItem 契約。
  //   (3) ★ loadDetail 現在回傳 childItems（每季一個 child，該季的集數
  //       在該 child 的 episodeItems）。這是官方契約對 TV 多季的規定：
  //         return [{ id, type, mediaType, childItems: [
  //           { id, title:"第1季", episodeItems: [...] } ] }]
  //       舊做法把 S1/S2 的集數全平鋪在頂層 episodeItems、靠每筆的
  //       season 欄位區分 —— 但 REX 的 VideoItemChild 契約根本沒有
  //       season 欄位（@rexnow/libs 的 video.d.ts 只有 episode），
  //       所以「靠 season 欄位分季」在 REX 端無效，季別下拉列也
  //       沒有 childItems 這種「季的集合」可讀 → 切季看起來沒反應。
  //       頂層 episodeItems 保留「當前季」的集數（單季客戶端相容，
  //       舊行為不變），另加 seasonNumber / seasonIndex 欄位
  //       （REX 原生 MediaItem / StreamSource 的欄位名）。
  //   (4) search 區塊加上 cacheDuration: 0。REX 首頁搜尋走 search 區塊，
  //       未設時 REX 用預設 86400（24 小時），季別變了也可能拿回舊快取。
  //
  // bump 到 52：修掉「詳細頁選另外一集搜不到、連播下一集找不到」。
  //   三個獨立根因，各自都會讓切集回 0 筆：
  //   (1) loadDetail 把外層 link 的 episode 透傳給內層 loadResource。
  //       外層 link 常帶 episode（搜尋結果每筆的 link 都是
  //       search:標題?season=N&episode=M），內層 targetEpisode=M 會把整批
  //       結果過濾到只剩 M 一集 —— 詳情頁只剩 1 集可點。
  //       修法：內層一律 episode=null，且 link 重建成不帶 episode 的季連結
  //       （避免 link 解析又把 episode 補回來）。
  //   (2) episode 參數洗成 NaN 時 smart 路徑殺光結果。REX 傳的字串不保證
  //       是純數字，舊寫法 parseInt 得 NaN；executor 用 !== null 判斷，
  //       NaN !== null 為 true → filterByEpisode(NaN) 殺掉所有有集數來源。
  //       修法：三處 targetEpisode 統一走 _toEpisodeNumber，非法值回 null。
  //   (3) macCacheKey 全季共用，但站方只回已播集。切到未播集時 merged 非空
  //       → 跳過搜尋 → 尾端 filterByEpisode 殺光 → 回 0 筆。
  //       修法：merged 缺 targetEpisode 時強制 MacCMS 重抓（_macCacheHit=false）。
  //   另加 _macEpNumber：集數抽取認全格式（「01」「EP01」「第1話」），
  //   只認「第N集/期」時其他格式 _ep=null，切到那集就被丟掉。
  //   舊 cache 內是缺集/單集的髒結果，bump 版本讓 syncWidgetVersion 清掉重搜。
  //
  // bump 到 53：修掉「REX 詳情頁切季源名永遠停在 S1、集數會動季數不動」。
  //   根因（已由 S1E3/S2E3 兩次直調 log + 使用者症狀雙重定案）：
  //   loadResource 本體已對（S1/S2 四站 URL 全不同、季標一致），問題在
  //   loadDetail 回傳的季結構 REX 解碼器看不見：
  //     - REX 官方契約 VideoItemChild 沒有 season 欄位，也沒有 episodeItems
  //       欄位（@rexnow/libs video.d.ts：VideoItemChild 只有 episode；
  //       childItems?: VideoItemChild[]，所以 child.episodeItems 會被丟掉）。
  //     - 舊寫法把 child 季標成 type:'url'（可直接播放），REX 點季時認為
  //       無需再調 loadDetail，直接本地過濾手上唯一的 S1 清單 → 季卡住、
  //       集在同季內能動（與回報症狀字字對上）。
  //   修法（只動結構，不動搜尋/過濾）：
  //     (1) childItems 每季的 type 改為 'detail'（可鑽取），link 已帶
  //         search:<標題>?season=S，REX 點季時用該 link 重調 loadDetail，
  //         拿回該季頂層 episodeItems，再走 stream 重調 loadResource。
  //         Forward 端 JS 寬鬆解碼不受影響（child 照讀）。
  //     (2) 回傳前加一行季結構 log（季數=[..] 每季集數），以後判本地/重調
  //         不用再猜。bump 版本清掉手機裡修復前寫的髒 cache。
  WIDGET_VERSION: 54,
  // 整批搜尋時限（毫秒）。只是最後一道保險，正常情況下不會用到 ——
  // 已有「站數足夠」與「在途請求已無望」兩道提早收尾。
  // 需容納最慢站的逾時(SLOW_SITE_TIMEOUT)+重試退避。
  // 從 12000 縮到 9000：搭配 REQUEST_TIMEOUT 4000 + RETRY_ATTEMPTS 1，
  // 一站最壞 (4s 第一次 + 1.5s 退避 + 4s 第二次) ≈ 9.5s。9s 略緊但仍可覆蓋
  // 健康站鏈；逾時由 SUFFICIENT_SITE_COUNT=3 早收取代，純保險值。
  SEARCH_DEADLINE: 9000,
  // 空結果安全網：整批篩選後 0 筆時，放寬比對重試一次。
  //
  // 背景：字面比對對「同一作品、不同地區譯名」無能为力。
  // 實測「間諜家家酒」(台) vs 站方「间谍过家家」(陸)，繁簡正規化後
  // 分別是「間諜傢傢酒」/「間諜過傢傢」，不相等也不互含 →
  // standard 全數判 none → 0 筆 → 使用者看到空白媒體頁。
  //
  // 為什麼只在 0 筆時觸發：loose 會放進 OVA/電影解說/特別篇那類
  // 使用者不要的內容。正常搜得到時完全不動，維持嚴格比對的行為；
  // 只有「寧可空白也不給內容」的情況才放寬。
  RELAX_ON_EMPTY: true,
  // 空結果放寬時，站方片名與目標片名至少要有這麼高的字元重疊率。
  //
  // 門檻來源（實測）：
  //   0.80 = 間諜傢傢酒 ↔ 間諜過傢傢（地區譯名，同一部）→ 必須放行
  //   0.40 = 間諜傢傢酒 ↔ 間諜（不同作品）→ 必須擋掉
  // 取 0.6 落在兩者中間，且對一般「前三字相同」的譯名差
  // （如「行屍走肉」↔「陰屍路」共用「屍」）足夠嚴謹 ——
  // 那種才需要 TMDB 別名，不是這道安全網該處理的。
  EMPTY_FALLBACK_MIN_OVERLAP: 0.6,
  // 已從這麼多個站拿到結果就收尾，剩下的站不再等待。3 = 涵蓋 5 站中前 3 個
  // 健康站（含 1 個 adapter 站），實測這已足夠產出最終結果 90% 內容。
  // 原本 5 等於「全部站都回來才收尾」，是慢的主因：5 站中常見 1~2 個慢站
  // 拖累 wall time 2~3 秒，但這幾個慢站命中本來就少（多在電影天堂/非凡/樂子
  // 主流站就抓到了）。3 在壓力測試下與 5 結果差異 < 5 條且都在末段排序淘汰。
  // 調小可換取更快回應，代價是站數變少。設 0 停用。
  SUFFICIENT_SITE_COUNT: 3,

  // 主力源配置：內容豐富且實測可回傳結果的站，可獲得排序加成
  MAIN_SOURCES: ['非凡資源', '電影天堂', '如意資源', '樂子'],

  // ===== MacCMS 站並發配置 =====
  //
  // DETAIL_CONCURRENCY 控制每站內部抓詳情頁的同時請求數。
  //   1 = 完全循序（baseline，0 風險）
  //   4 = 站內併發（n=20 實測 median 769 vs baseline 735 → -4%，無統計顯著差，
  //     且分位數長尾變長，return 1 維持 baseline）
  MAC: {
    DETAIL_CONCURRENCY: 1,
  },

  // ===== 簽名型站 adapter =====
  //
  // 與 RESOURCE_SITES（MacCMS）完全並行的第二條來源管線。兩者互不影響：
  // adapter 掛掉只是少一個來源，MacCMS 結果照常回傳。
  ADAPTERS: {
    // 主開關。globalParams.jpyyEnabled 為 'disabled' 時完全跳過。
    ENABLED: true,
    // DEBUG: true 會在 console 印 adapter 的搜尋耗時與命中數。
    DEBUG: false,
    // 每個站最多處理幾筆搜尋結果。
    // 理由：簽名站一筆結果要 2 次請求（詳情頁 + 換 URL），12 筆就是 24 次；
    // 這裡限制「真正進入換算流程」的筆數，避免拖累 MacCMS 的搜尋。
    MAX_ITEMS_PER_SITE: 5,
    // 換 URL 的單次逾時。簽名站偶發慢，給比一般站寬裕的值。
    // 從 5000 縮到 3000：jpyy / agedm 換 URL 端點實測 p50 ≈ 0.8s、p90 ≈ 2.0s，
    // 3s 已覆蓋 95% 健康請求。逾時請求走 `hard` 整鏈超時提早丟棄，不會拖到
    // 整體流程。功能一致：逾時的單一換 URL 請求本來就要靠外層 hard 救回。
    RESOLVE_TIMEOUT: 3000,
    // 併發抓詳情頁的同時請求數。
    //
    // ★ 這個值是在「速度」與「不被限流」之間取捨，不是越大越好：
    //   - 1  = 完全循序，12 筆候選要 12 倍 RTT（實測 3.6s）
    //   - 4  = 目前預設，實測 0.31s，且不觸發 429
    //   - 12 = 全開最快，但 api.agedm.io 會回 429，連 search 都一起被拖死
    //
    // 若換站點後開始看到 429，先把這裡調小，而不是改回循序。
    DETAIL_CONCURRENCY: 4,
    // 同時查詢幾個 adapter 站。
    //
    // ★ 原本各站是「一站跑完才換下一站」，總時間 = 各站耗時相加
    //   （實測 jpyy +330ms、agedm +1804ms 串起來共 1.8s）。改成併發後
    //   = max(各站)，實測降到 max 而非 sum。
    //
    //   刻意只給 2（而非全開）：不同站點雖然打不同網域，但同時打滿
    //   仍可能撞到各自的限流。2 已能把兩個站的成本疊在一起。
    SITE_CONCURRENCY: 2,
    // detail 端點的短 TTL 快取（毫秒）。
    //
    // 用途：搜尋流程會對同一個 vodId 打兩次 /detail（一次取播放清單、
    // 一次取 vip 前綴），用這個 TTL 重放第二次的結果，省 RTT。
    //
    // 只給「非短效憑證」的 detail 用：這裡重放的 player_jx 前綴是
    // 站方固定設定；播放 token 不走這個快取（見 _ADAPTER_GET 說明）。
    DETAIL_CACHE_TTL: 30000,
  },

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

    // ★ 簽名型 adapter 站（金牌影視 / jpyy 等）要不要走過濾廣告伺服器。
    //
    // 為什麼需要這個開關：這類站的 m3u8 是自己簽發的延遲 token，
    // 而且串流本身沒有夾帶廣告片頭 —— 讓它們繞一圈過濾廣告伺服器
    // 純粹是白繞：多一次網路往返、拉長啟動時間，換不到任何去廣告效果。
    //
    // 預設 'skip'（不走）。因為「不過濾」的代價是使用者自己看不到差異，
    // 而「多繞一圈」的代價是每集都要多等 —— 預設應該選對多數站沒有廣告的
    // 那一側。若使用者之後發現某些 adapter 站其實有廣告，再改成 'filter'。
    //
    // 對照：m3u8FilterEnabled 是全站總開關（關掉的話 MacCMS 站也不過濾），
    // 這裡只影響 _adapterSite 標記的資源，兩者層級不同、可同時生效。
    ADAPTER_MODE: 'skip',
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
    // v2.9.3：並行再打一次 zh-CN search。
    //
    // 實測 `search/tv?query=陰屍路&language=zh-CN` 直接回 `name=行尸走肉`
    // （簡體），正是 VOD 站要的片名。有了它就不必等 alternative_titles
    // （Forward 內實測 ~5s），整體延遲從 ~17s 降到 ~1s。
    SEARCH_LANGUAGE_CN: 'zh-CN',
    ALT_TITLE_LANGS: ['zh-CN', 'zh-TW', 'zh-HK', 'en'],
    ALT_TITLE_REGIONS: ['CN'],
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
  version: "3.5.8",
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
      // 簽名型 adapter 站（金牌影視 / jpyy 等）要不要繞開過濾廣告伺服器。
      //
      // 與上面「ts 分片走哪」是不同層級的東西：那個決定「已經在過濾
      // 伺服器上的連線，ts 要不要也走伺服器」；這個決定「這條 url 要不要
      // 進過濾伺服器」。所以兩者可以自由組合。
      //
      // 預設「直接播放（跳過過濾）」的理由：
      //   這類站的 m3u8 是自己簽發的延遲 token，串流本身沒有夾帶廣告片頭，
      //   讓它繞一圈純粹白繞 —— 多一次往返、拉長啟動時間，換不到任何效果。
      //   「不過濾」的代價對使用者不可見，「多繞一圈」的代價每集都要多等，
      //   預設應該站在後者不成立的那一側。
      //
      // 若日後發現某些 adapter 站確實有廣告，切成「照常過濾」即可，
      // 其他 MacCMS 站的設定完全不受影響。
      name: "m3u8FilterAdapterMode",
      title: "簽名型來源走不走廣告過濾",
      type: "enumeration",
      enumOptions: [
        { title: "直接播放 (跳過過濾,推薦 — 這類站沒廣告)", value: "skip" },
        { title: "照常過濾 (與其他站相同)", value: "filter" }
      ],
      value: "skip"
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
    },
    {
      // 簽名型站（金牌影視等）adapter 開關。
      //
      // 與上方「自訂源設定」（MacCMS）是兩條完全獨立的管線：
      // 這裡停用只影響簽名站，MacCMS 來源照常運作；反之亦然。
      //
      // 停用的時機：站方改版造成簽名失效（搜尋結果恆為空）時，先關這裡
      // 讓 widget 回到純 MacCMS 行為，不必改程式碼。
      name: "jpyyEnabled",
      title: "簽名型站(金牌影視等)",
      type: "enumeration",
      enumOptions: [
        { title: "啟用", value: "enabled" },
        { title: "停用", value: "disabled" }
      ],
      value: "enabled"
    },
    {
      // 簽名站搜尋時，同時查詢的站數上限（防止新增太多站拖慢首屏）。
      // 每個簽名站首屏固定 3 次請求，這個值直接決定額外請求量。
      name: "adapterSiteLimit",
      title: "簽名型站 同時查詢站數",
      type: "enumeration",
      // 預設 2：目前有兩個站（金牌影視 = 綜合內容、AGE動漫 = 動畫）。
      // 兩者內容不重疊 —— AGE 只有動畫，動漫番這類查詢金牌影視多半零命中，
      // 反過來劇集 AGE 也是零命中。一起開的實際效益高於其 6 次請求的成本。
      // 想省流量可以選「只查金牌影視」（此時只查第一個站）。
      enumOptions: [
        { title: "只查金牌影視 (1站,更快)", value: "1" },
        { title: "金牌影視 + AGE動漫 (2站,推薦)", value: "2" }
      ],
      value: "2"
    },
    {
      // adapter 詳細日誌。除錯用（站方改版時需要看簽名是否過關）。
      name: "adapterDebug",
      title: "簽名型站 除錯日誌",
      type: "enumeration",
      enumOptions: [
        { title: "關閉", value: "disabled" },
        { title: "開啟", value: "enabled" }
      ],
      value: "disabled"
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
    // ★ cacheDuration 必須是 0。
    //
    //   REX 首頁搜尋走的就是這個 search 區塊。未設此值時 REX 用預設
    //   86400（24 小時）——實測 REX 儲存的 metadata 確認：
    //     "search": { ..., "cacheDuration": 86400 }
    //
    //   問題：search 區塊的參數裡有 season / episode，但 REX 的模組層
    //   快取鍵並不保證把季別算進去。使用者先搜「白粉飛」（S1）→
    //   命中 24 小時快取 → 詳細頁切到 S2 時，若 REX 沿用這份快取，
    //   拿回來的還是 S1 的清單 → 畫面看起來完全沒刷新。
    //
    //   模組內部已有精確到「片名+序號+年份+季+集」的快取
    //   （vod_smart_..._s${season}_... / vod_batch_..._s${season}_...），
    //   重複請求不會重打站台，不需要靠這一層快取。
    //   與 modules 裡的 loadResource（cacheDuration: 0）保持一致。
    cacheDuration: 0,
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
 * Zen 式季數正規化：params.season 優先，片名次之，保證永遠回有效數字。
 *
 * 借鏡 zen.cheyong.rex.stream.js 的 `Number(params.season) || dsSeason(wanted)`：
 * Rex 詳細頁切季 = 帶新 params 重調一次 loadResource，季數放在 params.season。
 * 但 Rex 的 season 型別是 string，未選季時傳空字串而非省略欄位，且實機出現過
 * "第二季" / "S2" / "Season 2" / 數字型 2 等多種形狀，舊的三處複製寫法各行其是：
 *   - `season ? parseInt(season)` 對 "第二季" 得 NaN，靠後面正則救
 *   - 對 "S2" / "Season 2" 處理不一致
 *   - `season="  "`（全空白）會進 parseInt 得 NaN，正則救不回來 → cacheKey 變 _sNaN_
 *
 * 本函式把三處收斂成一套：純數字 > S2/Season 2 > 中文數字 > 片名 fallback > 1。
 * 有值但解不出來時不回 NaN，掉下去用片名再猜一次（跟 Zen 的 || 語意一致）。
 */
function resolveRexSeason(seasonParam, seriesName, fallbackSeason) {
  const fb = Number.isFinite(fallbackSeason) && fallbackSeason >= 1 ? fallbackSeason : 1;
  const raw = seasonParam == null ? '' : String(seasonParam).trim();
  if (raw) {
    // 純數字 "2" / 數字型 2
    if (/^\d+$/.test(raw)) {
      const n = parseInt(raw, 10);
      if (n >= 1) return n;
    } else {
      // S2 / Season 2
      const mEn = raw.match(/(?:season\s*|s)(\d{1,2})/i);
      if (mEn) {
        const n = parseInt(mEn[1], 10);
        if (n >= 1) return n;
      } else {
        // 第二季 / 第二部 / 二
        const mCn = raw.match(/\d+|[一二三四五六七八九十零〇兩两]+/);
        if (mCn) {
          const tok = mCn[0];
          const n = /^\d+$/.test(tok) ? parseInt(tok, 10) : parseChineseNumeral(tok);
          if (Number.isFinite(n) && n >= 1) return n;
        }
      }
    }
    // season 參數有值但解不出來 → 掉下去用片名再猜，不直接回 NaN
  }
  // 從片名猜：extractEnhancedInfo 已經會解 第X季 / S2，拿它的結果
  if (Number.isFinite(fb) && fb > 1) return fb;
  return 1;
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
  //
  // ★ 補抓「中文結尾接純羅馬數字」：「庆余年II」「大江大河II」等站方
  //   罕見寫法。先前的 (?:\s|：|:) 前綴要求空白或冒號，中文接著羅馬
  //   數字會被漏掉（實測「庆余年II」→ null，被當成 sequel=1 處理）。
  //
  //   修正則：把前綴從「空白/冒號」放寬到「非數字字元」，並要求
  //   「後方為字串結尾或非字母數字」，避免「IMAX」這種英文單字被誤判。
  const roman = s.match(/(^|[^\dIVX])([IVX]{2,4})(?=[^IVX]|$)/);
  if (roman) {
    const map = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9, X: 10 };
    const v = map[roman[2].toUpperCase()];
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
          // 舊條件：數字前方是「文字」或「字串開頭」才算。
          // 問題：對「Back to the Future 3」（空白分隔），before = "Back to the Future "
          // 結尾是空白，不匹配 [^\d\s]，所以 3 被錯誤排除。
          // 新增第三條件：空白結尾也算有效（常見於英文片名以空白分隔數字）。
          return /[^\d\s]$/.test(before) || before.length === 0 || /[\s]$/.test(before);
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

function extractEnhancedInfo(seriesName, srcItem = null) {
  if (!seriesName) return {
    baseName: '',
    seasonNumber: 1,
    isVariety: false,
    varietyEpisode: null,
    varietyDate: null,
    year: null,
    region: 'other',
    rawName: seriesName,
    // 站方分類訊號（jpyy 帶 _siteTypeName，MacCMS 站無此欄）。
    // 預設 null，呼叫端沒傳 srcItem 時不打擾既有行為。
    _siteTypeName: null,
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

  const chineseMatch = rawName.match(/第([一二三四五六七八九十零〇两\d]+)[季部季]/);
  if (chineseMatch) {
    const val = chineseMatch[1];
    // v2.9.5：用 parseChineseNumeral 處理複合數字（「十一」「二十三」）。
    // 舊的 CHINESE_NUM_MAP 只有單字表，遇到「十一」得 undefined，
    // `|| 1` 讓 season 靜默變成 1 → 與目標 season=11 判為 season_conflict
    // → 全部候選被殺（實測 20 筆 → 0 筆）。
    const parsed = parseChineseNumeral(val);
    seasonNumber = Number.isFinite(parsed) ? parsed : (parseInt(val, 10) || 1);
    baseName = rawName.replace(/第[一二三四五六七八九十零〇两\d]+[季部季]/, '');
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
    rawName,
    // ★ 站方分類訊號。jpyy 的 toMacItem 會帶 _siteTypeName
    //   （'tv' / 'movie' / 'other'），下游 isSmartSeriesMatch 用它判
    //   spin-off：target.type='tv' 但 candidate._siteTypeName='movie' →
    //   擋掉劇場版。MacCMS 站沒帶這個欄位 → null 不觸發守門員。
    _siteTypeName: srcItem?._siteTypeName || null,
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
    const info = extractEnhancedInfo(item.vod_name, item);
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
    const info = extractEnhancedInfo(item.vod_name, item);
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

  // ★ 衍生作 / 劇場版 / 電影版 / OVA / 特別篇 必須在所有比對之前先擋。
  //
  // 為什麼這層要在最前面：stripSubtitle（見下方）會把「劇場版」「電影版」
  // 這類詞當成「副標題」清掉，讓 candidateInfo.baseName 跟 S1 完全同字，
  // similarity 直接 1.0 → 命中 exact → REX 預設展開這個劇場版，使用者
  // 進詳細頁看到的是「2 小時 15 分鐘的劇場版」而不是真正的 S1 動漫 12 集。
  //
  // 實測：搜「五等分的新娘」時 jpyy 命中
  //   id=116334 「五等分的新娘」(片長 2:15:38，別名「五等分の花嫁劇場版」)
  //   id=128946 「五等分的新娘 第一季」(12 集動漫)
  // 兩者 baseName 經 stripSubtitle 後都是「五等分的新娘」→ 排序時劇場版
  // 排前面 → 詳細頁顯示 1 集（劇場版）而不是 12 集。
  //
  // 判定：比對「原始名」(rawName) 而非清理後的 baseName，且只看 candidate
  // —— target 帶劇場版標記而 candidate 沒帶，屬於「明示要找劇場版」，
  // 不該被擋。
  const SPIN_OFF_MARK = /劇場版|剧场版|電影版|电影版|特別篇|特别篇|\bOVA\b|\bSP\b/;
  const targetIsSpinOff = SPIN_OFF_MARK.test(targetInfo.rawName || '');
  const candidateIsSpinOff = SPIN_OFF_MARK.test(candidateInfo.rawName || '');
  if (!targetIsSpinOff && candidateIsSpinOff) {
    return {
      match: false, type: 'spin_off', score: 0,
      similarity: 0, seasonMatch: false,
      targetSub: '', candidateSub: 'spin_off',
      confidence: 0
    };
  }

  // ★ 站方分類衝突：jpyy 對劇場版存 typeId1=1（電影），TV 動漫存 typeId1=4。
  //   進來時 type='tv'（找 S1 動漫）但候選 _siteTypeName='movie'（劇場版）
  //   → spin-off，擋掉。jpyy 劇場版的 rawName 往往就是「五等分的新娘」，
  //   沒「劇場版」字眼，上述 rawName 守門員抓不到，必須靠這層補。
  //
  //   反向（type='movie' 但 _siteTypeName='tv'）也擋：使用者明確要電影，
  //   不要 TV 動漫。
  if (targetInfo.type && candidateInfo._siteTypeName &&
      targetInfo.type !== candidateInfo._siteTypeName &&
      candidateInfo._siteTypeName !== 'other') {
    return {
      match: false, type: 'spin_off', score: 0,
      similarity: 0, seasonMatch: false,
      targetSub: '', candidateSub: `siteType=${candidateInfo._siteTypeName}`,
      confidence: 0
    };
  }

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
  // ★ 序號 1 = 原版，不是續集。
  //   站方對「第一部」的兩種常見命名：「庆余年1」「无间道1」—— 序號從 1
  //   起算，2 才是續集。若把 1 當成「有續集序號」，target「庆余年」
  //   （無序號）對上 candidate「庆余年1」會觸發 sequelShapeMismatch 而被
  //   判成 sequel_conflict → 整條被殺。使用者搜「庆余年」卻拿不到第一季，
  //   正是這個原因（實測金牌影視命中此情形）。
  //
  //   語意上也站得住：序號 1 的作品就是原版本身，與無序號同義。
  //   這裡正規化成 null，讓「無序號 target ↔ 序號1 candidate」正常比對。
  if (candidateSequel === 1) candidateSequel = null;
  // target 端同理：使用者輸入「庆余年1」時不應被當成有續集序號。
  const targetSequelNorm = targetSequel === 1 ? null : targetSequel;
  const sequelShapeMismatch = (targetSequelNorm === null) && (candidateSequel !== null);
  const sequelConflict = sequelShapeMismatch ||
    (targetSequelNorm !== null && candidateSequel !== null && targetSequelNorm !== candidateSequel);

  // 季度衝突：使用者選第一季，候選卻是第二季，就不是他要的內容。
  //
  // 這裡只在「雙方都明確標示季度」時才判定衝突。片名完全沒有季度標記時
  // 一律視為第一季（seasonNumber 的預設值），若照單全收會誤殺大量正確
  // 結果 —— 資源站對「仁醫」這種沒寫季度的項目不會標 Season1。
  // 因此判準是：候選明確寫出不同於目標的季度才排除。
  //
  // ★ v54：target>1 時「明確標 S1」的候選也必須判 season_conflict。
  //   實測：target S3 對上「白粉飞第一季」時，下方 `!== 1` 豁免讓它以
  //   exact(100) 混入（seasonMatch=false 但 match=true），只能靠下游
  //   filterBySequel 丟掉 —— 但 loadResource 的 cache 命中路徑不重跑
  //   filter，髒資料直達 UI（切 S3 在電影天堂看到 S1 正是此路徑）。
  //   只擋「明確寫出 S1」的（第一季/S1/Season 1/第1部）；無季標的裸名
  //   （白粉飞）仍放行交給 filterBySequel 年份規則，避免誤殺仁醫這類裸名。
  //   這是 Zen `season>1 && foundSeason!==season → 0` 的同義實現。
  if (candidateInfo.seasonNumber === 1 && targetInfo.seasonNumber > 1 &&
      /第\s*[一1１]\s*[季部]|Season\s*1\b|\bS1\b/i.test(candidateInfo.rawName || '')) {
    return {
      match: false, type: 'season_conflict', score: 0,
      similarity: 0,
      seasonMatch: false,
      targetSeason: targetInfo.seasonNumber,
      candidateSeason: 1,
      confidence: 0
    };
  }
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
      similarity, sequelTarget: targetSequelNorm, sequelCandidate: candidateSequel,
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
      // v2.9.5：擋掉「衍生作 / 兄弟作」（spin-off）。
      //
      // 實測「行尸走肉」（target, S11）比對站方結果時，下列都通過 coreMatches
      // 而被誤放行：行尸走肉：存活之人、行尸走肉：死亡之城、
      // 行尸走肉：达里尔·迪克森。這些是 TMDB 上的**不同作品**，
      // 使用者要看第十一季卻被推到死亡之城，內容完全不符。
      //
      // stripSubtitle 只處理「：副標題」形式，碰上「存活之人」這種
      // 沒有冒號的衍生作就失效，所以額外比對副標題文字本身：
      // 目標沒有副標題、候選卻有 → 判定為衍生作。
      const targetSub = String(targetInfo.baseName || '').split(/[：:]/).slice(1).join('').trim();
      const candidateSub = String(candidateInfo.baseName || '').split(/[：:]/).slice(1).join('').trim();
      if (!targetSub && candidateSub) {
        return {
          match: false, type: 'spin_off', score: 0,
          similarity: similarity, seasonMatch: false,
          targetSub: '', candidateSub: candidateSub,
          confidence: 0
        };
      }

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
 * 從 MacCMS 站的集名抽出集數（給 _ep 用），抽不到回 null（未知）。
 *
 * 為什麼要比「第N集」寬：站方集名格式不統一，實測有「01」「EP01」
 * 「第1話」「E3」等多種寫法。舊正則只認「第N集/期」，其他格式
 * _ep 會是 null；切到那一集時 filterByEpisode 因 hasExact=true
 * 把整條來源丟掉 —— 使用者看到的就是「這集搜不到」。
 *
 * 回 null 而不是 1：沒數字的名字（「正片」「預告」「HD中字」）
 * 不能硬判成第 1 集，否則點第 1 集會混進預告片。null 交給
 * filterByEpisode 的 hasExact 後備邏輯決定去留。
 */
function _macEpNumber(epName) {
  const s = String(epName ?? '').trim();
  if (!s) return null;
  // 「第01集」「第1期」「第1話」「第2回」（含全形話/回與空白）
  let m = s.match(/第\s*0*(\d+)\s*[集期話话回]/);
  if (m) {
    const n = parseInt(m[1], 10);
    if (Number.isFinite(n) && n > 0) return n;
  }
  // 「EP01」「E3」「ep 12」（前有分隔或在開頭，避免誤抓片名內的 E）
  m = s.match(/(?:^|[^A-Za-z\d])E[Pp]?\s*0*(\d+)\b/);
  if (m) {
    const n = parseInt(m[1], 10);
    if (Number.isFinite(n) && n > 0) return n;
  }
  // 純數字「01」「3」
  m = s.match(/^\s*0*(\d+)\s*$/);
  if (m) {
    const n = parseInt(m[1], 10);
    if (Number.isFinite(n) && n > 0) return n;
  }
  return null;
}

/**
 * 把各路呼叫端傳入的 episode 參數正規化成正整數，非法值回 null（= 不指定）。
 *
 * 為什麼需要：REX 傳的是字串，但內容不保證是純數字（「第5集」
 * 「EP5」這類都出現過）。舊寫法 `episode ? parseInt(episode) : null`
 * 對這類輸入得到 NaN，而 NaN 在下游行為不一致：
 *   - loadResource / batch 尾端用 `if (type==='tv' && targetEpisode)`，
 *     NaN 判 falsy → 不過濾（僥倖沒事）
 *   - SmartSearchExecutor 用 `this.targetEpisode !== null`，
 *     NaN !== null 為 true → filterByEpisode(resources, NaN)，
 *     而 NaN 永遠 !== 任何 label → 所有有集數的來源被殺光，
 *     使用者看到的就是「這集完全搜不到」
 * 統一在源頭洗成 null，各路徑行為一致。
 */
function _toEpisodeNumber(v) {
  if (v == null) return null;
  const s = String(v).trim();
  if (!s) return null;
  let n = parseInt(s, 10);
  if (!Number.isFinite(n) || n < 1) {
    const m = s.match(/\d+/);
    n = m ? parseInt(m[0], 10) : NaN;
  }
  return Number.isFinite(n) && n >= 1 ? n : null;
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

/**
 * 把 adapter 站的集數名轉成「第x集」顯示格式。
 *
 * 為什麼要轉：簽名站的 episodeList 只給純數字（實測「1」「2」…「36」），
 * 而 MacCMS 站的 vod_play_url 片段本身就是「第03集」。兩種來源並排在
 * 詳情頁時，只有一半顯示「第x集」、另一半光禿禿一個數字，非常突兀
 * （使用者回報的就是「慶餘年1．3」而不是「慶餘年1．第03集」）。
 *
 * 規則：
 *   - 純數字（"3" / "03"）→ 第03集（補零到兩位，與 MacCMS 站一致）
 *   - 已含「集」「期」→ 原樣（站方已給好格式，例如「正片」「第1話」）
 *   - 其他文字（"正片"、"預告"）→ 原樣，不硬套「第x集」
 */
function _adapterEpisodeLabel(rawName) {
  const s = String(rawName ?? '').trim();
  if (!s) return '';
  // 站方已給好格式，不要二次包裝
  if (/[集期話]/.test(s)) return toDisplayText(s);
  const m = s.match(/^(\d+)$/);
  if (m) {
    const n = String(parseInt(m[1], 10)).padStart(2, '0');
    return `第${n}集`;
  }
  return toDisplayText(s);
}

/**
 * 從 adapter 站的集數名稱抽出「這是第幾集」。
 *
 * 為什麼需要這個 helper：各站的 vod_play_url 集名格式不一致。
 *   - jpyy（金牌影視）：純數字 "1" / "2" / "12"
 *   - agedm（AGE動漫）："第80集" / "HD中字" / "正片" / "第195集"
 * 用 parseInt 直接轉，只有 jpyy 那種純數字會成功；AGE 的「第80集」
 * 一律 NaN。
 *
 * ★ NaN 的後果不是「集數顯示怪怪的」，而是整條來源被靜默殺掉：
 *   findIndex 比對時 NaN !== 任何 wantEp → 永遠挑不到目標集 → 落到
 *   最後一集並標成「代替集」；而回報的 episode 也變成 1。下游
 *   filterByEpisode 看到 episode 對不上使用者選的集數，就判定這條
 *   來源不屬於本集而丟棄。使用者看到的是「AGE 的來源不見了」，
 *   但日誌裡完全沒有錯誤訊息 —— 是最難查的那種 bug。
 *
 * 回傳 1 代表單集（電影/劇場版/OVA），與 MacCMS 站的行為一致。
 */
function _adapterEpNumber(rawName) {
  const s = String(rawName ?? '').trim();
  if (!s) return 1;
  // 先試整串純數字（jpyy 走這裡，行為與原本完全一致）。
  const pure = s.match(/^(\d+)$/);
  if (pure) {
    const n = parseInt(pure[1], 10);
    return Number.isFinite(n) && n > 0 ? n : 1;
  }
  // 再從「第195集」「EP05」這種文字裡抓數字（agedm 走這裡）。
  const embedded = s.match(/\d+/);
  if (embedded) {
    const n = parseInt(embedded[0], 10);
    if (Number.isFinite(n) && n > 0) return n;
  }
  // 抓不到數字 = 單集電影（「正片」「HD中字」「劇場版」）。
  return 1;
}

/**
 * 把 adapter 站的片名尾端序號轉成「片名 第N季」顯示格式。
 *
 * 為什麼要轉：簽名站的 vodName 用「庆余年2」「乡村爱情9」這種裸序號
 * 表示續集，跟 MacCMS 站的「人民的名义第二季」並排時不統一，
 * 而且單看「庆余年2」很容易被誤讀成片名本身就叫「庆余年2」。
 *
 * ★ 三道閘門，缺一道就會出錯（實測掃過 70 筆站方結果）：
 *
 *   1. 片名已有季別字樣 → 原樣返回，不動。
 *      「黑镜 第五季 Black Mirror Season 5」「三孩来了第三季」
 *      「人民的名义第二季」都走這裡。station 自己已經寫清楚了，
 *      再加「第5季」會變成「...Season 第5季」。
 *
 *   2. 尾端數字必須「站得住」才轉。extractSequelNumber 已經做過
 *      同一套判斷（排除年份、要求前方是文字），這裡直接沿用它的
 *      結果，不自己重寫一套數字解析 —— 兩套規則遲早會打架。
 *      seq 為 null 代表那個數字不是續集序號（例如「寻秦记2018」
 *      的 2018 是年份、「1917」整個就是片名），一律不轉。
 *
 *   3. 續集序號為 1 不轉。站在「庆余年1」代表的就是第一部本身
 *      （沒有前作），寫成「庆余年 第1季」反而像還有第0季。
 *      這與 isSmartSeriesMatch 把 sequel 1 視為原作是同一個判斷。
 *
 * 回傳的是「顯示用」字串，只影響 description；比對邏輯一律
 * 繼續吃原始 vod_name，見 extractPlayInfoForCache 的 displayName。
 */
// ★ 對電影場景的處理：
//   電影沒有「季」概念，_adapterSeasonLabel 對 movie 不應把序號轉成「第N季」。
//   「Back to the Future 3」→ 原樣返回「Back to the Future 3」
//                          （不是「Back to the Future 第3季」）
//   續集序號的 S 標籤（S2/S3/...）由 cleanResourceForOutput 內的 source name
//   tag 拼接負責，不在 description 內重複。
//
// 電影仍然做：
//   - 剝掉站方原標題內的季別字眼（極少見，但站方偶爾會寫「[第2部]」等）
//   - 剝掉語言括弧（「轻功(粤语)」→「轻功」，語言由頂層 language 承擔）
// 不做：
//   - 序號 → 「第N季」轉換（這是 tv 場景的行為）
//   - 「完结篇/完結篇」→ sequel=2 推導（這也是 tv 專用語意）
function _adapterSeasonLabel(rawName, type = 'tv') {
  const s0 = String(rawName ?? '').trim();
  if (!s0) return '';

  // ★ 進場先剝「站方原標題內的季別字眼」：「白粉飛第一季」/「白粉飛S1」
  //   /「白粉飛 第1季」這類，先 stripSeasonMarker 統一剝成「白粉飛」，
  //   避免 description 第一行與頂層 season 重複顯示「第一季」字眼。
  //
  //   安全網：剝後空字串 → 退回原 s0（絕不刪過頭）。
  const s = stripSeasonMarker(s0).trim() || s0;

  // ★ 先剝掉片名尾端的「(語言)」括弧：「轻功(粤语)」「轻功（国语）」
  //   → 拆成「轻功」，語言由頂層 language 欄位承擔（見 stripLanguageParen 註解）。
  //   抽不到語言的片名（無括弧或括弧內非語言）保持原樣，不破壞既有資料。
  //
  //   stripHint 用「這條字串自己抽到的語言」：讓階段二精準刪「對應的語言
  //   變體」，避免誤刪「中字」之類的字幕標記。
  //   此時還沒進 cleanResourceForOutput，**自己抽一次**（代價小，邏輯一致）。
  const selfLang = extractLanguageTag(s);
  const stripped = stripLanguageParen(s, selfLang);
  if (stripped === s) {
    // 沒拆到語言 → 走原本邏輯
    return _adapterSeasonLabelInner(stripped, type);
  }
  // 拆到 → 對剝後字串走季別邏輯；尾端語言括弧不會再被誤判為「季」
  return _adapterSeasonLabelInner(stripped, type);
}

function _adapterSeasonLabelInner(s, type = 'tv') {
  // ★ 電影短路：跳過整個「第N季」轉換流程。
  //
  // 為什麼：電影沒「季」概念。「Back to the Future 3」是第 3 集電影，
  // 不該被改寫成「Back to the Future 第3季」（讀起來像影集）。
  // 電影的序號資訊已由 cleanResourceForOutput 的 source name tag
  // 拼接「S3」承擔，description 維持原始片名最直覺。
  //
  // 仍要做的清理（語言括弧、站方季別字眼）已在上層 _adapterSeasonLabel
  // 處理過，這裡直接返回剝後字串。
  if (type === 'movie') return toDisplayText(s);

  // ★ 閘門 1 改寫：站方把季別字眼直接寫進片名（「庆余年第二季」、
  // 「庆余年S2」、「庆余年 第2季」、「庆余年完结篇」）時，把這段字眼
  // 抽出改成「第N季」後綴形式，避免顯示重複：
  //   「庆余年第二季」       → 「庆余年 第2季」
  //   「庆余年S2」           → 「庆余年 第2季」
  //   「庆余年 第2季」       → 「庆余年 第2季」  （不變，已是統一格式）
  //   「半泽直树完结篇」     → 「半泽直树 第2季 完結篇」
  //   「寻秦记2018」        → 「寻秦记2018」   （不改，年份當序號會誤判）
  //
  // 改前：看到 [季部] / Season / S\d 一律原樣返回 → displayName 內
  //   「第二季」與頂層 season: 2 重複顯示，視覺上是同一件事說兩次。
  // 改後：抽出後統一為「第N季」格式（與從序號推出的寫法一致）。
  //
  // ★ 為什麼不放進 stripSeasonMarker：stripSeasonMarker 從片名刪掉
  //   季別字眼，extractSequelNumber 依賴「刪除前的 rawName」抓序號
  //   與「刪除後的字串」做後續規則；放在這裡（_adapterSeasonLabel）
  //   是「顯示前最後一次重新組裝」，對擷取邏輯無副作用。
  if (/[季部]|[Ss]eason\s*\d|\bS\d\b|完结篇|完結篇|\b[IVX]{2,4}\b/.test(s)) {
    // 走 extractSequelNumber 判斷實際是 S 幾，避免被站方
    // 「第2部」「第三季」這類文字描述誤導。
    const seqFromName = extractSequelNumber(s);
    if (seqFromName && seqFromName > 1) {
      // 從 rawName 抽出的「第N季」字串與原始片名合併：
      //   head    = 季別字眼前綴（可能含分隔符）
      //   seasonText = 第N季
      //   rest    = 季別字眼後所有內容（保留 [國語]、HD 等後綴）
      //
      // 先抓序號在 rawName 哪個位置：用「季」「部」「完结篇」之類的
      // 關鍵字當 anchor，找它前面所有非關鍵字字元當 head。
      // ★ 注意順序：先抓「完结篇/完結篇」(在 extractSequelNumber 已
      //   抓為 sequel=2)，再抓「第X季」「X季」「S2」「Season 2」「第X部」。
      const patterns = [
        /完结篇|完結篇/,                                  // 完結篇（已先回傳 2）
        /第\s*[0-9一二三四五六七八九十壹贰叁肆伍陆柒捌玖拾]+\s*季/,  // 第2季 / 第二季
        /\b[Ss]\d+\b/,                                   // S2
        /[Ss]eason\s*\d+/,                              // Season 2
        /[0-9一二三四五六七八九十壹贰叁肆伍陆柒捌玖拾]+\s*季/,  // 2季 / 第二季
        /第\s*[0-9一二三四五六七八九十壹贰叁肆伍陆柒捌玖拾]+\s*部/,  // 第2部 / 第二部
        /[0-9一二三四五六七八九十壹贰叁肆伍陆柒捌玖拾]+\s*部/,    // 2部
        /\b[IVX]{2,4}\b(?![a-zA-Z])/,                    // 純羅馬數字 II/III/IV（不接英文字）
      ];
      for (const p of patterns) {
        const m = s.match(p);
        if (m) {
          const head = s.slice(0, m.index).trim();
          const rest = s.slice(m.index + m[0].length).trim();
          const seasonText = `第${seqFromName}季`;
          // ★「完結篇」這類語意詞要保留
          //   「半泽直树完结篇」→ 「半泽直树 第2季 完結篇」
          //   m[0] = "完结篇" → 把它放回 rest 開頭
          let restWithSemantic = rest;
          if (/完结篇|完結篇/.test(m[0])) {
            restWithSemantic = m[0] + (rest ? ' ' + rest : '');
          }
          const display = restWithSemantic
            ? `${head} ${seasonText} ${restWithSemantic}`.replace(/\s+/g, ' ').trim()
            : `${head} ${seasonText}`.replace(/\s+/g, ' ').trim();
          return toDisplayText(display);
        }
      }
    }
    return toDisplayText(s);
  }

  // 閘門 2 + 3：沿用 extractSequelNumber 的判斷，不重寫數字規則
  const seq = extractSequelNumber(s);
  if (!seq || seq <= 1) return toDisplayText(s);

  // 把「片名 + 序號 + 後綴」拆開，把序號那一段換成「第N季」。
  //
  // 關鍵：序號不一定在尾端。「小时代2：青木時代」的 2 在中間，若照著
  // 「尾端序號」的直覺把 2 當成後綴的一部分切掉，就會變成
  // 「小时代：青木時代 第2季」—— 片名裡的數字憑空消失（實測確認）。
  // 這裡改成「非貪婪抓第一段數字 + 保留其餘原文」，只在確認抓到的
  // 數字就是 extractSequelNumber 判定的序號時才置換，否則整段原樣返回。
  //
  // 判定依舊來自 extractSequelNumber：它已經排除了年份（>=100）、
  // 要求數字前方是文字，所以「寻秦记2018」不會命中這裡。
  //
  // 數字段同時支援阿拉伯與中文（一二三四五六七八九十），對應
  // extractSequelNumber 的能力。對「白粉飛第一季」這類純中文序號
  // 也抽得到，否則 head/digits 拆不開，最後整段原樣返回，
  // 顯示就會是「白粉飛第一季 第1季」之類重複。
  const m = s.match(/^(\D*?)([一二三四五六七八九十壹贰叁肆伍陆柒捌玖拾0-9]+)(\D*)$/);
  if (!m) return toDisplayText(s);
  const [, head, digits, rest] = m;
  const digitsNum = parseChineseNumeral(digits);
  if (digitsNum !== seq) return toDisplayText(s);

  const seasonText = `第${seq}季`;
  // 後綴存在（「：青木時代」）時季別插在後綴之前，否則讀起來像片名被拆開：
  //   「小时代：青木時代 第2季」✗  →  「小时代 第2季：青木時代」✓
  const converted = rest.trim()
    ? `${head.trim()} ${seasonText}${rest}`
    : `${head.trim()} ${seasonText}`;
  return toDisplayText(converted);
}

/**
 * adapter 站的狀態標記過濾：拿掉評分，保留真正的狀態文字。
 *
 * _adapterDefaultSearch 已把 vod_remarks 換成站方的 vodRemarks（更新集數），
 * 這裡是第二道防線 —— 萬一站方改版又把分數塞進來，顯示層仍不會漏出。
 *
 * 判定順序：
 *   1. 純數字 / 評分樣式（"7.9"、"8.0分"）→ 評分，丟掉。
 *   2. 只含集數進度的括號或「更新至N集」→ 丟。因為旁邊已經有
 *      「第03集」，再補一個「(46全)」是同一件事講兩次，
 *      反而把片名擠擠的（實測輸出是「慶餘年1．第36集．(46全)」）。
 *      這裡的進度對「能不能播」沒有任何判斷用途 ——
 *      那是 _adapterResolvePlay 換 URL 時的事。
 *   3. 其他（"HD"、"蓝光"、"國語"）→ 照常顯示。
 */
function _adapterSafeRemark(raw) {
  const s = String(raw ?? '').trim();
  if (!s) return '';
  // 純數字（含小數）或評分樣式 → 評分，丟
  if (/^\d+(\.\d+)?$/.test(s)) return '';
  if (/^\d+(\.\d+)?\s*(分|评分|評分)?$/.test(s)) return '';
  if (/\d+\.\d+\s*分/.test(s)) return '';
  // 只由集數／集數進度構成的括號："(36全)"、"（36集）"、"[36]"
  if (/^[(（\[【]\s*\d+\s*(全|集|期|話)?\s*[)）\]】]$/.test(s)) return '';
  // 「更新至36集」「更新到36集」—— 已由 epLabel 表達
  if (/^更新(至|到)\s*\d+\s*[集期話]?$/.test(s)) return '';
  // 「第195集」「195话」這類「只有集數」的狀態標記 —— 與 epLabel 重複。
  //
  // AGE 的 vod_remarks（站方 uptodate 欄位）在長篇動畫上就是「第195集」，
  // 不過濾的話描述會變成「凡人修仙傳．第195集．第195集」—— 同一句
  // 話印兩次。跟上面的「更新至N集」是同一個道理。
  if (/^第?\s*\d+\s*[集期話]$/.test(s)) return '';
  // 「第12集(完結)」「第12集（完結）」「第12集 完結」「第12集[完結]」
  // —— 同一種狀態標記，只是多帶了完結註記。上面那條規則要求整串結束於
  // 「集/期/話」，因此這類帶尾綴的形式會漏過，實測輸出成
  // 「五等分的新娘．第80集．第12集(完結)」—— 旁邊已經有第 80 集，
  // 再補一個「第12集(完結)」是同一件事講兩次。
  if (/^第?\s*\d+\s*[集期話]\s*[(（\[【]?\s*(完結|完结|更新完|已完結|已完结)?\s*[)）\]】]?$/.test(s)) return '';
  return toDisplayText(s);
}

async function extractPlayInfoForCache(item, siteTitle, type, matchInfo, targetInfo) {
  const { vod_name, vod_play_url, vod_play_from, vod_remarks = '' } = item;
  if (!vod_name || !vod_play_url) return [];

  // ===== 簽名型 adapter 站的獨立分支 =====
  //
  // 這些站的 vod_play_url 裡放的不是真實 m3u8，而是延遲 token
  // （見 _adapterBuildPlayUrl）。原因與好處見該函式註解：一集一 URL、
  // token 短效，全量預取既貴又易過期。
  //
  // 這裡必須獨立處理而不能沿用 MacCMS 路徑，原因有三：
  //  1. isPlayableUrl 會把 token 判為不可播（URL 沒 .m3u8 副檔名），
  //     沿用既有路徑會被整個丟棄。
  //  2. 清晰度是執行期才知道 —— 簽名站在換 URL 時才回傳多檔
  //     （藍光1080/高清720/標清480），列表階段沒有這個資訊。
  //  3. 一集一 URL 意味著要把 36 集全部換完才有完整列表。
  if (item._adapterDelay) {
    const episodes = String(vod_play_url).split('#').filter(Boolean).map(seg => {
      const i = seg.indexOf('$');
      return { name: seg.slice(0, i), token: seg.slice(i + 1) };
    });
    if (episodes.length === 0) return [];

    // ★ 集名列表「其實不是集數、是多源（語言/清晰度）」的判別。
    //
    // 為什麼要這層判別：jpyy 的 episodeList 在「單集電影」場景下，會用
    // 一個 vodId 塞下該片的所有可選來源（常見：「高清」「蓝光」「粤语」
    // 「国语」這種 2~3 筆）。原本會被當成多集輸出 → 「粤语$...#国语$...」
    // → 詳細頁 UI 解讀成「第 1 集 = 粵語、第 2 集 = 國語」→ 國語被默默丟掉。
    //
    // 判別標準：所有集名都「不是集數」(無「第N集」、也非純數字)
    // → 這些是同一集的多源 → 對每個源各建一條 resource (episode=1)，
    //   description 帶源名讓 REX 顯示「[粵語]」「[國語]」版本標籤。
    //
    // ★ 多集劇絕不受影響：劇情站的 episodeList 是「1, 2, 3, ...」，
    // 純數字可被 _adapterEpNumber 抽出集數 → 走原路徑。
    const allAreSources = episodes.length > 1
      && episodes.every(e => {
        const s = String(e?.name || '').trim();
        if (!s) return true;
        if (/第\s*\d+\s*[集期話]/.test(s) || /\bEP\s*\d+/i.test(s)) return false;
        if (/^\d+$/.test(s)) return false;
        return true;
      });
    if (allAreSources) {
      return await _buildAdapterMultiSourceResources(item, episodes, siteTitle, type, vod_name, vod_remarks);
    }

    // 使用者要播的那一集（挑不到時的落點規則見下）
    const wantEp = item._adapterTargetEpisode;
    let idx = -1;
    if (type === 'tv' && wantEp != null) {
      idx = episodes.findIndex(e => _adapterEpNumber(e.name) === wantEp);
    }
    // 落點是否為「代替」而非使用者指定的本集。
    // 為什麼需要這個旗標：目標集不存在時（例如使用者跳到第 9999 集，
    // 而站方只有 46 集），我們會 fallback 到最後一集。此時若照實回報
    // episode=46，performBatchSearch 後段的 filterByEpisode 會因為
    // 「46 !== 9999」把整條資源殺掉 —— 使用者看到的是「這個來源消失了」，
    // 而不是「這集不存在，給你看最新一集」。後者才是合理的降級。
    let isFallbackEp = false;
    if (idx < 0) {
      isFallbackEp = (type === 'tv' && wantEp != null);
      // 落到最後一集的理由：forward 在未指定集數時，UI 預設停在最新一集。
      // 對多集影集而言這才符合使用者預期（MacCMS movie 分支取第一個 m3u8
      // 是因為電影只有一集，那個「第一」其實也是「唯一」）。
      //
      // 例外：type === 'movie' 且站方拆成多集（實測金牌影視會把正片 +
      // 花絮併在同一 vodId），此時必須取第一集 —— 電影沒有「最新一集」
      // 的概念，取最後一集會直接播到花絮。
      idx = type === 'movie' ? 0 : episodes.length - 1;
    }

    const resolved = await _adapterResolvePlay(episodes[idx].token);
    if (!resolved || resolved.length === 0) return [];

    const out = [];
    for (const r of resolved) {
      const url = r?.url;
      if (!url || !isPlayableUrl(url)) continue;
      // 簽名站回傳的是 resolutionName（蓝光/高清/标清）+ resolution（數字）。
      // 兩者都餵進 extractResolutionInfo，才能拿到與 MacCMS 站一致的
      // label / level / qualityScore，讓下游排序與清晰度偏好照常運作。
      //
      // ★ 數字必須補 "p" 後綴：extractResolutionInfo 的正則是 /1080[Pp]/、
      //   /720[Pp]/…，光傳 "1080" 不會命中，會全部落到 label='未知'、
      //   qualityScore=0，排序時被當成最差的來源。
      //
      // ★ 站方的「高清」「标清」不在正則中，因此以數字為準、不靠中文標籤
      //   猜測 —— 「高清」在不同站可能指 720 也可能指 1080，數字才是權威。
      const resName = r.resolutionName || '';
      const resInfo = extractResolutionInfo(vod_name, `${resName} ${r.resolution || 0}p`);
      // displayName 是「顯示用」：片名 + 季別。原始 vod_name 仍用在
      // extractResolutionInfo / extractSequelNumber 等比對邏輯上，
      // 只有這裡的 description 與 wrap 的 name 拿轉換後的字串。
      const displayName = _adapterSeasonLabel(vod_name, type);
      const epLabel = _adapterEpisodeLabel(episodes[idx].name);
      // ★ 評分已在上游 (_adapterDefaultSearch) 排除，這裡只留「非評分」的
      //   狀態標記。純數字／帶星號的短字串一律視為評分丟掉 ——
      //   站方哪天改版塞別的數字進 vodRemarks 時，不該讓評分再冒出來。
      //   語意正確的標記（"更新至36集"、"HD"）則照常顯示。
      //
      //   movie 不顯示集數與更新進度：電影沒有「第x集」的概念，
      //   「慶餘年．第01集」讀起來像漏了什麼（使用者會以為壞掉）。
      const showEpisode = type !== 'movie';
      const remark = showEpisode ? _adapterSafeRemark(vod_remarks) : '';
      let tail = showEpisode ? [epLabel, remark].filter(Boolean).join('．') : '';
      // ★ 過濾「畫質字眼」當集名。
      //
      // 場景：jpyy 對單集電影（劇場版）把 episode.name 設成「高清」「蓝光」、
      // vod_remarks 也設成「高清」「HD」之類。這些都不是集名，是畫質標記
      // —— REX 客戶端把它顯示成「五等分的新娘．高清．藍光」時，使用者
      // 會誤以為這是兩集，實際上整季/整部就這一個。
      //
      // 規則：當 epLabel（或 remark）整段就是畫質字眼時，從 tail 拿掉。
      // 保留「更新至 N 集」「完結」等有意義的標記。
      // 條件用整段比對：這些字眼不混在其它內容裡，混在其他內容代表是
      // 編劇備註，例如「1080P HDR 字幕版」就保留。
      //
      // ★ 只在「單集電影」（episodes.length === 1）時觸發 —— 多集劇的
      // 集名是「1」「2」「第1集」這類集數，不會誤判。
      const QUALITY_ONLY = /^(高清|蓝光|藍光|超清|標清|标清|HD|SD|1080P?|720P?|4K|HDR|TS|TC|CAM|BluRay|Blu-ray|WEB-?DL)$/i;
      if (episodes.length === 1 && tail) {
        const parts = tail.split('．').filter(p => p && !QUALITY_ONLY.test(p.trim()));
        tail = parts.join('．');
      }
      // ★ 集數不能直接 parseInt(episodes[idx].name)：AGE 的集數名是
      //   「第195集」「HD中字」「正片」，都不是純數字 → NaN。
      //   NaN 會讓 episode 欄位變 null，使用者選第195集時這條來源被
      //   filterByEpisode 判定「對不上」而消失（實測會變成
      //   「凡人修仙傳．第195集．第195集」且 episode 空值）。
      //
      //   統一用 _adapterEpNumber：從名稱裡抽數字，抽不到就是單集電影 → 1。
      //   與 jpyy 的純數字集名（「1」「2」…）結果一致，不改變既有行為。
      //
      //   這裡必須和上面的 idx 挑選用同一個 helper —— 用不同的解析規則
      //   會讓「挑的是第80集、回報的卻是第1集」這種前後矛盾發生
      //   （實測就發生過：使用者選第 2 集，AGE 卻回「五等分的新娘＊．第2集」
      //   但 episode 欄位是 1）。
      const epNumber = _adapterEpNumber(episodes[idx].name);

      // ★ 把 AGE 多源（非凡/无尽/计算云/...）帶進 description。
      //
      // 為什麼：_agePlayUrls 從一個 episode 回傳多個 URL（多 CDN），
      // 對應多個不同站方 source。若不在 description 標明，使用者
      // 看到「凡人修仙傳．第80集」出現 4 次但完全看不出差別，會以為
      // 重複 —— 切到 source 下拉才發現是「非凡」「无尽」不同 CDN。
      //
      // 條件：只在「真有多 source」時帶（_groupLabel 有值且非空）。
      // 單 source（_agePlayUrls 只回 1 個）時不重複出現。
      const sourceTag = r?._groupLabel ? `[${r._groupLabel}]` : '';

      out.push({
        name: siteTitle,
        description: tail
          ? (sourceTag ? `${displayName}．${tail}．${sourceTag}` : `${displayName}．${tail}`)
          : (sourceTag ? `${displayName}．${sourceTag}` : displayName),
        url: wrapM3U8WithFilter(url.trim(), {
          site: siteTitle, name: displayName, episode: epLabel,
          // 標記這是簽名型 adapter 站的資源，讓 wrap 能依 ADAPTER_MODE 決定
          // 要不要繞開過濾廣告伺服器（見 shouldSkipFilterForAdapter）。
          adapter: true,
        }),
        playerType: 'app',
        customHeaders: { 'X-Forward-Skip-Redirect-Probe': '1' },
        resolution: resInfo.label,
        resolutionLevel: resInfo.level,
        isHD: resInfo.isHD,
        is4K: resInfo.is4K,
        qualityTags: resInfo.tags,
        qualityScore: resInfo.qualityScore,
        isHttps: url.startsWith('https'),

        // ★ episode 必須是「頂層」欄位。REX 客戶端以 result.episode 過濾
        //   當前集，只給 _ep 的話過濾後會是空陣列（cleanResourceForOutput
        //   會把 _ep 提升為 episode，但那是輸出階段；此處 resources 直接
        //   進 cache/stream，仍需自帶）。理由見 cleanResourceForOutput 註解。
        //
        // ★ fallback 時回報「使用者要求的集數」而非實際取到的那一集：
        //   這是為了通過後段的 filterByEpisode（label === targetEpisode）。
        //   真實集數仍保留在 _epActualEp，log 與除錯看得到實際值。
        episode: isFallbackEp && Number.isFinite(wantEp)
          ? wantEp
          : (Number.isFinite(epNumber) ? epNumber : null),

        // 保留 adapter 身分，供去重與 log 判斷
        _adapterSite: item._adapterSite,
        _matchType: matchInfo?.type,
        _matchScore: matchInfo?.score,
        _confidence: matchInfo?.confidence,
        _isMainSource: true,
        _hasEpInfo: episodes.length > 1,
        _rawName: vod_name,
        _seasonFromItem: extractSequelNumber(vod_name),
        // ★ 補上年份／地區，否則 cleanResourceForOutput 組不出
        //   「[2019年 - 中國大陸]」版本標記 —— 金牌影視就會是唯一
        //   沒有版本資訊的來源（同樣搜慶餘年，其他站都帶著）。
        //
        //   來源是 item.vod_year / item.vod_area，即 _adapterDefaultSearch
        //   從站方 vodPubdate / vodArea 映射過來的欄位（站方有的都有）。
        //   之前漏了這兩個 key，adapter 的每一筆都拿不到版本標記，
        //   使用者要自己開詳情頁比對是哪一年的版本。
        _year: item.vod_year || null,
        _area: item.vod_area || null,
        // ★ 提升 AGE 多源 group 標籤到頂層（給 cleanResourceForOutput 用）。
        // 沒有這行 cleanResourceForOutput 永遠讀不到 _groupLabel，
        // 描述內的 [红牛]、[非凡] 等等就會一直留著。
        _groupLabel: r?._groupLabel || null,
        _ep: Number.isFinite(epNumber) ? epNumber : null,
        // 實際取到的集數（fallback 時與 episode 不同），僅供 log／除錯
        _epActualEp: Number.isFinite(epNumber) ? epNumber : null,
        _adapterFallbackEp: isFallbackEp,
        _areaMismatch: false,
        _areaMatch: false,
      });
    }
    return out;
  }

  // === 多源單集 helper：見上方 allAreSources 分支的呼叫處 ===
  //
  // jpyy 在「單集電影」情境下，會把該片所有可選來源（語言/清晰度）
  // 塞在同一個 episodeList。這時主迴圈只挑 idx=0 → 其餘源被默默丟掉。
  // 這裡把所有源都解出來、每源建一條 resource（episode=1），讓
  // smartDeduplicate 的「語言維度」把它們當成不同版本保留（先前修的
  // extractLanguageTag + versionKey 邏輯）→ REX 詳細頁看到 1 集、
  // 該集下面有多個 source 切換，每個 source 帶版本標籤
  // （例如 `[1995年 - 粵語]`、`[1995年 - 國語]`）。
  async function _buildAdapterMultiSourceResources(item, episodes, siteTitle, type, vod_name, vod_remarks) {
    const out = [];
    const displayName = _adapterSeasonLabel(vod_name, type);
    for (const src of episodes) {
      const resolved = await _adapterResolvePlay(src.token);
      if (!resolved || resolved.length === 0) continue;
      for (const r of resolved) {
        const url = r?.url;
        if (!url || !isPlayableUrl(url)) continue;
        const resName = r.resolutionName || '';
        const resInfo = extractResolutionInfo(vod_name, `${resName} ${r.resolution || 0}p`);
        // 描述：片名 + 「．[語言/清晰度]」（與多集影集「．第N集」同一風格）
        //
        // ★ source 標籤剝掉語言字眼：jpyy 多源（金牌影視）對
        //   「大話西遊之大聖娶親」會把「粵語版」「國語版」拆成 2 個
        //   src，每個 src.name='粤语'/[国语]'。拼進 description
        //   會顯示「[粤语]」+ 頂層 lang=粵語 兩處重複。
        //   語言已由頂層 language 字段承擔，source 標籤只留「清晰度」/
        //   「其他 metadata」即可。語言標籤後續仍會在 _rawName 內重建
        //   （見 _rawName: ${vod_name}（${langLabel}）），讓
        //   extractLanguageTag 抽得到。
        //
        //   重要：langLabel 是「繁體」（extractLanguageTag 統一輸出繁體），
        //   但 src.name 可能是簡體（「粤语」），要對「langLabel + 簡體變體」
        //   都 try 刪，否則 replace 不命中。
        const langLabel = extractLanguageTag(src.name) || '';
        let srcNonLang = src.name || '';
        if (langLabel && srcNonLang) {
          const variants = new Set([langLabel]);
          variants.add(langLabel.replace(/國/g, '国').replace(/粵/g, '粤').replace(/語/g, '语'));
          for (const v of variants) {
            if (v && srcNonLang.includes(v)) {
              srcNonLang = srcNonLang.replace(v, '').trim();
            }
          }
        }
        const sourceLabel = srcNonLang ? `[${srcNonLang}]` : '';
        const tail = sourceLabel;
        out.push({
          name: siteTitle,
          description: tail ? `${displayName}．${tail}` : displayName,
          url: wrapM3U8WithFilter(url.trim(), {
            site: siteTitle, name: displayName, episode: sourceLabel,
            adapter: true,
          }),
          playerType: 'app',
          customHeaders: { 'X-Forward-Skip-Redirect-Probe': '1' },
          resolution: resInfo.label,
          resolutionLevel: resInfo.level,
          isHD: resInfo.isHD,
          is4K: resInfo.is4K,
          qualityTags: resInfo.tags,
          qualityScore: resInfo.qualityScore,
          isHttps: url.startsWith('https'),
          // 全部視為第 1 集（單集電影）
          episode: 1,
          // 語言維度是去重鍵的一部分；把 src.name 餵進 _rawName 的副標記
          // 讓 cleanResourceForOutput 內的 extractLanguageTag 抽得到。
          _adapterSourceLabel: src.name,
          _adapterSite: item._adapterSite,
          _matchType: 'exact',
          _matchScore: 1,
          _confidence: 1,
          _isMainSource: CONFIG.MAIN_SOURCES.includes(siteTitle),
          _hasEpInfo: false,
          _rawName: langLabel ? `${vod_name}（${langLabel}）` : vod_name,
          _seasonFromItem: extractSequelNumber(vod_name),
          _year: item.vod_year || null,
          _area: item.vod_area || null,
          _ep: 1,
          _epActualEp: 1,
          _adapterFallbackEp: false,
          _areaMismatch: false,
          _areaMatch: false,
        });
      }
    }
    return out;
  }

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
          // ★ 集數抽取必須認全格式（「01」「EP01」「第1話」…），
          //   只認「第N集/期」時其他格式的 _ep=null，切到那集就整批被丟，
          //   使用者看到「這集搜不到」。見 _macEpNumber 註解。
          const episodeNumber = _macEpNumber(epName);

          // ★ 綜藝型集名的判斷依據（「第N期」）。
          //
          //   這裡必須重新宣告 epMatch：改成 _macEpNumber 後原本的
          //   `const epMatch = epName.match(/第(\d+)(集|期)/)` 已被移除，
          //   但下面的 _isVariety 仍在讀 epMatch —— 參照未宣告的變數會拋
          //   ReferenceError，而呼叫端 _adapterPool 的 `catch {}` 會把它
          //   靜默吞成 null，症狀是「每個 MacCMS 站都回 0 筆、日誌無任何錯誤」。
          //   （實機日誌：抓到 8 條播放網址，最終結果 0 筆。）
          // ★ 群組編號刻意維持與原版一致：第 1 組是數字、第 2 組是
          //   「集/期」—— 下方 _isVariary 的 epMatch?.[2] === '期' 依賴它。
          const epMatch = epName.match(/第(\d+)\s*(集|期)/);

          const resolutionInfo = extractResolutionInfo(vod_name, epName);

          const dateMatch = epName.match(/(\d{4}年\d{1,2}月\d{1,2}日|\d{4}\.\d{1,2}\.\d{1,2}|\d{4}\d{2}\d{2})/);

          // 資源站回傳簡體，統一轉繁體後再顯示
          // ★ 走 _adapterSeasonLabel 而非 toDisplayText：站方把季別寫進
          //   片名（「庆余年第二季」「进击的巨人 最终季」）時，自動
          //   抽出統一成「第N季」格式，與頂層 season 欄位不重複。
          const displayName = _adapterSeasonLabel(vod_name, type);
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
        // ★ 過濾「預告片 / 預告 / 花絮 / 片段」之類非正片
        //
        // 背景：站方常把「破·地獄[預告片]」「沙丘2[預告片]」等非正片
        // 也歸進電影搜尋結果（v_type='movie'）。這對使用者是噪音——
        // 點下去是 30 秒預告，正片得另找。extractSequelNumber 對
        // 「預告」字眼已回 null，排序會掉到後段；但**不會被排除**，
        // 所以 REX 端仍會把它列為一條候選，使用者看得到。
        //
        // 規則：vod_name 內含常見「非正片」字眼 → 跳過，不進 results。
        // 注意：這裡的 vod_name 是從站方解析出的原始片名（_rawName），
        // 站方在標題上常會用方括號 [預告片] 標明 —— 整段抓出來比對。
        const isNonMainRelease = /[\[【（(]\s*(预告片|預告片|预告|預告|花絮|片段|彩蛋|片花|幕后|幕後|特辑|特輯|先行|先导|先導|幕后花絮|幕後花絮)[\]】）)]/i.test(vod_name)
            || /\b(预告|預告|花絮|片段|彩蛋|片花|幕后|幕後|特辑|特輯|先行|先导|先導)\b/i.test(vod_name);
        if (!isNonMainRelease) {
          const [quality, url] = firstM3U8.split('$');
        const qualityText = quality.toLowerCase().includes('tc') ? '搶先版' : '正片';

        const resolutionInfo = extractResolutionInfo(vod_name, quality);

        const displayName = _adapterSeasonLabel(vod_name, type);
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
 * URL 存活探測的跨搜尋共用表：url → Promise<boolean>。
 *
 * 存在的理由見 probeUrlsAlive 內的說明 —— probe 是 fire-and-forget 的背景
 * 任務，上一季的 probe 還在飛時使用者切到下一季，同一批 CDN 路徑會被再打
 * 一次 HEAD。這裡讓後到的 probe 共用前一次的 Promise，並在結束後清除。
 */
const _PROBE_INFLIGHT = new Map();

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

  // ★ 同一 URL 在同一輪只打一次 HEAD（保險層）。
  //
  // 去重不能改變回傳陣列長度（呼叫端用 index 對應），所以這裡建
  // 一張「位置 → 唯一 URL index」的對照表，worker 只對唯一 URL 發請求，
  // 結果再廣播回所有相同的位置。
  const uniqueUrls = [];
  const posToUnique = new Array(urls.length);
  const seen = new Map();
  for (let i = 0; i < urls.length; i++) {
    const u = urls[i];
    let uIdx = seen.get(u);
    if (uIdx === undefined) {
      uIdx = uniqueUrls.length;
      uniqueUrls.push(u);
      seen.set(u, uIdx);
    }
    posToUnique[i] = uIdx;
  }

  // ★★ 跨搜尋共用：同一支片子的不同集常共用 CDN 路徑，且 probe 是
  //   fire-and-forget 的背景任務。上一季（S1）的 probe 還在飛、使用者就
  //   切到下一季（S2），S2 的 probe 會對同一批 URL 再打一次 HEAD ——
  //   實測 log 裡同一個「…/8719_dba5ff02」出現 2~3 次 HEAD 就是這樣來的。
  //
  //   重打不只是浪費頻寬，還會延長背景 probe 的存活時間，讓它更容易撞上
  //   使用者切換造成的 CancellationError。這裡用 module 級的 in-flight
  //   表讓後到的 probe 直接共用前一次的結果。
  const startProbe = (u) => {
    const p = (async () => {
      try {
        const resp = await Widget.http.request({ url: u, method: 'HEAD', timeout });
        const code = resp?.statusCode ?? 0;
        return code >= 200 && code < 400;
      } catch (_) {
        // 某些 CDN 不接受 HEAD，會在 GET 時回 405/200 → 標失效，
        // 不寫 cache，下次重搜時自然重新探測。
        return false;
      }
    })();
    _PROBE_INFLIGHT.set(u, p);
    // 探測結束後（含取消）都要清掉，否則 table 會無限成長且回傳過期結果。
    p.finally(() => _PROBE_INFLIGHT.delete(u));
    return p;
  };

  // 每個「唯一 URL」只對應一個 Promise：已在飛就沿用，沒有才啟動。
  //
  // ★ 啟動必須分批，不能先全部 startProbe 再分批 await —— 那樣只是限制
  //   「等待」，10 個請求還是會同時發出去，等於併發上限失效（實測
  //   peak=10 > concurrency=4）。必須每批真的只啟動 concurrency 個。
  const uniquePromises = new Array(uniqueUrls.length);
  const borrowed = [];             // 沿用既有 in-flight 的索引（不佔本輪額度）
  const todo = [];                 // 本輪要啟動的索引
  for (let k = 0; k < uniqueUrls.length; k++) {
    const existing = _PROBE_INFLIGHT.get(uniqueUrls[k]);
    if (existing) {
      uniquePromises[k] = existing;
      borrowed.push(k);
    } else {
      todo.push(k);
    }
  }

  // 分批啟動 + 等待，維持「最多 concurrency 個同時在飛」。
  // （一次把 30 個 HEAD 全打出去會撞滿 Forward 的 HTTP 連線。）
  for (let k = 0; k < todo.length; k += concurrency) {
    const batch = todo.slice(k, k + concurrency);
    for (const i of batch) uniquePromises[i] = startProbe(uniqueUrls[i]);
    await Promise.all(batch.map(i => uniquePromises[i]));
  }

  // 沿用既有 in-flight 的那些不佔用本輪額度，但還是要等它們收斂。
  await Promise.all(borrowed.map(i => uniquePromises[i]));

  const uniqueResults = await Promise.all(uniquePromises);

  // 廣播回原順序，長度與輸入一致。
  //
  // 註：HEAD 失敗不再 fallback 到 GET 重試。原本有這層 fallback 是為了兼容
  // 「CDN 不接受 HEAD 但 GET 200」，但實機 100 筆規模時全部跑 GET 會把總探測
  // 時間從 1x 拉到 2x（probe 用滿了 forward 的 HTTP timeout），使用者體感卡頓。
  // 失效的不寫 cache，下次重搜時自然會重新探測；而「播一會斷線重頭」的
  // CDN 502 不會被 HEAD 放行（502 ≥ 400），所以這層簡化不會讓壞 URL 進 cache。
  const out = new Array(urls.length);
  for (let i = 0; i < urls.length; i++) out[i] = uniqueResults[posToUnique[i]];
  return out;
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

// ==================== 簽名型 VOD 站 Adapter ====================
//
// 為什麼需要這一層：
// 除了 MacCMS 採集站（/api.php/provide/vod，列表就帶 vod_play_url），
// 還有一類「自製 API + 簽名」的站（金牌影視 jpyy 即為代表）。兩者差異：
//
//   MacCMS：GET ?ac=detail&wd=xxx → {data:{list:[{vod_play_url}]}}，一次搞定。
//   簽名站：搜尋 → 詳情頁抓集數 → 逐集換播放連結，欄位名完全不同
//          （vodId/vodName/vodArea…），且請求必須帶 sign/deviceId/t。
//
// 兩者管線無法共用，但**輸出格式可以對齊** —— 只要讓 adapter 把自己
// 吐出的結果轉成 MacCMS 的 item 形狀（vod_name / vod_play_url /
// vod_play_from / vod_year / vod_area），後面整套既有邏輯
// （isSmartSeriesMatch / extractPlayInfoForCache / 去重 / 年份季別
// 過濾 / m3u8 wrap）完全不用動。新增一個站 = 在 ADAPTER_SITES 加一筆
// 設定，不需要新增任何程式碼路徑。
//
// 設計要點：
//  1. 簽名純 JS 實作 —— widget 跑在 vm 沙箱，沒有 require('crypto')。
//  2. 每個站可覆寫任何環節（search/list/episodes/playUrl），預設
//     實作對應 jpyy 這類「同簽名協定」站；不同協定只要寫自己的函式即可。
//  3. 任何 adapter 失敗一律靜默丟棄，絕不影響 MacCMS 主流程。

// ---------- 純 JS UTF-8 / MD5 / SHA1（沙箱可用） ----------
//
// 刻意不使用 unescape(encodeURIComponent(s))：unescape 在部分沙箱
// （vm context / 嚴格 CSP）不可用，而簽名是硬需求，不能依賴它。
function _utf8Bytes(str) {
  const out = [];
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i);
    if (c < 0x80) {
      out.push(c);
    } else if (c < 0x800) {
      out.push(0xc0 | (c >> 6), 0x80 | (c & 0x3f));
    } else if (c >= 0xd800 && c <= 0xdbff && i + 1 < str.length) {
      const c2 = str.charCodeAt(i + 1);
      if (c2 >= 0xdc00 && c2 <= 0xdfff) {
        const cp = 0x10000 + ((c - 0xd800) << 10) + (c2 - 0xdc00);
        out.push(0xf0 | (cp >> 18), 0x80 | ((cp >> 12) & 0x3f), 0x80 | ((cp >> 6) & 0x3f), 0x80 | (cp & 0x3f));
        i++;
        continue;
      }
      out.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 0x3f), 0x80 | (c & 0x3f));
    } else {
      out.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 0x3f), 0x80 | (c & 0x3f));
    }
  }
  return out;
}

function _md5Hex(str) {
  const bytes = _utf8Bytes(str);
  const bitLen = bytes.length * 8;
  const words = [];
  for (let i = 0; i < bytes.length; i++) words[i >> 2] |= bytes[i] << ((i % 4) * 8);
  words[bytes.length >> 2] |= 0x80 << ((bytes.length % 4) * 8);
  // 補到 ≡14 (mod 16) words，再塞 2 個 length words = 整數個 64 bytes 區塊
  while (words.length % 16 !== 14) words.push(0);
  words.push(bitLen >>> 0, Math.floor(bitLen / 0x100000000) >>> 0);

  const add32 = (a, b) => (a + b) | 0;
  const rol = (n, c) => (n << c) | (n >>> (32 - c));
  const FF = (b, c, d) => (b & c) | (~b & d);
  const GG = (b, c, d) => (b & d) | (c & ~d);
  const HH = (b, c, d) => b ^ c ^ d;
  const II = (b, c, d) => c ^ (b | ~d);
  const K = [
    0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501,
    0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be, 0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821,
    0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
    0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a,
    0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c, 0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70,
    0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
    0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1,
    0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1, 0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391,
  ];
  const S = [
    7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
    5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
    4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
    6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
  ];

  let a0 = 0x67452301 | 0, b0 = 0xefcdab89 | 0, c0 = 0x98badcfe | 0, d0 = 0x10325476 | 0;
  for (let i = 0; i < words.length; i += 16) {
    const M = words.slice(i, i + 16);
    let A = a0, B = b0, C = c0, D = d0;
    for (let j = 0; j < 64; j++) {
      let F, g;
      if (j < 16) { F = FF(B, C, D); g = j; }
      else if (j < 32) { F = GG(B, C, D); g = (5 * j + 1) % 16; }
      else if (j < 48) { F = HH(B, C, D); g = (3 * j + 5) % 16; }
      else { F = II(B, C, D); g = (7 * j) % 16; }
      // 標準順序：F + A + K + M 全部在 rotate 之前加完，rotate 後只補 B
      F = add32(add32(add32(F, A), K[j]), M[g]);
      F = add32(B, rol(F, S[j]));
      A = D; D = C; C = B; B = F;
    }
    a0 = add32(a0, A); b0 = add32(b0, B); c0 = add32(c0, C); d0 = add32(d0, D);
  }
  const le = n => [n & 0xff, (n >>> 8) & 0xff, (n >>> 16) & 0xff, (n >>> 24) & 0xff]
    .map(b => (b & 0xff).toString(16).padStart(2, '0')).join('');
  return le(a0) + le(b0) + le(c0) + le(d0);
}

function _sha1Hex(str) {
  const bytes = _utf8Bytes(str);
  const bitLen = bytes.length * 8;
  const words = [];
  // ★ SHA1 是 big-endian 組字（MD5 是 little-endian）—— 兩者相反，
  //   沿用 MD5 的寫法會算出「看起來像雜湊但完全錯誤」的結果。
  for (let i = 0; i < bytes.length; i++) words[i >> 2] |= bytes[i] << ((3 - (i % 4)) * 8);
  words[bytes.length >> 2] |= 0x80 << ((3 - (bytes.length % 4)) * 8);
  while (words.length % 16 !== 14) words.push(0);
  words.push(Math.floor(bitLen / 0x100000000) >>> 0, bitLen >>> 0);

  const rol = (n, c) => (n << c) | (n >>> (32 - c));
  let h0 = 0x67452301 | 0, h1 = 0xefcdab89 | 0, h2 = 0x98badcfe | 0, h3 = 0x10325476 | 0, h4 = 0xc3d2e1f0 | 0;
  const K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  for (let i = 0; i < words.length; i += 16) {
    const M = words.slice(i, i + 16);
    const w = M.slice();
    for (let j = 16; j < 80; j++) w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1) | 0;
    let A = h0, B = h1, C = h2, D = h3, E = h4;
    for (let j = 0; j < 80; j++) {
      let F, k;
      if (j < 20) { F = (B & C) | (~B & D); k = 0; }
      else if (j < 40) { F = B ^ C ^ D; k = 1; }
      else if (j < 60) { F = (B & C) | (B & D) | (C & D); k = 2; }
      else { F = B ^ C ^ D; k = 3; }
      const tmp = (rol(A, 5) | 0) + (F | 0) + E + K[k] + w[j] | 0;
      E = D; D = C; C = rol(B, 30) | 0; B = A; A = tmp;
    }
    h0 = (h0 + A) | 0; h1 = (h1 + B) | 0; h2 = (h2 + C) | 0; h3 = (h3 + D) | 0; h4 = (h4 + E) | 0;
  }
  const be = n => ((n >>> 24) & 0xff).toString(16).padStart(2, '0') + ((n >>> 16) & 0xff).toString(16).padStart(2, '0')
    + ((n >>> 8) & 0xff).toString(16).padStart(2, '0') + (n & 0xff).toString(16).padStart(2, '0');
  return [h0, h1, h2, h3, h4].map(be).join('');
}

// ---------- 簽名協定的預設實作（對應 jpyy / 金牌影視這類站） ----------
//
// ★★ 簽名的兩條鐵則（實測結論，不可「順手優化」）★★
//
// 規則 1：簽名對象 = **實際送出的 query 字串原樣**，一個字都不能差。
//   站方拿收到的 query 重算後比對字面。簽 A 送 B → code 122001。
//
// 規則 2：**非 ASCII 值一律用原始字元**（area=美国 / lang=英语 /
//   v_class=科幻 / 搜尋 keyword 都屬此類）。實測三種組合：
//     簽原始 + 送編碼 → 200 ✅
//     簽編碼 + 送編碼 → 122001 ❌  ← 先 encodeURIComponent 再簽一定失敗
//     簽原始 + 送原始 → 200 ✅
//   這是這類站最容易踩的坑。
//
// 參數順序不影響（站方對收到的字串重算），但**不可出現重複 key**
// —— 例如 base 已含 sort=1 又 append sort=4，送出兩個 sort 會簽不過。

function _adapterRandomId() {
  // deviceId 只要看起來像 UUID 即可，站方不驗格式
  const hex = n => Math.floor(Math.random() * (1 << (4 * n))).toString(16);
  return `${hex(8)}-${hex(4)}-4${hex(3)}-${((Math.random() * 4) | 0) + 8}${hex(3)}-${hex(12)}`;
}

/**
 * 建立簽名 header。
 * @param {string} sentQuery 將實際送出的 query 字串（原樣，未編碼）
 * @param {object} site      站點設定（需含 signKey / signAlgo）
 */
function _adapterBuildHeader(sentQuery, site) {
  const t = Date.now();
  const key = site.signKey || '';
  const signStr = sentQuery + `&key=${key}` + `&t=${t}`;
  const algo = site.signAlgo || 'sha1-md5';
  const sign = algo === 'md5' ? _md5Hex(signStr)
    : algo === 'sha256-md5' ? _md5Hex(signStr)  // 預留：站方改演算法時只改這裡
    : _sha1Hex(_md5Hex(signStr));

  const headers = {
    'User-Agent': site.ua || API_USER_AGENT,
    t: String(t),
    sign,
  };
  if (site.deviceHeader !== false) headers.deviceId = _adapterRandomId();
  return headers;
}

/**
 * 進行中的 adapter HTTP 請求，key = `站id|完整網址`。
 *
 * 只記錄「還沒回來的」請求，完成後立刻刪除（見 _adapterGet 裡的 finally）。
 */
const _ADAPTER_INFLIGHT = new Map();

/**
 * 極短 TTL 的 detail 回應快取，key = `站id|完整網址`。
 *
 * 為什麼需要：搜尋流程對同一個 vodId 會打兩次 `/detail/{vodId}` ——
 *   1. _ageEpisodes 展開 playlists 抓播放 token
 *   2. _agePlayUrls 為了拿 player_jx 的 vip/zj 前綴又打一次
 * 第二次的用途「只有」取前綴（站方設定，非短效憑證），但因為
 * _ADAPTER_INFLIGHT 只共用「進行中」的請求，detail 早已回來，
 * 所以第二次必定是真的重新下載 —— 實測這一項就吃掉 1.3 秒
 * （+511ms → +1804ms，佔整次搜尋 1.7s 的 76%）。
 *
 * 為什麼這樣安全：這不是「跨請求重放 token」。
 *   - 播放 token 來自第 1 次呼叫寫進 nid 的 sources JSON，不走這個快取
 *   - 快取只回應第 2 次呼叫要的 player_jx 前綴（站方固定設定）
 * TTL 取 30s：只覆蓋「同一次搜尋內相隔數百毫秒的兩次呼叫」這個情境，
 * 遠短於 token 的實際壽命，不會讓使用者拿到過期 token。
 */
const _ADAPTER_DETAIL_CACHE = new Map();
// TTL 取自 CONFIG（在 CONFIG 定義之後才讀取，故用延遲 getter 的等價寫法）。
const _ADAPTER_DETAIL_TTL = CONFIG.ADAPTERS?.DETAIL_CACHE_TTL ?? 30000;

/**
 * 帶簽名的 GET。
 * site 設定可覆寫 httpGet（如某站需特殊 header / 不需簽名）。
 *
 * opts.cacheTtl：>0 時把回應存進極短 TTL 快取（見 _ADAPTER_DETAIL_CACHE）。
 * 只給「確定是 idempotent 且非短效憑證」的端點用，例如 /detail。
 */
async function _adapterGet(site, endpoint, query, opts = {}) {
  const qs = Object.keys(query).map(k => `${k}=${query[k]}`).join('&');
  const url = site.base + endpoint + (qs ? '?' + qs : '');
  const headers = site.buildHeaders ? site.buildHeaders(qs) : _adapterBuildHeader(qs, site);

  const fetcher = site.httpGet || ((u, h) => Widget.http.get(u, { headers: h, timeout: opts.timeout || CONFIG.REQUEST_TIMEOUT }));

  const ttl = opts.cacheTtl || 0;
  const cacheKey = `${site.id}|${url}`;

  // 極短 TTL 快取命中：直接回放，省掉一次完整 RTT。
  if (ttl > 0) {
    const hit = _ADAPTER_DETAIL_CACHE.get(cacheKey);
    if (hit && (Date.now() - hit.ts) < ttl) return hit.val;
    if (hit) _ADAPTER_DETAIL_CACHE.delete(cacheKey);
  }

  // ★ 併發去重。搜尋流程會對同一個 vodId 打兩次 detail：一次在
  //   _ageEpisodes 展開清單、一次在 _adapterResolvePlay 前重新確認。
  //   加上多個候選同時展開，api.agedm.io 立刻回 429（站方限流很緊）。
  //
  //   日誌實測：同一個 /detail/20190014 在同一秒內被送 5~6 次，
  //   然後 /v2/search 整個被 429 擋掉 —— 連搜尋階段都受影響。
  //
  //   把「進行中的請求」共用成同一個 Promise，既省流量又天然限流。
  //   ★ 只能快取 inflight 不能快取結果：detail 裡的播放 token 是
  //     短效的，存起來會在換集時拿到死掉的 URL。
  const inflightKey = `${site.id}|${url}`;
  if (_ADAPTER_INFLIGHT.has(inflightKey)) return _ADAPTER_INFLIGHT.get(inflightKey);

  const p = (async () => {
    const resp = await fetcher(url, headers);

    // 統一處理三種回傳：字串 / {data:物件} / {data:字串}
    let payload = resp;
    if (resp && typeof resp === 'object' && 'data' in resp) payload = resp.data;
    if (typeof payload === 'string') {
      const txt = payload;
      try { payload = JSON.parse(txt); }
      catch { return site.parseError ? site.parseError(txt) : { __html: txt }; }
    }
    if (payload && typeof payload === 'object' && payload.code != null && payload.code !== 200) {
      if (site.DEBUG) console.warn(`[adapter:${site.id}] code=${payload.code} ${payload.msg || ''}`);
      return null;
    }
    // ★ 只有明確指定 cacheTtl 的端點才存進短 TTL 快取。
    //   預設（ttl=0）維持「絕不重放結果」的舊語意，token 安全。
    if (ttl > 0 && payload != null) {
      _ADAPTER_DETAIL_CACHE.set(cacheKey, { val: payload, ts: Date.now() });
      // 順手回收：避免長時間使用後 Map 無上限成長。
      if (_ADAPTER_DETAIL_CACHE.size > 40) {
        const now = Date.now();
        for (const [k, v] of _ADAPTER_DETAIL_CACHE) {
          if (now - v.ts > ttl) _ADAPTER_DETAIL_CACHE.delete(k);
        }
      }
    }
    return payload;
  })();

  _ADAPTER_INFLIGHT.set(inflightKey, p);
  // 成敗都要清掉，否則一次 429 會讓這個 key 永久卡在 rejected/舊值。
  p.finally(() => { if (_ADAPTER_INFLIGHT.get(inflightKey) === p) _ADAPTER_INFLIGHT.delete(inflightKey); });
  return p;
}

/**
 * 預設搜尋：video/searchByWordPageable
 * 回傳 { items: [...] }，item 已轉成 MacCMS 欄位名。
 */
async function _adapterDefaultSearch(site, keyword) {
  const j = await _adapterGet(site, '/api/mw-movie/anonymous/video/searchByWordPageable', {
    keyword, pageNum: 1, pageSize: 12, type: 'false',
  });
  const list = j?.data?.list || [];
  return list.map(it => site.toMacItem ? site.toMacItem(it) : ({
    vod_id: String(it.vodId),
    vod_name: it.vodName,
    vod_pic: it.vodPic,
    vod_year: String(it.vodPubdate || '').slice(0, 4) || '',
    vod_area: it.vodArea || '',
    // ★ 不把豆瓣分放進 vod_remarks。
    //
    //   MacCMS 慣例中 vod_remarks 是「狀態標記」（"HD"、"更新至第12集"），
    //   顯示時直接接在片名後面當副標。簽名站回傳的是 vodDoubanScore=7.9，
    //   塞進去會變成「慶餘年1．第03集．7.9」—— 評分被排版成集數的同級，
    //   使用者得自己猜那是什麼，而 REX 也沒有評分欄位可放。
    //
    //   改用站方本來就有的狀態欄位 vodRemarks（實測 "(36全)"、"更新至36集"），
    //   語意與 MacCMS 一致：顯示的是更新進度，不是分數。
    vod_remarks: it.vodRemarks || (it.vodVersion || ''),
  }));
}

/**
 * 預設集數：抓行動版詳情頁 HTML 的 episodeList。
 * 這類站沒有「直接回集數」的 API（實測 /vod/list 只回簽名錯誤）。
 */
async function _adapterDefaultEpisodes(site, vodId) {
  const origin = site.base.replace(/^https?:\/\//, '').replace(/^www\./, '');
  const url = `${site.mobileBase || `https://m.${origin}`}/detail/${vodId}`;
  const resp = await Widget.http.get(url, { headers: { 'User-Agent': site.ua || API_USER_AGENT } });
  let html = resp;
  if (resp && typeof resp === 'object' && 'data' in resp) html = resp.data;
  if (typeof html !== 'string') return [];

  const m = html.match(site.episodeRegex || /episodeList.*?\[.*?\}\]\}/);
  if (!m) return [];
  try {
    return JSON.parse('{"' + m[0].replace(/\\"/g, '"')).episodeList;
  } catch (e) {
    return [];
  }
}

/**
 * 預設播放連結：逐集換 URL，回傳多清晰度。
 * 這類站的清單只有最高畫質，其餘要逐集換 —— 見 _adapterBuildPlayUrl。
 */
async function _adapterDefaultPlayUrls(site, vodId, nid) {
  const j = await _adapterGet(site, '/api/mw-movie/anonymous/v2/video/episode/url', { id: vodId, nid });
  return j?.data?.list || [];
}

// ================= AGE 動漫（協定不同，獨立實作） =================
//
// 與 jpyy 的差異（為什麼不能沿用預設三件套）：
//   1. 不簽名 → buildHeaders 覆寫（見 ADAPTER_SITES）
//   2. 搜尋回應在 data.videos、詳情在 data.video.playlists，形狀完全不同
//   3. 播放連結要「先開解析頁 → 正則抓 Vurl → 再取 m3u8」三段跳
//
// ★ 40050 不是錯誤，是「查無此片」。
//   實測 /v2/search?query=庆余年 → {"code":40050,"message":"参数错误！"}，
//   但 query=鬼灭 就正常。AGE 是純動畫站，沒有真人劇，所以國劇片名
//   一律查不到。_adapterGet 對非 200 code 回 null，正好把這些靜靜丟掉，
//   不需要額外處理 —— 但這也代表搜尋真人劇時 AGE 貢獻為零，是預期行為。

/** AGE 搜尋：/v2/search?query=&page= */
async function _ageSearch(site, keyword) {
  const j = await _adapterGet(site, '/search', { query: keyword, page: 1 });
  const list = j?.data?.videos || [];
  return list.map(it => ({
    vod_id: String(it.id),
    vod_name: it.name,
    vod_pic: it.cover || '',
    // premiere 是 "2026-10-04"，取年份。AGE 是動畫站沒有「地區」概念，
    // 留空讓下游 area 過濾不會誤判。
    vod_year: String(it.premiere || '').slice(0, 4) || '',
    vod_area: '',
    // uptodate 是站方既有的狀態欄位（"第02集"、"全集"、"PV"），
    // 語意與 MacCMS 的 vod_remarks 一致，交給 _adapterSafeRemark 處理。
    // 注意站方沒有評分欄位，不會有「豆瓣分被當成狀態標記」的問題。
    vod_remarks: it.uptodate || '',
  }));
}

/**
 * AGE 集數：從 detail 的 playlists 取。
 *
 * 回傳 [{ name, nid }]，nid = 「來源分組|token」（站方給的是 base64
 * token 不是 id；合組是因為同一集在不同源下要配不同 VIP 前綴）。
 *
 * ★ 關鍵：AGE 的資料結構是「來源 → 集數清單」，不是「集數 → 來源」。
 *   所以必須轉置，否則一部單集電影會變成「6 個來源 = 6 集」，
 *   使用者會看到一部電影有 6 集，切集其實是換播放源。
 *
 *   轉置方式：以第一個（依站方 UI 順序的）來源為基準集數序列，
 *   其餘來源的同名集併進同一集的 sources 清單。
 *
 * 只收 m3u8 系列：playlists 裡還有 xigua / qiyi 等非 m3u8 來源，
 * 那是站方網頁版播放器專用，拿到的不是可播的串流網址。
 */
async function _ageEpisodes(site, vodId) {
  // 傳 {} 而非省略：_adapterGet 會直接 Object.keys(query)，給 null 會炸。
  // 詳情頁是路徑式（/detail/{id}），沒有 query 參數。
  //
  // ★ 速度：帶 cacheTtl。_agePlayUrls 換播放 URL 時需要同一份 detail 的
  //   player_jx 前綴，會再打一次同一個網址。短 TTL 快取直接回放，
  //   省掉一次完整 RTT（實測這一項單獨佔 1.3 秒）。
  const j = await _adapterGet(site, `/detail/${vodId}`, {}, { cacheTtl: _ADAPTER_DETAIL_TTL });
  const root = j?.data || j;
  const playlists = root?.video?.playlists || {};
  if (!playlists || typeof playlists !== 'object') return [];

  // 站方 VIP 清單是逗號分隔字串。
  const vipList = String(root.player_vip || '').split(',').map(s => s.trim());
  const labels = root.player_label_arr || {};

  // 依 label_arr（站方 UI 的顯示順序）取 m3u8 來源，站方把熱門源排前面。
  const order = Object.keys(labels).filter(k => playlists[k] && k.includes('m3u8'));

  // 先展開成 [{epName, group, token}] 的扁平清單
  const flat = [];
  for (const groupKey of order) {
    const eps = playlists[groupKey];
    if (!Array.isArray(eps)) continue;
    for (const pair of eps) {
      if (!Array.isArray(pair) || pair.length < 2) continue;
      const [name, token] = pair;
      if (!token) continue;
      flat.push({
        epName: String(name || ''),
        group: groupKey,
        groupLabel: labels[groupKey] || groupKey,
        isVip: vipList.includes(groupKey),
        token: String(token),
      });
    }
  }
  if (!flat.length) return [];

  // ★ 轉置必須「依集數」而不是「依集數名稱」分組。
  //
  //   站方每個來源的集數名不完全一致：同一部電影，ffm3u8 叫
  //   「HD中字」而 wjm3u8 叫「HD」、hnm3u8 叫「抢先版」（實測
  //   「剧场版 鬼灭之刃」三個來源各叫不同名字）。若用名稱當 key，
  //   一部單集電影會變成 5 集（「HD中字」「HD国语」「HD」「TC」
  //   「抢先版」），使用者看到一部電影有 5 集卻切不到不同內容。
  //
  //   真正的集數要從名稱裡抽數字（「第01集」→ 1）。抽不到數字的
  //   （電影的「HD中字」「正片」）視為第 0 集，也就是「單集電影」，
  //   與站方 type/uptodate 一致。
  const byEpNo = new Map();
  for (const f of flat) {
    // 「第01集」/「第1话」/「01」都能抓到數字；抓不到就是無編號的單集。
    const numM = f.epName.match(/(\d+)/);
    const epNo = numM ? parseInt(numM[1], 10) : 0;
    if (!byEpNo.has(epNo)) byEpNo.set(epNo, []);
    byEpNo.get(epNo).push(f);
  }

  // 依集數排序：第 0 集（單集電影）排最前，其餘照數字遞增。
  const epNos = [...byEpNo.keys()].sort((a, b) => a - b);

  const out = [];
  for (const epNo of epNos) {
    const sources = byEpNo.get(epNo);
    // 集數名統一用「第N集」格式，讓下游 episodeLabelOf / 使用者顯示
    // 一致。單集電影沿用「正片」較自然（與 MacCMS 站一致）。
    const epName = epNo > 0 ? `第${epNo}集` : (sources[0].epName || '正片');
    out.push({
      name: epName,
      // 主來源（sources[0]）的 token 就是這一集的播放依據，其餘來源
      // 保留在 nid 的後備清單裡 —— 換 URL 時若主來源解析失敗可自動
      // 換下一個來源，不必讓使用者看到空白來源。
      //
      // ★ gl = groupLabel，站方 UI 上對人類可讀的 CDN 名（「非凡」「无尽」
      //   「计算云」），跟 g（ffm3u8/wjm3u8/lzm3u8）對應。多源切換時 REX
      //   給使用者看到「非凡」比「ffm3u8」直觀。
      nid: JSON.stringify(sources.map(s => ({
        g: s.group, gl: s.groupLabel, v: s.isVip ? 1 : 0, t: s.token,
      }))),
      sources,
    });
  }
  return out;
}

/**
 * AGE 播放連結：解析頁 → Vurl → m3u8。
 *
 * AGE 的播放連結是三段式，比 jpyy 多兩跳：
 *   1. playlists 給的是 base64 token（age_xxxx），不是網址
 *   2. 組出「解析頁網址」去 GET，拿回一頁 HTML
 *   3. 從 HTML 裡的 `Vurl = '...'` 抓到真正的 m3u8
 *
 * ★ 第 2 步的解析服務在 jx.wuzhoupai.com，站方不是自己架的。
 *   VIP 清單內的源要用 player_jx.vip 前綴、其餘用 player_jx.zj。
 *   實測用錯前綴會拿到沒有 Vurl 的頁面（靜默失敗，不是報錯），
 *   所以這個判斷不能省。
 *
 * ★ 會依序試所有來源直到成功 —— 解析服務是第三方（wuzhoupai），
 *   某個 token 過期或該源掛掉是很常見的。回傳一筆能播的總比
 *   讓使用者看到空白來源好（框架會把這筆來源丟掉，整部作品少一路）。
 *
 * 回傳 [{ url, resolution, resolutionName }] 以符合框架契約。
 * AGE 不提供多清晰度資訊，一律標最高畫質（站方單一 m3u8）。
 */
async function _agePlayUrls(site, vodId, nid) {
  // nid 是 _ageEpisodes 存的 sources JSON（見該函式）
  let sources;
  try {
    sources = JSON.parse(String(nid || ''));
  } catch (e) {
    return [];
  }
  if (!Array.isArray(sources) || !sources.length) return [];

  // 再取一次 detail：player_jx / player_vip 只在 detail 回應裡，
  // 沒存起來的話這裡就沒有前綴可用。延遲換取的設計本來就是
  // 「用到才換」，多這一次請求是必要的。
  //
  // ★ 速度：走 cacheTtl。剛才 _ageEpisodes 才剛抓過同一個 /detail，
  //   短 TTL 快取會直接回放，省掉一次完整 RTT（實測省 1.3 秒）。
  //   這裡只用到 player_jx 的 vip/zj 前綴（站方固定設定），
  //   不是短效憑證，重放安全；播放 token 來自上一步存進 nid 的
  //   sources JSON，完全不受這個快取影響。
  const j = await _adapterGet(site, `/detail/${vodId}`, {}, { cacheTtl: _ADAPTER_DETAIL_TTL });
  const root = j?.data || j;
  const jx = root?.player_jx || {};
  if (!jx.vip && !jx.zj) return [];

  // 依來源順序試，第一個解析成功的就是它。
  //
  // ★ 速度：原本是「試一個失敗才試下一個」的循序迴圈，最壞情況
  //   N 個壞源 = N 次完整 RTT 串起來（解析服務在第三方 wuzhoupai，
  //   單源 ~1s，2 個壞源就是 2 秒白等）。
  //
  //   改成「併發發出去、依原順序取第一個成功」：延遲上限從 sum 降成
  //   max，並且維持「優先用站方排在前面的源」這個行為
  //   （Promise.all + 依序掃描，結果與循序版本完全相同）。
  // 與原 ordered 不同：這裡帶上 group / groupLabel 供 probe 帶回 source 標籤，
  // 否則多源切換時 REX 看不到「非凡」「无尽」這類 CDN 區分。
  // ★ 從 _ageEpisodes 存的 sources JSON 抽（順序 = player_label_arr 站方排的順序）。
  //   對每個 (prefix, token) 對應到 s.g 跟 s.gl。
  const sourceLabels = (() => {
    try { return JSON.parse(String(nid || '')) || []; } catch (e) { return []; }
  })();
  const ordered = [];
  for (let i = 0; i < sourceLabels.length; i++) {
    const s = sourceLabels[i];
    const token = s && s.t;
    if (!token) continue;
    const prefix = s.v ? jx.vip : jx.zj;
    if (!prefix) continue;
    ordered.push({ prefix, token, group: s.g, groupLabel: s.gl || s.g });
  }
  if (ordered.length === 0) return [];

  const probe = async ({ prefix, token, group, groupLabel }) => {
    try {
      const resp = await Widget.http.get(prefix + token, {
        headers: { 'User-Agent': site.ua, 'Referer': 'https://m.agedm.io/' },
        timeout: CONFIG.REQUEST_TIMEOUT,
      });
      let html = resp;
      if (resp && typeof resp === 'object' && 'data' in resp) html = resp.data;
      if (typeof html !== 'string' || !html) return null;
      // 站方在頁面裡用單引號包住 Vurl。正則寬鬆一點：站方改引號樣式時
      // 寧可寬鬆也不要整個功能壞掉（抓不到就續試下一個來源）。
      const m = html.match(/Vurl\s*=\s*['"]([^'"]+)['"]/);
      if (!m || !m[1].trim()) return null;
      const vurl = m[1].trim();

      // ★ Vurl 當下可達性檢查。
      //
      // 為什麼：解析服務（wuzhoupai）回「Vurl=...」只代表站方有解析出
      // 結果，不代表該 URL 當下能播。實測 Vurl 短時間過期 / CDN 端 502
      // 都會發生（vip.ffzy-plays.com、64.32.20.246 都遇過）—— 不驗證
      // 的話把壞 URL 給 REX，使用者點下去 502 看到一片黑，沒有任何
      // fallback 機制。
      //
      // HEAD 探測超時 2s（一般 m3u8 主機 200ms 內回應）：2s 沒回當不可達，
      // 跳下一個 source。
      //
      // ★ 不驗證的慘痛後果：站方詳情 API 永遠能解析出 Vurl（站方 CDN
      //   有問題時仍塞 HTML 給你），光看 probe 認為「成功」就把 URL
      //   給 REX。REX 播放時實際打 Vurl 失敗 → 整個 AGE 來源全廢。
      try {
        const head = await Widget.http.get(vurl, {
          method: 'HEAD',
          timeout: 2000,
          headers: { 'User-Agent': site.ua, 'Referer': 'https://m.agedm.io/' },
        });
        const status = head?.statusCode || head?.status;
        if (status && status >= 400) return null;  // 404/502 → 換下一個
      } catch (e) {
        // HEAD 失敗：m3u8 主機無回應 / SSL 錯誤 / 連線逾時 → 換下一個
        return null;
      }

      return { url: vurl, resolution: 1080, resolutionName: 'AGE', _group: group, _groupLabel: groupLabel };
    } catch (e) {
      return null;   // 這個源壞了，改用下一個
    }
  };

  // 併發發出所有探測，依站方順序取第一個 Vurl 可達的結果。
  //
  // 為什麼要 HEAD 探 Vurl：
  //   解析服務 (jx.wuzhoupai.com) 拿到的是站方預先解析的 CDN URL，
  //   站方 CDN 隨時可能 502（實測 vip.ffzy-plays.com、64.32.20.246 都遇過）。
  //   不驗證的話把壞 URL 給 REX，使用者點下去整段播不了。
  //
  // 為什麼只回 1 條（不像 jpyy 多源那樣回多條）：
  //   age 的「多源」是「同一集的多個 CDN 鏡像」（非凡/无尽/计算云/...），
  //   不是「同一集的不同語言/畫質版本」。每集建 4 條同名同集 source
  //   對使用者體驗很差（80 集動漫會變 320 條「同一集」）。
  //   改成「保證給的 URL 當下能 200」就夠了。
  const probed = await _adapterPool(
    ordered.map(o => async () => await probe(o)),
    ordered.length,
  );
  for (const r of probed) if (r) return [r];
  return [];
}

// ---------- 簽名型站點清單 ----------
//
// 新增同協定站：複製一個物件、改 id/base/signKey 即可，零程式碼改動。
// 協定不同的站（如非簽名但非 MacCMS）：覆寫 buildHeaders / search /
// episodes / playUrls 其中任一即可，框架不變。
//
// ⚠️ signKey 屬於站方公開前端常數，非秘密憑證。若站方改 key 只需更新
//   這裡，不需動任何程式邏輯。
const ADAPTER_SITES = [
  {
    id: 'jpyy',
    title: '金牌影視',
    base: 'https://www.jiabaide.cn',
    signKey: 'cb808529bae6b6be45ecfab29a4889bc',
    // 這類站回傳的資料比 MacCMS 站豐富（豆瓣評分、地區、多清晰度），
    // 給予排序加成。
    isMain: true,
    // ★ 自訂 toMacItem：把 jpyy 的 typeId1 帶進 _siteTypeId 私有欄。
    //
    // 為什麼：jpyy 對「劇場版」「電影版」會存成 typeId1=1（電影），
    // 對 TV 動漫存成 typeId1=4（劇集）。使用者從 REX 進來帶 type='tv'
    // 時，我們的任務是找「TV 動漫」。若同標題下同時有劇場版(typeId1=1)
    // 跟 TV 動漫(typeId1=4)，劇場版是 spin-off 必須擋掉。
    //
    // 預設 _adapterDefaultSearch 只取 5 個欄位，typeId1 被丟掉 →
    // 下游 isSmartSeriesMatch 看不到 → 劇場版會被當成 S1 命中 exact 100。
    // 補上 _siteTypeId 後，extractPlayInfoForCache 進去就能辨別。
    //
    // ★ 必帶的 MacCMS 欄位（否則 extractPlayInfoForCache / isSmartSeriesMatch
    //   / 去重 / 排序全部走空值）：
    //   - vod_id、vod_name、vod_pic、vod_year、vod_area、vod_remarks。
    // ★ 私有欄 _siteTypeId / _siteTypeName：
    //   下游 extractPlayInfoForCache 內可讀到（item._siteTypeId），
    //   進 isSmartSeriesMatch 前預篩時判 typeId1===1 但 type==='tv' → 擋。
    toMacItem: (it) => ({
      vod_id: String(it.vodId),
      vod_name: it.vodName,
      vod_pic: it.vodPic,
      vod_year: String(it.vodPubdate || '').slice(0, 4) || '',
      vod_area: it.vodArea || '',
      // ★ vod_remarks 一律不帶 vodDoubanScore（見 _adapterDefaultSearch 註解）。
      vod_remarks: it.vodRemarks || (it.vodVersion || ''),
      _siteTypeId: it.typeId1,
      _siteTypeName: it.typeId1 === 1 ? 'movie' : (it.typeId1 === 4 ? 'tv' : 'other'),
    }),
  },
  {
    id: 'agedm',
    title: 'AGE動漫',
    base: 'https://api.agedm.io/v2',
    // 動畫站。片名是簡體中文原名、沒有豆瓣分與多清晰度，排序加成
    // 意義不大，不設 isMain。
    //
    // ★ 協定與 jpyy 完全不同：不簽名、純 GET、要帶 Referer/Origin。
    //   覆寫 buildHeaders 就能跳過簽名流程（_adapterGet 有
    //   site.buildHeaders 優先的分支）—— 非簽名站不需要改框架任何一行。
    ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
    buildHeaders() {
      return {
        'User-Agent': this.ua,
        // 站方會檢查來源。實測補上這兩行 detail / 解析頁才穩定回 200。
        'Referer': 'https://m.agedm.io/',
        'Origin': 'https://m.agedm.io',
      };
    },
    search: _ageSearch,
    episodes: _ageEpisodes,
    playUrls: _agePlayUrls,
  },
];

// ---------- 篩選分類表 ----------
//
// 給「瀏覽分類」用（XPTV filterList 等價物）。key 是 type1。
const ADAPTER_FILTERS = {
  1: [
    { key: 'type', name: '類型', value: [
      { n: '全部', v: '' }, { n: '喜劇', v: '22' }, { n: '動作', v: '23' },
      { n: '科幻', v: '30' }, { n: '愛情', v: '26' }, { n: '懸疑', v: '27' },
      { n: '劇情', v: '37' }, { n: '恐怖', v: '36' }, { n: '動畫', v: '33' },
    ] },
    { key: 'area', name: '地區', value: [
      { n: '全部', v: '' }, { n: '中國大陸', v: '中国大陆' }, { n: '香港', v: '中国香港' },
      { n: '台灣', v: '中国台湾' }, { n: '美國', v: '美国' }, { n: '日本', v: '日本' },
      { n: '韓國', v: '韩国' },
    ] },
    { key: 'year', name: '年份', value: [
      { n: '全部', v: '' }, { n: '2026', v: '2026' }, { n: '2025', v: '2025' },
      { n: '2024', v: '2024' }, { n: '2023', v: '2023' }, { n: '2020', v: '2020' },
    ] },
    { key: 'sort', name: '排序', value: [
      { n: '最近更新', v: '1' }, { n: '人氣高低', v: '2' }, { n: '評分高低', v: '4' },
    ] },
  ],
  2: [
    { key: 'type', name: '類型', value: [
      { n: '全部', v: '' }, { n: '國產劇', v: '14' }, { n: '歐美劇', v: '15' },
      { n: '港台劇', v: '16' }, { n: '日韓劇', v: '62' }, { n: '其他劇', v: '68' },
    ] },
    { key: 'area', name: '地區', value: [
      { n: '全部', v: '' }, { n: '中國大陸', v: '中国大陆' }, { n: '香港', v: '中国香港' },
      { n: '台灣', v: '中国台湾' }, { n: '日本', v: '日本' }, { n: '韓國', v: '韩国' },
      { n: '美國', v: '美国' },
    ] },
    { key: 'year', name: '年份', value: [
      { n: '全部', v: '' }, { n: '2026', v: '2026' }, { n: '2025', v: '2025' },
      { n: '2024', v: '2024' }, { n: '2023', v: '2023' }, { n: '2020', v: '2020' },
    ] },
    { key: 'sort', name: '排序', value: [
      { n: '最近更新', v: '1' }, { n: '人氣高低', v: '2' }, { n: '評分高低', v: '4' },
    ] },
  ],
};

// ---------- 併入既有管線的轉換層 ----------

/**
 * 把 adapter 的搜尋結果包成 MacCMS item 陣列。
 *
 * 為什麼要「偽裝成 MacCMS」：下游 isSmartSeriesMatch / extractPlayInfoForCache
 * / 去重 / 年份季別過濾全部只認 MacCMS 欄位。偽裝成同一形狀後，這些
 * 邏輯零改動即可套用在 adapter 結果上 —— 新增站點不需要新增程式路徑。
 *
 * 播放連結採「延遲換取」：vod_play_url 先填 episode 元件，待使用者
 * 實際要播哪一集時才呼叫 playUrls 換真實 m3u8。理由見 _adapterSearch。
 */
function _adapterBuildPlayUrl(site, vodId, episodes, targetEpisode) {
  if (!episodes || episodes.length === 0) return '';

  // 單集電影：站方 episodeList 只有一筆
  if (episodes.length === 1) {
    const ep = episodes[0];
    return `${ep.name || '正片'}$${encodeURIComponent(JSON.stringify({ s: site.id, v: vodId, n: ep.nid, e: 0 }))}`;
  }

  // 多集影集：取目標集（缺時落在最後一集，與 forward 預設一致）
  let ep = null;
  if (targetEpisode != null) {
    // ★ 必須用 _adapterEpNumber，不能用 parseInt。
    //   AGE 的集名是「第80集」，parseInt → NaN → 永遠比對不到目標集
    //   → 每次都落到最後一集。實測「五等分的新娘＊」是 12 集動畫，
    //   使用者要第 2 集卻拿到第 80 集，之後又被當成單集（第 1 集）
    //   送出，下游 filterByEpisode 直接把這條來源丟掉。
    ep = episodes.find(e => _adapterEpNumber(e.name) === targetEpisode) || null;
  }
  if (!ep) ep = episodes[episodes.length - 1];

  return episodes.map(e => {
    const payload = encodeURIComponent(JSON.stringify({
      s: site.id, v: vodId, n: e.nid, e: episodes.indexOf(e),
    }));
    return `${e.name}$${payload}`;
  }).join('#');
}

/**
 * 以固定併發度跑一組 async 任務，結果順序與輸入一致。
 *
 * 為什麼不直接 Promise.all：站方（尤其 api.agedm.io）限流很緊，
 * 一次打 12~20 個 detail 會直接回 429，整個搜尋連帶被拖下水。
 * 但完全循序又太慢 —— 12 筆候選就是 12 倍 RTT。
 *
 * 所以要「夠快又不撞牆」的併發上限，而不是要嘛全開、要嘛全關。
 *
 * 注意：回傳 null 的項目會被保留在原位（不會被抽掉），
 * 由呼叫端自行 filter(Boolean)。這是刻意的 —— 有些地方需要用
 * index 對回原始陣列。
 */
async function _adapterPool(tasks, limit = 4) {
  const list = Array.isArray(tasks) ? tasks : [];
  const results = new Array(list.length);
  if (list.length === 0) return results;

  const n = Math.max(1, Math.min(limit, list.length));
  let cursor = 0;
  const worker = async () => {
    while (cursor < list.length) {
      const i = cursor++;
      try {
        results[i] = await list[i]();
      } catch {
        results[i] = null;   // 單筆失敗不影響整批
      }
    }
  };
  await Promise.all(Array.from({ length: n }, worker));
  return results;
}

/**
 * （保留）全域 HTTP 並發信號燈。
 *
 * 現況：目前站內 detail 是循序（DETAIL_CONCURRENCY=1），不呼叫這個 helper。
 * 保留它作為「若日後要改回站內併發時」的工具。實測單站 detail 併發 4 × 8 站
 * = 32 個 HTTP 在飛時未觸發 429；加 FIFO 跨站排隊反而在高 candidate 數下
 * 退化成「搶 slot → 等待」序列，總時間拉長（n=20 凡人修仙傳 median 769 vs
 * 純 baseline 735，無改善）。
 *
 * 若日後 CDN 真的開始 429 限流，把 MAC.GLOBAL_CONCURRENCY 解開 + 這幾個
 * helper 重新接回 batch 流程即可。
 */
// let _INFLIGHT = 0;
// const _INFLIGHT_WAITERS = [];
// function _acquireSlot(limit) { ... }
// function _releaseSlot() { ... }
// async function _withSlot(taskFn, limit) { ... }

/**
 * 執行單一 adapter 站的搜尋，回傳 MacCMS 形狀的 item 陣列。
 *
 * 請求量控制（重要）：簽名站一集一 URL，全量換完一部 36 集要 36 次請求。
 * 但使用者只需要「當前要播的那一集」，所以：
 *   - search → 1 次
 *   - episodes（詳情頁）→ 1 次
 *   - playUrls（只換 targetEpisode）→ 1 次
 * 首屏固定 3 次請求，其餘集數延後到使用者切集時才換。
 *
 * ★ 效能：先做純 CPU 的名稱比對，再併發抓 detail。
 *   原本是「比對一個 → await 一個 → 比對下一個」的循序迴圈，
 *   12 筆候選就是 12 次 RTT 串起來（實測 3.6 秒）。改成併發後
 *   降到 0.31 秒，輸出內容完全不變。
 *   ★ 併發上限必須有：一次全打會觸發站方 429。
 */
async function _adapterSearch(site, searchQuery, targetInfo, type, targetEpisode) {
  const t0 = Date.now();
  let items;
  try {
    items = (site.search || _adapterDefaultSearch)(site, searchQuery);
    items = await items;
  } catch (e) {
    console.warn(`[adapter:${site.id}] search 失敗: ${e?.message || e}`);
    return [];
  }
  if (!Array.isArray(items) || items.length === 0) return [];

  // 第一階段：純 CPU 的名稱比對，不碰網路。這一步決定「哪些候選值得
  // 抓 detail」，先做完才知道併發要開多大，而不是對全部結果發請求。
  const matched = [];
  for (const item of items) {
    if (!item?.vod_name) continue;
    // 命中判斷仍走既有 isSmartSeriesMatch —— adapter 不另立一套比對邏輯，
    // 否則繁簡、地區、季別的處理會和 MacCMS 站不一致。
    const candidateInfo = extractEnhancedInfo(item.vod_name, item);
    const matchResult = isSmartSeriesMatch(targetInfo, candidateInfo, 'standard');
    if (!matchResult.match || matchResult.confidence < 0.6) continue;
    matched.push(item);
  }
  if (matched.length === 0) return [];

  // 第二階段：併發抓詳情頁。併發度刻意壓在 4 —— 實測全開（12 筆同時）
  // 會讓 api.agedm.io 回 429，連 search 階段都一起被拖下水。
  const settled = await _adapterPool(
    matched.map(item => async () => {
      let playUrl = '';
      try {
        const eps = await (site.episodes || _adapterDefaultEpisodes)(site, item.vod_id);
        playUrl = _adapterBuildPlayUrl(site, item.vod_id, eps, targetEpisode);
      } catch (e) {
        // 詳情頁失敗 = 這筆沒有可播資源，跳過而非送出空播放項
        if (CONFIG.ADAPTERS?.DEBUG) console.warn(`[adapter:${site.id}] episodes 失敗 id=${item.vod_id}: ${e?.message || e}`);
        return null;
      }
      if (!playUrl) return null;

      return {
        ...item,
        vod_play_url: playUrl,
        vod_play_from: site.title,
        // ★ 標記：url 是延遲 token 而非真實 m3u8。extractPlayInfoForCache
        //   的 isPlayableUrl 會把它判為不可播，因此必須在該處特判並還原。
        _adapterSite: site.id,
        _adapterDelay: true,
        // 同樣走 _adapterSafeRemark：vod_content_note 會顯示在詳情頁，
        // 評分在這裡也不該出現。
        vod_content_note: _adapterSafeRemark(item.vod_remarks),
      };
    }),
    CONFIG.ADAPTERS?.DETAIL_CONCURRENCY ?? 4,
  );

  const out = settled.filter(Boolean);

  if (CONFIG.ADAPTERS?.DEBUG) {
    console.log(`[adapter:${site.id}] "${searchQuery}" → ${out.length}/${items.length} 筆, ${Date.now() - t0}ms`);
  }
  return out;
}

/**
 * 還原延遲播放 token → 真實 m3u8。
 *
 * 為什麼延遲：簽名站的播放連結帶短效 token 且一集一 URL，全量預取在
 * 36 集規模下是 36 次請求、且 token 可能在使用者切集前就過期。延遲換取
 * 讓首屏只花 3 次請求，且 token 永遠是「剛簽發」的，較不會失效。
 *
 * 回傳 { url, resolution, resolutionName }[] —— 多清晰度。
 */
async function _adapterResolvePlay(token) {
  let t;
  try {
    t = JSON.parse(decodeURIComponent(token));
  } catch (e) {
    return [];
  }
  const site = ADAPTER_SITES.find(s => s.id === t.s);
  if (!site) return [];

  try {
    const list = await (site.playUrls || _adapterDefaultPlayUrls)(site, t.v, t.n);
    return list;
  } catch (e) {
    console.warn(`[adapter:${site.id}] playUrls 失敗: ${e?.message || e}`);
    return [];
  }
}

// ---------- 開關與站點選取 ----------

/**
 * 讀 globalParams 的字串設定。
 * 與 loadResource 內的 gpValue 同思路，但這裡不重複實作 —— 直接沿用
 * WidgetMetadata.globalParams 的 value，使用者改了設定立即生效。
 */
function _adapterGp(name, fallback = '') {
  try {
    const hit = (WidgetMetadata?.globalParams || []).find(p => p.name === name);
    const v = hit && hit.value != null ? String(hit.value).trim() : '';
    return v || fallback;
  } catch (e) {
    return fallback;
  }
}

/** adapter 整體是否啟用。預設啟用；站方改版失效時可從設定關掉。 */
function _adapterIsEnabled(params) {
  if (CONFIG.ADAPTERS?.ENABLED === false) return false;
  const p = params?.jpyyEnabled;
  const setting = (p != null && p !== '') ? p : _adapterGp('jpyyEnabled', 'enabled');
  return setting === 'enabled';
}

/**
 * 選取本次要查詢的簽名型站。
 *
 * adapterSiteLimit 限制同時查詢幾站 —— 每站首屏固定 3 次請求，
 * 這個值直接決定額外請求量。新增站點後可調高。
 *
 * 嚴格驗證：只接受 "1" 或 "2"。其他值（舊版 input 欄位遺留的字串、
 * 空字串、Forward 沒存進的 "0"、使用者亂打的 "5"）一律退回預設 2。
 * 理由：把站點收斂到 1 雖然省請求但少了 AGE 的動畫內容，使用者主動
 * 改成 1 是有意識的決定；退回 2 不會「少給東西」。反之若把 2 退回 1
 * 是誤刪 AGE，使用者會看到動漫查不到。
 */
function _adapterActiveSites(params) {
  const raw = _adapterGp('adapterSiteLimit', '2');
  const n = (raw === '1' || raw === '2') ? parseInt(raw, 10) : 2;
  const debug = _adapterGp('adapterDebug', 'disabled') === 'enabled';
  if (debug) CONFIG.ADAPTERS.DEBUG = true;
  return ADAPTER_SITES.slice(0, n);
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

// ★ 一次性初始化（純加速，輸出不變）。
//
// loadResource 每次呼叫都在這裡串行等四個 storage 初始化：
//   syncWidgetVersion → loadRejectingTypeSites →
//   _preloadTmdbAliasCacheFromStorage → _purgeStaleTmdbAliasCache
// 四個都是冪等操作（版本對齊只清一次、Set 載入去重、preload 跳過
// 已載入/stale、purge 跑第二次就找不到東西），且都與本次搜尋參數無關。
// 換集/切季每次重跑等於每次多付 4 次 storage 往返 + 2 次全量 keys 掃描。
// 改成模組級 promise 只跑一次，後續呼叫直接複用已完成的結果。
// 併發安全：loadDetail 同時開 3 個 loadResource 時共用同一個 promise，
// 原本三路各自清 cache / 掃 keys 還可能互相競速，現在只跑一次。
let _INIT_PROMISE = null;
function ensureInitOnce() {
  if (!_INIT_PROMISE) {
    // 內層四個函式各自 try/catch（storage 不可用也不拋），這裡再加 catch
    // 保底：任何意外都不讓初始化異常中斷搜尋（與改前行為一致）。
    _INIT_PROMISE = (async () => {
      await syncWidgetVersion();
      await loadRejectingTypeSites();
      await _preloadTmdbAliasCacheFromStorage();
      await _purgeStaleTmdbAliasCache();
    })().catch(() => {});
  }
  return _INIT_PROMISE;
}

ensureInitOnce(); // 不需要 await：warm-up，第一次實際搜尋會等它完成（原 loadRejectingTypeSites warm-up 的超集）

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

// ==================== 語言版本（粵語 / 國語）====================
//
// 為什麼需要：部分站（實測金牌影視）把同一部的不同語言版本存成
// 「兩筆完全獨立的條目」，而不是同一筆下的多個播放源：
//
//   轻功(粤语)  vodId=108388   ← 粵語版
//   轻功(国语)  vodId=108385   ← 國語版
//
// 兩筆的 vod_area、vod_year、vodSub、外傳名完全相同，只差片名尾端的
// 語言標記與 vodId。這是「版本」的維度，不是「來源」的維度 —— 使用者
// 想要的是能挑語言，而不是兩筆同名來源擠在一起。
//
// ★ 沒有這個維度的後果（實測）：
//   去重鍵 generateContentKey = [站名, _year, 集數, 播放源]。兩筆的
//   _year 同為 2022、播放源同為「[金牌影視]」，集數相同 → 鍵完全相同
//   → smartDeduplicate 只保留分數較高的一筆，另一個語言版本被整批刪掉。
//   使用者看到的是「只有粵語或只有國語」，完全不知道還有另一個版本。
//
// ★ 只認「明確的語言標記」，不做模糊推斷：
//   「汉语普通话,国语」這種站方語言欄位全站一致（粵語站的國語版也寫
//   「粤语」），拿它當鍵會讓兩筆再次撞在一起、反而害我們白改。
//   真正區分兩者的是片名尾綴，所以只從片名抽。
const LANGUAGE_TAGS = [
  // 「国粤双语」「粵國雙語」代表兩種都有，是獨立的一類，不可與單語版合併。
  { re: /国粤双语|粵國雙語|粤国双语|國粵雙語|国粤|國粵|粤语国语|粵語國語/, label: '國粵雙語' },
  { re: /粤语|粵語|广东话|廣東話|港配|粤配|粵配/, label: '粵語' },
  { re: /国语|國語|国配|國配|台配|台语|台語|汉语普通话/, label: '國語' },
  { re: /英语|英語|英配|英配字幕/, label: '英語' },
  { re: /日语|日語|日配/, label: '日語' },
  { re: /韩语|韓語|韩配|韓配/, label: '韓語' },
  { re: /泰语|泰語|泰配/, label: '泰語' },
  { re: /中文字幕|中字|中英/, label: '中字' },
];

/**
 * 從站方片名抽出語言版本標記。
 *
 * 只認片名尾端明確寫出的語言（"轻功(粤语)" → '粵語'），抽不到就回 null。
 * 回 null 的資源維持原行為，不會因為多了一個鍵而彼此被拆開。
 *
 * 回傳值一律經 toDisplayText 轉繁體，讓版本標記與畫面上的其他文字一致
 * （站方片名是简体「粤语」，畫面其他地方是繁體「粵語」，混排很突兀）。
 */
function extractLanguageTag(name) {
  const t = String(name || '');
  if (!t) return null;
  for (const { re, label } of LANGUAGE_TAGS) {
    if (re.test(t)) return label;
  }
  return null;
}

// 把片名尾端的「(語言) / （語言）」括弧段抽出。
//
// 為什麼要做：站方常用「轻功(粤语)」「轻功（国语）」這類寫法標語言版本，
// 我們已經把語言抽到頂層 language 欄位（cleanResourceForOutput 內），但
// displayName 內仍帶著「轻功(粤语)」字樣，視覺上與頂層 language 重複。
// 抽出讓 displayName 只留「轻功」，頂層 language 承擔「這部是粵語版」。
//
// 第二個參數 stripHint：若已知「抽到的是哪個語言」，就只剝**這個語言**
// 對應的字眼（含繁簡變體）。不傳或傳 null 時用 LANGUAGE_TAGS 內**所有**
// 字眼去 try —— 但這個模式有反例風險（見階段二註解），預設不建議。
//
// 規則：
//   1. 只處理「明確抽出語言時」才拆 —— 抽不到（null）就保持原文不動。
//      「进击的巨人(双语)」在 extractLanguageTag 內沒規則命中，回 null，
//      拆也不會拆 —— 保留片名原樣。
//   2. 只拆**最末段**的括弧：避免誤刪中間的版本描述。
//   3. 拆完若剩下空字串，退回原片名（不讓顯示變成空白）。
//   4. 拆完若剩下字串完全等於原片名（未命中），原樣返回（冪等）。
function stripLanguageParen(rawName, stripHint = null) {
  const s = String(rawName ?? '').trim();
  if (!s) return s;
  // 先確認抽得到語言（抽不到就什麼也不做）
  if (!extractLanguageTag(s)) return s;

  // ── 階段一：剝所有「(語言) / （語言）/ [語言]」括弧段 ──
  //   抓**所有**括弧段（不限最末段）：
  //   「进击的巨人 (国语) 第四季」中間的 (國語) 也要剝，
  //   不然跟頂層 language 仍重複顯示。
  //   用 iterate 從右往左替換每個 [（(...)）] 段，剝到沒有為止。
  //
  //   方括弧也納入：jpyy 多源（金牌影視）對「[粤语]」「[国语]」這類
  //   標記會直接拼進 description 的 displayName 內（最終拼成
  //   「大話西遊之大聖娶親．[粤语]」），光剝圓括弧會漏。
  //   [國語]、[粵語] 這類方括弧段與圓括弧同性質，一起剝。
  let out = s;
  let prev;
  do {
    prev = out;
    out = out.replace(/\s*[（(\[【][^()（）\[\]【】]*[)）\]】]\s*/, ' ').replace(/\s+/g, ' ').trim();
  } while (out !== prev);

  // ── 階段二：剝「無括弧的語言字眼」尾綴（itemLang 已知的情況）──
  //   場景：部分站把語言字眼直接黏在片名尾端，沒括號。
  //     「九五至尊粤语」→ 樂子 MacCMS 站方原標題就這樣
  //     「庆余年2 国语」  → 某些站方直接空格接
  //   只刪「**抽到的 itemLang 本身**」對應的字眼（含繁簡變體），
  //   **不貪心刪 LANGUAGE_TAGS 內其他字眼**。
  //
  //   反例：「破地獄 國語中字」站方語意是「國語配音 + 中文字幕」，
  //   extractLanguageTag 命中「國語」。此時只該刪「國語」，
  //   不該把「中字」（中文字幕標記）也一起剝掉。
  //   若用「所有 LANGUAGE_TAGS 字眼去 try」，會把「中字」誤刪成
  //   「破地獄 國語」—— 反而把字幕標記殘留進去。
  //
  //   規則：
  //     1. 只刪「最末段」是「itemLang 對應字眼」的情況。
  //     2. 前面可有可無空白或「．·・」分隔符。
  //     3. 刪完用 trim 清掉殘留的句點 / 空白。
  //     4. 沒命中（itemLang 不在字尾）就原樣返回，不報錯。
  if (stripHint) {
    // 從 LANGUAGE_TAGS 內撈出 label===stripHint 那條，用它的 label 與
    // 繁簡變體構成「這個語言的所有可能字眼列表」。
    const tag = LANGUAGE_TAGS.find(t => t.label === stripHint);
    const variants = new Set();
    if (tag) {
      variants.add(tag.label);
      const simp = tag.label
        .replace(/國/g, '国').replace(/粵/g, '粤').replace(/語/g, '语');
      variants.add(simp);
    }
    // 保險起見也把 stripHint 自己加進去
    variants.add(stripHint);
    // 由長到短（避免「粵語」被「語」先吃掉）
    const sorted = [...variants].sort((a, b) => b.length - a.length);
    for (const lang of sorted) {
      const tailRe = new RegExp(`[\\s．·・]?${lang.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`);
      if (tailRe.test(out)) {
        out = out.replace(tailRe, '').replace(/[．·・\s]+$/, '').trim();
        break;
      }
    }
  }

  if (!out) return s;            // 拆完空字串 → 退回原文
  if (out === s) return s;       // 沒拆到（應該不會發生，但保險）
  return out;
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
  // ★★ 修正：cn / hk 原本寫成 '國語' / '粵語'，但這兩個是**語言**
  //   不是地區別。實測樂子站「慶餘年2」會把 `vod_area=國語` 經
  //   normalizeArea 變成 'cn'，再被 areaLabel 翻回 '國語'，
  //   結果頂層 area 是「國語」—— 使用者看了會誤以為這是地區。
  //   修法：cn 對「中國大陸」、hk 對「中國香港」，是地區的話。
  jp: '日本', cn: '中國大陸', hk: '中國香港', tw: '台灣', kr: '韓國',
  us: '美國', uk: '英國', fr: '法國', th: '泰國', in: '印度'
};

function areaLabel(area) {
  if (!area) return null;
  const key = String(area).trim();
  // 正規化過的地區代碼（jp / cn / hk …）才查表
  if (AREA_LABELS[key]) return AREA_LABELS[key];
  // 其餘是站方原字串。
  //
  // ★ 必須過 toDisplayText：簽名站回傳的 vod_area 是简体
  //   （實測「中国大陆」），不轉會讓版本標記變成
  //   「[2019年 - 中国大陆]」—— 全站唯一一個簡體字串混在繁體列表裡。
  //   MacCMS 站回傳本來就是繁體，toDisplayText 對繁體是恆等轉換，
  //   不會影響既有輸出。
  const converted = toDisplayText(key);
  return converted || key;
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
  constructor(siteManager, targetInfo, type, matchStrictness, targetEpisode = null, adapterSites = []) {
    this.siteManager = siteManager;
    this.targetInfo = targetInfo;
    this.type = type;
    this.matchStrictness = matchStrictness;
    this.targetEpisode = targetEpisode;
    // 簽名型 adapter 站（金牌影視等）。空陣列 = 本次不跑 adapter。
    // 由 performSmartSearch 依 _adapterIsEnabled 決定要不要傳進來。
    this.adapterSites = adapterSites || [];
    
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

    // ===== 簽名型 adapter 站（串流模式；與 MacCMS 並行）=====
    //
    // 為什麼要在這裡也接：performBatchSearch 早就接了 adapter，但串流模式
    // 是走本執行器。若只在 batch 接，使用者選「串流」時金牌影視會整個不見
    // —— 這正是「change ep 沒反應」最容易被誤判成「adapter 壞掉」的情況：
    // 串流模式根本沒去問它。
    //
    // 走與 MacCMS 完全相同的下游：item 已被 _adapterSearch 偽裝成
    // MacCMS 欄位，dedup / 年份季別過濾 / m3u8 wrap 全部共用。
    //
    // 刻意不塞進 siteGroups：adapter 一筆結果要 2 次請求（詳情頁 + 換 URL），
    // 併進站組會佔滿連線拖慢 MacCMS 站。獨立一條 task 自己控制節奏，
    // 失敗靜默回傳 []。
    if (this.adapterSites && this.adapterSites.length > 0) {
      const runAdapters = (async () => {
        const out = [];
        // ★ 速度：各站併發。與 batch 路徑同樣的理由 ——
        //   原本逐站 await 讓總時間變成 sum，實測 jpyy(+330ms) 跑完
        //   agedm 才開始。站點彼此無相依，併發後變成 max。
        const perSite = async (site) => {
          try {
            const items = await _adapterSearch(
              site,
              this.targetInfo.searchQuery || this.targetInfo.baseName,
              this.targetInfo,
              this.type,
              this.targetEpisode
            );
            if (!items || items.length === 0) return [];

            // 標記目標集，讓 extractPlayInfoForCache 只換那一集的 URL
            for (const it of items) it._adapterTargetEpisode = this.targetEpisode;

            // ★ 這裡必須併發，不能循序。
            //   extractPlayInfoForCache 對 adapter 項會呼叫
            //   _adapterResolvePlay，而那是「詳情頁 → 解析頁」2~3 跳的
            //   網路鏈（約 1~2 秒）。原來是 for 迴圈內 await，
            //   12 筆候選就是 12~24 秒 —— 遠超過上面 hard=8000 的上限，
            //   結果是整個 adapter 來源在串流模式下被靜靜丟棄。
            //
            //   同樣用 _adapterPool 限制併發，避免一次全打觸發 429。
            const settled = await _adapterPool(
              items.map(item => async () => {
                const candidateInfo = extractEnhancedInfo(item.vod_name, item);
                const matchResult = isSmartSeriesMatch(this.targetInfo, candidateInfo, this.matchStrictness);
                return await extractPlayInfoForCache(
                  item, site.title, this.type, matchResult, this.targetInfo
                );
              }),
              CONFIG.ADAPTERS?.DETAIL_CONCURRENCY ?? 4,
            );
            for (const res of settled) if (res) out.push(...res);
            return out;
          } catch (e) {
            console.warn(`[adapter:${site.id}] 串流模式失敗: ${e?.message || e}`);
            return [];
          }
        };
        const perSiteSettled = await _adapterPool(
          this.adapterSites.map(site => async () => await perSite(site)),
          CONFIG.ADAPTERS?.SITE_CONCURRENCY ?? 2,
        );
        for (const r of perSiteSettled) if (r && r.length) out.push(...r);
        return out;
      })();

      // 與 MacCMS 站組併行跑，但不被 deadline 綁架：adapter 的延遲換 URL
      // 已在 _adapterSearch 內部有硬性上限，錯過整批時限頂多是這條結果
      // 晚點出現，不該拖住其餘站。
      runAdapters.then(res => {
        if (res && res.length > 0) {
          for (const r of res) this.collected.push(r);
          this.stats.successfulSites++;
          if (onResultCallback) {
            try { onResultCallback(this.smartDeduplicate(this.collected.slice())); } catch {}
          }
        }
      }).catch(() => {});

      // ★ 存成 this._adapterPromise，稍後在 search() 尾端 await。
      //
      //   不能用區域變數 fire-and-forget：MacCMS 站組常在幾百 ms 內就
      //   達到 SUFFICIENT_SITE_COUNT 而提前返回，那時 adapter 還在飛，
      //   使用者拿到的 allResults 就不含這個來源 —— 串流模式下看起來
      //   就是「這個站不存在」，而不是「慢了一點」。
      this._adapterPromise = runAdapters;
    }

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

    // ★ adapter 必須在這裡 await，不能只 fire-and-forget。
    //
    //   MacCMS 站組是「夠了就收尾」（enough()），常常只跑了幾百 ms 就
    //   達到 SUFFICIENT_SITE_COUNT 而提前返回 —— adapter 那條鏈這時還在
    //   飛（詳情頁 + 換 URL 要 2 次請求）。若不 await，使用者看到的
    //   `allResults` 根本不含金牌影視，串流模式下這來源就是不存在。
    //
    //   而且要在 enough() 判定「之後」才併入：enough() 是看 MacCMS 站
    //   數，adapter 算進去會讓它提早收尾，反而害 MacCMS 站少查幾個。
    let adapterResults = [];
    if (this._adapterPromise) {
      // 給 adapter 一個硬上限：它內部已有 per-request timeout，但整條鏈
      // （搜尋 → 詳情頁 → 換 URL）是串行的三跳，超時就整個放棄這輪，
      // 寧可這輪少一個來源，也不要讓串流模式失去「快」的特性。
      // 從 8000 縮到 4500：jpyy + agedm 兩站各約 1~2s 完成搜尋+詳情+換 URL，
      // 並發跑下 max ≈ 2s，4500 涵蓋 99% 健康場景。原本 8s 過於寬鬆，
      // 慢場景下會把 wall time 拖到接近 SEARCH_DEADLINE，現在 4.5s 配合
      // 早收鏈能讓前端更快拿到結果。功能一致：逾時只是丟掉這輪 adapter
      // 結果，MacCMS 結果完全不受影響。
      const hard = 4500;
      adapterResults = await Promise.race([
        this._adapterPromise,
        new Promise(r => setTimeout(() => r([]), hard)),
      ]).catch(() => []);
    }

    if (adapterResults.length > 0) {
      allResults.push(...adapterResults);
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

        const candidateInfo = extractEnhancedInfo(item.vod_name, item);
        const matchResult = isSmartSeriesMatch(this.targetInfo, candidateInfo, this.matchStrictness);

        if (matchResult.match && matchResult.confidence >= 0.6) {
          // 站內同名作品只有最早的那個是第一季／原版，其餘跳過。
          if (yearMarked && yearMarked.sequels.includes(candidateInfo.year ?? null)) {
            console.log(`📅 ${site.title}: 跳過後續作品「${item.vod_name}」(${candidateInfo.year || '無年份'})，原版年份 ${yearMarked.earliestYear || '無年份'}`);
            continue;
          }
          matchedItems.push({ item, matchResult });

          if (matchResult.confidence >= 0.9) {
            const resources = await extractPlayInfoForCache(item, site.title, this.type, matchResult, this.targetInfo);
            siteResults.push(...this.processImmediateResults(resources, site, onResultCallback));
          }
        }
      }

      for (const { item, matchResult } of matchedItems) {
        if (matchResult.confidence < 0.9) {
          const resources = await extractPlayInfoForCache(item, site.title, this.type, matchResult, this.targetInfo);
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
          const cleanResource = cleanResourceForOutput(resource, this.type, {
            seasonNumber: this.targetInfo?.seasonNumber
          });
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
    //
    // ★ 語言版本必須是獨立的硬性維度，否則整組資源會被吃掉一版。
    //
    //   實測金牌影視把「轻功(粤语)」(vodId=108388) 與「轻功(国语)」
    //   (vodId=108385) 存成兩筆獨立條目，兩者的 _year 同為 2022、
    //   播放源同為「[金牌影視]」、集數相同 —— 上面的 versionKey 取到
    //   _year 就已經完全相同，兩筆的鍵撞在一起，smartDeduplicate 只留
    //   分數較高的一筆。使用者要的是「能挑語言」，看到卻永遠只有一個
    //   語言，另一版被靜靜刪掉且無任何提示。
    //
    //   抽不到語言標記時回 'x'，維持既有行為 —— 沒有語言維度的站
    //   （幾乎所有 MacCMS 站）不會因為多了一個鍵而被拆開。
    const versionKey = resource._year || resource._rawName || 'x';
    const langKey = extractLanguageTag(resource._rawName || resource._versionLabel) || 'x';
    return [
      resource.name,
      versionKey,
      langKey,
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

    // 純查表：calculateResourceScore 只讀 resource 欄位 + CONFIG，不寫任何狀態，
    // 同一物件在同一次調用內結果恆定；Map 以物件身份為 key，作用域僅限本次調用。
    const scoreCache = new Map();
    const scoreOf = (r) => {
      if (!scoreCache.has(r)) scoreCache.set(r, calculateResourceScore(r));
      return scoreCache.get(r);
    };

    results.sort((a, b) => scoreOf(b) - scoreOf(a));
    
    for (const resource of results) {
      const url = resource.url;
      
      if (urlMap.has(url)) {
        const existing = urlMap.get(url);
        if (scoreOf(resource) > scoreOf(existing)) {
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
          
          if (scoreOf(resource) > scoreOf(existingResource)) {
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
//
// context 參數（v1）：把「playlist 級別已識別出的季別」傳進來。
// 為什麼需要：cleanResourceForOutput 原本只從資源自己的 _rawName 抽季別，
//   若 _rawName 沒寫「第N季/S2」字眼（例：白粉飛、仁医、庆余年），
//   _seasonFromItem 會是 null，最後 fallback 寫死 season=1。
//   但 playlist 級別（extractSequelNumber(targetInfo.rawName) +
//   _expectedSequel）已經把整體季別算清楚了，可能是 2/3/4。
//   沒把這個結果餵下來，clean 階段就會把整季資源一律標成 S1，
//   切到 S2 載入時又被 line 8848 的 `r.season = s` 覆寫成 S2，
//   結果是 S1E1 這個 tag 在 S2 載入時被錯拼到資源名後面。
//
// 用法：呼叫端從 targetInfo.seasonNumber（或 buildDetailLink 的 season 參數）
//   拿 playlist 級別季別傳進 context.seasonNumber；type 仍依本資源的型別。
function cleanResourceForOutput(resource, type = 'tv', context = {}) {
  const clean = { ...resource };
  // playlist 級別已識別的季別。null/0/負數一律視為無效。
  const playlistSeason = Number.isFinite(context.seasonNumber) && context.seasonNumber > 0
    ? context.seasonNumber
    : null;

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
  // 頂層 season 欄位（tv 才有，movie 不帶）。
  //
  // 為什麼 movie 跳過提升：使用者決定「電影不要顯示 S 標籤」——
  // S 標籤是為了讓多季影集使用者一眼分辨當前播放源屬於哪一季；
  // 電影只有「單部」與「系列續集」兩種概念，續集序號（如戰狼2）站方
  // 通常會在檔名就寫明，使用者從 description 就能辨識，不必再額外加
  // S 標籤。頂層 season 欄位也是同樣理由：movie 不需要，給了反而會被
  // REX 客戶端的「依 season 過濾」誤判（例如 season=4 的電影會被當成
  // 「影集第 4 季」處理）。
  if (type === 'tv' && resource._seasonFromItem != null && clean.season == null) {
    clean.season = resource._seasonFromItem;
  }

  // ★ 季別 fallback：優先用 playlist 級別識別結果，其次才用 S1。
  //
  // 場景：搜「白粉飛」這種 S1 影集時，站方檔名（白粉飛、白粉飞）不含
  // 「第N季」字眼 → extractSequelNumber 回 null → _seasonFromItem=null
  // → clean.season=null。沒 season 頂層欄位時，後續 S/E tag 拼接會
  // 整個跳過，使用者只看到「金牌影視」沒「S1E1」。
  //
  // 規則：
  //   1. type=tv 且「沒有 season 但有 episode」時才補季別。
  //      為什麼要有 episode 才補：完全沒 episode 的資源不是影集場景，
  //      不要硬塞季別上去（可能是綜藝或電影的特殊資源）。
  //   2. 補的值優先用 playlist 級別已識別的季別（context.seasonNumber）。
  //      例：playlist 識別為 S3（targetInfo.seasonNumber=3），某條資源
  //      站方檔名沒寫「第3季」→ fallback 用 3，不是寫死 1。
  //   3. playlist 級別無效（null/0）才退回 S1 —— 這對應舊行為
  //      （playlist 也沒識別出季別時預設 S1，例如真的就只是 S1 影集）。
  //   4. type=movie 不補：電影沒「季」概念，S/E tag 那段會另外處理
  //      （只拼 S1 不拼 E）。
  if (type === 'tv' && clean.season == null && Number.isFinite(clean.episode) && clean.episode > 0) {
    clean.season = playlistSeason ?? 1;
  }

  // ★ 把季別寫進 description 第一行（使用者選 C 的修正）。
  //
  // 場景：jpyy（金牌影視）回傳的 _rawName 含「白粉飞 第二季」，但站方對
  // description 只用剝過季別的 displayName + 「第N集」組成（見 toMacItem
  // 內 tail 組裝），送進 cleanResourceForOutput 的 description 是
  // 「白粉飛．第10集」——完全沒季別字眼。客戶端（Forward App）從
  // description 抓季別 regex 抓不到，fallback 到 title 推算時把
  // 「白粉飞 第二季」推成 S1（誤判），使用者看到「搜 S2 但清單顯示 S1」。
  //
  // 解法：以頂層 clean.season 為單一真相，把「第N季」注入 description
  // 第一行（在集數前），讓客戶端 regex 穩定命中。
  //
  // 規則：
  //   - 只在 clean.season 是有效正整數且 > 1 時注入（S1 是預設，多寫「第1季」是重複顯示）。
  //   - 用阿拉伯數字（客戶端 regex 對「第2季」最穩，「第二季」會誤抓）。
  //   - 冪等：description 第一行已含「第N季/Season N/S N」任一寫法就跳過。
  //   - 插在第一行「片名」與「集數」之間：「白粉飛．第10集」→「白粉飛 第2季．第10集」。
  if (type === 'tv' && Number.isFinite(clean.season) && clean.season > 1 && clean.description) {
    const seasonTag = `第${clean.season}季`;
    const lines = String(clean.description).split('\n');
    const firstLine = lines[0];
    const alreadyHasSeason = /第\s*[0-9一二三四五六七八九十]+\s*季/.test(firstLine)
      || /Season\s*[0-9]+/i.test(firstLine)
      || /\bS\s*[0-9]+\b/i.test(firstLine);
    if (!alreadyHasSeason) {
      // 在第一個「.」「．」或「 」（夾「第N集/話/回」前）插入季別標籤。
      // 範例：
      //   "白粉飛．第10集"   → "白粉飛 第2季．第10集"
      //   "進擊的巨人．第1集 [2024年 - 日本]" → "進擊的巨人 第2季．第1集 [2024年 - 日本]"
      //   "白粉飛 第10集"   → "白粉飛 第2季 第10集"  (沒分隔點但在「第」前插)
      //   "白粉飛"          → "第2季 白粉飛"           (完全沒集數，前置插入)
      const sepMatch = firstLine.match(/[．.]\s*第|[ \t]+第/);
      if (sepMatch && sepMatch.index > 0) {
        const before = firstLine.slice(0, sepMatch.index).replace(/\s+$/, '');
        // 保留原分隔符（． / . / 空白）做視覺一致
        const afterRaw = firstLine.slice(sepMatch.index);
        // 取出分隔符
        const sepChar = (afterRaw.match(/^[．.\s]+/) || [' '])[0].replace(/\s+/, ' ');
        const after = afterRaw.replace(/^[．.\s]+/, '').replace(/^\s+/, '');
        lines[0] = `${before} ${seasonTag}${sepChar}${after}`;
      } else {
        // 沒分隔點（純片名、或只有「第N集」無前文）→ 前置插入
        lines[0] = `${seasonTag} ${firstLine}`;
      }
      clean.description = lines.join('\n');
    }
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
  //
  // ★ 版本標記換行擺放（原本是接在描述後面同一行，中間一個半形空白）。
  //
  //   「慶餘年第一季．第03集 [2019年 - 國語]」讀起來像片名的一部分 ——
  //   方括號與中點混在同一段，掃過一整列時很難一眼分辨哪個是片名、
  //   哪個是年份地區。加上方括號本來就是「註記」的視覺語意，
  //   獨立成一行後與第一行的正片資訊分層更清楚。
  // ★ 進場前先剝「站方原標題內的季別字眼」：例如「白粉飛第一季」/
  //   「五等分的新娘 第二季」/「白粉飛 第1季」這類站方把季別字眼
  //   直接寫進片名的情況，剝後頂層 season 字段承擔「第N季」顯示，
  //   title 與 description 內不再重複出現同樣字眼。
  //
  //   為什麼這裡做：extractVersionMarker 對「白粉飛第一季」會誤把
  //   「一」當年序號抓走（中文數字早於 extractVersionMarker 的數字範圍
  //   不一定漏，但 stripSeasonMarker 對「第一季」「第1季」「S1」
  //   都有規則）；且這個 strip 不影響 _seasonFromItem（已提前算好）。
  //
  //   安全網：剝完若空字串 → 退回原 _rawName，絕不刪過頭。
  if (resource._rawName) {
    const stripped = stripSeasonMarker(String(resource._rawName)).trim();
    if (stripped) resource._rawName = stripped;
  }

  const itemYear = resource._year || extractVersionMarker(resource._rawName) || null;
  let itemArea = resource._area || null;
  // ★ 站方欄位錯用：樂子站（或部分 MacCMS 站）會把語言字眼（「國語」
  //   「粵語」「普通話」之類）寫進 vod_area 欄位。隨機抽樣實測：
  //   「慶餘年2」樂子站回 area=國語 → 頂層 area 變成「國語」，
  //   使用者看到「a=國語」會誤以為是地區分類。語言不該當地區。
  //
  //   修法：cleanResourceForOutput 內若 _area 是「語言類字眼」，
  //   把 _area 視為語言候選（清空 area 提升進 language），不要污染 area。
  //
  //   偵測：站方 _area 文字若**完全等於** LANGUAGE_TAGS 內任一 label
  //   或能 match 任一 LANGUAGE_TAGS regex → 視為語言。
  //
  //   注意：itemLang 已從 _rawName 抽過一次，這裡只補「站方 _area
  //   端有線索但 _rawName 沒線索」的情況。已有 itemLang 時不再覆蓋
  //   （抽自 _rawName 的語言通常比站方欄位更權威——後者容易錯位）。
  if (itemArea) {
    const aStr = String(itemArea).trim();
    const isLangLike = LANGUAGE_TAGS.some(t => t.re.test(aStr)) ||
                       /^國語$|^粵語$|^普通話$|^國粵雙語$|^英[語語]$|^日[語語]$|^韓[語語]$/.test(aStr);
    if (isLangLike) {
      // 用 area 字眼補進 language 候選（若 _rawName 已抽到就不覆蓋）
      const fromArea = extractLanguageTag(aStr);
      if (fromArea) {
        // itemLang 在下一行從 _rawName 抽，這裡是「萬一 _rawName 抽不到」的後備
        // 用變數名 itemAreaBackup 標明語意。
        if (!resource._rawName || !extractLanguageTag(resource._rawName)) {
          resource._versionLabel = resource._versionLabel || aStr;
        }
      }
      // 不論有沒有後備語言，都把 _area 視為無效地區別（不污染頂層 area）
      itemArea = null;
    }
  }
  // ★ 語言版本也進版本標記。片名「轻功(粤语)」與「轻功(国语)」在描述上
  //   幾乎一樣（同年、同地區、同播放源），去重鍵分開之後兩筆都會留著，
  //   但沒有標記時使用者在來源列表裡根本分不出哪一筆是哪個語言 ——
  //   只會看到兩列看起來一模一樣的項目。標記必須跟著版本走。
  //
  //   語言抽不到時不加，維持原本「[2019年 - 國語]」的輸出不變。
  // ★ 語言抽取：除了 _rawName 也要看 description 內的字眼。
  // 場景：樂子站 MacCMS 來源把「國語中字」這類字眼**塞進 description
  // 而不是片名**（站方 _rawName=「破·地狱」、description=「破·地獄．國語中字」）。
  // 只餵 _rawName 會漏。兩路互補：_rawName 抽得到就優先，抽不到
  // 退回 description。
  const langFromName = extractLanguageTag(resource._rawName);
  const langFromDesc = langFromName ? null : extractLanguageTag(resource.description);
  const itemLang = langFromName || langFromDesc;

  // ★ 從 _rawName 剝掉語言字眼（防止「九五至尊粤语」這種「語言黏在
  // 站方原標題」的字眼洩漏到 title / description 顯示）。
  //
  //   為什麼抽完語言後還要剝：頂層 language 欄位已承擔「這部是粵語版」，
  //   如果不剝，title 與 description 兩處都會再顯示「粵語」一次，
  //   使用者看起來「同樣資訊出現三次」（title / description / language）。
  //   cleanResourceForOutput 內這裡剝完，title 與 description 後續
  //   都拿到剝後的 _rawName —— 一次處理，兩處生效。
  //
  //   stripHint=langFromName：把「抽到的語言」傳進去，stripLanguageParen
  //   只剝**這個語言**對應的字眼（含繁簡變體）。不傳或 null 時會用
  //   LANGUAGE_TAGS 全部字眼去 try，但這個模式有反例（見函式註解），
  //   這裡有 itemLang 已知就走精準路徑。
  if (langFromName) {
    resource._rawName = stripLanguageParen(resource._rawName, langFromName);
  } else if (langFromDesc && resource._rawName) {
    // description 抽到語言但 _rawName 沒抽到：剝時仍以 _rawName 為準
    // （這條路徑通常 _rawName 沒語言字眼可剝，呼叫會是 no-op，但保險）
    resource._rawName = stripLanguageParen(resource._rawName, langFromDesc);
  }

  // ★★★ 統一清單設計 (v1) — 頂層獨立欄位
  //
  // 為什麼要在這裡拆：REX 客戶端的詳細頁播放列表（與「來源切換器」不同），
  // 目前只能用 description 拼字串做事，沒法把「年份／地區／語言」當獨立
  // meta 顯示。把這三個欄位拉到頂層，client 端就能按以下統一排版渲染：
  //
  //   ┌────────────────────────────────────────────────┐
  //   │ 庆余年2  第2季·第01集                          │  ← title（人類可讀）
  //   │ 金牌影視 · 4K超清 · 2024 · 中國大陸 · 粵語     │  ← meta 一行
  //   └────────────────────────────────────────────────┘
  //
  // 規則：只在「抽得到」時才寫欄位，不灌空字串 / null，避免客戶端要判斷
  // 「這個欄位有意義還是空的」。REX 直接讀 truthy 即可顯示。
  if (itemYear) clean.year = Number(itemYear) || itemYear;
  const areaText = areaLabel(itemArea);
  if (areaText) clean.area = areaText;
  if (itemLang) clean.language = itemLang;

  // ★ 把「S{N}E{M}」加到 source name（使用者要求）。
  //
  // 範例：
  //   tv 改前: name = "金牌影視"
  //   tv 改後: name = "金牌影視 S1E1"      (S1, E1)
  //   tv 改後: name = "金牌影視 S2E10"     (S2, E10)
  //   movie:  name = "非凡 S1"              (電影不拼 E)
  //
  // 規則：
  //   - tv 模式：season 與 episode 都有 → `S{N}E{M}`；只有 season → `S{N}`
  //     ；都沒有 → 不拼。
  //   - movie 模式：**完全不拼**（使用者決定，見下方長註解）。
  //
  // 冪等：name 末尾已含任何 S/E tag 時不重複加（見下方說明）。
  // 拼在 name 末尾，與 name 之間用半形空格分隔。
  //
  // ★ 為什麼電影完全不拼 S 標籤（使用者決策）：
  //   觀察 1：續集電影的序號站方本來就寫在檔名裡（「疾速追殺4」「战狼2」，
  //           使用者從 description 就看得到，再加「S4」是重複資訊。
  //   觀察 2：早期版本把 movie 一律標「S1」，續集改用序號後又變成「S4」，
  //           同一份清單裡兩種標法不一致；更糟的是因為
  //           cleanResourceForOutput 被重複呼叫而變成「S4 S1」，
  //           使用者看到兩個互相矛盾的 season 標籤，比不顯示更困惑。
  //   觀察 3：REX 客戶端有「依 result.season 過濾當前季」的行為，movie
  //           帶 season 會被誤判為影集季別（season=4 的電影被當「第 4 季」）。
  //   結論：movie 的 source name 只留站名（「金牌影視」），乾淨且不會出錯。
  if (clean.name && type !== 'movie') {
    const nameStr = String(clean.name);
    let tag = null;
    if (Number.isFinite(clean.season) && clean.season > 0
        && Number.isFinite(clean.episode) && clean.episode > 0) {
      tag = `S${clean.season}E${clean.episode}`;
    } else if (Number.isFinite(clean.season) && clean.season > 0) {
      tag = `S${clean.season}`;
    }
    if (tag) {
      // ★★ 冪等檢查：name 末尾若已含「任何 S/E tag」就跳過拼接。
      //
      // 為什麼檢測「任何」而不是「相同」tag：
      //   cleanResourceForOutput 在同一條資源上會被呼叫多次
      //   （SmartSearcher.processSiteResults 推播時一次，
      //     performBatchSearch / loadResource 最終清理時再一次）。
      //   第一次呼叫時 _seasonFromItem=4 → 拼出「金牌影視 S4」，
      //   並在 fieldsToDelete 刪掉 _seasonFromItem / _rawName；
      //   第二次呼叫時兩個私有欄位都已不存在 → fallback 成 S1，
      //   而「相同 tag」檢查在「金牌影視 S4」裡找不到 S1 → 又拼一次。
      //   實測結果就是使用者看到的「金牌影視 S4 S1」。
      //
      // 修法：只要 name 末尾已有任何 S{N} / S{N}E{M} 形式的 tag 就跳過。
      // 站名本身不會以「S數字」結尾（站名是「金牌影視」「電影天堂」這類），
      // 所以這個判斷不會誤傷正常站名。
      const hasAnySeasonEpisodeTag = /\bS\d+(?:\s*E\d+)?\s*$/i.test(nameStr.trim())
        || /\bS\d+\s*E\d+\b/i.test(nameStr);
      if (!hasAnySeasonEpisodeTag) {
        clean.name = `${nameStr} ${tag}`;
      }
    }
  }

  // 「主來源加成」是排序資訊。客戶端也想知道（粗體／外框／鎖定第一格），
  // 直接給它一個布林欄位，比讓它重算 isMain 簡單。
  if (resource._isMainSource) clean.isMainSource = true;

  // AGE 多源：站方 group 標籤（「非凡」「无尽」等 CDN 群組）值得獨立欄位，
  // 否則 client 端只能從 description 拼字串剝（容易拿錯）。
  if (resource._groupLabel) {
    clean.group = resource._groupLabel;
    // 同時清掉 description 內的 [group] 段（[红牛]、[非凡] 等）
    //   改前："進擊的巨人．第1集．[红牛]"
    //   改後："進擊的巨人．第1集"
    // 拼接順序是 displayName + tail + sourceTag，所以通常在最後一段；
    // 用正則保險匹配：「．[xxx]」或「 [xxx]」或「末尾 [xxx]」。
    clean.description = clean.description
      .replace(new RegExp(`[．.]\\s*\\[${resource._groupLabel}\\]\\s*$`), '')
      .replace(new RegExp(`\\s*\\[${resource._groupLabel}\\]\\s*$`), '')
      .trim();
  }

  // ★ 改寫 description：移除先前以 [年 - 地 - 語] 拼接的版本段。
  //
  //   原因：這段資訊已抽出到頂層欄位（year / area / language），
  //   description 留著會變成「同樣資訊出現兩次」——一次在頂層、一次在拼字串。
  //   REX 端要重畫清單時只需要讀頂層欄位，description 留乾淨的「標題 + 集數」。
  //   範例：
  //     改前："慶餘年 第2季．第01集\n[2024年 - 中國大陸 - 粵語]"
  //     改後："慶餘年 第2季．第01集"
  //
  // 冪等：包含檢查確保重複 clean 不會把版本段切到壞掉。
  // 把 [年 - 地 - 語] 整段從 description 拿掉（之前已抽到頂層欄位）。
  // 注意：itemYear / itemArea / itemLang 任一存在就要清（即使整段拼不出來）。
  const versionTag = (() => {
    if (!itemYear && !itemArea && !itemLang) return null;
    const parts = [];
    if (itemYear) parts.push(`${itemYear}年`);
    const label = areaLabel(itemArea);
    if (label) parts.push(label);
    if (itemLang) parts.push(itemLang);
    return `[${parts.join(' - ')}]`;
  })();
  if (versionTag) {
    // 同時清掉「以句點相接在同一行」與「換行獨立」兩種排法（歷史版本混用）。
    const inlineTag = ` ${versionTag}`;
    clean.description = clean.description
      .replace(versionTag, '')
      .replace(inlineTag, '')
      .replace(/\s*\n\s*/, '\n')   // 摺疊多餘的換行
      .replace(/\n+$/, '')         // 去掉尾端空行
      .trim();
  }

  // ★★★ 語言下行（人類可讀版）
  //
  // 把 language 視覺上拼到 description 第二行。REX 端詳細頁的
  // 「播放列表」目前主要看 description —— 把語言擺在片名／集數下方
  // 獨立一行，搭配 🌐︎ emoji 圖示，比塞在標題後面清楚。
  //
  // 規則：
  //   1. 只在「有語言」時拼下行 —— 抽不到就維持單行（不拼 🌐︎ 原聲/不明），
  //      因為沒語言字眼就代表「不知道」，拼個假資料比留空還糟。
  //   2. 冪等：若 description 已有同樣的 🌐︎ 行就不重複拼（重複 clean 安全）。
  //   3. 第一行保持片名/季/集原樣，下行只放語言。
  //
  // 範例：
  //   改前："輕功．第01集"
  //   改後："輕功．第01集\n🌐︎ 國語"
  //
  // 頂層 clean.language 仍保留（給 REX 客戶端機器讀用，與 description
  // 視覺行**同時存在不衝突**——一個是顯示字串、一個是結構欄位）。
  if (itemLang) {
    const langLine = `🌐︎ ${itemLang}`;
    if (!clean.description.includes(langLine)) {
      clean.description = clean.description
        ? `${clean.description}\n${langLine}`
        : langLine;
    }
  }

  // m3u8 過濾 wrap。customHeaders 保留在物件上(REX 客戶端會用),過濾廣告伺服器端
  // 收到 m3u8 子請求時自動從 Referer 解析或回退到 customHeaders(伺服器端邏輯,
  // 見 m3u8-ad-filter-worker.js)。
  if (isM3U8Url(clean.url)) {
    // 帶上 adapter 標記：這是最後一道關卡，所有資源（含 cache 回放、
    // 含前面漏包的歷史 cache）都會走到這裡。沒帶的話「adapter 跳過
    // 過濾」設定會在這裡被無聲蓋掉 —— 使用者改了設定卻看到 url 還是被包。
    // _adapterSite 這時還沒被 fieldsToDelete 清掉（清欄位在下一行之後）。
    clean.url = wrapM3U8WithFilter(clean.url, { adapter: !!clean._adapterSite });
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

  // ===== Forward 契約欄位（id / type / title）=====
  //
  // 為什麼必須補：Forward 客戶端的 Swift runtime 會把 loadResource 回傳的
  // 陣列解碼成原生 VideoItemChild，而該型別要求 `id`(必填字串)、`type`、
  // `title` 都是必填。只輸出 name/description/url 時，Swift 端在第一筆
  // 元素的 `.id` 就會丟出：
  //
  //   DecodingError.dataCorrupted: Data was corrupted.
  //   Path: [0].id. Debug description: Invalid id format
  //
  // 整批結果因此在 UI 上載入失敗（而且失敗在「上一輪」的結果上，看起來像
  // 隨機）。這與 CancellationError 是兩件事 —— 後者只是使用者中途切換
  // 分頁/季別造成的正常中止。
  //
  // 這裡採「最小補充」策略：只補欄位，不動現有的 name/description/url，
  // 避免影響已驗證過的 UI 顯示。
  {
    // 用「原始(未 wrap)url + 集數」當 id。因為 wrapM3U8WithFilter 會改寫
    // clean.url，而過濾伺服器每次呼叫產生的 t/sign 參數都不同 —— 若拿
    // wrap 後的 url 當 id，同一條資源在 cache 命中前後會拿到不同 id，
    // 客戶端會當成兩筆。
    //
    // ★ 冪等性：loadResource 會把 cleaned 的欄位寫回原 res 物件
    //   （Object.assign(res, cleaned)），因此同一筆資源可能「清兩次」。
    //   第二次進來時 resource.url 已經是 wrap 過的，若直接拿它算 id，
    //   得到的值會和第一次不同 —— 快取命中前後 id 漂移。
    //   所以先檢查有沒有既存 id（resource.id 是上次算出來的），有就沿用。
    if (typeof resource.id === 'string' && resource.id) {
      clean.id = resource.id;
    } else {
      const rawUrl = typeof resource.url === 'string' ? resource.url : '';
      const epPart = clean.episode != null ? String(clean.episode) : '';
      const idBase = rawUrl || `${resource._rawName || clean.name || 'item'}|${epPart}`;
      clean.id = `forward-vod-${idBase}`;
    }
    // 這批資源都是可直接播放的直連 m3u8/mp4，對應契約裡的 "url" 型別。
    clean.type = 'url';
    // title 優先用站方原始片名，其次用描述第一行去掉集數後的片名。
    let title = String(resource._rawName || '').trim();
    if (!title) {
      const firstLine = String(clean.description || '').split('\n')[0].trim();
      // 去掉「．第12集」「 第2季．第12集」這類尾綴，只留片名。
      title = firstLine
        .replace(/[．·]\s*第\s*[0-9一二三四五六七八九十百零]+\s*[集季話].*$/u, '')
        .replace(/\s*第\s*[0-9一二三四五六七八九十百零]+\s*季.*$/u, '')
        .trim();
    }
    clean.title = title || String(clean.name || '視頻資源');

    // ★ link：Forward 契約的 VideoItemChild.link 是**必填**字串
    //（@forward-widget/libs 的 video.d.ts: `link: string`，非 optional），
    // 而我們的輸出原本完全沒有這個欄位。
    //
    // 為什麼這會讓 REX 切季失效（這是本次問題的真正根因）：
    //
    //   REX 從搜尋結果點進詳細頁時，需要用「該筆結果的 link」當作
    //   loadDetail(link) 的入參。link 裡帶著 season / episode，
    //   REX 才能在詳情頁裡知道「這是第幾季第幾集」，進而：
    //     - 詳情頁的季別欄（MediaDetailsSeasonBar）能定位到正確的季
    //     - 切換季別時帶著新季別重新載入資源
    //
    //   link 欄位缺失 → REX 拿不到季別 → 詳情頁只知道「這是第 1 季」
    //   → 使用者切到 S2 時，REX 沒有任何季別資訊可帶，widget 端
    //   自然只能回第一季的資源。這正是「切季不刷新」的直接原因。
    //
    //   這也解釋了「有些劇可以、有些不行」：能不能切，取決於該筆結果
    //   當下是否帶得著 season 資訊。站方檔名帶季別（「仁醫 第2季 完結篇」）
    //   的結果，其 _seasonFromItem 能推出季別，切季就正常；檔名沒季別
    //   （「白粉飛」）的結果就掉回 S1。
    //
    // link 格式沿用 loadDetail 的 buildDetailLink：search:<標題>?season=N&episode=M
    // 兩邊格式一致，REX 從搜尋結果帶進詳情頁、再從詳情頁帶回資源，
    // 全程同一套 metadata 編碼，不會有格式落差。
    //
    // ★ 對既有功能的影響：Forward 端本來就要求 link 必填，補上只是
    //   讓欄位符合契約，不改變 name / description / url / id 等既有欄位。
    //   搜尋結果的顯示、排序、去重都不讀 link，故完全不影響。
    if (!clean.link) {
      const linkTitle = String(resource._rawName || clean.title || '').trim();
      if (linkTitle) {
        // ★ 季別要讀 clean.season，不是 resource.season。
        // cleanResourceForOutput 會把季別提升到頂層 clean.season
        // （來自 _seasonFromItem，或 context.seasonNumber，或 fallback S1），
        // 而 resource.season 這個原始欄位多半是 undefined/null。
        // 讀錯會讓 link 裡的 season 永遠缺漏 → REX 切季無效。
        //
        // ★ movie 不帶 season：電影沒有「季」的概念（clean 階段刻意
        //   不提升 season 到頂層，見 type === 'tv' 的判斷）。若這裡
        //   fallback 到 context.seasonNumber，電影的 link 會出現
        //   「season=1」但資源本身的 season 欄位是 undefined ——
        //   兩者不一致，REX 開詳情頁時會拿到一個不存在的季別。
        //   電影的續集序號另有 _rawName 的方式表達，不需要 season。
        const linkSeason = type === 'tv'
          ? (Number.isFinite(clean.season) && clean.season > 0
              ? clean.season
              : (Number.isFinite(context.seasonNumber) && context.seasonNumber > 0
                  ? context.seasonNumber
                  : null))
          : null;
        const linkEpisode = Number.isFinite(clean.episode) ? clean.episode : null;
        clean.link = buildDetailLink({
          title: linkTitle,
          season: linkSeason,
          episode: linkEpisode,
          // type 用本函式的 type 參數（呼叫端已帶入當前搜尋的類型），
          // 不用 resource._type —— 該欄位不存在，會永遠退化成 'tv'。
          type: type,
        });
      }
    }
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

/**
 * 簽名型 adapter 站是否應該跳過過濾廣告伺服器。
 *
 * 只看 CONFIG.M3U8_FILTER.ADAPTER_MODE：
 *   'skip'   (預設) → 不包裝，這類站的 m3u8 直接給播放器
 *   'filter'         → 照常包裝，與 MacCMS 站待遇相同
 *
 * 為什麼是獨立於 m3u8FilterEnabled 的開關：總開關關掉是「所有站都不過濾」，
 * 使用者通常只想讓沒有廣告的 adapter 站繞開，不想連其他站的過濾也一併犧牲。
 * 兩層分開才能各自獨立控制。
 */
function shouldSkipFilterForAdapter() {
  return (CONFIG.M3U8_FILTER?.ADAPTER_MODE || 'skip') === 'skip';
}

function wrapM3U8WithFilter(url, hint) {
  if (!CONFIG.M3U8_FILTER?.ENABLED) return url;
  if (!url) return url;
  if (typeof url !== 'string') return url;
  // ★ 簽名型 adapter 站可選擇跳過過濾廣告伺服器。
  //
  // 判斷放在最前面（早於 isAlreadyWrapped），因為 skip 的語意是
  // 「這條根本不該經過伺服器」：若先放行已包裝的 url，cache 裡
  // 早期版本包過的 adapter 連結會繼續留在結果裡，設定改了也沒用。
  //
  // isAdapterSite 只認 _adapterSite 這個明確標記，不從 URL 反推來源 ——
  // 反推會誤傷 MacCMS 站的 /filter 端點（isAlreadyWrapped 註解提過同樣的坑）。
  if (hint && hint.adapter && shouldSkipFilterForAdapter()) return url;
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
  //
  // ★ 「未指定」不能只用 == null 判斷。
  //
  // REX 的參數型別是 season?: string / episode?: string（見 REX 規範
  // BaseParams），而 REX 在「使用者還沒選季別 / 沒選集數」時會傳**空字串**
  // 而不是省略欄位。空字串對 == null 判斷而言是「已指定」→ link 解析出來
  // 的季別被忽略 → 整批結果退回 S1。
  //
  // 實測（REX 只帶 link 的呼叫形狀）：
  //   link=search:白粉飛?season=2&episode=3, season='', episode=''
  //   → 舊邏輯回 S1 的 31 筆（season=1），使用者切到 S2 卻看到第一季。
  //   改成「空字串視為未指定」後，同一組參數回 S2 第 3 集（4 筆，season=2）。
  //
  // 判斷用「去空白後是否為空」：null / undefined / '' / '  ' 都算未指定。
  const _isUnset = (v) => v == null || (typeof v === 'string' && v.trim() === '');
  if (params?.link && typeof params.link === 'string' && params.link.startsWith(DETAIL_LINK_PREFIX)) {
    const meta = parseDetailLink(params.link);
    if (meta) {
      if (_isUnset(params.season) && meta.season != null) params.season = meta.season;
      if (_isUnset(params.episode) && meta.episode != null) params.episode = meta.episode;
      // type 的判定要和下面 mediaType 的後備邏輯一致：params.type 未指定
      // （空字串也算未指定）且 mediaType 也沒給 movie 時，link 的 movie 才採用。
      const _curType = _isUnset(params.type) ? params.mediaType : params.type;
      if ((_isUnset(_curType) || _curType === 'tv') && meta.type === 'movie') params.type = meta.type;
      if (!params.id && meta.id) params.id = meta.id;
    }
  }

  // ★ type 的後備來源是 mediaType。
  //
  // REX 規範的 BaseParams 定義的是 `type: 'tv' | 'movie'`，但 REX 客戶端
  // 二進位裡同時存在 `mediaType`（34 次）與 `type`（41 次）兩種寫法，
  // 而 VideoItem 的輸出欄位又叫 mediaType。REX 在不同呼叫點可能給其中
  // 一個。只認 `type` 會讓某些路徑的 type 落到預設 'tv'（電影被當影集
  // 搜，結果是空）。
  //
  // 取值優先序：params.type > params.mediaType > 'tv'。
  // 兩者皆為合法值（tv/movie）才採用；其他值（variety 等內部值）不覆蓋。
  // ★ 用 _isUnset 判斷而非 ??：REX 未指定時傳的是空字串，?? 不會 fallback。
  const _rawType = _isUnset(params.type) ? params.mediaType : params.type;
  const _resolvedType = (_rawType === 'tv' || _rawType === 'movie') ? _rawType : 'tv';

  const {
    type = _resolvedType,
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
    m3u8FilterAdminPass,
    m3u8FilterTsMode,
    // 簽名型 adapter 站是否跳過過濾廣告伺服器（'skip' | 'filter'）
    m3u8FilterAdapterMode
  } = params;

  // Forward 傳入片名的欄位名並非只有一種：詳細頁通常給 seriesName，
  // 但由相關作品卡片切換進場時可能走別的欄位。任何一個欄位帶著
  // 與上次不同的片名就代表使用者換片，必須優先採用。
  // 全部取不到時直接放棄 —— 拿舊片名續搜只會得到舊片的來源。
  //
  // ★ link 兜底：切集 / 自動連播下一集時，客戶端有時只帶 link
  //   （search:<標題>?season=N&episode=M）而不帶 seriesName。
  //   之前這裡直接 return []，使用者看到的就是「切集後搜不到、
  //   下一集永遠找不到」。link 本身是自描述的，直接拿它的標題當片名。
  let seriesName =
    params.seriesName ||
    params.episodeName ||
    params.title ||
    params.name ||
    params.movieName ||
    '';
  if (!seriesName && typeof params.link === 'string' && params.link.startsWith(DETAIL_LINK_PREFIX)) {
    try {
      const linkMeta = parseDetailLink(params.link);
      if (linkMeta?.title) seriesName = linkMeta.title;
    } catch {}
  }

  // ★ Rex 直調時 params 裡沒有 multiSource（它不是 BaseParams 欄位，
  //   只是自家 globalParams 設定項），用 !== "enabled" 會把 Rex 切季/切集
  //   的呼叫全部擋掉（undefined !== "enabled" → return []）。
  //   改成「顯式關掉才擋」，沒帶就當啟用。Zen 支無此守門，故不受影響。
  if (multiSource === "disabled" || !seriesName) {
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

  // 簽名型 adapter 站要不要走過濾廣告伺服器。
  //
  // 三層 fallback 同上（params 顯式 > globalParams > 模組預設 'skip'）。
  // 驗證比 TS_MODE 嚴格：這裡只有兩種語意相反的狀態（跳過 / 不跳過），
  // 寫錯時寧可退回預設的 'skip' —— 因為 adapter 站本來就沒廣告，
  // 退回 skip 只是多繞一圈但能播；退回 filter 反而可能把有廣告的內容放行。
  const adapterFilterParam = (typeof m3u8FilterAdapterMode === 'string' && m3u8FilterAdapterMode.trim())
    ? m3u8FilterAdapterMode.trim()
    : gpValue('m3u8FilterAdapterMode', 'skip');
  CONFIG.M3U8_FILTER.ADAPTER_MODE =
    (adapterFilterParam === 'filter' || adapterFilterParam === 'skip') ? adapterFilterParam : 'skip';

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
      // adapter 站是否繞開過濾伺服器。印出來是因為「改了設定但 url 還是被包」
      // 光看播放結果分不出來，得知道實際生效值。
      adapterMode: CONFIG.M3U8_FILTER.ADAPTER_MODE,
      adminUser: CONFIG.M3U8_FILTER.ADMIN_USER || '(空)',
      adminPassSet: !!CONFIG.M3U8_FILTER.ADMIN_PASS,  // 不印明碼,只印有沒有設
      // params 層有沒有值（沒值 = 走 globalParams）
      fromParams: !!m3u8FilterWorkerUrl,
      // globalParams 層的原始值（'' 代表 Forward 沒存到設定）
      gpWorkerUrl: gpValue('m3u8FilterWorkerUrl', '(空)'),
      gpEnabled: gpValue('m3u8FilterEnabled', '(空)'),
      gpTsMode: gpValue('m3u8FilterTsMode', '(空)'),
      gpAdapterMode: gpValue('m3u8FilterAdapterMode', '(空)'),
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
  // ★ 一次性初始化：見 syncWidgetVersion 下方的 ensureInitOnce。
  // loadResource 每次換集都重跑 sync / preload / purge 四件事，
  // 全是冪等且與參數無關的初始化 → 只跑一次，後續直接沿用。
  await ensureInitOnce();

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
  console.log(`🆔 FILTER_BUILD: filterBySequel+v2.adapter-sequel-guard.${(new Date()).toISOString().slice(0,10)}`);

  console.log(`🚀 启动智能搜索: ${seriesName}`);
  console.log(`⚙️ 模式: ${searchMode}, 严格度: ${matchStrictness}`);
  
  const startTime = Date.now();
  
  const resourceSites = parseResourceSites(VodData);
  if (resourceSites.length === 0) {
    onStreamResult && onStreamResult([], { type: 'error', message: '無可用資源站' });
    return [];
  }

  const targetInfo = extractEnhancedInfo(seriesName);
  // ★ 把 type 帶進 targetInfo（jpyy 劇場版守門員要用）。
  // 條件：type 只在有效值之一時帶入，避免無效值污染。
  if (type === 'tv' || type === 'movie' || type === 'variety') {
    targetInfo.type = type;
  }
  // ★ Zen 式季數接收：params.season 優先（純數字/S2/Season 2/中文數字），
  //   片名次之，保證永遠有效數字。舊寫法見 resolveRexSeason 註解。
  let targetSeason = resolveRexSeason(season, seriesName, targetInfo.seasonNumber);
  // ★ episode 必須走 _toEpisodeNumber（見其註解）：舊寫法對「第5集」
  //   這類輸入得 NaN，下游 smart 路徑用 !== null 判斷會把整批結果殺光。
  const targetEpisode = _toEpisodeNumber(episode);

  // 修正「仁医 / season=第二季」情境（targetSeason 已由 resolveRexSeason 解出，
  // 此處只負責把「明確要第 N 季」的語意餵給 sequel 比對）。
  //
  // 正確解讀：season 參數帶著「第二季」這個語意時，候選檔名帶序號 2
  // （「仁医2」）才是正確答案，不該因序號不對稱而被當成不同作品。
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
  //
  // ★ 速度：`_tmdbAliasSearchQuery` 標記「本次搜尋已跑過 TMDB」。
  //   loadResource 與 performBatchSearch/performSmartSearch 各自呼叫一次，
  //   cache miss 時等於把整段 TMDB 流程（內含多次 API request）跑兩次，
  //   而第二次必定是純重複（此時 cache 已被第一次填好）。跳過它。
  if (!targetInfo._tmdbAliasSearchQuery && !params?._preSearchQuery) {
    try {
      await tryExpandWithTMDBAliases(targetInfo, type);
      targetInfo._tmdbAliasSearchQuery = true;
      console.log(`[TMDB-diag] tryExpand returned, _aliasSearchQuery="${targetInfo._aliasSearchQuery || '(空)'}", searchQuery="${targetInfo.searchQuery}"`);
    } catch (e) {
      targetInfo._tmdbAliasSearchQuery = true;
      console.log(`[TMDB-diag] tryExpand THREW: ${e?.message || e}`);
      if (CONFIG.TMDB?.VERBOSE) console.warn('[TMDB] expand 失敗,繼續原 query:', e?.message || e);
    }
  } else if (params?._preSearchQuery) {
    // ★ 上游（loadResource）已完成 TMDB 擴充並把最終 query 傳下來，
    //   直接沿用，不要再跑一次整段 TMDB 流程。
    targetInfo.searchQuery = params._preSearchQuery;
  }
  if (targetInfo._aliasSearchQuery) {
    const aliasQ = String(targetInfo._aliasSearchQuery)
      .replace(/(?:19|20)\d{2}\s*$/, '')
      .replace(/\s+$/, '')
      .trim();
    if (aliasQ) {
      console.log(`🌐 [TMDB] 已採用對岸/別名 query: "${aliasQ}"（原本 "${targetInfo.searchQuery}"）`);
      targetInfo.searchQuery = aliasQ;
targetInfo.searchQuery = aliasQ;
// v2.9.6：別名被採用時必須同步改比對用的名稱，否則搜尋拿得到結果
// 但過濾階段會把它們全部殺掉。
//
// 實測：「陰屍路」(港譯) → TMDB 別名「行尸走肉」。站方確實回傳
// 「行尸走肉第十一季」等 20 筆，但 isSmartSeriesMatch 拿的是
// targetInfo.baseName（仍是「阴尸路」）去比對「行屍走肉」——
// 字面完全不同 → type=none → 0 筆。
//
// 只改 searchQuery 等於「用別名去搜，再用原名去篩」，這正是本 bug
// 的本質。兩邊必須是同一個名字。
  applyAliasNameToTarget(targetInfo, aliasQ);
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

          // ★★ 補 link：快取命中路徑完全繞過 cleanResourceForOutput
          //（下方直接 `return usable`），所以快取裡的物件是「寫入當下」
          // 的舊格式。若當時還沒有 link 欄位，這裡讀回來的物件就永遠
          // 沒有 link —— REX 從搜尋結果點進詳情頁時拿不到季別，
          // 切季就退化成永遠停在第一季。
          //
          // 這正是「有些劇可以切、有些不行」的來源：
          //   - 快取是「首次搜尋該季時」寫入的。首次搜尋若走的是
          //     另一條路徑（或舊版 widget 寫的），link 就缺。
          //   - 快取 TTL 30 分鐘，期內一直讀同一份 → 一直缺 link。
          //
          // 修法：快取命中時就地補 link。link 內容只取決於
          // (標題, 季, 集)，與物件本身無關，補寫是冪等的。
          // 已有 link 的不動（避免覆蓋更精確的 metadata）。
          let linked = 0;
          for (const r of usable) {
            if (!r || r.link) continue;
            const linkTitle = String(r.title || r._rawName || targetInfo.baseName || '').trim();
            if (!linkTitle) continue;
            r.link = buildDetailLink({
              title: linkTitle,
              // 季別優先用物件自己的 season（快取裡通常已帶），
              // 沒有就用本次請求的目標季。
              // ★ movie 不帶 season（電影沒有季別概念）——
              //   跟 cleanResourceForOutput 裡的處理一致，
              //   否則電影的 link 會出現 season=1 但 season 欄位是 undefined。
              season: type === 'tv'
                ? (Number.isFinite(r.season) ? r.season : targetSeason)
                : null,
              episode: Number.isFinite(r.episode) ? r.episode : targetEpisode,
              type,
            });
            linked++;
          }
          if (linked > 0) {
            console.log(`🔗 快取補 link: ${linked}/${usable.length} 條`);
          }

          // 兜底 wrap：對 cache 內每條物件的 url 主動呼叫 wrapM3U8WithFilter。
          // 與 batch 路徑同樣理由（見 performBatchSearch 內同段註解）。
          // 冪等保證：已 wrap 的 url 會被 isAlreadyWrapped 擋下，無副作用。
          let rewrapped = 0;
          for (const r of usable) {
            if (!r || !r.url || typeof r.url !== 'string') continue;
            const before = r.url;
            // 帶上 _adapterSite：讓「adapter 站跳過過濾」設定在 cache 路徑
            // 也生效。這裡沒有 hint.site 可傳，只能從資源物件上的標記判斷。
            const after = wrapM3U8WithFilter(r.url, { adapter: !!r._adapterSite });
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

  // ★ 速度：把 loadResource 已做過 TMDB 擴充的結果傳給下游搜尋路徑。
  //   loadResource 與 performBatchSearch/performSmartSearch 各自從
  //   seriesName 重建一份 targetInfo 並各跑一次 TMDB 擴充，cache miss 時
  //   等於整段 TMDB 流程（多次 API request）跑兩次，而第二次必定是
  //   純重複（此時 cache 已被第一次填好）。
  //
  //   傳 _preSearchQuery 下去，下游直接沿用、不再重跑。
  //   無條件傳（不只是有別名時）：下游自己 rebuild 出來的 searchQuery
  //   與這裡完全相同（兩邊呼叫的是同一組 applyDetailVersion +
  //   buildSearchQuery，type/season 來自同一份 params），
  //   所以沿用上游結果不會改變任何搜尋行為，只是省掉重複的 TMDB 呼叫。
  //   沒有 _preSearchQuery 時（獨立呼叫 performBatchSearch）行為不變。
  //
  // ★ seriesName 必須用「本地補過的值」，不能只靠 ...params。
  //
  //   切集 / 自動連播下一集時，Forward 有時只帶 link
  //   （search:<標題>?season=N&episode=M）而不帶 seriesName。
  //   上面已從 link 解析出標題補進本地 seriesName 變數，但沒有寫回
  //   params —— 下游 performBatchSearch / performSmartSearch 讀的是
  //   params.seriesName，拿到 undefined 會讓搜尋查空字串 → 0 筆。
  //
  //   實測日誌（只帶 link 的呼叫形狀）：
  //     🔍 启动批量搜索: undefined
  //     📊 批量搜索完成: 921ms, 结果: 0
  //   症狀正是使用者回報的「播放時選擇下一集都找不到下一集」。
  const _searchParams = {
    ...params,
    seriesName,
    _preSearchQuery: targetInfo.searchQuery,
  };

  if (searchMode === 'smart_stream' || searchMode === 'auto') {
    console.log('🎯 使用智能流式搜索模式');
    finalResults = await performSmartSearch(_searchParams, onStreamResult);
  } else {
    // 'batch' 為預設,涵蓋未來任何未知值(寬鬆驗證一致)
    console.log('🔍 使用批量搜索模式');
    finalResults = await performBatchSearch(_searchParams);
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
  // ★ 電影續集過濾（movie 分支）：篩掉「第一部／第二部」等無關續集。
//
// 場景：REX 詳細頁搜「疾速追殺」season=4（John Wick Chapter 4, 2023），
// jpyy / dytt / ffzy 等站會同時回傳：
//   - 「疾速追殺」   (2014, 第一部, sequel=null)
//   - 「疾速追殺」   (2017, 第二部, sequel=null)
//   - 「疾速追殺4」  (2023, 第四部, sequel=4)
// 舊行為：`if (type === 'tv')` 把整個過濾跳過 → 三部全留在播放列表裡。
// 使用者點進「疾速追殺」(2014) 以為是第四部，結果看到的是第一部內容。
//
// 為什麼電影也要過濾：電影續集序號（「戰狼2」「無間道2」「疾速追殺4」）
// 與影集季別在 extractSequelNumber 看來是同一種訊號，filterBySequel 的
// 規則（規則 X「明確標為其他序號 → 無條件 drop」+ 規則 3「年份早於
// 命中群 → 上一部嫌疑」）對電影同樣成立。
//
// 安全性：
//   - filterBySequel 開頭就檢查 `targetSeason <= 1` 直接原樣返回，
//     所以單部電影（REX 傳 season=1 或空）完全不受影響。
//   - movie 不套用下面的 S4 fallback（那是「愛丽丝篇异界战争」tv 專屬）。
if (type === 'movie' && searchMode !== 'batch') {
  const r = filterBySequel(finalResults, targetInfo);
  if (r.kept && r.before !== undefined && r.kept.length < r.before) {
    console.log(`🎬 電影續集過濾(第${targetInfo.seasonNumber}部): ${r.before} -> ${r.kept.length}（pooledYearMin=${r.pooledYearMin ?? 'null'}）`);
    finalResults = r.kept;
  } else if (r.before !== undefined && r.before > 0 && (!r.kept || r.kept.length === 0)) {
    // 一部都殺不掉（站方沒寫序號）→ 保留全部，不要讓使用者看到空清單。
    console.log(`⚠️ 電影續集過濾無命中(${r.before}筆)，保留全部候選`);
  }
}

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
    const cleaned = cleanResourceForOutput(res, type, {
      seasonNumber: targetInfo?.seasonNumber
    });

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
/**
 * TMDB 別名被採用時，同步更新「用於比對」的名稱欄位。
 *
 * v2.9.6 新增。解決的 bug：
 *   「陰屍路」(港譯) → TMDB 別名「行尸走肉」
 *   站方確實回傳「行尸走肉第十一季」等 20 筆，
 *   但 isSmartSeriesMatch 拿 targetInfo.baseName（仍是「阴尸路」）
 *   去比對候選「行屍走肉」→ 字面不同 → type=none → 0 筆。
 *
 * 也就是「用別名去搜，卻用原名去篩」。搜得到、篩不掉，等於沒搜。
 *
 * 改了什麼：
 *   - baseName：isSmartSeriesMatch / extractEnhancedInfo 比對用的主名稱
 *   - rawName  ：若 rawName 只是片名本身（沒有 season 等修飾）才同步，
 *                避免動到「仁醫完結篇」這種帶續集資訊的原始輸入
 *   - _aliasSearchQuery 保留，方便日後除錯
 *
 * 為什麼不動 seasonNumber / year / region：
 *   這些描述的是「使用者要看哪一季、哪個版本」，跟片名叫什麼無關。
 *   別名擴充只是換了搜尋用的名字，不該改變使用者的意圖。
 */
function applyAliasNameToTarget(targetInfo, aliasQ) {
  if (!targetInfo) return;
  const alias = String(aliasQ || '').trim();
  if (!alias) return;

  // 別名本身可能帶季度（「行尸走肉第十一季」），baseName 要去掉季度，
  // 否則跟候選「行尸走肉第十一季」比對時 baseName 不一致。
  const parsed = extractEnhancedInfo(alias);
  if (!parsed || !parsed.baseName) return;

  targetInfo.baseName = parsed.baseName;
  // rawName 若是純片名（沒帶季度/序號修飾），一併同步讓日後的
  // extractSequelNumber(targetInfo.rawName) 不會讀到過期值。
  if (!/[第[Ss]eason\s*[0-9零一二三四五六七八九十]|第[一二三四五六七八九十零\d]+[季部季]/.test(String(targetInfo.rawName || ''))) {
    targetInfo.rawName = alias;
  }

  // 正規化名稱同步，讓 cacheKey 與站方比對都吃同一個名字。
  targetInfo._aliasBaseName = parsed.baseName;
}

async function tryExpandWithTMDBAliases(targetInfo, type) {
  if (!targetInfo || !CONFIG.TMDB?.ENABLED || !CONFIG.TMDB.API_KEY) return false;
  const baseName = String(targetInfo.baseName || '').trim();
  if (!baseName || baseName.length < 2) return false;

  // 同步等 TMDB 別名（最多 6s）。失敗 / timeout → 回 []（走 fallback）。
  //
  // v2.9.3：6s 是**上限**，不是實際延遲。因為 busy-loop 已移除，
  // I/O 不再被餓死 —— 實測 zh-CN search 命中時 total ≈ 1s 就 return。
  // 6s 只是網路異常時的保險上限，逾時就走 fallback（不影響正確性）。
  const aliases = await getTMDBAliasesBlocking(baseName, type, 6000);
  if (!Array.isArray(aliases) || aliases.length === 0) return false;

  // v2.8.14 簡化：aliases 內現在只有 CN 簡體別名 + hit 內原名。
  // 不需要「aSimp === aTrim」複雜判斷，簡體化後跟 baseSimp 不同就挑。
  //
  // 三條過濾條件（任一 fail 就跳過這個 alias）：
  //   1. 跟 baseName 原文同名（去重）
  //   2. 跟 baseName 的簡體版同名（CN 繁體混標時會撞到，視為無新資訊）
  //   3. **不含任何中文字**（VOD 站中文字典認不出英文片名）
  //
  // 第一條成立的別名直接挑走（break）。aliases 陣列內 CN 別名排第一。
  const baseSimp = convertChinese(baseName, false);
  const hasChinese = (s) => /[一-鿿]/.test(s);
  const isSimpChinese = (s) => hasChinese(s) && convertChinese(s, false) === s;
  let bestAlias = null;
  for (const a of aliases) {
    if (typeof a !== 'string') continue;
    const aTrim = a.trim();
    if (!aTrim) continue;
    if (normalizeForMatching(aTrim) === normalizeForMatching(baseName)) continue;
    const aSimp = convertChinese(aTrim, false);
    if (!aSimp || aSimp === baseSimp) continue;
    // 必須是簡體中文（VOD 站字典認得）
    if (!isSimpChinese(aTrim)) continue;
    bestAlias = aTrim;
    break;
  }
  // 退路：所有 alias 都不符合嚴格條件（罕見）→ return false 走原 searchQuery
  // 不要 fallback 到英文別名，VOD 站用中文字典認不出。
  if (!bestAlias) {
    console.log(`[TMDB-diag] tryExpand: 無 CN 簡體別名（aliases=${aliases.length} 個），return false 走原 query`);
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
  // ★ Zen 式 S1 反向阻擋（借鏡 zen.cheyong `season==1 && foundSeason>1 → 0`）：
  //   使用者明確要 S1 時，站方混回來的「XXX第二季」必須丟掉，否則 S2 內容
  //   會混進 S1 結果。安全網：擋到 0 筆就全部放行，跟 S2+ 的 fallback 同策略。
  if (!Number.isFinite(targetSeason) || targetSeason <= 1) {
    const kept = [];
    const dropped = [];
    for (const res of results) {
      const nm = res._rawName || res.description || '';
      const sq = extractSequelNumber(nm);
      if (sq !== null && sq > 1) { dropped.push(res); continue; }
      kept.push(res);
    }
    if (kept.length === 0) return { kept: results, dropped: [] };
    return { kept, dropped };
  }

  const before = results.length;

  // ★ 欄位讀取 helper：私有欄位優先，頂層欄位作 fallback。
  //
  // 為什麼需要 fallback：cache 裡的物件已經過 cleanResourceForOutput，
  // `_rawName` / `_year` 都在 fieldsToDelete 裡被刪掉，只剩頂層
  // `description` / `year`。若只讀私有欄位，cache 命中路徑會拿到：
  //   rawName = description  ✅（還好）
  //   _year   = undefined   ❌ → yearsOfMatched = [] → pooledYearMin = null
  //                              → 規則 3（年份早於命中群）整條不執行
  //                              → cache 命中時第一部全部漏網
  //
  // 實測（疾速追殺 season=4，cache 命中）：kept=8 dropped=0，
  // 四條 2014 的第一部沒被殺掉。
  //
  // 即時搜尋結果（未 clean）走私有欄位，cache 命中結果（已 clean）
  // 走頂層欄位，兩條路徑行為一致。
  const nameOf = (res) => res._rawName || res.description || '';
  const yearOf = (res) => {
    const y = Number(res._year) || Number(res.year)
      || Number(extractVersionMarker(res._rawName || ''))
      || Number(extractVersionMarker(res.description || ''))
      || null;
    return y && Number.isFinite(y) ? y : null;
  };

  // 命中群：明確標為第 targetSeason 季的候選，用它們的年份決定 pooledYearMin。
  // 純查表：extractSequelNumber 只讀傳入字串、無副作用；filterBySequel 內不改
  // _rawName/description，同一 res 的結果恆定；Map 以物件身份為 key。
  const sequelCache = new Map();
  const sequelOf = (res) => {
    if (!sequelCache.has(res)) sequelCache.set(res, extractSequelNumber(nameOf(res)));
    return sequelCache.get(res);
  };
  const sequelMatched = results.filter(res => sequelOf(res) === targetSeason);
  const yearsOfMatched = sequelMatched.map(yearOf).filter(Boolean);
  const pooledYearMin = yearsOfMatched.length ? Math.min(...yearsOfMatched) : null;

  // 「片名沒寫季也沒年份」但跨多站回的同名檔案計數 —— 規則 4 用。
  // 計數單位是 baseName（去空白、去集數尾），如「五等分的新娘」。
  const unversionedBases = new Map();
  for (const res of results) {
    const rawName = nameOf(res);
    if (sequelOf(res) === targetSeason) continue;
    const candYear = yearOf(res);
    if (candYear) continue;
    const base = (res._baseName || rawName.replace(/第[0-9一二三四五六七八九十百零〇]+[集話話回]/g, '').replace(/第[0-9]+季|Season\s*[0-9]+/gi, '')).trim();
    if (!base) continue;
    unversionedBases.set(base, (unversionedBases.get(base) || 0) + 1);
  }

  let kept = [];
  const dropped = [];
  for (const res of results) {
    const rawName = nameOf(res);
    const sequel = sequelOf(res);

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
// ★ `＊` / `∽` 是簽名型 adapter 站（jpyy / agedm）用來標示「外傳篇」
    //   的站方符號，例如「五等分的新娘＊」。它不是片名的一部分，且
    //   extractSequelNumber 對它回 null（`＊` 非數字）→ 走不到規則 1/規則 X，
    //   只會被「candYear < pooledYearMin」或「> pooledYearMin + 3」攔截。
    //   「五等分的新娘＊」的 _year 是 2024（比 pooledYearMin 2021 晚 3 年，
    //   剛好沒超過 +3 的門檻）→ 整條漏網混進第 2 季結果。
    //   舊規則的正則漏了這個符號，是實測漏網的直接原因。
    if (/剧场版|劇場版|电影版|電影版|\bOVA\b|\bSP\b|外传|外傳|特別篇|特别篇|[＊∽]/.test(rawName)) {
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
      const candYear = yearOf(res);
      // 為什麼用「candYear < pooledYearMin」而不是「candYear <= pooledYearMin - 1」：
      // 上一季的播出年通常正是 pooledYearMin - 1（S2 拍攝年的前一年）。
      // 把「candYear == pooledYearMin - 1」當 borderline 留著會讓 S1 整季漏網
      // 混進 S2 結果（典型例子：「零之使魔」S1=2006、S2=2007，差 1 年）。
      if (candYear && candYear < pooledYearMin) {
        dropped.push(res); continue;
      }
      // DEBUG: 印出通過/沒通過規則 3 的情況，幫忙定位漏網之魚
      if (candYear && candYear >= pooledYearMin && candYear < pooledYearMin + 1) {
        console.log(`  [PASS-rule3 borderline] name="${res.name}" year=${yearOf(res)} candYear=${candYear} pooledYearMin=${pooledYearMin}`);
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
      const candYear = yearOf(res);
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
    if (/剧场版|劇場版|电影版|電影版|\bOVA\b|\bSP\b|外传|外傳|特別篇|特别篇|[＊∽]/.test(rawName)) {
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
      const candYear = yearOf(res);
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
      const candYear = yearOf(res);
      // 候選年份 = pooledYearMin + 1 → 同時代另一版本嫌疑
      if (candYear && candYear === pooledYearMin + 1) {
        dropped.push(res); continue;
      }
    }

    // 片名沒寫季也沒年份、且跨多站回傳同一 baseName → 上一季嫌疑
    // （只有 1 站回的可能是另一季沒寫季的合法結果，2 站以上才殺）
    if (sequel === null && pooledYearMin !== null) {
      const candYear = yearOf(res);
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
      // ★ 與 filterBySequel 的 yearOf 同一理由：cache 內的物件已經過
      // cleanResourceForOutput，_year / _rawName 都被刪了，只剩頂層
      // year。只讀私有欄位會讓 cache 命中路徑的版本過濾完全失效。
      const candYear = res._year ?? res.year
        ?? extractVersionMarker(res._rawName || '')
        ?? extractVersionMarker(res.description || '');
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

  const targetEpisode = _toEpisodeNumber(episode);
  const startTime = Date.now();

  const siteManager = new SiteManager();
  const resourceSites = parseResourceSites(VodData);
  const sortedSites = siteManager.initializeSites(resourceSites);

  const targetInfo = extractEnhancedInfo(seriesName);

  // season 參數不會出現在 seriesName 裡，必須在這裡套用，否則搜尋字串
  // 永遠是裸片名。使用者切換季別時拿到的是第一季的內容，畫面看起來
  // 就完全沒有刷新。★ 統一走 resolveRexSeason（見其註解），與 loadResource 一致。
  let targetSeason = resolveRexSeason(season, seriesName, targetInfo.seasonNumber);
  if (Number.isFinite(targetSeason) && targetSeason > 1) {
    targetInfo._expectedSequel = targetSeason;
  }
  targetInfo.seasonNumber = targetSeason;
  // ★ 把使用者指定的 type 帶進 targetInfo，給下游 isSmartSeriesMatch 用。
  //
  // 為什麼：jpyy 對「劇場版」存成 typeId1=1（電影），跟 S1 TV 動漫的
  // typeId1=4 不同。當使用者 type='tv' 但 candidate 的 _siteTypeName='movie'
  // 時，劇場版是 spin-off 必須擋掉。沒有這個欄位，isSmartSeriesMatch 收
  // 不到 type 訊息 → 誤判 exact 100。
  // 條件：type 只在 'tv'/'movie'/'variety' 之一時帶入，避免無效值污染。
  if (type === 'tv' || type === 'movie' || type === 'variety') {
    targetInfo.type = type;
  }

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
  //
  // ★ 速度：`_tmdbAliasSearchQuery` 標記「本次搜尋已跑過 TMDB」。
  //   loadResource 與 performBatchSearch/performSmartSearch 各自呼叫一次，
  //   cache miss 時等於把整段 TMDB 流程（內含多次 API request）跑兩次，
  //   而第二次必定是純重複（此時 cache 已被第一次填好）。跳過它。
  if (!targetInfo._tmdbAliasSearchQuery && !params?._preSearchQuery) {
    try {
      await tryExpandWithTMDBAliases(targetInfo, type);
      targetInfo._tmdbAliasSearchQuery = true;
      console.log(`[TMDB-diag] tryExpand returned, _aliasSearchQuery="${targetInfo._aliasSearchQuery || '(空)'}", searchQuery="${targetInfo.searchQuery}"`);
    } catch (e) {
      targetInfo._tmdbAliasSearchQuery = true;
      console.log(`[TMDB-diag] tryExpand THREW: ${e?.message || e}`);
      if (CONFIG.TMDB?.VERBOSE) console.warn('[TMDB] expand 失敗,繼續原 query:', e?.message || e);
    }
  } else if (params?._preSearchQuery) {
    // ★ 上游（loadResource）已完成 TMDB 擴充並把最終 query 傳下來，
    //   直接沿用，不要再跑一次整段 TMDB 流程。
    targetInfo.searchQuery = params._preSearchQuery;
  }
  if (targetInfo._aliasSearchQuery) {
    const aliasQ = String(targetInfo._aliasSearchQuery)
      .replace(/(?:19|20)\d{2}\s*$/, '')
      .replace(/\s+$/, '')
      .trim();
    if (aliasQ) {
      console.log(`🌐 [TMDB] 已採用對岸/別名 query: "${aliasQ}"（原本 "${targetInfo.searchQuery}"）`);
      targetInfo.searchQuery = aliasQ;
targetInfo.searchQuery = aliasQ;
// v2.9.6：別名被採用時必須同步改比對用的名稱，否則搜尋拿得到結果
// 但過濾階段會把它們全部殺掉。
//
// 實測：「陰屍路」(港譯) → TMDB 別名「行尸走肉」。站方確實回傳
// 「行尸走肉第十一季」等 20 筆，但 isSmartSeriesMatch 拿的是
// targetInfo.baseName（仍是「阴尸路」）去比對「行屍走肉」——
// 字面完全不同 → type=none → 0 筆。
//
// 只改 searchQuery 等於「用別名去搜，再用原名去篩」，這正是本 bug
// 的本質。兩邊必須是同一個名字。
  applyAliasNameToTarget(targetInfo, aliasQ);
  }
}

  // 原本這裡會先對 10 個站做健康檢查再開始搜尋。該檢查只是 GET 站點首頁、
  // 結果不影響搜尋行為，等於每個站先被多打一次請求再打正式的搜尋請求，
  // 慢的站還要等滿 1500ms 超時。串流的價值就是快，實測因此多花掉數秒，
  // 這裡直接移除。
  // adapter 站在串流模式下也要參與，否則選「串流」時金牌影視整個不見。
  // 傳空陣列 = 本次不跑（未啟用或沒設定站點）。
  const smartAdapterSites = _adapterIsEnabled(params)
    ? _adapterActiveSites(params)
    : [];
  const executor = new SmartSearchExecutor(siteManager, targetInfo, type, matchStrictness, targetEpisode, smartAdapterSites);
  
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
  // ★ 把 type 帶進 targetInfo（jpyy 劇場版守門員要用）。
  if (type === 'tv' || type === 'movie' || type === 'variety') {
    targetInfo.type = type;
  }
  // ★ 統一走 resolveRexSeason（見其註解），與 loadResource 一致。
  let targetSeason = resolveRexSeason(season, seriesName, targetInfo.seasonNumber);
  // ★ 同 loadResource：episode 走 _toEpisodeNumber，NaN 會殺光結果。
  const targetEpisode = _toEpisodeNumber(episode);
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
  //
  // ★ 速度：`_tmdbAliasSearchQuery` 標記「本次搜尋已跑過 TMDB」。
  //   loadResource 與 performBatchSearch/performSmartSearch 各自呼叫一次，
  //   cache miss 時等於把整段 TMDB 流程（內含多次 API request）跑兩次，
  //   而第二次必定是純重複（此時 cache 已被第一次填好）。跳過它。
  if (!targetInfo._tmdbAliasSearchQuery && !params?._preSearchQuery) {
    try {
      await tryExpandWithTMDBAliases(targetInfo, type);
      targetInfo._tmdbAliasSearchQuery = true;
      console.log(`[TMDB-diag] tryExpand returned, _aliasSearchQuery="${targetInfo._aliasSearchQuery || '(空)'}", searchQuery="${targetInfo.searchQuery}"`);
    } catch (e) {
      targetInfo._tmdbAliasSearchQuery = true;
      console.log(`[TMDB-diag] tryExpand THREW: ${e?.message || e}`);
      if (CONFIG.TMDB?.VERBOSE) console.warn('[TMDB] expand 失敗,繼續原 query:', e?.message || e);
    }
  } else if (params?._preSearchQuery) {
    // ★ 上游（loadResource）已完成 TMDB 擴充並把最終 query 傳下來，
    //   直接沿用，不要再跑一次整段 TMDB 流程。
    targetInfo.searchQuery = params._preSearchQuery;
  }
  if (targetInfo._aliasSearchQuery) {
    const aliasQ = String(targetInfo._aliasSearchQuery)
      .replace(/(?:19|20)\d{2}\s*$/, '')
      .replace(/\s+$/, '')
      .trim();
    if (aliasQ) {
      console.log(`🌐 [TMDB] 已採用對岸/別名 query: "${aliasQ}"（原本 "${targetInfo.searchQuery}"）`);
      targetInfo.searchQuery = aliasQ;
targetInfo.searchQuery = aliasQ;
// v2.9.6：別名被採用時必須同步改比對用的名稱，否則搜尋拿得到結果
// 但過濾階段會把它們全部殺掉。
//
// 實測：「陰屍路」(港譯) → TMDB 別名「行尸走肉」。站方確實回傳
// 「行尸走肉第十一季」等 20 筆，但 isSmartSeriesMatch 拿的是
// targetInfo.baseName（仍是「阴尸路」）去比對「行屍走肉」——
// 字面完全不同 → type=none → 0 筆。
//
// 只改 searchQuery 等於「用別名去搜，再用原名去篩」，這正是本 bug
// 的本質。兩邊必須是同一個名字。
  applyAliasNameToTarget(targetInfo, aliasQ);
  }
}

  // 與串流模式同樣帶上續集序號，理由見 loadResource 的 cacheKey 說明。
  const batchSequel = extractSequelNumber(targetInfo.rawName);
  const batchVersion = targetInfo.year ?? extractVersionMarker(targetInfo.rawName) ?? 'x';
  // ★ Cache 拆分：MacCMS 全季共用，adapter 單集綁定。
  //
  //   舊設計：cache key 帶 _e${targetEpisode}，整批結果（含 MacCMS + adapter）
  //   一起存。使用者從 E1 切到 E2 時，cache miss → 全站重搜（MacCMS 的
  //   detail 也要重抓），但實際上 MacCMS 的結果跟集數無關，純粹是
  //   cache key 設計錯誤導致的「假性 cache miss」。實測從 E1 切到 E2
  //   需重抓 5+ 個 MacCMS 站的 detail ≈ 4-8s，使用者體感是「切集很慢、
  //   還要重搜」。
  //
  //   新設計（兩把 key）：
  //     • macCacheKey  → 不含 _e${ep}，整季 MacCMS 結果，跨集共享
  //     • adCacheKey   → 含 _e${ep}，該集 adapter 結果（adapter 延遲換
  //       URL 換出的是當集 m3u8，與集數綁定，不能跨集共用）
  //
  //   讀取：合併兩把 cache，run filterByEpisode 取出當集。
  //   寫入：寫完搜尋後，allResults 按 _adapterSite 標籤分流到兩把 cache。
  //
  //   兼容：舊 key（vod_batch_..._e${ep} 含全部類型）保留讀取。命中時
  //   legacy 結果會跟 mac / ad 結果合併（用 url 去重），讓使用者無感升級；
  //   30 分鐘後舊 key 自然過期，不再佔用 storage。
  const baseCacheKey = `vod_batch_${normalizeTitleForMatch(targetInfo.baseName)}_sq${batchSequel ?? 'x'}_y${batchVersion}_a${targetInfo.region ?? 'x'}_s${targetSeason}_${type}`;
  const macCacheKey = baseCacheKey + '_mac';
  const adCacheKey  = baseCacheKey + `_adapter_e${targetEpisode || 'all'}`;
  // 舊格式 key（向後相容：v 之前的版本存進去的整批結果）
  const legacyCacheKey = `vod_batch_${normalizeTitleForMatch(targetInfo.baseName)}_sq${batchSequel ?? 'x'}_y${batchVersion}_a${targetInfo.region ?? 'x'}_s${targetSeason}_${type}_e${targetEpisode || 'all'}`;

  // ★ 標記「cache 哪邊命中」：搜尋區段會用來決定要不要跑 MacCMS 補抓。
  let _macCacheHit = false;
  let _adapterCacheHit = false;

  // 對每條 cache 結果跑兜底 wrap：歷史版本可能以裸 CDN 寫入（syncWidgetVersion
  // 沒清乾淨、或 batch 路徑在某些版本繞過 wrap 直接 set），wrap 邏輯是冪等的，
  // 已 wrap 的 url 會被 isAlreadyWrapped 擋下，這裡只對裸 CDN 真正 wrap。
  const _rewrap = (arr) => {
    let n = 0;
    for (const r of arr) {
      if (!r || !r.url || typeof r.url !== 'string') continue;
      const before = r.url;
      const after = wrapM3U8WithFilter(r.url, { adapter: !!r._adapterSite });
      if (after !== before) { r.url = after; n++; }
    }
    return n;
  };
  const _persistIfRewrapped = (key, arr, rewrapped) => {
    if (rewrapped <= 0) return;
    console.log(`🩹 cache 兜底 wrap: ${rewrapped}/${arr.length} 條裸 CDN 已修復（key=${key.slice(0, 60)}...）`);
    try { Widget.storage?.set?.(key, JSON.stringify(arr), CONFIG.CACHE_TTL); } catch {}
  };

  let allResults = [];

  // ★ 讀 cache：合併 mac + adapter。
  //
  //   為什麼 mac 與 adapter 都要讀：cache miss 任一邊都要重抓那邊；
  //   兩邊都 hit 就是完整結果，直接跳過搜尋。
  try {
    const [macRaw, adRaw, legacyRaw] = await Promise.all([
      Widget.storage?.get?.(macCacheKey),
      Widget.storage?.get?.(adCacheKey),
      Widget.storage?.get?.(legacyCacheKey),
    ]);
    const macCached = parseCacheValue(macRaw);
    const adCached  = parseCacheValue(adRaw);
    const legacyCached = parseCacheValue(legacyRaw);

    if (macCached.length > 0 || adCached.length > 0 || legacyCached.length > 0) {
      // 兜底 wrap
      const w1 = _rewrap(macCached);
      const w2 = _rewrap(adCached);
      const w3 = _rewrap(legacyCached);
      _persistIfRewrapped(macCacheKey, macCached, w1);
      _persistIfRewrapped(adCacheKey,  adCached,  w2);
      _persistIfRewrapped(legacyCacheKey, legacyCached, w3);

      // 合併：舊格式的 legacy 也要納入（其內含 MacCMS + adapter 兩種，
      // 由 _adapterSite 自動分流）
      const fromLegacy = legacyCached.filter(r => {
        const isInMac = macCached.some(m => m.url === r.url);
        const isInAd  = adCached.some(a => a.url === r.url);
        return !isInMac && !isInAd;
      });
      const merged = [...macCached, ...adCached, ...fromLegacy];
      if (merged.length > 0) {
        console.log(`💾 batch cache 命中: mac=${macCached.length} adapter=${adCached.length} legacy=${fromLegacy.length}（合併 ${merged.length}）`);
        allResults = merged;
        // ★ 記住「哪邊 cache 命中」：決定要不要重抓補上 miss 的部分。
        //
        //   修正前：合併後 non-empty 就直接跳過搜尋 → adapter miss 時
        //     永遠不會被補抓，使用者切到該集只看到 MacCMS 站，
        //     看不到金牌影視等 adapter 站。
        //   修正後：若 adCached 為空（即 adapter 站該集 cache miss），
        //     設 _adapterNeedsRefetch=true，後續搜尋區段仍會跑
        //     （因為 allResults 是 cache 填的，後面 if 會依 _macCacheHit
        //     決定要不要跑 MacCMS 補抓，只跑 adapter 補抓即可）。
        _macCacheHit = macCached.length > 0;
        _adapterCacheHit = adCached.length > 0;
      }
    }
  } catch (e) {
    console.warn('读取缓存失败:', e.message);
  }

  // ★ 從 legacy 命中但 mac/ad 都 miss 的場景：把 legacy 結果視為
  //   「MacCMS 部分命中」（legacy 內含 MacCMS 全季）。等同 _macCacheHit。
  if (allResults.length > 0 && !_macCacheHit && !_adapterCacheHit) {
    _macCacheHit = true;
  }

  // ★ 進入搜尋區段的條件：完全 cache miss、部分 cache miss、
  //   或「換集後 cache 內沒有該集」。
  //
  //   修正前：只看 allResults.length（被 cache 填滿就不搜）→ adapter miss 時
  //     永遠不會被補抓，使用者切到該集只看到 MacCMS 站。
  //   修正後：allResults 為空（完全 miss），或 adapter 該集 cache miss
  //     但 MacCMS 命中（部分 miss），都會進入搜尋區段；搜尋區段內部
  //     依 _macCacheHit 決定要不要跑 MacCMS 任務（避免重抓已命中的
  //     MacCMS 站，省下 5 站 detail 重抓時間）。
  //
  // ★ 切集補抓（本次新增）：macCacheKey 是「全季共用」的 —— 搜 E1 時
  //   各站只回傳 E1 當下在播的集數範圍（站方 detail 頁只列已更新集），
  //   未播出的後面集數根本不在 cache 裡。使用者切到別集時 merged 非空
  //   → 直接跳過搜尋 → 尾端 filterByEpisode 殺光 → 回 0 筆，
  //   使用者看到的就是「選另外一集時搜不到」。
  //   修法：merged 裡沒有 targetEpisode 時，強制 MacCMS 重抓一次
  //   （_macCacheHit=false，且全程不寫髒 cache）。
  if (type === 'tv' && targetEpisode && allResults.length > 0) {
    const hasTargetEp = allResults.some(r => episodeLabelOf(r) === targetEpisode);
    if (!hasTargetEp) {
      console.log(`🔄 切集補抓: cache 有 ${allResults.length} 條但缺 E${targetEpisode}，MacCMS 重抓`);
      _macCacheHit = false;
    }
  }
  const _needRefetch = (
    allResults.length === 0
    || (!_adapterCacheHit && _adapterIsEnabled(params))
    || (!_macCacheHit && allResults.length > 0)
  );
  if (_needRefetch) {
    const stats = { total: resourceSites.length, success: 0, failed: 0 };
    const requestTasks = [];

    // ===== 簽名型 adapter 站（與 MacCMS 並行，互不影響）=====
    //
    // 走與 MacCMS 完全相同的下游：item 已被 _adapterSearch 偽裝成
    // MacCMS 欄位，dedup / 年份季別過濾 / m3u8 wrap 全部共用。
    //
    // 刻意不塞進 requestTasks 陣列：adapter 一筆結果要 2 次請求
    // （詳情頁 + 換 URL），並發跑會佔滿連線拖慢 MacCMS 站。獨立一條
    // task、內部自己控制節奏，並在失敗時靜默回傳 []。
    const adapterEnabled = _adapterIsEnabled(params);
    if (adapterEnabled) {
      requestTasks.push(async () => {
        const sites = _adapterActiveSites(params);
        if (sites.length === 0) return [];

        const adapterResults = [];
        // ★ 速度：各站併發，不再一站跑完才換下一站。
        //
        //   原本是 `for (const site of sites) { await _adapterSearch(...) }`，
        //   實測 jpyy 跑完(+330ms)之後 agedm 才開始，等於把兩站的
        //   耗時相加。改成併發後總時間 = max(各站) 而非 sum。
        //
        //   為什麼安全：站點之間沒有任何相依關係（各打各的 API），
        //   輸出結果在下游是合併後再排序，順序不影響結果集合。
        //   併發度由 _adapterPool 控制，避免一次打太多觸發 429。
        const perSite = async (site) => {
          try {
            const items = await _adapterSearch(
              site,
              targetInfo.searchQuery || targetInfo.baseName,
              targetInfo,
              type,
              targetEpisode
            );
            if (!items || items.length === 0) return [];

            // ★ sub-series 過濾（MacCMS 迴圈在 6869 行有同款檢查，
            //   但簽名型 adapter 走的是這條獨立分支，完全繞過了它）。
            //
            //   沒有這道閘門的實測後果：搜「五等分的新娘」第 2 季時，
            //   「五等分的新娘＊」（2024 外傳）與「五等分的新娘劇場版」
            //   直接混進結果，使用者看到的第一條就是外傳。
            //
            //   為什麼 filterBySequel 沒擋下來：`＊` 讓 extractSequelNumber
            //   回 null（走不到規則 1/規則 X），而 _year=2024 比
            //   pooledYearMin=2021 剛好晚 3 年、沒超過規則 3.7 的 +3 門檻。
            //   劇場版則是因為 _rawName 是簡體「五等分的新娘剧场版」、
            //   而規則 0 的正則寫了「劇場版」繁體字才沒被規則 0 命中。
            //
            //   season=1（S1）時不過濾：那時使用者就是要看整個系列，
            //   劇場版/外傳反而是合理的入口。
            if (Number(targetInfo.seasonNumber) >= 1) {
              const usable = items.filter(it => {
                const rawName = it.vod_name || '';
                const looksLikeSpinOff = /剧场版|劇場版|电影版|電影版|外传|外傳|特別篇|特别篇|总集篇|總集篇|番外|电影解说|電影解說|[＊∽]/u.test(rawName);
                const looksLikeOAD = /(^|[^0-9第])OAD($|[^0-9])|^OAD[0-9]|OAD版|OAD化/.test(rawName);
                const looksLikeSP = /(^|[^0-9第])SP($|[^0-9])|^SP[0-9]/u.test(rawName);
                return !(looksLikeSpinOff || looksLikeOAD || looksLikeSP);
              });
              if (usable.length !== items.length && CONFIG.DEBUG) {
                const droppedNames = items.filter(it => !usable.includes(it)).map(it => it.vod_name).join(', ');
                console.log(`🔌 [adapter:${site.id}] season=${targetInfo.seasonNumber} 濾掉 sub-series: ${items.length - usable.length} 條（${droppedNames}）`);
              }
              items.length = 0;
              items.push(...usable);
              if (items.length === 0) return [];
            }

            // ★ 續集序號過濾（adapter 專屬）。下游 filterBySequel 擋不住這裡，
            //   必須在 adapter 層就收斂，原因有兩個獨立的缺陷：
            //
            //   缺陷 1：jpyy 不回年份。
            //     `toMacItem` 的 vod_year 來自 `String(it.vodPubdate||'').slice(0,4)`；
            //     站方vodPubdate 為空時 → vod_year='' → _year=null。
            //     沒有年份 → filterBySequel 的 pooledYearMin=null
            //              → 規則 3（「年份早於命中群」）整條不執行
            //              → 只剩規則 1（檔名寫出序號）能擋。
            //     實測：jpyy 回「疾速追殺」(無年份) + 「疾速追殺4」(無年份)
            //           → 過濾 0 筆，第一部直接推給使用者。
            //
            //   缺陷 2：規則 1 只認「檔名裡明寫序號」，不認「序號不同」。
            //     「疾速追殺3」對 season=4 應該擋（規則 X 處理這個），
            //     但「疾速追殺」（原版，無序號）對 season=4 完全沒有
            //     可判斷的線索 —— 它沒有任何欄位說自己「不是第四部」。
            //
            //   ★ 為什麼在這裡過濾是安全的（不會誤殺正確結果）：
            //     條件是「站內有明確標為第 targetSeason 的條目」。jpyy 是
            //     單站單片庫，「疾速追殺4」存在就代表第四部確實有片；
            //     同一站同時回「疾速追殺」只能是搜尋模糊匹配把系列全部帶出來，
            //     屬於站方資料污染而非使用者需求。使用者點第四部時要的是第四部。
            //
            //   ★ 為什麼 season=1 不過濾：
            //     使用者搜「疾速追殺」第一部時，全部四部都是合法結果。
            if (Number(targetInfo.seasonNumber) > 1 && type === 'movie') {
              const tSeason = Number(targetInfo.seasonNumber);
              const hitIdx = items.findIndex(it => extractSequelNumber(it.vod_name || '') === tSeason);
              if (hitIdx >= 0) {
                const kept = items.filter(it => {
                  const sq = extractSequelNumber(it.vod_name || '');
                  return sq === tSeason;   // 只留明確標為目標部的
                });
                if (kept.length !== items.length) {
                  const droppedNames = items.filter(it => !kept.includes(it)).map(it => it.vod_name).join(', ');
                  console.log(`🔌 [adapter:${site.id}] 第${tSeason}部續集過濾: ${items.length} -> ${kept.length}（濾掉: ${droppedNames}）`);
                }
                items.length = 0;
                items.push(...kept);
                if (items.length === 0) return [];
              } else {
                console.log(`🔌 [adapter:${site.id}] season=${tSeason} 站內無第${tSeason}部（${items.length} 筆候選），不過濾以免空清單`);
              }
            }

            // 標記目標集，讓 extractPlayInfoForCache 只換那一集的URL
            for (const it of items) it._adapterTargetEpisode = targetEpisode;

            // ★ 同上：extractPlayInfoForCache 對 adapter 項會走
            //   _adapterResolvePlay 的多跳網路鏈，循序會把首屏拖到
            //   十幾秒。併發上限由 _adapterPool 控制。
            const settled = await _adapterPool(
              items.map(item => async () => {
                const candidateInfo = extractEnhancedInfo(item.vod_name, item);
                const matchResult = isSmartSeriesMatch(targetInfo, candidateInfo, matchStrictness);
                return await extractPlayInfoForCache(item, site.title, type, matchResult, targetInfo);
              }),
              CONFIG.ADAPTERS?.DETAIL_CONCURRENCY ?? 4,
            );
            const siteOut = [];
            for (const res of settled) if (res) siteOut.push(...res);
            stats.success++;
            console.log(`🔌 [adapter:${site.id}] ${site.title} 回傳 ${siteOut.length} 條`);
            return siteOut;
          } catch (e) {
            stats.failed++;
            console.warn(`🔌 [adapter:${site.id}] ${site.title} 失敗: ${e?.message || e}`);
            return [];
          }
        };
        // 併發跑各站；_adapterPool 已經有「單筆失敗不影響整批」的保護。
        // 站內 detail 抓取（_adapterSearch 內部）已透過 _adapterPool + 全域
        // semaphore 收斂，這裡只需 SITE_CONCURRENCY 控站間並發即可。
        const perSiteSettled = await _adapterPool(
          sites.map(site => async () => await perSite(site)),
          CONFIG.ADAPTERS?.SITE_CONCURRENCY ?? 2,
        );
        for (const r of perSiteSettled) if (r && r.length) adapterResults.push(...r);
        return adapterResults;
      });
    }

    // 第一次的「response.list」快取給 fallback 複用。
    // 原本 fallback 路徑「結果 0 筆時放寬比對重試」會對**每個站**重新
    // 跑一次 fetchWithSmartRetry（相同 query、相同 URL），純粹重發 HTTP。
    // 把第一次拿到的 list 暫存在這個 Map，fallback 改為只重跑
    // isSmartSeriesMatch('loose')，0 額外 RTT。
    //
    // 為什麼安全：第一次與第二次 fallback 是**同一次** performBatchSearch
    // 內的兩階段，同 query、同 baseName、同一切輸入。Cache 不需要跨
    // 請求存活（避免站方目錄更新帶來的 stale 問題），純函式內存。
    const macResponseCache = new Map();   // site.value -> response.list

    // ★ MacCMS 站已 cache 命中時，跳過整批 MacCMS detail 重抓。
    //
    //   修正前：每次進入搜尋區段都會建 macTasks 跑 Promise.allSettled，
    //     即使 MacCMS cache 已經有完整結果也照抓一遍。E1 切到 E2 時
    //     5 個 MacCMS 站的 detail 都重抓，耗時 4-8s。
    //   修正後：_macCacheHit=true 時 macTasks 為空，requestTasks 只含
    //     adapter 補抓；進 if 之後 allResults 已含 MacCMS cache，合併
    //     新的 adapter 結果後寫回。E1 切 E2 從 4-8s 降到 ~200ms。
    const macTasks = _macCacheHit ? [] : resourceSites.map(site => async () => {
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

        // 第一次 response.list 留一份給 fallback 路徑
        try { macResponseCache.set(site.value, response.list); } catch {}

        // Phase 1 收集「通過比對與過濾的候選」；Phase 2 併發抓 detail（見下方）。
        const eligible = [];

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

          const candidateInfo = extractEnhancedInfo(item.vod_name, item);
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

          // Phase 1（純 CPU）：把「通過比對與過濾的候選」收進 eligible。
          // 為什麼要分離：原本 for-await 內同時做比對 + 抓 detail，
          // 12 筆候選 = 12×RTT 串起來。改成兩階段後：
          //   Phase 1 一次跑完所有 CPU 比對，零網路成本
          //   Phase 2 對 eligible 內的 item 併發抓 detail，總時間 = max(RTT)
          // 與 _adapterSearch 內的「先比對後併發」同源設計。
          if (!(matchResult.match && matchResult.confidence >= 0.6)) continue;

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
          // 收進 eligible，等下一階段併發抓 detail
          eligible.push({ item, matchResult });
        }

        // Phase 2（網路 I/O）：併發抓 detail。
        // 站內上限 MAC.DETAIL_CONCURRENCY（預設 4）控制單站併發；
        // 不再加全域 semaphore —— 8 站 × 4 = 32 並發在實測下未觸發 429，
        // 全域 semaphore 的 FIFO 跨站排隊反而會拉長總時間（先進後出
        // 的「搶 slot」機制在高 candidate 數下退化成 4 個一批的序列）。
        //
        // 觀察點：若日後看到 CDN 限流（429），優先把 MAC.DETAIL_CONCURRENCY
        // 調小，而不是加全域信號燈。
        if (eligible.length > 0) {
          const macLimit = CONFIG.MAC?.DETAIL_CONCURRENCY ?? 4;
          const detailResults = await _adapterPool(
            eligible.map(({ item, matchResult }) => async () =>
              await extractPlayInfoForCache(item, site.title, type, matchResult, targetInfo)
            ),
            macLimit
          );
          for (const res of detailResults) {
            if (res) siteResults.push(...res);
          }
        }
        // === END Phase 1+2 取代原本的 for-await 單行 ===

        if (siteResults.length > 0) {
          stats.success++;
        }

        return siteResults;
      } catch (error) {
        stats.failed++;
        return [];
      }
    });
    requestTasks.push(...macTasks);

    const results = await Promise.allSettled(requestTasks.map(task => task()));

    const fulfilledResults = results
      .filter(r => r.status === 'fulfilled')
      .flatMap(r => r.value);

    const executor = new SmartSearchExecutor(new SiteManager(), targetInfo, type, matchStrictness);
    // ★ 部分 cache 命中時，搜出來的新結果要與 cache 合併而非覆蓋。
    //
    //   修正前：smartDeduplicate 直接 assign 給 allResults，覆蓋掉
    //     cache 內的 MacCMS 結果。
    //   修正後：cache 已有結果（_macCacheHit）時，與新結果合併去重。
    const newSearched = executor.smartDeduplicate(fulfilledResults);
    if (allResults.length > 0) {
      // 合併：cache 內的 MacCMS + 新搜的 adapter（或部分 MacCMS）
      const existingUrls = new Set(allResults.map(r => r.url).filter(Boolean));
      const additions = newSearched.filter(r => !r.url || !existingUrls.has(r.url));
      allResults = [...allResults, ...additions];
    } else {
      allResults = newSearched;
    }

    // ===== 空結果安全網：整批篩選後一筆都沒有時，放寬比對再試一次 =====
    //
    // 為什麼需要這道：
    //   isSmartSeriesMatch 靠「字面比對」，遇到「同一作品、不同地區譯名」
    //   就會全數判成不匹配。實測最典型的兩例：
    //
    //     target「間諜家家酒」(台)  vs  站方「间谍过家家」(陸)
    //       normalizeForMatching 分別得到「間諜傢傢酒」與「間諜過傢傢」
    //       —— 不相等、不互含 → standard 直接判 none → 0 筆。
    //
    //     target「咒術迴戰」→ 轉簡體後殘留「迴」字，站台根本沒這個關鍵字。
    //       （這一個已由 VARIANT_CHARS 修掉，但同類問題無法窮舉。）
    //
    //   使用者看到的症狀正是「第一次進媒體頁沒有資源、返回再進就好了」——
    //   其實不是第二次運氣好，而是第一次的失敗結果被寫進 cache 後，
    //   下一次的路徑差異讓它又算出一遍。
    //
    // 為什麼用「放寬一次重試」而不是直接改預設寬嚴度：
    //   放寬比對會放進 OVA / 電影解說 / 特別篇（見上方 spin-off 過濾說明），
    //   那是使用者明確不要的內容。改成「只在結果為空時才放寬」後：
    //     - 正常情況結果非空 → 行為完全不變，嚴格比對照舊生效
    //     - 空結果 → 與其顯示空白頁，不如給使用者能看的內容
    //   這是「寧可多給，不可全無」的取捨，且只在零結果時觸發。
    if (allResults.length === 0 && matchStrictness !== 'loose' && CONFIG.RELAX_ON_EMPTY !== false) {
      console.log(`🆘 [fallback] standard 篩選後 0 筆，放寬到 loose 重試一次`);
      try {
        // fallback 路徑複用第一次的 response.list。
        //
        // 原本「結果為 0 時放寬比對」會**重發每個站的 search HTTP**
        // （同 query、同 URL），但同一次 performBatchSearch 內站方
        // 內容不會變，純粹是浪費 RTT。改成讀 macResponseCache：
        //   - 命中：直接拿 list 跑 loose 比對，0 額外 HTTP
        //   - 沒命中（罕見，例如第一次所有站都失敗）：走原本 fetch 路徑
        //     當兜底
        //
        // 注意：fallback 站迴圈目前是循序（DETAIL_CONCURRENCY=1）。
        const targetKey = normalizeForMatching(targetInfo.baseName);
        const macLimit = CONFIG.MAC?.DETAIL_CONCURRENCY ?? 4;
        const retryTasks = resourceSites.map(site => async () => {
          try {
            // 優先讀 cache，沒命中才發 HTTP（兜底）
            let list = macResponseCache.get(site.value);
            if (!list) {
              const resp = await fetchWithSmartRetry(
                site.value,
                { params: { ac: "detail", wd: targetInfo.searchQuery || targetInfo.baseName } },
                0, site.title);
              if (!resp?.list?.length) return [];
              list = resp.list;
            }
            if (!list || list.length === 0) return [];

            // Phase 1（純 CPU）：先收 eligible
            const eligible = [];
            for (const it of list) {
              if (!it?.vod_name) continue;
              // spin-off 仍要擋掉（外傳/劇場版/解說不是正片）
              if (/剧场版|劇場版|电影解说|電影解說|外传|外傳|总集篇|總集篇|番外|＊|∽/u.test(it.vod_name)) continue;
              const candKey = normalizeForMatching(stripSeasonMarker(it.vod_name));
              if (!candKey || !targetKey) continue;
              // ★ 用「字元重疊率」而不是子字串包含判斷同名。
              //
              //   為什麼不能用包含：地區譯名會整組換字，含關係不成立。
              //     target「間諜家家酒」→ 間諜傢傢酒
              //     cand  「间谍过家家」→ 間諜過傢傢
              //     兩者互不包含，但「間諜傢傢」是共同主體 → 必為同一部片。
              //
              //   為什麼用雙向重疊率而不是單向：單向會讓
              //   「間諜傢傢酒」被短片名「間諜」吃掉（100% 包含），把
              //   完全不同、又剛好撞字的條目也一起放行。取兩者較小值
              //   會讓「間諜」對「間諜傢傢酒」只有 2/5，被門檻擋掉。
              const overlap = _charOverlap(targetKey, candKey);
              if (overlap < CONFIG.EMPTY_FALLBACK_MIN_OVERLAP) continue;
              const ci = extractEnhancedInfo(it.vod_name);
              const mr = isSmartSeriesMatch(targetInfo, ci, 'loose');
              if (!mr.match) continue;
              eligible.push({ item: it, matchResult: mr });
            }

            if (eligible.length === 0) return [];

            // Phase 2（網路 I/O）：併發抓 detail（與 macTasks 站內同款策略）
            const macLimit = CONFIG.MAC?.DETAIL_CONCURRENCY ?? 4;
            const detailResults = await _adapterPool(
              eligible.map(({ item: it, matchResult: mr }) => async () =>
                await extractPlayInfoForCache(it, site.title, type, mr, targetInfo)
              ),
              macLimit
            );
            const out = [];
            for (const res of detailResults) {
              if (res) out.push(...res);
            }
            return out;
          } catch { return []; }
        });
        const retryResults = await Promise.allSettled(retryTasks.map(t => t()));
        const retryFlat = retryResults.filter(r => r.status === 'fulfilled').flatMap(r => r.value || []);
        const retryDedup = new SmartSearchExecutor(new SiteManager(), targetInfo, type, 'loose').smartDeduplicate(retryFlat);
        if (retryDedup.length > 0) {
          console.log(`🆘 [fallback] loose 重試取得 ${retryDedup.length} 筆`);
          allResults = retryDedup;
        }
      } catch (e) {
        console.warn('[fallback] loose 重試失敗:', e?.message || e);
      }
    }
    
    console.log(`📊 批量搜索完成: ${Date.now() - startTime}ms, 结果: ${allResults.length}`);

    // ★★★ 分流寫 cache 移到 performBatchSearch 尾端 ★★★
    //
    // 舊位置 bug（實測 log 佐證）：這段原本寫在「所有站搜完」之後、
    // 「filterBySequel / filterByTargetVersion / cleanResourceForOutput」之前。
    // 搜「疾速追殺」season=4 時：
    //     📊 批量搜索完成: 2335ms, 结果: 11       ← 未過濾 11 筆
    //     💾 adapter cache 寫入: 3 條             ← jpyy 的 2014/2017/2023 全寫進去
    //     💾 MacCMS cache 首次寫入: 8 條          ← 含 4 條第一部
    //     ✅ 搜索完成! 11 個結果                  ← 這次畫面對，但 cache 已髒
    //
    // 後果：cache 命中時直接回放未過濾的舊結果 → 使用者又看到第一部混在
    // 第四部清單裡，且因為 TTL 30 分鐘，反覆發生的週期很長。
    //
    // 實作：見 performBatchSearch 尾端 cleanResourceForOutput 之後的
    // 「分流寫 cache（過濾後）」區塊。
    //
    // 分流策略本身維持不變（MacCMS 全季共用 / adapter 綁定到該集）：
    //   • MacCMS（無 _adapterSite）→ macCacheKey，與舊內容按 url 去重合併
    //   • Adapter（有 _adapterSite）→ adCacheKey，直接覆蓋
  }

  let finalResults = allResults;
  // ★ 集數過濾短路（純加速，輸出逐字不變）。
  // 原邏輯是寬鬆版（保留未知集數 label===null，下游 loadResource 會再跑
  // 嚴格版 filterByEpisode 收斂），且寫 cache 發生在這裡之後 —— 改成
  // 嚴格版會改變 cache 內容，不可取。這裡只跳過「註定無操作」的那次：
  // 當所有條目的 label 已是目標集或未知時，filter 結果與輸入逐字相同。
  if (type === 'tv' && targetEpisode) {
    const needFilter = allResults.some(res => {
      const label = episodeLabelOf(res);
      return label !== null && label !== targetEpisode;
    });
    if (needFilter) {
      finalResults = allResults.filter(res => {
        const label = episodeLabelOf(res);
        return label === null || label === targetEpisode;
      });
    }
  }

  // 版本過濾，理由與串流模式相同。
  finalResults = filterByTargetVersion(finalResults, targetInfo);

  // 第 2 季過濾：smart_stream 與 batch 兩個路徑都必須套用，
  // 否則批次搜「仁醫」+ season=2 會把第一季的「仁医」也一起推上來。
  // 與 loadResource 內的邏輯同步，理由見該處的註解。
  // ★ 電影續集過濾（movie 分支）。理由與 loadResource 內的同名分支相同：
  //   搜「疾速追殺」season=4 時，站方會同時回傳第一部(2014)/第二部(2017)，
  //   舊行為 `if (type === 'tv')` 全跳過 → 三部混在播放列表裡。
  //   filterBySequel 對 targetSeason<=1 直接原樣返回，單部電影不受影響。
  if (type === 'movie') {
    const r = filterBySequel(finalResults, targetInfo);
    if (r.kept && r.before !== undefined && r.kept.length < r.before) {
      finalResults = r.kept;
      console.log(`🎬 電影續集過濾(batch, 第${targetInfo.seasonNumber}部): ${r.before} -> ${finalResults.length}（pooledYearMin=${r.pooledYearMin ?? 'null'}）`);
      console.log(`📊 第${targetInfo.seasonNumber}部過濾後送往 forward app 的最終清單（confirm count）: ${finalResults.length}`);
    } else if (r.before !== undefined && r.before > 0 && (!r.kept || r.kept.length === 0)) {
      console.log(`⚠️ 電影續集過濾(batch)無命中(${r.before}筆)，保留全部候選`);
    }
  }

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
    const cleaned = cleanResourceForOutput(res, type, {
      seasonNumber: targetInfo?.seasonNumber
    });
    Object.keys(res).forEach(k => delete res[k]);
    Object.assign(res, cleaned);
  });

  // ★★★ 分流寫 cache（過濾 + clean 之後）★★★ ← 從搜尋尾端搬到這裡
  //
  // 為什麼必須在這裡寫（而不是搜完所有站就寫）：
  //   cache 是「使用者下次會看到的東西」。如果在 filterByTargetVersion /
  //   filterBySequel 之前寫入，cache 裡會存著已經被判定為無關的資源
  //   （例如搜「疾速追殺」season=4 時的第一部 2014、第二部 2017）。
  //   這次搜尋的畫面雖然是對的，但下次 cache 命中就直接回放髒資料 →
  //   使用者看到「疾速追殺」(2014) 混在第四部清單裡，且會反覆發生
  //   （TTL 30 分鐘內每次點進詳細頁都命中）。
  //
  // 實測佐證（修前 log）：
  //   📊 批量搜索完成: 2335ms, 结果: 11
  //   💾 adapter cache 寫入: 3 條      ← jpyy 的 2014/2017/2023 未過濾全入
  //   💾 MacCMS cache 首次寫入: 8 條   ← 含 4 條第一部未過濾
  //   ✅ 搜索完成! 11 個結果
  //
  // 分流策略維持原樣（見搜尋尾端被搬走的那段註解）：
  //   • MacCMS（無 _adapterSite）→ macCacheKey，與舊內容按 url 去重合併
  //     （跨集累積，避免從 E5 開始搜時把 E1~E4 洗掉）
  //   • Adapter（有 _adapterSite）→ adCacheKey，直接覆蓋（綁定單集）
  if (finalResults.length > 0 && CONFIG.CACHE_TTL > 0) {
    try {
      const macResults = finalResults.filter(r => !r._adapterSite);
      const adResults  = finalResults.filter(r => !!r._adapterSite);

      if (macResults.length > 0) {
        (async () => {
          let toWrite = macResults;
          try {
            const oldMac = parseCacheValue(await Widget.storage?.get?.(macCacheKey));
            if (oldMac.length > 0) {
              // ★ 舊資料也要過濾後才合併。
              //
              // 為什麼：舊的 merge 邏輯是「新增 + 保留舊」，目的是讓 cache 漸進式
              // 累積（從 E5 開始搜時不洗掉 E1~E4）。但舊資料如果是「上個版本寫進去的
              // 未過濾結果」，直接保留等於讓髒資料復活。
              //
              // 實測 bug（疾速追殺 season=4）：
              //   過濾 6 -> 3（正確）
              //   💾 MacCMS cache 寫入(過濾後): 新增 3 + 保留舊 3 = 6 條  ← 又變回 6 條！
              //   下次 cache 命中：merged = 6 筆（髒）→ 過濾再殺一次，畫面對但
              //   cache 永遠是髒的，任何一條「漏過濾的」路徑都會浮出來。
              //
              // 修法：把 oldMac 也丟進 filterBySequel，只保留與本次結果同一部/季的。
              // 這同時保留了「漸進式累積」的原意（同一部/季的多站結果可以累積），
              // 又不會讓「其他部/季」的髒資料混進來。
              let oldToKeep = oldMac;
              if (type === 'movie' || type === 'tv') {
                const fr = filterBySequel(oldMac, targetInfo);
                if (fr && Array.isArray(fr.kept)) oldToKeep = fr.kept;
              }
              const newUrls = new Set(macResults.map(r => r.url).filter(Boolean));
              const retained = oldToKeep.filter(r => r.url && !newUrls.has(r.url));
              toWrite = [...macResults, ...retained];
              if (retained.length !== oldMac.length) {
                console.log(`💾 MacCMS cache 寫入(過濾後): 新增 ${macResults.length} + 保留舊 ${retained.length}/${oldMac.length} = ${toWrite.length} 條（舊資料已再過濾）`);
              } else {
                console.log(`💾 MacCMS cache 寫入(過濾後): 新增 ${macResults.length} + 保留舊 ${retained.length} = ${toWrite.length} 條`);
              }
            } else {
              console.log(`💾 MacCMS cache 首次寫入(過濾後): ${macResults.length} 條`);
            }
          } catch (e) { /* 合併失敗時直接寫 macResults */ }
          try { Widget.storage?.set?.(macCacheKey, JSON.stringify(toWrite), CONFIG.CACHE_TTL); } catch {}
        })();
      }

      if (adResults.length > 0) {
        try {
          Widget.storage?.set?.(adCacheKey, JSON.stringify(adResults), CONFIG.CACHE_TTL);
          console.log(`💾 adapter cache 寫入(過濾後): ${adResults.length} 條（key=..._adapter_e${targetEpisode || 'all'}）`);
        } catch (e) {}
      }
    } catch (e) {}
  }

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
  // query string 手動解析，不使用 URLSearchParams ——
  // Forward 的 widget 沙箱（iOS/Android JavaScriptCore）沒有那個全域。
  // 詳見 buildDetailLink 的註解。
  //
  // 不用 split('&') 直接切：使用者標題可能含 &，但標題在 '?' 之前
  // 且已 encodeURIComponent（& → %26），所以 queryPart 裡的 '&'
  // 一定是參數分隔符。值的部分再 decodeURIComponent。
  const qIdx = rest.indexOf('?');
  const titlePart = qIdx >= 0 ? rest.slice(0, qIdx) : rest;
  const queryPart = qIdx >= 0 ? rest.slice(qIdx + 1) : '';
  const title = decodeURIComponent(titlePart).trim();
  if (!title) return null;

  const meta = { title };
  if (queryPart) {
    const params = {};
    for (const kv of queryPart.split('&')) {
      if (!kv) continue;
      const eq = kv.indexOf('=');
      const k = eq >= 0 ? kv.slice(0, eq) : kv;
      const v = eq >= 0 ? kv.slice(eq + 1) : '';
      if (!k) continue;
      try {
        params[decodeURIComponent(k)] = decodeURIComponent(v);
      } catch {
        params[k] = v;   // decode 失敗就原樣保留，不要讓整個解析爆掉
      }
    }
    if (params.season != null) {
      const s = parseInt(params.season, 10);
      if (Number.isFinite(s) && s >= 1) meta.season = s;
    }
    if (params.episode != null) {
      const e = parseInt(params.episode, 10);
      if (Number.isFinite(e) && e >= 1) meta.episode = e;
    }
    if (params.type != null) {
      const t = String(params.type).toLowerCase();
      if (t === 'tv' || t === 'movie') meta.type = t;
    }
    if (params.id != null) meta.id = String(params.id);
  }
  return meta;
}

/**
 * 建立詳情頁 link。
 *
 * ★ 為什麼手動組 query string 而不用 URLSearchParams：
 *
 *   Forward 的 widget 跑在 iOS/Android 的 JavaScriptCore 沙箱裡，
 *   那個環境**沒有 URLSearchParams**（Node 有，所以本機測試不會爆）。
 *   buildDetailLink 原本只在 loadDetail 被呼叫（REX 的 stream 模組
 *   在較完整的 runtime 裡跑），但 v49 把它拉進 loadResource 的熱路徑
 *   —— loadResource 在 Forward 的沙箱裡執行，於是直接炸：
 *
 *     [error] 模組執行錯誤：Can't find variable: URLSearchParams
 *
 *   修法：自己組 query string。參數值都是數字或 'tv'/'movie' 這種
 *   固定字串，encodeURIComponent 後直接用 '&' 串起來即可，
 *   語意與 URLSearchParams.toString() 完全一致。
 *
 *   ★ 對應的解析端 parseDetailLink 也一併改掉（見下），
 *     否則一邊不用 URLSearchParams 一邊用，兩邊格式會不一致。
 */
function buildDetailLink({ title, season, episode, type, id }) {
  const enc = encodeURIComponent(String(title || '').trim());
  const parts = [];
  if (season && Number.isFinite(season) && season >= 1) parts.push(`season=${encodeURIComponent(String(season))}`);
  if (episode && Number.isFinite(episode) && episode >= 1) parts.push(`episode=${encodeURIComponent(String(episode))}`);
  if (type === 'tv' || type === 'movie') parts.push(`type=${encodeURIComponent(type)}`);
  if (id) parts.push(`id=${encodeURIComponent(String(id))}`);
  const qs = parts.join('&');
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
    // 季別處理策略（多季合併 + 標籤隔離）：
    //
    //   一次抓回多季（明確切季時把 N 放最前），原因：
    //   REX 切季時不保證用新 season link 重調 loadDetail —— 可能是本地
    //   按 season 過濾已有的 episodeItems，也可能是拿舊 link 重調。
    //   兩種模式都要求「一次回應帶齊多季」：
    //     - 「仁醫」能切是偶然：S1 批次裡本來就混著「仁醫完結篇」這類
    //       S2 命名的條目（_seasonFromItem=2），REX 手上有兩季可切。
    //     - 「白粉飛」兩季站方同名，S1 批次全被標成 S1，REX 手上沒有
    //       S2 episodeItems，切季就只能繼續顯示 S1（就是這次回報的現象）。
    //   所以嚴格單季隔離在 loadDetail 這層行不通，必須合併。
    //
    //   「搜 S1 只出 S1」的純度改由標籤保證：每個資源的 season 取自它
    //   自己的站方季標（_seasonFromItem），不是批次季；REX 顯示 S1 時
    //   只拿 season=1 的 items。而 loadResource（播放源/模擬器入口）
    //   本身仍是單季嚴格過濾，S2 只出 S2（模擬器 log 已驗證）。
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

    // ★ 多季合併（明確季優先）+ 以資源自帶季標分組。
    //
    //   明確切季（link 帶 season=N，例如白粉飛切 S2）時把 N 放第一個：
    //   保證分組排序與 log 輸出都以當前季開頭；去重鍵帶季別後，
    //   先後順序不再決定生死 —— 同 URL 在不同季各保留一條。
    //
    //   S1/S2 批次各自帶嚴格季過濾（loadResource 內部 filterBySequel），
    //   不依賴「某季含另一季」的偶然。白粉飛 S1 批次拿回的全是 season=1、
    //   S2 批次拿回的全是 season=2，REX 切季有真數據可切。
    //
    //   分組鍵用「資源自己的 season」（clean 階段從站方 _seasonFromItem 提升），
    //   去重鍵同樣帶季別（s${season}||url）：同名季（白粉飛 S1/S2 站方
    //   同名、同一查詢回同一批 URL）下兩季各保留一條，REX 切到哪季
    //   都有東西可顯示；站方真有分季（不同 URL）時更不受影響。
    //
    //   補季規則：站方檔名沒季標（白粉飛/仁醫同名季、_seasonFromItem=null）
    //   的才 fallback 到批次季 s；有季標的保持原樣，避免把 S2 真身
    //   誤歸到 S1 批次裡。
    //
    //   各季 cache key 獨立（loadResource 內部 _s${season}），切回舊季
    //   命中快取，不重打站台。
    const explicitSeason = meta.season ?? null;
    // ★ v54：取回 1~6 季（不只 1~3），explicit 季放最前。
    //   舊寫法 [explicit,1,2] / [1,2,3] 讓 S4~S6 永遠進不了詳情頁：
    //   白粉飛有 6 季，初次載入只拿 S1~S3，切 S4 時 REX 手上無該季資料
    //   只能顯示舊季（整體切季壞掉的另一半原因；S1 豁免是另一半，已在
    //   isSmartSeriesMatch 修掉）。
    //   任何被明確選中的季（explicit）一定在首位被抓回，所以 S7+ 點選時
    //   也能按需拿回；初始 1~6 覆蓋絕大多數劇集的首屏季下拉。
    const _seasonUniverse = [1, 2, 3, 4, 5, 6];
    const seasonsToFetch = explicitSeason != null
      ? [...new Set([explicitSeason, ..._seasonUniverse])]
      : [..._seasonUniverse];
    const seenKey = new Set();
    let allResults = [];
    // ★ 併發抓多季：三個 loadResource 各自走獨立 cache key（_s${s}），
    //   無共享狀態，併發安全。總時間 = max(各季) 而非 sum。
    //
    // ★ 詳情頁必須拿「整季」而非「單集」：外層 link 常帶 episode
    //  （搜尋結果每筆的 link 都是 search:標題?season=N&episode=M），
    //   若把 episode 透傳給 loadResource，targetEpisode=N 會把整批
    //   結果過濾到只剩 M 一集 —— 詳情頁就只剩 1 集可點，
    //   使用者看到的就是「選另外一集時搜不到」。
    //   修法：內層一律 episode=null，且 link 重建成「不帶 episode」
    //   的季連結，避免 loadResource 頂部的 link 解析又把 episode
    //   從 link 補回來（_isUnset(null)=true 會被 link 覆寫）。
    //
    // ★ TMDB 別名預熱（純加速，輸出不變）。
    //   三路內層 loadResource 都會對同一 (title, type) 跑
    //   tryExpandWithTMDBAliases，底層 getTMDBAliasesBlocking 已有
    //   in-flight 去重所以 TMDB 只打一次，但三路仍會各做一次 storage
    //   讀 + 各自 race 等待。先在這裡暖一次 Alias cache，內層大概率
    //   直接走 in-memory 命中（<1ms），算出的別名逐字相同。
    //   上限只給 2.5s（= TMDB 單次 REQUEST_TIMEOUT）：預熱只是盡力而為，
    //   超時就放行，內層照舊走自己的 expand + in-flight 共用邏輯，
    //   行為與改前完全一致（不會出現「預熱等 6s、內層又等 6s」的疊加）。
    try { await getTMDBAliasesBlocking(title, type, 2500); } catch {}
    const batchArrays = await Promise.all(
      seasonsToFetch.map((s) => loadResource({
        seriesName: title,
        title,
        type,
        season: s,
        episode: null,
        id,
        link: buildDetailLink({ title, season: s, type, id }),
        searchMode: 'batch',
        matchStrictness: 'standard',
        preferResolution: 'auto',
        multiSource: (WidgetMetadata.globalParams.find(p => p.name === 'multiSource') || {}).value || 'enabled',
        VodData: (WidgetMetadata.globalParams.find(p => p.name === 'VodData') || {}).value || RESOURCE_SITES,
        m3u8FilterEnabled: (WidgetMetadata.globalParams.find(p => p.name === 'm3u8FilterEnabled') || {}).value || 'enabled',
        m3u8FilterWorkerUrl: (WidgetMetadata.globalParams.find(p => p.name === 'm3u8FilterWorkerUrl') || {}).value || '',
        m3u8FilterMode: (WidgetMetadata.globalParams.find(p => p.name === 'm3u8FilterMode') || {}).value || 'filter',
        // 簽名型 adapter 站是否繞開過濾廣告伺服器。漏了這行會讓「相關作品」
        // 走預設 'skip'，使用者設成 'filter' 也不生效。
        m3u8FilterAdapterMode: (WidgetMetadata.globalParams.find(p => p.name === 'm3u8FilterAdapterMode') || {}).value || 'skip',
      }))
    );
    for (let bi = 0; bi < seasonsToFetch.length; bi++) {
      const s = seasonsToFetch[bi];
      const batchResults = batchArrays[bi] || [];
      for (const r of batchResults) {
        if (!r.url) continue;
        // 補季先行：站方檔名沒季標（白粉飛/仁醫同名季、_seasonFromItem=null）
        // 的才 fallback 到批次季 s；有季標的保持原樣，避免把 S2 真身
        // 誤歸到 S1 批次裡。
        if (r.season == null) r.season = s;
        // ★ 去重鍵必須帶季別：同名季（白粉飛 S1/S2 站方同名、同一查詢
        //   回同一批 URL）用裸 URL 去重會把後到的整季殺掉 —— 初始載入
        //   [1,2,3] 時 S1 先佔位，S2 同 URL 全被跳過，REX 手上永遠只有
        //   S1，切季看起來完全沒變（就是這次回報的現象）。
        //   同 URL 在不同季各保留一條：REX 切到哪季都有東西可顯示；
        //   站方真有分季（不同 URL）時更不受影響。
        const dkey = `s${r.season}||${r.url}`;
        if (seenKey.has(dkey)) continue;
        seenKey.add(dkey);
        allResults.push(r);
      }
      console.log(`📡 [loadDetail] 季 S${s}: ${batchResults.length} 條（去重後累計 ${allResults.length}）`);
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

    // ★★★ 多季結構：childItems（季）→ 該季的 episodeItems（集）★★★
    //
    // 這是本次「有些劇可以切、有些不行」的主因。
    //
    // Forward / REX 的官方 VideoItem 契約（InchStudio/ForwardWidgets README）
    // 對 TV 多季的規定是：
    //
    //   return [{
    //     id: "tv.123", type: "tmdb", mediaType: "tv",
    //     childItems: [{                        // ← 每個 child = 一季
    //       id: "tv.123.s1", title: "第1季",
    //       episodeItems: [{ id: "tv.123.s1e1", title: "第1集", videoUrl: "..." }]
    //     }]
    //   }]
    //
    // 也就是：**季在 childItems，集在該季 child 的 episodeItems**。
    // 客戶端（Forward 與 REX 都是）看到 childItems 才知道「有幾季」，
    // 季別下拉列的資料來源就是 childItems。
    //
    // 我們舊的做法是把 S1、S2 的集數「全部平鋪」在頂層 episodeItems，
    // 靠每筆的 season 欄位去區分。這在只有一季時看起來沒問題，但：
    //   1. 客戶端建立季別下拉列時，沒有 childItems 就沒有「季」的集合，
    //      它只能把頂層 episodeItems 當成單一的一季 → 使用者切到 S2 時
    //      顯示的還是同一份（已按 season 過濾或根本沒過濾的）清單。
    //   2. REX 端的 season 欄位甚至不在 VideoItemChild 契約裡
    //      （@rexnow/libs 的 VideoItemChild 只有 episode，沒有 season），
    //      所以頂層 season 欄位在 REX 端**不會被解碼**——我們靠它分季
    //      的機制在 REX 上是無效的。
    //   3. 「有些劇可以、有些不行」正是這個結構差異造成的：
    //      站方檔名帶季別（「仁醫 第2季 完結篇」）的劇，loadResource
    //      在 S1 批次裡就混進了 S2 的資源，客戶端即使只有單一季也
    //      「看起來能切」；檔名沒季別的劇就完全卡在 S1。
    //
    // 修法（同時維持舊相容）：
    //   • 頂層 episodeItems：保留「當前季」的集數（單季時客戶端就用這個，
    //     行為與舊版完全一致，不破壞既有功能）。
    //   • childItems：每季一個 child，該季的集數放進該 child 的
    //     episodeItems，並在 child 上帶 seasonNumber / seasonIndex /
    //     season 三種欄位名（不同客戶端認的名字不同，全帶最保險）。
    //   • 季別下拉列因此有真實資料，切季時客戶端會帶著新季別回來。
    const groupsBySeason = new Map();
    for (const g of sortedGroups) {
      if (!groupsBySeason.has(g.season)) groupsBySeason.set(g.season, []);
      groupsBySeason.get(g.season).push(g);
    }

    const childItems = Array.from(groupsBySeason.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([s, groups]) => {
        const seasonEpisodes = groups.map((g) => {
          const first = g.resources[0];
          const epLink = buildDetailLink({
            title,
            season: g.season,
            episode: g.episode ?? undefined,
            type,
            id,
          });
          // ★ 方案A（加欄位不改值）：title 保持「第N集」原樣。
          //   Forward / REX 可能用 title 正則抓集數，改成 S2E1 會抓不到；
          //   episode 數字欄位本來就是對的，不動顯示字串最安全。
          //   季別區分度改由下方新增的結構欄位提供。
          const displayTitle = g.episode != null
            ? `第${g.episode}集`
            : (first?.description || '未命名');
          return {
            id: epLink,
            type: 'url',
            title: displayTitle,
            mediaType: type,
            description: first?.description || title,
            season: g.season,
            // ★ 方案A新增：episodeItems 補齊三種季別欄位名。
            //   純新增（舊欄位一個不動）：child 已有三種寫法，episode 只有
            //   season；不同客戶端認的名字不同，全帶最保險。
            //   未知欄位在 Swift / REX 解碼時會被忽略，不影響舊客戶端。
            seasonNumber: g.season,
            seasonIndex: g.season,
            episode: g.episode ?? undefined,
            videoUrl: first?.url,
            link: epLink,
            ...(g.resources.length > 1 ? {
              customLines: g.resources.map(r => ({
                name: r.name,
                url: r.url,
                description: r.description,
                // ★ 方案A新增：customLines 補季/集/年結構欄位。
                //   純新增：name / url / description 原樣保留，一個字不改；
                //   REX 若按 episode 配對舊資料，可用這三個欄位區分 S1E1/S2E1。
                //   StreamSourceItem 契約外欄位會被忽略，不影響解碼。
                season: r.season ?? g.season,
                episode: r.episode ?? g.episode,
                ...(r.year != null ? { year: r.year } : {}),
              }))
            } : {})
          };
        });

        const childLink = buildDetailLink({ title, season: s, type, id });
        return {
          id: childLink,
          // ★ v53：child 季必須是 'detail'（可鑽取）而非 'url'（可直接播放）。
          //   type:'url' 時 REX 認為點季無需再調 loadDetail，直接本地過濾
          //   手上唯一的 S1 清單 → 季卡住、集在同季內能動（本次回報症狀）。
          //   type:'detail' + link 帶 season=S 時，REX 點季用該 link 重調
          //   loadDetail，拿回該季頂層 episodeItems，再走 stream 重調。
          //   episodeItems 同時保留：Forward 端照讀，行為不變。
          type: 'detail',
          title: `第${s}季`,
          mediaType: type,
          description: `${title} 第${s}季（${seasonEpisodes.length} 集）`,
          link: childLink,
          // 三種季別欄位名都帶：不同客戶端 / 不同版本認的名字不同。
          //   season       — Forward VideoItem 風格
          //   seasonNumber — REX 原生 MediaItem / TMDB 風格
          //   seasonIndex  — REX 原生 StreamSource 風格
          season: s,
          seasonNumber: s,
          seasonIndex: s,
          episodeItems: seasonEpisodes,
        };
      });

    // 頂層 episodeItems = 當前季的集數（單季客戶端直接用；多季客戶端
    // 會改讀 childItems）。保持與舊版一致的「單季」語意。
    const currentSeasonGroups = groupsBySeason.get(mainSeason) || [];
    const topEpisodeItems = currentSeasonGroups.map((g) => {
      const first = g.resources[0];
      const epLink = buildDetailLink({
        title,
        season: g.season,
        episode: g.episode ?? undefined,
        type,
        id,
      });
      // ★ 方案A（加欄位不改值）：title 保持「第N集」原樣，理由同 childItems。
      const displayTitle = g.episode != null
        ? `第${g.episode}集`
        : (first?.description || '未命名');
      return {
        id: epLink,
        type: 'url',
        title: displayTitle,
        mediaType: type,
        description: first?.description || title,
        season: g.season,
        // ★ 方案A新增：頂層 episodeItems 同樣補齊三種季別欄位名。
        seasonNumber: g.season,
        seasonIndex: g.season,
        episode: g.episode ?? undefined,
        videoUrl: first?.url,
        link: epLink,
        ...(g.resources.length > 1 ? {
          customLines: g.resources.map(r => ({
            name: r.name,
            url: r.url,
            description: r.description,
            // ★ 方案A新增：同 childItems，補季/集/年結構欄位。
            season: r.season ?? g.season,
            episode: r.episode ?? g.episode,
            ...(r.year != null ? { year: r.year } : {}),
          }))
        } : {})
      };
    });

    // ★ v53：季結構可視化 log。以後判「本地過濾 vs 重調」不用再猜：
    //   這行印出 loadDetail 一次回了幾季、每季幾集。REX 切季若沒再調，
    //   就是在本地用這份結構過濾；若季數=[1] 只有一季，季下拉自然沒 S2 可點。
    try {
      console.log(`📡 [loadDetail] 季結構: 季數=[${Array.from(groupsBySeason.keys()).sort((a, b) => a - b).join(',')}] ` +
        Array.from(groupsBySeason.entries()).sort((a, b) => a[0] - b[0]).map(([s, gs]) => `S${s}:${gs.length}集`).join(' '));
    } catch {}

    return {
      id: mainLink,
      type: 'url',
      title,
      mediaType: type,
      description: type === 'movie'
        ? `電影：${title}`
        : `${title}（共 ${topEpisodeItems.length} 集）`,
      link: mainLink,
      season: mainSeason,
      seasonNumber: mainSeason,
      seasonIndex: mainSeason,
      // 電影沒有 episodeItems；REX UI 會自動隱藏集數面板。
      ...(type === 'tv' ? { episodeItems: topEpisodeItems } : {}),
      // ★ 多季：childItems 是「季別下拉列」的資料來源。
      //   每個 child = 一季，該季的集數在該 child 的 episodeItems。
      ...(type === 'tv' && childItems.length > 0 ? { childItems } : {}),
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
