const express = require('express')
const route = express.Router()

const loginRequest = require('../../app/http/requests/auth/login_request')
const signupRequest = require('../../app/http/requests/auth/signup_request')
const phoneVerificationRequest = require('../../app/http/requests/auth/phone_verification_request')
const passwordResetRequest = require('../../app/http/requests/auth/reset_password_request')
const passwordResetCodeRequest = require('../../app/http/requests/auth/reset_password_code_request')
const authController = require('../../app/http/controllers/web/auth_controller')
const {auth}  = require('../../app/http/middlewares/authentication')

route.get('/login', authController.login)
route.get('/register', authController.signup)
route.post('/login', ...loginRequest.validate, authController.loginProcess)
route.post('/register', ...signupRequest.validate, authController.signupProcess)
route.get('/reset-password', authController.resetPassword)
route.post('/reset-password', ...passwordResetRequest.validate, authController.resetPasswordProcess)
route.get('/reset-password-code', authController.resetPasswordCode)
route.post('/reset-password-code', ...passwordResetCodeRequest.validate, authController.resetPasswordCodeProcess)
//middleware
route.use(auth)
route.get('/resend-phone-verification-code', authController.resendPhoneVerificationCode)
route.get('/phone-verification', authController.phoneVerification)
route.post('/phone-verification', ...phoneVerificationRequest.validate, authController.phoneVerificationProcess)
route.get('/logout', authController.logoutProcess)

module.exports = route