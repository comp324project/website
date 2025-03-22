const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // masterResume containing arrays to store user input -- adrian added 03/22
  // not required bc input on separate form
  masterResume: { 
    skills: [{ type: String}],
    experience: [{type: String}],
    projects: [{type: String}],
    research: [{type: String}],
    volunteering: [{type: String}],
    education: [{type: String}],
    references: [{type: String}]
},
}, { timestamps: true }); //This enables Mongo-side creation and update timestamps -> SUPER USEFUL);

// comparePassword code: https://www.mongodb.com/blog/post/password-authentication-with-mongoose-part-1

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) { //Rehash password if it has been modified
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

// Prevent OverwriteModelError
//const User = mongoose.models.User || mongoose.model("User", UserSchema);