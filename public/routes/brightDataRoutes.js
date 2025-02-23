const express = require("express");
const router = express.Router();
const { triggerLinkedInScrape, getJobPost } = require("../controllers/linkedinScraperController");

// Route to trigger Bright Data Linkedin Scraper API request
router.post("/brightdata/linkedin/trigger", triggerLinkedInScrape, getJobPost);

module.exports = router;
