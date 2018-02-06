var Gamme = require('../models/gamme.model');

function getAllOperation() {
    return new Promise(function(resolve, reject) {
      Gamme.find({}).distinct('operation').lean()
      .exec(function (err, operations) {
          if (err) reject(err);
          else resolve(operations);
      })
  }) 
}

function addOperation(params) {
    return new Promise(function(resolve, reject) {
      new Operation(params)
      .save(function (err, operation) {
          if (err) reject(err);
          else resolve(operation);
      })
  }) 
}

function updateOperation(params) {
    return new Promise(function(resolve, reject) {
      Operation.where({ _id: params._id }).update({ $set: { name: params.name }})
      .exec(function (err, operation) {
          if (err) reject(err);
          else resolve(operation);
      })
  }) 
}

function deleteOperation(params) {
    return new Promise(function(resolve, reject) {
      Operation.deleteMany({ _id: params.toDelete })
      .exec(function (err, operation) {
          if (err) reject(err);
          else resolve(operation);
      })
  }) 
}


////////////////////////////////////////////

var self = {
    getAllOperation: getAllOperation,
    addOperation: addOperation,
    updateOperation: updateOperation,
    deleteOperation: deleteOperation
};

module.exports = self;