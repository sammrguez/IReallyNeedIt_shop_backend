const shortid = require('shortid');
const User = require('../models/user');
const Order = require('../models/order');

module.exports.makeOrder = (req, res) => {
  const items = req.body;
  const userId = req.user._id;
  const trackId = shortid.generate();
  User.findById(userId)
    // .orFail((error) => {
    //   error.statusCode = 404;
    //   throw error;
    // })
    .then((user) => {
      Order.create({
        items: items,
        user: user,
        ShippingAddress: user.address,
        trackId: trackId,
      })
        .then((order) => {
          res.status(200).json({
            trackId: trackId,
          });
        })
        .catch((err) => {
          res.status(500).json({ error: 'Error al crear la orden' });
        });
    })
    .catch((err) => {
      res
        .status(err.statusCode || 500)
        .json({ error: err.message || 'Error interno del servidor' });
    });
};
