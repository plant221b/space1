var express = require('express');
var router = express.Router();

var Kitten = require('../models/kitty');
var bodyParser = require('body-parser');
router.use(bodyParser.json());

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});



//
router.get('/', function(req, res){
  res.send('hi');
});

// kitty birth
router.post('/kitty', function(req, res){

  var fluffy = new Kitten(req.body); // req.body contains json

  var msg = fluffy.speak();

  fluffy.save(function (err, fluffy) {
      if(err) return res.json({success: false, message: err});
      else res.send(msg);
  });

});

// find all
router.get('/kitties', function(req, res){

  Kitten.find({}, function (err, kittens) {
    if(err) return res.json({success: false, message: err});
    res.json(kittens);

  });

});

router.get('/kitty', function(req, res){
  Kitten.findOne({ name: req.body.name }, function(err,kitty){
    if(err) return res.json({success: false, message: err});
    res.json(kitty);

  });

});

// update
router.put('/kittyeat', function(req, res){
  var fluffy = new Kitten(req.body);
  Kitten.update({name:fluffy.name}, {$set:{ isHungry: false }}, function(err) {
    if(err) return res.json({success: false, message: err});
    res.send(fluffy.name + ' eated a whale ');
  });
});

router.put('/kittyplay', function(req, res){
  var fluffy = new Kitten(req.body);
  Kitten.update({name:fluffy.name}, {$set:{ isHungry: true }}, function(err) {
    if(err) return res.json({success: false, message: err});
    res.send(fluffy.name + ' played with a ball');
  });
});



// destroy
router.delete('/kitty', function(req, res){

  Kitten.findOneAndRemove({ name: req.body.name }, function(err,kitty){
    if(err) return res.json({success: false, message: err});
    res.send(req.body.name + ' is gone');
  });

});


module.exports = router;
