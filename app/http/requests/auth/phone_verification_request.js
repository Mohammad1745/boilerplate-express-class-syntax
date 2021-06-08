const Request = require('../request')

class PhoneVerificationRequest extends Request{
    constructor() {
        super({
            phoneCode: 'required|string',
            phone: 'required|string',
            code: 'required|string'
        })
    }
}

module.exports = new PhoneVerificationRequest()