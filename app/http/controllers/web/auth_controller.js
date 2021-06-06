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
        this.view('auth/login', {layout: 'auth.hbs'}, request, response)
    }

    /**
     * @param {Object} request
     * @param {Object} response
     * @return {JSON}
     */
    signup = (request, response) => {
        this.view('auth/signup', {layout: 'auth.hbs'}, request, response)
    }

    /**
     * @param {Object} request
     * @param {Object} response
     * @return {JSON}
     */
    loginProcess = async (request, response) => {
        const serviceResponse = await this.service.login( request, response, 'web')
        if (!serviceResponse.success) {
            response.cookie('error', serviceResponse.message)
            return response.redirect('back')
        }
        response.cookie('success', serviceResponse.message)
        return response.redirect('/user/dashboard')
    }

    /**
     * @param {Object} request
     * @param {Object} response
     * @return {JSON}
     */
    signupProcess = async (request, response) => {
        const serviceResponse = await this.service.signUp( request)
        if (!serviceResponse.success) {
            response.cookie('error', serviceResponse.message)
            return response.redirect('back')
        }
        response.cookie('success', serviceResponse.message)
        return response.redirect('/auth/login')
    }

    /**
     * @param {Object} request
     * @param {Object} response
     * @return {JSON}
     */
    logoutProcess = (request, response) => {
        const serviceResponse = this.service.logout( request, response)
        if (!serviceResponse.success) {
            response.cookie('error', serviceResponse.message)
            return response.redirect('back')
        }
        return response.redirect('/')
    }
}

module.exports = new TaskController()