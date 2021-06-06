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
        let error = request.cookies['error']
        let errors = request.cookies['errors']
        errors ? errors.map(error => errors[error.param] = error) : errors = {}
        response.render('auth/login', {errors, error, layout: 'auth.hbs'})
    }

    /**
     * @param {Object} request
     * @param {Object} response
     * @return {JSON}
     */
    signup = (request, response) => {
        let error = request.cookies['error']
        let errors = request.cookies['errors']
        errors ? errors.map(error => errors[error.param] = error) : errors = {}
        response.render('auth/signup', {errors, error, layout: 'auth.hbs'})
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