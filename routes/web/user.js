const express = require('express')
const route = express.Router()

const {auth}  = require('../../app/http/middlewares/authentication')
const {user}  = require('../../app/http/middlewares/user')
const {verified}  = require('../../app/http/middlewares/phone_verification')
const dashboardController = require('../../app/http/controllers/web/user/dashboard_controller')
const profileController = require('../../app/http/controllers/web/user/profile_controller')

//middleware
route.use(auth, user, verified)

//dashboard
route.get('/dashboard', dashboardController.dashboard)

//profile
route.get('/profile', profileController.profile)
route.post('/profile/upload-image', profileController.uploadImage)

module.exports = route