const crypto = require('crypto')
const twilioClient = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN)

module.exports = {
    roles : input => {
        let output = {
            ADMIN_ROLE: 'Admin',
            USER_ROLE: 'User'
            //...
        }
        return input ? output[input] : output;
    },
    userRoles : input => {
        let output = {
            USER_ROLE: 'User'
            //...
        }
        return input ? output[input] : output;
    },

    sendMessage: (toNumber, message, successCallback, errorCallback) => {
        twilioClient.messages.create({
            to: toNumber,
            from: process.env.TWILIO_NUMBER,
            body: message,
        }).then(function() {
            successCallback()
        }).catch(function(err) {
            errorCallback(err)
        })
    },

    randomNumber : (length = 10) => {
        let response = ''
        for (let i = 0; i < length; i++) {
            let y = Math.random()*100
            response += String(y).substr(String(y).length-1, 1)
        }
        return response;
    },

    makeHash : (secret,data) =>  crypto.createHash('sha256').update(secret+data).digest('base64'),

    wordSplitter: string => {
        string.split('').map(char => {
            if (char >= 'A' && char <= 'Z') {
                let worldPieces = string.split(char)
                string = worldPieces[0] + " " + char + worldPieces[1]
            }
        })
        return string
    }
}