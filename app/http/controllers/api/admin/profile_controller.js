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
        return response.json(await this.service.profile(request))
    }

    /**
     * @param {Object} request
     * @param {Object} response
     * @return {JSON}
     */
    uploadImage = async (request, response) => {
        return response.json(await this.service.uploadImage(request, response))
    }
}

module.exports = new ProfileController