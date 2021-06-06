class Controller {
    constructor() {}

    view = (view, {data, layout} = {}, request, response) => {
        //cookies from redirected routes
        const cookies = {errors:[] , error:null, success:null, data:{}}
        Object.keys(cookies).map(element => {
            cookies[element] = request.cookies[element]
            response.clearCookie(element)
        })
        //adding keys to each error of errors
        cookies.errors ? cookies.errors.map(error => cookies.errors[error.param] = error) : cookies.errors = {}
        //merging cookies.data into data
        data = {...data, ...cookies.data}

        return response.render(view, {...cookies, ...data, layout})
    }

    webResponse = (serviceResponse, successRoute, {failRoute, successRouteData, failRouteData}={}, request, response) => {
        if (serviceResponse.data) {
            successRouteData = {...successRouteData, ...serviceResponse.data}
            failRouteData = {...failRouteData, ...serviceResponse.data}
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