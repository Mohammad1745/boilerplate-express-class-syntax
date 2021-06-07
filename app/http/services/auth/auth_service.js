const ResponseService = require('../response_service')
const UserService = require('../base/user_service')
const twilioClient = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN)
const jwt = require('jsonwebtoken')
const {makeHash, randomNumber, sendMessage} = require('../../../helper/helper')
const {SESSION_TIMEOUT} = require('../../../helper/core_constants')

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
     * @param type
     * @return {Object}
     */
    login = async (request, response, type="api") => {
        try {
            const { email, password } = request.body
            const user = await this.userService.findOneWhere({where: {email: email}})
            if (!user){
                return this.response().error('Email User Doesn\'t Exists. Please Register An Account.')
            }
            if (user.password !== makeHash(email,password)){
                return this.response().error('Wrong email or password.')
            }
            const {id, firstName, lastName, role} = user
            const payload = {id, firstName, lastName, email, role}
            const authToken = jwt.sign(payload, process.env.AUTH_SECRET, {expiresIn: SESSION_TIMEOUT+'s'})
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
            const code = randomNumber(6)
            user = await this.userService.create( this.userService.userDataFormatter( request.body, code))
            // sendMessage(user.phoneCode+user.phone, `\nYour account verification code is ${code}`, () => {}, err => {})
            const {firstName, lastName, email, phoneCode, phone} = user
            return this.response({firstName, lastName, email, phoneCode, phone}).success(`User Signed Up Successfully. Verification code has been send to ${user.phoneCode}${user.phone}.`)
        } catch (e) {
            return this.response().error(e.message)
        }
    }

    /**
     * @param {Object} request
     * @return {Object}
     */
    phoneVerification = async request => {
        try {
            let user = await this.userService.findOneWhere({where: {phoneCode: request.body.phoneCode, phone: request.body.phone}})
            if (!user) {
                return this.response().error('Invalid User')
            }
            if (user.phoneVerificationCode !== request.body.code) {
                return this.response().error('Invalid Code')
            }
            return this.response().success(`Verification successful`)
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
            response.clearCookie('authToken');
            return this.response().success('User Logged Out Successfully')
        } catch (e) {
            return this.response().error(e.message)
        }
    }
}

module.exports = AuthService