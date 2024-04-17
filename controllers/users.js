const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = '3199a1ee12430d5ea077aa8585caf1e8';

module.exports.createUserAndLogin = (req, res) => {
  console.log(req.body);
  const { name, email, googleId } = req.body;
  return User.findOne({ email })
    .then((user) => {
      if (!user) {
        console.log('no hay user, se creara uno');

        return bcrypt.hash(googleId, 10).then((hash) => {
          return User.create({
            name,
            email,
            hashedGoogleId: hash,
          })
            .then((user) => {
              const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
                expiresIn: '7d',
              });
              res.status(200).json({ user, token });
            })
            .catch((err) => {
              res.send(err);
            });
        });
      } else {
        console.log('si hay user, se iniciara sesion');

        return bcrypt
          .compare(googleId, user.hashedGoogleId)
          .then((matched) => {
            if (!matched) {
              return Promise.reject(new Error('error al iniciar sesion'));
            }
            return user;
          })
          .then((user) => {
            const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
              expiresIn: '7d',
            });
            res.status(200).json({ user, token });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
  //   User.findOne({ email }).then((user) => {
  //     if (!user) {
  //       console.log('cayo en bloque crear user');
  //       bcrypt
  //         .hash(googleId, 10)
  //         .then((hash) => {
  //           return User.create({
  //             name,
  //             email,
  //             hashedGoogleId: hash,
  //           });
  //         })
  //         .then((user) => {
  //           res.send(user);
  //         })
  //         .catch((err) => {
  //           res.send(err);
  //         });
  //     } else {
  //       console.log('cayo en bloque iniciar sesion');
  //       const token = login(email, googleId);
  //       res.send(token);
  //     }
  //   });
};

function login(email, googleId) {
  return User.findUserByCredentials(email, googleId)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: '7d',
      });
      return token;
    })
    .catch((err) => {
      console.log(err);
    });
}
