const ClockMachine = require('../data-schematic/clock-machine-schematic');
const User = require('../data-schematic/user-schematic');
const Log = require('../data-schematic/log-schematic');
const Incident = require('../data-schematic/incident-schematic');

exports.createClockMachine = (machine) => {
  return new Promise( (resolve, reject) => {
    let defaultWeek = "default"
    let newClockMachine = new ClockMachine({
      title: machine.title,
      defaultWeek: defaultWeek
    });

    newClockMachine.save()
    .then(
      () => resolve("Pointeuse créé!")
    )
    .catch(
      error => reject(error)
    )
  })
}

exports.getClockMachine = (clockMachineId) => {
  return new Promise( (resolve, reject) => {
    ClockMachine.findOne({_id:clockMachineId})
    .then((machine) => resolve(machine))
    .catch(error => reject("Unable to fetch ClockMachine from db <= "+error));
  })
}

exports.updateClockMachineNotification = (clockMachine) => {
  return new Promise( (resolve, reject) => {
    ClockMachine.findOneAndUpdate({_id:clockMachine._id},{$set:
      {
        insufficientWeekTimeQuotaNotification: clockMachine.insufficientWeekTimeQuotaNotification,
        insufficientDayTimeQuotaNotification: clockMachine.insufficientDayTimeQuotaNotification,
        clockingOversightNotification: clockMachine.clockingOversightNotification,
        lateArrivalNotification: clockMachine.lateArrivalNotification,
        earlyDepartureNotification: clockMachine.earlyDepartureNotification,
        unallowedPresenceNotification: clockMachine.unallowedPresenceNotification,
      }})
    .then(
      () => resolve("Notifications modifiées")
    )
    .catch(
      (error) => reject("Impossible de mettre à jour les notifications <= "+error)
    )
  })
}

exports.updateClockMachineDefaultWeek = (payload) => {
  return new Promise( (resolve, reject) => {
    ClockMachine.findOneAndUpdate({_id:payload.id},{$set: {defaultWeek:payload.defaultWeek}})
    .then(
      () => resolve("Succes")
    )
    .catch(
      error => reject("Impossible de modifier la semaine par défaut <= " + error)
    )
  });
}

exports.updateClockMachineSound = (payload) => {
  return new Promise( (resolve, reject) => {
    ClockMachine.findOneAndUpdate({_id: payload.clockMachineId},{$set: {sound: payload.sound}})
    .then(
      () => resolve("Succes")
    )
    .catch(
      error => reject("Impossible de modifier les sons <= " + error)
    )
  });
}

exports.updateClockMachineVolume = (payload) => {
  return new Promise( (resolve, reject) => {
    ClockMachine.updateOne({_id:payload._id},{volume: payload.volume})
    .then(
      () => {
        resolve("Volume modifié avec succès");
      }
    )
    .catch(
      (error) => reject("Impossible de mettre à jour le volume <= "+error)
    )
  })
}

exports.deleteLog = () => {
  return new Promise( (resolve, reject) => {
    Log.deleteMany()
    .then(
      () => resolve("Tous les logs sont supprimés")
    )
    .catch(
      error => reject("Impossible de supprimer les logs <= " + error)
    )
  })
}

exports.deleteIncident = () => {
  return new Promise( (resolve, reject) => {
    Incident.deleteMany()
    .then(
      () => resolve("Tous les incidents sont supprimés")
    )
    .catch(
      error => reject("Impossible de supprimer les incidents <= " + error)
    )
  })
}
