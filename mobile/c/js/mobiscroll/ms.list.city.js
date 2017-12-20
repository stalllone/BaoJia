(function($) {
    var ms = $.mobiscroll,
        defaults = {           
            regionData: undefined,
            labels: ['省', '市', '县'],
            initName: "",
            cityUrl: "http://api.baojia.com/test/api/list/area",
            citys: null,
            lang:"zh",
            separator: " "
        },
        preset = function(inst) {
            var that = $(this),
                format,
                s = $.extend({}, inst.settings, defaults),
                arrVal = ["", "", ""],
                w = {};
            inst.settings = s;
            inst.region = [];

                w[s.labels[0]] = [""];
            if(s.preset == "city" || s.preset == "area") 
                w[s.labels[1]] = [""];
            if(s.preset == "area") 
                w[s.labels[2]] = [""];

            // Force format for html5 date inputs (experimental)
            if (that.is('input')) {
                that.val(s.initName)
            }

            function getBaoJiaData() {
                $.ajax({
                    async: false,
                    url: "http://api.baojia.com/test/api/list/area",
                    type: "GET",
                    dataType: 'jsonp',
                    timeout: 5000,
                    success: function(json) {
                        window.bjCity = doData($.parseJSON(json));
                    },
                    complete: function(XMLHttpRequest, textStatus) {},
                    error: function(xhr) {
                        window.bjCity = null;
                        console.error("请求出错，相关url：http://api.baojia.com/test/Api/List/Area");
                    }
                });
            }

            function doData(data) {
                var info = { p: [], c: [], a: [] }
                if (data[0].name == '直辖市') {
                    var d = data.splice(0, 1);
                    var n = [];
                    for (var i = 0; i < d[0].city.length; i++) {
                        //n.push({ id: d[0].city[i].id, name: d[0].city[i].name, city: [d[0].city[i]] });
                        n.push(d[0].city[i]);
                    };
                    data = n.concat(data);
                }

                if (arrVal.length == 0 || arrVal[0] == "") {
                    var ind, c, r, cid, rid, child1 = [],
                        child2 = [];
                    $.each(data, function(i, el) {
                        ind = (i + 1) * 10;
                        c = el.zone || el.city;
                        child1 = []
                        $.each(c, function(j, elj) {
                            cid = ind * 100 + j;
                            r = elj.zone || elj.city||[];
                            child2 = []
                            $.each(r, function(k, elr) {
                                rid = cid * 1000 + k;
                                child2.push({ level: 3, id: rid, cid: elr.id, name: elr.name, pid: cid, index: k });
                            });
                            info.a = info.a.concat(child2);
                            child1.push({ level: 2, id: cid, cid: elj.id, name: elj.name, pid: ind, index: j, child: child2 });
                        });
                        info.c = info.c.concat(child1);
                        info.p.push({ level: 1, id: ind, cid: el.id, name: el.name, pid: 0, index: i, child: child1 });
                    })
                }
                return info;
            }


            window.bjCity || getBaoJiaData();


            var changeWheel = function() {
                var _curStates = {};
                var states = {
                    province: function() {
                        resetWheel(0, window.bjCity.p);
                    },
                    city: function(provinceid) {
                        //console.log(provinceid + "重置市区");
                        !provinceid && (provinceid = 0);
                        resetWheel(1, window.bjCity.p[provinceid].child || []);

                    },
                    area: function(provinceid, cityid) {
                        //console.log(provinceid+cityid + "重置县城");
                        !provinceid && (provinceid = 0);
                        !cityid && (cityid = 0);
                        resetWheel(2, (window.bjCity.p[provinceid].child[cityid] && window.bjCity.p[provinceid].child[cityid].child) || []);
                    }
                }

                var resetWheel = function(ind, arr) {
                    var obj = $($('.dw-ul')[ind]);
                    var str = "";
                    $.each(arr, function(index, el) {
                        str += '<div class="dw-li dw-v" data-val="' + index + '""><div style="height:40px;line-height:40px" class="dw-i">' + el.name + '</div></div>';
                    });
                    obj.html(str);
                }
                var action = {
                    changeStates: function() {
                        var arg = arguments;
                        _curStates = {}
                        if (arg.length) {
                            for (var i = 0, len = arg.length; i < len; i++) {
                                _curStates[arg[i]] = true;
                            };
                        }
                        return this;
                    },
                    goes: function() {
                        for (var i in _curStates) {
                            states[i] && states[i].apply("aa", arguments)
                        }
                        _curStates = undefined;
                    }
                }
                return {
                    change: action.changeStates,
                    goes: action.goes
                }
            }

            inst.getSelected = function(d) {
                var arr = [],
                    v;
                inst.temp[0] >= 0 && (v = window.bjCity.p[inst.temp[0]]) && arr.push(v);
                if(s.preset == "city" || s.preset == "area")
                inst.temp[1] >= 0 && v.child[inst.temp[1]] && arr.push(v.child[inst.temp[1]]);
                if(s.preset == "area")
                inst.temp[2] >= 0 && v.child[inst.temp[1]].child[inst.temp[2]] && arr.push(v.child[inst.temp[1]].child[inst.temp[2]]);
                return arr;
            }

            inst.setWheel = function() {
                this.setValue(true, false, 0.5, true);
            };
            return {
                wheels: [w],
                headerText: function(v) {
                    var arr = [],
                        cur = inst.getSelected(v);
                    $.each(cur, function(index, el) {
                        arr.push(el.name);
                    });
                    return arr.join(s.separator);;
                },
                /**
                 * Builds a date object from the wheel selections and formats it to the given date/time format
                 * @param {Array} d - An array containing the selected wheel values
                 * @return {String} - The formatted date string
                 */
                formatResult: function(d) {
                    var arr = [],
                        cur = inst.getSelected(d);
                    $.each(cur, function(index, el) {
                        arr.push(el.name);
                    });
                    return arr.join(s.separator);;
                },
                /**
                 * Builds a date object from the input value and returns an array to set wheel values
                 * @return {Array} - An array containing the wheel values to set
                 */
                parseValue: function(val) {
                    return [];
                },
                /**
                 * Validates the selected province sets unselectable values to disabled
                 * @param {Object} dw - jQuery object containing the generated html
                 * @param {Integer} [i] - Index of the changed wheel, not set for initial validation
                 */
                validate: function(dw, i) {
                    if (i == 0) {
                        inst.temp[1] = 0;
                        inst.temp[2] = 0;
                        changeWheel().change("city", "area").goes(inst.temp[0]);
                    }

                    if (i == 0 || i == 1) {
                        inst.temp[2] = 0;
                        changeWheel().change("area").goes(inst.temp[0], inst.temp[1]);
                    }
                },                
                onSelect: function(v, inst) {
                    inst.region = inst.getSelected(v);
                },
                onShow: function() {
                    changeWheel().change("province", "city", "area").goes(inst.values[0], inst.values[1]);
                    inst.temp = inst.values;
                    inst.setWheel();
                },
                methods: {
                    getRegion: function(d, fill, time) {
                        var inst = $(this).mobiscroll('getInst');
                        return inst.region;
                    },
                    getName: function() {
                        var arr = [],
                            inst = $(this).mobiscroll('getInst');
                        $.each(inst.region, function(index, el) {
                            arr.push(el.name);
                        });
                        return arr.join(inst.settings.separator);
                    },
                    getID: function() {
                        var arr = [],
                            inst = $(this).mobiscroll('getInst');
                        $.each(inst.region, function(index, el) {
                            arr.push(el.cid);
                        });
                        return arr.join(inst.settings.separator);
                    },
                    setByProvinceID: function() {
                        var arr = [],
                            inst = $(this).mobiscroll('getInst');
                        inst.values = [10, 2, 3];
                    },
                    setByCityID: function() {
                        var arr = [],
                            inst = $(this).mobiscroll('getInst');
                        inst.values = [10, 2, 3];
                    },
                    setByAreaD: function() {
                        var arr = [],
                            inst = $(this).mobiscroll('getInst');
                        inst.values = [10, 2, 3];
                    },
                    setByName: function() {
                        var arr = [],
                            inst = $(this).mobiscroll('getInst');
                        inst.values = [10, 2, 3];
                    }
                }
            };
        };
    $.each(["province", "city", "area"], function(i, v) {
        ms.presets[v] = preset;
        ms.presetShort(v);
    });

})(jQuery);

(function($) {
    $.mobiscroll.i18n.zh = $.extend($.mobiscroll.i18n.zh, {
        setText: '确定',
        cancelText: '取消'
    });
})(jQuery);
