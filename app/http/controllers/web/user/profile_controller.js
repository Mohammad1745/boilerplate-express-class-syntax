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
    profile = (request, response) => {
        this.view('user/profile','user.hbs', request, response, this.service.profile( request, response))
    }
}

module.exports = new ProfileController