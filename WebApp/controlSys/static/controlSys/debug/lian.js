define(function(require) {
    var A = require("A");
    var $ = require("$");
    require("A-dropdown");
    require("A-dialog");
    var inlistDate;
    //初始化数据  不能异步
    inlistDate = require('./shijianchuliData');
    var condition = A.define({
        $id: "condition",
        shortorder:"626545454545",
        customer:"唐伟",
        telphone:"1365151515",
        planDate:"2015/12/12 10:45 至 2015/12/12 10:45",
        actualDate:"2015/12/12 10:45 至 2015/12/12 10:45",
        carDeposit:"￥13000",
        legalDeposit:"￥13000",
        rander:"于东",
        telmobel:"64654654456446",
        cartype:"悦动2011",
        factoryPrice:137800,
        residual:127082.2,
        carCode:"京NB9999",
        box:"在线"
    });

    var follow = A.define({
        $id: "follow",
        handleData:inlistDate.handleData
    });

    var handelopt = A.define({
        $id: "handelopt",
        handelPeo:"张三",
        isCustomerService:inlistDate.isCustomerService,
        isCustomerServiceitem:"0",
        scTimer:"2015/02/02 13:50",
        xxsh:"",
        policeName:"",
        policeiPhone:"151415154",
        policeTel:"202112121",
        policeHotel:"阿达撒旦",
        sucSub:function(){
            var parm = JSON.parse(JSON.stringify(handelopt.$model));
            console.log(parm)
        }
    });
    A.scan();
    
});
