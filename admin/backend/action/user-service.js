const User = require('../data-schematic/user-schematic');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = require('../secret');


exports.createAStudent = (student) => {
  return new Promise( (resolve, reject) => {
    let newStudent = new User({
      firstname: student.firstname,
      lastname: student.lastname,
      hash: student.hash,
      clockMachine: student.clockMachine,
      weekId: student.weekId,
      type: 0
    });

    newStudent.save()
    .then(
      () => resolve("Stagiaire créé!")
    )
    .catch(
      error => reject(error)
    )
  })
}

exports.createATeacher = (teacher) => {
  return new Promise( (resolve, reject) => {
    bcrypt.hash(teacher.password, 10)
    .then(
      cryptedPassword => {
        const usr = new User({
          firstname: teacher.firstname,
          lastname: teacher.lastname,
          password: cryptedPassword,
          hash: teacher.firstname+teacher.lastname,
          type: 1
        });
        return usr.save()
      }
    )
    .then(() => resolve("Enseigant enregistré"))
    .catch(error => reject(" impossible de sauvegarder l'enseigant <= " + error));
  })
}

exports.getAllStudents = () => {
  return new Promise( (resolve, reject) => {
    User.find({type:0})
    .then((students) => resolve(students))
    .catch(error => reject("Unable to fetch Student from db <= " + error));
  })
}

exports.getAllTeachers = () => {
  return new Promise( (resolve, reject) => {
    User.find({type:1})
    .then( teachers => resolve(teachers))
    .catch(error => reject("Unable to fetch teachers from db <= " + error));
  })
}

exports.allotStudent = (student) => {
  return new Promise( (resolve, reject) => {
    User.updateOne({_id:student._id},{...student, _id:student._id})
    .then(
      () => resolve('success')
    )
    .catch(
      error => reject("Unable to put student to DB :( <= " + error)
    )
  })
}

exports.getUserFromToken = (token) => {
  return new Promise( (resolve, reject) => {
    try {
      verifiedJwt = jwt.verify(token, secret);
    }
    catch {
      reject("Unable to parse token")
    }
    let userId= verifiedJwt.userId;
    User.findOne({_id: userId})
    .then((teacher) => resolve(teacher))
    .catch(error => reject(teacher));
  })
}

exports.deleteUser = (userId) => {
  return new Promise( (resolve, reject) => {
    User.findByIdAndRemove(userId)
    .then(
      () => resolve("Utilisateur supprimé")
    )
    .catch(
      error => reject("Impossible de supprimer l'utilisateur " + userId + " <= " + error)
    )
  })
}
