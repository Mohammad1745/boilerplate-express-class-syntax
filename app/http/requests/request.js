const { body , validationResult} = require('express-validator');

class Request {
    constructor(rules) {
        this.validators = Object.keys(rules).map(key => body(key).custom(value => this.#setRule(rules[key], key, value)))
    }

    #setRule = (ruleString, key, value) => {
        const rules = ruleString.split('|')
        for (let rule of rules) {
            if (rule==='required' && !value) return Promise.reject(key+' field is required.')
            else if (rule==='string' && typeof value !== 'string') return Promise.reject(key+' must be an string.')
        }
        return Promise.resolve(true)
    }

    validate = (request, response, next) => {
        const error = validationResult(request)
        if (!error.isEmpty()) {
            const errors = {}
            error.array().map(error => errors[error.param] = error)
            if (request.headers['content-type'] === 'application/json')  {
                return response.json({
                    success: false,
                    message: errors
                })
            }
            response.cookie('errors', errors)
            return response.redirect('back')
        } else {
            response.clearCookie('errors')
            next()
        }
    }
}
module.exports = Request