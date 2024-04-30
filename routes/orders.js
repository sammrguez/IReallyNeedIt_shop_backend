const router = require('express').Router();

const auth = require('../middleware/auth');

const { makeOrder } = require('../controllers/orders.js');

router.post('/orders/confirm', auth, makeOrder);

module.exports = router;
