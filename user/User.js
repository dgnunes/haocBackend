// User.js
var mongoose = require('mongoose');
// var autoIncrement = require('mongoose-auto-increment');

var UserSchema = new mongoose.Schema({  
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    }
});

// UserSchema.plugin(autoIncrement.plugin, {
//     model: 'User',
//     field: '_id'
// });

mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');