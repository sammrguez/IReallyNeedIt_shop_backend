const router = require('express').Router();
const { getProducts, getPromoProduct } = require('../controllers/products');

router.get('/productos', getProducts);
router.get('/', getPromoProduct);

module.exports = router;
