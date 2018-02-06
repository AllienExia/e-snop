var Training = require('../models/training.model');

function getAllTraining() {
    return new Promise(function(resolve, reject) {
      Training.find({}).lean()
      .exec(function (err, trainings) {
          if (err) reject(err);
          else resolve(trainings);
      })
  }) 
}

function addTraining(params) {
    return new Promise(function(resolve, reject) {
      new Training(params)
      .save(function (err, training) {
          if (err) reject(err);
          else resolve(training);
      })
  }) 
}

function updateTraining(params) {
    return new Promise(function(resolve, reject) {
      Training.where({ _id: params._id }).update({ $set: { name: params.name }})
      .exec(function (err, training) {
          if (err) reject(err);
          else resolve(training);
      })
  }) 
}

function deleteTraining(params) {
    return new Promise(function(resolve, reject) {
      Training.deleteMany({ _id: params.toDelete })
      .exec(function (err, training) {
          if (err) reject(err);
          else resolve(training);
      })
  }) 
}


////////////////////////////////////////////

var self = {
    getAllTraining: getAllTraining,
    addTraining: addTraining,
    updateTraining: updateTraining,
    deleteTraining: deleteTraining
};

module.exports = self;