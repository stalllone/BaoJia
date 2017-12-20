
var imgurl="../../images/m-160513/";
var scrArr=[["top1.png","top11.png","navHuoDong"],["top3.png","top33.png","navCheXing"],["top2.png","top22.png",]];
$(function(){  
    /*头部 动态效果和定位*/      
    var topht= $(".fixtop").height();
        $(".huodong").click(function(){
            $(this).find('.accur').css("display","none").next().css("display","block");
            $(this).siblings().find('.accur').css("display","block").next().css("display","none");
            $('html,body').animate({scrollTop:$("#navHuoDong").offset().top-topht}, 600);
        });
        $(".youshi").click(function(){
            $(this).find('.accur').css("display","none").next().css("display","block");
            $(this).siblings().find('.accur').css("display","block").next().css("display","none");
            $('html,body').animate({scrollTop:$("#navCheXing").offset().top-topht}, 600);
        });
        $(".loaded").click(function(){
            $(this).find('.accur').css("display","none").next().css("display","block");
            $(this).siblings().find('.accur').css("display","block").next().css("display","none");
        });
        $(document).on("click",function(event){
            if($(event.target).parents(".bt").length==0)
            $(".bt .accur").css("display","block").next().css("display","none");
        });
    $(".footer").click(function(){ 
        var height=$(".f_word").height();
        var height1=$("#btnReg").height();
        var top=$('.divReg').offset().top; 
        var height2=top-height1-height1;        
        $('html,body').animate({scrollTop:height2}, 600);
        // alert(height1);

    });
/*头部 底部自动隐藏*/
    var wht = $(window).height();
    var dht = $(document).height();
    var dtp = 0;
    var scroll_top = $(document).scrollTop(); 
    var reght =$(".divReg").height(); //输入表单高度
    var botht = $(".fixbottom").height(); //输入表单高度 $(".divReg").position().top;
    setInterval(function() {
        dht = $(document).height();
        dtp = $(document).scrollTop(); //当前停留高度  
        if (dtp < 50) {
            $(".fixtop").slideUp(200);       
        } else {
            $(".fixtop").slideDown(100); 
        }
         // console.log(dtp +":::"+ dht +":::"+ reght +":::"+ wht +":::"+ botht +"sss"+ (dht - reght - wht + botht - dtp))    
    }, 300);
})
$(window).scroll(function(){
　　var scrollTop = $(this).scrollTop();
　　var scrollHeight = $(document).height();
　　var windowHeight = document.body.clientHeight;
　　if(scrollTop + windowHeight == scrollHeight){
　　　　$(".fixbottom").css("display","none")
　　}else{
    $(".fixbottom").css("display","block")
}
});
/*滚屏效果*/
var everyTime = 2000;
var speed = 200;
$(function() {
    var setHeight = function() {
        var width = $("#scroll").width();
        var height = width / (640 / 310)
        $("#scroll").height(height);
    }
    setHeight()

    $(window).on("resize", function() {
        setHeight()

    })
    var $dragBln = false;

    $("#scroll .main_image").touchSlider({
        flexible: true,
        speed: speed,
        btn_prev: $("#scroll #btn_prev"),
        btn_next: $("#scroll #btn_next"),
        paging: $("#scroll .flicking_con a"),
        counter: function(e) {
            $("#scroll .flicking_con a").removeClass("on").eq(e.current - 1).addClass("on");
        }
    });

    $("#scroll .main_image").bind("mousedown", function() {
        $dragBln = false;
    });

    $("#scroll .main_image").bind("dragstart", function() {
        $dragBln = true;
    });

 
    $("#scroll .main_image a").click(function() {
        if ($dragBln) {
            return false;
        }
    });

    var timer = setInterval(function() {
        $("#scroll #btn_next").click();
    }, everyTime);

    $("#scroll").hover(function() {
        clearInterval(timer);
    }, function() {
        timer = setInterval(function() {
            $("#scroll #btn_next").click();
        }, everyTime);
    });

    $("#scroll .main_image").bind("touchstart", function() {
        clearInterval(timer);
    }).bind("touchend", function() {
        timer = setInterval(function() {
            $("#scroll #btn_next").click();
        }, everyTime);
    });
});
// 性别切换
$(".sexper").click(function(){
    $(".sexper").removeClass('on');
    $(this).addClass('on');
})