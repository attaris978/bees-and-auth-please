require('dotenv');
const users = require('../users/model');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET || 'Keep it secret! Keep it safe!'

const restricted = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) res.status(401).json({message: "Token required"});
  else jwt.verify(token, secret, (err, data) => {
    if (err) res.status(401).json({message: "Token invalid"})
    else {
      req.body = {data, ...req.body};
      next()  
    }
  })  
}

const only = role_name => (req, res, next) => {
  if (req.body.role_name !== role_name) res.status(403).json({message: "This is not for you"})
  else if (req.body) next()  
}

const checkUsernameExists = (req, res, next) => {
  const {username} = req.body
  users.findBy({username})
  .then(user => user.length > 0 ? next() : res.status(401).json({message: "Invalid credentials"}))
  .catch(err => res.status(500).json(err))  
}


const validateRoleName = (req, res, next) => {
  const role = req.body.role_name ? req.body.role_name.trim() : null;
  if (role === "admin") res.status(422).json({message: "Role name can not be admin"});
  else if (role?.length > 32) res.status(422).json({message: "Role name can not be longer than 32 chars"});
  else if (!role) {
    req.body.role_name = "student";
    next();
  }
  else {
    req.body.role_name = role;
    next();
  }
}

module.exports = {
  restricted,
  checkUsernameExists,
  validateRoleName,
  only,
}