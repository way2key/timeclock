const Day = require('../data-schematic/day-schematic');
const moment = require('moment');
const action = require('../action/action.js');

exports.createDay = (req, res) => {
  action.createDay(req.body.hash);
  res.sendStatus(200);
}

exports.unallowedPresenceIncident = (req, res) => {
  action.unallowedPresenceIncident()
  .then(
    message => res.status(200).json(message)
  )
  .catch(
    error => res.status(500).json("Impossible de créer l'incident présence non autorisée <= " + error)
  )
}

exports.isTodayDayExistingForStudent = (req, res) => {
  action.isTodayDayExistingForStudent(req.params.hash)
  .then(
    answer => res.status(200).json(answer)
  )
  .catch(
    error => res.status(500).json("Impossible de vérifier si le jour présent existe <= "+ error)
  )
}
