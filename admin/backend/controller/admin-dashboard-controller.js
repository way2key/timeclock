const action = require('../action/action');

exports.getAnAdmin = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  action.getAdminFromToken(token)
  .then(
    (admin) => res.status(200).json(admin)
  )
  .catch(
    (error) => res.status(500).json({error})
  )

}

exports.welcomeAMachine = (req, res) => {
  action.welcomeAMachine(req.body)
  .then(
    (answer) => res.status(200).json(answer)
  )
  .catch(
    error => res.status(500).json("Mauvaise annonce" + error)
  )
}
