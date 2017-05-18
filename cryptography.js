//cryptography.js
//fonte https://medium.com/@pandeysoni/user-authentication-using-jwt-json-web-token-in-node-js-using-express-framework-543151a38ea1
const crypto = require('crypto');

const  algorithm = 'aes-256-ctr';
const privateKey = '37HaOCt3ST3YOh9Y';

function decrypt(password) {
    var decipher = crypto.createDecipher(algorithm, privateKey);
    var dec = decipher.update(password, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}

// method to encrypt data(password)
function encrypt(password) {
    var cipher = crypto.createCipher(algorithm, privateKey);
    var crypted = cipher.update(password, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

exports.decrypt = (password) => {
   return decrypt(password);
};

exports.encrypt = (password) => {
    return encrypt(password);
};
