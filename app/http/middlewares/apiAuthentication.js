const jwt = require('jsonwebtoken')

module.exports = {
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