const Service = require('../service')
const PasswordResetRepository = require('../../repositories/password_reset_repository')

class PasswordResetService extends Service {
    /**
     * PasswordResetService constructor.
     */
    constructor() {
        super(new PasswordResetRepository)
    }

    /**
     * @param {number} userId
     * @param {string} code
     * */
    passwordResetDataFormatter = (userId, code) => {
        return userId && code ? {userId, code} : {}
    }
}

module.exports = PasswordResetService