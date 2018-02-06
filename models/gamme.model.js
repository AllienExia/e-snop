var mongoose = require('mongoose');

/**
 * Gamme schema
 */

GammeSchema = new mongoose.Schema({
    operation: {
        type: String,
        required: true
    },
    gamme: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
    index: {
        type: Number,
        required: true
    }
},{ timestamps: true });

/**
 * Exports
 */
module.exports = mongoose.model('Gammes', GammeSchema);