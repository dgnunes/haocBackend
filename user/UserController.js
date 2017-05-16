// UserController.js

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

var User = require('./User');

// CREATES A NEW USER
router.post('/', function (req, res) {

    User.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        }, 
        function (err, user) {
            if (err) 
                return res.status(500).send("Houve um problema ao adicionar um Usuário ao Banco de Dados.");

            res.status(200).send(user);
        });

});

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/', function (req, res) {

    User.find({}, function (err, users) {
        if (err) return res.status(500).send("Não foi possível encontrar este usuário.");
        res.status(200).send(users);
    });

});

module.exports = router;