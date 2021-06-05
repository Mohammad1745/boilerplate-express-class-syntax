const ResponseService = require('../response_service')
const UserService = require('../base/user_service')
const jwt = require('jsonwebtoken')
const {makeHash} = require('../../../helper/helper')
const {SESSION_TIMEOUT} = require('../../../helper/core_constants')

class TodoService extends ResponseService {

    /**
     * UserService constructor.
     */
    constructor() {
        super()
        this.userService = new UserService
    }

    /**
     * @return {Object}
     */
    index = async () => {
        try {
            return this.response(await this.userService.findAll()).success()
        } catch (e) {
            return this.response().error(e.message)
        }
    }

    /**
     * @param {Object} request
     * @param response
     * @param type
     * @return {Object}
     */
    login = async (request, response, type="api") => {
        try {
            const { email, password } = request.body
            const user = await this.userService.findOneWhere({where: {email: email, password:makeHash(email,password)}})
            if (!user){
                return this.response().error('Wrong email or password.')
            }
            const authToken = jwt.sign({id:user.id}, process.env.AUTH_SECRET, {expiresIn: SESSION_TIMEOUT+'s'})
            const {firstName, lastName} = user
            let data = {firstName, lastName, email}
            if (type==="api") {
                data.authorization = {
                    tokenType: 'Bearer',
                    token: authToken
                }
            } else {
                // Setting the auth token in cookies
                response.cookie('authToken', authToken)
            }
            return this.response(data).success('User Logged In Successfully')
        } catch (e) {
            return this.response().error(e.message)
        }
    }

    /**
     * @param {Object} request
     * @return {Object}
     */
    signUp = async request => {
        try {
            let user = await this.userService.findOneWhere({where: {email: request.body.email}})
            if (user) {
                return this.response().error('User Already Exists')
            }
            user = await this.userService.create( this.userService.userDataFormatter( request.body))
            const {firstName, lastName, email} = user
            return this.response({firstName, lastName, email}).success('User Signed Up Successfully')
        } catch (e) {
            return this.response().error(e.message)
        }
    }

    /**
     * @param {Object} request
     * @param response
     * @return {Object}
     */
    logout = (request, response) => {
        try {
            response.cookie('authToken', null);
            return this.response().success('User Logged Out Successfully')
        } catch (e) {
            return this.response().error(e.message)
        }
    }

    /**
     * @param {Object} request
     * @return {Object}
     */
    read = async request => {
        try {
        const user = await this.userService.findOneWhere({where: {id: Number(request.params.id)}})
            return this.response(user).success()
        } catch (e) {
            return this.response().error(e.message)
        }
    }

    /**
     * @param {Object} request
     * @return {Object}
     */
    update = async request => {
        try {
            const user = await this.userService.findOneWhere({where: {id: Number(request.params.id)}})
            if (!user){
                return this.response().error('User Doesn\'t Exists')
            }
            await this.userService.updateWhere({where:{id: Number(request.params.id)}}, this.userService.userDataFormatter( request.body))
            return this.response().success('User Updated Successfully')
        } catch (e) {
            return this.response().error(e.message)
        }
    }

    /**
     * @param {Object} request
     * @return {Object}
     */
    delete = async request => {
        try {
            let user = await this.userService.findOneWhere({where: {id: Number(request.params.id)}})
            if (!user){
                return this.response().error('User Doesn\'t Exists')
            }
            await this.userService.destroy({where:{id: Number(request.params.id)}})
            return this.response().success('User Deleted Successfully')
        } catch (e) {
            return this.response().error(e.message)
        }
    }
}

module.exports = TodoService