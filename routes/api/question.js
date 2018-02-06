var router = require('express').Router();
var questionService = require('../../services/question.service');
var notificationService = require('../../services/notification.service');
var fileUpload  = require('express-fileupload');
var excel2Json = require('node-excel-to-json');
var Question = require('../../models/question.model');

router.use(fileUpload());

router.get('/', function(req, res) {
  questionService.getAllQuestion()
  .then(questions => {
    res.json(questions)
  })
  .catch(err => {
    res.sendStatus(400).json({error: err})
  })
});

router.post('/', function(req, res) {
  questionService.addQuestion(req.body)
  .then(question => {
    res.sendStatus(201)
    notificationService.addNotification(req, 'Ajout d\'une question', 'add').then(question => {})
  })
  .catch(err => {
    res.status(400).json({error: err})
  })
});

router.post('/xls', function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(__dirname + '/data.xlsx', function(err) {
    if (err)
      return res.status(500).send(err);
 
      excel2Json(__dirname + '/data.xlsx', function(err, output) {
        console.log(output)
        output.Feuil1.forEach(element => {
          new Question(element)
          .save()
          .then(function (err) {
              console.log('ok')
          })
        });
        return res.sendStatus(200);
       });
  });
});

router.patch('/', function(req, res) {
  questionService.updateQuestion(req.body)
  .then(question => {
    res.sendStatus(200)
    notificationService.addNotification(req, 'Modification d\'une question', 'update').then(question => {})
  })
  .catch(err => {
    res.status(400).json({error: err})
  })
});

router.delete('/', function(req, res) {
  questionService.deleteQuestion(req.query)
  .then(question => {
    res.sendStatus(200)
    notificationService.addNotification(req, 'Suppression de ' + req.query.toDelete.length + ' question(s)', 'delete').then(question => {})
  })
  .catch(err => {
    res.status(400).json({error: err})
  })
});

module.exports = router;