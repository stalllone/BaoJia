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
        { id:1, pid:0, name:"短信任务"},
        { id:11, pid:1, name:"新建短信任务",gourl:"/pages/add.html?opt=add"},
        { id:11, pid:1, name:"更新任务",gourl:"/pages/update.html"},
        { id:12, pid:1, name:"任务列表",gourl:"/pages/tasklist.html"},
        {id:13,pid:1,name:"短信营销数据统计",gourl:"/pages/dataStatistics.html"}
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
            tabs: [{title: "事故列表",removable: false}],
            tabpanels: [{content: '<div class="divFrame"><iframe id=iframe0 style="width:100%; height:1000px;" src="'+sysConfig.viewPath +'/pages/tasklist.html"></iframe></div>'},]
        };        
        vm.$skipArray = ["menutree","tab"]
    })
    A.scan();
})
