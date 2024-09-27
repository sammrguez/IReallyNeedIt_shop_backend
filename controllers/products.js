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
  // console.log("desde server get product");
  // console.log(req.params);
  const productId = req.params.id;
  console.log(productId);
  Product.findById(productId)
    .orFail()
    .then((product) => {
      console.log(product);
      res.send(product);
    })
    .catch((err) => {
      res.status(404).send({ message: "Producto no existente" });
    });
};
