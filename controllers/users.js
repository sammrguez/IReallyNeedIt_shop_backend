const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.createUserAndLogin = (req, res) => {
  console.log(req.body);
  const { name, email, googleId } = req.body;
  User.findOne({ email }).then((user) => {
    if (!user) {
      bcrypt
        .hash(googleId, 10)
        .then((hash) => {
          return User.create({
            name,
            email,
            hashedGoogleId: hash,
          });
        })
        .then((user) => {
          res.send(user);
        })
        .catch((err) => {
          res.send(err);
        });
    }
    {
      console.log('este user ya existe');
    }
  });
};

function login(req, res) {
  const { name, email, googleId } = req.body;
  User.findOne({ email }).then((user) => {
    if (!user) {
      bcrypt
        .hash(googleId, 10)
        .then((hash) => {
          return User.create({
            name,
            email,
            hashedGoogleId: hash,
          });
        })
        .then((user) => {
          res.send(user);
        })
        .catch((err) => {
          res.send(err);
        });
    }
    {
      return bcrypt.compare(googleId, user.hashedGoogleId);
    }
  });
}
