var express = require('express');
var path = require('path');
var app = express();

var mong = require('mongoose');
mong.connect(process.env.MONGO_ONLINE);
var db = mong.connection;

db.once("open", function(){
  console.log("DB connected.");
});
db.on("error", function(err){
  console.log("DB ERROR :", err);
});


app.get('/', function (req, res){
  res.send('Hello World');
});

app.listen(3300, function(){
  console.log('Server On!');
});
