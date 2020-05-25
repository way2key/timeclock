const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  firstname: {type: String, required:true},
  lastname:  {type: String, required:true},
  hash: {type: String, required:false, unique:true, sparse: true},
  password: {type: String, required:false, sparse: true},
  type: {type: Number, required:true},
  data: {type: [String], required:false},
  performedTime:  {type: Number, required:false},
  weekId: {type: String, required:false, sparse: true},
  clockMachine: {type: String, required:false}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
