$(function() {
    var topH = $(".top").height();
    var winH = $(window).height();
    $(".left").height(winH - topH);
    $('.left').niceScroll({
        cursorcolor: "#ccc", //#CC0071 光标颜色
        cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
        touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
        cursorwidth: "5px", //像素光标的宽度
        cursorborder: "0", //   游标边框css定义
        cursorborderradius: "5px", //以像素为光标边界半径
        autohidemode: true //是否隐藏滚动条
    });
    $(".nav>li>a").click(function() {
        var objMenu = $(this).parent();
        $(this).parent().siblings().find(".triangle").removeClass("on");
        menuOpen($(objMenu[0]));
    })

    function menuOpen(menu) {
        if (!menu) return;
        var objul = menu.find('ul');
        menu.find('.triangle').removeClass('on');
        $(".nav ul").slideUp();
        if (!objul.is(':visible')) {
            objul.slideDown();
            menu.find('.triangle').addClass('on');
        }
    }
    $(".sub-menu-list a").click(function() {
        $(".sub-menu-list a").removeClass("on");
        $(this).addClass("on");
    })
    $(".toggle").click(function() {
        if ($(this).parents(".content").hasClass("content1")) {
            $(this).parents(".content").removeClass('content1');
            $("#ascrail2000").css("left", "225px");
            $(".right").css("margin-left", "230px");

        } else {
            $(this).parents(".content").addClass('content1');
            $("#ascrail2000").css("left", "55px");
            $(".right").css("margin-left", "60px");
        }
    });
    
})