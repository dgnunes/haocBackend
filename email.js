// email.js

exports.sentMailVerificationLink = (user, token, callback) => {
    var textLink = "http://"+Config.server.host+":"+ Config.server.port+"/"+Config.email.verifyEmailUrl+"/"+token;
    var from = `Pyrite Team<${Config.email.username}>`;
    var mailbody = `<p>Thanks for Registering</p><p>Please verify your email by clicking on the verification link below.<br/><a href=${textLink.toString()}
    >Verification Link</a></p>`
    mail(from, user.username , `Account Verification`, mailbody, function(error, success){
        callback(error, success)
    });
};