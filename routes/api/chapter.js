var router = require('express').Router();
var questionService = require('../../services/question.service');

router.get('/', function(req, res) {
  questionService.getAllChapterForTraining(req.query)
  .then(chapters => {
    res.json(chapters)
  })
  .catch(err => {
    res.sendStatus(400).json({error: err})
  })
});

module.exports = router;