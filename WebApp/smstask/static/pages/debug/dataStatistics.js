define(function(require) {

    var A = require("A");
    var $ = require("$");

    require("A-daterangepicker");
    require("A-smartgrid");

    var dataSta;

    // filterData是 查询条件相关数据设置
    filterData = {
        sendTimeData: [{
            value: "0",
            label: "不限"
        }],
        smsTypeData: [{
            value: "0",
            label: "不限"
        }, {
            value: "1",
            label: "优惠券"
        }, {
            value: "2",
            label: "其它"
        }],
        totalTypeData: [{
            value: "1",
            label: "按照人数"
        }, {
            value: "2",
            label: "按照次数"
        }, {
            value: "3",
            label: "按车东"
        }]
    };

    dataSta = A.define({
        $id: 'dataStaVM',
        $skipArray: [],
        Groupid: "",
        status: "0",
        smsType: "0",
        methods: filterData.totalTypeData[0].value, //第一个选项的value值
        filterData: filterData,
        sendTime: "0",
        sendTimeS: [],
        GroupAdd: [],
        $drp1Opts: {
            onSelect: function(inputFromDate, inputToDate, oldValue, vmodel, data) {

                dataSta.sendTime = "sendTimeS"
                fromdate = inputFromDate.toLocaleDateString()
                todate = inputToDate.toLocaleDateString()
                dataSta.sendTimeS = []
                dataSta.sendTimeS.push(fromdate, todate)
                alert(dataSta.sendTimeS + '\n这里要单独添加查询方法')
                avalon.vmodels.sg1.render(newDatas(30)); //重新渲染表格
            }
        },
        isClear: false,
        claerAllFn: function() {
            dataSta.isClear = true
            dataSta.Groupid = ""
            dataSta.status = "0"
            dataSta.smsType = "0"
            dataSta.methods = filterData.totalTypeData[0].value //第一个选项的value值
            dataSta.sendTime = "0"
            dataSta.sendTimeS = []
            dataSta.GroupAdd = []
            dataSta.isClear = false
        },
        GroupIDAdd: function() {
            dataSta.GroupAdd.ensure(dataSta.Groupid)
            dataSta.Groupid=""
            $('#Groupid').focus()
            if (dataSta.Groupid=="") return false;
        }
    });

    // ================== 表格 ==================
    // 模拟初始化数据 START
    function getDatas(number) {
        var data = []
        for (var i = 0; i < number; i++) {
            data.push({
                operate: "",
                Gid: "1",
                campPerson: "租客",
                taskName: "1",
                personCount: "1",
                successCount: "1",
                yhjId: "1",
                yhjMoney: "1",
                validDay: "1",
                timeSlot: "1",
                //按人数 START
                tjrzrs: "1",
                rztgrs: "1",
                yxddrs: "1",
                xdrs: "1",
                zfdjrs: "1",
                cdtyrs: "1",
                zfyjrs: "1",
                failrs: "1",
                successrs: "1",
                tkrs: "1",
                //按人数 END

                //按次数 START
                tjrzcs: "1",
                rztgcs: "1",
                yxddcs: "1",
                xdcs: "1",
                zfdjcs: "1",
                cdtycs: "1",
                zfyjcs: "1",
                failcs: "1",
                successcs: "1",
                tkcs: "1",
                //按次数 END

                //按车东 START
                tjclrzs: "1",
                clrztgs: "1",
                aqbjhzs: "1",
                clsxs: "1",
                tjdcs: "1",
                yfddcs: "1",
                //按车东 END

                dlApprs: "1",


            })
        }
        return data;
    }
    // 模拟初始化数据 END

    // 模拟查询之后数据 START
    function newDatas(number) {
        var data = []
        for (var i = 0; i < number; i++) {
            data.push({
                operate: "",
                Gid: "3333333",
                campPerson: "租客",
                taskName: "333333333",
                personCount: "333333333",
                successCount: "333333333",
                yhjId: "3333333",
                yhjMoney: "1",
                validDay: "1",
                timeSlot: "1",

                //按人数 START
                tjrzrs: "1",
                rztgrs: "1",
                yxddrs: "1",
                xdrs: "1",
                zfdjrs: "1",
                cdtyrs: "1",
                zfyjrs: "1",
                failrs: "1",
                successrs: "1",
                tkrs: "1",
                //按人数 END

                //按次数 START
                tjrzcs: "1",
                rztgcs: "1",
                yxddcs: "1",
                xdcs: "1",
                zfdjcs: "1",
                cdtycs: "1",
                zfyjcs: "1",
                failcs: "1",
                successcs: "1",
                tkcs: "1",
                //按次数 END

                //按车东 START
                tjclrzs: "1",
                clrztgs: "1",
                aqbjhzs: "1",
                clsxs: "1",
                tjdcs: "1",
                yfddcs: "1",
                //按车东 END

                dlApprs: "1"
            })
        }
        return data;
    }
    // 模拟查询之后数据 END

     // 按人数的时候 要显示的
    var byPeople=["tjrzrs","rztgrs","yxddrs","xdrs","zfdjrs","cdtyrs","zfyjrs","failrs","successrs","tkrs"]
     // 按次数的时候 要显示的
    var byCount=["tjrzcs","rztgcs","yxddcs","xdcs","zfdjcs","cdtycs","zfyjcs","failcs","successcs","tkcs"]
     // 按车东的时候 要显示的
    var byOwner=["tjclrzs","clrztgs","aqbjhzs","clsxs","tjdcs","yfddcs"]

    var gridVM = A.define({
        $id: "gridVM",
        $skipArray: [],
        //配置表格
        $sg1Opts: {
            pageable: false,
            htmlHelper: { // 渲染列数据的方法集合
                // 操作列html
                actoperate: function(vmId, field, index, cellValue, rowData) {
                    var Html = '<a class="btn btn-info btn-xs"">导出</a>';
                    return Html
                }
            },
            autoResize: true,
            columns: [{
                key: "operate",
                name: "操作",
                width: 50,
                format: "actoperate"
            }, {
                key: "Gid",
                name: "GroupID",
                width: 50
            }, {
                key: "campPerson",
                name: "营销对象",
                width: 50
            }, {
                key: "taskName",
                name: "任务名称",
                width: 50
            }, {
                key: "personCount",
                name: "用户数",
                width: 50
            }, {
                key: "successCount",
                name: "成功发送数量",
                width: 50
            }, {
                key: "yhjId",
                name: "优惠劵ID",
                width: 50
            }, {
                key: "yhjMoney",
                name: "优惠劵金额",
                width: 50
            }, {
                key: "validDay",
                name: "时效（天）",
                width: 50
            }, {
                key: "timeSlot",
                name: "查询时间段",
                width: 50
            }, 
            // 按人数 START
            {
                key: "tjrzrs",
                name: "提交认证人数",
                width: 50
            }, {
                key: "rztgrs",
                name: "认证通过人数",
                width: 50
            }, {
                key: "yxddrs",
                name: "意向订单人数",
                width: 50
            }, {
                key: "xdrs",
                name: "下单人数",
                width: 50
            }, {
                key: "zfdjrs",
                name: "支付定金人数",
                width: 50
            }, {
                key: "cdtyrs",
                name: "车东同意人数",
                width: 50
            }, {
                key: "zfyjrs",
                name: "支付押金人数",
                width: 50
            }, {
                key: "failrs",
                name: "失败人数",
                width: 50
            }, {
                key: "successrs",
                name: "成功人数",
                width: 50
            }, {
                key: "tkrs",
                name: "退款人数",
                width: 50
            }, 
            // 按人数 END
            // 按次数 START
            {
                key: "tjrzcs",
                name: "提交认证次数",
                width: 50
            }, {
                key: "rztgcs",
                name: "认证通过次数",
                width: 50
            }, {
                key: "yxddcs",
                name: "意向订单次数",
                width: 50
            }, {
                key: "xdcs",
                name: "下单次数",
                width: 50
            }, {
                key: "zfdjcs",
                name: "支付定金次数",
                width: 50
            }, {
                key: "cdtycs",
                name: "车东同意次数",
                width: 50
            }, {
                key: "zfyjcs",
                name: "支付押金次数",
                width: 50
            }, {
                key: "failcs",
                name: "失败次数",
                width: 50
            }, {
                key: "successcs",
                name: "成功次数",
                width: 50
            }, {
                key: "tkcs",
                name: "退款次数",
                width: 50
            },
            // 按次数 END

            // 按车东 START
            {
                key: "tjclrzs",
                name: "提交车辆认证数",
                width: 50
            }, {
                key: "clrztgs",
                name: "车辆认证通过数",
                width: 50
            }, {
                key: "aqbjhzs",
                name: "安装宝驾盒子数",
                width: 50
            }, {
                key: "clsxs",
                name: "车辆上线数",
                width: 50
            }, {
                key: "tjdcs",
                name: "提交订次数",
                width: 50
            }, {
                key: "yfddcs",
                name: "已付订单次数",
                width: 50
            },
            // 按车东 END

            {
                key: "dlApprs",
                name: "登陆APP人数",
                width: 50
            }],
            data: []
        }
    })
A.scan();

    // 点击查询条件后
	dataSta.$watch("$all", function(name, newVal) {
        if (dataSta.isClear) {
                showColumn("1")
            return;
        }
	    if (name == "avalon-ms-duplex-init" || name == "Groupid") {
	        return false
	    } else if (name == "sendTime" && newVal == "sendTimeS") {
	        return false //选择日期的时候，查询方法另外写
	    } else {
	        if (name == "sendTime") {
	            dataSta.sendTimeS = []
	        };//日期选择器 置空
            if (name=="methods" && newVal=="1") {
                showColumn(newVal)
            }else if (name=="methods" && newVal=="2") {
                showColumn(newVal)
            }else if (name=="methods" && newVal=="3") {
                showColumn(newVal)
            }; // 根据选项，隐藏活显示 某些列
	        alert(name + ':' + newVal + '\n 添加查询方法')
	        avalon.vmodels.sg1.render(newDatas(4)); //重新渲染表格
	        return;
	    }
	})
    dataSta.GroupAdd.$watch("length",function (newVal) {
        alert('GroupAdd:' + dataSta.GroupAdd + '\n 添加查询方法')
        avalon.vmodels.sg1.render(newDatas(7)); //GroupID 增加、删除的时候，添加查询方法
    })

    showColumn("1") // 初始化的时候 隐藏某些列
    avalon.vmodels.sg1.render(getDatas(3)); //初始化表格数据
    // 控制哪些列是可见不可见
    function showColumn (a) {
        switch(a)
            {
            case "1":
                A.vmodels.sg1.setColumns(byPeople, true)
                A.vmodels.sg1.setColumns(byCount, false)
                A.vmodels.sg1.setColumns(byOwner, false)
                break;
            case "2":
                A.vmodels.sg1.setColumns(byPeople, false)
                A.vmodels.sg1.setColumns(byCount, true)
                A.vmodels.sg1.setColumns(byOwner, false)
                break;
            case "3":
                A.vmodels.sg1.setColumns(byPeople, false)
                A.vmodels.sg1.setColumns(byCount, false)
                A.vmodels.sg1.setColumns(byOwner, true)
                break;
            }
    }

});
