// const db = require('../../lib/models')
const jwt = require('jsonwebtoken')
const res = require('express/lib/response')
const { User } = require('~/models/user')
require('~/utils/db')

module.exports = (path, router, app) => {
  const SECRET = app.get('secret')

  // list
  router.get(`${path}/list`, async (req, res) => {
    const token = String(req.headers.authorization).split(' ').pop()
    console.log(token);
    let code = 200
    if (req.session.code) {
      const users = await User.find()
      res.send(users)      
    } else {
      code = 403
      return res.status(code).json({
        message: 'fail'
      })
    }
  })
  
  // register
  router.post(`${path}/register`, async (req, res) => {
    let code = 200
    let message = 'success'

    try {
      const user = await User.create({
        username: req.body.username,
        password: req.body.password
      })
    } catch (e) {
      message = 'error: user register failed'
      code = 500
    }

    res.status(code).json({
      message
    })

  })

  // login
  router.post(`${path}/login`, async (req, res) => {
    let message = 'success'
    let code = 200
    let token = undefined

    const user = await User.findOne({
      username: req.body?.username
    })
    if (!user) {
      code = 422
      message = 'error: user not exist'
    } else {
      const isPasswordValid = require('bcrypt').compareSync(
        req.body.password,
        user.password
      )
      if (!isPasswordValid) {
        code = 422
        message = 'error: password is wrong'
      } else {
        // bearer
        token = jwt.sign({ id: String(user._id) }, SECRET)
        req.session.code = user._id
      }
    }

    return res.status(code).json({
      message,
      user,
      token
    })

  })

  // logout
  router.get(`${path}/logout`, (req, res) => {
    let code = 200
    delete req.session.code
    return res.status(code).json({
      message: 'success'
    })
  })

  // authMiddleWare
  const auth = async (req, res, next) => {
    let message = 'success'
    let code = 200
    const token = String(req.headers.authorization).split(' ').pop()
    
    try {
      const { id } = jwt.verify(token, SECRET)
      const user = await User.findById(id)
      if (!user) {
        code = 403
        message = 'illegal user'
      } else {
        req.user = user
      }
    } catch (e) {
      code = 403
      message = 'illegal user'
    }

    req.message = message
    req.code = code

    next()
  }

  // profile
  router.get(`${path}/profile` ,auth ,async (req, res) => {
   
    const { code, message, user } = req
    return res.status(code).json({
      message,
      user
    })
  })

}