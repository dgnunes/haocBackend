// Task.js
var mongoose = require('mongoose');  

var TaskSchema = new mongoose.Schema({  
  _parent: {type:mongoose.Schema.Types.ObjectId,
    ref: 'List' 
  },
  description: String,
  Created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'ongoing', 'completed']
    }],
    default: ['pending']
  }
});

mongoose.model('Task', TaskSchema);

module.exports = mongoose.model('Task');