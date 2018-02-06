var mongoose = require('mongoose');

/**
 * Question schema
 */

QuestionSchema = new mongoose.Schema({
    training: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Trainings'
    },
    chapter: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    comment: {
        type: String
    },
    answer1: {
        type: String,
        required: true
    },
    answer2: {
        type: String,
        required: true
    },
    answer3: {
        type: String,
        required: true
    },
    answer4: {
        type: String,
        required: true
    },
    right: {
        type: Number,
        required: true
    }
},{ timestamps: true });

/**
 * Exports
 */
module.exports = mongoose.model('Questions', QuestionSchema);