define(function(require) {
    var A = require("A");
    var $ = require("$");
    require("A-dropdown");
    require("A-smartgrid");
    require("A-tooltip");
    require("A-dialog");
    var dataSg = [];
    var inlistDate;
    //初始化数据  不能异步
    inlistDate = require('./indexListData');
    var condition = A.define({
        $id: "condition",
        searchValue: "",
        letter: inlistDate.letter,
        letter_btn: "0",
        city: inlistDate.city,
        city_btn: "0",
        choosetype: inlistDate.choosetype,
        choosetype_btn: "0",
        search: function() {
            alert(condition.searchValue)
            renderGrid()
        },
    });

    var controlModel = A.define({
        $id: "indexList",
        /*配置弹出sg*/
        sgOpts: {
            columns: [{
                key: "eventID",
                name: "事件ID",
                sortable: false,
                width: 50,
                autoResize: false,

            }, {
                key: "orderID", //列标识
                name: "订单编号", //列名
                sortable: false, //否可排序
                isLock: true, //是否锁死列让其始终显示
                align: "center", //列的对象方式
                toggle: false, //控制列的显示隐藏
                // autoResize: true,
                width: 50, //设置列的宽度
                format: "actorderID"
            }, {
                key: "city",
                name: "城市",
                sortable: false,
                isLock: true,
                align: "center",
                toggle: false,
                width: 30
            }, {
                key: "carCode",
                name: "车牌号",
                sortable: false,
                isLock: true,
                align: "center",
                toggle: false,
                width: 30
            }, {
                key: "carType",
                name: "车型",
                sortable: false,
                isLock: true,
                align: "center",
                toggle: false,
                width: 30
            }, {
                key: "customer",
                name: "租客",
                sortable: false,
                isLock: true,
                align: "center",
                toggle: false,
                width: 40,
                format: "actcustomer"
            }, {
                key: "orderDate",
                name: "下单日期",
                sortable: false,
                isLock: true,
                align: "center",
                toggle: false,
                width: 70
            }, {
                key: "getCarDate",
                name: "取车日期",
                sortable: false,
                isLock: true,
                align: "center",
                toggle: false,
                width: 70
            }, {
                key: "backCarDate",
                name: "还车日期",
                sortable: false,
                isLock: true,
                align: "center",
                toggle: false,
                width: 70
            }, {
                key: "credieType",
                name: "征信情况",
                sortable: false,
                isLock: true,
                align: "center",
                toggle: false,
                width: 30,
                format: "actcredieType"
            }, {
                key: "boxState",
                name: "盒子状态",
                sortable: false,
                isLock: true,
                align: "center",
                toggle: false,
                width: 40,
                format: "actboxState"
            }, {
                key: "carState",
                name: "车辆情况",
                sortable: false,
                isLock: true,
                align: "center",
                toggle: false,
                width: 40
            }, {
                key: "infosource",
                name: "来源",
                sortable: false,
                isLock: true,
                align: "center",
                toggle: false,
                width: 100,
                format: "actinfosource"
            }, {
                key: "operation",
                name: "操作",
                sortable: false,
                isLock: true,
                align: "center",
                toggle: false,
                width: 70,
                format: "actoperation"
            }],
            htmlHelper: { // 渲染列数据的方法集合
                // 包装订单列的数据
                actorderID: function(vmId, field, index, cellValue, rowData) {
                    var enabledHtml = '<span class="color_blue">' + rowData.orderID + '</span>'
                    return enabledHtml
                },
                // 包装租客列的数据
                actcustomer: function(vmId, field, index, cellValue, rowData) {
                    var enabledHtml = rowData.customer + '<span class="phone" ms-attr-data-phoneNo="' + rowData.customer_phone + '" ms-click="get_phoneNo" ms-visible="istelphone1" ms-widget="tooltip,$, $ppOpt" data-tooltip-delegate="false" tp="2"></span>'
                    return enabledHtml
                },
                // 包装征信情况列的数据
                actcredieType: function(vmId, field, index, cellValue, rowData) {
                    var disabledHtml = '<span class="color_blue">已查看</span>'
                    var enabledHtml = '<span class="color_blue">未查看</span>'
                    var actcredieType = rowData.credieType == true ? enabledHtml : disabledHtml;
                    return actcredieType
                },
                // 包装盒子情况列的数据
                actboxState: function(vmId, field, index, cellValue, rowData) {
                    var disabledHtml = '<span class="color_blue">在线</span>'
                    var enabledHtml = '<span class="color_blue">无信号</span>'
                    var actboxState = rowData.boxState == true ? enabledHtml : disabledHtml;
                    return actboxState
                },
                // 包装来源列的数据
                actinfosource: function(vmId, field, index, cellValue, rowData) {
                    var disabledHtml = '<div class="text-left"><span class="color_red">预警系统</span><br>预警处理人员:' + rowData.handPeo + '<br>反馈内容:<span>' + rowData.fkcontent + '</span></div>'
                    var enabledHtml = '<div class="text-left"><span class="color_red">客服反馈</span><br>接待客服:' + rowData.hjcustomer + '<br>呼叫类型:' + rowData.hjType + '<br>访问类型:' + rowData.fktype + '<br>反馈内容：<span>' + rowData.kffkcontent + '</span></div>'
                    var actinfosource = rowData.infosource == true ? enabledHtml : disabledHtml;
                    return actinfosource
                },
                // 包装操作列的数据
                actoperation: function(vmId, field, index, cellValue, rowData) {

                    var enabledHtml = '<span class="opt_btn">跟进处理</span><br>'
                    var sjyjFnHtml = "sjyj('yj'," + rowData.id + ")"
                    enabledHtml += '<span ms-click="' + sjyjFnHtml + '" class="opt_btn">事件转移</span><br>'
                    var sczlFnHtml = "sczl('zl'," + rowData.id + ")"
                    enabledHtml += '<span ms-click="' + sczlFnHtml + '" class="opt_btn">提供资料</span><br>'
                    var guanbiFnHtml = "guanbi('gb'," + rowData.id + ")"
                    enabledHtml += '<span ms-click="' + guanbiFnHtml + '" class="opt_btn">关闭事件</span>'
                    return enabledHtml
                }
            },
            pager: {                
                onJump: function(e, page) {
                    var pageNo = page.currentPage;
                    var pageSize = page.perPages;
                    renderGrid();
                },
                canChangePageSize: false,
                options: [10, 20, 50, 100]
            },
            data: [],
            loading: {
                type:"spinning-bubbles"
            }
        },
        istelphone1: true,
        $ppOpt: {
            "contentGetter": function(elem) {
                if (elem.tagName.toLowerCase() == 'input' || elem.getAttribute("tp")) return controlModel.phoneNo + (elem.getAttribute("tp") == "2" ? "  <a ms-click=\"hide($event)\" href=\"#\">&times;</a>" : "")
            },
            autohide: false,
            event: 'click',
            positionAt: 'right bottom',
            positionMy: 'left+10 bottom+15'
        },
        get_phoneNo: function(e) {
            var phoneNo = e.target.getAttribute("data-phoneNo");
            controlModel.phoneNo = phoneNo;
        },
        _rowID: "",
        guanbi: function(id, rowID) {
            controlModel._rowID = rowID;
            avalon.vmodels[id].toggle = true;
        },
        sczl: function(id, rowID) {
            controlModel._rowID = rowID;
            avalon.vmodels[id].toggle = true;
        },
        sjyj: function(id, rowID) {
            controlModel._rowID = rowID;
            avalon.vmodels[id].toggle = true;
        },
        $company: {
            data: inlistDate.company,
            width: 250,
            listWidth: 250,
            height: 200
        },
        $guanbiOpts: {
            title: "关闭事件",
            showClose: false,
            container: "modalWrapper"
        },
        $zlOpts: {
            title: "提供资料",
            showClose: false,
            container: "modalWrapper"
        },
        $yijiaoOpts: {
            title: "事件移交",
            showClose: false,
            width: 480,
            container: "modalWrapper",
            onConfirm: function() {
                var parm = JSON.parse(JSON.stringify(controlModel.$model));
                console.log(parm)
            }
        }
    })

    condition.$watch("choosetype_btn", function(newVal) {
        alert(newVal);
        renderGrid();
    });
    A.scan();

    renderGrid();
    //异步数据交互
    function renderGrid() {
    	//ajax 
        A.log(condition.choosetype_btn);
        A.vmodels.sg.loading.type="spinning-bubbles"
        A.vmodels.sg.showLoading();
        setTimeout(function () {
            A.vmodels.sg.render(getSgData(10));
        }, 30000)
    }

    //异步数据交互
    function getSgData(number) {
        dataSg = [];
        for (var i = 0; i < number; i++) {
            dataSg.push({
                id: i + 1,
                eventID: "事件ID" + i,
                orderID: parseInt(Math.random() * 10000000 + i),
                city: "北京" + i,
                carCode: parseInt(Math.random() * 1000 + i),
                carType: "上海大众" + i,
                customer: "爱因斯坦" + i,
                orderDate: "2015/09/12 12:02",
                getCarDate: "2015/09/12 12:02",
                backCarDate: "2015/09/12 12:02",
                credieType: i % 3 ? true : false,
                boxState: i % 4 ? false : true,
                carState: "持续关注" + i,
                infosource: i % 4 ? false : true,
                handPeo: "张飞" + i,
                hjcustomer: "李四" + i,
                hjType: "呼入" + i,
                fktype: "车东" + i,
                customer_phone: parseInt(Math.random() * 1000000 + i),
                kffkcontent: "dsadsadsdsadsadqwqewqeqdsadsadasdsfdsfqeqfqffqfqfqwfqfqfa",
                fkcontent: "12sasfdadadfafafadfdscccccccccasaqqqqqqqqqqqqqqqqqqsddddddd",
                operation: ""
            })
        }
        return dataSg;
    }
});
