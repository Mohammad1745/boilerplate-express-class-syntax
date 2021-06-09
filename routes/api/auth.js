const express = require('express')
const route = express.Router()

const authController = require('../../app/http/controllers/api/auth_controller')
const loginRequest = require('../../app/http/requests/auth/login_request')
const signupRequest = require('../../app/http/requests/auth/signup_request')
const phoneVerificationRequest = require('../../app/http/requests/auth/phone_verification_request')
const passwordResetRequest = require('../../app/http/requests/auth/reset_password_request')
const passwordResetCodeRequest = require('../../app/http/requests/auth/reset_password_code_request')
const {authApi}  = require('../../app/http/middlewares/apiAuthentication')

route.post('/login', loginRequest.validators, loginRequest.validate, authController.login)
route.post('/register', signupRequest.validators, signupRequest.validate, authController.signup)
route.get('/resend-phone-verification-code', authController.resendPhoneVerificationCode)
route.put('/phone-verification', phoneVerificationRequest.validators, phoneVerificationRequest.validate, authController.phoneVerificationProcess)
route.post('/reset-password', passwordResetRequest.validators, passwordResetRequest.validate, authController.resetPasswordProcess)
route.post('/reset-password-code', passwordResetCodeRequest.validators, passwordResetCodeRequest.validate, authController.resetPasswordCodeProcess)
//middleware
route.use(authApi)
route.get('/logout', authController.logout)

module.exports = route