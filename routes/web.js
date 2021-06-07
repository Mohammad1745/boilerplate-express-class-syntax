const express = require('express')
const route = express.Router()

const {ADMIN_ROLE, USER_ROLE} = require('../app/helper/core_constants')
const {auth}  = require('../app/http/middlewares/authentication')

//middleware
route.use(auth)

route.get('/', (req, res) => {
    if(req.user){
        if (req.user.role === ADMIN_ROLE) res.redirect('/admin/dashboard')
        else if (req.user.role === USER_ROLE) res.redirect('/user/dashboard')
        else res.redirect('/auth/login')
    }
    else res.redirect('/auth/login')
})
route.get('/*', (req, res) => res.redirect('/'))

module.exports = route