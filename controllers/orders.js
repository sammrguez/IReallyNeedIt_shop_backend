const shortid = require('shortid');
const User = require('../models/user');
const Order = require('../models/order');

module.exports.makeOrder = (req, res) => {
  const items = req.body;
  const userId = req.user._id;
  const trackId = shortid.generate();
  User.findById(userId)
    .orFail(() => {
      const error = new UNAUTHORIZED_ERROR_CODE(
        'No tienes autorización para acceder a esta contenido'
      );
      error.statusCode = 404;
      throw error;
    })
    .then((user) => {
      Order.create({
        items: items,
        user: user,
        trackId: trackId,
      })
        .then((order) => {
          res.status(200).json({
            trackId: trackId,
          });
        })
        .catch((err) => {
          res.send(err);
        });
    });
};
