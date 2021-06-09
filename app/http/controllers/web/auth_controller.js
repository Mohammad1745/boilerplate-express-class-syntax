const Controller = require('../controller')
const AuthService = require('../../services/auth/auth_service')

class AuthController extends Controller {
    /**
     * AuthController constructor.
     */
    constructor () {
        super()
        this.service = new AuthService
    }

    /**
     * @param {Object} request
     * @param {Object} response
     */
    login = (request, response) => {
        return this.view('auth/login', {layout: 'auth.hbs'}, request, response)
    }

    /**
     * @param {Object} request
     * @param {Object} response
     */
    signup = (request, response) => {
        return this.view('auth/signup', {layout: 'auth.hbs'}, request, response)
    }

    /**
     * @param {Object} request
     * @param {Object} response
     */
    loginProcess = async (request, response) => {
        const serviceResponse = await this.service.login( request, response)
        return this.webResponse(serviceResponse, '/user/dashboard', {}, request, response)
    }

    /**
     * @param {Object} request
     * @param {Object} response
     */
    signupProcess = async (request, response) => {
        const serviceResponse = await this.service.signUp( request, response)
        return this.webResponse(serviceResponse, '/auth/phone-verification', {}, request, response)
    }

    /**
     * @param {Object} request
     * @param {Object} response
     */
    resendPhoneVerificationCode = async (request, response) => {
        const serviceResponse = await this.service.resendPhoneVerificationCode( request)
        return this.webResponse(serviceResponse, '/auth/phone-verification', {}, request, response)
    }

    /**
     * @param {Object} request
     * @param {Object} response
     */
    phoneVerification = (request, response) => {
        return this.view('auth/phone_verification', {layout: 'auth.hbs'}, request, response)
    }

    /**
     * @param {Object} request
     * @param {Object} response
     */
    phoneVerificationProcess = async (request, response) => {
        const serviceResponse = await this.service.phoneVerification( request)
        return this.webResponse(serviceResponse, '/auth/login', {}, request, response)
    }

    /**
     * @param {Object} request
     * @param {Object} response
     */
    resetPassword = (request, response) => {
        return this.view('auth/reset_password', {layout: 'auth.hbs'}, request, response)
    }

    /**
     * @param {Object} request
     * @param {Object} response
     */
    resetPasswordProcess = async (request, response) => {
        const serviceResponse = await this.service.resetPassword( request)
        return this.webResponse(serviceResponse, '/auth/reset-password-code', {}, request, response)
    }

    /**
     * @param {Object} request
     * @param {Object} response
     */
    resetPasswordCode = (request, response) => {
        return this.view('auth/reset_password_code', {layout: 'auth.hbs'}, request, response)
    }

    /**
     * @param {Object} request
     * @param {Object} response
     */
    resetPasswordCodeProcess = async (request, response) => {
        const serviceResponse = await this.service.resetPasswordCode( request)
        return this.webResponse(serviceResponse, '/auth/login', {}, request, response)
    }

    /**
     * @param {Object} request
     * @param {Object} response
     */
    logoutProcess = (request, response) => {
        const serviceResponse = this.service.logout( request, response)
        return this.webResponse(serviceResponse, '/', {}, request, response)
    }
}

module.exports = new AuthController()