const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema
const jobSchema = new Schema({
  company_name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  job_posting_url: { type: String, required: true, unique: true } // unique identifier
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;