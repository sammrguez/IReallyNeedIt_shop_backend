const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const addressSchema = new mongoose.Schema({
  street: {
    required: true,
    type: String,
  },
  exteriorNumber: {
    required: true,
    type: String,
  },
  interiorNumber: {
    required: false,
    type: String,
  },
  postalCode: {
    minlength: 4,
    maxlength: 6,
    required: true,
    type: Number,
  },
  municipality: {
    required: true,
    type: String,
  },
  neighborhood: {
    required: true,
    type: String,
  },
  state: {
    required: true,
    type: String,
  },
  specialInstructions: {
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
    select: false,
  },
  address: {
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
