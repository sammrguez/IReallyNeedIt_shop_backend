const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports.createUser = (req, res) => {
  console.log(req.body);
  const { name, email, googleId } = req.body;
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
};
