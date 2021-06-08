const { body , validationResult} = require('express-validator');
const {wordSplitter} = require('../../helper/helper')

class Request {
    constructor(rules) {
        this.validators = Object.keys(rules).map(key => body(key).custom(value => this.#setRule(rules[key], key, value)))
    }

    #setRule = (ruleString, key, value) => {//(required|string|min:NUMBER|max:NUMBER)
        const rules = ruleString.split('|')
        key = wordSplitter(key)
        key = key.charAt(0).toUpperCase() + key.slice(1)
        for (let rule of rules) {
            if (rule==='required' && !value) return Promise.reject(`${key} field is required.`)
            else if (rule==='string' && typeof value !== 'string') return Promise.reject(`${key} must be an string.`)
            else if (rule==='number' && typeof value !== 'number') return Promise.reject(`${key} must be a number.`)
            else if (rule==='email') {
                const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                if (!(typeof value === 'string' && regex.test(value))) return Promise.reject(`${key} is invalid.`)
            }
            else if (rule.startsWith('regex:')) {
                let regString = rule.split(':')[1]
                regString = regString.substr(1, regString.length-2)
                console.log(regString)
                const regex = new RegExp(regString)
                console.log(regex)
                if (!(typeof value === 'string' && regex.test(value))) return Promise.reject(`${key} is invalid.`)
            }
            else if (rule.startsWith('min:')) {
                const min = Number(rule.split(':')[1])
                if (value.length<min) return Promise.reject(`${key} must have at least ${min} character`)
            }
            else if (rule.startsWith('max:')) {
                const max = Number(rule.split(':')[1])
                if (value.length>max) return Promise.reject(`${key} must have not more than ${max} character`)
            }
            else if (rule.startsWith('same:')) {
            }
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
            response.cookie('old', request.body)
            response.cookie('errors', errors)
            return response.redirect('back')
        } else {
            response.clearCookie('errors')
            next()
        }
    }
}
module.exports = Request