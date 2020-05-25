const moment = require('moment');
const teacherDB = require('../database/teacherDB');
const clockService = require('./clock-service.js');
const dayService = require('./day-service.js');

const Day = require('../data-schematic/day-schematic');
const User = require('../data-schematic/user-schematic');

exports.getStudentDayTimeFromDayId = (dayId) => {
  return new Promise( (resolve, reject) => {
    clockService.getStudentClockFromDayId(dayId)
    .then(
      clocks => {
        let shifts = [];
        let time = 0;
        for(let i=0; i < clocks.length-1; i+=2){
          let t1 = moment.duration(clocks[i].time);
          let t2 = moment.duration(clocks[i+1].time);

          let completedShift = moment.duration(Math.abs(t1-t2)).asHours();
          shift = {in:t1.asHours(),out:t2.asHours()};
          shifts.push(shift);
          time += completedShift;
        }
        resolve(time)
      }
    )
    .catch(
      error => reject("impossible de récupérer le temps quotidien <= " + error)
    )
  })
}

exports.getStudentDayTimeFromStudentHash = (studentHash) => {
  return new Promise( (resolve, reject) => {
    dayService.getStudentCurrentDay(studentHash)
    .then(
      dayId => {
        return this.getStudentDayTimeFromDayId(dayId);
      }
    )
    .then(
      time => {
        resolve(time);
      }
    )
    .catch(
      error => reject("impossible de récupérer le temps quotidien <= " + error)
    )
  })
}
