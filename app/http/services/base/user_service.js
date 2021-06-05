const Service = require('../service')
const UserRepository = require('../../repositories/user_repository')
const {makeHash} = require('../../../helper/helper')

class UserService extends Service {
    /**
     * UserService constructor.
     */
    constructor() {
        super(new UserRepository)
    }

    userDataFormatter = data => {
        return data ?
            {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: makeHash(data.email,data.password)
            }
            : {}
    }
}

module.exports = UserService