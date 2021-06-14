const express = require('express')
const route = express.Router()
const {user}  = require('../../app/http/middlewares/user')
const {authApi}  = require('../../app/http/middlewares/api_authentication')
const {verified} = require('../../app/http/middlewares/phone_verification')
const profileController = require('../../app/http/controllers/api/user/profile_controller')

//middleware
route.use(authApi, user, verified)

//profile
route.get('/profile', profileController.profile)
route.post('/profile/upload-image', profileController.upload)

module.exports = route