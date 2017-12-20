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
        handlePeo:"张三",
        handleopations:inlistDate.handleopations,
        carState:inlistDate.carState,
        isCustomerService:inlistDate.isCustomerService,
        carStateitem:"0",
        detailxq:"",
        isCustomerServiceitem:"0",
        handel:function(a){
            switch(a){
                case "0":
                    alertDigo("hmd");  
                break;
                case "1":
                    alertDigo("cd");
                break;
                case "2":
                    alertDigo("dj");
                break;
            }
        },
        $chedanOpts: {
            title: "撤单清退",
            showClose: false,
            container: "modalWrapper",
            width:600,
            onConfirm: function() {
                var parm = JSON.parse(JSON.stringify(handelopt.$model));
                console.log(parm.cdReasonitem)
            }
        },
        cdReasonitem:"",
        chedanPeo:"租客原因",
        chedanReason:"不符合审核条件",
        $cdReasonList:{
            data: inlistDate.cdReasonList,
            width: 350,
            listWidth: 350,
            height:150,
            onConfirm: function() {
                var parm = JSON.parse(JSON.stringify(handelopt.$model));
                console.log(parm)
            }
        },
        $heidanOpts: {
            title: "加入黑名单",
            showClose: false,
            container: "modalWrapper",
            width:600
        },
        customer:condition.customer,
        telphone:condition.telphone,
        customerPeoId:"411544165854651654",
        chooseyouxiao:inlistDate.chooseyouxiao,
        chooseyouxiaoitem:"0",
        $hmdCity:{
            data: inlistDate.hmdCity,
            width: 200,
            listWidth: 200,
            height:150
        },
        hmdCityitem:"",
        $hmdOrg:{
            data: inlistDate.hmdOrg,
            width: 200,
            listWidth: 200,
            height:150
        },
        hmdOrgitem:"",
        $hmdjibie:{
            data: inlistDate.hmdjibie,
            width: 200,
            listWidth: 200,
            height:150
        },
        hmdjibieitem:"",
        $hmdlabel:{
            data: inlistDate.hmdlabel,
            width: 200,
            listWidth: 200,
            height:150
        },
        hmdlabelitem:"",
        hmdyuanyin:"",
        $dongjieOpts: {
            title: "冻结订单",
            showClose: false,
            container: "modalWrapper",
            onConfirm: function() {
                var parm = JSON.parse(JSON.stringify(handelopt.$model));
                console.log(parm)
            }
        },
        shortorder:condition.shortorder,
        yuanyin:"",
        miaoshu:"",
        debitType:inlistDate.debitType,
        debitTypeitem:[],
        sucSub:function(){
            var parm = JSON.parse(JSON.stringify(handelopt.$model));
            console.log(parm)
        }
    });
    A.scan();
    function alertDigo(id) {
        avalon.vmodels[id].toggle = true;
    }
});
