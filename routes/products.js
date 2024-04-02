const router = require('express').Router();
const { getProducts } = require('../controllers/products');

router.get('/productos', getProducts);

module.exports = router;
