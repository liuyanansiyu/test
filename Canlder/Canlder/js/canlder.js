var Canlder = {};

//150年内的阴历数据,下面共15行，每行10个数据。每个数据代表一年，从阳历1900.1.31日起，为第一个数据年的开始，
//即阳历1900.1.31＝阴历0.1.1。150个数据可推150年的阴历，因此目前最大只能推算到2049年，以后的推导，还需要从天文台得到新的数据后才能推导，否则将出现误差
Canlder.lunarInfo = new Array(
	0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950, 0x16554, 0x056a0, 0x09ad0, 0x055d2,
	0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250, 0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977,
	0x04970, 0x0a4b0, 0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
	0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0, 0x1c8d7, 0x0c950,
	0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0, 0x092d0, 0x0d2b2, 0x0a950, 0x0b557,
	0x06ca0, 0x0b550, 0x15355, 0x04da0, 0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0,
	0x0aea6, 0x0ab50, 0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
	0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540, 0x0b5a0, 0x195a6,
	0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50, 0x06d40, 0x0af46, 0x0ab60, 0x09570,
	0x04af5, 0x04970, 0x064b0, 0x074a3, 0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0,
	0x0c960, 0x0d954, 0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
	0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176, 0x052b0, 0x0a930,
	0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6, 0x0a4e0, 0x0d260, 0x0ea65, 0x0d530,
	0x05aa0, 0x076a3, 0x096d0, 0x04bd7, 0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45,
	0x0b5a0, 0x056d0, 0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0);
//阳历月
Canlder.solarMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
//二十四节气
Canlder.solarTerm = new Array("小寒", "大寒", "立春", "雨水", "惊蛰", "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分", "寒露", "霜降", "立冬", "小雪", "大雪", "冬至");
//距离小寒节气的时间差(分钟)
Canlder.sTermInfo = new Array(0, 21208, 42467, 63836, 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343, 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224, 483532, 504758);
Canlder.nStr1 = new Array('日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十');
Canlder.nStr2 = new Array('初', '十', '廿', '卅', '');
//国历节日 *表示放假日
Canlder.sFtv = new Array(
	"0101*元旦",
	"0214 情人节",
	"0308 妇女节",
	"0312 植树节",
	"0315 消费者权益日",
	"0401 愚人节",
	"0501*劳动节",
	"0504 青年节",
	"0512 护士节",
	"0601 儿童节",
	"0701 建党节 香港回归纪念",
	"0801 建军节",
	"0909 毛泽东逝世纪念",
	"0910 教师节",
	"0928 孔子诞辰",
	"1001*国庆节",
	"1006 老人节",
	"1024 联合国日",
	"1112 孙中山诞辰纪念",
	"1220 澳门回归纪念",
	"1225 圣诞节",
	"1226 毛泽东诞辰纪念");
//农历节日 *表示放假日
Canlder.lFtv = new Array(
	"0101*春节",
	"0102*初二",
	"0115 元宵节",
	"0505*端午节",
	"0707 七夕情人节",
	"0715 中元节",
	"0815*中秋节",
	"0909 重阳节",
	"1208 腊八节",
	"1223 小年",
	"0100*除夕");
Canlder.wFtv = new Array("0520 母亲节", "0630 父亲节");

Canlder.cld;
Canlder.CLD;
Canlder.Today = new Date();
Canlder.tY = Canlder.Today.getFullYear();
Canlder.tM = Canlder.Today.getMonth();
Canlder.tD = Canlder.Today.getDate();

/**
 * 传回农历 y年的总天数
 * @param {Object} y
 */
Canlder.lYearDays = function(y) {
	var sum = 348;
	for (var i = 0x8000; i > 0x8; i >>= 1) {
		sum += (Canlder.lunarInfo[y - 1900] & i) ? 1 : 0;
	}
	return (sum + Canlder.leapDays(y));
}

/**
 * 传回农历 y年闰月的天数
 * @param {Object} y
 */
Canlder.leapDays = function(y) {
	if (Canlder.leapMonth(y)) {
		return ((Canlder.lunarInfo[y - 1900] & 0x10000) ? 30 : 29);
	} else {
		return (0);
	}
}

/**
 * 传回农历 y年闰哪个月 1-12 , 没闰传回 0
 * @param {Object} y
 */
Canlder.leapMonth = function(y) {
	return (Canlder.lunarInfo[y - 1900] & 0xf);
}

/**
 * 传回农历 y年m月的总天数(月大30天,月小29天)
 * @param {Object} y
 * @param {Object} m
 */
Canlder.monthDays = function(y, m) {
	return ((Canlder.lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29);
}

/**
 * 算出农历, 传入阳历日期对象, 传回农历日期对象(属性: .year .month .day .isLeap .yearCyl .dayCyl .monCyl)
 * @param {Object} objDate
 */
Canlder.Lunar = function(objDate) {
		var i;
		var leap = 0;
		var temp = 0;
		//从阳历1900.1.31日起，为第一个数据年的开始
		var baseDate = new Date(1900, 0, 31);
		var offset = (objDate - baseDate) / 86400000;
		this.dayCyl = offset + 40;
		this.monCyl = 14;
		for (i = 1900; i < 2050 && offset > 0; i++) {
			temp = Canlder.lYearDays(i);
			offset -= temp;
			this.monCyl += 12;
		}
		if (offset < 0) {
			offset += temp;
			i--;
			this.monCyl -= 12;
		}
		this.year = i;
		this.yearCyl = i - 1864;
		//闰哪个月
		leap = Canlder.leapMonth(i);
		this.isLeap = false;
		for (i = 1; i < 13 && offset > 0; i++) {
			//闰月
			if (leap > 0 && i == (leap + 1) && this.isLeap == false) {
				--i;
				this.isLeap = true;
				temp = Canlder.leapDays(this.year);
			} else {
				temp = Canlder.monthDays(this.year, i);
			}
			//解除闰月
			if (this.isLeap == true && i == (leap + 1)) {
				this.isLeap = false;
			}
			offset -= temp;
			if (this.isLeap == false) {
				this.monCyl++;
			}
		}
		if (offset == 0 && leap > 0 && i == leap + 1)
			if (this.isLeap) {
				this.isLeap = false;
			} else {
				this.isLeap = true;
				--i;
				--this.monCyl;
			}
		if (offset < 0) {
			offset += temp;
			--i;
			--this.monCyl;
		}
		this.month = i;
		this.day = offset + 1;
	}
	/**
	 * 计算阳历月(主要是2月)
	 * @param {Object} y
	 * @param {Object} m
	 */

Canlder.solarDays = function(y, m) {
	if (m == 1) {
		return (((y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0)) ? 29 : 28);
	} else {
		return (Canlder.solarMonth[m]);
	}
}

Canlder.calElement = function(sYear, sMonth, sDay, week, lYear, lMonth, lDay, isLeap, cYear, cMonth, cDay) {
	this.isToday = false;
	this.sYear = sYear;
	this.sMonth = sMonth;
	this.sDay = sDay;
	this.week = week;
	this.lYear = lYear;
	this.lMonth = lMonth;
	this.lDay = lDay;
	this.isLeap = isLeap;
	this.cYear = cYear;
	this.cMonth = cMonth;
	this.cDay = cDay;
	this.color = '';
	this.lunarFestival = '';
	this.solarFestival = '';
	this.solarTerms = '';
}

Canlder.sTerm = function(y, n) {
	//1900年小寒时刻为1月6日2:05:00，以这个节气时刻为基准，推算其它年份节气
	var offDate = new Date((31556925974.7 * (y - 1900) + Canlder.sTermInfo[n] * 60000) + Date.UTC(1900, 0, 6, 2, 5));
	return (offDate.getUTCDate());
}

Canlder.calendar = function(y, m) {
	var lY;
	var lM;
	var lD = 1;
	var lL;
	var lX = 0;
	var lDPOS = new Array(3);
	var n = 0;
	var firstLM = 0;
	var LDObj;
	var sDObj = new Date(y, m, 1);
	this.length = Canlder.solarDays(y, m);
	this.firstWeek = sDObj.getDay();
	for (var i = 0; i < this.length; i++) {
		if (lD > lX) {
			Canlder.sDObj = new Date(y, m, i + 1)
			lDObj = new Canlder.Lunar(sDObj);
			lY = lDObj.year;
			lM = lDObj.month;
			lD = lDObj.day;
			lL = lDObj.isLeap;
			lX = lL ? Canlder.leapDays(lY) : Canlder.monthDays(lY, lM);
			if (n == 0) firstLM = lM;
			lDPOS[n++] = i - lD + 1;
		}
		this[i] = new Canlder.calElement(y, m + 1, i + 1, Canlder.nStr1[(i + this.firstWeek) % 7], lY, lM, lD++, lL, "", "", "");
		if ((i + this.firstWeek) % 7 == 0) this[i].color = "#FF5F08"; //'#FF5F07'	 
		if ((i + this.firstWeek) % 14 == 6) {
			this[i].color = "green";
		}
		if ((i + this.firstWeek) % 14 == 13) {
			this[i].color = "#FF5F08";
		}
	}
	var tmp1 = Canlder.sTerm(y, m * 2) - 1;
	var tmp2 = Canlder.sTerm(y, m * 2 + 1) - 1;
	this[tmp1].solarTerms = Canlder.solarTerm[m * 2];
	this[tmp2].solarTerms = Canlder.solarTerm[m * 2 + 1];
	if (m == 3) {
		this[tmp1].color = "#FF5F08";
	} //清明节
	for (i in Canlder.sFtv) {
		if (Canlder.sFtv[i].match(/^(\d{2})(\d{2})([\s\*])(.+)$/)) {
			if (Number(RegExp.$1) == (m + 1)) {
				var fes = Canlder.isLeg(RegExp.$4, y);
				if (fes == "") {
					continue;
				}
				this[Number(RegExp.$2) - 1].solarFestival += fes + ' ';
				if (RegExp.$3 == '*') {
					this[Number(RegExp.$2) - 1].color = '#FF5F08';
				}
			}
		}
	}
	for (i in Canlder.wFtv) {
		if (Canlder.wFtv[i].match(/^(\d{2})(\d)(\d)([\s\*])(.+)$/)) {
			if (Number(RegExp.$1) == (m + 1)) {
				tmp1 = Number(RegExp.$2);
				tmp2 = Number(RegExp.$3);
				this[((this.firstWeek > tmp2) ? 7 : 0) + 7 * (tmp1 - 1) + tmp2 - this.firstWeek].solarFestival += RegExp.$5 + ' ';
			}
		}
	}
	for (i in Canlder.lFtv) {
		if (Canlder.lFtv[i].match(/^(\d{2})(.{2})([\s\*])(.+)$/)) {
			tmp1 = Number(RegExp.$1) - firstLM
			if (tmp1 == -11) tmp1 = 1
			if (tmp1 >= 0 && tmp1 < n) {
				tmp2 = lDPOS[tmp1] + Number(RegExp.$2) - 1;
				if (tmp2 >= 0 && tmp2 < this.length) {
					this[tmp2].lunarFestival += RegExp.$4 + ' ';
					if (RegExp.$3 == '*') {
						this[tmp2].color = '#FF5F08';
					}
				}
			}
		}
	}
	if (y == Canlder.tY && m == Canlder.tM) {
		this[Canlder.tD - 1].isToday = true;
	}
}

Canlder.cDay = function(d) {
	var s;
	switch (d) {
		case 10:
			s = '初十';
			break;
		case 20:
			s = '二十';
			break;
			break;
		case 30:
			s = '三十';
			break;
		default:
			s = Canlder.nStr2[Math.floor(d / 10)];
			s += Canlder.nStr1[d % 10];
	}
	return (s);
}


Canlder.drawCld = function(SY, SM) {
	var sD, s, size;
	if (Canlder.SY == "undefined") {
		debugger;
	}
	Canlder.cld = new Canlder.calendar(SY, SM);

	var dayStr = "";
	var nlStr = "";
	for (var i = 0; i < 42; i++) {
		dayStr = "";
		nlStr = "";
		Canlder.sObj = Canlder.$('SD' + i);
		Canlder.sObj.style.background = '';
		sD = i - Canlder.cld.firstWeek;
		if (sD == "undefined" || sD == undefined) {
			debugger;
		}
		if (sD > -1 && sD < Canlder.cld.length) {
			dayStr = sD + 1;
			if (dayStr == "undefined" || dayStr == undefined) {
				debugger;
			}
			if (Canlder.cld[sD].isToday) {
				//当天
				Canlder.sObj.style.background = '#9BEDFB';
			}
			Canlder.sObj.style.color = Canlder.cld[sD].color;
			if (Canlder.cld[sD].lDay == 1) {
				//农历月大月小
				//nlStr = '<b>' + (cld[sD].isLeap ? '闰' : '') + cld[sD].lMonth + '月' + (monthDays(cld[sD].lYear, cld[sD].lMonth) == 29 ? '小' : '大') + '</b>';
				nlStr = '<b>' + (Canlder.cld[sD].isLeap ? '闰' : '') + Canlder.cld[sD].lMonth + '月' + '</b>';
			} else {
				nlStr = Canlder.cDay(Canlder.cld[sD].lDay);
			}
			//传统农历节日(端午,中秋等)
			s = Canlder.cld[sD].lunarFestival;
			if (s && s.length > 0) {
				if (s.length > 5) {
					s = s.substr(0, 3) + '…';
				}
				s = "<span style='font-size:12px;color:#FF5F07'>" + s + "</span>";
			} else {
				//阳历节日
				s = Canlder.cld[sD].solarFestival;
				if (s.length > 0) {
					size = (s.charCodeAt(0) > 0 && s.charCodeAt(0) < 128) ? 8 : 4;
					if (s.length > size + 1) {
						s = s.substr(0, size - 1) + '…';
					}
					s = "<span style='color:blue;font-size:12px;'>" + s + "</span>"; //s.fontcolor('0168EA');
				} else {
					//农历二十四节气
					s = Canlder.cld[sD].solarTerms;
					if (s.length > 0) {
						s = s = "<span style='color:green;font-size:12px;'>" + s + "</span>";
					}
				}
			}
			if (s.length > 0) {
				Canlder.sObj.innerHTML = "<div id='day" + i + "'>" + dayStr + "</div><div>" + s + "</div>";
			} else {
				Canlder.sObj.innerHTML = "<div id='day" + i + "'>" + dayStr + "</div><div style='font-size:12px;'>" + nlStr + "</div>";
			}
		} else {
			Canlder.sObj.innerHTML = ' ';
		}
	}
}

Canlder.changeCld = function() {
		var y = Canlder.CLD.SY.selectedIndex + 1900;
		var m = Canlder.CLD.SM.selectedIndex;
		Canlder.drawCld(y, m);
	}
	/**
	 * 导航菜单(上月,下月,今日...)
	 * @param {Object} K
	 */

Canlder.pushBtm = function(K) {
	switch (K) {
		case 'YU': //上年
			if (Canlder.CLD.SY.selectedIndex > 0) {
				Canlder.CLD.SY.selectedIndex--;
			}
			break;
		case 'YD': //下年
			if (Canlder.CLD.SY.selectedIndex < 149) {
				Canlder.CLD.SY.selectedIndex++;
			}
			break;
		case 'MU': //上月
			if (Canlder.CLD.SM.selectedIndex > 0) {
				Canlder.CLD.SM.selectedIndex--;
			} else {
				Canlder.CLD.SM.selectedIndex = 11;
				if (Canlder.CLD.SY.selectedIndex > 0) {
					Canlder.CLD.SY.selectedIndex--;
				}
			}
			break;
		case 'MD': //下月
			if (Canlder.CLD.SM.selectedIndex < 11) {
				Canlder.CLD.SM.selectedIndex++;
			} else {
				Canlder.CLD.SM.selectedIndex = 0;
				if (Canlder.CLD.SY.selectedIndex < 149) {
					Canlder.CLD.SY.selectedIndex++;
				}
			}
			break;
		default: //今日
			Canlder.CLD.SY.selectedIndex = Canlder.tY - 1900;
			Canlder.CLD.SM.selectedIndex = Canlder.tM;
	}
	Canlder.changeCld();
}

Canlder.$ = function(sId) {
		return document.getElementById(sId);
	}
	/**
	 * 点击日期事件
	 * @param {Object} id 日期控件的索引
	 */

Canlder.checkDay = function(id) {
		var yearObj = Canlder.$("SY");
		var index1 = yearObj.selectedIndex; // 选中索引
		var year = yearObj.options[index1].text; // 选中文本
		var monthObj = Canlder.$("SM");
		var index2 = monthObj.selectedIndex; // 选中索引
		var month = monthObj.options[index2].text; // 选中文本
		var day = Canlder.$("day" + id);
		if (day) {
			console.log("checkDay : " + year + "-" + month + "-" + day.innerHTML);
		}
	}
	/**
	 *
	 * 鼠标移入事件
	 * @param {Object} v
	 */

Canlder.mOvr = function(v) {
		var day = Canlder.$("day" + v);
		if (day) {
			Canlder.$('SD' + v).style.backgroundColor = "#DEFDFD";
		}
	}
	/**
	 * 鼠标移出
	 * @param {Object} event
	 */

Canlder.mOut = function(v) {
	var sObj = Canlder.$('SD' + v);
	var yearObj = Canlder.$("SY");
	var index1 = yearObj.selectedIndex; // 选中索引
	var year = yearObj.options[index1].text; // 选中文本
	var monthObj = Canlder.$("SM");
	var index2 = monthObj.selectedIndex; // 选中索引
	var month = monthObj.options[index2].text; // 选中文本
	var day = Canlder.$("day" + v);
	if (day) {
		var thisDay = year + "-" + month + "-" + day.innerHTML;
		var d = new Date();
		var today = (d.getYear() + 1900) + "-" + (d.getMonth() + 1) + "-" + d.getDate();
		if (thisDay == today) {
			sObj.style.backgroundColor = "#9BEDFB";
		} else {
			sObj.style.backgroundColor = "#FFFFFF";
		}
	}
}


Canlder.initial = function() {
	Canlder.CLD = Canlder.$("CLD");
	Canlder.CLD.SY.selectedIndex = Canlder.tY - 1900;
	Canlder.CLD.SM.selectedIndex = Canlder.tM;
	Canlder.drawCld(Canlder.tY, Canlder.tM);
}

Canlder.isLeg = function(fes, y) {
	y = y - 0;
	switch (fes) {
		case "妇女节":
			if (y < 1911) fes = "";
			break;
		case "植树节":
			if (y < 1979) fes = "";
			break;
		case "消费者权益日":
			if (y < 1988) fes = "";
			break;
		case "愚人节":
			if (y < 1564) fes = "";
			break;
		case "劳动节":
			if (y < 1890) fes = "";
			break;
		case "青年节":
			if (y < 1950) fes = "";
			break;
		case "护士节":
			if (y < 1912) fes = "";
			break;
		case "建党节 香港回归纪念":
			if (y < 1911) {
				fes = "";
			} else if (y > 1920 && y < 1997) {
				fes = "建党节";
			} else {
				fes = "建党纪念日/香港回归纪念日";
			}
			break;
		case "毛泽东逝世纪念":
			if (y < 1976) fes = "";
			break;
		case "教师节":
			if (y < 1985) fes = "";
			break;
		case "国庆节":
			if (y < 1949) fes = "";
			break;
		case "联合国日":
			if (y < 1945) fes = "";
			break;
		case "孙中山诞辰纪念":
			if (y < 1966) fes = "";
			break;
		case "澳门回归纪念":
			if (y < 1999) fes = "";
			break;
		case "毛泽东诞辰纪念":
			if (y < 1893) fes = "";
			break;
	}
	return fes;
}