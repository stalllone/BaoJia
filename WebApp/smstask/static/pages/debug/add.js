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
            sqlCon1: "",
            sqlCon2: "",
            yhjId: "",
            yhjMoney: "",
            overTime:"",
            startTime:"",
            tsTime:"2015-03-15 16:24",
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
