const {USER_ROLE} = require('../../helper/core_constants')

module.exports = {
    user : (req, res, next) => {
        if (!(req.user && req.user.role && req.user.role===USER_ROLE)) {
            return req.headers['content-type']==="application/json" ?
                res.json({
                    success: false,
                    message: 'Unauthorized'
                })
                : res.redirect('/')
        }
        next()
    }
}