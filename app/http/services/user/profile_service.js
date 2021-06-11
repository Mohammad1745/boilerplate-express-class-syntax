const ResponseService = require('../response_service')
const UserService = require('../base/user_service')
const {makeHash, randomNumber, sendMessage} = require('../../../helper/helper')

class AuthService extends ResponseService {

    /**
     * UserService constructor.
     */
    constructor() {
        super()
        this.userService = new UserService
    }

    /**
     * @param {Object} request
     * @param response
     * @return {Object}
     */
    profile = (request, response) => {
        try {

            return this.response().success('User Logged Out Successfully')
        } catch (e) {
            return this.response().error(e.message)
        }
    }
}

module.exports = AuthService