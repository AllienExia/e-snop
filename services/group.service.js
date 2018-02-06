var Group = require('../models/group.model');
var User = require('../models/user.model');
var Question = require('../models/question.model');

function getAllGroup() {
    return new Promise(function(resolve, reject) {
      Group.find({}).populate('training').populate('users').lean()
      .exec(function (err, groups) {
          if (err) reject(err);
          else resolve(groups);
      })
  }) 
}


function parseDate(str) {
    var mdy = str.split('-');
    return new Date(mdy[0], mdy[1]-1, mdy[2]);
}

function daydiff(first, second) {
    return Math.round((second-first)/(1000*60*60*24));
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}
function addDays(startDate,numberOfDays)
{
    var returnDate = new Date(
    startDate.getFullYear(),
    startDate.getMonth(),
    startDate.getDate()+numberOfDays,
    startDate.getHours(),
    startDate.getMinutes(),
    startDate.getSeconds());
    return returnDate;
}

function addGroup(params) {
    var number = daydiff(parseDate(params.start), parseDate(params.end)) + 1
    return new Promise(function(resolve, reject) {
        Question.find({training: params.training}).sort({number: '1'}).limit(number).populate('training').lean()
        .exec(function (err, questions) {
            if (err) reject(err);
            else resolve(questions);
        })
  })
  .then(questions => {
    var dateStart = parseDate(params.start)
    return new Promise(function(resolve, reject) {
        params.questions = []
        var tempQuestion = questions.slice(0)
        var count = 1
        tempQuestion.forEach(element => {
            params.questions.unshift({
                "training" : element.training,
                "chapter" : element.chapter,
                "number" : count,
                "title" : element.title,
                "comment" : element.comment,
                "answer1" : element.answer1,
                "answer2" : element.answer2,
                "answer3" : element.answer3,
                "answer4" : element.answer4,
                "right" : element.right,
                "date": addDays(dateStart, count-1),
                "answered" : false,
                "good": 0
            })
            count++
        });
        tempQuestion = null
        tempQuestion = questions.slice(0)
        if (params.questions.length < number) {
            shuffle(tempQuestion)  
            tempQuestion.forEach(element => {
                if (params.questions.length < number) {
                    params.questions.unshift({
                        "training" : element.training,
                        "chapter" : element.chapter,
                        "number" : count,
                        "title" : element.title,
                        "comment" : element.comment,
                        "answer1" : element.answer1,
                        "answer2" : element.answer2,
                        "answer3" : element.answer3,
                        "answer4" : element.answer4,
                        "right" : element.right,
                        "date": addDays(dateStart, count),
                        "answered" : false,
                        "good": 0
                    })
                }
                count++
            });
        } 
        tempQuestion = null
        tempQuestion = questions.slice(0)
        if (params.questions.length < number) {
            shuffle(tempQuestion)  
            tempQuestion.forEach(element => {
                if (params.questions.length < number) {
                    params.questions.unshift({
                        "training" : element.training,
                        "chapter" : element.chapter,
                        "number" : count,
                        "title" : element.title,
                        "comment" : element.comment,
                        "answer1" : element.answer1,
                        "answer2" : element.answer2,
                        "answer3" : element.answer3,
                        "answer4" : element.answer4,
                        "right" : element.right,
                        "date": addDays(dateStart, count),
                        "answered" : false,
                        "good": 0
                    })
                }
                count++
            });
        }
        new Group(params)
        .save(function (err, group) {
            if (err) reject(err);
            else resolve(group);
        })
    })
  })
}

function updateGroup(params) {
    return new Promise(function(resolve, reject) {
        Group.find({number: {$gte: params.number}, training: params.training})
        .exec(function (err, groups) {
            if (err) reject(err);
            else {
                groups.forEach(element => {
                    element._doc.number = element._doc.number + 1
                    Group.where({ _id: element._doc._id }).update({ $set: { number: element._doc.number }})
                    .exec(function (err, group) {
                        if (err) reject(err);
                        else resolve(group);
                    })
                });
                resolve(groups)
            }
        })
    })
  .then(group => {
    return new Promise(function(resolve, reject) {
        Group.where({ _id: params._id }).update({ $set: { number: params.number, title: params.title, answer1: params.answer1, answer2: params.answer2, answer3: params.answer3, answer4: params.answer4, comment: params.comment, right: params.right, training: params.training, chapter: params.chapter }})
        .exec(function (err, group) {
            if (err) reject(err);
            else resolve(group);
        })
    })
  })
}

function deleteGroup(params) {
    return new Promise(function(resolve, reject) {
        Group.find({_id: params.toDelete}).lean()
        .exec(function (err, groups) {
            if (err) reject(err);
            else {
                groups.forEach(groupElement => {
                        User.find({_id: groupElement.users})
                        .exec(function (err, usersToModify) {
                            if (err) reject(err);
                            else {
                                usersToModify.forEach(user => {
                                    for(var i = 0 ; i < user._doc.groups.length; i++) {
                                        console.log(user._doc.groups[i]._doc._id.toString())
                                        console.log(groupElement._id.toString())
                                        if (user._doc.groups[i]._doc.group.toString() === groupElement._id.toString()) {
                                            user._doc.groups.splice(i, 1)
                                        }
                                    }
                                    User.where({ _id: user._doc._id }).update({ $set: { groups: user._doc.groups }})
                                    .exec(function (err, updateGroup) {
                                        if (err) reject(err);
                                    })
                                })
                            }
                    });
                });
            };
            resolve(null);
        })

  }) 
  .then(group => {
    return new Promise(function(resolve, reject) {
        Group.deleteMany({ _id: params.toDelete })
        .exec(function (err, user) {
            if (err) reject(err);
            else resolve(user);
        })
    })
  })
}

function deleteUserFromGroup(params) {
    return new Promise(function(resolve, reject) {
        User.findOne({_id: params.toDelete}).lean()
        .exec(function (err, user) {
            if (err) reject(err);
            else {
                for(var i = 0 ; i < user.groups.length; i++) {
                    if (user.groups[i].group.toString() === params.group.toString()) {
                        user.groups.splice(i, 1)
                    }
                }
                User.where({ _id: user._id }).update({ $set: { groups: user.groups }})
                .exec(function (err, updatedUser) {
                    if (err) reject(err);
                    else resolve(user);
                })
            };
        })

    }) 
    .then(user => {
        return new Promise(function(resolve, reject) {
            Group.findOne({_id: params.group}).lean()
            .exec(function (err, group) {
                if (err) reject(err);
                else {
                    for(var i = 0 ; i < group.users.length; i++) {
                        if (group.users[i].toString() === params.toDelete.toString()) {
                            group.users.splice(i, 1)
                        }
                    }
                    Group.where({ _id: params.group }).update({ $set: { users: group.users }})
                    .exec(function (err, updatedGroup) {
                        if (err) reject(err);
                        else resolve({user : user, group: group});
                    })
                };
            })
    
        }) 
    })
}

function getAllChapterForTraining(params) {
    return new Promise(function(resolve, reject) {
        Group.find({training: params._id}).distinct('chapter')
        .exec(function (err, chapters) {
            if (err) reject(err);
            else resolve(chapters);
        })
  }) 
}

////////////////////////////////////////////

var self = {
    getAllGroup: getAllGroup,
    addGroup: addGroup,
    updateGroup: updateGroup,
    deleteGroup: deleteGroup,
    getAllChapterForTraining: getAllChapterForTraining,
    deleteUserFromGroup: deleteUserFromGroup
};

module.exports = self;
