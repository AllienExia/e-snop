var router = require('express').Router();
var jwt    = require('jsonwebtoken');



router.use(function(req, res, next) {
  
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  var key = req.headers['dashcode'];
  // decode token
  if (key === '4ECRz1zRyKj7ACsUb5HzXiI4Cf8c6Uwc' || req.originalUrl == '/api/event') {
    next();
  } else if (token) {

    // verifies secret and checks exp
    jwt.verify(token, req.app.get('superSecret'), function(err, decoded) {      
      if (err) {
        // if (err = "jwt expired")
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});

/*router.use('/part', require('./part'));
router.use('/carac', require('./carac'));*/
router.use('/message', require('./message'));
router.use('/user', require('./user'));
router.use('/groupe', require('./group'));
router.use('/notification', require('./notification'));
router.use('/chapter', require('./chapter'));
router.use('/question', require('./question'));
router.use('/training', require('./training'));
router.use('/gamme', require('./gamme'));
router.use('/nomenclature', require('./nomenclature'));
router.use('/meeting', require('./meeting'));
router.use('/operation', require('./operation'));


module.exports = router;