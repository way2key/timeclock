const User = require('../data-schematic/user-schematic');
const Clock = require('../data-schematic/clock-schematic');
const Day = require('../data-schematic/day-schematic');
const action = require('../action/action');
const moment = require('moment');

exports.getStudentInfo = (req, res) => {
  action.getStudentFromHash(req.params.hash)
  .then(
    student => {
      res.status(200).json(student);
    }
  )
  .catch(
    error => {
      res.status(400).json({error});
    }
  )
}

exports.getStudentStatus = (req, res) => {
  action.checkStudentStatus(req.params.hash)
  .then(
    status => {
      res.status(200).json(status);
    }
  )
  .catch(
    error => {
      res.status(200).json(true);
    }
  )
}

exports.getStudentMeal = (req, res) => {
  action.getStudentMeal(req.params.hash)
  .then(
    meal => {
      res.status(200).json(meal);
    }
  )
  .catch(
    error => res.status(400).json({error})
  )
}

exports.getStudentBreather = (req, res) => {
  action.getStudentBreather(req.params.hash)
  .then(
    breather => {
      res.status(200).json(breather);
    }
  )
  .catch(
    error => res.status(400).json({error})
  )
}

exports.getStudentDayTime = (req, res) => {
  action.getStudentDayTimeFromStudentHash(req.params.hash)
  .then(
    time => {
      res.status(200).json(time);
    }
  )
  .catch(
    error => res.status(400).json(error)
  )
}

exports.getStudentClock = (req, res) => {
  action.getStudentClockFromHash(req.params.hash)
  .then(
    clocks => {
      let out = [];
      for(let clock of clocks){
        out.push(moment.duration(clock.time).asHours());
      }
      res.status(200).send(out);
    }
  )
  .catch(
    (error) => res.status(400).json('Erreur Récupération Clock <= ' + error)
  )
}

exports.clockAStudent = (req, res) => {
  action.clockAStudent(req.body.hash)
  .then(
    () => res.status(200).json("Clock créé avec succès")
  )
  .catch(
    (error) => res.status(500).json("Erreur de pointage <= " + error)
  )
}
