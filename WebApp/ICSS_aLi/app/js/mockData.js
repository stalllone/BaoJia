Mock.mock('/service/getusers', {
    'result': '@boolean',
    'message': '',
    'data|1-10': [{
        'id|+1': 1,
        'name': '@name',
        'email': '@EMAIL',
        'address': '',
        'company': ''
    }]
});

Mock.mock(/\/service\/GetUserDetail(.*)/, 'post', {
    'result': '@boolean',
    'message': '',
    'data': {
        'id|+1': 1,
        'name': '@name',
        'email': '@EMAIL',
        'address': '',
        'company': ''
    }
});

Mock.mock('/getmenu', 'post', {
            'result': '1',
            'message': '请求菜单出错',
            'data': [{
                    "group": "",
                    "hide": "0",
                    "icss_show": "1",
                    "id": "1",
                    "is_dev": "0",
                    "pid": "0",
                    "sort": "1",
                    "submenu": [{
                        "group": "数据看板",
                        "hide": "0",
                        "icss_show": "1",
                        "id": "648",
                        "is_dev": "0",
                        "pid": "1",
                        "sort": "1",
                        "submenu": [{
                            "group": "数据统计",
                            "hide": "0",
                            "icss_show": "1",
                            "id": "64811",
                            "is_dev": "0",
                            "pid": "648",
                            "sort": "1",
                            "system_id": "1",
                            "tip": "",
                            "title": "车辆统计",
                            "url": "dashboard/index"
                        }],
                        "system_id": "1",
                        "tip": "",
                        "title": "数据面板",
                        "url": "dashboard/index"
                    }, {
                        "group": "数据看板",
                        "hide": "0",
                        "icss_show": "1",
                        "id": "649",
                        "is_dev": "0",
                        "pid": "1",
                        "sort": "1",
                        "submenu": [{
                            "group": "数据统计",
                            "hide": "0",
                            "icss_show": "1",
                            "id": "64911",
                            "is_dev": "0",
                            "pid": "649",
                            "sort": "1",
                            "system_id": "1",
                            "tip": "",
                            "title": "订单统计",
                            "url": "dashboard/index"
                        }],
                        "system_id": "1",
                        "tip": "",
                        "title": "订单面板",
                        "url": "dashboard/index"
                    }],
                    "system_id": "1",
                    "tip": "",
                    "title": "首页",
                    "url": "Index/index",
                    "visit_url": null
                }, {
                    "group": "",
                    "hide": "0",
                    "icss_show": "1",
                    "id": "1",
                    "is_dev": "0",
                    "pid": "0",
                    "sort": "1",
                    "submenu": [{
                        "group": "数据看板",
                        "hide": "0",
                        "icss_show": "1",
                        "id": "648",
                        "is_dev": "0",
                        "pid": "3",
                        "sort": "1",
                        "submenu": [{
                            "group": "信息修改",
                            "hide": "0",
                            "icss_show": "1",
                            "id": "64811",
                            "is_dev": "0",
                            "pid": "648",
                            "sort": "1",
                            "system_id": "1",
                            "tip": "",
                            "title": "头像修改",
                            "url": "dashboard/index"
                        },{
                            "group": "信息修改",
                            "hide": "0",
                            "icss_show": "1",
                            "id": "64811",
                            "is_dev": "0",
                            "pid": "648",
                            "sort": "1",
                            "system_id": "1",
                            "tip": "",
                            "title": "基本信息",
                            "url": "dashboard/index"
                        }
                        ],
                        "system_id": "1",
                        "tip": "",
                        "title": "信息修改",
                        "url": "dashboard/index"
                    }, {
                        "group": "数据看板",
                        "hide": "0",
                        "icss_show": "1",
                        "id": "649",
                        "is_dev": "0",
                        "pid": "1",
                        "sort": "1",
                        "submenu": [{
                            "group": "密码设置",
                            "hide": "0",
                            "icss_show": "1",
                            "id": "64911",
                            "is_dev": "0",
                            "pid": "649",
                            "sort": "1",
                            "system_id": "1",
                            "tip": "",
                            "title": "密码修改",
                            "url": "dashboard/index"
                        },{
                            "group": "密码设置",
                            "hide": "0",
                            "icss_show": "1",
                            "id": "649112",
                            "is_dev": "0",
                            "pid": "649",
                            "sort": "1",
                            "system_id": "1",
                            "tip": "",
                            "title": "二级密码修改",
                            "url": "dashboard/index"
                        }],
                        "system_id": "1",
                        "tip": "",
                        "title": "密码设置",
                        "url": "dashboard/index",
                    }],
                    "system_id": "2",
                    "tip": "",
                    "title": "个人设置",
                    "url": "Index/index",
                    "visit_url": null
                }]
            });
