const Product = require('../models/order');
const User = require('../models/user');
const Order = require('../models/order');

module.exports.makeOrder = (req, res) => {
  const items = req.body;
  const userId = req.user._id;
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
      })
        .then((order) => {
          res.send(order);
        })
        .catch((err) => {
          res.send(err);
        });
    });
  console.log(items);
  console.log(userId);
  console.log('llegaron los pedidos');
};
