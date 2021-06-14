const  Controller = require('../../controller')

class DashboardController extends Controller {
    /**
     * DashboardController constructor
     * */
    constructor() {
        super();
    }

    /**
     * @param {Object} request
     * @param {Object} response
     * @return {JSON}
     */
    dashboard = (request, response) => {
        return response.json()
    }
}

module.exports = new DashboardController()