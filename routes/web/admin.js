const express = require('express')
const route = express.Router()

const {auth}  = require('../../app/http/middlewares/authentication')
const {admin}  = require('../../app/http/middlewares/admin')
const {verified} = require('../../app/http/middlewares/phone_verification')
const dashboardController = require('../../app/http/controllers/web/admin/dashboard_controller')
const profileController = require('../../app/http/controllers/web/admin/profile_controller')

//middleware
route.use(auth, admin, verified)

//dashboard
route.get('/dashboard', dashboardController.dashboard)

//profile
route.get('/profile', profileController.profile)
route.post('/profile/upload', profileController.upload)

module.exports = route