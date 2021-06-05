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
    },
    authApi : (req, res, next) => {
        const token = req.headers.authorization? req.headers.authorization.split(" ")[1] : null
        if (token) {
            req.user = null
            jwt.verify(token, process.env.AUTH_SECRET, (err, user) => {
                if (err) return res.sendStatus(401)
                req.user = user
                next()
            })
        } else return res.sendStatus(401)
    }
}