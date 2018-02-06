var mongoose = require('mongoose');

/**
 * Nomenclature schema
 */

NomenclatureSchema = new mongoose.Schema({
    partNumber: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    make: {
        type: Boolean,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    family: {
        type: String,
        default: ''
    },
    familyPercentage: {
        type: Number,
        required: true
    },
    gammeItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gammes'
    }]
},{ timestamps: true });

/**
 * Exports
 */
module.exports = mongoose.model('Nomenclatures', NomenclatureSchema);