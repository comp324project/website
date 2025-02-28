const express = require("express");
const { connectDB, disconnectDB } = require("../controllers/mongo");

const router = express.Router();

// Route to connect to MongoDB
router.get("/connect", connectDB);

// Route to disconnect from MongoDB
router.get("/disconnect", disconnectDB);

module.exports = router;
