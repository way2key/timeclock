const moment = require('moment');
const teacherDB = require('../database/teacherDB');
const dayService = require('./day-service.js');

const Day = require('../data-schematic/day-schematic');
const Clock = require('../data-schematic/clock-schematic');
const User = require('../data-schematic/user-schematic');

exports.checkStudentPresence = (studentHash) => {
  return new Promise( (resolve, reject) => {
    dayService.getStudentCurrentDay(studentHash)
    .then(
      dayId => {
        return Day.findOne({_id: dayId});
      }
    )
    .then(
      day => {
        resolve(day.present);
      }
    )
    .catch(
      error => reject("Impossible de contrôler la présence <= " + error)
    )
  });
}
