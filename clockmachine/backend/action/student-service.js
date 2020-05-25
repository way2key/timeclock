const moment = require('moment');
const teacherDB = require('../database/teacherDB');
const dayService = require('./day-service.js');
const clockService = require('./clock-service');

const Day = require('../data-schematic/day-schematic');
const Clock = require('../data-schematic/clock-schematic');
const User = require('../data-schematic/user-schematic');


exports.getStudentFromHash = (studentHash) => {
  return new Promise( (resolve, reject) => {
    User.findOne({hash: studentHash})
    .then(
      students => {
        if(!students){
          reject('No students matches this call...');
        }
        resolve(students);
      }
    )
    .catch(
      error => {
        error;
      }
    );
  });
}

exports.getStudentMeal = (studentHash) => {
  return new Promise( (resolve, reject) => {
    clockService.getStudentClockFromHash(studentHash)
    .then(
      clocks => {
        let shifts = [];
        for(let i=0; i < clocks.length-1; i+=2){
          let t1 = moment.duration(clocks[i].time);
          let t2 = moment.duration(clocks[i+1].time);
          shift = {in:t1.asHours(),out:t2.asHours()};
          shifts.push(shift);
        }
        let m = moment.duration(moment().format('HH:mm:ss')).asHours();
        if(m > 11 && m < 14){
          if(breakPerformedInInterval(shifts,11,m,0.5)){
            resolve(true);
          }else{
            resolve(false);
          }
        }else{
          if(breakPerformedInInterval(shifts,11,14,0.5)){
            resolve(true);
          }else{
            resolve(false);
          }
        }
      }
    )
    .catch(
      error => reject(error)
    )
  });
}

exports.getStudentBreather = (studentHash) => {
  return new Promise( (resolve, reject) => {
    clockService.getStudentClockFromHash(studentHash)
    .then(
      clocks => {

        let shifts = [];
        for(let i=0; i < clocks.length-1; i+=2){
          let t1 = moment.duration(clocks[i].time);
          let t2 = moment.duration(clocks[i+1].time);
          shift = {in:t1.asHours(),out:t2.asHours()};
          shifts.push(shift);
        }
        let count = breakPerformed(shifts);
        if(count > 0){
          resolve(false);
        }
        resolve(true);
      }
    )
    .catch(
      error => reject(error)
    )
  });
}

exports.updateStudentWeek = (payload) => {
  return new Promise( (resolve, reject) => {
    User.findOneAndUpdate({_id:payload._id},{$set:{weekId:payload.weekId}})
    .then(
      () => resolve("Succes")
    )
    .catch(
      error => reject("Impossible de modifier le timeplan <= " + error)
    )
  });
}

exports.updateStudentHash = (payload) => {
  return new Promise( (resolve, reject) => {
    User.findOneAndUpdate({_id:payload._id},{$set:{hash:payload.hash}})
    .then(
      () => resolve("Succes")
    )
    .catch(
      error => reject("Impossible de modifier le hash <= " + error)
    )
  })
}

exports.deleteStudent = (studentId) => {
  return new Promise( (resolve, reject) => {
    User.findOne({_id:studentId})
    .then(
      user => {
        const promises = user.data.map(dayId => {return dayService.deleteDay(dayId)});
        return Promise.all(promises);
      }
    )
    .then(
      () => {return User.findByIdAndRemove(studentId)}
    )
    .then(
      () => resolve("stagiaire supprimé")
    )
    .catch(
      error => reject("Impossible de supprimer le Stagiaire " + studentId + " <= " + error)
    )
  })
}

let breakPerformedInInterval = (shifts,min,max,interval) => {
  let time = 0;
  console.log("function!");
  console.log("PARAMETER ", shifts);
  console.log("->",min,max,interval);
  console.log("");
  for(let s of shifts){
    if(s.in <= min && s.out > min){
      console.log("1: ",s);
      time += (Math.abs(s.out-min));
    }

    if(s.in > min && s.out < max){
      console.log("2: ",s);
      time += Math.abs(s.out - s.in);
    }

    if(s.in < max && s.out > max){
      console.log("3: ",s);
      time += (Math.abs(max-s.in));
    }
  }
  console.log("finish", time);
  console.log("temps max: ",(Math.abs(max-min)-interval));
  console.log("");
  if(time <= (Math.abs(max-min)-interval) && time !=0 ){
    console.log("a effectué la pause correctement.");
    console.log("endFunction_________________________________________________________________");
    return true;
  }
  console.log("n'a PAS effectué la pause correctement.");
  console.log("endFunction_________________________________________________________________");
  return false;
}

let breakPerformed = (shifts) => {
  let count=0;
  if(shifts.length > 0) {
    let sweepLine=shifts[0].in;
    console.log("START");
    for(let s of shifts){
      console.log("");
      if(s.in >= sweepLine){
        console.log("call function:",s.in,s.in+4);
        if(!breakPerformedInInterval(shifts,s.in,s.in+4,1/3)){
          sweepLine = s.in+4;
          count++;
        }
      }else{
        console.log("nocall: ");
        console.log("cette période a déjà été controllé.");
      }
    }
    console.log("");
    console.log("count: "+count);
    return count;
  } else {
    return 0;
  }
}
