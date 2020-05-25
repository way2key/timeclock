const action = require('../action/action');

exports.createATeacher = (req, res) => {
  action.createATeacher(req.body)
  .then(
    () => res.status(200).json("Enseignant créé avec succès :)")
  )
  .catch(
    error => res.status(500).json("Impossible de créer un stagiaire <= " + error)
  )
}

exports.getAllTeachers = (req, res) => {
  action.getAllTeachers()
  .then(
    teachers => res.status(200).json(teachers)
  )
  .catch(
    error => res.status(500).json("Impossible to fetch teachers :( <= " + error)
  )
}

exports.deleteTeacher = (req, res) => {
  action.deleteUser(req.params.teacherId)
  .then(
    () => res.status(200).json("Enseignant supprimé")
  )
  .catch(
    error => res.status(500).json("Impossible to delete teacher <= " + error)
  )
}
