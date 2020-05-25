const jwt = require('jsonwebtoken');
const secret = require('../secret');
const action = require('../action/action');

module.exports = (req, res, next) => {
  /*try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, secret);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }*/
  const token = req.headers.authorization.split(' ')[1];
  action.isAuthenticatedOnServer(token)
  .then(
    connected => {
      if(connected){
        next();
      }
    }
  )
  .catch(
    error => res.status(401).json("Unallowed request ! <= " + error)
  )
};
