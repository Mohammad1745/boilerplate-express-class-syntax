const Controller = require('../controller')
const AuthService = require('../../services/auth/auth_service')

class TaskController extends Controller {
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
     * @return {JSON}
     */
    login = (request, response) => {
        return this.view('auth/login', {layout: 'auth.hbs'}, request, response)
    }

    /**
     * @param {Object} request
     * @param {Object} response
     * @return {JSON}
     */
    signup = (request, response) => {
        return this.view('auth/signup', {layout: 'auth.hbs'}, request, response)
    }

    /**
     * @param {Object} request
     * @param {Object} response
     * @return {JSON}
     */
    loginProcess = async (request, response) => {
        const serviceResponse = await this.service.login( request, response, 'web')
        return this.webResponse(serviceResponse, '/user/dashboard', {}, request, response)
    }

    /**
     * @param {Object} request
     * @param {Object} response
     * @return {JSON}
     */
    signupProcess = async (request, response) => {
        const serviceResponse = await this.service.signUp( request)
        return this.webResponse(serviceResponse, '/auth/login', {}, request, response)
    }

    /**
     * @param {Object} request
     * @param {Object} response
     * @return {JSON}
     */
    logoutProcess = (request, response) => {
        const serviceResponse = this.service.logout( request, response)
        return this.webResponse(serviceResponse, '/', {}, request, response)
    }
}

module.exports = new TaskController()