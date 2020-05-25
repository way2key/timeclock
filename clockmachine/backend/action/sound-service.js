const fs = require('fs');

exports.getSound = () => {
  return new Promise( (resolve, reject) => {
    try{
      sounds = fs.readdirSync('../src/assets/sound');
      resolve(sounds);
    }
    catch{
      reject("Impossible de récupérer les sons");
    }
  })
}
