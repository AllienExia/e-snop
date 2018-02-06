var Gamme = require('../models/gamme.model');

function getAllGamme() {
    return new Promise(function(resolve, reject) {
      Gamme.find({}).lean()
      .exec(function (err, gammes) {
          if (err) reject(err);
          else resolve(gammes);
      })
  }) 
}

function deleteGamme(params) {
  return new Promise(function(resolve, reject) {
    Gamme.deleteMany({ _id: params.toDelete })
    .exec(function (err, gamme) {
        if (err) reject(err);
        else resolve(gamme);
    })
}) 
}

////////////////////////////////////////////

var self = {
    getAllGamme: getAllGamme,
    deleteGamme: deleteGamme
};

module.exports = self;