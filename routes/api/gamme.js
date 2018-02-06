var router = require('express').Router();
var gammeService = require('../../services/gamme.service');
var Gamme = require('../../models/gamme.model');
var fileUpload  = require('express-fileupload');
var excel2Json = require('node-excel-to-json');

router.use(fileUpload());


router.get('/', function(req, res) {
  gammeService.getAllGamme()
  .then(gammes => {
    res.json(gammes)
  })
  .catch(err => {
    res.sendStatus(400).json({error: err})
  })
});

router.delete('/', function(req, res) {
  gammeService.deleteGamme(req.query)
  .then(training => {
    res.sendStatus(200)
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
          new Gamme(element)
          .save()
          .then(function (err) {
              console.log('ok')
          })
        });
        return res.sendStatus(200);
       });
  });
});

module.exports = router;