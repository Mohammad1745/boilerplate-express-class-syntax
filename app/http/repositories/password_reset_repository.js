const Repository = require('./repository')
const {PasswordReset} = require('../../models')

class PasswordResetRepository extends Repository {
    /**
     * PasswordResetRepository constructor.
     */
    constructor() {
        super(PasswordReset)
    }
}

module.exports = PasswordResetRepository