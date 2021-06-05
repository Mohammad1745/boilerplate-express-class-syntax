const express = require('express')
const route = express.Router()

const {auth}  = require('../app/http/middlewares/authentication')

//middleware
route.use(auth)

route.get('/', (req, res) => {
    req.user ? res.redirect('/user/dashboard') : res.redirect('/auth/login')
})

module.exports = route