const express = require('express')
const route = express.Router()
const {user}  = require('../../app/http/middlewares/user')
const {authApi}  = require('../../app/http/middlewares/api_authentication')
const {verified} = require('../../app/http/middlewares/phone_verification')
// const authController = require('../../app/http/controllers/api/auth_controller')

//middleware
route.use(authApi, user, verified)

module.exports = route