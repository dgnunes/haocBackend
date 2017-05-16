// Task.js
var mongoose = require('mongoose');  
var ListSchema = new mongoose.Schema({  
  _creator: { type: Number, ref: 'List' },
  description: String
});

mongoose.model('Task', UserSchema);

module.exports = mongoose.model('Task');