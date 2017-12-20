define(function(require) {
    var A = require("A");
    var $ = require("$");

    require("A-dropdown");
    require("A-datepicker");

    var mapH = $(window).height() - 51
    $('.map_content').height(mapH);
    var tableH = $(window).height() - $('.topOpt').outerHeight() - 51 - $('.pager_map').height();

    $('.margin_t_bottom').height(tableH);
    var inlistDate;
    //初始化数据  不能异步
    inlistDate = require('./boxTrackmapData');
    var chooseModel = A.define({
        $id: "indexList",
        com: "1",
        $company: {
            data: inlistDate.company,
            width: 250,
            listWidth: 250,
            height: 200
        },
        carCode: "1511151",
        cf: "1",
        $chooseFirst: {
            data: inlistDate.chooseFirst,
            width: 140,
            listWidth: 140,
            titleClass: "layoutDropdown",
            listClass: "layoutDropdownItem",
            height: 200
        },
        speedValue: "0",
        $speed: {
            data: inlistDate.speed,
            width: 60,
            listWidth: 60,
            titleClass: "layoutDropdown",
            listClass: "layoutDropdownItem"
        },
        startDate: "",
        startTime: "",
        $aOpts: {
            timer: true,
            calendarWidth: 180,
            onSelectTime: function() {
               chooseModel.startTime= chooseModel.startDate.substring(chooseModel.startDate.lastIndexOf(' '));
            }
        },
        endDate: "",
        endTime: "",
        $aOpts1: {
            timer: true,
            calendarWidth: 180,
            onSelectTime: function() {
                chooseModel.endTime= chooseModel.endDate.substring(chooseModel.endDate.lastIndexOf(' '));
            }
        },
        carSpeed: inlistDate.carInfo.carSpeed,
        carMile: inlistDate.carInfo.carMile,
        carSign: inlistDate.carInfo.carSign,
        carState: inlistDate.carInfo.carState,
        cardirection: inlistDate.carInfo.cardirection,
        allPass: "15325",
        okFn: function() {
            $('.trackInfo').css('display', 'none');
            $('.scroll_div_kuang > span').animate({
                width: 0
            }, 10);
            $('.scroll_div_play').removeClass("on").css('background', 'url(../../images/1.0/play.png) no-repeat 5px');
        },
        startAddr: "湖南省长沙市雨花区万家丽中路",
        endAddr: "湖南省长沙市雨花区万家丽中路fafsfsfsddfsd",
        today: function() {
            chooseModel.startDate = changeTime(0);
            chooseModel.endDate = changeTime(0);
        },
        yesterday: function() {
            chooseModel.startDate = changeTime(-1);
            chooseModel.endDate = changeTime(-1);
        },
        beforeYes: function() {
            chooseModel.startDate = changeTime(-2);
            chooseModel.endDate = changeTime(-2);
        }
    })
    A.scan();
    $('.scroll_div_play').click(function() {
        if ($(this).hasClass('on')) return;
        for (var i = 0; i < inlistDate.speed.length; i++) {
            if (inlistDate.speed[i].value == chooseModel.speedValue) {
                chooseModel.speedlabel = parseInt(inlistDate.speed[i].label);
            }
        }
        anminteWidth(chooseModel.speedlabel);
        $(this).addClass("on").css('background', 'url(../../images/1.0/end.png) no-repeat 5px');
    })

    function anminteWidth(i) {
        var w = $('.scroll_div_kuang > span').width();
        clearInterval(timer);
        var timer = setInterval(function() {
            var width = (w++);
            $('.scroll_div_kuang > span').width((width) + "%");
            if (w > 100) {
                $('.scroll_div_kuang > span').width("100%");
                $('.trackInfo').css('display', 'block');
                clearInterval(timer);
            }
        }, 100 / i)
    }
    timeA();

    function timeA() {
        chooseModel.startTime= chooseModel.startDate.substring(chooseModel.startDate.lastIndexOf(' '));
    }
    timeB();

    function timeB() {
       chooseModel.endTime= chooseModel.endDate.substring(chooseModel.endDate.lastIndexOf(' '));
    }

    function changeTime(addDay) {
        var timeToday = new Date();
        var year = timeToday.getFullYear();
        var month = timeToday.getMonth() + 1;
        var day = timeToday.getDate() + addDay;
        var hour = timeToday.getHours();
        var minute = timeToday.getMinutes();
        return year + "-" + month + "-" + day + " " + hour + ":" + minute
    }
});
