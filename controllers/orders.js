const shortid = require('shortid');
const User = require('../models/user');
const Order = require('../models/order');
const {
  ERROR_CODE,
  NOT_FOUND_CODE,
  SERVER_ERROR_CODE,
  INVALID_DATA_ERROR_CODE,
  UNAUTHORIZED_ERROR_CODE,
} = require('../controllers/errors');

module.exports.makeOrder = (req, res, next) => {
  const items = req.body;
  const userId = req.user._id;
  const trackId = shortid.generate();
  User.findById(userId)
    .orFail()
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
        .catch(next);
    })
    .catch(next);
};
