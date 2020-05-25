const User = require('../data-schematic/user-schematic');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = require('../secret.js');
const dayService = require('../action/day-service.js');

exports.login = (req, res, next) => {
    User.findOne({firstname: req.body.username})
    .then(usr => {
      if(!usr || usr.type !== 1){
        return res.status(401).json({error: "Utilisateur inexistant ou Mot de passe incorrect"});
      }
      bcrypt.compare(req.body.password, usr.password)
      .then(valid =>{
        if(!valid){
          return res.status(401).json({error: "Utilisateur inexistant ou Mot de passe incorrect."});
        }
        res.status(200).json({

          userId: usr._id,
          token: jwt.sign(
            {userId: usr._id},
            secret,
            { expiresIn: '24h'}
          )
        });
      })
      .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
}

exports.signupAdmin = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then(
    cryptedPassword => {const usr = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: cryptedPassword,
        type: 1,
        timeplanId: req.body.timeplanId
    });
    usr.save()
    .then(() => res.status(201).json({message: 'Administrateur enregistré'}))
    .catch(error => res.status(400).json({error}));
    })
  .catch(error => res.status(500).json({error}));
}

exports.signupUser = (req, res, next) => {
  delete req.body._id;
  const usr = new User({
    ...req.body
  });
  usr.save()
  .then(
    () => {return dayService.createDay(usr.hash);}
  )
  .then(
    () => res.status(201).json({ message: 'Utilisateur enregistré'})
  )
  .catch(error => res.status(400).json(error));
}

exports.verifyToken = (req, res, next) => {
  try{
    verifiedJwt = jwt.verify(req.params.token, secret);
    let userId = verifiedJwt.userId;
    User.findOne({_id: userId})
    .then((user) => {
      if(user) {
        res.status(200).send('true');
      } else {
        res.status(400).send('false');
      }
    })
    .catch(error => {res.status(200).send('false');console.log('false');});
  }
  catch(e){
    res.status(200).send('false');
  }
}
