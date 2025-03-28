const express = require("express");
const router = express.Router();
const linkedinController = require("../controllers/linkedinScraperController");
const indeedController = require("../controllers/indeedScraperController");

// Route to trigger Bright Data Linkedin Scraper API request
router.post("/linkedin/trigger", linkedinController.triggerLinkedInScrape,linkedinController.monitorProgress,linkedinController.getJobPost);
//Route to trigger Bright Data Indeed Scraper API request
router.post("/indeed/trigger", indeedController.triggerIndeedScrape,indeedController.monitorProgress,indeedController.getJobPost);

module.exports = router;
