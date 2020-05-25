const mongoose = require('mongoose');

const clockSchema = mongoose.Schema({
  dayId: {type: String, required:true},
  time: {type: String, required:true}
});


module.exports = mongoose.model('Clock', clockSchema);
