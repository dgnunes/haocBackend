// db.js
var mongoose = require('mongoose');
//mongoose.connect('mongodb://admin:admin@ds143191.mlab.com:43191/db_haocbackend');
var mongostr = 'mongodb://';

if (process.env.DB_AUTH != 'false'){
  mongostr += process.env.DB_USER + ':' + process.env.DB_PASS + '@';
}
mongostr += process.env.DB_HOST + ':' + process.env.DB_PORT +  '/' + process.env.DB_NAME;


console.log(mongostr);

var connectWithRetry = function() {
  var retry = 0;
  return mongoose.connect(mongostr, function(err) {
    if (err && (retry < 10)) {
      console.error('Failed to connect to mongo on startup - retrying in 5 sec', err);
      retry += 1;
      setTimeout(connectWithRetry, 5000);
    }
  });
};
connectWithRetry();



//mongoose.connect(mongostr);
