$(function(){
    $( "#begintime" ).datepicker({
        monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月',
            '十一月', '十二月' ],
        monthNamesShort : [ '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月',
            '十月', '十一月', '十二月' ],
        dayNames : [ '星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六' ],
        dayNamesShort : [ '周日', '周一', '周二', '周三', '周四', '周五', '周六' ],
        dayNamesMin : [ '日', '一', '二', '三', '四', '五', '六' ],
        defaultDate: "",
        dateFormat : 'yy-mm-dd',
        minDate:new Date(),
        changeMonth: true,
        numberOfMonths: 1,
        onClose: function( selectedDate ) {
            $( "#endtime" ).datepicker( "option", "minDate", selectedDate );
        }
    });
    $( "#endtime" ).datepicker({
        monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月',
            '十一月', '十二月' ],
        monthNamesShort : [ '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月',
            '十月', '十一月', '十二月' ],
        dayNames : [ '星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六' ],
        dayNamesShort : [ '周日', '周一', '周二', '周三', '周四', '周五', '周六' ],
        dayNamesMin : [ '日', '一', '二', '三', '四', '五', '六' ],
        defaultDate: "+15d",
        dateFormat : 'yy-mm-dd',
        minDate:new Date(),
        changeMonth: true,
        numberOfMonths: 2,
        onClose: function( selectedDate ) {
            $( "#begintime" ).datepicker( "option", "maxDate", selectedDate );
        }
    });

    //header animate
    $(window).scroll(function(){
        var sTop=$(window).scrollTop();
        if(sTop>10){
            $('.header').stop().animate({'padding-top':0,'padding-bottom':0},500);
        }else{
            $('.header').stop().animate({'padding-top':15,'padding-bottom':15},500);
        }
    });
    $('.main').css('min-height',$(window).height()-98-368);
    //登录
    $('input.telphone').focus(function(){
        if($(this).val()=="请输入手机号"){
            $(this).val('')
        }
    }).blur(function(){
        if($(this).val()==""){
            $(this).val('请输入手机号')
        }
    });

    $('.cityul ul').click(function(event) {
        if(event.target && event.target.nodeName == "LI") {
           var obj =  $(event.target)
           $("#city").val(obj.html());
        }
    });

    //登录|注册
    $('.nologin_box').click(function(){
        $('.windowopen,.windowopen_login').show();
        $.ajax({
            type  :   'post',
            url   :   '/mall/passport/generate-verify-code',
            data  :   'id=123',
            success : function(result){
                var text = "";
                if(result != undefined){
                    for(var i = 0; i < result.length; i ++){
                        text += result[i];
                        text += "  ";
                    }
                }
                $("#btn_img_validate").text(text);
            }
        });
    });

    $("#img_check_code").bind("click",function(){
        $.ajax({
            type  :   'post',
            url   :   '/mall/passport/generate-verify-code',
            data  :   'id=123',
            success : function(result){
                var text = "";
                if(result != undefined){
                    for(var i = 0; i < result.length; i ++){
                        text += result[i];
                        text += " ";
                    }
                }
                $("#btn_img_validate").text(text);            }
        });
    });

    //弹层关闭按钮
    $('.closewindow_box,.windowopenbg').click(function(){
        $('.windowopen_login,.windowopen').hide();
    });
    //我的订单
    $('#myorder').click(function(){
        if($('#login').val()=='1'){
            location.href='/mall/order/list';
        }else{
            $('.windowopen,.windowopen_login').show();
            $.ajax({
                type  :   'post',
                url   :   '/mall/passport/generate-verify-code',
                data  :   'id=123',
                success : function(result){
                    var text = "";
                    if(result != undefined){
                        for(var i = 0; i < result.length; i ++){
                            text += result[i];
                            text += "  ";
                        }
                    }
                    $("#btn_img_validate").text(text);
                }
            });
        }
    });

    $("#btn_send_validate").bind("click", function(){
        sendValidateCode();
    });
});

function sendValidateCode(){
    var mobile = $("#phone").val();
    if(mobile.length==0)
    {
        $(".login_tipbox").text('请输入手机号码！');
        $("#phone").focus();
        return false;
    }
    if(mobile.length!=11)
    {
        $(".login_tipbox").text('请输入有效的手机号码！');
        $("#phone").focus();
        return false;
    }

    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if(!myreg.test(mobile)) {
        $(".login_tipbox").text('请输入有效的手机号码！');
        $("#phone").focus();
        return false;
    }
    var imgCode = $("#img_validate").val();
    if(!imgCode){
        $(".login_tipbox").text('请输入图形验证码');
        return false;
    }
    var RequestUrl = "/mall/passport/send-mobile-captcha?mobile=" + mobile+'&verify_code='+imgCode;
    showLoadingDialog();
    $.get(RequestUrl, function(data, status){
        hideLoadingDialog();
        if(status == "success"){
            var obj = $.parseJSON(data);
            if(obj.code == 0){
                CodeTimeMethod($("#btn_send_validate"));
            }else{
                alert(obj.message);
                return false;
            }
        }else{
            alert("操作失败,请检查网络！");
            return false;
        }
    });
}

function CodeTimeMethod(obj){
    var time1=60;
    var c=setInterval(function(){
        time1--;
        //obj.unbind('click');
        obj.attr('disabled','disabled');
        obj.html(time1 + "s后重新获取");
        if(time1==0){
            clearInterval(c);
            //obj.bind("click", function(){
            //    sendValidateCode();
            //});
            obj.bind("click",
                sendValidateCode);
            obj.attr("disabled", false);
            obj.text("重新获取");
            obj.addClass("btn_enable").removeClass("btn_disable");
        }
    },1000);
}



var count = 60;
function countDown() {
    count--;
    if(count <= 0){
        clearInterval(this);
        $("#btn_send_validate").bind("click", function(){
            sendValidateCode();
        });
        //$("#btn_send_validate").click(function(){
        //    sendValidateCode();
        //});
        $('#btn_send_validate').attr("disabled", false);
        $('#btn_send_validate').text("重新获取");
        $('#btn_send_validate').addClass("btn_enable").removeClass("btn_disable");
    }else{
        $('#btn_send_validate').text(count + "s后重新获取");
    }
}

$("input").on('input', function(e){
    var mobile = $("#phone").val();
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if(myreg.test(mobile)) {
        if($('#input_validate').val().length > 0){
            $('#btn_login').attr("disabled", false);
            $('#btn_login').addClass("button-enable").removeClass("button-disable");
            return;
        }
    }
    $('#btn_login').addClass("button-disable").removeClass("button-enable");
    $('#btn_login').attr("disabled", true);
});
$('#btn_login').click(function(){
    var mobile = $("#phone").val();
    var captcha = $("#input_validate").val();
    var service = $("#jiadaoservice").prop('checked');
    var imgCode = $("#img_validate").val();
    if(!service){
        $(".login_tipbox").text('请阅读并同意《好车驾到用户服务协议》');
        return false;
    }
    if(!imgCode){
        $(".login_tipbox").text('请输入图形验证码');
        return false;
    }
    showLoadingDialog();
    var requestUrl = "/mall/passport/login?mobile=" + mobile + "&captcha=" + captcha+'&verify_code='+imgCode;
    $.get(requestUrl, function(data, status){
        hideLoadingDialog();
        if(status == "success"){
            //{"code":0,"message":"success","result":{"user_id":2}}
            var obj = $.parseJSON(data);
            console.log(obj.result);
            if(obj.code === 0){
                //localStorage.userId = obj.result.user_id;
                //$.cookie("MOBILE",$("#phone").val().toString());

                var redirect = window.location.href.split("redirect=")[1];
                if (redirect) {
                    window.location.href = redirect;
                    return false;
                }

                var link = window.location.href.split("confirm-")[1];
                if (link) {
                    window.location.href = "/mall/confirm-" + link+".html";
                    return false;
                }
                var source = window.location.href.split("back_dir=")[1];
                if(source=="coupon"||source=="nolist"){
                    window.location.href = "/mall/activity/" + source+".html";
                    return false;
                }
                window.location.href = "/mall/site/index";
            }else{
                $(".login_tipbox").text(obj.message);
                //alert(obj.message);
            }
        }else{
            alert("操作失败,请检查网络！");
        }
    });
});

function showLoadingDialog(){
    $("#BgDiv1").css({ display: "block", height: $(document).height() });
    var yscroll = document.documentElement.scrollTop;
    var screenx=$(window).width();
    var screeny=$(window).height();
    $(".DialogDiv").css("display", "block");
    $(".DialogDiv").css("top",yscroll+"px");
    var DialogDiv_width=$(".DialogDiv").width();
    var DialogDiv_height=$(".DialogDiv").height();
    $(".DialogDiv").css("left",(screenx/2-DialogDiv_width/2)+"px")
    $(".DialogDiv").css("top",(screeny/2-DialogDiv_height/2)+"px")
    $("body").css("overflow","hidden");
}

function hideLoadingDialog(){
    $(".DialogDiv").css("display", "none");
}

$("#sendCode").bind("click",function(){
    var mobile = $("#mobile").val();
    //console.log(mobile);
    if(mobile.length == 0){
        $(".tip_question").text("请输入正确手机号码！");
        $("#mobile").focus();
        return false;
    }
    if(mobile.length != 11){
        $(".tip_question").text("请输入正确手机号码！");
        $("#mobile").focus();
        return false;
    }
    var pattern = /^(13|15|17|18)\d{9}$/;
    if(!pattern.test(mobile)){
        $(".tip_question").text("请输入有效手机号码！");
        $("#mobile").focus();
        return false;
    }
    $.ajax({
        type    :   'post',
        url     :    '/mall/feedback/send-mobile-captcha',
        data    :    'mobile='+mobile,
        dataType:    'json',
        success :    function(result){
            if(result.code == 0){
                //CodeTimeMethod($("#sendCode"));
                alert("短信已成功发送到手机,请注意查收");
                return false;
            }else{
                $(".tip_question").text(result.message);
                return false;
            }
        }
    });
});
function settimes(times){
    times=parseInt(times);
    times--;
    setTimeout(settimes,1000);
}

$("#intentionSubmit").bind("click",function(){
    var intentionVehType = $.trim($("#intention_vehicle_type").val());
    if(intentionVehType.length == 0){
        $(".tip_question").text("请输入意向车型！");
        $("#intention_vehicle_type").focus();
        return false;
    }
    var userName = $.trim($("#user_name").val());
    if(userName.length == 0){
        $(".tip_question").text("请输入姓名！");
        $("#user_name").focus();
        return false;
    }
    var login=$("#login").val();
    if(login == 0){
        var mobile = $.trim($("#mobile").val());
        if(mobile.length == 0){
            $(".tip_question").text("请输入正确手机号码！");
            $("#mobile").focus();
            return false;
        }
        if(mobile.length != 11){
            $(".tip_question").text("请输入正确手机号码！");
            $("#mobile").focus();
            return false;
        }
        var pattern = /^(13|15|17|18)\d{9}$/;
        if(!pattern.test(mobile)){
            $(".tip_question").text("请输入有效手机号码！");
            $("#mobile").focus();
            return false;
        }
        var captcha = $.trim($("#captcha").val());
        if(captcha == 0){
            $(".tip_question").text("请输入验证码！");
            $("#captcha").focus();
            return false;
        }
    }
    if(login == 0){
        var param = 'intention_vehicle_type='+intentionVehType+'&user_name='+userName+'&mobile='+mobile+'&captcha='+captcha;
    }else{
        var param = 'intention_vehicle_type='+intentionVehType+'&user_name='+userName;
    }
    $.ajax({
        type    :     'post',
        url     :     '/mall/feedback/intention-model',
        data    :     param,
        success :     function(result){
            var res = $.parseJSON(result);
            if(res.code == 0){
                alert("提交成功");
                history.go(0);
            }else{
                $(".tip_question").text(res.message);
                return false;
            }
        }
    }); 
});