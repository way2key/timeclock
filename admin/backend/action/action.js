const tokenService = require('./token-service');
const holidayService = require('./holiday-service');
const timeplanService = require('./timeplan-service');
const userService = require('./user-service');
const weekService = require('./week-service');

const action = {
  getAdminFromToken: tokenService.getAdminFromToken,

  createHoliday: holidayService.createHoliday,
  getHoliday: holidayService.getHoliday,
  deleteHoliday: holidayService.deleteHoliday,

  createTimeplan: timeplanService.createTimeplan,
  getTimeplan: timeplanService.getTimeplan,
  getATimeplan: timeplanService.getATimeplan,
  deleteTimeplan: timeplanService.deleteTimeplan,

  createAStudent: userService.createAStudent,
  createATeacher: userService.createATeacher,
  getUserFromToken: userService.getUserFromToken,
  getAllStudents: userService.getAllStudents,
  getAllTeachers: userService.getAllTeachers,
  allotStudent: userService.allotStudent,
  deleteUser: userService.deleteUser,

  createWeek: weekService.createWeek,
  getAWeek: weekService.getAWeek,
  getAllWeeks: weekService.getAllWeeks,
  deleteWeek: weekService.deleteWeek,

}

module.exports = action;
