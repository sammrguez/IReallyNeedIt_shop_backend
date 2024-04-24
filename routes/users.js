const router = require('express').Router();
const auth = require('../middleware/auth');
const {
  createUserAndLogin,
  addAddress,
  userData,
} = require('../controllers/users');

router.post('/registro', createUserAndLogin);
router.get('/users/me', auth, userData);
router.patch('/users/me/address', auth, addAddress);

module.exports = router;
