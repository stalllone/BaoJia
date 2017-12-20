$(function(){
	var str="";
		str+='<div class="nav">';
		str+=' <p>';
		str+='<img src="img/m-logo.png" alt="">';
		str+='<a href="javascript:;" class="menu">';
		str+='<img src="img/m-menu.png" alt="" class="visib"><img src="img/close.png" alt="" class="close" style="display:none">';
		str+='</a></p>';
		str+='<ul>';
		str+='<li><a href="javascript:;" class="home">首页</a></li>';
		str+='<li><a href="javascript:;" class="introduce">公司介绍</a></li>';
		str+='<li><a href="javascript:;" class="openCity">开放城市</a></li>';
		str+='<li><a href="javascript:;" class="mediaCoverage">媒体报道</a></li>';
		str+='<li><a href="javascript:;" class="join_bussiness">招商加盟</a></li>';
		str+='<li><a href="javascript:;" class="strategy">使用攻略</a></li>';
		str+='<li><a href="javascript:;" class="concat_bus">联系我们</a></li>';
		str+='<li><a href="javascript:;" class="question">常见问题解答</a></li>';
		str+='</ul></div>';
		$(".m-top").append(str);
	
        $(".menu").click(function(){
            if($(".nav ul").is(':visible')){
                $(".nav ul").css({"display":"none"});
                $(".visib").css({"display":"block"});
                $(".close").css({"display":"none"});
                move();
            }else{
                $(".nav ul").css({"display":"block"});
                 $(".close").css({"display":"block"});
                 $(".visib").css({"display":"none"});
                stop();
            }
        });
})