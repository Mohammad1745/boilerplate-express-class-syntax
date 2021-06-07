const express = require('express')
const route = express.Router()
const {authApi}  = require('../../app/http/middlewares/apiAuthentication')

//middleware
route.use(authApi)

module.exports = route