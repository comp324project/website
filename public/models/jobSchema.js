const mongoose = require('mongoose')


const { Schema } = mongoose;

// Schema
const jobSchema = new Schema({
  job_posting_url: {type: String, required: true, unique: true}, //If a duplicate url is saved to db, it will throw a duplicate key error
  company_name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  date_posted: { type: String},
  _id: { type: Schema.Types.ObjectId, auto: true }
}, {timestamps: true});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;