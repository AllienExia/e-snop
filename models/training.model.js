var mongoose = require('mongoose');

/**
 * Training schema
 */

TrainingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
},{ timestamps: true });

/**
 * Exports
 */
module.exports = mongoose.model('Trainings', TrainingSchema);