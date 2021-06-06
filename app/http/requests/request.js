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
            if (request.headers['content-type'] === 'application/json')  {
                return response.json({
                    success: false,
                    message: error.array().reduce((message, error) => message+" "+error.msg, "")
                })
            }
            response.cookie('errors', error.array())
            return response.redirect('back')
        } else {
            response.cookie('errors', [])
            next()
        }
    }
}
module.exports = Request