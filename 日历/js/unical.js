var debug = 2; // -1: disable; 0: all; N: show level N debug msg.

//农历数据信息
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


//0x04bd8 二进制 0000 0100 1011 1101 1000 有闰年，闰8月，闰小月，及多一个29天的8月份， 对应13月分别为：29 30 29 29 39 29 30 30 29 30 30 29 30

/*
二进制形式
xxxx	xxxx	xxxx	xxxx	xxxx
20-17	16-12	12-9	8-5	    4-1
 1-4: 表示当年有无闰月，有的话，为闰月的月份，没有的话，为0。
 5-16：为除了闰月外的正常月份是大月还是小月，1为30天，0为29天。
 注意：从1月到12月对应的是第16位到第5位。
 17-20： 表示闰月是大月还是小月，仅当存在闰月的情况下有意义。为1 闰大月  为0闰小月
*/



//太阳历每月天数
var solarMonth = new Array(31,28,31,30,31,30,31,31,30,31,30,31);
//天干
var Gan = new Array("甲","乙","丙","丁","戊","己","庚","辛","壬","癸");
//地支
var Zhi = new Array("子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥");


//十天干：甲（jiǎ）、乙（yǐ）、丙（bǐng）、丁（dīng）、戊（wù）、己（jǐ）、庚（gēng）、辛（xīn）、壬（rén）、癸（guǐ）；
// 其中甲、丙、戊、庚、壬为阳干，乙、丁、己、辛、癸为阴干。
//十二地支：子（zǐ）、丑（chǒu）、寅（yín）、卯（mǎo）、辰（chén）、巳（sì）、午（wǔ）、未（wèi）、申（shēn）、酉（yǒu）、戌（xū）、亥（hài）
// 其中子、寅、辰、午、申、戌为阳支，丑、卯、巳、未、酉、亥为阴支。

//属相
var Animals=new Array("鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪");
//节气
var solarTerm = new Array("小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至");
//各个节气到小寒的分钟数
var sTermInfo = new Array(0,21208,42467,63836,85337,107014,128867,150921,173149,195551,218072,240693,263343,285989,308563,331033,353350,375494,397447,419210,440795,462224,483532,504758);
//
var nStr1 = new Array('日','一','二','三','四','五','六','七','八','九','十');
//
var nStr2 = new Array('初','十','廿','卅','　');
//英语月份简写
var monthName = new Array("JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC");

//国历节日 *表示节假日
var sFtv = new Array(
		"0101*元旦",
		"0214 情人节",
		"0308 妇女节",
		"0312 植树节",
		"0315 消费者权益日",
		"0321 世界森林日、世界儿歌日",
		"0322 世界水日",
		"0323 世界气象日",
		"0324 世界防治结核病日",
		
		"0401 愚人节",
		"0407 世界卫生日",
		"0422 世界地球日",
		
		"0501*劳动节",
		"0504 青年节",
		"0505 碘缺乏病防治日",
		"0508 世界红十字日",
		"0512 国际护士节",
		"0515 国际家庭日",
		"0517 世界电信日",
		"0518 国际博物馆日",
		"0520 全国学生营养日",
		"0523 国际牛奶日",
		"0531 世界无烟日",
		
		"0601 儿童节",
		"0605 世界环境日",
		"0606 全国爱眼日",
		"0616 防治荒漠化和干旱日",
		"0623 国际奥林匹克日",
		"0625 全国土地日",
		"0626 国际反毒品日",
		
		"0701 建党节 香港回归纪念 国际建筑日",
		"0707 中国人民抗日战争纪念日",
		"0711 世界人口日",
	
		"0801 建军节",
		"0808 父亲节",
		
		"0908 国际扫盲日",
		"0909 毛泽东逝世纪念",
		"0910 教师节",
		"0916 国际臭氧层保护日",
		"0920 国际爱牙日",
		"0927 世界旅游日",
		"0928 孔子诞辰",
		
		"1001*国庆节 国际音乐日",
		"1004 世界动物日",
		"1006 老人节",
		"1008 全国高血压日 世界视觉日",
		"1009 世界邮政日",
		"1015 国际盲人节",
		"1016 世界粮食日",
		"1017 世界消除贫困日",
		"1024 联合国日",
		
		"1108 中国记者日",
		"1109 消防宣传日",
		"1112 孙中山诞辰纪念",
		"1114 世界糖尿病日",
		"1117 国际大学生节",

		"1201 世界艾滋病日",
		"1203 世界残疾人日",
		"1209 世界足球日",
		"1220 澳门回归纪念",
		"1225 圣诞节",
		"1226 毛泽东诞辰纪念",
		"1229 国际生物多样性日"
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

//按周计算 月周日
var wFtv = new Array(
		"0520 国际母亲节",
		"0530 全国助残日",
		"0630 国际父亲节",
		"0932 国际和平日",
		"0940 国际聋人节",
		"1013 国际减轻自然灾害日",
		"1011 国际住房日"
		);

function log(level,  msg) {
        if (debug == 0 || debug == level)
        if(window.console) {
                window.console.log("[DEBUG]" + msg);
        }
}
//传回农历  y年的总天数
function lYearDays(y) {
   var i, sum = 348;
   for(i=0x8000; i>0x8; i>>=1) sum += (lunarInfo[y-1900] & i)? 1: 0;
   return(sum+leapDays(y));
}
//传回农历  y年闰月的天数
function leapDays(y) {
   if(leapMonth(y))  return((lunarInfo[y-1900] & 0x10000)? 30: 29);
   else return(0);
}
//传回农历  y年闰哪个月  1-12  ,  没闰传回  0
function leapMonth(y) {
   return(lunarInfo[y-1900] & 0xf);//0xf是15
}
//传回农历  y年m月的总天数
function monthDays(y,m) {
   return( (lunarInfo[y-1900] & (0x10000>>m))? 30: 29 );
}

function Lunar(objDate) {
   var m = ""; // msg for log
   var i, leap=0, temp=0;
   var baseDate = new Date(1900,0,31);
// changed by hmisty 2005/07/23
 //  var offset   = (objDate - baseDate)/86400000;
   var offset   = Math.floor((objDate.getTime() + 2206425600000)/86400000);//一天24*60*60*1000=86400000 毫秒
   m += "objDate getTime方法"+objDate.getTime()+", new Date(1900,0,31)="+baseDate.getTime();
   m += "offset="+offset;
   
   this.dayCyl = offset + 40;
   this.monCyl = 14;

   for(i=1900; i<2050 && offset>0; i++) {
      temp = lYearDays(i);
      offset -= temp;
      this.monCyl += 12;
   }
   
   if(offset<0) {
      offset += temp;
      i--;
      this.monCyl -= 12;
   }

   this.year = i;
   this.yearCyl = i-1864;

   leap = leapMonth(i);
   this.isLeap = false;

   for(i=1; i<13 && offset>0; i++) {
      if(leap>0 && i==(leap+1) && this.isLeap==false)
         { --i; this.isLeap = true; temp = leapDays(this.year); }
      else
         { temp = monthDays(this.year, i); }
//解除闰月
      if(this.isLeap==true && i==(leap+1)) this.isLeap = false;

      offset -= temp;
      if(this.isLeap == false) this.monCyl ++;
   }

   if(offset==0 && leap>0 && i==leap+1)
      if(this.isLeap)
         { this.isLeap = false; }
      else
         { this.isLeap = true; --i; --this.monCyl;}

   if(offset<0){ offset += temp; --i; --this.monCyl; }

   this.month = i;
   this.day = offset + 1;
   
   m += "\noffset="+offset+", year="+this.year+", yearCyl="+this.yearCyl+", month="+this.month+",\n monthCyl="+this.monthCyl+", day="+this.day+", dayCyl="+this.dayCyl;
   log(2, m);
}

function solarDays(y,m) {
   if(m==1)
      return(((y%4 == 0) && (y%100 != 0) || (y%400 == 0))? 29: 28);
   else
      return(solarMonth[m]);
}

function cyclical(num) {
   return(Gan[num%10]+Zhi[num%12]);
}

function calElement(sYear,sMonth,sDay,week,lYear,lMonth,lDay,isLeap,cYear,cMonth,cDay) {

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
function sTerm(y,n) {
   log(1,  "y="+y+" n="+n+" sTermInfo[n]="+sTermInfo[n]+" Date.UTC(1900,0,6,2,5)="+Date.UTC(1900,0,6,2,5)+" Date.UTC(1970,0,1,0,0)="+Date.UTC(1970,0,1,0,0) );
// changed by hmisty 2005/07/23

    // UTC()根据世界时返回 1970 年 1 月 1 日 到指定日期的毫秒数。
	//31556925974.7为地球公转周期，是毫秒。
	//( 31556925974.7*(y-1900) + sTermInfo[n]*60000  ) 表示y年的第n个节气点（15倍数度点）距1900年的小寒点的毫秒数。

	//  var offDate = new Date( ( 31556925974.7*(y-1900) + sTermInfo[n]*60000  ) + Date.UTC(1900,0,6,2,5) );

   var offDate = new Date( ( 31556925974.7*(y-1900) + sTermInfo[n]*60000  ) -2208549300000 );
   // Negative epoch (time_t) values are not officially supported by the
   // POSIX standards.  On some systems, they are known not to work.
   // -- perldoc Time::Local

   return(offDate.getUTCDate()); //返回某月中的一天
}

function calendar(y,m) {
        log(1,  "i am in calendar() now");
	var sDObj, lDObj, lY, lM, lD=1, lL, lX=0, tmp1, tmp2;
	var lDPOS = new Array(3);
	var n = 0;
	var firstLM = 0;
     
	sDObj = new Date(y,m,1);
	    this.length  = solarDays(y,m); //阳历当月天数
     	this.firstWeek = sDObj.getDay();//阳历1日是星期几

        log(1,  "this.length: "+this.length);
        log(1,  "begin loop for(var i=0;i<this.length;i++)");
	for(var i=0;i<this.length;i++) {
	  
		if(lD>lX) {
			sDObj = new Date(y,m,i+1);
			lDObj = new Lunar(sDObj);
			lY    = lDObj.year;  //农历年
			lM    = lDObj.month;  //农历月
			lD    = lDObj.day;  //农历日
			lL    = lDObj.isLeap; //农历是否闰月
			lX    = lL? leapDays(lY): monthDays(lY,lM); //农历当月最後一天
	       
			if(n==0) firstLM = lM;
			lDPOS[n++] = i-lD+1;
	  	}
	  
	       //log(1,  "lDObj.dayCyl: "+lDObj.dayCyl);
		this[i] = new calElement(y, m+1, i+1, nStr1[(i+this.firstWeek)%7],
                               lY, lM, lD++, lL,
                               cyclical(lDObj.yearCyl) ,cyclical(lDObj.monCyl), cyclical(lDObj.dayCyl++) );

	  
		if((i+this.firstWeek)%7==0)   this[i].color ="red" ;//周日颜色 '#ff5f07'
		if((i+this.firstWeek)%14==13) this[i].color = 'red'; //
     	}
        log(1,  "end loop for(var i=0;i<this.length;i++)");

	tmp1=sTerm(y,m*2  )-1;
	tmp2=sTerm(y,m*2+1)-1;
	log(1,  "m: "+m+" tmp1: "+tmp1+" "+solarTerm[m*2]+" tmp2: "+tmp2+" "+solarTerm[m*2+1]);
	this[tmp1].solarTerms = solarTerm[m*2];
    this[tmp2].solarTerms = solarTerm[m*2+1];
	if(m==3) this[tmp1].color = '#ff5f07'; //清明颜色
        
        log(1,  "begin loop for(i in sFtv)");
	for(i in sFtv)
		if(sFtv[i].match(/^(\d{2})(\d{2})([\s\*])(.+)$/))
		{

			if(Number(RegExp.$1)==(m+1)) {
				this[Number(RegExp.$2)-1].solarFestival += RegExp.$4 + ' ';
				if(RegExp.$3=='*') this[Number(RegExp.$2)-1].color = '#ff5f07';
	       		}
		}
        log(1,  "begin loop for(i in wFtv)");
	for(i in wFtv)
		if(wFtv[i].match(/^(\d{2})(\d)(\d)([\s\*])(.+)$/)) {

			if (Number(RegExp.$1) == (m + 1)) {
				tmp1 = Number(RegExp.$2);
				tmp2 = Number(RegExp.$3);
				var t=((this.firstWeek > tmp2) ? 7 : 0)+ 7 * (tmp1 - 1) + tmp2 - this.firstWeek;
				this[t].solarFestival += RegExp.$5 + ' ';
			}

		}
        log(1,  "begin loop for(i in lFtv)");
	for(i in lFtv)  
		if(lFtv[i].match(/^(\d{2})(.{2})([\s\*])(.+)$/)) {
                        log(1,  lFtv[i]);
			tmp1=Number(RegExp.$1)-firstLM;
			if(tmp1==-11) tmp1=1;
			if(tmp1 >=0 && tmp1<n) {
				tmp2 = lDPOS[tmp1] + Number(RegExp.$2) -1;
				if( tmp2 >= 0 && tmp2<this.length) {
                                        log(1,  "tmp2 >= 0 && tmp2("+tmp2+")<this.length("+this.length+")");
                                        log(1,  RegExp.$4);
                                        log(1,  this[tmp2].lunarFestival);
					this[tmp2].lunarFestival += RegExp.$4 + ' ';
                                        log(1,  RegExp.$3);
					if(RegExp.$3=='*') this[tmp2].color = '#ff5f07';
				}
			}
	  	}
     
        log(1,  "begin 黑色星期五");
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

var cld;

function drawCld(SY,SM) {
        log(1,  "i am in drawCld() now");

	var i,sD,s,size;
	log(1,  "begin to create calendar cld");
	cld = new calendar(SY,SM);
        log(1,  "calendar cld creation finished");
	/*
	   if(SY>1874 && SY<1909) yDisplay = '光绪' + (((SY-1874)==1)?'元':SY-1874)
	   if(SY>1908 && SY<1912) yDisplay = '宣统' + (((SY-1908)==1)?'元':SY-1908)
	   if(SY>1911 && SY<1950) yDisplay = '民国' + (((SY-1911)==1)?'元':SY-1911)
	   if(SY>1949) yDisplay = '共和国' + (((SY-1949)==1)?'元':SY-1949)
	 */
     
	document.getElementById("gz").innerHTML = '&nbsp;&nbsp;农历' 
		+ cyclical(SY-1900+36) + '年 &nbsp;&nbsp;【'+Animals[(SY-4)%12]+'】';
        log(1,  "innerHTML of gz is "+document.getElementById("gz").innerHTML);
   //YMBG.innerHTML = "&nbsp;" + SY + "<BR>&nbsp;" + monthName[SM];
        
	for(i=0;i<42;i++) {
	  
		sObj = document.getElementById('sd'+ i);
		lObj = document.getElementById('ld'+ i);
	  
		sObj.style.background = '';
	  	lObj.style.background = '';
	  
		sD = i - cld.firstWeek;
	  
		if(sD>-1 && sD<cld.length) {	       
			sObj.innerHTML = sD+1;
			if(cld[sD].isToday){
				//设置今天的背景色
				sObj.style.background = 'red';
				lObj.style.background = 'red';
			}
	       
			sObj.style.color = cld[sD].color;
	       
			if(cld[sD].lDay==1) //显示农历月
				lObj.innerHTML = '<b>'+(cld[sD].isLeap?'闰':'') 
					+ cld[sD].lMonth + '月' 
					+ (monthDays(cld[sD].lYear,cld[sD].lMonth)==29?'小':'大')+'</b>';
			else //否则显示农历日
		    		lObj.innerHTML = cDay(cld[sD].lDay);
	       
			s=cld[sD].lunarFestival; //农历节日
			if(s.length>0) {
				//农历节日名称大于5个字截去
				//if(s.length>5) s = s.substr(0, 3)+'…';
				if(s.length>7) s = s.substr(0, 5)+'…';
				s = s.fontcolor('#ff5f07');
			}
			else { //阳历节日
				s=cld[sD].solarFestival;
				if(s.length>0) {
					//阳历节日名称截去
					//size = (s.charCodeAt(0)>0 && s.charCodeAt(0)<128)?8:4;			
					size = (s.charCodeAt(0)>0 && s.charCodeAt(0)<128)?9:5;
			 		if(s.length>size+1) s = s.substr(0, size-1)+'…';
					s = s.fontcolor('#0168ea');
				}
				else { //节气
					s=cld[sD].solarTerms;
					if(s.length>0) s = s.fontcolor('#44d7cf');
				}
			}
			if(s.length>0) lObj.innerHTML = s;
	  
		}
		else {
			sObj.innerHTML = ' ';
			lObj.innerHTML = ' ';
		}
     	}
}


function changeCld() {
	var y,m;
	y = document.getElementById("sy").selectedIndex + 1900;
	m = document.getElementById("sm").selectedIndex;
     	drawCld(y,m);
}

function pushBtm(K) {
	switch (K){
		case 'YU' :
			if(document.getElementById("sy").selectedIndex > 0)
			       	document.getElementById("sy").selectedIndex--;
			break;
		case 'YD' :
			if(document.getElementById("sy").selectedIndex < 149) 
				document.getElementById("sy").selectedIndex++;
	       		break;
		case 'MU' :
			if(document.getElementById("sm").selectedIndex > 0) {      
				document.getElementById("sm").selectedIndex--;
			}
			else {
				document.getElementById("sm").selectedIndex = 11;
				if(document.getElementById("sy").selectedIndex > 0) 
					document.getElementById("sy").selectedIndex--;
			}
			break;
		case 'MD' :
			if(document.getElementById("sm").selectedIndex < 11) {
				document.getElementById("sm").selectedIndex++;
			}
			else {
				document.getElementById("sm").selectedIndex = 0;
				if(document.getElementById("sy").selectedIndex < 149) 
					document.getElementById("sy").selectedIndex++;
			}
			break;
		default :
			document.getElementById("sy").selectedIndex = tY - 1900;
			document.getElementById("sm").selectedIndex = tM;
	}
	changeCld();
}

var Today = new Date();
var tY = Today.getFullYear();
var tM = Today.getMonth();
var tD = Today.getDate();

var width = "130"; //detail层宽度
var offsetx = 2;
var offsety = 16;

var x = 0;
var y = 0;
var show = 0;
var sw = 0;
var cnt = 0;

var dStyle;
document.onmousemove = mEvn;

//用detail层显示详细信息
function mOvr(v) {

	var festival = document.getElementById("festival");
	var datedetail = document.getElementById("datedetail");

	var sObj = document.getElementById('sd'+ v);
	//alert(v);
	var d = sObj.innerHTML - 1;
     
	if( sObj.innerHTML != '' ) {
		sObj.style.cursor = 'move';
		if(cld[d].solarTerms == '' && cld[d].solarFestival == '' && cld[d].lunarFestival == '')
		{
			festival.innerHTML = "";
			festival.style.display = "none";
		}
		else
		{
			
			festival.innerHTML = cld[d].solarTerms + ' ' + cld[d].solarFestival + ' ' + cld[d].lunarFestival;
			festival.style.display = "block";
		}
			datedetail.innerHTML = cld[d].sYear +' 年 '+ cld[d].sMonth
			+ ' 月 '+cld[d].sDay +' 日<br />星期' + cld[d].week + '<br />'
			+ '<span>农历' + (cld[d].isLeap?'闰 ':' ')
			+ cld[d].lMonth + ' 月 ' + cld[d].lDay + ' 日<br />'
			+ cld[d].cYear + '年 ' + cld[d].cMonth
			+ '月 ' + cld[d].cDay + '日</span>';

		if (show == 0) {
			dStyle.left = (x + offsetx - (width/2)) + "px";
			dStyle.top = (y + offsety) + "px";
   			dStyle.visibility = "visible";
   			show = 1;
		}
	}
}

function mOut() {
	if ( cnt >= 1 ) { sw = 0 }
	if ( sw == 0 ) { show = 0; dStyle.visibility = "hidden";}
	else cnt++;
}

//获取鼠标坐标
function mEvn(e) {
	if (!show) return;
	if(window.event){
		x = event.x ;
		y = event.y ;
		if (document.body.scrollLeft){
			x += document.body.scrollLeft; 
			y += document.body.scrollTop;
		} 
		// changed by hmisty 2005/07/23
      		dStyle.left = (x + offsetx-(width/2)) + "px";
      		dStyle.top = (y + offsety) + "px";
	}
	else {
     		dStyle.left = (e.pageX + offsetx-(width/2)) + "px";
      		dStyle.top = (e.pageY + offsety) + "px";
	 }
}

function changeTZ() {
   document.getElementById("city").innerHTML = document.getElementById("tz").value.substr(6);
   setCookie("TZ",document.getElementById("tz").selectedIndex);
}

function tick() {
	var today;
	today = new Date();
	document.getElementById("clock").innerHTML = today.getFullYear() + "年"
		+ today.getMonth() + "月" + today.getDay() + "日" + today.getTime();
	/*
	   document.getElementById("clock").innerHTML = today.toLocaleString().replace(/(年|月)/g, "/").replace(/日/, ""); 
	   document.getElementById("clock").innerHTML = TimeAdd(today.toGMTString(), document.getElementById("tz").value);
	 */
	//alert(document.getElementById("clock").innerHTML);
     	window.setTimeout("tick()", 1000);
}

function setCookie(name, value) {
	var today = new Date()
	var expires = new Date()
	expires.setTime(today.getTime() + 1000*60*60*24*365)
	document.cookie = name + "=" + escape(value)	+ "; expires=" + expires.toGMTString()
}

function getCookie(Name) {
   var search = Name + "=";
   if(document.cookie.length > 0) {
      offset = document.cookie.indexOf(search);
      if(offset != -1) {
         offset += search.length;
         end = document.cookie.indexOf(";", offset);
         if(end == -1) end = document.cookie.length;
         return unescape(document.cookie.substring(offset, end));
      }
      else return "";
   }
}

function fillSelect() {
	syd = document.getElementById("sy");
	syd.innerHTML = "";
	for(i=1900;i<2050;i++)
	{
		ins = document.createElement("OPTION");
		ins.innerHTML = i;
		syd.appendChild(ins);
	}
	smd = document.getElementById("sm");
	smd.innerHTML = "";
	for(i=1;i<13;i++)
	{
		ins = document.createElement("OPTION");
		ins.innerHTML = i;
		smd.appendChild(ins);
	}
}

function fillCalendar() {
	var gNum;
	var tablex = document.createElement("table");
	tablex.setAttribute("id","week");
	for(i=0;i<6;i++) {
		var trx1 = document.createElement("tr");
		var trx2 = document.createElement("tr");
		trx1.setAttribute("class","tr1");
		trx1.setAttribute("className","tr1");
		trx2.setAttribute("class","tr2");
		trx1.setAttribute("className","tr1");
		for(j=0;j<7;j++) {
			gNum = i*7+j;
			var tdx = document.createElement("td");
			tdx.setAttribute("id","sd"+gNum);
			/*document.getElementById("sd"+gNum).onmousever=function(){
				mOvr(gNum);
			}
			document.getElementById("sd"+gNum).onmouseout=function(){
				mOut();
			}*/
			tdx.setAttribute("onMouseOver",'mOvr('+gNum+')');
			tdx.setAttribute("onMouseOut","mOut()");
			if(j == 0){
				tdx.setAttribute("class","aorange");
			}
			else if(j == 6){
				if(i%2==1) tdx.setAttribute("class","aorange");
				else tdx.setAttribute("class","agreen");
			}
			else{
				tdx.setAttribute("class","one");
			}
			trx1.appendChild(tdx);
		
			tdx = document.createElement("td");
			tdx.setAttribute("id","ld"+gNum);
			tdx.setAttribute("onMouseOver",'mOvr('+gNum+')');
			tdx.setAttribute("onMouseOut","mOut()");
			trx2.appendChild(tdx);
		}
		tablex.appendChild(trx1);
		tablex.appendChild(trx2);
	}
	document.getElementById("calendar").appendChild(tablex);
}
//界面初始化
function initial() {
	//select
	
	dStyle = document.getElementById("detail").style;
	fillSelect();
	fillCalendar();

	document.getElementById("sy").selectedIndex=tY-1900;
	document.getElementById("sm").selectedIndex=tM;
	log(1,  "initial call drawCld() now");
	drawCld(tY,tM);
     
	//document.getElementById("tz").selectedIndex=getCookie("TZ");
	//if(document.getElementById("tz").selectedIndex<1)
	//	document.getElementById("tz").selectedIndex=39;
	//changeTZ();
	//tick();


}

function TimeAdd(UTC,T)
{
	var PlusMinus, DST, y;
	//alert(T);
	alert(UTC);
	if (T.substr(0,1) == "-"){
		PlusMinus = -1;
	}
	else{
		PlusMinus = 1;
	}
	//UTC = UTC.substr(1
}
