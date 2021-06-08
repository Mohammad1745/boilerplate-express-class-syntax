const Request = require('../request')

class SignupRequest extends Request{
    constructor() {
        super({
            firstName: 'required|string',
            lastName: 'required|string',
            email: 'required|email',
            phoneCode: 'required|string',
            phone: 'required|string',
            password: 'required|string|min:8',
            confirmPassword: 'required|string|min:8',
        })
    }
}

module.exports = new SignupRequest()