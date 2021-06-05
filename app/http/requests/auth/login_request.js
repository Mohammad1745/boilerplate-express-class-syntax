const Request = require('../request')

class TaskRequest extends Request{
    constructor() {
        super({
            email: 'required|string',
            password: 'required|string'
        })
    }
}

module.exports = new TaskRequest()