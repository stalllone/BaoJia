define(function(require) {
    var A = require("A");
    var $ = require("$");
    require("A-daterangepicker");
    require("A-smartgrid");
    require("A-loading");
    var LoadingVM=LoadingFn();

    filterData = {
        sendTimeData: [{
            value: "0",
            label: "不限"
        }],
        statusData: [{
            value: "0",
            label: "不限"
        }, {
            value: "1",
            label: "正在发送中"
        }, {
            value: "2",
            label: "未发送"
        }, {
            value: "3",
            label: "已发送"
        }, {
            value: "4",
            label: "暂停"
        }, {
            value: "5",
            label: "取消发送"
        }]
    }

    var taskFilterVM = A.define({
        $id: "taskFilterVM",
        $skipArray: [],
        $dp1Opts: {
            timer: true
        },
        searchValue: "",
        searchFn: function() {
            alert('searchValue: ' + taskFilterVM.searchValue + '\n这里添加查询方法')
        },
        filterShow: true,
        filterShowFn: function() {
            taskFilterVM.filterShow = !taskFilterVM.filterShow
        },
        filterData: filterData,
        sendTime: "0",
        sendTimeS: [],
        $drp1Opts: {
            onSelect: function(inputFromDate, inputToDate, oldValue, vmodel, data) {
                taskFilterVM.sendTime = "sendTimeS"
                fromDate = inputFromDate.toLocaleDateString()
                endDate = inputToDate.toLocaleDateString()
                taskFilterVM.sendTimeS = []
                taskFilterVM.sendTimeS.push(fromDate, endDate)
                alert(taskFilterVM.sendTimeS + '\n这里要单独添加查询方法')
                avalon.vmodels.sg1.render(renewSg1Data(300)); //重新渲染表格
            }
        },
        $startDpkOpts:{
            timer:true,
            allowBlank:true,
            calendarLabel: "请选择起始时间",
            onSelectTime: function () {
                if (taskFilterVM.endTime == "") {
                    A.vmodels.$endTime.toggle=true
                };
            }
        },
        $endDpkOpts:{
            timer:true,
            allowBlank:true,
            calendarLabel: "请选择结束时间",
            onSelectTime: function () {
                if (taskFilterVM.startTime == "") {
                    A.vmodels.$startTime.toggle=true
                };
            }
        },
        startTime: "",
        endTime: "",
        confirmTime: function () {
                // 点击时间控件旁边的确定按钮 回调
                fromDate = taskFilterVM.startTime;
                endDate = taskFilterVM.endTime;
                if (fromDate == "" || endDate == "") {
                    if (fromDate == "" && endDate == "") {
                        alert("请选择时间");
                    }else if(fromDate == "") {
                        alert("请选择起始时间");
                    }else if(endDate == "") {
                        alert("请选择结束时间");
                    };
                }else{
                    taskFilterVM.sendTime = "sendTimeS"
                    taskFilterVM.sendTimeS = []
                    taskFilterVM.sendTimeS.push(fromDate, endDate)
                    alert(taskFilterVM.sendTimeS + '\n这里要单独添加查询方法')
                    avalon.vmodels.sg1.render(renewSg1Data(300)); //重新渲染表格  
                };
        },
        status: "0",
        isClear: false,
        clearAllFn: function() {
            taskFilterVM.isClear = true
            taskFilterVM.sendTime = "0"
            taskFilterVM.sendTimeS = []
            taskFilterVM.status = "0"
            taskFilterVM.isClear = false
        }
    });

    // ================== 表格 ==================
    // 模拟初始化数据 START
    var dataS = []
    function getDatas(number, perpage, currentpage) {
        var data=[]
        for (var i = 0; i < number; i++) {
            data.push({
                list: i + 1,
                eventName: "活动活动_" + i,
                sendTime: "2015-05-20 12:20",
                smsContents: "宝亲，天气这么好，出去玩玩吧！宝驾租车520活动友情馈赠，活动期间首单结算成功后立返100元租车券！详情：http://t.cn/Re3dnEF",
                status: i % 3 ? "已发送" : "未发送",
                taskID: parseInt(10 + Math.random() * 20),
                groupID: i + 1871,
                editBox: "",
                isStop: i == 1 ? true : false,
                isCancel: i % 4 ? false : true
            })
        }
        for (var i = 0; i < data.length; i++) {
            if (data[i].isStop==true || data[i].isCancel==true) {
                data[i].checkboxShow=false
            };
        };
        dataS=data;
        
        return dataS;
    }
    // 模拟初始化数据 END

    // 模拟查询后数据 START
    function renewSg1Data(number, perpage, currentpage) {
        dataS = [];
        for (var i = 0; i < number; i++) {
            dataS.push({
                list: i + 1,
                eventName: "其他event_" + i,
                sendTime: "2015-05-20 12:20",
                smsContents: "宝亲，天气这么好，出去玩玩吧！宝驾租车520活动友情馈赠，活动期间首单结算成功后立返100元租车券！详情：http://t.cn/Re3dnEF，活动期间首单结算成功后立返100元租车券！",
                status: i % 3 ? "已发送" : "未发送",
                taskID: parseInt(10 + Math.random() * 20),
                groupID: i + 2871,
                editBox: ""
            })
        }
        return dataS;
    }
    // 模拟查询后数据 END

    var tasklistVM = A.define({
        $id: "tasklistVM",
        $skipArray: [],
        stopFn:function () {
            var selected_rowData=A.vmodels.sg1.getSelected() //获取 选中行的Data，数组格式
            var selected_taskIDs=[]
            for (var i = 0; i < selected_rowData.length; i++) {
                selected_taskIDs.push(selected_rowData[i].taskID)
            };
            if (selected_taskIDs.length==0) {
                alert('请先选择')
            }else{
                alert('taskID: ' + selected_taskIDs)
            };
        },
        goEdit: function (arg1,arg2) {
            AddNewTab(arg1 , arg2 , "/accident/edit.html?"+ arg1);
        },
        $sg1Opts: {
            selectable: {
                type: "Checkbox" //为表格添加选中行操作框,可以设置为"Checkbox"或者"Radio"
            },
            pager: {
                showPages: 5,
                // currentPage: 1,
                totalItems: 12222,
                // showJumper: true,
                onJump: function(e, pagedata) {
                    var parm = tasklistVM.$model;
                    location.href = "#page=" + pagedata.currentPage;
                    console.log(pagedata.currentPage, parm, A.vmodels.sg1.data.length, A.vmodels.sg1.pager.perPages, A.vmodels.sg1.pager);
                    A.vmodels.sg1.data = setData(A.vmodels.sg1.perPages, pagedata.currentPage);
                    A.vmodels.sg1.render()
                },
                canChangePageSize: true,
                perPages: 10,
                options: [10, 20, 50, 100]
            },
            autoResize: true,
            htmlHelper: { // 渲染列数据的方法集合
                    // 操作列html
                    actoperate: function(vmId, field, index, cellValue, rowData) {
                        var Html
                        if (rowData.isStop==true || rowData.isCancel==true) {
                            if (rowData.isStop==true) {
                                Html='<a class="btn btn-info btn-xs"">继续任务</a>'
                            };
                            if (rowData.isCancel==true) {
                                Html='已取消'
                            };
                        } else{
                            var arg= rowData.taskID + "," + "'" + rowData.eventName + "'"
                            Html='<a class="btn btn-success btn-xs" ms-click="goEdit('+ arg +')">编辑</a>'
                        };
                        return Html
                    }
            },
            columns: [{
                key: "list",
                name: "Num",
                width: 50,
                autoResize: false
            }, {
                key: "eventName", //列标识
                name: "营销活动名称", //列名
                align: "center", //列的对象方式
                width: 100, //设置列的宽度
                autoResize: false,
            }, {
                key: "sendTime",
                name: "发送时间",
                width: 100,
                autoResize: false
            }, {
                key: "smsContents",
                name: "短信内容",
                width: 500,
                autoResize: false
            }, {
                key: "status",
                name: "状态",
                width: 100,
                autoResize: false
            }, {
                key: "taskID",
                name: "taskID",
                width: 100,
                autoResize: false
            }, {
                key: "groupID",
                name: "groupID",
                width: 100,
                autoResize: false
            }, {
                key: "editBox",
                name: "操作",
                defaultValue: "",
                width: 100,
                autoResize: true,
                format: "actoperate"
            }],
            data: getDatas(100)
        }

    })

    A.scan();


    // 点击查询条件后
    taskFilterVM.$watch("$all", function(name, newVal) {
        if (taskFilterVM.isClear) return false;
        if (name == "avalon-ms-duplex-init" || name == "searchValue" || name == "startTime" || name == "endTime") {
            return false
        } else if (name == "sendTime" && newVal == "sendTimeS") {
            return false  //选择日期的时候，查询方法另外写
        } else {
            if (name=="sendTime") {taskFilterVM.sendTimeS=[]};
            console.log(taskFilterVM.sendTimeS)
            alert(name + ':' + newVal + '\n 添加查询方法')
            LoadingVM.showLoading(); // loading显示
            avalon.vmodels.sg1.render(renewSg1Data(200)); //重新渲染表格
            setTimeout(function () {
                LoadingVM.hideLoading();
            },500) // loading隐藏
            return;
        }
    })
})
