const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const timeplanSchema = mongoose.Schema({
  startOfDay: {type: String, required:true, default:"06:00:00"},
  endOfDay: {type: String, required:true, default:"22:00:00"},
  requiredTime: {type: Number, required:true},
  shift: {type: [Object], required:true},
  name: {type: String, required:true}
});

timeplanSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Timeplan', timeplanSchema);
