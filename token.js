//token.js
var jwt = require('jsonwebtoken');

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

exports.verify = function verify (req, res, next){
    console.log("VERIFICANDO TOKEN");

    var token = (req.body && req.body.access_token) || req.headers['x-access-token'];
    
    if (token){//POSSÍVEL ENCONTRAR O TOKEN
        jwt.verify(token, key, function(err, decoded){
            if(err){
                if(err.name == "TokenExpiredError"){
                    return res.status(401).json({success: false, msg: "Token expirou prazo de " + duration + " segundos."});
                    //throw new Error("Token expirou.");
                }

                if(err.message == "invalid token"){
                    return res.status(401).json({success: false, msg: "Token inválido."});
                    //throw new Error("Token inválido.");
                }

                return res.status(401).json({success: false, msg: "Token não autenticado."});

            }

            decoded.refresh;
            next();
                
        });
    }
    else {
        console.log("TOKEN FALSE");
        return res.status(401).json({success: false, msg: "Token não encontrado."});
        //throw new Error("Token não encontrado.");
    }
}
