const express = require('express')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/express-data', {
	// useCreateIndex: true,
	useNewUrlParser: true
})

// 定义一个用户模型
const UserSchema =  new mongoose.Schema({
	username: { type: String, unique: true },
	password: {
		type: String, set(val) {
		return require('bcrypt').hashSync(val, 10)
	} },
})

const User = mongoose.model('User', UserSchema)

module.exports = { User }