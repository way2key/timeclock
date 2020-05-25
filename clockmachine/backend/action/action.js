const statusService = require('./status-service.js');
const dayService = require('./day-service.js');
const clockService = require('./clock-service.js');
const performedTimeService = require('./performedTime-service.js');
const studentService = require('./student-service.js');
const tokenService = require('./token-service.js');
const incidentService = require('./incident-service.js');
const presenceService = require('./presence-service.js');
const dayTimeService = require('./dayTime-service.js');
const clockMachineService = require("./clock-machine-service.js");
const authService = require("./auth-service");
const soundService = require("./sound-service");

const action = {
  createDay: dayService.createDay,
  createDayForEachUser: dayService.createDayForEachUser,
  getStudentCurrentDay: dayService.getStudentCurrentDay,
  getStudentSpecificDayId: dayService.getStudentSpecificDayId,
  isTodayDayExistingForStudent: dayService.isTodayDayExistingForStudent,

  getTeacherFromToken: tokenService.getTeacherFromToken,

  checkClockStatus: statusService.checkClockStatus,
  checkStudentStatus: statusService.checkStudentStatus,

  clockAStudent: clockService.clockAStudent,
  getStudentClockFromHash: clockService.getStudentClockFromHash,
  getStudentClockFromDayId: clockService.getStudentClockFromDayId,

  checkStudentPresence: presenceService.checkStudentPresence,

  getStudentFromHash: studentService.getStudentFromHash,
  getStudentMeal: studentService.getStudentMeal,
  updateStudentWeek: studentService.updateStudentWeek,
  getStudentBreather: studentService.getStudentBreather,
  updateStudentHash: studentService.updateStudentHash,
  deleteStudent: studentService.deleteStudent,

  updatePerformedTime: performedTimeService.updatePerformedTime,
  modifyPerformedTime: performedTimeService.modifyPerformedTime,

  controlDailyIncident: incidentService.controlDailyIncident,
  controlWeeklyIncident: incidentService.controlWeeklyIncident,
  checkIncident: incidentService.checkIncident,
  quotaTimeIncident: incidentService.quotaTimeIncident,
  getTreatedIncident: incidentService.getTreatedIncident,
  getUntreatedIncident: incidentService.getUntreatedIncident,
  hastyDepartureIncident: incidentService.hastyDepartureIncident,
  clockOversightIncident: incidentService.clockOversightIncident,
  latenessArrivalIncident: incidentService.latenessArrivalIncident,
  unallowedPresenceIncident: incidentService.unallowedPresenceIncident,
  dailyTimeNotCompletedIncident: incidentService.dailyTimeNotCompletedIncident,

  getStudentDayTimeFromDayId: dayTimeService.getStudentDayTimeFromDayId,
  getStudentDayTimeFromStudentHash: dayTimeService.getStudentDayTimeFromStudentHash,

  createClockMachine: clockMachineService.createClockMachine,
  getClockMachine: clockMachineService.getClockMachine,
  updateClockMachineSound: clockMachineService.updateClockMachineSound,
  updateClockMachineVolume: clockMachineService.updateClockMachineVolume,
  updateClockMachineDefaultWeek: clockMachineService.updateClockMachineDefaultWeek,
  updateClockMachineNotification: clockMachineService.updateClockMachineNotification,
  deleteLog: clockMachineService.deleteLog,
  deleteIncident: clockMachineService.deleteIncident,

  isAuthenticatedOnServer: authService.isAuthenticatedOnServer,
  getSound: soundService.getSound,
}


performedTimeService.updatePerformedTime();
module.exports = action;
