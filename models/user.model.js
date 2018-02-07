var mongoose = require('mongoose');

/**
 * User schema
 */

userSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    fonction: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    param: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Params'
    }
},{ timestamps: true });

/**
 * Exports
 */
module.exports = mongoose.model('Users', userSchema);