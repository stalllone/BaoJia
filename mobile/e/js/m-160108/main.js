//新版时间控件
var pd = new Date();
var rd = new Date(pd.getTime() + 24 * 60 * 60 * 1000);
var rounded = roundMinutes(parseInt(pd.getHours()) + 1, pd.getMinutes());
var pdts = pd.getFullYear() + "-" + (parseInt(pd.getMonth()) + 1) + "-" + pd.getDate() + " " + rounded[0] + ":" + fillBlank(rounded[1]);
var rdts = rd.getFullYear() + "-" + (parseInt(rd.getMonth()) + 1) + "-" + rd.getDate() + " " + rounded[0] + ":" + fillBlank(rounded[1]);
console.log(pdts + rdts);
$('#pikeupResultHidden').attr('value', pdts);
$('#returnResultHidden').attr('value', rdts);
$('#startDate').attr('value', pdts);
$('#endDate').attr('value', rdts);
$('#startTime').text(pdts);
$('#endTime').text(rdts);

function roundMinutes(hr, min) {
    if (min > 0 && min <= 15) {
        min = 15;
    } else if (min > 15 && min <= 30) {
        min = 30;
    } else if (min > 30 && min <= 45) {
        min = 45;
    } else if (min > 45 && min <= 60) {
        hr += 1;
        min = 0;
    }
    return [hr, min];
}

function chooseStartTime() {
    var type = "1";
    $('#initialType').attr('value', 1);
    resumeDTPicker();

    $(".window-body").show();
    $(".page").show();

}

function chooseEndTime() {
    var type = "2";
    //        document.getElementById("initialType").value=type;
    $('#initialType').attr('value', 2);
    //        $("#initialType").attr("value","2");
    resumeDTPicker();
    $(".window-body").show();
    $(".page").show();
}

function getStart(date) {
    date = date.replace(/-/g, "/");
    var date2 = new Date(date);
    return date2;
}

function dayView(start, end) {
    if ($("#startDate").val() == "") {
        viewWaring("请选择取车时间");
        return false;
    }
    if ($("#endDate").val() == "") {
        viewWaring("请选择还车时间");
        return false;
    }
    var start = getStart($("#startDate").val());
    var end = getStart($("#endDate").val());
    var hours = Math.floor((end.getTime() - start.getTime()) / (3600 * 1000));
    if (hours < 0) {
        viewWaring("还车时间必须大于取车时间，请重新选择!");
        return false;
    } else {
        return true;
    }
}


$(function() {
    var navH = $(".nav").offset().top;
    $(window).scroll(function() {
        var scroH = $(this).scrollTop();
        if (scroH >= navH) {
            $(".nav").css({
                "position": "fixed",
                "top": 0
            });
        } else if (scroH < navH) {
            $(".nav").css({
                "position": "static"
            });
        }
    });
    $(".footer").css("display", "none");
    // $(window).scroll(function() {
    //     if ($(window).scrollTop() == $(document).height() - $(window).height()) {
    //         $(".footer").css("display", "block");
    //     } else {
    //         $(".footer").css("display", "none");
    //     }
    // });
})
$(function() {
    var h = 0;
    $("#choseCity").click(function() {
        $("#city").blur();
        h = $(document).scrollTop();
        $(".newyear").hide();
        $('#citys').show();
        $("html,body").animate({
            scrollTop: 0
        }, 0);
        return false;
    });
    $("._city").click(function() {
        $("#city").val($(this).text());
        $(".newyear").show();
        $('#citys').hide();
        $("html,body").animate({
            scrollTop: h
        }, 0);
    });
});
$("#chooseStartTime").click(function() {
    $(".color-gray").text("");
    $(this).css("margin-top","-2%");
})
$("#startTime").text("");
$("#endTime").text("");
var height = $(".nav").height();
$(".jt").css("top", height / 4);
