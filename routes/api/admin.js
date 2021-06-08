const express = require('express')
const route = express.Router()
const {authApi}  = require('../../app/http/middlewares/apiAuthentication')
const {admin}  = require('../../app/http/middlewares/admin')
const {verified} = require('../../app/http/middlewares/phoneVerification')

//middleware
route.use(authApi, admin, verified)

module.exports = route