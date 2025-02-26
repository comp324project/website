const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('../config/jobSchema'); 
const path = require('path');
const filePath = path.join(__dirname, 'jobs_cleaned_02-26.csv');


dotenv.config(); 

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB for data import'))
  .catch((err) => console.error('Error connecting to MongoDB', err));

const results = [];

// Read CSV file
fs.createReadStream(filePath)
  .pipe(csv())
  .on('data', (data) => {
    console.log('Reading data row:', data);  // Log each row of data being read
    results.push(data);
  })
  .on('end', async () => {
    try {
      for (const job of results) {
        const newJob = new Job(job); 
        await newJob.save(); 
      }
      console.log('Historical job data imported successfully');
    } catch (err) {
      console.error('Error importing job data', err);
    } finally {
      mongoose.connection.close(); 
    }
  });