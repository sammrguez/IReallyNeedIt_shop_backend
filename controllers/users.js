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
module.exports.addDirection = (req, res) => {
  const { email, googleId } = req.body;
  console.log('desde add direction');
  res.send(email);
};

module.exports.userData = (req, res) => {
  console.log('desde my profile');
  const userId = req.user._id;
  if (!userId) {
    return res.status(401).send({ message: 'no tienes authorizacion' });
  } else {
    User.findById(userId)
      .orFail(() => {
        const error = new UNAUTHORIZED_ERROR_CODE(
          'No tienes autorización para acceder a esta contenido'
        );
        error.statusCode = 404;
        throw error;
      })
      .then((user) => {
        res.send(user);
      });
  }
};
