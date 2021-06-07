const jwt = require('jsonwebtoken')

module.exports = {
    auth : (req, res, next) => {
        if (req.cookies['authToken']) {
            req.user = null
            jwt.verify(req.cookies['authToken'], process.env.AUTH_SECRET, (err, user) => {
                if (err) return res.redirect('/auth/login')
                req.user = user
                next()
            })
        } else return res.redirect('/auth/login')
    }
}