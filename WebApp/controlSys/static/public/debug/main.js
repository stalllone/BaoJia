define(function(require) {
    var A = require("A");
    var model = A.define({
        $id: "includepublic",
        header: sysConfig.viewPath +"/public/header.htm",
        footer: sysConfig.viewPath +"/public/footer.htm"
    })

    require("A-tree-menu");
    require("A-tab");
    var zNodes =[
        { id:1, pid:0, name:"首页"},
        { id:11, pid:1, name:"首页",gourl:"/controlSys/indexList.html"},
        { id:2, pid:0, name:"风控事件处理"},
        { id:21, pid:2, name:"风控事件处理",gourl:"/controlSys/shijianchuli.html"},
        { id:23, pid:2, name:"风控事件处理-编辑",gourl:"/controlSys/shijianchuli_bj.html"},
        { id:22, pid:2, name:"风控事件处理-详情",gourl:"/controlSys/shijianchuli_xq.html"},
        { id:3, pid:0, name:"追车记录"},
        { id:31, pid:3, name:"追车记录",gourl:"/controlSys/zhuichejilu.html"},
        { id:32, pid:3, name:"追车记录-编辑",gourl:"/controlSys/zhuichejilu_bj.html"},
        { id:33, pid:3, name:"追车记录-详情",gourl:"/controlSys/zhuichejilu_xq.html"},
        { id:4, pid:0, name:"立案"},
        { id:41, pid:4, name:"立案",gourl:"/controlSys/lian.html"}
    ];
        
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
                showIcon:false
            },
            onInit:function(vm){
            },
            callback: {           
                beforeClick:function(arg){
                    var node = arg.leaf;
                    if(!node.gourl)
                    {
                        if(node.isParent) arg.vm.expand(node,false,false);
                        return false;
                    }
                    return true;
                },
                onClick: function(arg){
                    var node = arg.leaf;
                    var opens = avalon.vmodels.menutabs.tabs;
                    if(opens && opens.length>0 )
                    {
                        for (var i = 0; i < opens.length; i++) {
                            if(opens[i].id == node.id && opens[i].title == node.name){
                                A.vmodels.menutabs.active =i;
                                return false;
                            }
                        };
                    }
                    
                    var url = ((sysConfig.isDebug?sysConfig.viewPath:"")+ node.gourl)
                    var curpage = {
                        id:node.id,
                        title: node.name,
                        removable: true,
                        content: '<div class="divFrame"><iframe id=iframe'+node.id+' style="width:100%; height:1000px;" src="'+url+'"></iframe></div>'
                    }
                   
                    A.vmodels.menutabs.add(curpage);
                    A.vmodels.menutabs.active =opens.length -1;
                }
            }
        });
        vm.tab = {
            onActivate: function(e) {
                A.log("user define cc activate callback");
                return false;
            },
            onClickActive: function(e, model) {
                var a = model;
            },
            target:"_self",
            event:"click",
            active: 0,
            tabs: [{title: "首页",removable: false}],
            tabpanels: [{content: '<div class="divFrame"><iframe id=iframe0 style="width:100%; height:1000px;" src="'+sysConfig.viewPath +'/controlSys/indexList.html"></iframe></div>'},]
        };        
        vm.$skipArray = ["menutree","tab"]
    })
    A.scan();
})