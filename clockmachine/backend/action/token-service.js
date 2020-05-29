const User = require('../data-schematic/user-schematic');
const fetch = require('node-fetch');
const network = require('../network');

exports.getTeacherFromToken = (token) => {
  return new Promise( (resolve, reject) => {
    let url = network.adminAPI + '/api/server/user/'+token;
    fetch(url).then(res => res.json())
    .then(
      teacher => resolve(teacher)
    )
    .catch(
      error => reject("Unable to retrieve teacher <= " + error)
    )
  })
}
