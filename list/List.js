// List.js
var mongoose = require('mongoose');  
var ListSchema = new mongoose.Schema({  
  _id: Number,
  _creator: { type: Number, ref: 'User' },
  name: String,
  tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
});

mongoose.model('List', UserSchema);

module.exports = mongoose.model('List');