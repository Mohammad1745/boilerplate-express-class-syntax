const ResponseService = require('../response_service')
const UserService = require('../base/user_service')
const PasswordResetService = require('../base/password_reset_service')
const {makeHash, randomNumber, sendMessage} = require('../../../helper/helper')

class AuthService extends ResponseService {

    /**
     * UserService constructor.
     */
    constructor() {
        super()
        this.userService = new UserService
        this.passwordResetService = new PasswordResetService
    }

    /**
     * @param {Object} request
     * @param response
     * @return {Object}
     */
    login = async (request, response) => {
        try {
            const { email, password } = request.body
            const user = await this.userService.findOneWhere({email: email})
            if (!user){
                return this.response().error('Email User Doesn\'t Exists. Please Register An Account.')
            }
            if (user.password !== makeHash(email,password)){
                return this.response().error('Wrong email or password.')
            }
            const data = this.userService.authorizeUser(user, request, response)
            return this.response(data).success('User Logged In Successfully')
        } catch (e) {
            return this.response().error(e.message)
        }
    }

    /**
     * @param {Object} request
     * @param response
     * @return {Object}
     */
    signUp = async (request, response) => {
        try {
            let user = await this.userService.findOneWhere({email: request.body.email})
            if (user) {
                return this.response().error('User Already Exists')
            }
            const code = randomNumber(6)
            user = await this.userService.create( this.userService.userDataFormatter( request.body, code))
            // sendMessage(user.phoneCode+user.phone, `\nYour account verification code is ${code}`, () => {}, err => {})//TODO: uncomment to get verification sms

            const data = this.userService.authorizeUser(user, request, response)
            return this.response(data).success(`User Signed Up Successfully. Verification code has been send to ${user.phoneCode}${user.phone}.`)
        } catch (e) {
            return this.response().error(e.message)
        }
    }

    /**
     * @param {Object} request
     * @return {Object}
     */
    resendPhoneVerificationCode = async request => {
        try {
            let user = await this.userService.findOneWhere({phoneCode: request.body.phoneCode, phone: request.body.phone})
            if (!user) {
                return this.response().error('Invalid User')
            }
            const code = randomNumber(6)
            user = await this.userService.updateWhere({id:user.id}, {phoneVerificationCode:code, isPhoneVerified:false})
            // sendMessage(user.phoneCode+user.phone, `\nYour account verification code is ${code}`, () => {}, err => {})//TODO: uncomment to get verification sms
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
            let user = await this.userService.findOneWhere({phoneCode: request.body.phoneCode, phone: request.body.phone})
            if (!user) {
                return this.response().error('Invalid User')
            }
            if (user.phoneVerificationCode !== request.body.code) {
                return this.response().error('Invalid Code')
            }
            await this.userService.updateWhere({id: user.id}, {phoneVerificationCode:null, isPhoneVerified: true})
            return this.response().success(`Verification successful`)
        } catch (e) {
            return this.response().error(e.message)
        }
    }

    /**
     * @param {Object} request
     * @return {Object}
     */
    resetPassword = async request => {
        try {
            let user = await this.userService.findOneWhere({phoneCode: request.body.phoneCode, phone: request.body.phone})
            if (!user) {
                return this.response().error('Invalid User')
            }
            const code = randomNumber(6)
            const {id, phoneCode, phone} = user
            await this.passwordResetService.create( this.passwordResetService.passwordResetDataFormatter( id, code))
            // sendMessage(user.phoneCode+user.phone, `\n Your reset password code is ${code}`, () => {}, err => {})//TODO: uncomment to get verification sms
            return this.response({phoneCode, phone}).success(`Reset password code has been send to ${phoneCode}${phone}.`)
        } catch (e) {
            return this.response().error(e.message)
        }
    }

    /**
     * @param {Object} request
     * @return {Object}
     */
    resetPasswordCode = async request => {
        try {
            try {
                const user = await this.userService.findOneWhere({phoneCode: request.body.phoneCode, phone: request.body.phone})
                if (!user) {
                    return this.response().error('Invalid User')
                }
                const passwordReset = await this.passwordResetService.findOneWhere({userId:user.id, code:request.body.code})
                if (!passwordReset) {
                    return this.response().error('Invalid Code')
                }
                await this.userService.updateWhere({id: user.id}, {password:makeHash(user.email, request.body.password)})
                await this.passwordResetService.destroy({userId:user.id})
                return this.response().success(`Password Reset Successful.`)
            } catch (e) {
                return this.response().error(e.message)
            }
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