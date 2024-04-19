const router = require('express').Router();
const { createUserAndLogin, addDirection } = require('../controllers/users');

router.post('/registro', createUserAndLogin);
router.post('/pago', addDirection);

module.exports = router;
