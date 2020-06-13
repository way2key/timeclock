const User = require('../data-schematic/user-schematic');
const jwt = require('jsonwebtoken');
const secret = require('../secret.js');
const bcrypt = require('bcrypt');
const action = require('../action/action.js');

exports.updatePassword = (req, res) => {
  const bearer = req.headers.authorization;
  action.updatePassword(req.body.password, bearer)
  .then(
    () => res.status(200).json('Mot de passe changé')
  )
  .catch(
    error => res.status(500).json(error)
  )
}

exports.getClockMachine = (req, res) => {
  action.getClockMachine(req.params.clockMachineId)
  .then(
    machine => res.status(200).json(machine)
  )
  .catch(
    error => res.status(500).json("Impossible de récupérer les réglages de la machine <= "+error)
  )
}

exports.updateClockMachineNotification = (req, res) => {
  action.updateClockMachineNotification(req.body)
  .then(
    () => res.status(200).json("Notification modifiées avec succès !")
  )
  .catch(
    error => res.status(500).json(" Impossible de mettre à jour les notifications <= ")
  )
}

exports.updateClockMachineVolume = (req, res) => {
  action.updateClockMachineVolume(req.body)
  .then(
    () => res.status(200).json("Volume modifié avec succès !")
  )
  .catch(
    error => res.status(500).json(" Impossible de mettre à jour le volume <= ")
  )
}

exports.updateClockMachineSound = (req, res) => {
  action.updateClockMachineSound(req.body)
  .then(
    () => res.status(200).json("Sons modifiés avec succès !")
  )
  .catch(
    error => res.status(500).json(" Impossible de mettre à jour les sons <= ")
  )
}

exports.updateClockMachineDefaultWeek = (req, res) => {
  action.updateClockMachineDefaultWeek(req.body)
  .then(
    () => res.status(200).json("Semaine par défaut modifiée avec succès !")
  )
  .catch(
    error => res.status(500).json(" Impossible de mettre à jour la semaine par défaut <= ")
  )
}

exports.deleteLog = (req, res) => {
  action.deleteLog()
  .then(
    () => res.status(200).json("Logs supprimé")
  )
  .catch(
    error => res.status(500).json("Impossible to delete logs <= " + error)
  )
}

exports.deleteIncident = (req, res) => {
  action.deleteIncident()
  .then(
    () => res.status(200).json("Incidents supprimé")
  )
  .catch(
    error => res.status(500).json("Impossible to delete logs <= " + error)
  )
}
