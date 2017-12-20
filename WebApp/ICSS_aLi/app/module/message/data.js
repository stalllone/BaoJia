Mock.mock(/\/service\/GetMessageDetail(.*)/, 'get', {
    'result': '@boolean',
    'message': '',
    'data': {
        'id|+1': 1,
        'sender': '@name',
        'email': '@EMAIL',
        'address': '@name  address',
        'company': '@name company',
        'time': '@time'
    }
});