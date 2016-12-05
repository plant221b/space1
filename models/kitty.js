var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var kittySchema = mongoose.Schema({
    name: {
      type: String,
      unique: true,
      required: true
    },
    isHungry: {
      type: Boolean,
      default: true
    }
});

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.speak = function () {
  var greeting = this.name? "Meow name is " + this.name: "I don't have a name";
  return greeting;
};

var Kitten = mongoose.model('Kitten', kittySchema);
module.exports = Kitten;
