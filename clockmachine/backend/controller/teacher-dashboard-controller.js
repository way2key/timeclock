const action = require('../action/action.js');

exports.getATeacher = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  action.getTeacherFromToken(token)
  .then(
    teacher => res.status(200).json(teacher)
  )
  .catch(
    error => res.status(500).json({error})
  )

}

exports.getUntreatedIncident = (req, res) => {
  action.getUntreatedIncident()
  .then(
    incident => res.status(200).json(incident)
  )
  .catch(
    error => res.status(500).json({error})
  )
}

exports.checkIncident = (req, res) => {
  action.checkIncident(req.body)
  .then(
    msg => res.status(200).json(msg)
  )
  .catch(
    error => res.status(500).json({error})
  )
}
