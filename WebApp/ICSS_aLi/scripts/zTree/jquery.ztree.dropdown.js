// (function ($) {
//     "use strict";
//     $.treeSel = $.treeSel || {};
//     $.extend($.treeSel, {
//         defaults: {},
//         dom: {
//             checkTxt: { text: "已选条件", width: 10, css: {} },
//             clearBtn: { text: "×", title: "清除", defaultcss: { width: 10, position: "absolute", right: 0, top: "3px", "color": "red", "text-align": "left", "cursor": "pointer", "font-size": "12px", "font-weight": "bolder" }, css: { width: 10 } },
//             openBtn: { text: "+", title: "展开", defaultcss: { width: 16, height: "100%", position: "absolute", right: 0, top: 0, "background-color": "#F4F4F4", "color": "#0000ff", "font-size": "16px", "font-weight": "bolder", "cursor": "pointer", "text-align": "center" }, css: {} },
//             hideBtn: { text: "-", title: "缩起" }
//         },
//         css: {
//             backgroundcolor: "#fff",
//             treeul: { margin: "0px", padding: "0px", background: "#f0f6e4", height: "auto", "overflow-y": "scroll", "overflow-x": "auto" }
//         }
//     });
// })(jQuery);

(function ($) {
    "use strict";
    if (typeof Array.indexOf !== 'function') {
        Array.prototype.indexOf = function (args) {
            var index = -1;
            for (var i = 0, l = this.length; i < l; i++) {
                if (this[i] === args) { index = i; break; }
            }
            return index;
        }
    }

    $.treeSel = $.treeSel || {};
    $.extend($.treeSel, {
        guid: 1,
        version: "1.0.0",
        //执行方法
        getAccessor: function (obj, expr) {
            var ret, p, prm = [], i;
            if (typeof expr === 'function') { return expr(obj); }
            ret = obj[expr];
            if (ret === undefined) {
                try {
                    if (typeof expr === 'string') {
                        prm = expr.split('.');
                    }
                    i = prm.length;
                    if (i) {
                        ret = obj;
                        while (ret && i--) {
                            p = prm.shift();
                            ret = ret[p];
                        }
                    }
                } catch (e) { }
            }
            return ret;
        },
        //执行方法
        getMethod: function (name) {
            return this.getAccessor($.fn.treeSelect, name);
        },
        //自定义扩展方法
        extend: function (methods) {
            $.extend($.fn.treeSel, methods);
            if (!this.no_legacy_api) {
                $.fn.extend(methods);
            }
        },
        // 异常处理方法  @message 异常信息   @excLevel  异常级别（枚举值 0【log】,1【】,2,3,4）。
        doException: function (message, excLevel) {
            if (excLevel && parseInt(excLevel) > 0) {
                excLevel = parseInt(excLevel);
            } else {
                excLevel = 0;
            }
            switch (excLevel) {
                case 0:
                    console.info(message);
                    break;
                case 1:
                    console.log(message);
                    break;
                case 2:
                    console.warn(message);
                    break;
                case 3:
                    console.error(message);
                    break;
                default:
                    console.info(message);
                    break;
            }
        },
        getJsonField: function (curJson, fieldName) {
            if (curJson || curJson.length == 0 || fieldName == "") {
                return [];
            }
        }
    });

    var methodsHelp = {/// 初始化设置
        initOpt: function (opt) {
            // $.treeSel.dom.clearBtn["showcss"] = $.extend(true, $.treeSel.dom.clearBtn.defaultcss, $.treeSel.dom.clearBtn.css);
            // $.treeSel.dom.openBtn["showcss"] = $.extend(true, $.treeSel.dom.openBtn.defaultcss, $.treeSel.dom.openBtn.css);
            // $.treeSel.dom.clearBtn.showcss.right = $.treeSel.dom.openBtn.showcss.width + "px";

            opt = $.extend(true, {
                width: 0,
                height: 25,
                menuHeight: 250,
                canHide: true,// 隐藏 选项
                bgColor: "#fff",
                multiple: false,
                showLine: true,
                orgNode: [],
                initNode: [],
                orgData: [],
                initData: [],
                mustSel: false,   //是否是必选项               
                float: true,
                callback: {
                    onChanged: null
                }
            }, opt);

            if (opt.initData.length == 0 && opt.initNode.length > 0) opt.initData == opt.initNode;  //兼容以前的设置
            if (opt.orgData.length == 0 && opt.orgNode.length > 0) opt.orgData == opt.orgNode;  //兼容以前的设置

            return opt;
        },
        initInEvent: function ($choice, $clear, $onoff) {
            $onoff.append($.treeSel.dom.hideBtn.text).prop("title", $.treeSel.dom.hideBtn.title);
            $choice.bind("click", function () {
                var $obj = $(this).parents("div.treeSel-parent");
                var treediv = $obj.find("div.treeSel-dropdiv");
                if ($obj.hasClass("treeSel-hidediv")) {
                    treeSelectEvent["show"].apply($obj);
                } else {
                    treeSelectEvent["hide"].apply($obj);
                }
            });
        },
        initMenu: function ($dropDiv, opt) {
            this.$droptree = $('<ul class="ztree" id="' + opt["treeid"] + '"></ul>');
            //this.$droptree.css($.treeSel.css.treeul);
            var $objTree = $.fn.zTree.init(this.$droptree, {
                view: {
                    selectedMulti: false,
                    showLine: true,
                    showIcon: function (treeId, treeNode) {
                        return treeNode.isParent;
                    }
                },
                data: {
                    simpleData: {
                        enable: true
                    }
                },
                callback: {
                    onClick: treeEvent.onClick,
                    onCheck: treeEvent.onCheck
                },
                check: {
                    enable: opt.multiple
                }
            }, opt.orgData);

            if (opt.orgData.length < 50)
                $objTree.expandAll(true);
            $dropDiv.append(this.$droptree);
            if ($dropDiv.height() > opt.menuHeight) {
                this.$droptree.css({ height: opt.menuHeight });
            }
        },
        initFloatDom: function ($parent, $choice, $dropDiv) {
            $choice.css({ border: "none" });
            $parent.css({ position: "relative" })
            $dropDiv.css({ position: "absolute", border: "1px solid #E5e5e5", "z-index": "999", "background-color": "#fff" }).hide();
        },
        initFloatEvent: function ($choice, $clear, $onoff) {
            $onoff.append($.treeSel.dom.openBtn.text).prop("title", $.treeSel.dom.openBtn.title);
            $choice.bind("click", function () {
                var $obj = $(this).parents("div.treeSel-parent");
                if ($obj.hasClass("treeSel-showdiv")) {
                    treeSelectEvent["hide"].apply($obj);
                } else {
                    treeSelectEvent["show"].apply($obj);
                }
            });
            $choice.hover(function () {
                var $obj = $(this).parent("div.treeSel-parent").parent();
                $obj.find("div.treeSel-dropdiv").css({ border: "1px solid #AED0EA", "border-top": "none" });
            }, function () {
                var $obj = $(this).parent("div.treeSel-parent").parent();
                $obj.find("div.treeSel-dropdiv").css({ border: "1px solid #ccc", "border-top": "none" });
            });

            $('body').click(function (e) {
                var $objs;
                if ($(e.target).parents('div.treeSel-parent').length > 0) {
                    if ($('div.treeSel-showdiv').length > 1) {
                        var targetid = $(e.target).parents('div.treeSel-parent').parent()[0].id;
                        $objs = $("div.treeSel-parent");
                        $.each($objs, function (i, item) {
                            if ($(item).parents('div#' + targetid).length === 0) {
                                treeSelectEvent["hide"].apply(item);
                            }
                        })
                    }
                    return;
                }

                $objs = $("div.treeSel-parent");
                if ($objs.length > 0) {
                    $.each($objs, function (i, item) {
                        treeSelectEvent["hide"].apply(item);
                    })
                }
            });
        }
    }
    var methods = {
        init: function (opt) {
            var $obj = $(this);
            this.opt = methodsHelp.initOpt(opt);
            if (this.opt.width && this.opt.width == 0) {
                this.opt.width = $obj.width() > 0 ? $obj.width() : 120;
            }
            /// 初始化设置
            this.opt["id"] = $obj[0].id;
            this.opt["treeid"] = "treeul" + $obj[0].id + "";

            this.$parent = $('<div class="treeSel-parent"></div>');
            this.$choice = $('<div class="treeSel-choice"></div>');
            this.$seltext = $('<span></span>');
            this.$clear = $('<div class="treeSel-clear"></div>');
            this.$onoff = $('<div class="treeSel-onoff"></div>')
            this.$dropDiv = $('<div class="treeSel-dropdiv"></div>');

            this.$parent.css({ height: "100%" });
            this.$choice.css({ width: this.opt.width, height: "100%", position: "relative" });
            // this.$seltext.css({ width: (this.opt.width - $.treeSel.dom.openBtn.showcss.width), height: "100%", overflow: "hidden", display: "block", "text-indent": "5px", "font-size": "12px", "line-height": "20px" });
            // this.$clear.css($.treeSel.dom.clearBtn.showcss).hide();
            // this.$onoff.css($.treeSel.dom.openBtn.showcss);
            this.$dropDiv.width(this.opt.width);

            this.$choice.append(this.$seltext).append(this.$clear).append(this.$onoff);
            this.$parent.append(this.$choice).append(this.$dropDiv);
            $obj.html(this.$parent);
            $obj.css({ width: this.opt.width, "background-color": this.opt.bgColor, border: "1px solid #ccc" })

            methodsHelp.initMenu(this.$dropDiv, this.opt);

            if (this.opt.float) {
                $obj.css({ height: this.opt.height });
                this.$parent.addClass("treeSel-hidediv");
                methodsHelp.initFloatDom(this.$parent, this.$choice, this.$dropDiv);//@  浮动时候样式处理
            } else {
                this.$choice.css({ height: this.opt.height });
                this.$parent.addClass("treeSel-showdiv");
            }

            this.$clear.append($.treeSel.dom.clearBtn.text).prop("title", $.treeSel.dom.clearBtn.title);

            this.$choice.hover(function () {
                var $obj = $(this).parents("div.treeSel-parent").parent();
                var $span = $(this).find("span").eq(0);
                $span.width($span.width() - $.treeSel.dom.clearBtn.showcss.width - 1);
                $obj.css({ border: "1px solid #AED0EA" });
                $(this).find("div.treeSel-onoff").css({ "text-shadow": "1px 1px 1px #e5e5e5" });//

                if ($span.text() != "") {
                    $(this).find("div.treeSel-clear").show();
                }
            },
            function () {
                var $obj = $(this).parents("div.treeSel-parent").parent();
                var $span = $(this).find("span").eq(0);
                $span.width($span.width() + $.treeSel.dom.clearBtn.showcss.width + 1);
                $obj.css({ border: "1px solid #ccc" });
                $(this).find("div.treeSel-onoff").css({ "text-shadow": "0px 0px 0px #F4F4F4" });
                $(this).find("div.treeSel-clear").hide();
            });

            this.$clear.bind("click", function () {
                var $obj = $(this).parents("div.treeSel-parent").parent();
                $obj.treeSelect("setSelResults", []);
                return false;
            });

            if (this.opt.float) { //@  浮动时候事件处理
                methodsHelp.initFloatEvent(this.$choice, this.$clear, this.$onoff);
            } else {//@
                methodsHelp.initInEvent(this.$choice, this.$clear, this.$onoff);
            }


            // 存放以后操作可能用到的属性。
            $obj.data({
                multiple: this.opt.multiple,
                menuHeight: this.opt.menuHeight,
                canHide: this.opt.canHide,
                mustSel: this.opt.mustSel,
                treeid: this.opt["treeid"],
                float: this.opt.float,
                callback: {
                    onChanged: this.opt.onChanged
                }
            });

            if (this.opt.mustSel && this.opt.initData.length == 0 && this.opt.orgData.length > 0) {
                this.opt.initData.push(this.opt.orgData[0]);
            }

            if (this.opt.initData.length > 0) {
                $obj.treeSelect("setSelResults", this.opt.initData);
            }
            return $obj;
        },
        hide: function () {
            if ($(this).data("canHide")) {
                var $obj = $(this).find(".treeSel-parent");
                if ($obj && $obj.length > 0) { treeSelectEvent["hide"].apply($obj); }
            } else {
                $.treeSel.doException($(this)[0].id + "关闭属性'canHide'为 False,不能关闭！", 3);
            }
        },
        show: function () {
            var $obj = $(this).find(".treeSel-parent");
            if ($obj && $obj.length > 0) {
                treeSelectEvent["show"].apply($obj);
            }
        },
        destroy: function () {
            var $obj = $(this);
            $obj.html("");
        },
        getSelResults: function () {
            return $(this).data("chkNode") || [];
        },
        getSelNames: function () {
            var nodes = $(this).data("chkNode") || [];
            var chkNodeName = [];
            $.each(nodes, function (i, item) {
                if (item.name && item.name != "")
                    chkNodeName.push(item.name);
            });
            return chkNodeName;
        },
        getSelIds: function () {
            var nodes = $(this).data("chkNode") || [];
            var chkNodeId = [];
            $.each(nodes, function (i, item) {
                if (item.name && item.name != "")
                    chkNodeId.push(item.id);
            });
            return chkNodeId;
        },
        setSelResults: function (curData) {
            var initName = "";
            var isMul = $(this).data("multiple");
            if (curData && curData.length > 0) {
                if (isMul) {
                    var initNode = [];
                    $.each(curData, function (i, item) {
                        var ischk = (item.isParent == undefined || item.isParent == false) && item.name && item.name != "";
                        if (ischk) {
                            if (initName != "") {
                                initName += ",";
                            }
                            initName += item.name;
                            initNode.push(item)
                        }
                    });
                    $(this).data("chkNode", initNode);
                } else {
                    initName = curData[0].name || "";
                    $(this).data("chkNode", [curData[0]]);
                }
                $(this).find("span").eq(0).html(initName).prop("title", initName);
            } else {
                $(this).find("span").eq(0).html("").prop("title", "");
                $(this).data("chkNode", []);
                var treeid = $(this).data("treeid");
                if (treeid && treeid !== "") {
                    var treeObj = $.fn.zTree.getZTreeObj(treeid);
                    if (isMul) {
                        treeObj.checkAllNodes(false);
                    }
                    treeObj.cancelSelectedNode();
                }
            }
        },
        getParam: function (pname) {
            var set = $(this).data("pname");
            if (set) {
                return set;
            }
            else {
                $.treeSel.doException('对象:$("' + $obj.selector + '").treeSelect没有设置"' + pname + '"，属性值。请确认！', 2);
                return "";
            }
        },
        setParam: function (pname, pval) {
        }
    };
    var treeEvent = {
        onClick: function (event, treeId, treeNode) {
            var $obj = $("#" + treeId).parents("div.treeSel-parent").parent();
            var isMul = $obj.data("multiple");
            if (isMul) {
            } else {
                $obj.data("chkNode", [treeNode])
                $obj.find("span").eq(0).html(treeNode.name).prop("title", treeNode.name);
                treeSelectEvent["onChanged"].apply($obj, [treeNode.name, treeNode.id]);
            }
        },
        onCheck: function (event, treeId, treeNode) {
            var $obj = $("#" + treeId).parents("div.treeSel-parent").parent();
            var isMul = $obj.data("multiple");
            if (isMul) {
                var treeObj = $.fn.zTree.getZTreeObj(treeId);
                var nodes = treeObj.getCheckedNodes(true);
                var chkNode = [];
                var names = "";
                var ids = "";
                $.each(nodes, function (i, item) {
                    if (!item.isParent) {
                        chkNode.push(item);
                        if (names != "") { names += ","; }
                        names += item.name;
                        if (ids != "") { ids += ","; }
                        ids += item.id;
                    }
                });
                $obj.data("chkNode", chkNode)
                $obj.find("span").eq(0).html(names).prop("title", names);
                var onChanged = $obj.data("callback").onChanged;
                if (onChanged && onChanged instanceof Function) {
                    onChanged(names, ids);
                }
            }
        }
    }
    var treeSelectEvent = {
        check: function ($obj) {
            if ($obj.length == 0) {
                $.treeSel.doException('对象:$("' + $obj.selector + '")不存在，不能继续操作！', 2);
                return false;
            }
            if ($obj[0].id == '' || $obj[0].id == 'undefind') {
                $.treeSel.doException('对象:$("' + $obj.selector + '")没有指定ID，不能继续操作！', 3);
                return false;
            }
            if ($obj[0].tagName.toUpperCase() !== 'DIV') {
                $.treeSel.doException('对象:$("' + $obj.selector + '")Element is not a div', 3);
                return false;
            }
            return true;
        },
        onChanged: function (name, id) {
            var ev = $(this).data("callback").onChanged;
            if (ev && ev instanceof Function) {
                ev(name, id);
            }
        },
        hide: function () {
            var $obj = $(this);
            if ($obj.parent().data("canHide")) {
                $obj.removeClass("treeSel-showdiv").addClass("treeSel-hidediv");
                $obj.find(".treeSel-choice").find("div.treeSel-onoff").html($.treeSel.dom.openBtn.text).attr("title", $.treeSel.dom.openBtn.title);
                $obj.find("div.treeSel-dropdiv").hide();
            }
        },
        show: function () {
            var $obj = $(this);
            var treediv = $obj.find("div.treeSel-dropdiv");
            $obj.removeClass("treeSel-hidediv").addClass("treeSel-showdiv");
            $obj.find(".treeSel-choice").find("div.treeSel-onoff").html($.treeSel.dom.hideBtn.text).attr("title", $.treeSel.dom.hideBtn.title);

            if (treediv.height() > $obj.parent().data("menuHeight")) {
                treediv.find(".ztree").css({ height: $obj.parent().data("menuHeight") });
            }
            treediv.show();
            if ($obj.parent().data("float")) {
                var xy = $obj.parent();
                treediv.offset({ top: xy.offset().top + xy.outerHeight() - 1, left: xy.offset().left });
            }
        }
    }
    $.fn.zTreeDropdown = function (method) {
        if (typeof method === "string" && methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else if (typeof method === 'object' || !method) {
            if (treeSelectEvent.check($(this))) {
                return methods.init.apply(this, arguments);
            }
        }
        else {
            $.error('Method：' + method + ' does not exist on  jQuery.treeSelect！');
        }
    }
})(jQuery);