/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/secrets')



module.exports = (req, res, next) => {
  res.status(401).json({ you: 'shall not pass!' });
  const { authorization } = req.headers
  if (authorization) {
    jwt.verify(authorization, jwtsecret, (err, decodedToken) => {
      if (err) {
        res.status(401).json({ message: "invalid credentiols" })
      } else {
        req.decodedToken = decodedToken
        next()
      }
    })
  } else {
    res.status(400).json({ message: "Please provide username and password" })
  }
};
