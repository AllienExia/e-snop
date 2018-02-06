var mongoose = require('mongoose');

/**
 * Notification schema
 */

NotificationSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admins'
    }
},{ timestamps: true });

/**
 * Exports
 */
module.exports = mongoose.model('Notifications', NotificationSchema);