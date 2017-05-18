// ListController.js

var List = require('./List');
var User = require('../user/User');
var Task = require('../task/Task');

//POST CRIA UM NOVO REGISTRO
exports.createList =  function(req,res){
    console.log("CREATE LIST");
    User.findById(req.body.userid, function (err, user) {
        
        if (err) 
            return res.status(500).send("Não foi possível encontrar este usuário.");

        if (!user) 
            return res.status(404).send("Usuário não encontrado.");

        List.create({
            _creator: user,
            name: req.body.name,
        },function (err, list){
            if(err){
                if (err.code == 11000){
                    return res.status(403).send("Este nome de lista já está Cadastrado.");    
                }
                console.log(err);
                return res.status(500).send("Houve um problema ao criar uma Lista.");
            }
            
            res.json({
                success: true,
                list: list 
            });

        });

    });
}

//GET Retorna todas as listas do usuário
exports.getUserLists = function (req, res){
    console.log("GET LISTS");
    User.findById(req.params.userid, function (err, user) {
        console.log("INSIDE USERFINDBYID");

        if (err) 
            return res.status(500).send("Não foi possível encontrar este usuário.");

        if (!user) 
            return res.status(404).send("Usuário não encontrado.");

        List.find({_creator: user}, function (err, lists) {
            if (err){
                return res.status(500).send("Houve um problema ao procurar as Listas.");
            }

            if (lists == null) {
                return res.status(404).send("Não há listas cadastradas.");
            }

            res.json({
                success: true,
                lists: lists
            });
        });

    });
}

//GET Retorna todas as listas do usuário
exports.getList = function (req, res){
    console.log("GET LIST");
    List.findById(req.params.listid, function (err, list) {
        if (err){
            return res.status(500).send("Houve um problema ao procurar as Listas.");
        }

        if (list == null) {
            return res.status(404).send("Não há listas cadastradas.");
        }

        list.populate("tasks",function(err,l){
            res.json({
                success: true,
                list: l
            });
        })

    });
}

//PUT faz update na lista
exports.updateList = function (req, res){
    console.log("UPDATE LIST");
    var newList = JSON.parse(req.body.list);
    List.findByIdAndUpdate(req.params.listid,newList,{new: true},function (err, list) {
        if (err){
            console.log(err);
            return res.status(500).send("Houve um problema ao atualizar a Lista.");
        }

        if (list == null) {
            return res.status(404).send("Não encontramos essa lista.");
        }

        list.populate("tasks",function(err,l){
            res.json({
                success: true,
                list: l
            });
        });
    });
}

//PUT faz update na lista
exports.deleteList = function (req, res){
    console.log("DELETE LIST");
    List.findByIdAndRemove(req.params.listid,function (err, list) {
        if (err){
            console.log(err);
            return res.status(500).send("Houve um problema ao remover a Lista.");
        }

        if (list == null) {
            return res.status(404).send("Não encontramos essa lista.");
        }

        Task.remove({ _parent: list }, function (err) {
            if (err) 
                return res.status(500).send("Não foi possível apagar as tarefas associadas");

            res.json({
                success: true
            });
        });

    });
}
