var express = require('express')
var apiRoutes = express.Router()
var Mock = require('mockjs')

// 用户列表
apiRoutes.post('/user/list', function (req, res) {
  let resData = Mock.mock({
    errcode: 0,
    errmsg: 'ok',
    'data|1-20': [{
      'uid|+1': 1,
      'nickname': 'nickname',
      'username': 'username',
      'jobsName': 'jobsName'
    }],
    total: 20
  })
  setTimeout(() => {
    res.send(resData)
  }, 500)
})

module.exports = apiRoutes