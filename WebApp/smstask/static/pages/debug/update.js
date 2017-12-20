define(function(require) {
    var A = require("A");
    var $ = require("$");
    var verifytip;
    require("A-verify");
    require("A-datepicker");
    require("A-dropdown");
    var addSms;
    var opt=findUrlParameters("opt");

    function findUrlParameters(o){var reg = new RegExp("(^|&)"+ o +"=([^&]*)(&|$)");var r = window.location.search.substr(1).match(reg); if(r!=null)return  unescape(r[2]); return null;}
    function setopt(data){
        return {
            listClass: 'bj-oni-dropdown ',
            titleClass: 'bj-oni-dropdown bj-oni-dropdown-sm dropdown-default',
            width:'200px',
            data: data
        }
    }
    // 优惠券数据 模拟 START
    var yhjDATA=[
        {yhjid:33,yhjmoney:200,starttime:"2015-07-21 14:53",overtime:"2015-07-21 14:53"},
        {yhjid:33,yhjmoney:200,starttime:"2015-07-21 14:53",overtime:"2015-07-21 14:53"},
        {yhjid:33,yhjmoney:200,starttime:"2015-07-21 14:53",overtime:"2015-07-21 14:53"}
    ]
    // 优惠券数据 模拟 END

    // 优惠券数据 模拟 START
    var sqlDATA="jijiji;ssessesse;989898;"
    // 优惠券数据 模拟 END
    var sqlDATA_S = sqlDATA.split(";");
    sqlDATA_S.pop(); //删掉最后一个空的元素

    require.async('./adddata', function(dropdata) {
        addSms = A.define({
            $id: "addMess",
            activeName: "",
            taskId: "",
            groupId: "",
            pzId: "",
            execute: "",
            typeDdl: "",
            messCon: "",
            sqlCon1: sqlDATA_S[0],
            sqlCon2: "",
            yhjId: "",
            yhjMoney: "",
            overTime:"",
            startTime:"",
            tsTime:"",
            sql_S:sqlDATA_S,
            yhj_S:yhjDATA,
            $typeOpts: setopt(dropdata.dropdowndata),
            type:"",
            verifySuccSubmit: function() {
                var parm = addSms.$model;
                //var parm=JSON.parse(JSON.stringify(addSms.$model))
                console.log(parm);
                console.log("验证--成功--提交事件操作");
                if("add"==(opt)){
                    alert("111");
                    //添加
                    addTask(parm);
                    return;
                }
            },
            verifyFailSubmit: function() {
                console.log("验证--失败--提交事件操作");
            },
            reset1: function(e) {
                addSms.validationVM && addSms.validationVM.resetAll()
            },
        });
        A.scan();
    });

    A.scan();
});
