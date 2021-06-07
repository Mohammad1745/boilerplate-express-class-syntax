const {USER_ROLE} = require('../../helper/core_constants')

module.exports = {
    user : (req, res, next) => {
        if (!req.user) {
            return res.redirect('/auth/login')
        }
        if (!(req.user.role && req.user.role===USER_ROLE)) {
            return res.redirect('/')
        }
        next()
    }
}