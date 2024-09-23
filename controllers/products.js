const Product = require("../models/product");

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

module.exports.getProduct = (req, res) => {
  const productId = req.params.id;
  Product.findById(productId)
    .orFail()
    .then((product) => {
      res.send(product);
    })
    .catch((err) => {
      res.status(404).send({ message: "Producto no encontrado" });
    });
};
