// =======================
// =       Import        =
// =======================
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var config      = require('./config.json')[app.get('env')];
var routes      = require('./routes');



// =======================
// =    Configuration    =
// =======================

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('superSecret', config.secret); // secret variable


// =======================
// =      MongoInit      =
// =======================
mongoose.Promise = global.Promise;
mongoose.connect(config.database, {
  useMongoClient: true
});




// =======================
// =       Routes        =
// =======================
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, dashcode, enctype");

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  }
  else {
    next();
  }
});

app.use('/', routes);

app.use(function(req, res, next){
  res.sendStatus(403);
});

// =======================
// =  Start the server   =
// =======================
app.listen(config.port, function(){
    console.log('The server is listenning on port ' + config.port)
});