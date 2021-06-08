module.exports = {
    verified : (req, res, next) => {
        if (!(req.user && req.user.isPhoneVerified)) {
            return req.headers['content-type']==="application/json" ?
                res.json({
                    success: false,
                    message: 'Phone is not verified'
                })
                : res.redirect('/auth/phone-verification')
        }
        next()
    }
}