//This is the index route file, which exports all routes that we will be using
const express = require("express");
const router = express.Router();

// Import route modules
const linkedinRoutes = require("./brightData");
const authRoutes = require("./auth");
const userRoutes = require("./user");

//Import index controller
const indexController=require("../controllers/index");

// Use the routes and apply prefixes
router.use("/api", linkedinRoutes);
router.use("/auth",authRoutes);
router.use('/db', userRoutes)

//Handles webpage entry routing
router.get("/",indexController.index)

module.exports = router;