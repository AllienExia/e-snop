var Notification = require('../models/notification.model');

function getAllNotification() {
    return new Promise(function(resolve, reject) {
      Notification.find({}).populate('admin').sort({date:'-1'}).limit(20).lean()
      .exec(function (err, notifications) {
          if (err) reject(err);
          else resolve(notifications);
      })
  }) 
}

function addNotification(params, title, type) {
    return new Promise(function(resolve, reject) {
      new Notification({
          type: type,
          title: title,
          date: Date.now(),
          admin: params.decoded
      })
      .save(function (err, notification) {
          if (err) reject(err);
          else resolve(notification);
      })
  }) 
}

function updateNotification(params) {
    return new Promise(function(resolve, reject) {
        Notification.find({number: {$gte: params.number}, notification: params.notification})
        .exec(function (err, notifications) {
            if (err) reject(err);
            else {
                notifications.forEach(element => {
                    element._doc.number = element._doc.number + 1
                    Notification.where({ _id: element._doc._id }).update({ $set: { number: element._doc.number }})
                    .exec(function (err, notification) {
                        if (err) reject(err);
                        else resolve(notification);
                    })
                });
                resolve(notifications)
            }
        })
    })
  .then(notification => {
    return new Promise(function(resolve, reject) {
        Notification.where({ _id: params._id }).update({ $set: { number: params.number, title: params.title, answer1: params.answer1, answer2: params.answer2, answer3: params.answer3, answer4: params.answer4, comment: params.comment, right: params.right, notification: params.notification, chapter: params.chapter }})
        .exec(function (err, notification) {
            if (err) reject(err);
            else resolve(notification);
        })
    })
  })
}

function deleteNotification(params) {
    return new Promise(function(resolve, reject) {
      Notification.deleteMany({ _id: params.toDelete })
      .exec(function (err, notification) {
          if (err) reject(err);
          else resolve(notification);
      })
  }) 
}

function getAllChapterForNotification(params) {
    return new Promise(function(resolve, reject) {
        Notification.find({notification: params._id}).distinct('chapter')
        .exec(function (err, chapters) {
            if (err) reject(err);
            else resolve(chapters);
        })
  }) 
}

////////////////////////////////////////////

var self = {
    getAllNotification: getAllNotification,
    addNotification: addNotification,
    updateNotification: updateNotification,
    deleteNotification: deleteNotification,
    getAllChapterForNotification: getAllChapterForNotification
};

module.exports = self;