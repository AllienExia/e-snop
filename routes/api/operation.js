var router = require('express').Router();
var operationService = require('../../services/operation.service');

router.get('/', function(req, res) {
  operationService.getAllOperation()
  .then(operations => {
    res.json(operations)
  })
  .catch(err => {
    res.sendStatus(400).json({error: err})
  })
});

router.post('/', function(req, res) {
  operationService.addOperation(req.body)
  .then(operation => {
    res.sendStatus(201)
    notificationService.addNotification(req, 'Ajout d\'une formation', 'add').then(question => {})
  })
  .catch(err => {
    res.status(400).json({error: err})
  })
});

router.patch('/', function(req, res) {
  operationService.updateOperation(req.body)
  .then(operation => {
    res.sendStatus(200)
    notificationService.addNotification(req, 'Modification d\'une formation', 'update').then(question => {})
  })
  .catch(err => {
    res.status(400).json({error: err})
  })
});

router.delete('/', function(req, res) {
  operationService.deleteOperation(req.query)
  .then(operation => {
    res.sendStatus(200)
    notificationService.addNotification(req, 'Suppression de ' + req.query.toDelete.length + ' formation(s)', 'delete').then(question => {})
  })
  .catch(err => {
    res.status(400).json({error: err})
  })
});

module.exports = router;