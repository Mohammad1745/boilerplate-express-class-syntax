const Service = require('../service')
const UserRepository = require('../../repositories/user_repository')
const {USER_ROLE} = require('../../../helper/core_constants')
const {makeHash} = require('../../../helper/helper')

class UserService extends Service {
    /**
     * UserService constructor.
     */
    constructor() {
        super(new UserRepository)
    }

    userDataFormatter = (data, verificationCode) => {
        return data ?
            {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phoneCode: data.phoneCode,
                phone: data.phone,
                phoneVerificationCode: verificationCode,
                password: makeHash(data.email,data.password),
                role: data.role ? data.role : USER_ROLE
            }
            : {}
    }
}

module.exports = UserService