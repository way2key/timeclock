const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const clockMachineSchema = mongoose.Schema({
  title: {type: String, required:true},
  volume: {type: Number, required:true},
  insufficientWeekTimeQuotaNotification: {type: Boolean, required:false, default:true},
  insufficientDayTimeQuotaNotification: {type: Boolean, required:false, default:true},
  clockingOversightNotification: {type: Boolean, required:false, default:true},
  lateArrivalNotification: {type: Boolean, required:false, default:true},
  earlyDepartureNotification: {type: Boolean, required:false, default:true},
  unallowedPresenceNotification: {type: Boolean, required:false, default:true},
});

clockMachineSchema.plugin(uniqueValidator);

module.exports = mongoose.model('ClockMachine', clockMachineSchema);
