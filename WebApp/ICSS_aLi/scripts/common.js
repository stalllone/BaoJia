if (!Date.prototype.Format) {
    Date.prototype.Format = function(fmt) { //author: meizz 
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
}


if (!Date.prototype.AddDay) {
    Date.prototype.AddDay = function(days,fmt) { //author:  
        var data = new Date(this.getTime() + 1000 * 60 * 60 * 24 * days);
        if(fmt==undefined || fmt=="") fmt = "yyyy-MM-dd";
        return data.Format(fmt);
    };
}

if (!String.prototype.Format) {
    String.prototype.Format = function() {
        var args = arguments;
        return this.replace(/\{(\d+)\}/g,
            function(m, i) {
                return args[i];
            });
    }
}

if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(args) {
        var index = -1;
        for (var i = 0, l = this.length; i < l; i++) {
            if (this[i] === args) { index = i;
                break; }
        }
        return index;
    }
}

//V2 static   用法   var str="{0}ccfs,{1}dvaff";  str =  String.Format(str,"1","2","3")
String.IsNullOrEmpty = function() {
    if (arguments.length == 0)
        return true;
    var str = arguments[0];
    return str = null || str == "undefined" || str == "";
}

var jsTools = {
    getAppRootPath: function() {
        var strFullPath = window.document.location.href;
        var strPath = window.document.location.pathname;
        var pos = strFullPath.indexOf(strPath);
        var prePath = strFullPath.substring(0, pos);
        var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
        return prePath + postPath + "/";
    },
    getRequestArg: function(val) {
        var uri = window.location.search;
        var re = new RegExp("" + val + "=([^&?]*)", "ig");
        return unescape(((uri.match(re)) ? (uri.match(re)[0].substr(val.length + 1)) : null));
    },
    getPreDayStr: function(days) {
        // 昨天
        var yesterday = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * days);
        var yue = ("0" + (yesterday.getMonth() + 1)).slice(-2);
        var ri = ("0" + yesterday.getDate()).slice(-2);
        return yesterday.getFullYear() + "年" + yue + "月" + ri + "日";
    },
    //当前窗口的有效可视宽度和高度
    getDocumentWH: function() {
        var winW, winH; //当前窗口的有效可视宽度和高度
        if (window.innerHeight) { //所有非IE浏览器
            winW = window.innerWidth;
            winH = $(window).height();
        } else if (document.documentElement && document.documentElement.clientHeight) { //IE 6 Strict Mode
            winW = document.documentElement.clientWidth;
            winH = document.documentElement.clientHeight;
        } else if (document.body) { //其他浏览器
            winW = document.body.clientWidth;
            winH = document.body.clientHeight;
        }
        return {
            WinW: winW, //真正反馈的宽度
            WinH: winH //真正反馈的高度
        };
    },
    // 获取页面的高度、宽度
    getPageSize: function() {
        var xScroll, yScroll;
        if (window.innerHeight && window.scrollMaxY) {
            xScroll = window.innerWidth + window.scrollMaxX;
            yScroll = window.innerHeight + window.scrollMaxY;
        } else {
            if (document.body.scrollHeight > document.body.offsetHeight) { // all but Explorer Mac 
                xScroll = document.body.scrollWidth;
                yScroll = document.body.scrollHeight;
            } else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari  
                xScroll = document.body.offsetWidth;
                yScroll = document.body.offsetHeight;
            }
        }

        var windowWidth, windowHeight;
        if (self.innerHeight) { // all except Explorer 
            if (document.documentElement.clientWidth) {
                windowWidth = document.documentElement.clientWidth;
            } else {
                windowWidth = self.innerWidth;
            }
            windowHeight = self.innerHeight;
        } else {
            if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode  
                windowWidth = document.documentElement.clientWidth;
                windowHeight = document.documentElement.clientHeight;
            } else {
                if (document.body) { // other Explorers    
                    windowWidth = document.body.clientWidth;
                    windowHeight = document.body.clientHeight;
                }
            }
        }

        // for small pages with total height less then height of the viewport
        if (yScroll < windowHeight) {
            pageHeight = windowHeight;
        } else {
            pageHeight = yScroll;
        }

        // for small pages with total width less then width of the viewport  
        if (xScroll < windowWidth) {
            pageWidth = xScroll;
        } else {
            pageWidth = windowWidth;
        }
        return {
            pageW: pageWidth,
            pageH: pageHeight,
            windW: windowWidth, //真正反馈的宽度
            windH: windowHeight //真正反馈的高度
        };
    },
};
