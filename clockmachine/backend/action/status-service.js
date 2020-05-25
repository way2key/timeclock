const moment = require('moment');
const teacherDB = require('../database/teacherDB');
const clockService = require('./clock-service.js');

const Day = require('../data-schematic/day-schematic');
const Clock = require('../data-schematic/clock-schematic');
const User = require('../data-schematic/user-schematic');

exports.checkClockStatus = (clockId) => {
  return new Promise( (resolve, reject) => {
    Clock.findOne({_id: clockId})
    .then(
      clock => {
        //Find the day the clock is bound to
        return Clock.find({dayId: clock.dayId});
      }
    )
    .then(
      clocks => {
        //Find which position this clock is in the day
        let count = 1;
        for(let clock of clocks){
          if(clock.id === clockId){
            break;
          }
          count++;
        }
        resolve(!(count%2==0));
      }
    )
    .catch(
      error => {
        resolve(false);
      }
    )
  });
}

exports.checkStudentStatus = (studentHash) => {
  return new Promise( (resolve, reject) => {
    clockService.getStudentClockFromHash(studentHash)
    .then(
      clocks => {
        let mostRecent = '000000000000000000000000';
        for(clock of clocks) {
          if(clock.id >= mostRecent) {
            mostRecent = clock.id;
          }
        }
        return this.checkClockStatus(mostRecent);
      }
    )
    .then(
      status => resolve(status)
    )
    .catch(
      error => resolve(false)
    )
  });
}
