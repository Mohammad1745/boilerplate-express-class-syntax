const express = require('express')
const route = express.Router()

const {auth}  = require('../../app/http/middlewares/authentication')
const {user}  = require('../../app/http/middlewares/user')
const dashboardController = require('../../app/http/controllers/web/user/dashboard_controller')

//middleware
route.use(auth, user)

//dashboard
route.get('/dashboard', dashboardController.dashboard)

module.exports = route