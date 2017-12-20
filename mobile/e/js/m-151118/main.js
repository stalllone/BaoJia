
var imgurl="../../images/m-151118/";
var scrArr=[["top1.png","top11.png","navHuoDong"],["top2.png","top22.png","navCheXing"],["top3.png","top33.png","navYouShi"]];
$(function(){  
    /*头部 动态效果和定位*/      
    var topht= $(".fixtop").height();
    $(".bt").bind("touchstart", function() {
      var ind=$(this).index();
      $(this).find("img").prop("src",imgurl+scrArr[ind][1]);
    }).bind("touchend", function() {
        var ind=$(this).index();
      $(this).find("img").prop("src",imgurl+scrArr[ind][0]);
    }).bind("click",function(){
        var ind=$(this).index();
        $('html,body').animate({scrollTop:$('#'+scrArr[ind][2]).offset().top-topht}, 600);
    }).hover(function() {
        var ind=$(this).index();
        $(this).find("img").prop("src",imgurl+scrArr[ind][1]);
    }, function() {
       var ind=$(this).index();
       $(this).find("img").prop("src",imgurl+scrArr[ind][0]);
    });

    $(".footer,.more,#navHuoDong").click(function(){           
        $('html,body').animate({scrollTop:$('.divReg').offset().top}, 600);
    });
/*头部 底部自动隐藏*/
    var wht = $(window).height();
    var dht = $(document).height();
    var dtp = 0;
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
         console.log(dtp +":::"+ dht +":::"+ reght +":::"+ wht +":::"+ botht +"sss"+ (dht - reght - wht + botht - dtp))

        if(dtp < dht - reght - wht + botht){
            $(".fixbottom").slideDown(100);  
        }else{
            $(".fixbottom").slideUp(200); 
        }
    }, 300);
})

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
$(function() {
    var setHeight = function() {
        var width = $("#scroll2").width();
        var height = width / (640 / 470)
        $("#scroll2").height(height);
    }
    setHeight()

    $(window).on("resize", function() {
        setHeight()

    })
    var $dragBln = false;

    $("#scroll2 .main_image").touchSlider({
        flexible: true,
        speed: speed,
        btn_prev: $("#scroll2 #btn_prev"),
        btn_next: $("#scroll2 #btn_next"),
        paging: $("#scroll2 .flicking_con a"),
        counter: function(e) {
            $("#scroll2 .flicking_con a").removeClass("on").eq(e.current - 1).addClass("on");
        }
    });

    $("#scroll2 .main_image").bind("mousedown", function() {
        $dragBln = false;
    });

    $("#scroll2 .main_image").bind("dragstart", function() {
        $dragBln = true;
    });

    $("#scroll2 .main_image a").click(function() {
        if ($dragBln) {
            return false;
        }
    });

    var timer = setInterval(function() {
        $("#scroll2 #btn_next").click();
    }, everyTime);

    $("#scroll2").hover(function() {
        clearInterval(timer);
    }, function() {
        timer = setInterval(function() {
            $("#scroll2 #btn_next").click();
        }, everyTime);
    });

    $("#scroll2 .main_image").bind("touchstart", function() {
        clearInterval(timer);
    }).bind("touchend", function() {
        timer = setInterval(function() {
            $("#scroll2 #btn_next").click();
        }, everyTime);
    });
});