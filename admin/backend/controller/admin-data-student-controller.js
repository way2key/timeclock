const action = require('../action/action');

exports.createAStudent = (req, res) => {
  action.createAStudent(req.body)
  .then(
    () => res.status(200).json("Stagiaire créé avec succès :)")
  )
  .catch(
    error => res.status(500).json("Impossible de créer un stagiaire <= " + error)
  )
}

exports.getAllStudents = (req, res) => {
  action.getAllStudents()
  .then(
    student => res.status(200).json(student)
  )
  .catch(
    error => res.status(500).json("Impossible to fetch students :( <= " + error)
  )
}

exports.allotStudent = (req, res) => {
  action.allotStudent(req.body)
  .then(
    () => res.status(200).json("Stagiaire modifié!")
  )
  .catch(
    error => res.status(500).json("Impossible to update student <= " + error)
  )
}

exports.deleteStudent = (req, res) => {
  action.deleteUser(req.params.id)
  .then(
    () => res.status(200).json("Stagiaire supprimé")
  )
  .catch(
    error => res.status(500).json("Impossible to delete student <= " + error)
  )
}
