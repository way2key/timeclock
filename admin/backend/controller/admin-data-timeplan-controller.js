const action = require('../action/action');

exports.createTimeplan = (req, res) => {
  action.createTimeplan(req.body)
  .then(
    () => res.status(200).json("Horaire créé avec succès :)")
  )
  .catch(
    error => res.status(500).json("Impossible de créer un horaire <= " + error)
  )
}

exports.getTimeplan = (req, res) => {
  action.getTimeplan()
  .then(
    timeplan => res.status(200).json(timeplan)
  )
  .catch(
    error => res.status(500).json("Impossible to fetch timeplan :( <= " + error)
  )
}

exports.getATimeplan = (req, res) => {
  action.getATimeplan(req.params.timeplanId)
  .then(
    timeplan => res.status(200).json(timeplan)
  )
  .catch(
    error => res.status(500).json("Impossible to fetch the timeplan " + timeplanId + " :( <= " + error)
  )
}

exports.deleteTimeplan = (req, res) => {
  action.deleteTimeplan(req.params.timeplanId)
  .then(
    shift => res.status(200).json("Timeplan supprimé")
  )
  .catch(
    error => res.status(500).json("Impossible to fetch shift <= " + error)
  )
}
