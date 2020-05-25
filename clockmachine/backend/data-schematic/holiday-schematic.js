onst mongoose = require('mongoose');

const holidaySchema = mongoose.Schema({
  timeStart: {type: String, required:true},
  timeEnd: {type: String, required:true},
  authorizedPresence: {type: Boolean, required:true}
});

module.exports = mongoose.model('Holiday', holidaySchema);
