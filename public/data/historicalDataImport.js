const fs = require('fs');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Job = require('../config/jobSchema'); 

dotenv.config(); 

// connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB for data import'))
  .catch((err) => console.error('Error connecting to MongoDB', err));

const results = [];

// Read CSV file
fs.createReadStream(path.join(__dirname, 'jobs_cleaned_02-26.csv'))
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', async () => {
    try {
      for (const job of results) {
        const newJob = new Job(job); // Create a new job document from the data
        await newJob.save(); // Save the document to MongoDB
      }
      console.log('Historical job data imported successfully');
    } catch (err) {
      console.error('Error importing job data', err);
    } finally {
      mongoose.connection.close(); // Close the MongoDB connection
    }
  });