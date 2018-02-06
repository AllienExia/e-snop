var router = require('express').Router();
var userService = require('../../services/user.service');
var notificationService = require('../../services/notification.service');
var Param = require('../../models/param.model');

router.get('/', function(req, res) {
  userService.getAllUser()
  .then(users => {
    res.json(users)
  })
  .catch(err => {
    res.sendStatus(400).json({error: err})
  })
});

router.get('/:id', function(req, res) {
  userService.getOneUser(req.params.id)
  .then(user => {
    res.json(user)
  })
  .catch(err => {
    res.status(400).json({error: err})
  })
});

router.post('/', function(req, res) {
  userService.addUser(req.body)
  .then(user => {
    res.sendStatus(201)
    notificationService.addNotification(req, 'Ajout de l\'utilisateur ' + req.body.user.firstname + ' ' + req.body.user.lastname, 'add').then(question => {})
  })
  .catch(err => {
    res.status(400).json({error: err})
  })
});

router.post('/param', function(req, res) {
  Param.where({ _id: "5a6f463c0a7d601348b806b7" }).update({ $set: { lastMonth: req.body.lastMonth, nextMonth: req.body.nextMonth }})
  .exec(function (err, training) {
      if (err) res.status(400).json({error: err});
      else res.sendStatus(201);
  })
});

router.post('/addgroup', function(req, res) {
  userService.addGroupToUser(req.body)
  .then(user => {
    res.sendStatus(201)
    notificationService.addNotification(req, 'Ajout du groupe ' + req.body.groupAdd.name + ' à l\'utilisateur ' + req.body.user.firstname + ' ' + req.body.user.lastname, 'add').then(question => {})
  })
  .catch(err => {
    res.status(400).json({error: err})
  })
});

router.post('/answer', function(req, res) {
  userService.answerQuestion(req.body)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(err => {
    res.status(400).json({error: err})
  })
});

router.patch('/', function(req, res) {
  userService.updateUser(req.body)
  .then(user => {
    res.sendStatus(200)
    notificationService.addNotification(req, 'Modification d\'un utilisateur', 'update').then(question => {})
  })
  .catch(err => {
    res.status(400).json({error: err})
  })
});

router.delete('/', function(req, res) {
  userService.deleteUser(req.query)
  .then(user => {
    res.sendStatus(200)
    notificationService.addNotification(req, 'Suppression de ' + req.query.toDelete.length + ' utilisateur(s)', 'delete').then(question => {})
  })
  .catch(err => {
    res.status(400).json({error: err})
  })
});

module.exports = router;