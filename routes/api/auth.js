const express = require('express')
const route = express.Router()

const authController = require('../../app/http/controllers/api/auth_controller')
const loginRequest = require('../../app/http/requests/auth/login_request')
const signupRequest = require('../../app/http/requests/auth/signup_request')
const {authApi}  = require('../../app/http/middlewares/authentication')

route.use(loginRequest.validators)
    .post('/login', authController.login)
route.use(signupRequest.validators)
    .post('/register', authController.signup)
//middleware
route.use(authApi)
route.get('/logout', authController.logout)

module.exports = route