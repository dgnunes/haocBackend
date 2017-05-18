// db.js
var mongoose = require('mongoose');
//mongoose.connect('mongodb://admin:admin@ds143191.mlab.com:43191/db_haocbackend');
var mongostr = 'mongodb://';

if (process.env.DB_AUTH != 'false'){
  mongostr += process.env.DB_USER + ':' + process.env.DB_PASS + '@';
}
mongostr += process.env.DB_HOST + ':' + process.env.DB_PORT +  '/' + process.env.DB_NAME;


console.log(mongostr);
mongoose.connect(mongostr);