define(function(require) {
    var A = require("A");
    var $ = require("$");
    require("A-dropdown");
    require("A-verify");
    require("A-smartgrid");
    require("A-tooltip");
    require("A-dialog");

    var inlistDate;
    //初始化数据  不能异步
    inlistDate = require('./carWarn_yyycData');
    var companyModel = A.define({
        $id: "indexList",
        com: "",
        $company: {
            data: inlistDate.company,
            width: 250,
            listWidth: 250,
            height: 200,
            onChange: function() {
                renderGrid(1);
            }
        },
        quHuancar: inlistDate.quHuancar,
        quhuan: "0",
        choose_type: "",
        // choose_type1:"",
        resetChooseCar: function(val) {
            companyModel.choose_type = "";
            // companyModel.choose_type1="";
            renderGrid(1);
        },
        zdUpdate: function() {
            alert(112121);
        },
        enable_true: function(rowID, isF) {
            var obj = A(this);
            switch(isF){
                //黄色星星
                case 0:
                    companyModel._rowID = rowID;
                    avalon.vmodels.dd.toggle = true;
                    avalon.vmodels.dd.rowid = rowID;
                    companyModel.quxiaoguanzhuReason = "";
                break;
                //空心星星
                case 1:
                    companyModel._rowID = rowID;
                    avalon.vmodels.bb.toggle = true;
                    avalon.vmodels.bb.rowid = rowID;
                    companyModel.guanzhuReason = "";
                break;
                //灰色星星
                case 2:
                    companyModel._rowID = rowID;
                    avalon.vmodels.bb.toggle = true;
                    avalon.vmodels.bb.rowid = rowID;
                    companyModel.guanzhuReason = "";
                break;

            }
        },
        typeo: "",
        $typeOpts: {
            data: inlistDate.condition,
            titleClass: "span_dropdown",
            listClass: "map_side_each_item",
            width: 130,
            listWidth: 130,
            onChange: function() {
                renderGrid(1);
            }
        },
        co: "",
        $carOpts: {
            data: inlistDate.carData,
            titleClass: "span_dropdown1",
            listClass: "map_side_each_item",
            width: 100,
            listWidth: 100,
            onChange: function() {
                renderGrid(1);
            }
        },
        select_input: "sadsadsa",
        select_input_btn: function() {
            alert(companyModel.select_input);
        },
        signInfo: inlistDate.signInfo,
        _rowID: "",
        /*配置表格sgOpts2*/
        sgOpts2: {
            pageable: true,
            pager: {
                showPages: 5,
                // currentPage: 1,
                // totalItems: 10,
                showJumper: true,
                onJump: function(e, pagedata) {

                },
                perPages: 20
            },
            htmlHelper: { // 渲染列数据的方法集合
                // 包装关注列的数据
                actfavorite: function(vmId, field, index, cellValue, rowData) {

                    var startStyle = rowData.favorite 
                    switch(rowData.favorite){
                        case 0: startStyle="star_f";break;
                        case 1: startStyle="star_p";break;
                        case 2: startStyle="star_g";break;
                    }
                   
                    var enable_trueFnHtml = "enable_true(" + rowData.id + "," + rowData.favorite + ")";
                    var aaaFn = "aaaaa(" + rowData.favorite + ",'" + rowData.guanzhuReason + "','" + rowData.quxiaoguanzhuReason + "')";
                    var disabledHtml = '<a  id=' + ("aaa" + rowData.id) + ' class="' + (startStyle) + '"  ms-click="' + enable_trueFnHtml + '""  ms-mouseenter="' + aaaFn + '" "></a>'
                    return disabledHtml
                },
                // 包装操作列的数据
                actoperate: function(vmId, field, index, cellValue, rowData) {
                    var enabledHtml = '<span class="opt_btn"><a target="_Blank" href="http://www.baidu.com?' + rowData.id + '">盒子</a></span>'
                    var lishiFnHtml = "lishi('cc'," + rowData.id + ")"
                    enabledHtml += '<span ms-click="' + lishiFnHtml + '" class="opt_btn">预警历史</span>'
                    return enabledHtml
                }

            },
            columns: [{
                key: "favorite",
                name: "关注",
                sortable: false,
                width: "5%",
                autoResize: false,
                format: "actfavorite"
            }, {
                key: "cityid", //列标识
                name: "城市", //列名
                sortable: false, //否可排序
                isLock: true, //是否锁死列让其始终显示
                align: "center", //列的对象方式
                defaultValue: "shirly", //列的默认值
                customClass: "ddd", //自定义此列单元格类
                toggle: false, //控制列的显示隐藏
                // autoResize: true,
                width: "10%" //设置列的宽度

            }, {
                key: "carCodeType",
                name: "车牌号",
                sortable: false,
                align: "center",
                autoResize: false,
                width: "5%"
            }, {
                key: "carType",
                name: "车型年款",
                sortable: false,
                align: "center",
                autoResize: false,
                width: "10%"
            }, {
                key: "warnType",
                name: "预警类型",
                sortable: false,
                width: "5%",
                autoResize: false
            }, {
                key: "warnTime",
                name: "预警时间",
                sortable: false,
                width: "10%",
                autoResize: false
            }, {
                key: "warnRange",
                name: "预警范围",
                sortable: false,
                width: "5%",
                autoResize: false
            }, {
                key: "currentSpeed",
                name: "当前时速",
                sortable: false,
                width: "5%",
                autoResize: false
            }, {
                key: "currentPos",
                name: "当前位置",
                sortable: false,
                align: "center",
                width: "15%",
                autoResize: false
            }, {
                key: "currentTime",
                name: "定位时间",
                sortable: false,
                width: "10%",
                autoResize: false
            }, {
                key: "operate",
                name: "操作",
                sortable: false,
                align: "center",
                autoResize: false,
                width:"15%",
                format: "actoperate"
            }]
        },
        /*配置表格sgOpts2*/
        lishi: function(id, rowID) {
            companyModel._rowID = rowID;
            avalon.vmodels[id].toggle = true;
        },
        guanzhuReason: "",
        quxiaoguanzhuReason:"",
        
        /*加关注弹层*/
        $bbOpts: {
            title: "加入重点关注",
            container: "modalWrapper",
            onConfirm: function() {
                var parm = JSON.parse(JSON.stringify(companyModel.$model));
                console.log(parm._rowID)
                var sg2Data = A.vmodels.sg2.data;
                for (var i = 0; i < sg2Data.length; i++) {
                    if (sg2Data[i].id == parm._rowID) {
                        sg2Data[i].favorite = 0;
                        var str=companyModel.guanzhuReason.replace(/\n/g,"<br>");
                        sg2Data[i].guanzhuReason = str;
                    }
                };
                A.vmodels.sg2.render(sg2Data);
            }
        },
        $ddOpts: {
            title: "取消关注原因",
            width: 400,
            container: "modalWrapper",
            onConfirm: function() {
                var parm = JSON.parse(JSON.stringify(companyModel.$model));
                console.log(parm._rowID)
                var sg2Data = A.vmodels.sg2.data;
                for (var i = 0; i < sg2Data.length; i++) {
                    if (sg2Data[i].id == parm._rowID) {
                        sg2Data[i].favorite = 2;
                        var str=companyModel.quxiaoguanzhuReason.replace(/\n/g,"<br>");
                        sg2Data[i].quxiaoguanzhuReason = str;
                    }
                };
                A.vmodels.sg2.render(sg2Data);
            }

        },
        aaaaa: function(isF, reason,quxiaoreason) {
            switch(isF){
                //黄色星星
                case 0:
                var parm = JSON.parse(JSON.stringify(companyModel.$model));
                console.log(parm.guanzhuReason)
                $('.gztip').show();
                var disX=$(this).offset().left+30;
                var disY=$(this).offset().top-10;
                $('.gztip').css('left',disX)
                $('.gztip').css('top',disY)
                //人和时间
                var date=new Date();
                var dateNoW=date.Format("yyyy-MM-dd hh:mm");
                var person="tongxg";
                $('.gztip').html('<b></b><span class="pull-right">'+dateNoW+'</span>' +person+'<br>'+ reason);
                break;

                case 1:
                $('.gztip').hide();
                break;
                //灰色星星
                case 2:
                //人和时间
                var parm = JSON.parse(JSON.stringify(companyModel.$model));
                console.log(parm.quxiaoguanzhuReason)
                $('.gztip').show();
                var disX=$(this).offset().left+30;
                var disY=$(this).offset().top-10;
                $('.gztip').css('left',disX)
                $('.gztip').css('top',disY)
                var date=new Date();
                var dateNoW=date.Format("yyyy-MM-dd hh:mm");
                var person="tongxg";
                $('.gztip').html('<b></b><span class="pull-right">'+dateNoW+'</span>' +person+'<br>'+ quxiaoreason);
                break;
            }

        },
        bbbbb: function() {
            $('.gztip').hide();
        },
        /*加关注弹层*/
        get_phoneNo2: function(id) {

            var obj = $("#aaa" + id);
            if (!obj.hasClass('star_f')) {

                $(this).find("span").show();

            } else {
                return false;
            }

            ;
        },
        istelphone2: true,
        /*预警历史按钮点击出弹层*/
        $ccOpts: {
            title: "预警历史",
            confirmName: "取消",
            width: 800,
            container: "modalWrapper"
        },
        /*预警历史按钮点击出弹层*/

        /*配置弹层预警历史中表格sg3*/
        sgOpts3: {
            pageable: false,
            autoResize: true,
            columns: [{
                key: "lishiDate",
                name: "预警日期",
                sortable: false,
                width: 150,
                autoResize: false,

            }, {
                key: "lishiRule", //列标识
                name: "预警规则", //列名
                sortable: false, //否可排序
                isLock: true, //是否锁死列让其始终显示
                align: "center", //列的对象方式
                toggle: false, //控制列的显示隐藏
                // autoResize: true,
                width: 150 //设置列的宽度
            }, {
                key: "lishiPeop", //列标识
                name: "解除人", //列名
                sortable: false, //否可排序
                isLock: true, //是否锁死列让其始终显示
                align: "center", //列的对象方式
                toggle: false, //控制列的显示隐藏
                // autoResize: true,
                width: 150 //设置列的宽度
            }, {
                key: "jiechuDate", //列标识
                name: "解除时间", //列名
                sortable: false, //否可排序
                isLock: true, //是否锁死列让其始终显示
                align: "center", //列的对象方式
                toggle: false, //控制列的显示隐藏
                // autoResize: true,
                width: 150 //设置列的宽度
            }, {
                key: "lishiReason", //列标识
                name: "解除原因", //列名
                sortable: false, //否可排序
                isLock: true, //是否锁死列让其始终显示
                align: "center", //列的对象方式
                toggle: false, //控制列的显示隐藏
                // autoResize: true,
                width: 156 //设置列的宽度
            }],
            data: altHostoryData(3)
        },
        /*配置弹层预警历史中表格sg3*/

        $ppOpt2: {
            "contentGetter": function(elem) {
                if (elem.tagName.toLowerCase() == 'input' || elem.getAttribute("tp")) return companyModel.phoneNo2 + (elem.getAttribute("tp") == "2" ? "  <a ms-click=\"hide($event)\" href=\"#\">&times;</a>" : "")
            },
            autohide: true,
            event: 'mouseover',
            positionAt: 'right bottom',
            positionMy: 'left+10 bottom+15'
        },
    })

    companyModel.$watch("choose_type", function(newVal) {
        renderGrid(1);
    });

    A.scan();

    renderGrid(1);
    //异步数据交互表格数据
    function renderGrid(page) {
        parm = {
            company: companyModel.com,
            typeo: companyModel.typeo,
            co: companyModel.co,
            quhuan: companyModel.quhuan, //切换待选车/待换车
            select_input: companyModel.select_input, //sad输入框数据
            choose_type: companyModel.choose_type, //断电数据
        };
        console.log(parm);

        var dataS = [];
        for (var i = 0; i < 10; i++) {
            dataS.push({
                id: i + 1,
                favorite: i % 3 ,
                cityid: "北京_" + i,
                warnType: "越界",
                carCodeType: "京NSK039",
                carType: "别克GL8 2004",
                warnTime: "15/04/29 13:09",
                warnRange: "出上海",
                currentSpeed: "150KM/H",
                currentPos: "河北省廊坊市固安廊坊市固安",
                currentTime: "15/04/29 13:09",
                operate: "",
                guanzhuReason: "testreason",
                quxiaoguanzhuReason:"sdasdadsasdsadas"
            })
        }
        A.vmodels.sg2.render(dataS);
    }

    //异步数据交互预警历史中表格sg3
    function altHostoryData(number) {
        var dataS2 = [];
        for (var i = 0; i < number; i++) {
            dataS2.push({
                id: i + 1,
                lishiDate: "15/05/29 09:13",
                lishiRule: "四年以内新车" + i,
                lishiPeop: "赵立安" + i,
                jiechuDate: "1505151121",
                lishiReason: "那非法进阿飞哈卡发放啊哈快发货方那非法进阿飞哈卡发放啊哈快发货方"
            })
        }
        return dataS2;
    }

});
