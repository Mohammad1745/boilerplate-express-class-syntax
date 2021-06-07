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
    dashboard = (request, response) => this.view('admin/dashboard', {layout: 'admin.hbs'}, request, response)
}

module.exports = new DashboardController()