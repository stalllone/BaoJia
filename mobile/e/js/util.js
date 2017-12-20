/*
* copyright:feimizi
* author:wangst
* version:20150512
*/
	var guangquandlUrl={
		"android":"http://www.guangquaner.com/cms/app_version.htm?version=0&canal=00000000",
		"ios":"https://itunes.apple.com/cn/app/guang-quan/id983467128?ls=1&mt=8"
	}
	var guangquan= guangquan|| {};
	guangquan.util={};
	guangquan.util.getPlatform=function(){
		var browser = {
			versions: function() {
				var u = navigator.userAgent, app = navigator.appVersion;
				return {//移动终端浏览器版本信息 
					trident: u.indexOf('Trident') > -1, //IE内核
					presto: u.indexOf('Presto') > -1, //opera内核
					webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
					gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
					mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
					ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
					android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
					iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
					iPad: u.indexOf('iPad') > -1, //是否iPad
					webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
					mac:u.indexOf('Mac')>-1,//是否为macos
				};
			}(),
			language: (navigator.browserLanguage || navigator.language).toLowerCase()
			}

			var platform = "ios";
			//check platform 
			if (browser.versions.iPhone || browser.versions.iPad && browser.versions.mobile) {
				platform = "ios";	
			}
			else if (browser.versions.android) {
				platform = "android";
			}else{
				platform = "other";
			}

			return platform;
	}
	
	guangquan.util.checkWeixin=function(){
		var b = false;
		function is_weixin() {
		    var ua = navigator.userAgent.toLowerCase();
		    if (ua.match(/MicroMessenger/i) == "micromessenger") {
		        return true;
		    } else {
		        return false;
		    }
		}
		var cssText = "#weixin-tip{position: fixed; left:0; top:0; background: rgba(0,0,0,0.8); filter:alpha(opacity=80); width: 100%; height:100%; z-index: 100;} #weixin-tip p{text-align: center; margin-top: 0%; padding:0 2%;}";
		
		var isWeixin = is_weixin();
		var winHeight = typeof window.innerHeight != 'undefined' ? window.innerHeight : document.documentElement.clientHeight;
		function loadHtml(){
			var div = document.createElement('div');
			div.id = 'weixin-tip';
			div.style.display="none";
			div.innerHTML = '<p><img style="width:100%" src="/commen/img/wxblock.png" alt="微信打开"/></p>';
			document.body.appendChild(div);
			div.onclick=function(){
				this.style.display="none";
			}
		}
		
		function loadStyleText(cssText) {
	        var style = document.createElement('style');
	        style.rel = 'stylesheet';
	        style.type = 'text/css';
	        try {
	            style.appendChild(document.createTextNode(cssText));
	        } catch (e) {
	            style.styleSheet.cssText = cssText; //ie9以下
	        }
            var head=document.getElementsByTagName("head")[0]; //head标签之间加上style样式
            head.appendChild(style); 
	    }
	    
	    b = is_weixin();

		if(b){
			loadHtml();
			loadStyleText(cssText);
		}

		return b;
	}

	//安卓下载地址
	guangquan.util.androiddl = "javascrpt:;";
	guangquan.util.getLatestVersion=function(callback){

		$.get(guangquandlUrl.android,function(result){
			if(result.status==200){
				callback(result);
			}else{
		    	alert("Android版本敬请期待!");
		    }
			
		});
	}

	guangquan.util.downloadAndroid=function(){

		guangquan.util.getLatestVersion(function(data){

			 if(data.status==200){ 
			 		
		        	var inputs = '';
		        	var appdl = data.data.appinfo.url;
		            inputs+='<input type="hidden" name="" />'; 
		            // request发送请求
					$('<form action="'+appdl+'" method="get"> </form>')
		        .appendTo('body').submit().remove();
		    }
		
		});
	}

	guangquan.util.clickDownloadCallback=function(e){
		var pl = guangquan.util.getPlatform();
		if (guangquan.util.checkWeixin()) {
				//document.getElementById('weixin-tip').style.display="block";
				window.location.href="http://a.app.qq.com/o/simple.jsp?pkgname=com.guangquaner";
				e.preventDefault();
				return false;
			};
		if (pl=="other") {
			//其他平台都跳转到官网
			e.preventDefault();
			window.location.href="http://www.guangquaner.com";
			return false;
		};
		if(pl=="android") {
			guangquan.util.downloadAndroid();
			e.preventDefault();
			return false;
		}else if (pl=="ios") {
			window.location.href=guangquandlUrl.ios;
			e.preventDefault();
			return false;
		};
	}