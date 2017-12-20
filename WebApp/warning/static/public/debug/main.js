define(function(require) {
    var A = require("A");
    var $ = require("$");
   
    var model = A.define({
        $id: "includepublic",
        header: sysConfig.viewPath +"/public/header.html",
        footer: sysConfig.viewPath +"/public/footer.html"
    })

    require("A-tree-menu");
    require("A-tab");
    var zNodes =[
         { id:2, pid:0, name:"首页","iconSkin":"indexIcon","icon": "/images/1.0/indexIcon.png"},
         { id:21, pid:2, name:"首页",gourl:"/homeList/indexList.html"},

        { id:3, pid:0, name:"订单预警","iconSkin":"fxyjIcon","icon": "/images/1.0/fxyjIcon.png"},
        { id:31, pid:3, name:"地图",gourl:"/homeList/warn_map.html"},
        { id:32, pid:3, name:"车辆地图",gourl:"/homeList/warn_carMap.html"},
        { id:33, pid:3, name:"盒子轨迹地图",gourl:"/homeList/boxTrackmap.html"},
    
        { id:4, pid:0, name:"车辆预警","iconSkin":"fxyjIcon","icon": "/images/1.0/indexIcon.png"},
        { id:41, pid:4, name:"运营异常",gourl:"/carWarn/carWarn_yyyc.html"},
        { id:42, pid:4, name:"车辆异常",gourl:"/carWarn/carWarn_clyc.html"},
        { id:43, pid:4, name:"性能异常",gourl:"/carWarn/carWarn_xnyc.html"},

        { id:5, pid:0, name:"实时监控","iconSkin":"ssjkIcon","icon": "/images/1.0/ssjkIcon.png"},
        { id:51, pid:5, name:"实时监控",gourl:"/accident/list.html"},
        { id:52, pid:5, name:"实时监控",gourl:"/accident/add.html"},
        { id:53, pid:5, name:"实时监控",gourl:"/accident/acclist.html"},

        { id:6, pid:0, name:"设备管理","iconSkin":"sbglIcon","icon": "/images/1.0/sbglIcon.png"},
        { id:61, pid:6, name:"设备管理",gourl:"/accident/list.html"},
        { id:62, pid:6, name:"设备管理",gourl:"/accident/add.html"},
        { id:63, pid:6, name:"设备管理",gourl:"/accident/acclist.html"},

        { id:7, pid:0, name:"库存管理","iconSkin":"kcglIcon","icon": "/images/1.0/kcglIcon.png"},
        { id:71, pid:7, name:"短信平台",gourl:"/stock/duanxinpingtai.html"},
        { id:72, pid:7, name:"库存管理",gourl:"/stock/kucunguanli.html"},
        { id:73, pid:7, name:"库存管理详情",gourl:"/stock/kucunguanli_xq.html"},

        { id:8, pid:0, name:"驾驶行为","iconSkin":"ycxwIcon","icon": "/images/1.0/ycxwIcon.png"},
        { id:81, pid:8, name:"驾驶行为",gourl:"/accident/list.html"},
        { id:82, pid:8, name:"驾驶行为",gourl:"/accident/add.html"},
        { id:83, pid:8, name:"驾驶行为",gourl:"/accident/acclist.html"},

        { id:9, pid:0, name:"车辆检测","iconSkin":"cljcIcon","icon": "/images/1.0/cljcIcon.png"},
        // { id:91, pid:9, name:"车辆检测",gourl:"/accident/list.html"},
        // { id:92, pid:9, name:"车辆检测",gourl:"/accident/add.html"},
        // { id:93, pid:9, name:"车辆检测",gourl:"/accident/acclist.html"},

        { id:10, pid:0, name:"账户管理","iconSkin":"zhglIcon","icon": "/images/1.0/zhglIcon.png"},
        { id:101, pid:10, name:"账户管理",gourl:"/accident/list.html"},
        { id:102, pid:10, name:"账户管理",gourl:"/accident/add.html"},
        { id:103, pid:10, name:"账户管理",gourl:"/accident/acclist.html"},
    ];
     
    var bodyCtl= A.define({
        $id:'bodyCtl',
        isOpen:true,
        fold:function(){
                bodyCtl.isOpen=!bodyCtl.isOpen;
            }
    }); 

    $('body').css("overflow","hidden");

    FConfig.iframeH=document.documentElement.clientHeight-FConfig.offsetT+(FConfig.isTab?0:40)
    A.define("pagebody", function(vm) {
        vm.tree =  A.mix(true, {}, avalon.treeMenu, {
            children: zNodes, 
            data: {
                simpleData: {
                    enable: true,
                    pIdKey: "pid"
                }
            },
            view:{
                showIcon:true
            },
            onInit:function(vm){},
            callback: {           
                beforeClick:function(arg){
                    var node = arg.leaf;
                    if(node.isParent) node.open =!node.open;
                    if(!node.gourl) return false;
                    return true;
                },
                onClick: function(arg){
                    var node = arg.leaf;
                    FConfig.isTab? openTab(node.id,node.name,node.gourl,true):openTab(1,"首页",node.gourl,true)
                }
            }
        });      
       
        vm.tab = {
            onInit:function(vmodel, options, vmodels){
                if(!FConfig.isTab){
                    document.body.getElementsByClassName("oni-tab-slider")[0].style.display="none";            
                }
            },            
            onActivate: function(event, vmode) {
                vm.setTree(vmode.tabs[vmode.active].id);
            },
            onClickActive: function(event, vmode) {
                vm.setTree(vmode.tabs[vmode.active].id);
            },
            onRemove: function(vmode) {
                vm.setTree(vmode.tabs[vmode.active].id);
            },
            target:"_self",
            event:"click",
            active: 0,
            tabs: [{id:1,title: "首页",removable: false}],
            tabpanels: [{content:FConfig.iframeHtml.Format(1,FConfig.iframeH,sysConfig.viewPath+sysConfig.defaultPage) }]
        };

        vm.setTree=function(id){
            var tree = avalon.vmodels.menutree;
            var leaf = tree.getNodeByParam("id",parseInt(id));
            if(leaf.length>0)tree.selectNode(leaf[0]);
        };
        vm.$skipArray = ["menutree","tab"]
    })
    A.scan();
    $(function(){
        var aSpan=$('.menu-tree > ul > li > a > .button');
        if(aSpan.hasClass('ico_docu')){
            $('.ico_docu').parent().css('background-image','none');
            $('.ico_docu').css({"height":"100%","width":"30px","margin-left":"6px","margin-top":"6px"});
            $('.ico_docu').next().css('padding-left','23px');
        }
    });
})