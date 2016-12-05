
var express = require('express');
var app = express();
var path = require('path');

/* db */
var dburl = process.env.MONGO_ONLINE; // db url
var mongoose = require('mongoose');
mongoose.connect(dburl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!col
  console.log('db connected!');
});


/* db */


// router

var router = require('./routes/kit');
app.use('/', router);

// server
var server = app.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('express server %s:%s ', host, port);
  console.log(new Date().toLocaleString());
});
