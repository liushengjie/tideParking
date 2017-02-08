
exports.jsonToVal = (json) => {
    var ret = "";
    console.log(JSON.stringify(json))
    for(var key in json){
        ret += key + "='" + json[key] + "' and ";
    }
    return ret.substring(0,ret.length-4);
}

exports.removeJsonItem = (json,name) => {
	for(var key in json){
        if(key == name){
        	delete json[key]
        	break
        }
    }
}

exports.uuid = () => {
	var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 32; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    
    var uuid = s.join("");
    return uuid;
}

exports.generateMixed = (n) => {
	var chars = ['0','1','2','3','4','5','6','7','8','9'];
	var res = "";
    for(var i = 0; i < n ; i ++) {
        var id = Math.ceil(Math.random()*9);
        res += chars[id];
    }
    return res;
}

exports.getNowFormatDate = (fmt,n = 0) => {
	var date = new Date();
	var o = {         
	    "M+" : date.getMonth()+1, //月份         
	    "d+" : date.getDate(), //日         
	    "h+" : date.getHours()%12 == 0 ? 12 : date.getHours()%12, //小时         
	    "H+" : date.getHours(), //小时         
	    "m+" : date.getMinutes() + n, //分         
	    "s+" : date.getSeconds(), //秒         
	    "q+" : Math.floor((date.getMonth()+3)/3), //季度         
	    "S" : date.getMilliseconds() //毫秒         
    };         
    var week = {         
	    "0" : "/u65e5",         
	    "1" : "/u4e00",         
	    "2" : "/u4e8c",         
	    "3" : "/u4e09",         
	    "4" : "/u56db",         
	    "5" : "/u4e94",         
	    "6" : "/u516d"        
    };         
    if(/(y+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));         
    }         
    if(/(E+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[date.getDay()+""]);         
    }         
    for(var k in o){         
        if(new RegExp("("+ k +")").test(fmt)){         
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
        }         
    }         
    return fmt;        
}
