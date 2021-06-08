const {ADMIN_ROLE} = require('../../helper/core_constants')

module.exports = {
    admin : (req, res, next) => {
        if (!(req.user && req.user.role && req.user.role===ADMIN_ROLE)) {
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