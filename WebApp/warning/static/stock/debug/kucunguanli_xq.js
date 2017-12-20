define(function(require) {
    var A = require("A");
    var $ = require("$");
    require("A-dropdown");

    var inlistDate;
    //初始化数据  不能异步
    inlistDate = require('./kucunguanlixq_Data');
    var condition = A.define({
        $id: "condition",
        imsi: "888888888888",
        SIM:"888888888888",
        boxCode:"北京",
        com:"",
        $company:{
            data:inlistDate.company,
            width:290,
            listWidth:290,
            titleClass: "carplateTitle",
            listClass: "carplateTitleItem"
        },
        sup:"",
        $supplier:{
            data:inlistDate.supplier,
            width:290,
            listWidth:290,
            titleClass: "carplateTitle",
            listClass: "carplateTitleItem"
        },
        yunying_default:"0",
        yunying:inlistDate.yunying,
        rukuTimer:"2015-08-08",
        rukuPerson:"陈波",
        editTimer:"2015-08-08",
        EditPerson:"2015-08-08",
        EditCon:"ddddddddd奶粉哈发放哈就发觉啊哈哈霸道发附件啊发哈减肥哈减肥咖啡哈啊发哈减肥哈减肥咖啡哈法航飞机咖啡哈尽快发哈",
        openState:"2015-08-08",
        interState:"2015-08-08",
        userState:"2015-08-08",
        beizhu:""
    });

});
