const express = require('express')
const route = express.Router()
const {user}  = require('../../app/http/middlewares/user')
const {authApi}  = require('../../app/http/middlewares/apiAuthentication')

//middleware
route.use(authApi, user)

module.exports = route