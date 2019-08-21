const crypto = require('crypto');

module.exports = {
    cryptPassword(pass) {
        return new Promise((resolve) => {
            let passCrypto = crypto.createHmac('sha256', process.env.SECRET).update(pass).digest('hex');
            resolve(passCrypto);
        }); 
    }
}