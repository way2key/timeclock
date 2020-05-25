const mongoose = require('mongoose');

const logSchema = mongoose.Schema({
  date: {type: String, required:true},
  teacher:  {type: String, required:true},
  message: {type: String, required:false},
  studentId: {type: String, required:true},
  operation: {type: String, required:true},
});

module.exports = mongoose.model('Log', logSchema);
