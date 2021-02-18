var express = require('express')
const AuthController = require('../controllers/authController')
const check = require('../middleware/check')

var api = express.Router()

api.post('/singup', check.checkDuplicatedEmail,  AuthController.singup)
api.post('/login', AuthController.login)

module.exports = api