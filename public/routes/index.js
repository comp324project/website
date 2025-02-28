//This is the index route file, which exports all routes that we will be using
const express = require("express");
const router = express.Router();

// Import route modules
const linkedinRoutes = require("./brightData");
const authRoutes = require("./auth");
const mongoRoutes = require("./mongo");
const userRoutes = require("./user");

// Use the routes and apply prefixes
router.use(linkedinRoutes);
router.use(authRoutes);
router.use("/db", mongoRoutes);
router.use('/db', userRoutes)

module.exports = router;