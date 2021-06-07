const express = require('express')
const route = express.Router()

const authController = require('../../app/http/controllers/api/auth_controller')
const loginRequest = require('../../app/http/requests/auth/login_request')
const signupRequest = require('../../app/http/requests/auth/signup_request')
const {authApi}  = require('../../app/http/middlewares/apiAuthentication')

route.post('/login', loginRequest.validators, loginRequest.validate, authController.login)
route.post('/register', signupRequest.validators, signupRequest.validate, authController.signup)
//middleware
route.use(authApi)
route.get('/logout', authController.logout)

module.exports = route