$(function(){
	var str='';
		str+='<div class="f_left">';
		str+='<h1>巴歌出行</h1>';
		str+='<ul>';
		str+='<li><a href="javascript:;" class="introduce">公司介绍</a></li>';
		str+='<li><a href="javascript:;" class="openCity">开放城市</a></li>';
		str+='<li><a href="javascript:;" class="mediaCoverage">媒体报道</a></li>';
		str+='<li><a href="javascript:;" class="join_bussiness">招商加盟</a></li>';
		str+='<li><a href="javascript:;" class="strategy">使用攻略</a></li>';
		str+='<li><a href="javascript:;" class="concat_bus">联系我们</a></li>';
		str+='</ul></div>';
		str+='<div class="f_center">';
		str+='<h1><a href="question.html">常见问题解答</a></h1>';
		str+='<ul>';
		str+='<li>客服电话<span>400-090-1619</span></li>';
		str+='<li>商务合作<span>marketing@bagechuxing.cn</span></li>';
		str+='<li>市场电话<span>010-56076982</span></li>';
		str+='<li>加盟电话<span>010-56038637</span></li>';
		str+='</ul></div>';
		str+='<div class="f_right">';
		str+='<h1>巴歌出行微信公众号：BAGESHARE</h1>';
		str+='<ul>';
		str+='<li>更多活动请关注“巴歌出行订阅号”</li>';
		str+='<li><img src="img/code.png" alt=""></li>';
		str+='</ul></div>';

		$(".footer .content").append(str);
})