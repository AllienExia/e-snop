var mongoose = require('mongoose');

/**
 * Group schema
 */

GroupSchema = new mongoose.Schema({
    training: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trainings'
    },
    name: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }],
    questions: [{}]
},{ timestamps: true });

/**
 * Exports
 */
module.exports = mongoose.model('Groups', GroupSchema);