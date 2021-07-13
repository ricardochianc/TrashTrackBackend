const {Schema, model } = require('mongoose');

const userSchema = new Schema({
    FirstName: String,
    LastName: String,
    Email: {
        type: String,
        unique: true
    },
    Address: String,
    CreationDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = model('User', userSchema);