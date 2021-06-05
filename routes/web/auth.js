const express = require('express')
const route = express.Router()

const authController = require('../../app/http/controllers/web/auth_controller')
const loginRequest = require('../../app/http/requests/auth/login_request')
const signupRequest = require('../../app/http/requests/auth/signup_request')
const {auth}  = require('../../app/http/middlewares/authentication')

route.get('/login', authController.login)
route.get('/register', authController.signup)
route.use(loginRequest.validators)
    .post('/login', authController.loginProcess)
route.use(signupRequest.validators)
    .post('/register', authController.signupProcess)
//middleware
route.use(auth)
route.get('/logout', authController.logoutProcess)

module.exports = route