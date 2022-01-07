const express = require('express')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/express-data', {
	useNewUrlParser: true
})

// 定义一个用户模型
const UserSchema =  new mongoose.Schema({
	username: { type: String },
	password: { type: String },
})
const User = mongoose.model('User', UserSchema)

module.exports = { User }