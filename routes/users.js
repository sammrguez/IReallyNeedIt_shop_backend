const router = require('express').Router();
const { createUserAndLogin } = require('../controllers/users');

router.post('/registro', createUserAndLogin);

module.exports = router;
