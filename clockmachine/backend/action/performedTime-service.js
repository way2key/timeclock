const moment = require('moment');
const teacherDB = require('../database/teacherDB');
const clockService = require('./clock-service.js');
const incidentService = require('./incident-service.js');

const Day = require('../data-schematic/day-schematic');
const Clock = require('../data-schematic/clock-schematic');
const User = require('../data-schematic/user-schematic');

exports.updatePerformedTime = () => {
  User.find({type:0})
  .then(
    users => {
      for(let user of users){
        clockService.getStudentClockFromHash(user.hash)
        .then(
          clocks => {
            let time = 0;
            if(clocks.length%2!=0){
              let t1 = moment.duration(clocks[clocks.length-1].time);
              let t2 = moment.duration("16:00:00");
              if(t1 < t2){
                let uncompletedShift = moment.duration(Math.abs(t1-t2)).asHours();
                time += uncompletedShift;
              }
            }
            let shifts = [];
            for(let i=0; i < clocks.length-1; i+=2){
              let t1 = moment.duration(clocks[i].time);
              let t2 = moment.duration(clocks[i+1].time);

              let completedShift = moment.duration(Math.abs(t1-t2)).asHours();
              shift = {in:t1.asHours(),out:t2.asHours()};
              shifts.push(shift);
              time += completedShift;
            }
            /*
            if(shifts.length){
              if(!breakPerformedInInterval(shifts,11,14,0.5)){
                console.log("Il n'a pas mangé.");
                time-=0.5;
              }
              time -= breakPerformed(shifts)/3;
              console.log("Le temps de " + user.firstname + " est de : " + time);
              console.log("END");
              console.log("");
            }
*/
          }
        )
        .catch(
          error => console.log("Impossible de comptabiliser le temps <= " + error)
        )
      }
    }
  )
}

exports.modifyPerformedTime =  (time, studentHash) => {
  return new Promise( (resolve, reject) => {
    User.findOneAndUpdate({type:0, hash:studentHash},{$inc:{performedTime: time}})
    .then(
      student => {
        if(!student){
          reject("Aucun stagiaire existant pour cet appel :/");
        }
        resolve("Temps modifié avec succès");
      }
    )
  });
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
  if(time <= (Math.abs(max-min)-interval) ){
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
}
