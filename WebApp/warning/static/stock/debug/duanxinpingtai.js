define(function(require) {
    var A = require("A");
    var $ = require("$");
    require("A-dropdown");
    require("A-textbox");
    require("A-smartgrid");
    require("A-datepicker");
    require("A-dialog");
    var inlistDate;
    //初始化数据  不能异步
    inlistDate = require('./duanxinpingtai_Data');
    var condition = A.define({
        $id: "condition",
        searchValue: "",
        search: function() {
            alert(condition.searchValue)
            renderGrid(1)
        },
        $guanbiOpts: {
            title: "关闭事件",
            onConfirm:function(){
                var parm = JSON.parse(JSON.stringify(condition.$model));
                console.log(parm)
            }
        },
        guanbi: function(id) {
            avalon.vmodels[id].toggle = true;
        },
        cCode:"", 
        zl:"",
        $zhiling: {
            data: inlistDate.zhiling,
            width: 200,
            listWidth: 200,
            height: 200
        },
        ct:"",
        $city:{
            data: inlistDate.city,
            width: 85,
            titleClass:"carplateTitle",
            listClass:"carplateTitleItem",
            listWidth: 85,
            height: 200,
            onChange:function(){
                renderGrid(1);
            }
        },
        sta:"",
        $state:{
            data: inlistDate.state,
            width: 110,
            titleClass:"carplateTitle",
            listClass:"carplateTitleItem",
            listWidth: 110,
            height: 200,
            onChange:function(){
                renderGrid(1);
            }
        },
        accTime:"",
        $dp1Opts: {
            timer:true
        }
        
    });

    var controlModel = A.define({
        $id: "indexList",
        /*配置弹出sg*/
        sgOpts: {
            columns: [{
                key: "city",
                name: "城市",
                sortable: false,
                width: "5%",
                autoResize: false

            }, {
                key: "iphone", //列标识
                name: "手机号", //列名
                sortable: false, //否可排序
                isLock: true, //是否锁死列让其始终显示
                align: "center", //列的对象方式
                toggle: false, //控制列的显示隐藏
                autoResize: false,
                width: "8%" //设置列的宽度
             
            }, {
                key: "sendCon",
                name: "发送内容",
                sortable: false,
                isLock: true,
                align: "center",
                toggle: false,
                autoResize: false,
                width: "12%"
            }, {
                key: "getCon",
                name: "回复内容",
                sortable: false,
                isLock: true,
                align: "center",
                toggle: false,
                autoResize: false,
                width:"30%"
            }, {
                key: "sendState",
                name: "送达状态",
                sortable: false,
                isLock: true,
                align: "center",
                toggle: false,
                autoResize: false,
                width: "10%"
            }, {
                key: "getState",
                name: "接收状态",
                sortable: false,
                isLock: true,
                align: "center",
                toggle: false,
                autoResize: false,
                width: "10%"
              
            }, {
                key: "sendTime",
                name: "发送时间",
                sortable: false,
                isLock: true,
                align: "center",
                toggle: false,
                autoResize: false,
                width: "10%"
            }, {
                key: "operPeo",
                name: "操作人",
                sortable: false,
                isLock: true,
                align: "center",
                toggle: false,
                autoResize: false,
                width:"15%"
            }],
            /*配置sg分页*/
            pager: {
                showPages: 5,
                showJumper: true,
                perPages: 10,
                onJump: function(e, pagedata) {
                   var parm = condition.$model;
                   alert(pagedata.currentPage);
                   renderGrid(1);
                }  
            }
            /*配置sg分页*/
        }
    })

    condition.$watch("state_btn",function(newVal){
        alert(newVal);
        renderGrid(1);
    });
    condition.$watch("date_btn",function(newVal){
        alert(newVal);
        renderGrid(1);
    });
    condition.$watch("choosetype_btn",function(newVal){
        alert(newVal);
        renderGrid(1);
    });

    A.scan();

    avalon.ui["suggest"].strategies['test3'] = function( value , done ) {
        done(getSuggestData(value));
    }

    $(document).click(function(event){
       var target = $(event.target).parents(".searchByzimuorshuzi");
        if(avalon.vmodels.dp1.toggle && target.length==0){
             avalon.vmodels.dp1.toggle  = false;
        }
        event.stopPropagation();
    })


    // 异步获取“流量卡号”
    function getSuggestData (a) {
        //ajax
        if (a.length>3) {
            return ["11", "22", "33"];
        } else{
            return [];
        };
    }

    //renderGrid(1);
    //异步数据交互
    function renderGrid(page) {
    	
        param={
            city:condition.ct,
            state:condition.sta,
            time:condition.accTime,
            searchVal:condition.searchValue
        }
        console.log(param);

        //ajax d
        var dataSg = [];
        for (var i = 0; i < 10; i++) {
            dataSg.push({
                id: i + 1,
                city:"北京"+i,
                iphone:parseInt(Math.random()*151515151),
                sendCon:"dsads大苏打撒的撒旦你撒旦撒的",
                getCon:"背景是背景是背景是背景是背景是背景是背景是背景是背景是背景是背景是背景是背景是",
                sendState:"送达成功",
                getState:"接收成功",
                sendTime:"15/1/1 13:00",
                operPeo:"撒打算"+i
            })
        }
        A.vmodels.sg.render(dataSg);
    }
});
