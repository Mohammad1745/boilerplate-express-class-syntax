const express = require('express')
const route = express.Router()

const {auth}  = require('../../app/http/middlewares/authentication')
const {admin}  = require('../../app/http/middlewares/admin')
const {verified} = require('../../app/http/middlewares/phoneVerification')
const dashboardController = require('../../app/http/controllers/web/admin/dashboard_controller')

//middleware
route.use(auth, admin, verified)

//dashboard
route.get('/dashboard', dashboardController.dashboard)

module.exports = route