
// Resource from Dr. Hayward:
// https://www.npmjs.com/package/keyword-extractor

// keyword extractor test for historical data
require('dotenv').config();
const { connectDB, disconnectDB } = require('../../config/mongo');
const Job = require('../models/jobSchema');
const keyword_extractor = require('keyword-extractor');

// connect to db, fetch jobs, loop and get keywords, log result to console
const testKeywordExtractor = async () => {
  try {
    await connectDB();
    console.log('Connected to MongoDB.');

    // fetch jobs ... limit 5 for testing
    const jobs = await Job.find({}).limit(5);

    for (const job of jobs) {
      const description = job.description || '';
      
      const keywords = keyword_extractor.extract(description, {
        language: "english",
        remove_digits: true,
        return_changed_case: true,
        remove_duplicates: false
      });
      const filteredSkills = keywords.filter(word => knownSkills.includes(word));

      console.log(`\nJob Title: ${job.title}`);
      console.log(`Extracted filtered Keywords:`, filteredSkills);
    }
    
  } catch (error) {
    console.error('Error during keyword extraction test:', error.message);
  } finally {
    await disconnectDB();
    console.log('Disconnected from MongoDB.');
  }
};

testKeywordExtractor();
