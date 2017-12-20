define(function(require) {
    var A = require("A");
    var $ = require("$");
    require("A-dropdown");
    require("A-smartgrid");
    require("A-datepicker");
    require("A-dialog");

    var inlistDate;
    //初始化数据  不能异步
    inlistDate = require('./kucunguanli_Data');
    var condition = A.define({
        $id: "condition",
        use: "",
        $useState: {
            data: inlistDate.useState,
            width: 85,
            listWidth: 85,
            titleClass: "carplateTitle",
            listClass: "carplateTitleItem",
            onChange: function() {
                renderGrid();
            }
        },
        sup: "",
        $supplier: {
            data: inlistDate.supplier,
            width: 85,
            listWidth: 85,
            titleClass: "carplateTitle",
            listClass: "carplateTitleItem",
            onChange: function() {
                renderGrid(1);
            }
        },
        sear: "",
        $searchKey: {
            data: inlistDate.searchKey,
            width: 100,
            listWidth: 100,
            titleClass: "carplateTitle",
            listClass: "carplateTitleItem",
            onChange: function() {
                renderGrid(1);
            }
        },
        searchValue: "",
        search: function() {
            alert(condition.searchValue)
            renderGrid(1)
        },
        ruku: function(id) {
            avalon.vmodels[id].toggle = true;
        },
        $rukuOpts: {
            title: "流量卡入库",
            container: "modalWrapper"
        },
        carCode: "ddddddd",
        rukusu:"",
        $rukusupplier:{
            data: inlistDate.rukusupplier,
            width: 150,
            listWidth: 150,
            titleClass: "carplateTitle",
            listClass: "carplateTitleItem",
            onChange: function() {
                renderGrid(1);
            }
        },
        com:"",
        $companyed:{
            data: inlistDate.companyed,
            width: 150,
            listWidth: 150,
            titleClass: "carplateTitle",
            listClass: "carplateTitleItem",
            onChange: function() {
                renderGrid(1);
            }
        },
        sScdruku: "0",
        operteRadio:inlistDate.yuyingData,
        remark: "sdffaf"
    });


    var controlModel = A.define({
        $id: "indexList",
        /*配置sg*/
        sgOpts: {
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
            },
            /*配置sg分页*/
            columns: [{
                key: "company",
                name: "分公司",
                sortable: false,
                width: "10%",
                autoResize: false,

            }, {
                key: "serialNumber", //列标识
                name: "序列号（ICCID）", //列名
                sortable: false, //否可排序
                isLock: true, //是否锁死列让其始终显示
                align: "center", //列的对象方式
                toggle: false, //控制列的显示隐藏
                // autoResize: true,
                width: "10%" //设置列的宽度

            }, {
                key: "cardNumber",
                name: "流量卡号",
                sortable: false,
                isLock: true,
                align: "center",
                toggle: false,
                width: "10%"
            }, {
                key: "boxNumber",
                name: "盒子号",
                sortable: false,
                isLock: true,
                align: "center",
                toggle: false,
                width: "10%"
            }, {
                key: "cardState",
                name: "流量卡状态",
                sortable: false,
                isLock: true,
                align: "center",
                toggle: false,
                width: "10%",
                format: "actcardState"
            }, {
                key: "supplier",
                name: "供应商",
                sortable: false,
                isLock: true,
                align: "center",
                toggle: false,
                width: "10%"

            }, {
                key: "operator",
                name: "运营商",
                sortable: false,
                isLock: true,
                align: "center",
                toggle: false,
                width: "10%"
            }, {
                key: "operatorPenson",
                name: "操作人",
                sortable: false,
                isLock: true,
                align: "center",
                toggle: false,
                width: "10%"
            }, {
                key: "operat",
                name: "操作",
                sortable: false,
                isLock: true,
                align: "center",
                toggle: false,
                width: "19%",
                format: "actoperat"
            }],
            htmlHelper: { // 渲染列数据的方法集合
                // 包装流量卡状态列的数据
                actcardState: function(vmId, field, index, cellValue, rowData) {
                    var enabledHtml = '<span class="color_blue">已使用</span>'
                    var disabledHtml = '<span class="color_blue">未使用</span>'
                    var actcardState = rowData.cardState == true ? enabledHtml : disabledHtml;
                    return actcardState
                },
                // 包装操作列的数据
                actoperat: function(vmId, field, index, cellValue, rowData) {
                    var delHtml = "del(" + rowData.id + ")"
                    var enabledHtml = '<a ms-click="' + delHtml + '" href="#">删除</a>'
                    //enabledHtml += '<a href="kucunguanli_xq.html">详情</a>'
                    enabledHtml += '<a href="kucunguanli_xq.html?id="'+rowData.id+'">详情</a>'
                    return enabledHtml
                },
                pager: {
                    onJump: function(e, page) {
                        var pageNo = page.currentPage;
                        var pageSize = page.perPages;
                        renderGrid(1);
                    },
                    canChangePageSize: false,
                    options: [10, 20, 50, 100]
                }
            }
        },
        del: function(rowId) {
            alert(rowId);
        }
    })
    A.scan();

    renderGrid(1);
    //ajax 
    function renderGrid(page) {
        param = {
            // keyvalue:condition.zl,
            // company:condition.ct,
            // state:condition.sta,
        }
        console.log(param);

        var dataSg = [];
        for (var i = 0; i < 30; i++) {
            dataSg.push({
                id: i + 1,
                company: "北京分公司" + i,
                serialNumber: "10648052880231064805",
                cardNumber: "1064805288023",
                boxNumber: Math.random() * 2200000000000000000,
                cardState: i % 2 ? true : false,
                supplier: "城三",
                operator: "移动",
                operatorPenson: "陈波",
                operat: ""
            })
        }
        A.vmodels.sg.render(dataSg);
    }
});
