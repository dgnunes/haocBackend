// app.js
var express = require('express');
var app = express();

var db = require('./db');
var Xss = require('./xss-protection');

var bodyParser = require('body-parser');

var Token = require('./token');
var UserController = require('./user/UserController');
var ListController = require('./list/ListController');
var TaskController = require('./task/TaskController');

app.use(bodyParser.urlencoded({ extended: true }));

//ROTAS DA API
app.post('/user', Xss.filter, UserController.createUser);
app.post('/user/login', Xss.filter,UserController.login);

app.post('/list', Xss.filter,Token.verify,ListController.createList);
app.get ('/list/:listid', Xss.filter,Token.verify,ListController.getList);
app.put ('/list/:listid', Xss.filter,Token.verify,ListController.updateList);
app.delete ('/list/:listid', Xss.filter,Token.verify,ListController.deleteList);

app.get ('/lists/:userid', Xss.filter,Token.verify,ListController.getUserLists);

app.post('/task', Xss.filter,Token.verify,TaskController.createTask);
app.put('/task/:taskid', Xss.filter,Token.verify,TaskController.updateTask);
app.delete('/task/:taskid', Xss.filter,Token.verify,TaskController.deleteTask);

module.exports = app;
