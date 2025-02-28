const express = require("express");
const { registerUser } = require("../controllers/auth");

const router = express.Router();

// Signup Route
router.post("/signup", registerUser);

module.exports = router;