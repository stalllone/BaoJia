Mock.mock('/service/getMenu', {
    'result': '1',
    'message': '',
    'data': [{
        id: 1,
        pId: 0,
        name: "系统风格",
        open: true,
        children: [{
            id: 11,
            pId: 1,
            name: "页面样式",
            children: [{ id: 111, pId: 11, name: "基本样式", url: "#/base" },
                { id: 112, pId: 11, name: "图标规划" },
                { id: 113, pId: 11, name: "头部风格" },
            ]
        }, {
            id: 12,
            pId: 1,
            name: "页面样式2",
            children: [{ id: 121, pId: 12, name: "基本样式2", url: "#/base" },
                { id: 122, pId: 12, name: "图标规划2" },
                { id: 123, pId: 12, name: "头部风格2" },
            ]
        }]
    }, {
        id: 2,
        pId: 0,
        name: "菜单管理",
        open: true,
        children: [{
            id: 21,
            pId: 2,
            name: "菜单管理",
            children: [{ id: 211, pId: 21, name: "菜单列表", url: "#/menu" },
                { id: 212, pId: 21, name: "菜单权限" }
            ]
        }]
    }, {
        id: 3,
        pId: 0,
        name: "首页",
        open: true,
        children: [{
            id: 31,
            pId: 3,
            name: "数据面板",
            children: [{ id: 311, pId: 31, name: "数据面板", url: "#/message/2" }]
        }, {
            id: 32,
            pId: 3,
            name: "订单面板",
            children: [{ id: 321, pId: 32, name: "订单面板", url: "#/user/2" }]
        }]
    }, {
        id: 4,
        pId: 0,
        name: "个人设置",
        open: true,
        children: [{
            id: 41,
            pId: 4,
            name: "信息修改",
            children: [{ id: 411, pId: 41, name: "头像修改", url: "#/message/2" },
                { id: 412, pId: 41, name: "基本信息", url: "#/user/2" }
            ]
        }, {
            id: 42,
            pId: 4,
            name: "密码修改",
            children: [{ id: 421, pId: 42, name: "密码修改", url: "#/message/2" },
                { id: 422, pId: 42, name: "二级密码修改", url: "#/user/2" }
            ]
        }]
    }]
});

Mock.mock(/\/service\/getMenuByID(.*)/, 'post', {
    'result': '@boolean',
    'message': '',
    'data': {
        "baseInfo": {
            'id|+1': 1,
            'name': '@name',
            'email': '@EMAIL',
            'address': '',
            'company': ''
        },
        "messages|1-10": [{
            'id|+1': 1,
            'sender': '@name',
            'subject': 'hello im @name'
        }]
    }
});

Mock.mock(/\/service\/getMenuByUser(.*)/, 'post', {
    'result': '@boolean',
    'message': '',
    'data': {
        "baseInfo": {
            'id|+1': 1,
            'name': '@name',
            'email': '@EMAIL',
            'address': '',
            'company': ''
        },
        "messages|1-10": [{
            'id|+1': 1,
            'sender': '@name',
            'subject': 'hello im @name'
        }]
    }
});
