// List.js
var mongoose = require('mongoose');  
// var autoIncrement = require('mongoose-auto-increment');

var ListSchema = new mongoose.Schema({  
  _creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  //tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
});

mongoose.model('List', ListSchema);

module.exports = mongoose.model('List');