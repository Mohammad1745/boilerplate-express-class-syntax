module.exports = {
    verified : (req, res, next) => {
        if (!req.user) {
            return res.redirect('/auth/login')
        }
        if (!req.user.isPhoneVerified) {
            return res.redirect('/auth/phone-verification')
        }
        next()
    }
}