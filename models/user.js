const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
