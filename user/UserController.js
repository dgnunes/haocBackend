// UserController.js

var token = require('../token');
var express = require('express');
var cryptography = require('../cryptography')

var User = require('./User');

// CREATES A NEW USER
exports.createUser = function (req, res) {
    console.log("PASSOU!");
    console.log(req.body);

    req.body.password = cryptography.encrypt(req.body.password);
    User.create({
            username : req.body.username,
            password : req.body.password,
            email : req.body.email
        }, 
        function (err, user) {
            if (err) {
                if (11000 === err.code || 11001 === err.code) {
	                return res.status(403).json({success: false, msg: "Dados inválidos."});
	            }

                return res.status(500).json({success: false, msg: "Houve um problema ao adicionar um Usuário ao Banco de Dados."});
            }
	        
            //TODO Enviar e-mail avisando da criação do usuário

            res.json({
                success: true,
                user: user 
            });
        }
    );

}

exports.login = function (req,res) {
    console.log("LOGIN");
    console.log(req.body);
    User.findOne({username: req.body.username}, function(err, user) {
        if (err) {
            console.log(err);
            return res.status(500).json({success: false, msg: "Houve um problema ao localizar este Usuário no Banco de Dados."});
        }

        if (user === null){
            return res.status(404).json({success: false, msg: "Usuário ou senha inválida."});
        }

        if (req.body.password !== cryptography.decrypt(user.password)){
            return res.status(404).json({success: false, msg: "Usuário ou senha inválida."});
        }

        res.json({
          success: true,
          userid: user._id,
          token: token.create(user)
        });
   });
}

/*
// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {

    User.find({}, function (err, users) {
        if (err) return res.status(500).send("Não foi possível encontrar este usuário.");
        res.status(200).send(users);
    });

});
*/

/*
// RETORNA USUÁRIO DO ID
router.get('/:id', function (req, res) {

    User.findById(req.params.id, function (err, user) {
        if (err) 
            return res.status(500).send("Não foi possível encontrar este usuário.");

        if (!user) 
            return res.status(404).send("Usuário não encontrado.");

        res.status(200).send(user);
    });
});

router.put('/:id', function (req, res) {
    
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, user) {
        if (err)
            return res.status(500).send("Não foi possível atualizar este usuário.");

        res.status(200).send(user);
    });

});
*/

// module.exports = router;
