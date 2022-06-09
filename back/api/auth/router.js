require('dotenv');
const router = require("express").Router();
const { checkUsernameExists, validateRoleName } = require('./middleware');
const users = require('../users/model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secret = process.env.SECRET || 'Keep it secret! Keep it safe!'

router.post("/register", validateRoleName, (req, res, next) => {
  req.body.password = bcrypt.hashSync(req.body.password,4);
  users.add(req.body)
  .then(user => res.status(201).json(user))
  .catch( err => next(err))  
});


router.post("/login", checkUsernameExists, (req, res, next) => {
  let {username, password} = req.body;
  users.findBy({username})
  .first()
  .then(user => {
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      
      res.status(200)
      .json({
        message: `${user.username} is back!`,
        token
      })
    } else {
      res.status(401).json({message: 'Invalid Credentials'})
    }
  })
  .catch(err => next(err))    
});

function generateToken(user) {
  const claims = {
    subject: user.user_id,    
    username: user.username,
    role_name: user.role_name,
    iat: Date.now()
  };
  const options = {
    expiresIn: '1d'
  };
  return jwt.sign(claims, secret, options);
}

module.exports = router;
