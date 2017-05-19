//TaskController.js
var Task = require('./Task');
var List = require('../list/List');

//POST CRIA UM NOVO REGISTRO
exports.createTask =  function(req,res){
    console.log("CREATE TASK");
    List.findById(req.body.listid, function (err, list) {
        if (err) 
            return res.status(500).send("Não foi possível encontrar esta lista.");

        if (list == null) 
            return res.status(404).send("Lista não encontrada.");

        if (list._creator != req.body.userid){
            return res.status(403).send("Usuário inválido.");
        }

        Task.create({
            _parent: list._id,
            description: req.body.description
        },function (err, task){
            if(err){
                console.log(err);
                return res.status(500).send("Houve um problema ao criar uma Tarefa.");
            }
            
            list.tasks.push(task);
            list.save();

            list.populate("tasks",function(err,l){
                res.json({
                    success: true,
                    list: l
                });
            });
        });

    });
}

exports.updateTask =  function(req,res){
    console.log("UPDATE TASK");
    var newTask = JSON.parse(req.body.task);
    Task.findByIdAndUpdate(req.params.taskid,newTask,{new: true}, function (err, task) {
        if (err) 
            return res.status(500).send("Não foi possível encontrar esta tarefa.");

        if (task == null) 
            return res.status(404).send("Tarefa não encontrada.");

        List.findById(task._parent,function(err, list){
        if (err) 
            return res.status(500).send("Não foi possível encontrar esta Lista.");

            list.populate("tasks",function(err,l){
                res.json({
                    success: true,
                    list: l
                });
            });
        });
    });
}

exports.deleteTask =  function(req,res){
    console.log("DELETE TASK");
    Task.findByIdAndRemove(req.params.taskid,function (err, task) {
        if (err) 
            return res.status(500).send("Não foi possível encontrar esta tarefa.");

        if (task == null) 
            return res.status(404).send("Tarefa não encontrada.");
        
        List.findById(task._parent,function(err, list){
            if (err) 
                return res.status(500).send("Não foi possível encontrar esta Lista.");

            list.populate("tasks",function(err,l){
                res.json({
                    success: true,
                    list: l
                });
            });
        });
    });
}

