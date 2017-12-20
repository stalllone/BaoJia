if(!Date.prototype.Format){
    Date.prototype.Format = function (fmt) { //author: meizz 
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };
}

if(!String.prototype.Format){
    String.prototype.Format = function()
    {
        var args = arguments;
        return this.replace(/\{(\d+)\}/g,                
            function(m,i){
                return args[i];
            });
    }
}


$(function() {
    $(".openul p span,.openul input").click(function() {
        ulopen($(this));
    })
    
    function ulopen(obj){
     	obj.parents(".openul").siblings().find(".arr90").removeClass('arr90');
        obj.parents(".openul").find(".arr").addClass('arr90');
        //obj.slideToggle().parent().find(".dropul").slideUp(500);
         // obj.parents(".openul").find('.dropul').slideToggle().parent().siblings().find(".dropul").slideUp(500);
         obj.parents(".openul").find('.dropul').slideDown().parent().siblings().find(".dropul").slideUp(500);
    }   
    var uiopen= $(".left li.on");
    if(uiopen.length>0) ulopen($(uiopen[0]));

    $(".cond_sel,.cond_tab").each(function(){
        var v=$(this).find('input').val();
        if(v!=undefined && v!=""){
            $(this).find('li[rv="'+v+'"]').addClass('on');
            $(this).find('div').html($(this).find(".on").text());
        }
    });

    $(".cond_list li").click(function() {
        var objp =$(this).parents(".cond_sel,.cond_tab")
        objp.find("li").removeClass("on");
        $(this).addClass('on');
        objp.find('div').html($(this).text());
        objp.find('input').val($(this).attr("rv"));
    })

    var supportPlaceholder = 'placeholder' in document.createElement('input');
    if(!supportPlaceholder){
        $('.condition input, .condition2 input').each(function(){
            $(this).val($(this).attr("placeholder"));
        })
        $('.condition input, .condition2 input').click(function(){
            if($(this).val() == $(this).attr("placeholder"))
             $(this).val("");
        })
        $('.condition input, .condition2 input').blur(function(){
            if($(this).val() == "")
             $(this).val($(this).attr("placeholder"));
        })
    }

    // var docH = document.documentElement.clientHeight;
    // var bodyH = document.body.clientHeight;
    // $(window).scroll(function(event) {
    //     /* Act on the event */
    //     if(document.body.scrollTop>80){
    //         $(".left").css({position:"fixed",top:-160});
    //         $(".right").css({"margin-left":"222px"});
    //     }else{
    //         $(".left").css({position:"relative",top:0})
    //         $(".right").css({"margin-left":"0px"});
    //     }
    // });

});