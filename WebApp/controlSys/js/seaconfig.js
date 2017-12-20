//系统配置
sysConfig = {
    viewPath: "/views",
    modelPath: "/group",
    signinUrl:"/",
    urlPath: "",
    jsTracking: true,
    isDebug: true,
    pageSize:15,
    message:"您没有权限进行操作",
    notLoginMessage:"登录信息异常，请重新登录"
}
seajs.pagejs = function(url) {
        if (sysConfig.isDebug) {
            url = url.replace("/src/", "/debug/");
        }
        seajs.use(url);
    }
    // SeaJS配置
seajs.config({
    alias: {
        "$": "libs/jquery-2.1.1.min",
        "A": "libs/avalon.min",
        "W": "widget/widget",
        "C": "widget/common/common",

        "Avalon": "libs/avalon.min",
        "browser": "widget/common/browser",
        "cookie": "widget/common/cookie",
        "store": "widget/common/store",
        "promise": "widget/common/promise",

        "A-getModel": "libs/avalon.getModel",
        "A-live": "libs/avalon.live",
        "A-position": "libs/avalon.position",
        "A-scrollspy": "libs/avalon.scrollspy",
        "A-button": "libs/avalon.button",
        "A-checkboxlist": "libs/avalon.checkboxlist",
        "A-verify": "libs/avalon.validation",
        "A-dialog": "libs/avalon.dialog",
        "A-doublelist": "libs/avalon.doublelist",
        "A-drag": "libs/avalon.draggable",
        "A-dropdown": "libs/avalon.dropdown",
        "A-dropdownlist": "libs/avalon.dropdownlist",
        "A-flipswitch": "libs/avalon.flipswitch",
        "A-menu": "libs/avalon.menu",
        "A-tab": "libs/avalon.tab",
        "A-timer": "libs/avalon.timer",
        "A-tree": "libs/avalon.tree",
        "A-tree-check": "libs/avalon.tree.check",
        "A-tree-droptree": "libs/avalon.tree.droptree",
        "A-tree-edit": "libs/avalon.tree.edit",
        "A-tree-menu": "libs/avalon.tree.menu",
        "A-tooltip": "libs/avalon.tooltip",
        "A-datepicker": "libs/avalon.datepicker",
        "A-datepicker-lang": "libs/avalon.datepicker.lang",
        "A-daterangepicker": "libs/avalon.daterangepicker",
        "A-coupledatepicker": "libs/avalon.coupledatepicker",
        "A-loading": "libs/avalon.loading",
        "A-scrollbar": "libs/avalon.scrollbar",
        "A-slider": "libs/avalon.slider",
        "A-request": "libs/avalon.request",
        "A-suggest": "libs/avalon.suggest",
        "A-textbox": "libs/avalon.textbox",
        "A-pager": "libs/avalon.pager",
        "A-smartgrid": "libs/avalon.smartgrid",
        "bug": "widget/common/bug",
        "selectCar": "plugin/selectCar",
        "selectPara": "plugin/selectParam",
        "bj-tip": "widget/bj.tip",
        "bjPage": "widget/bjPage",
        "lightbox": "plugin/lightbox/lightbox"
    },

    // 路径配置
    paths: {},
    // 变量配置
    vars: {},
    // 映射配置
    map: [
        ["http://example.com/js/app/", "http://localhost/js/app/"]
    ],
    // 预加载项
    preload: [
        window.$ ? "" : "$",
        window.avalon ? "" : "Avalon"
    ],
    // 调试模式
    debug: true,
    // Sea.js 的基础路径
    // base: "http://example.com/path/to/base/",
    // 文件编码
    charset: "utf-8"
});

//第三方功能插件
seajs.config({
    // 别名配置
    alias: {
        "swiper": "plugin/swiper/swiper.min",
        "scroll": "plugin/slimscroll"
    }
});

//css 配置
seajs.config({
    // 别名配置
    alias: {
        "bj-tip-css2": "/css/widget/bj.tip.css",
        "bj-tip-css4": "/css/widget/bj.tip.css",
        "A-common-css": "/css/libs/oniui-common.css",
        "A-button-css": "/css/libs/avalon.button.css",
        "A-checkboxlist-css":"/css/libs/avalon.checkboxlist.css",
        "A-scrollbar-css": "/css/libs/avalon.scrollbar.css",
        "A-slider-css": "/css/libs/avalon.slider.css",
        "A-dialog-css": "/css/libs/avalon.dialog.css",
        "A-doublelist-css": "/css/libs/avalon.doublelist.css",
        "A-dropdown-css": "/css/libs/avalon.dropdown.css",
        "A-dropdownlist-css": "/css/libs/avalon.dropdownlist.css",
        "A-menu-css": "/css/libs/avalon.menu.css",
        "A-flipswitch-css": "/css/libs/avalon.flipswitch.css",
        "A-tree-css": "/css/libs/avalon.tree.css",
        "A-tree-menu-css": "/css/libs/avalon.tree.menu.css",
        "A-tree-droptree-css": "/css/libs/avalon.tree.droptree.css",
        "A-tab-css": "/css/libs/avalon.tab.css",
        "A-tooltip-css": "/css/libs/avalon.tooltip.css",
        "A-timer-css": "/css/libs/avalon.timer.css",
        "A-datepicker-css": "/css/libs/avalon.datepicker.css",
        "A-daterangepicker-css": "/css/libs/avalon.daterangepicker.css",
        "A-coupledatepicker-css": "/css/libs/avalon.coupledatepicker.css",
        "A-loading-css": "/css/libs/avalon.loading.css",
        "A-suggest-css": "/css/libs/avalon.suggest.css",
        "A-textbox-css": "/css/libs/avalon.textbox.css",
        "A-pager-css": "/css/libs/avalon.pager.css",
        "A-smartgrid-css": "/css/libs/avalon.smartgrid.css",
        "lightbox-css": "plugin/lightbox/lightbox.css"
    }
});
