//This is the index route file, which exports all routes that we will be using
const express = require("express");
const router = express.Router();

// Import route modules
const brightDataRoutes = require("./brightData");
const authRoutes = require("./auth");
const userRoutes = require("./user");
const jobRoutes = require("./jobRoutes"); // added 04/04 for job data

//Import index controller
const indexController=require("../controllers/index");

// Use the routes and apply prefixes
router.use("/api/brightdata/", brightDataRoutes);
router.use("/auth",authRoutes);
router.use('/db', userRoutes)
router.use("/api/jobs", jobRoutes);

//Handles webpage entry routing
router.get("/",indexController.index)

module.exports = router;