const mongoose = require('mongoose');

const incidentSchema = mongoose.Schema({
  date: {type: String, required:true},
  studentId:  {type: String, required:true},
  type: {type: String, required:true},
  treated: {type: Boolean, default:false},
});

module.exports = mongoose.model('Incident', incidentSchema);
