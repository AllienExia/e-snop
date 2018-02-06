var router = require('express').Router();
var notificationService = require('../../services/notification.service');
var notificationService = require('../../services/notification.service');
var fileUpload  = require('express-fileupload');
var excel2Json = require('node-excel-to-json');
var Notification = require('../../models/notification.model');

router.use(fileUpload());

router.get('/', function(req, res) {
  notificationService.getAllNotification()
  .then(notifications => {
    res.json(notifications)
  })
  .catch(err => {
    res.sendStatus(400).json({error: err})
  })
});


module.exports = router;