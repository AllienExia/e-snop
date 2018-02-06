var Question = require('../models/question.model');

function getAllQuestion() {
    return new Promise(function(resolve, reject) {
      Question.find({}).sort({number: '1'}).populate('training').lean()
      .exec(function (err, questions) {
          if (err) reject(err);
          else resolve(questions);
      })
  }) 
}

function addQuestion(params) {
    return new Promise(function(resolve, reject) {
        Question.findOne({training: params.training}).sort({number: '-1'})
        .exec(function (err, question) {
            if (err) reject(err);
            else resolve(question);
        })
  })
  .then(question => {
    return new Promise(function(resolve, reject) {
        if(question !== null) {
            params.number = question._doc.number + 1
        } else {
            params.number = 1
        }
        new Question(params)
        .save(function (err, question) {
            if (err) reject(err);
            else resolve(question);
        })
    })
  })
}

function updateQuestion(params) {
    return new Promise(function(resolve, reject) {
        Question.find({number: {$gte: params.number}, training: params.training})
        .exec(function (err, questions) {
            if (err) reject(err);
            else {
                questions.forEach(element => {
                    element._doc.number = element._doc.number + 1
                    Question.where({ _id: element._doc._id }).update({ $set: { number: element._doc.number }})
                    .exec(function (err, question) {
                        if (err) reject(err);
                        else resolve(question);
                    })
                });
                resolve(questions)
            }
        })
    })
  .then(question => {
    return new Promise(function(resolve, reject) {
        Question.where({ _id: params._id }).update({ $set: { number: params.number, title: params.title, answer1: params.answer1, answer2: params.answer2, answer3: params.answer3, answer4: params.answer4, comment: params.comment, right: params.right, training: params.training, chapter: params.chapter }})
        .exec(function (err, question) {
            if (err) reject(err);
            else resolve(question);
        })
    })
  })
}

function deleteQuestion(params) {
    return new Promise(function(resolve, reject) {
      Question.deleteMany({ _id: params.toDelete })
      .exec(function (err, question) {
          if (err) reject(err);
          else resolve(question);
      })
  }) 
}

function getAllChapterForTraining(params) {
    return new Promise(function(resolve, reject) {
        Question.find({training: params._id}).distinct('chapter')
        .exec(function (err, chapters) {
            if (err) reject(err);
            else resolve(chapters);
        })
  }) 
}

////////////////////////////////////////////

var self = {
    getAllQuestion: getAllQuestion,
    addQuestion: addQuestion,
    updateQuestion: updateQuestion,
    deleteQuestion: deleteQuestion,
    getAllChapterForTraining: getAllChapterForTraining
};

module.exports = self;