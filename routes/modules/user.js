// const db = require('../../lib/models')
// const jwt = require('jsonwebtoken')

const { User } = require('../../lib/models')

module.exports = (path, router, app) => {

  // 用户注册
  app.post(`${path}/register`, async (req, res) => {
    let code = 200
    let message = 'success'

    const { username, password } = res.body
    const user = await User.create({
      username,
      password
    })
    res.status(code), json({
      message
    })

    // res.send('register')

  })

  app.get(`${path}/login`, async (req, res) => {
    
    res.send('login')
  })

  // 用户登录
  // router.post(`${path}/login`, async (req, res) => {
  //   // 查询用户
  //   const { username, password } = req.query
  //   let sql = `SELECT * FROM "user" WHERE name = '${username}' and password = '${password}'`
  //   let result = await db(sql)
  //   let code = 200
  //   let message = 'success'
  //   let token = null
    
  //   // 校验密码
  //   if(!result.length) {
  //     sql = `SELECT * FROM "user" WHERE name = '${username}'`
  //     result = await db(sql)
  //     code = 422
  //     message = result.length ? '用户密码错误': '用户不存在'
  //   } else {
  //     token = jwt.sign({ id: result[0].id }, app.get('secret'))
  //   }

  //   // console.log(result);
  //   // 返回token


  //   res.status(code).json({
  //     message,
  //     token
  //   })
  // })

  // 修改用户

  
}