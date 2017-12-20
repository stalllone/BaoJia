define(function(require) {
    var A = require("A");
    var $ = require("$");

    require("A-dropdown");
    require("A-pager");
    require("A-smartgrid");
    require("A-loading");
    var mapH = $(window).height() - 51
    $('.map_content').height(mapH);
    var tableH = $(window).height() - $('.topOpt').outerHeight() - 51 - $('.pager_map').height();

    $('.margin_t_bottom').height(tableH);
    var inlistDate;
    var dataS;
    //初始化数据  不能异步
    inlistDate = require('./warn_mapData');

    var conditionModel = A.define({
        $id: "condition",
        signInfo: inlistDate.signInfo,

        choose_type: "",
        choose_type_checked:false,
        cf: "0",

        $chooseFirst: {
            data: inlistDate.chooseFirst,
            width: 140,
            titleClass: "map_side_each",
            listClass: "map_side_each_item",
            listWidth: 140,
            onChange: function() {
                renderDiv();
            }
        },
        resetChooseCar: function() {
            if(conditionModel.choose_type_checked){
                conditionModel.choose_type_checked=false;
                return false;
            }else{
                conditionModel.choose_type="";
            }
        }
    })
    var LoadingArea=avalon.define({
        $id: "LoadingArea",
        $loadOpts:{
            toggle: false,
            modalOpacity: 0.5,
            modalBackground:"#000",
            type: "spinning-bubbles"
        }
    })

    var tuliModel = A.define({
        $id: "tuliModel",
        tuli: inlistDate.tuli,
        isOpen: true,
        closedFn: function() {
            tuliModel.isOpen = !tuliModel.isOpen
        },
        unusualFn: function() {
            alert("aaaa");
        }
    })

    var chooseModel = A.define({
        $id: "indexList",
        com: "1",
        $company: {
            data: inlistDate.company,
            width: 250,
            listWidth: 250,
            titleClass:"companyStyle",
            listClass:"companyStyleItem",
            height: 200
        },
        search: "1",
        $searchOpt: setDropdown("searchOpt"),
        cs: "1",
        $carState: {
            data: inlistDate.carState,
            titleClass: "map_side_each",
            listClass: "map_side_each_item",
            width: 100,
            listWidth: 100
        },
        bs: "1",
        $boxState: {
            data: inlistDate.boxState,
            titleClass: "map_side_each",
            listClass: "map_side_each_item",
            width: 100,
            listWidth: 100
        },
        bt: "1",
        $boxType: {
            data: inlistDate.boxType,
            titleClass: "map_side_each",
            listClass: "map_side_each_item",
            width: 100,
            listWidth: 100
        },
        closedFn: function() {
            tuliModel.isOpen = !tuliModel.isOpen
        },
       
        /*配置表格*/
        city: "城市",
        carHao: "车牌号",
        box: "盒子",
        state: "状态",
        updatetableData: [],
        addDateCbx: "0",
        showHide: false,
        openindex: "",
        showContent: function(e, b) {
            e.stopPropagation();
            alert(b)
        },
        addData: function(a) {
            if (a === chooseModel.openindex) {
                chooseModel.openindex = ""
            } else {
                chooseModel.openindex = a
            };
        },
        isWarn: function(b) {
            if (b == "正常") {
                return false;
            } else {
                return true;
            }
        },
        warnRed: function(a) {
            if (a == "在线") {
                return false;
            } else {
                return true;
            }

        },

        /*配置分页*/
        $pagerOpt: {
            currentPage: 1,
            showPages: 4,
            nextText: ">",
            prevText: "<",
            perPages: 25,
            showJumper: false,
            onJump: function(e, data) {

                alert('第' + data.currentPage + '页被点了')
                chooseModel.updatetableData = updateContentData(25);
            }

        },
        /*配置分页*/
        searchVal: "adsada",
        isOpenChoose: true,
        foldChoose: function() {
            chooseModel.isOpenChoose = !chooseModel.isOpenChoose;
        },
        searchAll: function() {
            alert(chooseModel.searchVal)
        }
    })


    A.scan();

    conditionModel.$watch("choose_type", function(newVal) {
        conditionModel.choose_type_checked=true;
        renderDiv();

    });
    chooseModel.$watch("$all", function(a, b) {
            if (a == "com" || a == "search" || a == "cs" || a == "bs" || a == "bt") {
                renderDiv();
            } else {
                return false
            };
        })
        //异步数据交互
    chooseModel.updatetableData = updateContentData(25);
    A.vmodels.$pager.totalItems = 30;

    function renderDiv() {
        parm = {
            company: chooseModel.com,
            chooseFirst: conditionModel.cf,
            search: chooseModel.search,
            carState: chooseModel.cs,
            boxState: chooseModel.bs,
            boxType: chooseModel.bt
        };
        console.log(parm);
        setTimeout(function(){
            A.vmodels.$loading.hideLoading(); // loading隐藏
            chooseModel.updatetableData = updateContentData(25);
        },1000)
        A.vmodels.$loading.showLoading(); // loading显示
        A.vmodels.$pager.totalItems = 100;
    }

    // 设置Dropdown
    function setDropdown(a) {
        return {
            data: inlistDate[a],
            titleClass: "map_side_each",
            listClass: "map_side_each_item",
            width: 105,
            listWidth: 105
        }
    }

    //异步数据交互
    function updateContentData(number) {
        dataS = [];
        for (var i = 0; i < number; i++) {
            dataS.push({
                id: i,
                value: i,
                cityid: "北京_" + i,
                carCode: parseInt(10 + Math.random() * 20),
                thisState: "正常0",
                children: [{
                    boxId: "131372" + i,
                    boxType: "护卫舰" + i,
                    boxState: "断电"
                }, {
                    boxId: "131372" + i,
                    boxType: "护卫舰" + i,
                    boxState: "在线"
                }, {
                    boxId: "131372" + i,
                    boxType: "护卫舰" + i,
                    boxState: "在线"
                }, {
                    boxId: "131372" + i,
                    boxType: "护卫舰" + i,
                    boxState: "断电"
                }]
            })
        }
        return dataS;
    }
});
