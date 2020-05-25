const mongoose = require('mongoose');

const daySchema = mongoose.Schema({
  date: {type: String, required:true},
  present: {type: Boolean, required:true}
});

module.exports = mongoose.model('Day', daySchema);
