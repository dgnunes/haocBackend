// app.js
var express = require('express');
var app = express();
var db = require('./db');
var bodyParser = require('body-parser');

var Token = require('./token');
var UserController = require('./user/UserController');
var ListController = require('./list/ListController');
var TaskController = require('./task/TaskController');
 
app.use(bodyParser.urlencoded({ extended: true }));

//ROTAS DA API
app.post('/user', UserController.createUser);
app.post('/user/login', UserController.login);

app.post('/list', Token.verify,ListController.createList);
app.get ('/list/:listid', Token.verify,ListController.getList);
app.put ('/list/:listid', Token.verify,ListController.updateList);
app.delete ('/list/:listid', Token.verify,ListController.deleteList);

app.get ('/lists/:userid', Token.verify,ListController.getUserLists);

app.post('/task', Token.verify,TaskController.createTask);
app.put('/task/:taskid', Token.verify,TaskController.updateTask);
app.delete('/task/:taskid', Token.verify,TaskController.deleteTask);

module.exports = app;