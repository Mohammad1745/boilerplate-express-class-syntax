const Request = require('../request')

class SignupRequest extends Request{
    constructor() {
        super({
            firstName: 'required|string',
            lastName: 'required|string',
            email: 'required|string',
            password: 'required|string',
            confirmPassword: 'required|string',
        })
    }
}

module.exports = new SignupRequest()