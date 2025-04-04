// route for getting data from mongo
// routes/job-routes.js
const express = require('express');
const Job = require('../models/jobSchema');  // Job model
const router = express.Router();

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();  // Get all job documents from DB
    res.json(jobs);  // Send jobs as JSON response
  } catch (error) {
    res.status(500).json({ message: error.message });  // error handling
  }
});

module.exports = router;