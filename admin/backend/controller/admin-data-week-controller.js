const action = require('../action/action');

exports.createWeek = (req, res) => {
  action.createWeek(req.body)
  .then(
    () => res.status(200).json("Semaine créé avec succès :)")
  )
  .catch(
    error => res.status(500).json("Impossible de créer la semaine <= " + error)
  )
}

exports.getAllWeeks = (req, res) => {
  action.getAllWeeks()
  .then(
    weeks => res.status(200).json(weeks)
  )
  .catch(
    error => res.status(500).json("Impossible to fetch weeks :( <= " + error)
  )
}

exports.getAWeek = (req, res) => {
  action.getAWeek(req.params.weekId)
  .then(
    week => res.status(200).json(week)
  )
  .catch(
    error => res.status(500).json("Impossible to fetch the week" + req.params.weekId + " :( <= " + error)
  )
}

exports.deleteWeek = (req, res) => {
  action.deleteWeek(req.params.weekId)
  .then(
    () => res.status(200).json("Semaine supprimée avec succès")
  )
  .catch(
    error => res.status(500).json("Impossible de supprimer la semaine <= " + error)
  )
}
