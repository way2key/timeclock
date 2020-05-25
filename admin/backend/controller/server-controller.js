const action = require('../action/action');

exports.getUserFromToken = (req, res, next) => {
  action.getUserFromToken(req.params.token)
  .then(
    user => res.status(200).json(user)
  )
  .catch(
    error => res.status(500).json("Unable to retrieve user <=" + error)
  )
}
