const User = require('../data-schematic/user-schematic');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = require('../secret.js');
const dayService = require('../action/day-service.js');

exports.signupUser = (req, res, next) => {
  delete req.body._id;
  const usr = new User({
    ...req.body
  });
  usr.save()
  .then(
    () => {return dayService.createDay(usr.hash);}
  )
  .then(
    () => res.status(201).json({ message: 'Utilisateur enregistré'})
  )
  .catch(error => res.status(400).json(error));
}
