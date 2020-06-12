const fetch = require('node-fetch');
const network = require('../network');

exports.isAuthenticatedOnServer = (token) => {
 return new Promise( (resolve, reject) => {
   let url = network.adminAPI + '/api/admin-auth/verifyToken/' + token;
   fetch(url)
   .then(
     (connected) => resolve(connected)
   )
   .catch(
     error => reject("requête invalide <= " + error)
   )
 })
}

exports.updatePassword = (password) => {
 return new Promise( (resolve, reject) => {
   let url = network.adminAPI + '/api/admin-auth/password/' + password;
   const token = req.headers.authorization.split(' ')[1];
   console.log(token);
   fetch(url)
   .then(
     (oui) => resolve(oui)
   )
   .catch(
     error => reject("Impossible de changer le mot de passe <= " + error)
   )
 })
}
