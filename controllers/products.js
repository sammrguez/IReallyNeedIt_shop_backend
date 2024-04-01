const Product = require('../models/product');

module.exports.getProducts = (req, res) => {
  Product.find({})
    .orFail()
    .then((products) => {
      res.send(products);
    });
};
