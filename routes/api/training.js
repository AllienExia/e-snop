var router = require('express').Router();
var trainingService = require('../../services/training.service');
var notificationService = require('../../services/notification.service');

router.get('/', function(req, res) {
  trainingService.getAllTraining()
  .then(trainings => {
    res.json(trainings)
  })
  .catch(err => {
    res.sendStatus(400).json({error: err})
  })
});

router.post('/', function(req, res) {
  trainingService.addTraining(req.body)
  .then(training => {
    res.sendStatus(201)
    notificationService.addNotification(req, 'Ajout d\'une formation', 'add').then(question => {})
  })
  .catch(err => {
    res.status(400).json({error: err})
  })
});

router.patch('/', function(req, res) {
  trainingService.updateTraining(req.body)
  .then(training => {
    res.sendStatus(200)
    notificationService.addNotification(req, 'Modification d\'une formation', 'update').then(question => {})
  })
  .catch(err => {
    res.status(400).json({error: err})
  })
});

router.delete('/', function(req, res) {
  trainingService.deleteTraining(req.query)
  .then(training => {
    res.sendStatus(200)
    notificationService.addNotification(req, 'Suppression de ' + req.query.toDelete.length + ' formation(s)', 'delete').then(question => {})
  })
  .catch(err => {
    res.status(400).json({error: err})
  })
});

module.exports = router;