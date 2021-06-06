class Controller {
    constructor() {
    }
    successResponse = message => {
        return {success: message}
    }
    errorResponse = message => {
        return {error: message}
    }

    view = (view, {data, layout} = {}, request, response) => {
        //cookies from redirected routes
        const cookies = {errors:[] , error:null, success:null}
        //cookie extraction
        Object.keys(cookies).map(element => {
            cookies[element] = request.cookies[element]
            response.clearCookie(element)
        })
        //adding keys to each error of errors
        cookies.errors ? cookies.errors.map(error => cookies.errors[error.param] = error) : cookies.errors = {}

        return data ?
            response.render(view, {...cookies, ...data, layout})
            : response.render(view, {...cookies, layout})
    }
}

module.exports = Controller