const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

// Create the User Schema
const userSchema = new Schema({
    role: {
        type: String,
        enum: ['admin', 'mod', 'user'],
        default: 'user'
    }
});

userSchema.plugin(passportLocalMongoose);
// Use the bridge between mongoose and passport local
const user = mongoose.model('User', userSchema);

module.exports = user;
