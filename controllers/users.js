const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { NODE_ENV, JWT_SECRET } = process.env;
const {
  ERROR_CODE,
  NOT_FOUND_CODE,
  SERVER_ERROR_CODE,
  INVALID_DATA_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
} = require("../controllers/errors");

module.exports.createUserAndLogin = (req, res, next) => {
  const { name, email, googleId } = req.body;
  return User.findOne({ email })
    .select("+hashedGoogleId")
    .then((user) => {
      if (!user) {
        return bcrypt.hash(googleId, 10).then((hash) => {
          return User.create({
            name,
            email,
            hashedGoogleId: hash,
          })
            .then((user) => {
              const token = jwt.sign(
                { _id: user._id },
                NODE_ENV === "production"
                  ? JWT_SECRET
                  : "3199a1ee12430d5ea077aa8585caf1e8",
                {
                  expiresIn: "7d",
                }
              );
              res.status(200).json({ user, token });
            })

            .catch(next);
        });
      } else {
        return bcrypt
          .compare(googleId, user.hashedGoogleId)
          .then((matched) => {
            if (!matched) {
              throw new INVALID_DATA_ERROR_CODE("error al iniciar sesión");
            }
            return user;
          })
          .then((user) => {
            const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
              expiresIn: "7d",
            });
            res.status(200).json({ user, token });
          })
          .catch(next);
      }
    })
    .catch(next);
};

module.exports.userData = (req, res, next) => {
  const userId = req.user._id;
  if (!userId) {
    return SERVER_ERROR_CODE("ha habido un problema en el servidor");
  } else {
    User.findById(userId)
      .orFail()
      .then((user) => {
        res.send(user);
      })
      .catch(next);
  }
};

// lista de precios
const shippingRates = {
  CDMX: 120,
  Jalisco: 200,
  "Nuevo León": 210,
  Otros: 250,
};

//calcula el precio
function calcularEnvio(estado) {
  return shippingRates[estado] || shippingRates["Otros"];
}

module.exports.addAddress = (req, res, next) => {
  const address = req.body;
  const userId = req.user._id;

  if (!userId) {
    return res.status(401).send({ message: "no tienes authorizacion" });
  } else {
    User.findByIdAndUpdate(userId, { address: address }, { new: true })
      .then((user) => {
        const shippingCost = calcularEnvio(address.state);

        res.send({ user, shippingCost });
      })
      .catch(next);
  }
};
