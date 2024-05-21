
const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');
const loginMiddleware = require('../middlewares/auth');

module.exports = router;

router.use(loginMiddleware.authenticateToken);

router.get('/me', userController.me);