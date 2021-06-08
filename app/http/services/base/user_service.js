const Service = require('../service')
const UserRepository = require('../../repositories/user_repository')
const jwt = require('jsonwebtoken')
const {USER_ROLE, SESSION_TIMEOUT} = require('../../../helper/core_constants')
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

    authorizeUser = (user, request, response) => {
        const {id, firstName, lastName, role, email, phoneCode, phone, isPhoneVerified} = user
        const data = {id, firstName, lastName, email, role, phoneCode, phone, isPhoneVerified}
        const authToken = jwt.sign(data, process.env.AUTH_SECRET, {expiresIn: SESSION_TIMEOUT+'s'})
        if (request.headers['content-type'] ==="api") {
            data.authorization = {
                tokenType: 'Bearer',
                token: authToken
            }
        } else {
            // Setting the auth token in cookies
            response.cookie('authToken', authToken)
        }
        return data
    }
}

module.exports = UserService