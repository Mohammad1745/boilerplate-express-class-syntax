const Request = require('../request')
const {ADMIN_ROLE, USER_ROLE} = require('../../../helper/core_constants')

class SignupRequest extends Request{
    constructor() {
        super({
            firstName: 'required|string',
            lastName: 'required|string',
            email: 'required|email',
            phoneCode: 'required|string|regex:/^[+]{1}[0-9]{3}$/',
            phone: 'required|string|regex:/^(1){1}[1-9]{1}[0-9]{8}$/',
            // role: 'required|in:'+[ADMIN_ROLE,USER_ROLE].join(','),
            password: 'required|string|min:8',
            confirmPassword: 'required|same:password',
        })
    }
}

module.exports = new SignupRequest()