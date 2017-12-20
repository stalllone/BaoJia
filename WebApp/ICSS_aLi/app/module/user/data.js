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
