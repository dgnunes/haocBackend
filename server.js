// server.js
require('autoenv');

var app = require('./app');
var port = process.env.PORT || 3000;

var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});

module.exports = server;
server.timeout = 10000;
