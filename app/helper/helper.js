const crypto = require('crypto')

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