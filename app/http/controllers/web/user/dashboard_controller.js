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
    dashboard = (request, response) => response.render('user/dashboard', {layout: 'user.hbs'})
}

module.exports = new DashboardController()