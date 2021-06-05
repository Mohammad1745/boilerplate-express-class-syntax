const crypto = require('crypto')

module.exports = {
    makeHash : (secret,data) =>  crypto.createHash('sha256').update(secret+data).digest('base64')
}