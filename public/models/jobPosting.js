const mongoose = require("mongoose");

const JobPostingSchema = new mongoose.Schema({
    url: {type: String, required: true, unique: true},
    job_title: { type: String, required: true},
    company_name: { type: String, required: true},
    job_summary: { type: String, required: true },
    location: {type: String},
    date_posted: { type: String},
    salary: {type: String}
});

module.exports = mongoose.model("JobPosting", JobPostingSchema);