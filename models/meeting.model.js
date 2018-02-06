var mongoose = require('mongoose');

/**
 * Meeting schema
 */

MeetingSchema = new mongoose.Schema({
    forecast: [],
    achieve: [],
    stock: [],
    imported: {
        type: Boolean,
        default: false
    },
    ajustedCapa: {
        type: Boolean,
        default: false
    },
    prepared: {
        type: Boolean,
        default: false
    },
    meeting: {
        type: Boolean,
        default: false
    },
    next: {
        type: Boolean,
        default: true
    },
    date: {
        type: Date,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    },
    meetingData: [],
    hypothesis: [],
    actions: [],
    report: {}


},{ timestamps: true });

/**
 * Exports
 */
module.exports = mongoose.model('Meetings', MeetingSchema);