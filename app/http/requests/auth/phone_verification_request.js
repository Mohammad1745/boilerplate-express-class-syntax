const Request = require('../request')

class PhoneVerification extends Request{
    constructor() {
        super({
            phoneCode: 'required|string',
            phone: 'required|string',
            code: 'required|string'
        })
    }
}

module.exports = new PhoneVerification()