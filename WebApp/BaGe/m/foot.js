$(function(){
	var str="";
		str+='<div class="f_nav">';
		str+='<ul>';
		str+='<li class="f_title"><a href="javascript:;">巴歌出行</a></li>';
		str+='<li><a href="javascript:;" class="introduce">公司介绍</a></li>';
		str+='<li><a href="javascript:;" class="openCity">开放城市</a></li>';
		str+='<li><a href="javascript:;" class="mediaCoverage">媒体报道</a></li>';
		str+='<li><a href="javascript:;" class="join_bussiness">招商加盟</a></li>';
		str+='<li><a href="javascript:;" class="strategy">使用攻略</a></li>';
		str+='<li><a href="javascript:;" class="concat_bus">联系我们</a></li>';
		str+='</ul>';
		str+='<ul>';
		str+='<li class="f_sectit"><a href="question.html">常见问题解答</a></li>';
		str+='<li><span>客服电话</span><a href="javascript:;">400-090-1619</a></li>';
		str+='<li><span>商务合作</span><a href="javascript:;">marketing@bagechuxing.cn</a></li>';
		str+='<li><span>市场电话</span><a href="javascript:;">010-56076982</a></li>';
		str+='<li><span>加盟电话</span><a href="javascript:;">010-56038637</a></li>';
		str+='</ul></div>';
		str+='<div class="f_foot">';
		str+='<dl>';
		str+=' <dt><img src="img/f_foot.png" alt=""></dt>';
		str+='<dd>';
		str+='<p>更多活动请关注“巴歌出行订阅号”</p><p>巴歌出行微信公众号：BAGESHARE</p>';
		str+='</dd>';
		str+='</dl>';
		str+='</div>';
		$(".footer .content").append(str);

})