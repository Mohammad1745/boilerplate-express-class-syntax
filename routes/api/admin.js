const express = require('express')
const route = express.Router()
const {authApi}  = require('../../app/http/middlewares/apiAuthentication')
const {admin}  = require('../../app/http/middlewares/admin')

//middleware
route.use(authApi, admin)

module.exports = route