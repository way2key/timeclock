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

exports.updatePassword = (password, bearer) => {
 return new Promise( (resolve, reject) => {
   let url = network.adminAPI + '/api/admin-auth/password/';
   let payload = { password: password };
   let httpOptions = {
     method: "PUT",
     body: JSON.stringify(payload),
     headers: {
       "Content-Type":  "application/json",
       "Authorization": bearer
     }
   };
   fetch(url,httpOptions)
   .then(
     () => resolve()
   )
   .catch(
     error => reject("Impossible de changer le mot de passe <= " + error)
   )
 })
}
