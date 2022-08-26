import{az as Ge,aA as M,aB as bt,y,a as Ke,a4 as Ht,I as _t,M as qt,aC as kt,r as L,aD as jt,w as J,ac as Ee,h as g,aE as ae,e as It,B as Ue,a6 as Ot,x as z,H as Nt,aF as Lt,aG as Zt,av as Ft,au as Xt}from"./index.26cfbce9.js";const A=[-61,9,38,199,426,686,756,818,1111,1181,1210,1635,2060,2097,2192,2262,2324,2394,2456,3178];function zt(e,i,l){return Object.prototype.toString.call(e)==="[object Date]"&&(l=e.getDate(),i=e.getMonth()+1,e=e.getFullYear()),$t(He(e,i,l))}function $e(e,i,l){return tt(Et(e,i,l))}function Bt(e){return Vt(e)===0}function de(e,i){return i<=6?31:i<=11||Bt(e)?30:29}function Vt(e){const i=A.length;let l=A[0],s,h,o,D,r;if(e<l||e>=A[i-1])throw new Error("Invalid Jalaali year "+e);for(r=1;r<i&&(s=A[r],h=s-l,!(e<s));r+=1)l=s;return D=e-l,h-D<6&&(D=D-h+Y(h+4,33)*33),o=O(O(D+1,33)-1,4),o===-1&&(o=4),o}function et(e,i){const l=A.length,s=e+621;let h=-14,o=A[0],D,r,f,b,d;if(e<o||e>=A[l-1])throw new Error("Invalid Jalaali year "+e);for(d=1;d<l&&(D=A[d],r=D-o,!(e<D));d+=1)h=h+Y(r,33)*8+Y(O(r,33),4),o=D;b=e-o,h=h+Y(b,33)*8+Y(O(b,33)+3,4),O(r,33)===4&&r-b===4&&(h+=1);const w=Y(s,4)-Y((Y(s,100)+1)*3,4)-150,Z=20+h-w;return i||(r-b<6&&(b=b-r+Y(r+4,33)*33),f=O(O(b+1,33)-1,4),f===-1&&(f=4)),{leap:f,gy:s,march:Z}}function Et(e,i,l){const s=et(e,!0);return He(s.gy,3,s.march)+(i-1)*31-Y(i,7)*(i-7)+l-1}function $t(e){const i=tt(e).gy;let l=i-621,s,h,o;const D=et(l,!1),r=He(i,3,D.march);if(o=e-r,o>=0){if(o<=185)return h=1+Y(o,31),s=O(o,31)+1,{jy:l,jm:h,jd:s};o-=186}else l-=1,o+=179,D.leap===1&&(o+=1);return h=7+Y(o,30),s=O(o,30)+1,{jy:l,jm:h,jd:s}}function He(e,i,l){let s=Y((e+Y(i-8,6)+100100)*1461,4)+Y(153*O(i+9,12)+2,5)+l-34840408;return s=s-Y(Y(e+100100+Y(i-8,6),100)*3,4)+752,s}function tt(e){let i=4*e+139361631;i=i+Y(Y(4*e+183187720,146097)*3,4)*4-3908;const l=Y(O(i,1461),4)*5+308,s=Y(O(l,153),5)+1,h=O(Y(l,153),12)+1;return{gy:Y(i,1461)-100100+Y(8-h,6),gm:h,gd:s}}function Y(e,i){return~~(e/i)}function O(e,i){return e-~~(e/i)*i}const nt=864e5,At=36e5,be=6e4,at="YYYY-MM-DDTHH:mm:ss.SSSZ",Qt=/\[((?:[^\]\\]|\\]|\\)*)\]|d{1,4}|M{1,4}|m{1,2}|w{1,2}|Qo|Do|D{1,4}|YY(?:YY)?|H{1,2}|h{1,2}|s{1,2}|S{1,3}|Z{1,2}|a{1,2}|[AQExX]/g,Pt=/(\[[^\]]*\])|d{1,4}|M{1,4}|m{1,2}|w{1,2}|Qo|Do|D{1,4}|YY(?:YY)?|H{1,2}|h{1,2}|s{1,2}|S{1,3}|Z{1,2}|a{1,2}|[AQExX]|([.*+:?^,\s${}()|\\]+)/g,Se={};function Wt(e,i){const l="("+i.days.join("|")+")",s=e+l;if(Se[s]!==void 0)return Se[s];const h="("+i.daysShort.join("|")+")",o="("+i.months.join("|")+")",D="("+i.monthsShort.join("|")+")",r={};let f=0;const b=e.replace(Pt,w=>{switch(f++,w){case"YY":return r.YY=f,"(-?\\d{1,2})";case"YYYY":return r.YYYY=f,"(-?\\d{1,4})";case"M":return r.M=f,"(\\d{1,2})";case"MM":return r.M=f,"(\\d{2})";case"MMM":return r.MMM=f,D;case"MMMM":return r.MMMM=f,o;case"D":return r.D=f,"(\\d{1,2})";case"Do":return r.D=f++,"(\\d{1,2}(st|nd|rd|th))";case"DD":return r.D=f,"(\\d{2})";case"H":return r.H=f,"(\\d{1,2})";case"HH":return r.H=f,"(\\d{2})";case"h":return r.h=f,"(\\d{1,2})";case"hh":return r.h=f,"(\\d{2})";case"m":return r.m=f,"(\\d{1,2})";case"mm":return r.m=f,"(\\d{2})";case"s":return r.s=f,"(\\d{1,2})";case"ss":return r.s=f,"(\\d{2})";case"S":return r.S=f,"(\\d{1})";case"SS":return r.S=f,"(\\d{2})";case"SSS":return r.S=f,"(\\d{3})";case"A":return r.A=f,"(AM|PM)";case"a":return r.a=f,"(am|pm)";case"aa":return r.aa=f,"(a\\.m\\.|p\\.m\\.)";case"ddd":return h;case"dddd":return l;case"Q":case"d":case"E":return"(\\d{1})";case"Qo":return"(1st|2nd|3rd|4th)";case"DDD":case"DDDD":return"(\\d{1,3})";case"w":return"(\\d{1,2})";case"ww":return"(\\d{2})";case"Z":return r.Z=f,"(Z|[+-]\\d{2}:\\d{2})";case"ZZ":return r.ZZ=f,"(Z|[+-]\\d{2}\\d{2})";case"X":return r.X=f,"(-?\\d+)";case"x":return r.x=f,"(-?\\d{4,})";default:return f--,w[0]==="["&&(w=w.substring(1,w.length-1)),w.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}}),d={map:r,regex:new RegExp("^"+b)};return Se[s]=d,d}function it(e,i){return e!==void 0?e:i!==void 0?i.date:bt.date}function Ae(e,i=""){const l=e>0?"-":"+",s=Math.abs(e),h=Math.floor(s/60),o=s%60;return l+M(h)+i+M(o)}function Jt(e,i,l,s,h){const o={year:null,month:null,day:null,hour:null,minute:null,second:null,millisecond:null,timezoneOffset:null,dateHash:null,timeHash:null};if(h!==void 0&&Object.assign(o,h),e==null||e===""||typeof e!="string")return o;i===void 0&&(i=at);const D=it(l,Ge.props),r=D.months,f=D.monthsShort,{regex:b,map:d}=Wt(i,D),w=e.match(b);if(w===null)return o;let Z="";if(d.X!==void 0||d.x!==void 0){const k=parseInt(w[d.X!==void 0?d.X:d.x],10);if(isNaN(k)===!0||k<0)return o;const j=new Date(k*(d.X!==void 0?1e3:1));o.year=j.getFullYear(),o.month=j.getMonth()+1,o.day=j.getDate(),o.hour=j.getHours(),o.minute=j.getMinutes(),o.second=j.getSeconds(),o.millisecond=j.getMilliseconds()}else{if(d.YYYY!==void 0)o.year=parseInt(w[d.YYYY],10);else if(d.YY!==void 0){const k=parseInt(w[d.YY],10);o.year=k<0?k:2e3+k}if(d.M!==void 0){if(o.month=parseInt(w[d.M],10),o.month<1||o.month>12)return o}else d.MMM!==void 0?o.month=f.indexOf(w[d.MMM])+1:d.MMMM!==void 0&&(o.month=r.indexOf(w[d.MMMM])+1);if(d.D!==void 0){if(o.day=parseInt(w[d.D],10),o.year===null||o.month===null||o.day<1)return o;const k=s!=="persian"?new Date(o.year,o.month,0).getDate():de(o.year,o.month);if(o.day>k)return o}d.H!==void 0?o.hour=parseInt(w[d.H],10)%24:d.h!==void 0&&(o.hour=parseInt(w[d.h],10)%12,(d.A&&w[d.A]==="PM"||d.a&&w[d.a]==="pm"||d.aa&&w[d.aa]==="p.m.")&&(o.hour+=12),o.hour=o.hour%24),d.m!==void 0&&(o.minute=parseInt(w[d.m],10)%60),d.s!==void 0&&(o.second=parseInt(w[d.s],10)%60),d.S!==void 0&&(o.millisecond=parseInt(w[d.S],10)*10**(3-w[d.S].length)),(d.Z!==void 0||d.ZZ!==void 0)&&(Z=d.Z!==void 0?w[d.Z].replace(":",""):w[d.ZZ],o.timezoneOffset=(Z[0]==="+"?-1:1)*(60*Z.slice(1,3)+1*Z.slice(3,5)))}return o.dateHash=M(o.year,6)+"/"+M(o.month)+"/"+M(o.day),o.timeHash=M(o.hour)+":"+M(o.minute)+":"+M(o.second)+Z,o}function Qe(e){const i=new Date(e.getFullYear(),e.getMonth(),e.getDate());i.setDate(i.getDate()-(i.getDay()+6)%7+3);const l=new Date(i.getFullYear(),0,4);l.setDate(l.getDate()-(l.getDay()+6)%7+3);const s=i.getTimezoneOffset()-l.getTimezoneOffset();i.setHours(i.getHours()-s);const h=(i-l)/(nt*7);return 1+Math.floor(h)}function B(e,i,l){const s=new Date(e),h=`set${l===!0?"UTC":""}`;switch(i){case"year":case"years":s[`${h}Month`](0);case"month":case"months":s[`${h}Date`](1);case"day":case"days":case"date":s[`${h}Hours`](0);case"hour":case"hours":s[`${h}Minutes`](0);case"minute":case"minutes":s[`${h}Seconds`](0);case"second":case"seconds":s[`${h}Milliseconds`](0)}return s}function he(e,i,l){return(e.getTime()-e.getTimezoneOffset()*be-(i.getTime()-i.getTimezoneOffset()*be))/l}function ot(e,i,l="days"){const s=new Date(e),h=new Date(i);switch(l){case"years":case"year":return s.getFullYear()-h.getFullYear();case"months":case"month":return(s.getFullYear()-h.getFullYear())*12+s.getMonth()-h.getMonth();case"days":case"day":case"date":return he(B(s,"day"),B(h,"day"),nt);case"hours":case"hour":return he(B(s,"hour"),B(h,"hour"),At);case"minutes":case"minute":return he(B(s,"minute"),B(h,"minute"),be);case"seconds":case"second":return he(B(s,"second"),B(h,"second"),1e3)}}function Pe(e){return ot(e,B(e,"year"),"days")+1}function We(e){if(e>=11&&e<=13)return`${e}th`;switch(e%10){case 1:return`${e}st`;case 2:return`${e}nd`;case 3:return`${e}rd`}return`${e}th`}const Je={YY(e,i,l){const s=this.YYYY(e,i,l)%100;return s>=0?M(s):"-"+M(Math.abs(s))},YYYY(e,i,l){return l!=null?l:e.getFullYear()},M(e){return e.getMonth()+1},MM(e){return M(e.getMonth()+1)},MMM(e,i){return i.monthsShort[e.getMonth()]},MMMM(e,i){return i.months[e.getMonth()]},Q(e){return Math.ceil((e.getMonth()+1)/3)},Qo(e){return We(this.Q(e))},D(e){return e.getDate()},Do(e){return We(e.getDate())},DD(e){return M(e.getDate())},DDD(e){return Pe(e)},DDDD(e){return M(Pe(e),3)},d(e){return e.getDay()},dd(e,i){return this.dddd(e,i).slice(0,2)},ddd(e,i){return i.daysShort[e.getDay()]},dddd(e,i){return i.days[e.getDay()]},E(e){return e.getDay()||7},w(e){return Qe(e)},ww(e){return M(Qe(e))},H(e){return e.getHours()},HH(e){return M(e.getHours())},h(e){const i=e.getHours();return i===0?12:i>12?i%12:i},hh(e){return M(this.h(e))},m(e){return e.getMinutes()},mm(e){return M(e.getMinutes())},s(e){return e.getSeconds()},ss(e){return M(e.getSeconds())},S(e){return Math.floor(e.getMilliseconds()/100)},SS(e){return M(Math.floor(e.getMilliseconds()/10))},SSS(e){return M(e.getMilliseconds(),3)},A(e){return this.H(e)<12?"AM":"PM"},a(e){return this.H(e)<12?"am":"pm"},aa(e){return this.H(e)<12?"a.m.":"p.m."},Z(e,i,l,s){const h=s==null?e.getTimezoneOffset():s;return Ae(h,":")},ZZ(e,i,l,s){const h=s==null?e.getTimezoneOffset():s;return Ae(h)},X(e){return Math.floor(e.getTime()/1e3)},x(e){return e.getTime()}};function Rt(e,i,l,s,h){if(e!==0&&!e||e===1/0||e===-1/0)return;const o=new Date(e);if(isNaN(o))return;i===void 0&&(i=at);const D=it(l,Ge.props);return i.replace(Qt,(r,f)=>r in Je?Je[r](o,D,s,h):f===void 0?r:f.split("\\]").join("]"))}var an={counties:["Taipei City","Keelung City","New Taipei City","Yilan County","Taoyuan City","Hsinchu City","Hsinchu County","Miaoli County","Taichung City","Changhua County","Nantou County","Chiayi City","Chiayi County","Yunlin County","Tainan City","Kaohsiung City","Penghu County","Kinmen County","Pingtung County","Taitung County","Hualien County","Lienchiang County"],districts:[[["Zhongzheng District","Datong District","Zhongshan District","Songshan District","Da\u2019an District","Wanhua District","Xinyi District","Shilin District","Beitou District","Neihu District","Nangang District","Wenshan District"],["100","103","104","105","106","108","110","111","112","114","115","116"]],[["Ren\u2019ai District","Xinyi District","Zhongzheng District","Zhongshan District","Anle District","Nuannuan District","Qidu District"],["200","201","202","203","204","205","206"]],[["Wanli District","Jinshan District","Banqiao District","Xizhi District","Shenkeng District","Shiding District","Ruifang District","Pingxi District","Shuangxi District","Gongliao District","Xindian District","Pinglin District","Wulai District","Yonghe District","Zhonghe District","Tucheng District","Sanxia District","Shulin District","Yingge District","Sanchong District","Xinzhuang District","Taishan District","Linkou District","LuzhouDistrict","Wugu District","Bali District","Tamsui District","Sanzhi District","Shimen District"],["207","208","220","221","222","223","224","226","227","228","231","232","233","234","235","236","237","238","239","241","242","243","244","247","248","249","251","252","253"]],[["Yilan City","Toucheng Township","Jiaoxi Township","Zhuangwei Township","Yuanshan Township","Luodong Township","Sanxing Township","Datong Township","Wujie Township","Dongshan Township","Su\u2019ao Township","Nan\u2019ao Township","Diauyutai"],["260","261","262","263","264","265","266","267","268","269","270","272","290"]],[["Zhongli District","Pingzhen District","Longtan District","Yangmei District","Xinwu District","Guanyin District","Taoyuan District","Guishan District","Bade District","Daxi District","Fuxing District","Dayuan District","Luzhu District"],["320","324","325","326","327","328","330","333","334","335","336","337","338"]],[["East District","North District","Xiangshan District"],["300","300","300"]],[["Zhubei City","Hukou Township","Xinfeng Township","Xinpu Township","Guanxi Township","Qionglin Township","Baoshan Township","Zhudong Township","Wufeng Township","Hengshan Township","Jianshi Township","Beipu Township","Emei Township"],["302","303","304","305","306","307","308","310","311","312","313","314","315"]],[["Zhunan Township","Toufen Township","Sanwan Township","Nanzhuang Township","Shitan Township","Houlong Township","Tongxiao Township","Yuanli Township","Miaoli City","Zaoqiao Township","Touwu Township","Gongguan Township","Dahu Township","Tai\u2019an Township","Tongluo Township","Sanyi Township","Xihu Township","Zhuolan Township"],["350","351","352","353","354","356","357","358","360","361","362","363","364","365","366","367","368","369"]],[["Central District","East District","South District","West District","North District","Beitun District","Xitun District","Nantun District","Taiping District","Dali District","Wufeng District","Wuri District","Fengyuan District","Houli District","Shigang District","Dongshi District","Heping District","Xinshe District","Tanzi District","Daya District","Shengang District","Dadu District","ShaluDistrict","Longjing District","Wuqi District","Qingshui District","Dajia District","Waipu District","Da\u2019an District"],["400","401","402","403","404","406","407","408","411","412","413","414","420","421","422","423","424","426","427","428","429","432","433","434","435","436","437","438","439"]],[["Changhua City","Fenyuan Township","Huatan Township","Xiushui Township","Lukang Township","Fuxing Township","Xianxi Township","Hemei Township","Shengang Township","Yuanlin Township","Shetou Township","Yongjing Township","Puxin Township","Xihu Township","Dacun Township","Puyan Township","Tianzhong Township","Beidou Township","Tianwei Township","Pitou Township","Xizhou Township","Zhutang Township","Erlin Township","Dacheng Township","Fangyuan Township","Ershui Township"],["500","502","503","504","505","506","507","508","509","510","511","512","513","514","515","516","520","521","522","523","524","525","526","527","528","530"]],[["Nantou City","Zhongliao Township","Caotun Township","Guoxing Township","Puli Township","Ren\u2019ai Township","Mingjian Township","Jiji Township","Shuili Township","Yuchi Township","Xinyi Township","Zhushan Township","Lugu Township"],["540","541","542","544","545","546","551","552","553","555","556","557","558"]],[["East District","West District"],["600","600"]],[["FanluTownship","Meishan Township","Zhuqi Township","Alishan Township","Zhongpu Township","Dapu Township","Shuishang Township","Lucao Township","Taibao City","Puzi City","Dongshi Township","Liujiao Township","Xingang Township","Minxiong Township","Dalin Township","Xikou Township","Yizhu Township","Budai Township"],["602","603","604","605","606","607","608","611","612","613","614","615","616","621","622","623","624","625"]],[["Dounan Township","Dapi Township","Huwei Township","Tuku Township","Baozhong Township","Dongshi Township","Taixi Township","Lunbei Township","Mailiao Township","Douliu City","Linnei Township","Gukeng Township","Citong Township","Xiluo Township","Erlun Township","Beigang Township","Shuilin Township","Kouhu Township","Sihu Township","Yuanchang Township"],["630","631","632","633","634","635","636","637","638","640","643","646","647","648","649","651","652","653","654","655"]],[["West Central District","East District","South District","North District","Anping District","Annan District","Yongkang District","Guiren District","Xinhua District","Zuozhen District","Yujing District","Nanxi District","Nanhua District","Rende District","Guanmiao District","Longqi District","Guantian District","Madou District","Jiali District","Xigang District","Qigu District","Jiangjun District","Xuejia District","Beimen District","Xinying District","Houbi District","Baihe District","Dongshan District","Liujia District","Xiaying District","Liuying District","Yanshui District","Shanhua District","Danei District","Shanshang District","Xinshi District","Anding District"],["700","701","702","704","708","709","710","711","712","713","714","715","716","717","718","719","720","721","722","723","724","725","726","727","730","731","732","733","734","735","736","737","741","742","743","744","745"]],[["Xinxing District","Qianjin District","Lingya District","Yancheng District","Gushan District","Qijin District","Qianzhen District","Sanmin District","Nanzi District","Xiaogang District","Zuoying District","Renwu District","Dashe District","Dongsha Islands","Nansha Islands","Gangshan District","Luzhu District","Alian District","Tianliao District","Yanchao District","Qiaotou District","Ziguan District","Mituo District","Yong\u2019an District","Hunei District","Fengshan District","Daliao District","Linyuan District","Niaosong District","Dashu District","Qishan District","Meinong District","Liugui District","Neimen District","Shanlin District","Jiaxian District","Taoyuan District","Namaxia District","Maolin District","Qieding District"],["800","801","802","803","804","805","806","807","811","812","813","814","815","817","819","820","821","822","823","824","825","826","827","828","829","830","831","832","833","840","842","843","844","845","846","847","848","849","851","852"]],[["Magong City","Xiyu Township","Wang\u2019an Township","Qimei Township","Baisha Township","Huxi Township"],["880","881","882","883","884","885"]],[["Jinsha Township","Jinhu Township","Jinning Township","Jincheng Township","Lieyu Township","Wuqiu Township"],["890","891","892","893","894","896"]],[["Pingtung City","Sandimen Township","Wutai Township","Majia Township","Jiuru Township","Ligang Township","Gaoshu Township","Yanpu Township","Changzhi Township","Linluo Township","Zhutian Township","Neipu Township","Wandan Township","Chaozhou Township","Taiwu Township","Laiyi Township","Wanluan Township","Kanding Township","Xinpi Township","Nanzhou Township","Linbian Township","Donggang Township","Liuqiu Township","Jiadong Township","Xinyuan Township","Fangliao Township","Fangshan Township","Chunri Township","Shizi Township","Checheng Township","Mudan Township","Hengchun Township","Manzhou Township"],["900","901","902","903","904","905","906","907","908","909","911","912","913","920","921","922","923","924","925","926","927","928","929","931","932","940","941","942","943","944","945","946","947"]],[["Taitung City","Ludao Township","Lanyu Township","Yanping Township","Beinan Township","Luye Township","Guanshan Township","Haiduan Township","Chishang Township","Donghe Township","Chenggong Township","Changbin Township","Taimali Township","Jinfeng Township","Dawu Township","Daren Township"],["950","951","952","953","954","955","956","957","958","959","961","962","963","964","965","966"]],[["Hualien City","Xincheng Township","Xiulin Township","Ji\u2019an Township","Shoufeng Township","Fenglin Township","Guangfu Township","Fengbin Township","Ruisui Township","Wanrong Township","Yuli Township","Zhuoxi Township","Fuli Township"],["970","971","972","973","974","975","976","977","978","979","981","982","983"]],[["Nangan Township","Beigan Township","Juguang Township","Dongyin Township"],["209","210","211","212"]]]};const Gt=["gregorian","persian"],Kt={modelValue:{required:!0},mask:{type:String},locale:Object,calendar:{type:String,validator:e=>Gt.includes(e),default:"gregorian"},landscape:Boolean,color:String,textColor:String,square:Boolean,flat:Boolean,bordered:Boolean,readonly:Boolean,disable:Boolean},Ut=["update:modelValue"];function E(e){return e.year+"/"+M(e.month)+"/"+M(e.day)}function en(e,i){const l=y(()=>e.disable!==!0&&e.readonly!==!0),s=y(()=>e.editable===!0?0:-1),h=y(()=>{const r=[];return e.color!==void 0&&r.push(`bg-${e.color}`),e.textColor!==void 0&&r.push(`text-${e.textColor}`),r.join(" ")});function o(){return e.locale!==void 0?{...i.lang.date,...e.locale}:i.lang.date}function D(r){const f=new Date,b=r===!0?null:0;if(e.calendar==="persian"){const d=zt(f);return{year:d.jy,month:d.jm,day:d.jd}}return{year:f.getFullYear(),month:f.getMonth()+1,day:f.getDate(),hour:b,minute:b,second:b,millisecond:b}}return{editable:l,tabindex:s,headerClass:h,getLocale:o,getCurrentDate:D}}const W=20,tn=["Calendar","Years","Months"],Re=e=>tn.includes(e),xe=e=>/^-?[\d]+\/[0-1]\d$/.test(e),ee=" \u2014 ";function $(e){return e.year+"/"+M(e.month)}var on=Ke({name:"QDate",props:{...Kt,...Ht,..._t,multiple:Boolean,range:Boolean,title:String,subtitle:String,mask:{default:"YYYY/MM/DD"},defaultYearMonth:{type:String,validator:xe},yearsInMonthView:Boolean,events:[Array,Function],eventColor:[String,Function],emitImmediately:Boolean,options:[Array,Function],navigationMinYearMonth:{type:String,validator:xe},navigationMaxYearMonth:{type:String,validator:xe},noUnset:Boolean,firstDayOfWeek:[String,Number],todayBtn:Boolean,minimal:Boolean,defaultView:{type:String,default:"Calendar",validator:Re}},emits:[...Ut,"range-start","range-end","navigation"],setup(e,{slots:i,emit:l}){const{proxy:s}=Ue(),{$q:h}=s,o=qt(e,h),{getCache:D}=Nt(),{tabindex:r,headerClass:f,getLocale:b,getCurrentDate:d}=en(e,h);let w;const Z=kt(e),k=Ot(Z),j=L(null),C=L(Le()),S=L(b()),rt=y(()=>Le()),st=y(()=>b()),X=y(()=>d()),m=L(Ze(C.value,S.value)),I=L(e.defaultView),_e=h.lang.rtl===!0?"right":"left",ie=L(_e.value),ve=L(_e.value),fe=m.value.year,oe=L(fe-fe%W-(fe<0?W:0)),H=L(null),ut=y(()=>{const t=e.landscape===!0?"landscape":"portrait";return`q-date q-date--${t} q-date--${t}-${e.minimal===!0?"minimal":"standard"}`+(o.value===!0?" q-date--dark q-dark":"")+(e.bordered===!0?" q-date--bordered":"")+(e.square===!0?" q-date--square no-border-radius":"")+(e.flat===!0?" q-date--flat no-shadow":"")+(e.disable===!0?" disabled":e.readonly===!0?" q-date--readonly":"")}),Q=y(()=>e.color||"primary"),R=y(()=>e.textColor||"white"),re=y(()=>e.emitImmediately===!0&&e.multiple!==!0&&e.range!==!0),ge=y(()=>Array.isArray(e.modelValue)===!0?e.modelValue:e.modelValue!==null&&e.modelValue!==void 0?[e.modelValue]:[]),F=y(()=>ge.value.filter(t=>typeof t=="string").map(t=>we(t,C.value,S.value)).filter(t=>t.dateHash!==null&&t.day!==null&&t.month!==null&&t.year!==null)),G=y(()=>{const t=n=>we(n,C.value,S.value);return ge.value.filter(n=>jt(n)===!0&&n.from!==void 0&&n.to!==void 0).map(n=>({from:t(n.from),to:t(n.to)})).filter(n=>n.from.dateHash!==null&&n.to.dateHash!==null&&n.from.dateHash<n.to.dateHash)}),se=y(()=>e.calendar!=="persian"?t=>new Date(t.year,t.month-1,t.day):t=>{const n=$e(t.year,t.month,t.day);return new Date(n.gy,n.gm-1,n.gd)}),me=y(()=>e.calendar==="persian"?E:(t,n,a)=>Rt(new Date(t.year,t.month-1,t.day,t.hour,t.minute,t.second,t.millisecond),n===void 0?C.value:n,a===void 0?S.value:a,t.year,t.timezoneOffset)),te=y(()=>F.value.length+G.value.reduce((t,n)=>t+1+ot(se.value(n.to),se.value(n.from)),0)),qe=y(()=>{if(e.title!==void 0&&e.title!==null&&e.title.length>0)return e.title;if(H.value!==null){const a=H.value.init,c=se.value(a);return S.value.daysShort[c.getDay()]+", "+S.value.monthsShort[a.month-1]+" "+a.day+ee+"?"}if(te.value===0)return ee;if(te.value>1)return`${te.value} ${S.value.pluralDay}`;const t=F.value[0],n=se.value(t);return isNaN(n.valueOf())===!0?ee:S.value.headerTitle!==void 0?S.value.headerTitle(n,t):S.value.daysShort[n.getDay()]+", "+S.value.monthsShort[t.month-1]+" "+t.day}),lt=y(()=>F.value.concat(G.value.map(n=>n.from)).sort((n,a)=>n.year-a.year||n.month-a.month)[0]),ct=y(()=>F.value.concat(G.value.map(n=>n.to)).sort((n,a)=>a.year-n.year||a.month-n.month)[0]),ke=y(()=>{if(e.subtitle!==void 0&&e.subtitle!==null&&e.subtitle.length>0)return e.subtitle;if(te.value===0)return ee;if(te.value>1){const t=lt.value,n=ct.value,a=S.value.monthsShort;return a[t.month-1]+(t.year!==n.year?" "+t.year+ee+a[n.month-1]+" ":t.month!==n.month?ee+a[n.month-1]:"")+" "+n.year}return F.value[0].year}),ue=y(()=>{const t=[h.iconSet.datetime.arrowLeft,h.iconSet.datetime.arrowRight];return h.lang.rtl===!0?t.reverse():t}),je=y(()=>e.firstDayOfWeek!==void 0?Number(e.firstDayOfWeek):S.value.firstDayOfWeek),ht=y(()=>{const t=S.value.daysShort,n=je.value;return n>0?t.slice(n,7).concat(t.slice(0,n)):t}),V=y(()=>{const t=m.value;return e.calendar!=="persian"?new Date(t.year,t.month,0).getDate():de(t.year,t.month)}),dt=y(()=>typeof e.eventColor=="function"?e.eventColor:()=>e.eventColor),_=y(()=>{if(e.navigationMinYearMonth===void 0)return null;const t=e.navigationMinYearMonth.split("/");return{year:parseInt(t[0],10),month:parseInt(t[1],10)}}),q=y(()=>{if(e.navigationMaxYearMonth===void 0)return null;const t=e.navigationMaxYearMonth.split("/");return{year:parseInt(t[0],10),month:parseInt(t[1],10)}}),De=y(()=>{const t={month:{prev:!0,next:!0},year:{prev:!0,next:!0}};return _.value!==null&&_.value.year>=m.value.year&&(t.year.prev=!1,_.value.year===m.value.year&&_.value.month>=m.value.month&&(t.month.prev=!1)),q.value!==null&&q.value.year<=m.value.year&&(t.year.next=!1,q.value.year===m.value.year&&q.value.month<=m.value.month&&(t.month.next=!1)),t}),le=y(()=>{const t={};return F.value.forEach(n=>{const a=$(n);t[a]===void 0&&(t[a]=[]),t[a].push(n.day)}),t}),Ie=y(()=>{const t={};return G.value.forEach(n=>{const a=$(n.from),c=$(n.to);if(t[a]===void 0&&(t[a]=[]),t[a].push({from:n.from.day,to:a===c?n.to.day:void 0,range:n}),a<c){let u;const{year:p,month:v}=n.from,T=v<12?{year:p,month:v+1}:{year:p+1,month:1};for(;(u=$(T))<=c;)t[u]===void 0&&(t[u]=[]),t[u].push({from:void 0,to:u===c?n.to.day:void 0,range:n}),T.month++,T.month>12&&(T.year++,T.month=1)}}),t}),ne=y(()=>{if(H.value===null)return;const{init:t,initHash:n,final:a,finalHash:c}=H.value,[u,p]=n<=c?[t,a]:[a,t],v=$(u),T=$(p);if(v!==N.value&&T!==N.value)return;const x={};return v===N.value?(x.from=u.day,x.includeFrom=!0):x.from=1,T===N.value?(x.to=p.day,x.includeTo=!0):x.to=V.value,x}),N=y(()=>$(m.value)),vt=y(()=>{const t={};if(e.options===void 0){for(let a=1;a<=V.value;a++)t[a]=!0;return t}const n=typeof e.options=="function"?e.options:a=>e.options.includes(a);for(let a=1;a<=V.value;a++){const c=N.value+"/"+M(a);t[a]=n(c)}return t}),ft=y(()=>{const t={};if(e.events===void 0)for(let n=1;n<=V.value;n++)t[n]=!1;else{const n=typeof e.events=="function"?e.events:a=>e.events.includes(a);for(let a=1;a<=V.value;a++){const c=N.value+"/"+M(a);t[a]=n(c)===!0&&dt.value(c)}}return t}),gt=y(()=>{let t,n;const{year:a,month:c}=m.value;if(e.calendar!=="persian")t=new Date(a,c-1,1),n=new Date(a,c-1,0).getDate();else{const u=$e(a,c,1);t=new Date(u.gy,u.gm-1,u.gd);let p=c-1,v=a;p===0&&(p=12,v--),n=de(v,p)}return{days:t.getDay()-je.value-1,endDay:n}}),Oe=y(()=>{const t=[],{days:n,endDay:a}=gt.value,c=n<0?n+7:n;if(c<6)for(let v=a-c;v<=a;v++)t.push({i:v,fill:!0});const u=t.length;for(let v=1;v<=V.value;v++){const T={i:v,event:ft.value[v],classes:[]};vt.value[v]===!0&&(T.in=!0,T.flat=!0),t.push(T)}if(le.value[N.value]!==void 0&&le.value[N.value].forEach(v=>{const T=u+v-1;Object.assign(t[T],{selected:!0,unelevated:!0,flat:!1,color:Q.value,textColor:R.value})}),Ie.value[N.value]!==void 0&&Ie.value[N.value].forEach(v=>{if(v.from!==void 0){const T=u+v.from-1,x=u+(v.to||V.value)-1;for(let Ce=T;Ce<=x;Ce++)Object.assign(t[Ce],{range:v.range,unelevated:!0,color:Q.value,textColor:R.value});Object.assign(t[T],{rangeFrom:!0,flat:!1}),v.to!==void 0&&Object.assign(t[x],{rangeTo:!0,flat:!1})}else if(v.to!==void 0){const T=u+v.to-1;for(let x=u;x<=T;x++)Object.assign(t[x],{range:v.range,unelevated:!0,color:Q.value,textColor:R.value});Object.assign(t[T],{flat:!1,rangeTo:!0})}else{const T=u+V.value-1;for(let x=u;x<=T;x++)Object.assign(t[x],{range:v.range,unelevated:!0,color:Q.value,textColor:R.value})}}),ne.value!==void 0){const v=u+ne.value.from-1,T=u+ne.value.to-1;for(let x=v;x<=T;x++)t[x].color=Q.value,t[x].editRange=!0;ne.value.includeFrom===!0&&(t[v].editRangeFrom=!0),ne.value.includeTo===!0&&(t[T].editRangeTo=!0)}m.value.year===X.value.year&&m.value.month===X.value.month&&(t[u+X.value.day-1].today=!0);const p=t.length%7;if(p>0){const v=7-p;for(let T=1;T<=v;T++)t.push({i:T,fill:!0})}return t.forEach(v=>{let T="q-date__calendar-item ";v.fill===!0?T+="q-date__calendar-item--fill":(T+=`q-date__calendar-item--${v.in===!0?"in":"out"}`,v.range!==void 0&&(T+=` q-date__range${v.rangeTo===!0?"-to":v.rangeFrom===!0?"-from":""}`),v.editRange===!0&&(T+=` q-date__edit-range${v.editRangeFrom===!0?"-from":""}${v.editRangeTo===!0?"-to":""}`),(v.range!==void 0||v.editRange===!0)&&(T+=` text-${v.color}`)),v.classes=T}),t}),mt=y(()=>e.disable===!0?{"aria-disabled":"true"}:e.readonly===!0?{"aria-readonly":"true"}:{});J(()=>e.modelValue,t=>{if(w===t)w=0;else{const{year:n,month:a}=Ze(C.value,S.value);K(n,a)}}),J(I,()=>{j.value!==null&&j.value.focus()}),J(()=>m.value.year,t=>{l("navigation",{year:t,month:m.value.month})}),J(()=>m.value.month,t=>{l("navigation",{year:m.value.year,month:t})}),J(rt,t=>{Ve(t,S.value,"mask"),C.value=t}),J(st,t=>{Ve(C.value,t,"locale"),S.value=t});function Ne(){const t=X.value,n=le.value[$(t)];(n===void 0||n.includes(t.day)===!1)&&pe(t),ye(t.year,t.month)}function Dt(t){Re(t)===!0&&(I.value=t)}function yt(t,n){["month","year"].includes(t)&&(t==="month"?Xe:Te)(n===!0?-1:1)}function ye(t,n){I.value="Calendar",K(t,n)}function wt(t,n){if(e.range===!1||!t){H.value=null;return}const a=Object.assign({...m.value},t),c=n!==void 0?Object.assign({...m.value},n):a;H.value={init:a,initHash:E(a),final:c,finalHash:E(c)},ye(a.year,a.month)}function Le(){return e.calendar==="persian"?"YYYY/MM/DD":e.mask}function we(t,n,a){return Jt(t,n,a,e.calendar,{hour:0,minute:0,second:0,millisecond:0})}function Ze(t,n){const a=Array.isArray(e.modelValue)===!0?e.modelValue:e.modelValue?[e.modelValue]:[];if(a.length===0)return Fe();const c=a[a.length-1],u=we(c.from!==void 0?c.from:c,t,n);return u.dateHash===null?Fe():u}function Fe(){let t,n;if(e.defaultYearMonth!==void 0){const a=e.defaultYearMonth.split("/");t=parseInt(a[0],10),n=parseInt(a[1],10)}else{const a=X.value!==void 0?X.value:d();t=a.year,n=a.month}return{year:t,month:n,day:1,hour:0,minute:0,second:0,millisecond:0,dateHash:t+"/"+M(n)+"/01"}}function Xe(t){let n=m.value.year,a=Number(m.value.month)+t;a===13?(a=1,n++):a===0&&(a=12,n--),K(n,a),re.value===!0&&ce("month")}function Te(t){const n=Number(m.value.year)+t;K(n,m.value.month),re.value===!0&&ce("year")}function Tt(t){K(t,m.value.month),I.value=e.defaultView==="Years"?"Months":"Calendar",re.value===!0&&ce("year")}function pt(t){K(m.value.year,t),I.value="Calendar",re.value===!0&&ce("month")}function Mt(t,n){const a=le.value[n];(a!==void 0&&a.includes(t.day)===!0?Me:pe)(t)}function P(t){return{year:t.year,month:t.month,day:t.day}}function K(t,n){_.value!==null&&t<=_.value.year&&(t=_.value.year,n<_.value.month&&(n=_.value.month)),q.value!==null&&t>=q.value.year&&(t=q.value.year,n>q.value.month&&(n=q.value.month));const a=t+"/"+M(n)+"/01";a!==m.value.dateHash&&(ie.value=m.value.dateHash<a==(h.lang.rtl!==!0)?"left":"right",t!==m.value.year&&(ve.value=ie.value),Ee(()=>{oe.value=t-t%W-(t<0?W:0),Object.assign(m.value,{year:t,month:n,day:1,dateHash:a})}))}function ze(t,n,a){const c=t!==null&&t.length===1&&e.multiple===!1?t[0]:t;w=c;const{reason:u,details:p}=Be(n,a);l("update:modelValue",c,u,p)}function ce(t){const n=F.value[0]!==void 0&&F.value[0].dateHash!==null?{...F.value[0]}:{...m.value};Ee(()=>{n.year=m.value.year,n.month=m.value.month;const a=e.calendar!=="persian"?new Date(n.year,n.month,0).getDate():de(n.year,n.month);n.day=Math.min(Math.max(1,n.day),a);const c=U(n);w=c;const{details:u}=Be("",n);l("update:modelValue",c,t,u)})}function Be(t,n){return n.from!==void 0?{reason:`${t}-range`,details:{...P(n.target),from:P(n.from),to:P(n.to)}}:{reason:`${t}-day`,details:P(n)}}function U(t,n,a){return t.from!==void 0?{from:me.value(t.from,n,a),to:me.value(t.to,n,a)}:me.value(t,n,a)}function pe(t){let n;if(e.multiple===!0)if(t.from!==void 0){const a=E(t.from),c=E(t.to),u=F.value.filter(v=>v.dateHash<a||v.dateHash>c),p=G.value.filter(({from:v,to:T})=>T.dateHash<a||v.dateHash>c);n=u.concat(p).concat(t).map(v=>U(v))}else{const a=ge.value.slice();a.push(U(t)),n=a}else n=U(t);ze(n,"add",t)}function Me(t){if(e.noUnset===!0)return;let n=null;if(e.multiple===!0&&Array.isArray(e.modelValue)===!0){const a=U(t);t.from!==void 0?n=e.modelValue.filter(c=>c.from!==void 0?c.from!==a.from&&c.to!==a.to:!0):n=e.modelValue.filter(c=>c!==a),n.length===0&&(n=null)}ze(n,"remove",t)}function Ve(t,n,a){const c=F.value.concat(G.value).map(u=>U(u,t,n)).filter(u=>u.from!==void 0?u.from.dateHash!==null&&u.to.dateHash!==null:u.dateHash!==null);l("update:modelValue",(e.multiple===!0?c:c[0])||null,a)}Object.assign(s,{setToday:Ne,setView:Dt,offsetCalendar:yt,setCalendarTo:ye,setEditingRange:wt});function Yt(){if(e.minimal!==!0)return g("div",{class:"q-date__header "+f.value},[g("div",{class:"relative-position"},[g(ae,{name:"q-transition--fade"},()=>g("div",{key:"h-yr-"+ke.value,class:"q-date__header-subtitle q-date__header-link "+(I.value==="Years"?"q-date__header-link--active":"cursor-pointer"),tabindex:r.value,...D("vY",{onClick(){I.value="Years"},onKeyup(t){t.keyCode===13&&(I.value="Years")}})},[ke.value]))]),g("div",{class:"q-date__header-title relative-position flex no-wrap"},[g("div",{class:"relative-position col"},[g(ae,{name:"q-transition--fade"},()=>g("div",{key:"h-sub"+qe.value,class:"q-date__header-title-label q-date__header-link "+(I.value==="Calendar"?"q-date__header-link--active":"cursor-pointer"),tabindex:r.value,...D("vC",{onClick(){I.value="Calendar"},onKeyup(t){t.keyCode===13&&(I.value="Calendar")}})},[qe.value]))]),e.todayBtn===!0?g(z,{class:"q-date__header-today self-start",icon:h.iconSet.datetime.today,flat:!0,size:"sm",round:!0,tabindex:r.value,onClick:Ne}):null])])}function Ye({label:t,type:n,key:a,dir:c,goTo:u,boundaries:p,cls:v}){return[g("div",{class:"row items-center q-date__arrow"},[g(z,{round:!0,dense:!0,size:"sm",flat:!0,icon:ue.value[0],tabindex:r.value,disable:p.prev===!1,...D("go-#"+n,{onClick(){u(-1)}})})]),g("div",{class:"relative-position overflow-hidden flex flex-center"+v},[g(ae,{name:"q-transition--jump-"+c},()=>g("div",{key:a},[g(z,{flat:!0,dense:!0,noCaps:!0,label:t,tabindex:r.value,...D("view#"+n,{onClick:()=>{I.value=n}})})]))]),g("div",{class:"row items-center q-date__arrow"},[g(z,{round:!0,dense:!0,size:"sm",flat:!0,icon:ue.value[1],tabindex:r.value,disable:p.next===!1,...D("go+#"+n,{onClick(){u(1)}})})])]}const Ct={Calendar:()=>[g("div",{key:"calendar-view",class:"q-date__view q-date__calendar"},[g("div",{class:"q-date__navigation row items-center no-wrap"},Ye({label:S.value.months[m.value.month-1],type:"Months",key:m.value.month,dir:ie.value,goTo:Xe,boundaries:De.value.month,cls:" col"}).concat(Ye({label:m.value.year,type:"Years",key:m.value.year,dir:ve.value,goTo:Te,boundaries:De.value.year,cls:""}))),g("div",{class:"q-date__calendar-weekdays row items-center no-wrap"},ht.value.map(t=>g("div",{class:"q-date__calendar-item"},[g("div",t)]))),g("div",{class:"q-date__calendar-days-container relative-position overflow-hidden"},[g(ae,{name:"q-transition--slide-"+ie.value},()=>g("div",{key:N.value,class:"q-date__calendar-days fit"},Oe.value.map(t=>g("div",{class:t.classes},[t.in===!0?g(z,{class:t.today===!0?"q-date__today":"",dense:!0,flat:t.flat,unelevated:t.unelevated,color:t.color,textColor:t.textColor,label:t.i,tabindex:r.value,...D("day#"+t.i,{onClick:()=>{St(t.i)},onMouseover:()=>{xt(t.i)}})},t.event!==!1?()=>g("div",{class:"q-date__event bg-"+t.event}):null):g("div",""+t.i)]))))])])],Months(){const t=m.value.year===X.value.year,n=c=>_.value!==null&&m.value.year===_.value.year&&_.value.month>c||q.value!==null&&m.value.year===q.value.year&&q.value.month<c,a=S.value.monthsShort.map((c,u)=>{const p=m.value.month===u+1;return g("div",{class:"q-date__months-item flex flex-center"},[g(z,{class:t===!0&&X.value.month===u+1?"q-date__today":null,flat:p!==!0,label:c,unelevated:p,color:p===!0?Q.value:null,textColor:p===!0?R.value:null,tabindex:r.value,disable:n(u+1),...D("month#"+u,{onClick:()=>{pt(u+1)}})})])});return e.yearsInMonthView===!0&&a.unshift(g("div",{class:"row no-wrap full-width"},[Ye({label:m.value.year,type:"Years",key:m.value.year,dir:ve.value,goTo:Te,boundaries:De.value.year,cls:" col"})])),g("div",{key:"months-view",class:"q-date__view q-date__months flex flex-center"},a)},Years(){const t=oe.value,n=t+W,a=[],c=u=>_.value!==null&&_.value.year>u||q.value!==null&&q.value.year<u;for(let u=t;u<=n;u++){const p=m.value.year===u;a.push(g("div",{class:"q-date__years-item flex flex-center"},[g(z,{key:"yr"+u,class:X.value.year===u?"q-date__today":null,flat:!p,label:u,dense:!0,unelevated:p,color:p===!0?Q.value:null,textColor:p===!0?R.value:null,tabindex:r.value,disable:c(u),...D("yr#"+u,{onClick:()=>{Tt(u)}})})]))}return g("div",{class:"q-date__view q-date__years flex flex-center"},[g("div",{class:"col-auto"},[g(z,{round:!0,dense:!0,flat:!0,icon:ue.value[0],tabindex:r.value,disable:c(t),...D("y-",{onClick:()=>{oe.value-=W}})})]),g("div",{class:"q-date__years-content col self-stretch row items-center"},a),g("div",{class:"col-auto"},[g(z,{round:!0,dense:!0,flat:!0,icon:ue.value[1],tabindex:r.value,disable:c(n),...D("y+",{onClick:()=>{oe.value+=W}})})])])}};function St(t){const n={...m.value,day:t};if(e.range===!1){Mt(n,N.value);return}if(H.value===null){const a=Oe.value.find(u=>u.fill!==!0&&u.i===t);if(e.noUnset!==!0&&a.range!==void 0){Me({target:n,from:a.range.from,to:a.range.to});return}if(a.selected===!0){Me(n);return}const c=E(n);H.value={init:n,initHash:c,final:n,finalHash:c},l("range-start",P(n))}else{const a=H.value.initHash,c=E(n),u=a<=c?{from:H.value.init,to:n}:{from:n,to:H.value.init};H.value=null,pe(a===c?n:{target:n,...u}),l("range-end",{from:P(u.from),to:P(u.to)})}}function xt(t){if(H.value!==null){const n={...m.value,day:t};Object.assign(H.value,{final:n,finalHash:E(n)})}}return()=>{const t=[g("div",{class:"q-date__content col relative-position"},[g(ae,{name:"q-transition--fade"},Ct[I.value])])],n=It(i.default);return n!==void 0&&t.push(g("div",{class:"q-date__actions"},n)),e.name!==void 0&&e.disable!==!0&&k(t,"push"),g("div",{class:ut.value,...mt.value},[Yt(),g("div",{ref:j,class:"q-date__main col column",tabindex:-1},t)])}}}),rn=Ke({name:"QPopupProxy",props:{...Lt,breakpoint:{type:[String,Number],default:450}},emits:["show","hide"],setup(e,{slots:i,emit:l,attrs:s}){const{proxy:h}=Ue(),{$q:o}=h,D=L(!1),r=L(null),f=y(()=>parseInt(e.breakpoint,10)),{canShow:b}=Zt({showing:D});function d(){return o.screen.width<f.value||o.screen.height<f.value?"dialog":"menu"}const w=L(d()),Z=y(()=>w.value==="menu"?{maxHeight:"99vh"}:{});J(()=>d(),C=>{D.value!==!0&&(w.value=C)}),Object.assign(h,{show(C){b(C)===!0&&r.value.show(C)},hide(C){r.value.hide(C)},toggle(C){r.value.toggle(C)}});function k(C){D.value=!0,l("show",C)}function j(C){D.value=!1,w.value=d(),l("hide",C)}return()=>{const C={ref:r,...Z.value,...s,onShow:k,onHide:j};let S;return w.value==="dialog"?S=Ft:(S=Xt,Object.assign(C,{target:e.target,contextMenu:e.contextMenu,noParentEvent:!0,separateClosePopup:!0})),g(S,C,i.default)}}});export{rn as Q,on as a,an as d};
