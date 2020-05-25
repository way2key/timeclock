const mongoose = require('mongoose');

const weekSchema = mongoose.Schema({
  name: {type: String, required:true},
  monday:  {type: String, required:true},
  tuesday: {type: String, required:true},
  wednesday: {type: String, required:true},
  thursday: {type: String, required:true},
  friday: {type: String, required:true},
  saturday:  {type: String, required:false},
  sunday: {type: String, required:false},
});


module.exports = mongoose.model('Week', weekSchema);
