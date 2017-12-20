window.onload = function() {
    var cWidth = $(window).width(),
        cHeight = $(window).height();
    $(function() {
        //var Focus_lunbo=jQuery(".leftLoop").slide({ mainCell:".bd ul",effect:"leftLoop",vis:1,scroll:1,autoPlay:true});
        //Focus_lunbo;
        //热卖hover
        $('.hotsale_list').each(function() {
            $(this).hover(function() {
                $('.hotsale_list').removeClass('on');
                $(this).addClass('on');
                $(this).children('.hotsale_imgbox').find('img').stop().animate({
                    'width': 410,
                    'left': -10,
                    'height': 474,
                    'top': -12
                }, 500);
            }, function() {
                $(this).removeClass('on');
                $(this).children('.hotsale_imgbox').find('img').stop().animate({
                    'width': 390,
                    'left': 0,
                    'height': 450,
                    'top': 0
                }, 500);
            });
        });
        //banner 淡入淡出
        //初始化
        var curr = 0;
        $('.hd_ul li').each(function(i) {
            $(this).click(function() {
                curr = i;
                $('.picList li').css('z-index', 2).fadeOut(100);
                $('.picList li').eq(i).fadeIn(0).css('z-index', 1);
                $('.hd_ul li').removeClass('small_click').eq(i).addClass('small_click');
            });
        });
        //setTime
        var tNum = $('.picList li').length;
        var timer = setInterval(function() {
            todo = (curr + 1) % tNum;
            $('.hd_ul li').eq(todo).click();
        }, 4000);
        $('.hd_ul li').each(function() {
            $(this).hover(function() {
                clearInterval(timer);
                $(this).click();
            }, function() {
                timer = setInterval(function() {
                    todo = (curr + 1) % 4;
                    $('.hd_ul li').eq(todo).click();
                }, 4000);
            });
        });
        //链接扩展
        $('.hotsale_list').click(function() {
            window.location.href = $(this).find('a').click();
        });
        $('.tj_boxlist').click(function() {
            window.location.href = $(this).find('a').click();
        });
        $('.sex').click(function() {
            $('.sex').removeClass('sexon');
            $(this).addClass('sexon');
        });

        
    });
    
       
    

};