const router = require("express").Router();
const {
  getProducts,
  getPromoProduct,
  getProduct,
} = require("../controllers/products");

router.get("/productos", getProducts);
router.get("/", getPromoProduct);
router.get("/productos/:id", getProduct);

module.exports = router;
