const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports.createUser = (req, res) => {
  console.log(req.body);
  const { name, email, googleId } = req.body;
  return bcrypt
    .hash(googleId, 10)
    .then((hash) => {
      User.create({
        name,
        email,
        hashedGoogleId: hash,
      });
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      res.send(err);
    });
};
