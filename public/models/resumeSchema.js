const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema
const resumeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // FK relationship to user
  job: {type: Schema.Types.ObjectId, ref: 'Job', required: true}, // FK relationship to job 
  // name of the output or resume
  template_name: { type: String, required: true },
  content: {type: Object}, //Stored as JSON, converted to BSON on backend
  created_at: {type: Date, default: Date.now}
});

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;