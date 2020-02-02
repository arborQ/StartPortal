const { Router } = require('express');
const login = require('./login');
const cars = require('./cars');
const router = Router();

router.use('/login', login);
router.use('/cars', cars);

module.exports = router;
