const teacherDB = require('../database/teacherDB');
const moment = require('moment');
const clockService = require('./clock-service');
const dayService = require('./day-service');
const dayTimeService = require('./dayTime-service');
const studentService = require('./student-service');
const presenceService = require('./presence-service');
const clockMachineService = require('./clock-machine-service');
const clockMachineId = require('../clockMachineId');
const fetch = require('node-fetch');

const Day = require('../data-schematic/day-schematic');
const Clock = require('../data-schematic/clock-schematic');
const User = require('../data-schematic/user-schematic');
const Incident = require('../data-schematic/incident-schematic');

// Incident action
exports.getTreatedIncident = () => {
  return new Promise( (resolve,reject) => {
    Incident.find({treated:true})
    .then(
      incidents => resolve(incidents)
    )
    .catch(
      error => reject(error)
    )
  });
}

exports.getUntreatedIncident = () => {
  return new Promise( (resolve,reject) => {
    Incident.find({treated:false})
    .then(
      incidents => resolve(incidents)
    )
    .catch(
      error => reject(error)
    )
  });
}

exports.saveNewIncident = (studentId, type) => {
  return new Promise( (resolve,reject) => {
    let newIncident = new Incident({
      date: moment().format("YYYY/MM/DD HH:mm:ss"),
      studentId: studentId,
      type: type,
      treated: false
    });
    newIncident.save()
    .then(
      () => resolve()
    )
    .catch(
      () => reject()
    )
  });

}

exports.checkIncident = (incident) => {
  return new Promise( (resolve,reject) => {
    Incident.updateOne({_id:incident._id},{$set:{treated: true}})
    .then(
      (msg) => {
        resolve("Incident quittancé!");
      }
    )
    .catch(
      error => {
        reject(error);
      }
    )
  });
}

// Incident launcher
exports.controlInstantIncident = (studentHash, clockId) => {
  return new Promise( (resolve, reject) => {
    let setting;
    clockMachineService.getClockMachine(clockMachineId)
    .then(
      clockMachine => {
        setting = clockMachine;
        //getStudent
        return studentService.getStudentFromHash(studentHash);
      }
    )
    .then(
      student => {
        let incidentToControl = [];
        if(setting.lateArrivalNotification){
          incidentToControl.push(this.latenessArrivalIncident(student, clockId));
        }
        if(setting.unallowedPresenceNotification){
          incidentToControl.push(this.unallowedPresenceIncident(student, clockId));
        }
        if(incidentToControl){
          return Promise.all(incidentToControl);
        }
        resolve();
      }
    )
    .then(
      () => resolve("Incidents Immédiats vérifié avec succès")
    )
    .catch(
      error => reject("Incident ! <= " + error)
    )
  })
}

exports.controlDailyIncident = () => {
  return new Promise( (resolve, reject) => {
    let setting;
    clockMachineService.getClockMachine(clockMachineId)
    .then(
      clockMachine => {
        setting = clockMachine;
        return User.find({type:0});
      }
    )
    .then(
      students => {
        const studentPromises = students.map(student => {
          let incidentPromises = [];
          if(setting.insufficientDayTimeQuotaNotification){
            incidentPromises.push(this.dailyTimeNotCompletedIncident(student));
          }
          if(setting.earlyDepartureNotification){
            incidentPromises.push(this.hastyDepartureIncident(student));
          }
          if(setting.clockingOversightNotification){
            incidentPromises.push(this.clockOversightIncident(student));
          }
          return Promise.all(incidentPromises);
        });
        return Promise.all(studentPromises);
      }
    )
    .then(
      () => resolve("Incidents quotidiens vérifié avec succès")
    )
    .catch(
      error => reject("Impossible de vérifier les incidents quotidiens <= " + error)
    )
  })
}

exports.controlWeeklyIncident = () => {
  return new Promise( (resolve, reject) => {
    let setting;
    clockMachineService.getClockMachine(clockMachineId)
    .then(
      clockMachine => {
        setting = clockMachine;
        return User.find({type:0});
      }
    )
    .then(
      students => {
        const studentPromises = students.map(student => {
          let incidentPromises = [];
          if(setting.insufficientWeekTimeQuotaNotification){
            incidentPromises.push(this.quotaTimeIncident(student));
          }
          return Promise.all(incidentPromises);
        });
        return Promise.all(studentPromises);
      }
    )
    .then(
      () => resolve("Incidents quotidiens vérifié avec succès")
    )
    .catch(
      error => reject("Impossible de vérifier les incidents hebdomadaires <= " + error)
    )
  })
}

// Incident
//instant
exports.latenessArrivalIncident = (student) => {
    return new Promise( (resolve,reject) => {
      let sTimeplan;
      let sClock;

      //getStudentWeek + timeplan
      let getStudentTimeplan = new Promise( (resolve, reject) => {
        let weekUrl = 'http://localhost:4000/api/admin-data-week/' + student.weekId;
        fetch(weekUrl)
        .then(res => res.json())
        .then(
          week => {
            switch (moment().day()) {
              case 0:
              timeplanId = week.sunday;
              break;
              case 1:
              timeplanId = week.monday;
              break;
              case 2:
              timeplanId = week.tuesday;
              break;
              case 3:
              timeplanId = week.wednesday;
              break;
              case 4:
              timeplanId = week.thursday;
              break;
              case 5:
              timeplanId = week.friday;
              break;
              case 6:
              timeplanId = week.saturday;
            }
            let url2 = 'http://localhost:4000/api/admin-data-timeplan/timeplan/' + timeplanId;
            return fetch(url2).then(res => res.json());
          }
        )
        .then(timeplan => {
          sTimeplan = timeplan;
          resolve();
        })
        .catch(error => reject("Impossible de récupérer l'horaire <= " + error))
      });

      //getClock
      let getClock = new Promise ( (resolve, reject) => {
        clockService.getStudentClockFromHash(student.hash)
        .then(clock => {
          sClock = clock;
          resolve();
        })
        .catch(error => reject("Impossible de récupérer les clocks <= " + error))
      });

      Promise.all([getStudentTimeplan, getClock])
      .then(
        data => {
          //Control
          if(true){
            let late = (sClock.filter(c => moment.duration(c.time).as('seconds') < moment.duration(sTimeplan.shift[0].start).as('seconds')).length === 0)
            if(late){
              this.saveNewIncident(student._id, "Retard");
            }
          }
          resolve();
        }
      )
      .catch(error => reject(error))
    });
  }

exports.unallowedPresenceIncident = (student, clockId) => {
    return new Promise( (resolve,reject) => {
      let sTimeplan;
      let sHoliday;

      //getStudentWeek + timeplan
      let getStudentTimeplan = new Promise( (resolve, reject) => {
        let weekUrl = 'http://localhost:4000/api/admin-data-week/' + student.weekId;
        fetch(weekUrl)
        .then(res => res.json())
        .then(
          week => {
            switch (moment().day()) {
              case 0:
              timeplanId = week.sunday;
              break;
              case 1:
              timeplanId = week.monday;
              break;
              case 2:
              timeplanId = week.tuesday;
              break;
              case 3:
              timeplanId = week.wednesday;
              break;
              case 4:
              timeplanId = week.thursday;
              break;
              case 5:
              timeplanId = week.friday;
              break;
              case 6:
              timeplanId = week.saturday;
            }
            let url2 = 'http://localhost:4000/api/admin-data-timeplan/timeplan/' + timeplanId;
            return fetch(url2);
          }
        )
        .then(res => res.json())
        .then(timeplan => {
          sTimeplan = timeplan;
          resolve();
        })
        .catch(error => reject("Impossible de récupérer l'horaire <= " + error))
      });

      //getHoliday
      let getHoliday = new Promise( (resolve, reject) => {
        let holidayUrl = 'http://localhost:4000/api/admin-data-holiday/';
        fetch(holidayUrl)
        .then(res => res.json())
        .then(holiday => {
          sHoliday = holiday;
          resolve();
        })
        .catch(error => reject("Impossible de récupérer les jours fériés <= " + error))
      })

      Promise.all([getStudentTimeplan, getHoliday])
      .then(
        data => {
          //Control
          if(true){
            let now = moment();
            let time = moment.duration(now.format('HH:mm:ss')).asSeconds();
            let start = moment.duration(sTimeplan.startOfDay,"HH:mm:ss").asSeconds();
            let end = moment.duration(sTimeplan.endOfDay,"HH:mm:ss").asSeconds();
            let outsideSchedule = ( (time < start) || ( time > end) );
            let forbiddenDay = (sHoliday.filter(holiday => now.isBetween(moment(holiday.startDate,"YYYY/MM/DD").startOf('day'), moment(holiday.endDate,"YYYY/MM/DD").endOf('day'))).length > 0);
            if(false || forbiddenDay){
              this.saveNewIncident(student._id, "Présence non Autorisée");
            }
          }
          resolve();
        }
      )
      .catch(error => reject(error))
    });
}

//daily
exports.dailyTimeNotCompletedIncident = student => {
    return new Promise( (resolve,reject) => {
      let sTimeplan;

      let weekUrl = 'http://localhost:4000/api/admin-data-week/' + student.weekId;
      fetch(weekUrl)
      .then(res => res.json())
      .then(
        week => {
          switch (moment().day()) {
            case 0:
            timeplanId = week.sunday;
            break;
            case 1:
            timeplanId = week.monday;
            break;
            case 2:
            timeplanId = week.tuesday;
            break;
            case 3:
            timeplanId = week.wednesday;
            break;
            case 4:
            timeplanId = week.thursday;
            break;
            case 5:
            timeplanId = week.friday;
            break;
            case 6:
            timeplanId = week.saturday;
          }
          let url2 = 'http://localhost:4000/api/admin-data-timeplan/timeplan/' + timeplanId;
          return fetch(url2).then(res => res.json());
        }
      )
      .then(
        timeplan => {
          sTimeplan = timeplan;
          return dayTimeService.getStudentDayTimeFromStudentHash(student.hash)
        }
      )
      .then(
        time => {
          //Control
          if(false){
            if(time < sTimeplan.requiredTime){
              this.saveNewIncident(student._id, "Temps quotidien insuffisant");
            }
          }
          resolve();
        }
      )
      .catch(
        error => reject("Impossible de vérifier le temps quotidien <= " + error)
      )
    });
  }

exports.hastyDepartureIncident = student => {
    return new Promise( (resolve,reject) => {
      let sTimeplan;
      let weekUrl = 'http://localhost:4000/api/admin-data-week/' + student.weekId;
      fetch(weekUrl)
      .then(res => res.json())
      .then(
        week => {
          switch (moment().day()) {
            case 0:
            timeplanId = week.sunday;
            break;
            case 1:
            timeplanId = week.monday;
            break;
            case 2:
            timeplanId = week.tuesday;
            break;
            case 3:
            timeplanId = week.wednesday;
            break;
            case 4:
            timeplanId = week.thursday;
            break;
            case 5:
            timeplanId = week.friday;
            break;
            case 6:
            timeplanId = week.saturday;
          }
          let url2 = 'http://localhost:4000/api/admin-data-timeplan/timeplan/' + timeplanId;
          return fetch(url2).then(res => res.json());
        }
      )
      .then(
        timeplan => {
          sTimeplan = timeplan;
          return clockService.getStudentClockFromHash(student.hash)
        }
      )
      .then(
        clocks => {
          if(clocks.length && sTimeplan.shift){
            if(moment.duration(clocks[clocks.length - 1].time).as('seconds') < moment.duration(sTimeplan.shift[sTimeplan.shift.length-1].end).as('seconds')) {
              this.saveNewIncident(studentId, "Départ en avance");
            }
          }
          resolve();
        }
      )
      .catch(
        error => reject("Impossible de vérifier les départs en avances <= " + error)
      )
    });
  }

exports.clockOversightIncident = student => {
  return new Promise( (resolve,reject) => {
    clockService.getStudentClockFromHash(student.hash)
    .then(
      clocks => {
        //Control
        if(clocks.length % 2 != 0) {
          this.saveNewIncident(student._id, "Oubli de timbrage");
        }
        resolve('Timbrage verifié avec succès');
      }
    )
    .catch(
      error => {
        reject("Impossible de vérifier l'oubli de timbrage <= " + error);
      }
    )
  });
}

//weekly
exports.quotaTimeIncident = (student) => {
  return new Promise( (resolve,reject) => {
    let sTimeplan;

    let weekUrl = 'http://localhost:4000/api/admin-data-week/' + student.weekId;
    fetch(weekUrl)
    .then(res => res.json())
    .then(
        week => {
          let monday = week.monday;
          let tuesday = week.tuesday;
          let wednesday = week.wednesday;
          let thursday = week.thursday;
          let friday = week.friday;
          let mondayUrl = 'http://localhost:4000/api/admin-data-timeplan/timeplan/' + monday;
          let tuesdayUrl = 'http://localhost:4000/api/admin-data-timeplan/timeplan/' + tuesday;
          let wednesdayUrl = 'http://localhost:4000/api/admin-data-timeplan/timeplan/' + wednesday;
          let thursdayUrl = 'http://localhost:4000/api/admin-data-timeplan/timeplan/' + thursday;
          let fridayUrl = 'http://localhost:4000/api/admin-data-timeplan/timeplan/' + friday;
          let mondayPromise = fetch(mondayUrl).then(res => res.json());
          let tuesdayUrlPromise = fetch(tuesdayUrl).then(res => res.json());
          let wednesdayPromise = fetch(wednesdayUrl).then(res => res.json());
          let thursdayPromise = fetch(thursdayUrl).then(res => res.json());
          let fridayPromise = fetch(fridayUrl).then(res => res.json());
          const promises = [mondayPromise, tuesdayUrlPromise, wednesdayPromise, thursdayPromise, fridayPromise];
          return Promise.all(promises);
        }
      )
    .then(timeplans => {
      sTimeplan = timeplans;
      let totalTime = 0;
      for(let t of timeplans){
        totalTime += t.requiredTime;
      }
      if(student.performedTime < totalTime){
        this.saveNewIncident(student._id, "Temps hebdomadaire insuffisant");
      }
      resolve();
    })
    .catch(error => reject("Impossible de compter le temps hebdomadaires <= " + error))
  });
}
