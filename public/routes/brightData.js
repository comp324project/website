const express = require("express");
const router = express.Router();
const linkedinController = require("../controllers/linkedinScraperController");

// Route to trigger Bright Data Linkedin Scraper API request
router.post("/linkedin/trigger", linkedinController.triggerLinkedInScrape);

module.exports = router;
