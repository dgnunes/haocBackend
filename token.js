//token.js
var jwt = require('jsonwebtoken');
var User = require('./user/User');

const key = 'theresnoplacelikehome';
const duration = 15 * 60; //15 minutos

exports.create = function (user){

  var tokenData = jwt.sign(user,key,{
    expiresIn: duration
  }); 

  return tokenData;

}

exports.refresh = function(){

}

exports.verify = function verify (req){
    console.log("VERIFICANDO TOKEN");
    var token = (req.body && req.body.access_token) || req.headers['x-access-token'];
    
    if (token){//POSSÍVEL ENCONTRAR O TOKEN
        try {
            var decoded = jwt.verify(token, key);
            decoded.refresh;
            return true;
        }
        catch (err) {
            console.log("Exception");
            console.log(err);

            if(err.name == "TokenExpiredError"){
                throw new Error("Token expirou.");
            }

            if(err.message == "invalid token"){
                throw new Error("Token inválido.");
            }
        }
    }

    console.log("TOKEN FALSE");
    return false;
}