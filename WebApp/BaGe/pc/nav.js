$(function(){
	var str='';
		str+='<div class="logo"><img src="img/logo.png" alt=""></div>';
		str+='<div class="list_nav"><ul class="cl">';
		str+='<li><a href="javascript:;" class="home on">首页</a></li>';
		str+='<li><a href="javascript:;" class="introduce">公司介绍</a></li>';
		str+='<li><a href="javascript:;" class="openCity">开放城市</a></li>';
		str+='<li><a href="javascript:;" class="mediaCoverage">媒体报道</a></li>';
		str+='<li><a href="javascript:;" class="join_bussiness">招商加盟</a></li>';
		str+='<li><a href="javascript:;" class="strategy">使用攻略</a></li>';
		str+='<li><a href="javascript:;" class="question">常见问题解答</a></li>';
		str+='<li><a href="javascript:;" class="concat_bus">联系我们</a></li>';
		str+='</ul></div>';
		$(".nav").append(str);

})