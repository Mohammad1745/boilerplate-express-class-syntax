const Repository = require('./repository')
const {User} = require('../../models')

class UserRepository extends Repository {
    /**
     * UserRepository constructor.
     */
    constructor() {
        super(User)
    }
}

module.exports = UserRepository