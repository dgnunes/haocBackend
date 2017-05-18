// app.js
var express = require('express');
var app = express();
var db = require('./db');
var bodyParser = require('body-parser');

var UserController = require('./user/UserController');
var ListController = require('./list/ListController');
var TaskController = require('./task/TaskController');
 
app.use(bodyParser.urlencoded({ extended: true }));

//ROTAS DA API
app.post('/user', UserController.createUser);
app.post('/user/login', UserController.login);

app.post('/list', ListController.createList);
app.get ('/list/:listid', ListController.getList);
app.put ('/list/:listid', ListController.updateList);
app.delete ('/list/:listid', ListController.deleteList);

app.get ('/lists/:userid', ListController.getUserLists);

app.post('/task', TaskController.createTask);
app.put('/task/:taskid', TaskController.updateTask);
app.delete('/task/:taskid', TaskController.deleteTask);


module.exports = app;