const Controller = require('../controller')
const AuthService = require('../../services/auth/auth_service')
const loginRequest = require('../../requests/auth/login_request')
const signupRequest = require('../../requests/auth/signup_request')

class TaskController extends Controller {
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
        const result = loginRequest.validate(request)
        return !result.success ? response.json(result) : response.json( await this.service.login( request, response))
    }

    /**
     * @param {Object} request
     * @param {Object} response
     * @return {JSON}
     */
    signup = async (request, response) => {
        const result = signupRequest.validate(request)
        return !result.success ? response.json(result) : response.json( await this.service.signUp( request))
    }

    /**
     * @param {Object} request
     * @param {Object} response
     * @return {JSON}
     */
    logout = (request, response) => {
        const serviceResponse = this.service.logout( request, response)
        if (!serviceResponse.success) return response.redirect('back')
        return response.redirect('/')
    }
}

module.exports = new TaskController()