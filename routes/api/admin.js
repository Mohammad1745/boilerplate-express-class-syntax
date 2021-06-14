const express = require('express')
const route = express.Router()
const {authApi}  = require('../../app/http/middlewares/api_authentication')
const {admin}  = require('../../app/http/middlewares/admin')
const {verified} = require('../../app/http/middlewares/phone_verification')

//middleware
route.use(authApi, admin, verified)

module.exports = route