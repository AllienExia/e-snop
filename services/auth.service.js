var Admin = require('../models/admin.model');
var Param = require('../models/param.model');
var User = require('../models/user.model');

var jwt = require('jsonwebtoken');

function createToken(user, secret) {
  return jwt.sign(user, secret, {
    expiresIn : 60*60*24
  });
}
function checkAdmin(params) {
    return new Promise(function(resolve, reject) {
      Admin.findOne({"login": params.login, "password": params.password}).populate('param').lean()
      .exec(function (err, admin) {
          if (err) reject(err);
          else resolve(admin);
      })
  }) 
}
function checkClient(params) {
    return new Promise(function(resolve, reject) {
        User.findOne({"login": params.login, "password": params.password}).populate('groups.group').populate('groups.training').lean()
      .exec(function (err, user) {
          if (err) reject(err);
          else {
              if(user){
                user.currentGroup = null
                user.groups.forEach(element => {
                    if(element.group.start < Date.now() && element.group.end > Date.now()) {
                        user.currentGroup = element
                    }
                })
              }
              resolve(user);
          }
      })
  }) 
}
////////////////////////////////////////////

var self = {
    createToken: createToken,
    checkAdmin: checkAdmin,
    checkClient: checkClient
};

module.exports = self;