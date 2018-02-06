var Answer = require('../models/answer.model');

function getAllAnswer() {
    return new Promise(function(resolve, reject) {
      Answer.find({}).populate('training').lean()
      .exec(function (err, answers) {
          if (err) reject(err);
          else resolve(answers);
      })
  }) 
}

function answerQuestion(params) {
    return new Promise(function(resolve, reject) {
        Answer.findOne({training: params.training}).sort({number: '-1'})
        .exec(function (err, answer) {
            if (err) reject(err);
            else resolve(answer);
        })
  })
  .then(answer => {
    return new Promise(function(resolve, reject) {
        if(answer !== null) {
            params.number = answer._doc.number + 1
        } else {
            params.number = 1
        }
        new Answer(params)
        .save(function (err, answer) {
            if (err) reject(err);
            else resolve(answer);
        })
    })
  })
}

function addAnswer(params) {
    return new Promise(function(resolve, reject) {
        Answer.findOne({training: params.training}).sort({number: '-1'})
        .exec(function (err, answer) {
            if (err) reject(err);
            else resolve(answer);
        })
  })
  .then(answer => {
    return new Promise(function(resolve, reject) {
        if(answer !== null) {
            params.number = answer._doc.number + 1
        } else {
            params.number = 1
        }
        new Answer(params)
        .save(function (err, answer) {
            if (err) reject(err);
            else resolve(answer);
        })
    })
  })
}

function updateAnswer(params) {
    return new Promise(function(resolve, reject) {
        Answer.find({number: {$gte: params.number}, training: params.training})
        .exec(function (err, answers) {
            if (err) reject(err);
            else {
                answers.forEach(element => {
                    element._doc.number = element._doc.number + 1
                    Answer.where({ _id: element._doc._id }).update({ $set: { number: element._doc.number }})
                    .exec(function (err, answer) {
                        if (err) reject(err);
                        else resolve(answer);
                    })
                });
                resolve(answers)
            }
        })
    })
  .then(answer => {
    return new Promise(function(resolve, reject) {
        Answer.where({ _id: params._id }).update({ $set: { number: params.number, title: params.title, answer1: params.answer1, answer2: params.answer2, answer3: params.answer3, answer4: params.answer4, comment: params.comment, right: params.right, training: params.training, chapter: params.chapter }})
        .exec(function (err, answer) {
            if (err) reject(err);
            else resolve(answer);
        })
    })
  })
}

function deleteAnswer(params) {
    return new Promise(function(resolve, reject) {
      Answer.deleteMany({ _id: params.toDelete })
      .exec(function (err, answer) {
          if (err) reject(err);
          else resolve(answer);
      })
  }) 
}

function getAllChapterForTraining(params) {
    return new Promise(function(resolve, reject) {
        Answer.find({training: params._id}).distinct('chapter')
        .exec(function (err, chapters) {
            if (err) reject(err);
            else resolve(chapters);
        })
  }) 
}

////////////////////////////////////////////

var self = {
    getAllAnswer: getAllAnswer,
    addAnswer: addAnswer,
    updateAnswer: updateAnswer,
    deleteAnswer: deleteAnswer,
    getAllChapterForTraining: getAllChapterForTraining,
    answerQuestion: answerQuestion
};

module.exports = self;