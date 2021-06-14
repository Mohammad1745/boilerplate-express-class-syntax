const express = require('express')
const route = express.Router()
const {authApi}  = require('../../app/http/middlewares/api_authentication')
const {admin}  = require('../../app/http/middlewares/admin')
const {verified} = require('../../app/http/middlewares/phone_verification')
const profileController = require('../../app/http/controllers/api/admin/profile_controller')

//middleware
route.use(authApi, admin, verified)

//profile
route.get('/profile', profileController.profile)
route.post('/profile/upload-image', profileController.uploadImage)

module.exports = route