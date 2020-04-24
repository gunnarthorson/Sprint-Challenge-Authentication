const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require("../users/user-model.js");
const secrets = require('../api/secrets.js');

router.post('/register', (req, res) => {
  let user = req.body;
  const rounds = process.env.HASH_ROUNDS || 14;
  const hash = bcrypt.hashSync(user.password, rounds)
  user.password = hash;

  Users.add(user)
  .then(saved => {
      res.status(201).json(saved);
  })
  .catch(err => {
      console.log(err)
      res.status(500).json({errorMessage: err});
  });
})

router.post('/login', (req, res) => {
  let { username, password } = req.body;

    Users.findBy({ username })
    .then(([user]) => {

        if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);
       
            res.status(201).json({ message: 'Here is your token', token });
        } else {
            res.status(401).json({ message: 'REJECTED' });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: err.message });
    })
})

function generateToken(user) {
  const payload = {
      userId: user.id,
      username: user.username,
  };
  const secret = secrets.jwtSecret;
  const options = {
      expiresIn: '1d'
  };
  return jwt.sign(payload, secret, options);
}

module.exports = router;
