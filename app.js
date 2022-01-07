const express = require('express')
const session = require('express-session')
const path = require('path')
const app = express()

// const myRouter = require('./routes/index')
// const config = require('./config/default.json')
// app.use(express.urlencoded({ extended: true}));
// app.set('secret', config.secret_sign)



// 托管静态文件
app.use(express.static(path.join(__dirname, 'static')))

// 解决跨域问题
app.use(require('cors')())

// 使用json传输数据
app.use(express.json())

// session配置
app.use(session({
  name: 'express-demo',
  secret :  'secret', // 对session id 相关的cookie 进行签名
  resave : true, // 重新保存：强制会话保存即使是未修改的。默认为true但是得写上
  saveUninitialized: false, // 是否保存未初始化的会话
  cookie : {
      maxAge : 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒
  },
}))

// 接口
const api = require('./routes/index')(app)

// 监听端口
app.listen(8082, () => {
  console.log('Server running at http://127.0.0.1:8082/')
})


