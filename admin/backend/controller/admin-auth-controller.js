const User = require('../data-schematic/user-schematic');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secret = require('../secret');

exports.login = (req, res, next) => {
    User.findOne({firstname: req.body.username, type: {$gte:1}})
    .then(usr => {
      if(!usr){
        return res.status(401).json({error: "Utilisateur inexistant ou Mot de passe incorrect."});
      }
      bcrypt.compare(req.body.password, usr.password)
      .then(
        valid => {
          if(!valid) {
            return res.status(401).json({error: "Utilisateur inexistant ou Mot de passe incorrect."});
          }
          res.status(200).json(
            {
            userId: usr._id,
            token: jwt.sign(
              {userId: usr._id},
              secret,
              { expiresIn: '24h'}
            )}
          );
        }
      )
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
        type: req.body.type
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
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    hash: req.body.hash,
    type: 0,
    performedTime: req.body.performedTime,
    weekId: req.body.weekId
  });
  usr.save()
  .then(() => res.status(201).json({ message: 'Utilisateur enregistré'}))
  .catch(error => res.status(400).json({error}));
}

exports.verifyToken = (req, res, next) => {
  try{
    verifiedJwt = jwt.verify(req.params.token, secret);
    let userId = verifiedJwt.userId;
    User.findOne({_id: userId, type:{$gte:1}})
    .then(user => {
      if(user){
        res.status(200).send('true');
      }
      else{
        res.status(400).send('false');
      }
    })
    .catch(
      error => res.status(200).send('false')
    );
  }
  catch(e){
    res.status(200).send('false');
  }
}

exports.verifyAdminToken = (req, res, next) => {
  try{
    verifiedJwt = jwt.verify(req.params.token, secret);
    let userId = verifiedJwt.userId;
    User.findOne({_id: userId, type:2})
    .then(user => {
      if(user){
        res.status(200).send('true');
      }
      else{
        res.status(400).send('false');
      }
    })
    .catch(
      error => res.status(200).send('false')
    );
  }
  catch(e){
    res.status(200).send('false');
  }
}

exports.updatePassword = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, secret);
    const userId = decodedToken.userId;
    console.log(userId);
    bcrypt.hash(req.body.password, 10)
    .then(hashedPassword => {
      return User.findOneAndUpdate({_id:userId},{$set:{password: hashedPassword}});
    })
    .then(() => res.status(200).json("Mot de passe changé avec succès"))
    .catch(error => res.status(500).json("Impossible de mettre le mot de passe à jour dans la base de donnée <= " + error));
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
}
