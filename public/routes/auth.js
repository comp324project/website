const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// User registration
router.post('/register', authController.registerUser);

// User login
router.post('/login', authController.loginUser);

module.exports = router;