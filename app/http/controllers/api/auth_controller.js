const Controller = require('../controller')
const AuthService = require('../../services/auth/auth_service')

class AuthController extends Controller {
    /**
     * AuthService constructor.
     */
    constructor () {
        super()
        this.service = new AuthService
    }

    /**
     * @param {Object} request
     * @param {Object} response
     * @return {JSON}
     */
    login = async (request, response) => {
        return response.json( await this.service.login( request, response))
    }

    /**
     * @param {Object} request
     * @param {Object} response
     * @return {JSON}
     */
    signup = async (request, response) => {
        return response.json( await this.service.signUp( request, response))
    }

    /**
     * @param {Object} request
     * @param {Object} response
     * @return {JSON}
     */
    resendPhoneVerificationCode = async (request, response) => {
        return response.json( await this.service.resendPhoneVerificationCode( request))
    }

    /**
     * @param {Object} request
     * @param {Object} response
     * @return {JSON}
     */
    phoneVerificationProcess = async (request, response) => {
        return response.json( await this.service.phoneVerification( request))
    }
    /**
     * @param {Object} request
     * @param {Object} response
     */
    resetPasswordProcess = async (request, response) => {
        return response.json( await this.service.resetPassword( request))
    }

    /**
     * @param {Object} request
     * @param {Object} response
     */
    resetPasswordCodeProcess = async (request, response) => {
        return response.json( await this.service.resetPasswordCode( request))
    }

    /**
     * @param {Object} request
     * @param {Object} response
     * @return {JSON}
     */
    logout = (request, response) => {
        return response.json( this.service.logout)
    }
}

module.exports = new AuthController()