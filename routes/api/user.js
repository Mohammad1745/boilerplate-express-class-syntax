const express = require('express')
const route = express.Router()
const {user}  = require('../../app/http/middlewares/user')
const {authApi}  = require('../../app/http/middlewares/apiAuthentication')
const {verified} = require('../../app/http/middlewares/phoneVerification')

//middleware
route.use(authApi, user, verified)

module.exports = route