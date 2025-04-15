//This is the index route file, which exports all routes that we will be using
const express = require("express");
const router = express.Router();

// Import route modules
const brightDataRoutes = require("./brightData");
const deepseekRoutes = require('./deepseek')
const authRoutes = require("./auth");
const userRoutes = require("./user");

//Import index controller
const indexController=require("../controllers/index");

// Use the routes and apply prefixes
router.use("/api/brightdata", brightDataRoutes);
router.use('/api/deepseek',deepseekRoutes)
router.use("/auth",authRoutes);
router.use('/db', userRoutes)

//Page routing
router.get("/",indexController.index)

router.get("/create",indexController.create)

router.get("/home",indexController.home)

router.get("/resume",indexController.resume)

router.get("/analytics",indexController.analytics)

router.get("/profile",indexController.profile)

router.get('/login',indexController.login)

module.exports = router;