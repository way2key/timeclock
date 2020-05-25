const fetch = require('node-fetch');

exports.isAuthenticatedOnServer = (token) => {
 return new Promise( (resolve, reject) => {
   let url = 'http://localhost:4000/admin-auth-controller/verifyToken/' + token;
   fetch(url)
   .then(
     (connected) => resolve(connected)
   )
   .catch(
     error => reject("requête invalide <= " + error)
   )
 })
}
