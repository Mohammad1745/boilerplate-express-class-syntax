const Request = require('../request')

class SignupRequest extends Request{
    constructor() {
        super({
            firstName: 'required|string',
            lastName: 'required|string',
            email: 'required|email',
            phoneCode: 'required|string|regex:/^[+]{1}[0-9]{3}$/',
            phone: 'required|string|regex:/^(1){1}[1-9]{1}[0-9]{8}$/',
            password: 'required|string|min:8',
            confirmPassword: 'required|string|min:8',
        })
    }
}

module.exports = new SignupRequest()