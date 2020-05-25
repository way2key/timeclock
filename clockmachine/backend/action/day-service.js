const moment = require('moment');
const teacherDB = require('../database/teacherDB');
const studentService = require('./student-service.js');
const clockService = require('./clock-service.js');

const Day = require('../data-schematic/day-schematic');
const User = require('../data-schematic/user-schematic');
const Clock = require('../data-schematic/clock-schematic');

exports.getStudentCurrentDay = (studentHash) => {
  return new Promise( (resolve, reject) => {
    User.findOne({hash: studentHash})
    .then(
      student => {
        let dateId = [];
        let todayId = (moment().unix() - moment.duration(moment().format('HH:mm:ss')).asSeconds()).toString(16) +'0000000000000000';

        for(day of student.data) {
          if(day >= todayId) {
            dateId.push(day);
          }
        }
        if(dateId.length == 1) {
          resolve(dateId[0]);
        }else {
          reject("Le jour n'existe pas dans l'utilisateur.");
        }
      }
    )
    .catch(
      error => reject(error)
    )
  });
}

exports.createDayForEachUser = () => {
  console.log('');
  console.log(moment().format("YYYY/MM/DD HH:mm:ss"));
  console.log("Création des jours pour chaque utilisateur:");
  User.find({type:0})
  .then(
    students => {
      const promises = students.map(s => { return this.createDay(s.hash);})
      return Promise.all(promises)
    }
  )
  .then(
    () => console.log("Ajout des jours terminé")
  )
  .catch(
    error => console.log(error)
  )
}

exports.createDay = (studentHash) => {
  return new Promise( (resolve, reject) => {
    this.isTodayDayExistingForStudent(studentHash)
    .then(
      answer => {
        if(!answer){
          return studentService.getStudentFromHash(studentHash);
        }else{
          throw 'Le jour existe déjà';
        }
      }
    )
    .then(
      student => {
        const newDay = new Day({
          date: moment().format("YYYY/MM/DD"),
          present: false
        });
        newDay.save()
        .then(
          () => {
            return User.findOneAndUpdate({_id: student.id},{'$push':{data: newDay.id}});
          }
        )
      }
    )
    .then(
      () => resolve("Jour ajouté à l'utilisateur")
    )
    .catch(
      error => reject("Impossible de créer un jour pour l'étudiant <= " + error)
    )
  })
};

exports.getStudentSpecificDayId = (studentHash, date) => {
    const day = moment(date);
    const dayPlusOne = moment(date).add(1, 'day');
    const dayIdMin = (day.unix()).toString(16) +'0000000000000000';
    const dayIdMax = (dayPlusOne.unix()).toString(16) +'0000000000000000';
    let possibleDays = [];

    return new Promise( (resolve, reject) => {
      studentService.getStudentFromHash(studentHash)
      .then(
        (student) => {
          for(let d of student.data) {
            if(d >= dayIdMin && d < dayIdMax){
              possibleDays.push(d);
            };
          };
          if(possibleDays.length === 1) {
            resolve(possibleDays[0]);
          } else {
            throw error;
          }
        }
      )
      .catch(
        (error) => {
          reject('Impossible de récupérer un jour spécifique <= ' + error);
        }
      )
  });
};

exports.isTodayDayExistingForStudent = (studentHash) => {
  return new Promise( (resolve, reject) => {
    User.findOne({hash: studentHash})
    .then(
      student => {
        let todayId = (moment().unix() - moment.duration(moment().format('HH:mm:ss')).asSeconds()).toString(16)+'0000000000000000';
        let a = 0;
        student.data.map(day => {
          if(day >= todayId){
            a++;
          }
        })
        if(a===1){
          resolve(true);
        }else{
          resolve(false);
        }
      }
    )
    .catch(
      error => reject("Le stagiaire n'existe pas. <= " + error)
    )
  })
}

exports.deleteDay = (dayId) => {
  return new Promise( (resolve, reject) => {
    Clock.find({dayId:dayId})
    .then(
      clocks => {
        const promises = clocks.map(clock => { return clockService.deleteClock(clock._id); });
        return Promise.all(promises);
      }
    )
    .then(
      () => { return Day.findByIdAndRemove(dayId); }
    )
    .then(
      () => resolve("Jour supprimé")
    )
    .catch(
      error => reject("Impossible de supprimer le jour " + dayId + " <= " + error)
    )
  })
}
