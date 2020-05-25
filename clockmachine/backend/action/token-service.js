const User = require('../data-schematic/user-schematic');
const fetch = require('node-fetch');

exports.getTeacherFromToken = (token) => {
  return new Promise( (resolve, reject) => {
    let url = 'http://localhost:4000/api/server/user/'+token;
    fetch(url).then(res => res.json())
    .then(
      teacher => resolve(teacher)
    )
    .catch(
      error => reject("Unable to retrieve teacher <= " + error)
    )
  })
}
