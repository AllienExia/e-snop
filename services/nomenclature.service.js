var Nomenclature = require('../models/nomenclature.model');

function getAllNomenclature() {
    return new Promise(function(resolve, reject) {
      Nomenclature.find({}).lean()
      .exec(function (err, nomenclatures) {
          if (err) reject(err);
          else resolve(nomenclatures);
      })
  }) 
}

function deleteNomenclature(params) {
  return new Promise(function(resolve, reject) {
    Nomenclature.deleteMany({ _id: params.toDelete })
    .exec(function (err, nomenclature) {
        if (err) reject(err);
        else resolve(nomenclature);
    })
}) 
}

////////////////////////////////////////////

var self = {
    getAllNomenclature: getAllNomenclature,
    deleteNomenclature: deleteNomenclature
};

module.exports = self;