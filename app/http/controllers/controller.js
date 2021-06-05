class Controller {
    constructor() {
    }
    successResponse = message => {
        return {
            success: message
        }
    }
    errorResponse = message => {
        return
        {
            error: message
        }
    }
}

module.exports = Controller