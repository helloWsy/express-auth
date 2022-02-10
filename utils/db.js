const { log } = require('console')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/express-data', {
	// useCreateIndex: true,
	useNewUrlParser: true
})

mongoose.connection.once('open', () => {
	console.log('数据库连接成功')
})

mongoose.connection.once('close', () => {
	console.log('断开数据库连接')
})

const path = require('path')