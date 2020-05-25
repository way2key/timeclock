const Timeplan = require('../data-schematic/timeplan-schematic');

exports.createTimeplan = (timeplan) => {
  return new Promise( (resolve, reject) => {
    let newTimeplan = new Timeplan({
      ...timeplan
    });
    newTimeplan.save()
    .then(
      () => resolve("Timeplan créé!")
    )
    .catch(
      error => reject("Impossible de créer le timeplan <= " + error)
    )
  });
}

exports.getTimeplan = () => {
  return new Promise( (resolve, reject) => {
    Timeplan.find()
    .then(timeplan => resolve(timeplan))
    .catch(error => reject("Unable to fetch Timeplan from db <= " + error));
  })
}

exports.getATimeplan = (timeplanId) => {
  return new Promise( (resolve, reject) => {
    Timeplan.findOne({_id: timeplanId})
    .then(timeplan => resolve(timeplan))
    .catch(error => reject("Unable to fetch Timeplan from db <= " + error));
  })
}


exports.deleteTimeplan = (timeplanId) => {
  return new Promise( (resolve, reject) => {
    Timeplan.findByIdAndRemove(timeplanId)
    .then(
      () => resolve("Timeplan supprimé")
    )
    .catch(
      error => reject("Impossible de supprimer le timeplan " + timeplanId + " <= " + error)
    )
  })
}
