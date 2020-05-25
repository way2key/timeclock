const Week = require('../data-schematic/week-schematic');

exports.createWeek = (week) => {
  return new Promise( (resolve, reject) => {
    let newWeek = new Week({
      ...week
    });
    newWeek.save()
    .then(
      () => resolve("Semaine créé avec succès")
    )
    .catch(
      error => reject("Impossible de créer la semaine <= " + error)
    )
  })
}

exports.getAllWeeks = () => {
  return new Promise( (resolve, reject) => {
    Week.find()
    .then(
      weeks => resolve(weeks)
    )
    .catch(
      error => reject("Impossible de récupérer les semaines <= " + error)
    )
  })
}

exports.getAWeek = (weekId) => {
  return new Promise( (resolve, reject) => {
    Week.findOne({_id: weekId})
    .then(
      week => resolve(week)
    )
    .catch(
      error => reject("Impossible de récupérer la semaine " + weekId + " <= " + error)
    )
  })
}

exports.deleteWeek = (weekId) => {
  return new Promise( (resolve, reject) => {
    Week.findByIdAndRemove(weekId)
    .then(
      () => resolve("Semaine supprimé")
    )
    .catch(
      error => reject("Impossible de supprimer la semaine " + weekId + " <= " + error)
    )
  })
}
