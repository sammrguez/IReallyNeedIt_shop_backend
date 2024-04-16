const router = require('express').Router();
const { createUser } = require('../controllers/users');

router.post('/registro', createUser);

module.exports = router;
