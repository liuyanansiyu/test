
//页面初始化
var temp;
var Today = new Date();
var tY = Today.getFullYear();
var tM = Today.getMonth();
var tD = Today.getDate();
function init(){
    fillSelect();
    document.getElementById("solar_year").selectedIndex=tY-1900;
    document.getElementById("solar_month").selectedIndex=tM;
    showDate(tY,tM);
    todayRightDate(tD-1);
    showCalenderRight();
}
//填充年和月
function fillSelect() {
    var sy = document.getElementById("solar_year");
    sy.innerHTML = "";
    for(var i=1900;i<2050;i++)
    {
        var op = document.createElement("OPTION");
        op.innerHTML = i+"年";
        sy.appendChild(op);
    }
    var sm = document.getElementById("solar_month");
    sm.innerHTML = "";
    for(var i=1;i<13;i++)
    {
        op = document.createElement("OPTION");
        op.innerHTML = i+"月";
        sm.appendChild(op);
    }
}
//前后年 前后月按钮事件
function yearOrMonthChange(K) {
    switch (K){
        case 'PY' :
            if(document.getElementById("solar_year").selectedIndex > 0)
                document.getElementById("solar_year").selectedIndex--;
            break;
        case 'NY' :
            if(document.getElementById("solar_year").selectedIndex < 149)
                document.getElementById("solar_year").selectedIndex++;
            break;
        case 'PM' :
            if(document.getElementById("solar_month").selectedIndex > 0) {
                document.getElementById("solar_month").selectedIndex--;
            }
            else {
                document.getElementById("solar_month").selectedIndex = 11;
                if(document.getElementById("solar_year").selectedIndex > 0)
                    document.getElementById("solar_year").selectedIndex--;
            }
            break;
        case 'NM' :
            if(document.getElementById("solar_month").selectedIndex < 11) {
                document.getElementById("solar_month").selectedIndex++;
            }
            else {
                document.getElementById("solar_month").selectedIndex = 0;
                if(document.getElementById("solar_year").selectedIndex < 149)
                    document.getElementById("solar_year").selectedIndex++;
            }
            break;
        default :
            document.getElementById("solar_year").selectedIndex = tY - 1900;
            document.getElementById("solar_month").selectedIndex = tM;
    }
    changeCld();
}


/********全局变量***********/
//1900-2049年农历数据信息
var lunarInfo = new Array(
    0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,
    0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,
    0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,
    0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,
    0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,
    0x06ca0,0x0b550,0x15355,0x04da0,0x0a5d0,0x14573,0x052d0,0x0a9a8,0x0e950,0x06aa0,
    0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,
    0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b5a0,0x195a6,
    0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,
    0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,
    0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,
    0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,
    0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,
    0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,
    0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0)
//阳历每月天数
var solarMonth = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
//天干
var Gan = new Array("甲","乙","丙","丁","戊","己","庚","辛","壬","癸");
//地支
var Zhi = new Array("子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥");
//属相
var Animals=new Array("鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪");
//节气
var solarTerm = new Array("小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至");
//各个节气到小寒的分钟数
var sTermInfo = new Array(0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758);

var nStr1 = new Array('日','一','二','三','四','五','六','七','八','九','十');
var nStr2 = new Array('初','十','廿','卅','　');

var lMonth=new Array('一','二','三','四','五','六','七','八','九','十','十一','十二')

//阳历节日 *表示节假日
var sFtv = new Array(
    "0101*元旦",
    "0214 情人节",
    "0308 妇女节",
    "0312 植树节",
    "0315 消费者权益日",
    "0321 森林日、儿歌日",
    "0322 水日",
    "0323 气象日",
    "0324 防治结核病日",

    "0401 愚人节",
    "0407 卫生日",
    "0422 地球日",

    "0501*劳动节",
    "0504 青年节",
    "0505 碘缺乏病防治日",
    "0508 红十字日",
    "0512 护士节",
    "0515 家庭日",
    "0517 电信日",
    "0518 博物馆日",
    "0520 营养日",
    "0523 牛奶日",
    "0531 无烟日",

    "0601 儿童节",
    "0605 环境日",
    "0606 全国爱眼日",
    "0616 防治荒漠化和干旱日",
    "0623 奥林匹克日",
    "0625 全国土地日",
    "0626 反毒品日",

    "0701 建党节",
    "0707 抗日战争纪念日",
    "0711 人口日",

    "0801 建军节",
    "0808 父亲节",

    "0908 扫盲日",
    "0909 毛泽东逝世纪念",
    "0910 教师节",
    "0916 臭氧层保护日",
    "0920 爱牙日",
    "0927 旅游日",
    "0928 孔子诞辰",

    "1001*国庆节 音乐日",
    "1004 动物日",
    "1006 老人节",
    "1008 全国高血压日 视觉日",
    "1009 邮政日",
    "1015 盲人节",
    "1016 粮食日",
    "1017 消除贫困日",
    "1024 联合国日",

    "1108 中国记者日",
    "1109 消防宣传日",
    "1112 孙中山诞辰纪念",
    "1114 糖尿病日",
    "1117 大学生节",

    "1201 艾滋病日",
    "1203 残疾人日",
    "1209 足球日",
    "1220 澳门回归纪念",
    "1225 圣诞节",
    "1226 毛泽东诞辰纪念",
    "1229 生物多样性日"
);

//农历节日 *表示节假日
var lFtv = new Array(
    "0101*春节",
    "0115 元宵节",
    "0505 端午节",
    "0707 七夕情人节",
    "0715 中元节",
    "0815 中秋节",
    "0909 重阳节",
    "1208 腊八节",
    "1223 小年",
    "0100*除夕"
);

//按周计算节日——月周日
var wFtv = new Array(
    "0520 母亲节",
    "0530 全国助残日",
    "0630 父亲节",
    "0932 和平日",
    "0940 聋人节",
    "1013 减轻自然灾害日",
    "1011 住房日"
);

//农历 y年的总天数
function lYearDays(y) {
    var i, sum = 348;
    for(i=0x8000; i>0x8; i>>=1)
        sum += (lunarInfo[y-1900] & i)? 1: 0;
    return(sum+leapDays(y));
}

//农历 y年闰月的天数
function leapDays(y) {
    if(leapMonth(y))  return((lunarInfo[y-1900] & 0x10000)? 30: 29);
    else return(0);
}

//农历 y年闰哪个月1-12 , 没闰返回 0
function leapMonth(y) {
    return(lunarInfo[y-1900] & 0xf);//0xf是15
}

//农历 y年m月的天数
function monthDays(y,m) {
    return( (lunarInfo[y-1900] & (0x10000>>m))? 30: 29 );
}

//计算农历日期
// 对象Lunar 属性有：yearCyl,monCyl,dayCyl,year,month,day,isLeap
// 对象Lunar构造函数
function Lunar(solarDateObj) {
    var i, leap, temp=0;
    //dayNum 为距1900年1月31号的天数
    var dayNum   = Math.floor((solarDateObj.getTime() + 2206425600000)/86400000);//一天24*60*60*1000=86400000 毫秒
    this.dayCyl = dayNum + 40;
    this.monCyl = 14;

    for(i=1900; i<2050 && dayNum>0; i++) {
        temp = lYearDays(i);
        dayNum -= temp;
        this.monCyl += 12;
    }

    if(dayNum<0) {
        dayNum += temp;
        i--;
        this.monCyl -= 12;
    }

    this.year = i;
    this.yearCyl = i-1864;

    leap = leapMonth(i);
    this.isLeap = false;

    for(i=1; i<13 && dayNum>0; i++) {
        if(leap>0 && i==(leap+1) && this.isLeap==false)
        {
            --i;
            this.isLeap = true;
            temp = leapDays(this.year);
        }
        else
        {
            temp = monthDays(this.year, i);
        }
     //解除闰月
        if(this.isLeap==true && i==(leap+1))
        {
            this.isLeap = false;
        }

        dayNum -= temp;
        if(this.isLeap == false)
        {
            this.monCyl ++;
        }

    }
    if(dayNum==0 && leap>0 && i==leap+1)
        if(this.isLeap)
        { this.isLeap = false; }
        else
        { this.isLeap = true; --i; --this.monCyl;}

    if(dayNum<0){ dayNum += temp; --i; --this.monCyl; }

    this.month = i;
    this.day = dayNum + 1;
}
//阳历每月天数
function solarDays(y,m) {
    if(m==1)
        return(((y%4 == 0) && (y%100 != 0) || (y%400 == 0))? 29: 28);
    else
        return(solarMonth[m]);
}

//循环的天干地支
function cyclical(num) {
    return(Gan[num%10]+Zhi[num%12]);
}

//每个日期元素对象
function dateElement(sYear,sMonth,sDay,week,lYear,lMonth,lDay,isLeap,cYear,cMonth,cDay) {
    //是否是今天
    this.isToday    = false;
    //阳历
    this.sYear      = sYear;
    this.sMonth     = sMonth;
    this.sDay       = sDay;
    this.week       = week;

    //阴历
    this.lYear      = lYear;
    this.lMonth     = lMonth;
    this.lDay       = lDay;
    this.isLeap     = isLeap;

    //干支
    this.cYear      = cYear;
    this.cMonth     = cMonth;
    this.cDay       = cDay;

    this.color      = '';
    this.lunarFestival = '';//农历节日
    this.solarFestival = '';//阳历节日
    this.solarTerms    = '';//节气
}

//某年的第n个节气为几日(从0小寒起算)
function solarTerms(y,n) {
    // UTC()根据时返回 1970 年 1 月 1 日 到指定日期的毫秒数。
    //31556925974.7为地球公转周期，是毫秒。
    //( 31556925974.7*(y-1900) + sTermInfo[n]*60000  ) 表示y年的第n个节气点距1900年的小寒点的毫秒数。
    var offDate = new Date( ( 31556925974.7*(y-1900) + sTermInfo[n]*60000  ) + Date.UTC(1900,0,6,2,5) );
    var solarTermsDay=offDate.getUTCDate();
    return solarTermsDay; //返回某月中的一天
}

// calender对象
function calendar(y,m) {
    var sDateObj, lDateDObj, lunarYear, lunarMonth, lunarDay=1, lunarIsLeap, LastLunarDay=0, tmp1, tmp2;
    var lDPOS = new Array(3);
    var n = 0;
    var firstLM = 0;

    sDateObj = new Date(y,m,1);
    this.length  = solarDays(y,m); //阳历当月天数
    this.firstWeek = sDateObj.getDay();//阳历1日是星期几

    //循环获取每天的日期对象
    for(var i=0;i<this.length;i++) {
        if(lunarDay>LastLunarDay) {
            sDateObj = new Date(y,m,i+1); //阳历日期对象
            lDateDObj = new Lunar(sDateObj);//阴历日期对象
            lunarYear     = lDateDObj.year;  //农历年
            lunarMonth    = lDateDObj.month;  //农历月
            lunarDay      = lDateDObj.day;  //农历日
            lunarIsLeap   = lDateDObj.isLeap; //农历是否闰月
            LastLunarDay  = lunarIsLeap? leapDays(lunarYear): monthDays(lunarYear,lunarMonth); //农历当月最後一天

            if(n==0)
                firstLM = lunarMonth;
            lDPOS[n++] = i-lunarDay+1;
        }
        // dateElement 实例--每月的详细信息，包括阳历年月日，阴历年月日，天干地支
        this[i] = new dateElement(y, m+1, i+1, nStr1[(i+this.firstWeek)%7],
            lunarYear, lunarMonth, lunarDay++, lunarIsLeap,
            cyclical(lDateDObj.yearCyl) ,cyclical(lDateDObj.monCyl), cyclical(lDateDObj.dayCyl++) );

        if((i+this.firstWeek)%7==0||(i+this.firstWeek)%7==0)
            this[i].color ="red" ;//周日颜色
    }

    tmp1=solarTerms(y,m*2 )-1;
    tmp2=solarTerms(y,m*2+1)-1;
    this[tmp1].solarTerms = solarTerm[m*2];
    this[tmp2].solarTerms = solarTerm[m*2+1];


    // 遍历节日，显示节日
    for(i in sFtv)
        if(sFtv[i].match(/^(\d{2})(\d{2})([\s\*])(.+)$/))
        {
            if(Number(RegExp.$1)==(m+1)) {
                this[Number(RegExp.$2)-1].solarFestival += RegExp.$4 + ' ';
                if(RegExp.$3=='*')
                    this[Number(RegExp.$2)-1].color = 'red';
            }
        }
    for(i in wFtv)
        if(wFtv[i].match(/^(\d{2})(\d)(\d)([\s\*])(.+)$/)) {
            if (Number(RegExp.$1) == (m + 1)) {
                tmp1 = Number(RegExp.$2);
                tmp2 = Number(RegExp.$3);
                var t=((this.firstWeek > tmp2) ? 7 : 0)+ 7 * (tmp1 - 1) + tmp2 - this.firstWeek;
                this[t].solarFestival += RegExp.$5 + ' ';
            }
        }
    for(i in lFtv)
        if(lFtv[i].match(/^(\d{2})(.{2})([\s\*])(.+)$/)) {
            tmp1=Number(RegExp.$1)-firstLM;
            if(tmp1==-11) tmp1=1;
            if(tmp1 >=0 && tmp1<n) {
                tmp2 = lDPOS[tmp1] + Number(RegExp.$2) -1;
                if( tmp2 >= 0 && tmp2<this.length) {
                    this[tmp2].lunarFestival += RegExp.$4 + ' ';
                    if(RegExp.$3=='*')
                        this[tmp2].color = 'red';
                }
            }
        }

    if((this.firstWeek+12)%7==5)
        this[12].solarFestival += '黑色星期五 ';
    //今日
    if(y==tY && m==tM) {
        this[tD-1].isToday = true;
    }
}

//中文日期
function cDay(d){
    var s;
    switch (d) {
        case 10:
            s = '初十';
            break;
        case 20:
            s = '二十';
            break;
        case 30:
            s = '三十';
            break;
        default :
            s = nStr2[Math.floor(d/10)];
            s += nStr1[d%10];
    }
    return(s);
}

function showDate(SY,SM) {

    document.getElementById("stemsYear").innerHTML='农历' + cyclical(SY-1900+36) + '年';
    document.getElementById("animal").innerHTML='【' + Animals[(SY-4)%12] + '】';

    var i,sD,s,size,sObj,lObj;
    cld = new calendar(SY,SM);

    for(i=0;i<42;i++) {

        sObj = document.getElementById('solar_day'+ i);
        lObj = document.getElementById('lunar_day'+ i);

        sObj.style.background = '';
        lObj.style.background = '';
        sObj.style.color='#333';
        lObj.style.color='#333';
        sObj.parentNode.parentNode.style.background='';
        sD = i - cld.firstWeek;

        if(sD>-1 && sD<cld.length) {
            sObj.innerHTML = sD+1;
            if(cld[sD].isToday){
                //设置今天的背景色
                sObj.parentNode.parentNode.style.background = '#FA3131';
                sObj.style.color='#fff';
                lObj.style.color='#fff';
            }

      /*      sObj.style.color = cld[sD].color;*/

            if(cld[sD].lDay==1) //显示农历月
                lObj.innerHTML = '<b>'+(cld[sD].isLeap?'闰':'')
                    + cld[sD].lMonth + '月'
                    + (monthDays(cld[sD].lYear,cld[sD].lMonth)==29?'小':'大')+'</b>';
            else //否则显示农历日
                lObj.innerHTML = cDay(cld[sD].lDay);

            s=cld[sD].lunarFestival; //农历节日
            if(s.length>0) {
                //农历节日名称大于5个字截去
                if(s.length>4) s = s.substr(0, 3)+'…';
                s = s.fontcolor('red');
            }
            else { //阳历节日
                s=cld[sD].solarFestival;
                if(s.length>0) {
                    //阳历节日名称截去
                /*    size = (s.charCodeAt(0)>0 && s.charCodeAt(0)<128)?9:5;
                    if(s.length>size+1) s = s.substr(0, size-1)+'…';*/
                    if(s.length>4) s = s.substr(0, 3)+'…';
                    s = s.fontcolor('#0168ea');
                }
                else { //节气
                    s=cld[sD].solarTerms;
                    if(s.length>0)
                        s = s.fontcolor('#44d7cf');
                }
            }
            if(s.length>0) lObj.innerHTML = s;

        }
        else {
            sObj.innerHTML = ' ';
            lObj.innerHTML = ' ';
        }
    }
    showOrHideTd();
}
function showOrHideTd(){
   var tdHtml= document.getElementById('solar_day35').innerHTML;
   if(tdHtml ==' '){
      document.getElementById('lastTr').style.display="none";
   }
    else{
       document.getElementById('lastTr').style.display='table-row';
   }
}
//给日期所在的a标签动态添加ID
function showCalenderRight(){
    var aList=document.getElementById('table').getElementsByTagName('a');
    for(var i=0;i<42;i++){
        aList[i].setAttribute('id','aList'+i);
    }
    aClickEvent();
}
//给日期所在的a标签添加onclick事件
function aClickEvent(){
    for(var i=0;i<42;i++) {

        (function( j ){
            document.getElementById('aList' + j).onclick = function () {
                for(var k=0;k<42;k++){
                    document.getElementById('aList' +k).parentNode.style.border="0px ";
                }
                document.getElementById('aList' + j).parentNode.style.border="2px solid red";
                showRightDate(j);
            }
        })( i );//闭包
    }
}
//点击日期时  右侧日期对应变化
function showRightDate(v){

    var sObj = document.getElementById('solar_day'+ v);
    if(sObj!=null&&sObj.innerHTML !=''){
        var d=sObj.innerHTML -1;
        temp=d;
        document.getElementById('sDate').innerHTML=cld[d].sYear+'-'+cld[d].sMonth+'-'+cld[d].sDay+'&nbsp;&nbsp;星期'+cld[d].week ;
        document.getElementById('sDay').innerHTML=cld[d].sDay;
        document.getElementById('stemMonth').innerHTML=cld[d].cMonth+"月";
        document.getElementById('stemDay').innerHTML=cld[d].cDay+"日";
        document.getElementById('lDate').innerHTML= lMonth[cld[d].lMonth-1]+'月'+cDay(cld[d].lDay);
        document.getElementById('sTerm').innerHTML=cld[d].solarFestival;
    }
}
//返回今天按钮 右侧日期对应变化
function todayRightDate(d){

    document.getElementById('sDate').innerHTML=cld[d].sYear+'-'+cld[d].sMonth+'-'+cld[d].sDay+'&nbsp;&nbsp;星期'+cld[d].week ;
    document.getElementById('sDay').innerHTML=cld[d].sDay;
    document.getElementById('stemMonth').innerHTML=cld[d].cMonth+"月";
    document.getElementById('stemDay').innerHTML=cld[d].cDay+"日";
    document.getElementById('lDate').innerHTML= lMonth[cld[d].lMonth-1]+'月'+cDay(cld[d].lDay);
    document.getElementById('sTerm').innerHTML=cld[d].solarFestival;
}
//改变日历
function changeCld() {
    var y,m;
    y = document.getElementById("solar_year").selectedIndex + 1900;
    m = document.getElementById("solar_month").selectedIndex;
    showDate(y,m);
    todayRightDate(temp);
}

//返回今天按钮事件,获取今天的year和month
function backToDay(){
    showDate(tY,tM);
    document.getElementById("solar_year").selectedIndex=tY-1900;
    document.getElementById("solar_month").selectedIndex=tM;
    todayRightDate(tD-1);
    for(var k=0;k<42;k++){
        document.getElementById('aList' +k).parentNode.style.border="0px ";
    }

}