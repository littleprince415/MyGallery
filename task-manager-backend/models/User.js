const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: ''
    },
    birthdate: {
        type: Date
    },
    username:{
        type: String,
        unique: true
    },
    bio:{
        type: String,
    }
});

module.exports = mongoose.model('User', UserSchema);
