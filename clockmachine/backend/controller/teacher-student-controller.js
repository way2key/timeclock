const User = require('../data-schematic/user-schematic');
const Log = require('../data-schematic/log-schematic');
const Day = require('../data-schematic/day-schematic');
const performedTimeService = require('../action/performedTime-service.js');
const action = require('../action/action');
const moment = require('moment');

exports.getAllStudents = (req, res)=>{
  User.find({type:0})
  .then(students => res.status(200).json(students))
  .catch(error => res.status(400).json(error));
}

exports.getAStudent = (req, res)=>{
  User.findOne({_id: req.params.id, type:0})
  .then(student => res.status(200).json(student))
  .catch(error => res.status(400).json(error));
}

exports.modifyPerformedTime = (req, res) => {
  performedTimeService.modifyPerformedTime(req.body.time,req.body.hash)
  .then(response => res.status(200).json({response}))
  .catch(error => res.status(500).json(error));
}

exports.createLog = (req, res) => {
  const newLog = new Log({
    date: moment().format("YYYY/MM/DD HH:mm:ss"),
    teacher: req.body.teacher,
    message: req.body.message,
    studentId: req.body.studentId,
    operation: req.body.operation,
  });
  newLog.save()
  .then(
    response => res.status(201).json("Log créé avec succès")
  )
  .catch(
    error => res.status(400).json(error)
  );
}

exports.getATeacher = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  action.getTeacherFromToken(token)
  .then(
    (teacher) => res.status(200).json(teacher)
  )
  .catch(
    (error) => res.status(500).json(error)
  )
}

exports.modifyPresence = (req, res) => {
  action.getStudentCurrentDay(req.body.hash)
  .then(
    dayId => {
      return Day.findOne({_id: dayId});
    }
  )
  .then(
    day => {
      return Day.findOneAndUpdate({_id: day.id},{$set:{present:!day.present}});
    }
  )
  .then(
    () => res.status(200).json("Présence modifiée avec succès.")
  )
  .catch(
    error => res.status(500).json("Impossible de modifier la présence <= " + error)
  )
}

exports.getStudentPresence = (req, res) => {
  action.checkStudentPresence(req.params.hash)
  .then(
    presence => res.status(200).json(presence)
  )
  .catch(
    error => res.status(200).json(false)
  )
}

exports.updateStudentWeek = (req, res) => {
   action.updateStudentWeek(req.body)
   .then(
     () => res.status(200).json("Semaine modifiée avec succès")
   )
   .catch(
     error => res.status(500).json("Impossible de modifier la semaine <= "+error)
   )
}

exports.updateStudentHash = (req, res) => {
  action.updateStudentHash(req.body)
  .then(
    () => res.status(200).json("Hash modifié")
  )
  .catch(
    error => res.status(500).json("Impossible de modifier le hash <= " + error)
  )
}

exports.deleteStudent = (req, res) => {
  action.deleteStudent(req.params.id)
  .then(
    () => res.status(200).json("Stagiaire supprimé")
  )
  .catch(
    error => res.status(500).json("Impossible to delete student <= " + error)
  )
}
