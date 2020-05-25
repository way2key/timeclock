const moment = require('moment');
const teacherDB = require('../database/teacherDB');
const dayService = require('./day-service.js');
const incidentService = require('./incident-service.js');

const Day = require('../data-schematic/day-schematic');
const Clock = require('../data-schematic/clock-schematic');
const User = require('../data-schematic/user-schematic');


exports.getStudentClockFromHash = (studentHash) => {
  return new Promise( (resolve, reject) => {
    dayService.getStudentCurrentDay(studentHash)
    .then(
      dayId => {
        Clock.find({dayId:dayId})
        .then(
          clocks => {
            resolve(clocks);
          }
        )
        .catch(
          error => {
            reject("Unable to find student's clock ☠ ");
          }
        )
      }
    )
    .catch(
      error => {
        reject("No clocks available <= " + error);
      }
    )
  });
}

exports.getStudentClockFromDayId = (dayId) => {
  return new Promise( (resolve, reject) => {
    Clock.find({dayId:dayId})
    .then(
      clocks => {
        resolve(clocks);
      }
    )
    .catch(
      error => {
        reject("Unable to fetch clocks with this dayId ☠");
      }
    )
  });
}

exports.getAClockFromId = (clockId) => {
  return new Promise( (resolve, reject) => {
    Clock.findOne({_id: clockId})
    .then(
      clock => resolve(clock)
    )
    .catch(
      error => reject("Impossible de récupérer la clock <= " + error)
    )
  })
}

exports.clockAStudent = (studentHash) => {
  return new Promise( (resolve, reject) => {
    let dayId;
    let newClock;
    dayService.getStudentCurrentDay(studentHash)
    .then(
      dayId => {
        this.dayId = dayId;
        this.newClock = new Clock({
          dayId: dayId,
          time: moment().format("HH:mm:ss")
        });
        return this.newClock.save();
      }
    )
    .then(
      () => {
        return incidentService.controlInstantIncident(studentHash, this.newClock._id);
      }
    )
    .then(
      () => {
        return Day.findOneAndUpdate({_id:this.dayId},{$set:{present:true}});
      }
    )
    .then(
      () => resolve("Clock créé")
    )
    .catch(
      error => reject("Clock non créé <= " + error)
    )
  })
}

exports.deleteClock = (clockId) => {
  return new Promise( (resolve, reject) => {
    Clock.findByIdAndRemove(clockId)
    .then(
      () => resolve("Clock supprimé")
    )
    .catch(
      error => reject("Impossible de supprimer le Clock " + clockId + " <= " + error)
    )
  })
}
