const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const holidaySchema = mongoose.Schema({
  title: {type: String, required:true},
  startDate: {type: String, required:true},
  endDate: {type: String, required:true},
  allowPresence: {type: Boolean, required:true, default:true},
});

holidaySchema.plugin(uniqueValidator);

module.exports = mongoose.model('Holiday', holidaySchema);
