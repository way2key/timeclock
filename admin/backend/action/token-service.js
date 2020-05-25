const User = require('../data-schematic/user-schematic');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = require('../secret');

exports.getAdminFromToken = (token) => {
  return new Promise( (resolve, reject) => {
    verifiedJwt = jwt.verify(token, secret);
    let userId= verifiedJwt.userId;
    User.findOne({_id: userId})
    .then((admin) => resolve(admin))
    .catch(error => reject("Unable to retrieve admin <= " + error));
  })
}
