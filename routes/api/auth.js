const express = require('express')
const route = express.Router()

const loginRequest = require('../../app/http/requests/auth/login_request')
const signupRequest = require('../../app/http/requests/auth/signup_request')
const phoneVerificationRequest = require('../../app/http/requests/auth/phone_verification_request')
const passwordResetRequest = require('../../app/http/requests/auth/reset_password_request')
const passwordResetCodeRequest = require('../../app/http/requests/auth/reset_password_code_request')
const authController = require('../../app/http/controllers/api/auth_controller')
const {authApi}  = require('../../app/http/middlewares/api_authentication')

route.post('/login', ...loginRequest.validate, authController.login)
route.post('/register', ...signupRequest.validate, authController.signup)
route.get('/resend-phone-verification-code', authController.resendPhoneVerificationCode)
route.put('/phone-verification', ...phoneVerificationRequest.validate, authController.phoneVerificationProcess)
route.post('/reset-password', ...passwordResetRequest.validate, authController.resetPasswordProcess)
route.post('/reset-password-code', ...passwordResetCodeRequest.validate, authController.resetPasswordCodeProcess)
//middleware
route.use(authApi)
route.get('/logout', authController.logout)

module.exports = route