const express = require('express')
const router = express.Router({
  mergeParams: true
})

module.exports = app => {
  // user
  require('./modules/user')('/user', router, app)

  app.use('/api', router)
}