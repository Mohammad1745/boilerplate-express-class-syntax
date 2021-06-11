class Controller {
    constructor() {}

    /**
     * @param {string} view
     * @param {{layout: string}|string} layout
     * @param {Object} request
     * @param {Object} response
     * @param serviceResponse
     */
    view = (view, layout, request, response, serviceResponse=null) => {
        let data = {}
        if (serviceResponse) {
            data = serviceResponse.data
            if (!serviceResponse.success) {
                return response.render(view, {error:serviceResponse.message, layout})
            }
        }
        //cookies from redirected routes
        const cookies = {errors:[] , error:null, success:null, old:{}, data:{}}
        Object.keys(cookies).map(element => {
            cookies[element] = request.cookies[element]
            response.clearCookie(element)
        })
        data = {...data, ...cookies.data}
        return response.render(view, {...cookies, ...data, layout})
    }

    webResponse = (serviceResponse, successRoute, {failRoute, successRouteData, failRouteData}={}, request, response) => {
        if (serviceResponse.data) {
            successRouteData = {...successRouteData, item: serviceResponse.data}
            failRouteData = {...failRouteData, item: serviceResponse.data}
        }
        if (!serviceResponse.success) {
            response.cookie('error', serviceResponse.message)
            response.cookie('data', failRouteData)
            return response.redirect( failRoute ? failRoute : "back")
        }
        response.cookie('success', serviceResponse.message)
        response.cookie('data', successRouteData)
        return response.redirect( successRoute)
    }
}

module.exports = Controller