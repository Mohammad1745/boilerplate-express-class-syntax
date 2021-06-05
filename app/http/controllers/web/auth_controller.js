const Controller = require('../controller')
const AuthService = require('../../services/auth/auth_service')
const loginRequest = require('../../requests/auth/login_request')
const signupRequest = require('../../requests/auth/signup_request')

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
    login = (request, response) =>  response.render('auth/login', {layout: 'auth.hbs'})

    /**
     * @param {Object} request
     * @param {Object} response
     * @return {JSON}
     */
    signup = (request, response) => response.render('auth/signup', {layout: 'auth.hbs'})

    /**
     * @param {Object} request
     * @param {Object} response
     * @return {JSON}
     */
    loginProcess = async (request, response) => {
        const result = loginRequest.validate(request)
        if (!result.success) return response.redirect('back')
        const serviceResponse = await this.service.login( request, response, 'web')
        if (!serviceResponse.success) return response.redirect('back')
        return response.redirect('/user/dashboard')
    }

    /**
     * @param {Object} request
     * @param {Object} response
     * @return {JSON}
     */
    signupProcess = async (request, response) => {
        const result = signupRequest.validate(request)
        if (!result.success) return response.redirect('back')
        const serviceResponse = await this.service.signUp( request)
        if (!serviceResponse.success) return response.redirect('back')
        return response.redirect('/auth/login')
    }

    /**
     * @param {Object} request
     * @param {Object} response
     * @return {JSON}
     */
    logoutProcess = (request, response) => {
        const serviceResponse = this.service.logout( request, response)
        if (!serviceResponse.success) return response.redirect('back')
        return response.redirect('/')
    }
}

module.exports = new TaskController()