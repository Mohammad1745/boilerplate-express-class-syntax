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
     * @return {Object}
     */
    profile = async (request) => {
        try {
            const user = await this.userService.findOneWhere({id:request.user.id}, ['firstName', 'lastName', 'email','phoneCode', 'phone'])
            const {firstName, lastName, email,phoneCode, phone} = user
            return this.response( {firstName, lastName, email,phoneCode, phone}).success()
        } catch (e) {
            return this.response().error(e.message)
        }
    }
}

module.exports = AuthService