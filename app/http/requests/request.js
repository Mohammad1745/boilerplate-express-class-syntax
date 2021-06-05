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

    validate = request => {
        const error = validationResult(request)
        if (!error.isEmpty()) {
            return {
                success: false,
                message: error.array().reduce((message, error) => message+' '+error.msg, '')
            }
        } else {
            return {
                success: true,
                data: request
            }
        }
    }
}
module.exports = Request