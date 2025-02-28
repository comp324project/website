const express = require("express");
const router = express.Router();
const { triggerLinkedInScrape, monitorProgress, getJobPost } = require("../controllers/linkedinScraperController");

// Route to trigger Bright Data Linkedin Scraper API request
router.post("/linkedin/trigger", triggerLinkedInScrape, monitorProgress, getJobPost);

module.exports = router;
