const  Controller = require('../../controller')
const ProfileService = require('../../../services/user/profile_service')

class ProfileController extends Controller {
    /**
     * ProfileController constructor
     * */
    constructor() {
        super();
        this.service = new ProfileService
    }

    /**
     * @param {Object} request
     * @param {Object} response
     * @return {JSON}
     */
    profile = async (request, response) => {
        return this.view('user/profile','user.hbs', request, response, await this.service.profile( request))
    }

    /**
     * @param {Object} request
     * @param {Object} response
     * @return {JSON}
     */
    upload = async (request, response) =>  {
        const serviceResponse = await this.service.uploadImage(request, response)
        return this.webResponse(serviceResponse, '/user/profile', {}, request, response)
    }
}

module.exports = new ProfileController