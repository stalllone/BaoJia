define(function(require) {
    var A = require("A");
    var $ = require("$");
    require("A-pager");
    var inlistDate;
    //初始化数据个数
    var dataS=getData(300);
    var dataTS=getCommenData(1);
    //初始化数据  不能异步
    inlistDate = require('./shijianchuli_xqData');
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
        handlePeo:inlistDate.handleData.handlePeo,
        handleOpt:inlistDate.handleData.handleOpt,
        carType:inlistDate.handleData.carType,
        windColor:inlistDate.handleData.windColor,
        isPush:inlistDate.handleData.isPush,
        handleTimer:inlistDate.handleData.handleTimer,
        remarksTimer:inlistDate.handleData.remarksTimer,
        commentTimer:inlistDate.handleData.commentTimer,
        detail:inlistDate.handleData.detail,
        tjpz:"",
        sucSub:function(){
            var newpzData={};
           newpzData.commenPeo="张三";
           newpzData.commenTimer="2014/15/15 12:50";
           newpzData.commencon=follow.tjpz;
           follow.commenAll=[];
           dataTS.unshift(newpzData)
           follow.commenAll=dataTS.slice(0, 5);
           follow.doIsShowPage2();
        },
        //备注分页
        $pagerOpt:{
            perPages:5,
            currentPage: 1,
            totalItems: dataS.length,
            showJumper: true,
            showPages:5,
            onJump: function(e, page) {
                var pageNo = page.currentPage;
                var pageSize = page.perPages;
                follow.remarksAll=dataS.slice((pageNo-1)*pageSize, pageNo*pageSize)
            }
        },
        isShowPage:function(){
            if(dataS.length<=follow.$pagerOpt.perPages){
                return false;
            }else{
                return true;
            }
        },
        remarksAll:dataS.slice(0, 5),
        //备注分页

        //批注分页
        $pagerOpt2:{
            perPages:5,
            currentPage: 1,
            totalItems: dataTS.length,
            showJumper: true,
            showPages:5,
            onJump: function(e, page) {
                var pageNo = page.currentPage;
                var pageSize = page.perPages;
                follow.commenAll=dataTS.slice((pageNo-1)*pageSize, pageNo*pageSize)
            }
        },
        isShowPage2:false,
        doIsShowPage2:function(){
              follow.isShowPage2 =dataTS.length>=follow.$pagerOpt2.perPages;
              var dataTSsize=dataTS.length;
              A.vmodels.$pager2.totalItems=dataTSsize;
        },
        commenAll:dataTS.slice(0, 5)
        //批注分页
    });
    A.scan();
    follow.$watch("commenAll", function(a){
        console.log(a);
    })
    //异步数据交互---备注数据
    function getData(number) {
        data = [];
        for (var i = 0; i < number; i++) {
            data.push({
                id: i + 1,
                handlePeo:"张蕊"+i,
                remarksTimer:"2015/1/15 20:30",
                remarkscon:"啊热热我而去3143积分怕激发去3143积分怕激发去3143积分怕激发去3143积分怕激发15415da1sdasad地方撒旦阿道夫爱的色放是打发发的吩咐道发f"
            })
        }
        return data;
    }
    //异步数据交互---批注数据
    function getCommenData(number) {
        data2 = [];
        for (var i = 0; i < number; i++) {
            data2.push({
                id: i + 1,
                commenPeo:"张蕊"+i,
                commenTimer:"2015/1/15 20:30",
                commencon:"啊热热我而去3143积分怕激发去3143积分怕激发去3143积分怕激发去3143积分怕激发15415da1sdasad地方撒旦阿道夫爱的色放是打发发的吩咐道发f"
            })
        }
        return data2;
    }
});
