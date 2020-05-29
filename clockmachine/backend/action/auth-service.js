const fetch = require('node-fetch');
const network = require('../network');

exports.isAuthenticatedOnServer = (token) => {
 return new Promise( (resolve, reject) => {
   let url = network.adminAPI + '/admin-auth-controller/verifyToken/' + token;
   fetch(url)
   .then(
     (connected) => resolve(connected)
   )
   .catch(
     error => reject("requête invalide <= " + error)
   )
 })
}
