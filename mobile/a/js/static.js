$(function(){
    //拼驾指南
    if($(".guide_left").length>0){
        $(".guide_left p").click(function(){
            $(".guide_left p").removeClass('on');
            $(this).addClass('on');
        });
        $(".guide_left1 p").click(function(){
            $(".guide_cont1").css("display","block");
            $(".guide_cont2").css("display","none");
        });
        $(".guide_left2 p").click(function(){
            $(".guide_cont1").css("display","none");
            $(".guide_cont2").css("display","block");
        })
    }
})
