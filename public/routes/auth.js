const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

// User registration
router.post('/register', authController.registerUser);

// User login
router.post('/login', authController.loginUser);

//Check Auth
router.get("/check-auth",authController.checkAuth);

router.get("/google/callback",authController.googleCallback, authController.googleCallbackSuccess);

module.exports = router;