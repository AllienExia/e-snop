var router = require('express').Router();
var userService = require('../../services/user.service');
var notificationService = require('../../services/notification.service');

router.get('/', function(req, res) {
  userService.getAllUser()
  .then(users => {
    res.json(users)
  })
  .catch(err => {
    res.sendStatus(400).json({error: err})
  })
});

router.post('/', function(req, res) {
  userService.addUser(req.body)
  .then(user => {
    res.sendStatus(201)
    notificationService.addNotification(req, 'Ajout d\'un utilisateur', 'add').then(question => {})
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