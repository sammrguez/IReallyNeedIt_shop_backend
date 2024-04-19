const router = require('express').Router();
const auth = require('../middleware/auth');
const {
  createUserAndLogin,
  addDirection,
  userData,
} = require('../controllers/users');

router.post('/registro', createUserAndLogin);
router.get('/pago', addDirection);
router.get('/users/me', auth, userData);

module.exports = router;
