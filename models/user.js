const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const addressSchema = new mongoose.Schema({
  calle: {
    required: true,
    type: String,
  },
  noExterior: {
    required: true,
    type: String,
  },
  noInterior: {
    required: false,
    type: String,
  },
  postalcode: {
    minlength: 4,
    maxlength: 6,
    required: true,
    type: Number,
  },
  municipio: {
    required: true,
    type: String,
  },
  state: {
    required: true,
    type: String,
  },
  extraInfo: {
    required: false,
    type: String,
  },
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  hashedGoogleId: {
    type: String,
    required: true,
  },
  adress: {
    type: addressSchema,
    required: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  googleId
) {
  return this.findOne({ email }).then((user) => {
    if (user) {
      return bcrypt.compare(googleId, user.hashedGoogleId).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error('error al iniciar sesion'));
        }
        return user;
      });
    }
  });
};

module.exports = mongoose.model('user', userSchema);
