var express = require('express');
var router = express.Router();
var Kitten = require('../models/kitty');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

  //
router.get('/', function(req, res){
    res.send('hi');
});

// i will change this to 'post' later ^^
router.get('/kitty', function(req, res){

  var fluffy = new Kitten({ name: 'hehe' });
  fluffy.save(function (err, fluffy) {
    if (err) return console.error(err);
    fluffy.speak();
  });
  res.end();

});

// create profile
router.get('/kitties', function(req, res){

  Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
  });
  res.end();
});

module.exports = router;

/*module.exports = function(req, res)
{
  var Kitten = require('./models/kitty');
  var app = req.app;

  //
  app.get('/', function(req, res){
      res.send('hi');
  });

  // i will change this to 'post' later ^^
  app.post('/kitty', function(req, res){

    var fluffy = new Kitten({ name: req.name });
    fluffy.save(function (err, fluffy) {
      if (err) return console.error(err);
      fluffy.speak();
    });
    res.end();

  });

  // create profile
  app.get('/kitties', function(req, res){

    Kitten.find(function (err, kittens) {
      if (err) return console.error(err);
      console.log(kittens);
    });
    res.end();
  });


};*/
