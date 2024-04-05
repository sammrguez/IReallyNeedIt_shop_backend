const Product = require('../models/product');

module.exports.getProducts = (req, res) => {
  Product.find({})
    .orFail()
    .then((products) => {
      res.send(products);
    });
};

module.exports.getPromoProduct = (req, res) => {
  Product.findOne({
    isPromo: true,
  })
    .orFail()
    .then((product) => {
      res.send(product);
    });
};
