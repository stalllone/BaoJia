define(function(require) {
    var A = require("A");
    var $ = require("$");

    require("A-dropdown");
    require("A-pager");
    require("A-smartgrid");

    var mapH = $(window).height() - 51
    $('.map_content').height(mapH);
    var tableH = $(window).height() - $('.topOpt').outerHeight() - 51 - $('.pager_map').height();

    $('.margin_t_bottom').height(tableH);
    var inlistDate;
    //初始化数据  不能异步
    inlistDate = require('./warn_carMapData');

    var conditionModel = A.define({
        $id: "condition",
        addrInfo: inlistDate.addr
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

    var carInfo=A.define({
        $id:"carInfo",
        carInfoCon: inlistDate.carInfoContent,
        orderFn:function(){
            alert("订单")
        },
        historyFn:function(){
            alert("历史")
        },
        riskEventFn:function(){
            alert("风险事件")
        },
        removewindFn:function(){
            alert("解除预警")
        },
        trackFn:function(){
            alert("轨迹")
        },
        instructFn:function(){
            alert("指令")
        },
        boxdetailsFn:function(){
            alert("盒子详情")
        },
        lookAutoFn:function(){
            alert("查看座驾")
        }
    })

    var chooseModel = A.define({
        $id: "indexList",
        com:"",
        $company: {
            data: inlistDate.company,
            width: 250,
            listWidth: 250,
            height: 200,
            onChange: function() {
                renderDiv();
            }
        },
        search:"",
        $searchOpt: {
            data: inlistDate.searchOpt,
            titleClass: "map_side_each",
            listClass: "map_side_each_item",
            width: 85,
            listWidth: 85,
            onChange: function() {
                renderDiv();
            }
        },
        ct:"",
        $carState: {
            data: inlistDate.carState,
            titleClass: "map_side_each",
            listClass: "map_side_each_item",
            width: 85,
            listWidth: 85,
            onChange: function() {
                renderDiv();
            }
        },
        bs:"",
        $boxState: {
            data: inlistDate.boxState,
            titleClass: "map_side_each",
            listClass: "map_side_each_item",
            width: 85,
            listWidth: 85,
            onChange: function() {
                renderDiv();
            }
        },
        bt:"",
        $boxType: {
            data: inlistDate.boxType,
            titleClass: "map_side_each",
            listClass: "map_side_each_item",
            width: 85,
            listWidth: 85,
            onChange: function() {
                renderDiv();
            }
        },
        searchVal: "adsada",
        searchValCar:"123444",
        isOpenChoose: true,
        isOpen:true,
        closedFn:function(){
            chooseModel.isOpen = !chooseModel.isOpen;
        },
        foldChoose: function() {
            chooseModel.isOpenChoose = !chooseModel.isOpenChoose;
        },
        isOpen: true,
        foldFn: function() {
            chooseModel.isOpen = !chooseModel.isOpen;
        },
        searchAll: function() {
            alert(chooseModel.searchVal)
        },
        searchAllCar:function(){
            alert(chooseModel.searchValCar)
        },
        /*配置表格*/
        city:"城市",
        carHao:"车牌号",
        box:"盒子",
        state:"状态",
        updatetableData:[],
        addDateCbx:"0",
        addData:function(a){
            if(a===chooseModel.openindex){
                chooseModel.openindex=""
            }else{
                chooseModel.openindex=a;
            }    
        },
        isWarn:function(a){
            if(a=="正常"){
                return false;
            }else{
                return true;
            }
        },
        warnRed:function(a){
            if(a=="在线"){  
                return false;
            }else{
                return true;
            }
        },
        openindex:"",
        showContent:function(a,b){
            a.stopPropagation();
            alert(b);
        },
        /*配置表格*/

        /*配置分页*/
        $pagerOpt: {
            currentPage: 1,
            showPages: 4,
            nextText: ">",
            prevText: "<",
            perPages: 25,
            showJumper: false,
            onJump: function(e, data) {
                alert('第'+data.currentPage+'页被点了')
                chooseModel.updatetableData=updateContentData(25);
            }
        },
        /*配置分页*/
    })
    A.scan();
    conditionModel.$watch("choose_type", function(newVal) {
        renderDiv();
    });
    chooseModel.$watch("$all", function (a,b) {
        if (a=="com" || a=="search" || a=="cs" || a=="bs" || a=="bt") {
            renderDiv();
        } else{
            return false
        };
    })
    //异步数据交互
    chooseModel.updatetableData=updateContentData(25);
    A.vmodels.$pager.totalItems=30;
    function renderDiv() {

        /*获取数据*/
        parm={
            company:chooseModel.com
            /*......*/
        };
        console.log(parm);

        chooseModel.updatetableData=updateContentData(40);
        A.vmodels.$pager.totalItems=100;
    }
    
    //异步数据交互
    function updateContentData(number) {
        dataS = [];
        for (var i = 0; i < number; i++) {
            dataS.push({
                id: i,
                value:i,
                cityid: "北京_" + i,
                carCode: parseInt(10 + Math.random() * 20),
                thisState: "正常0",
                children:[
                    {boxId:"131372"+i,boxType:"护卫舰"+i,boxState:"断电"},
                    {boxId:"131372"+i,boxType:"护卫舰"+i,boxState:"在线"},
                    {boxId:"131372"+i,boxType:"护卫舰"+i,boxState:"在线"},
                    {boxId:"131372"+i,boxType:"护卫舰"+i,boxState:"断电"}
                ]
            })
        }
        return dataS;
    }
    
});
