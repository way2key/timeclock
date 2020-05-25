const action = require('../action/action.js');

exports.createClockmachine = (req, res) => {
  action.createClockMachine(req.body)
  .then(
    (clockMachine) => res.status(200).json(clockMachine)
  )
  .catch(
    (error) => res.status(500).json("impossible de créer une pointeuse <="+error)
  )

}

exports.getSound = (req, res) => {
  action.getSound()
  .then(
    sounds => res.status(200).json(sounds)
  )
  .catch(
    error => res.status(500).json("Impossible de récupérer les sons <= " + error)
  )
}
