const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const clockMachineSchema = mongoose.Schema({
  title: {type: String, required:true},
  volume: {type: Number, required:true, default:60},
  insufficientWeekTimeQuotaNotification: {type: Boolean, required:false, default:true},
  insufficientDayTimeQuotaNotification: {type: Boolean, required:false, default:true},
  clockingOversightNotification: {type: Boolean, required:false, default:true},
  lateArrivalNotification: {type: Boolean, required:false, default:true},
  earlyDepartureNotification: {type: Boolean, required:false, default:true},
  unallowedPresenceNotification: {type: Boolean, required:false, default:true},
  defaultWeek: {type: String, required:false},
  sound: {type: Object, required:false, default:{clockIn:"in_PauseMenu_Open.wav",clockOff:"out_PauseMenu_Close.wav",info:"info_connection_lost.wav",error:"in_Fanfare_Item_Small.wav"}},
});

clockMachineSchema.plugin(uniqueValidator);

module.exports = mongoose.model('ClockMachine', clockMachineSchema);
