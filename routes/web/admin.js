const express = require('express')
const route = express.Router()

const {auth}  = require('../../app/http/middlewares/authentication')
const {admin}  = require('../../app/http/middlewares/admin')
const dashboardController = require('../../app/http/controllers/web/admin/dashboard_controller')

//middleware
route.use(auth, admin)

//dashboard
route.get('/dashboard', dashboardController.dashboard)

module.exports = route