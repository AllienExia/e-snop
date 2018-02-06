var mongoose = require('mongoose');

/**
 * Param schema
 */

ParamSchema = new mongoose.Schema({
    first: {
        type: Boolean,
        required: true,
        default: true
    },
    lastMonth: {
        type: Number,
        required: true,
        default: 6
    },
    nextMonth: {
        type: Number,
        required: true,
        default: 12
    },
    Logo: {
        type: String,
        required: true,
        default: '/static/img/logo-placeholder'
    },
    companyName: {
        type: String,
        required: true,
        default: 'Nom'
    }
},{ timestamps: true });

/**
 * Exports
 */
module.exports = mongoose.model('Params', ParamSchema);