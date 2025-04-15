const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  masterResume: {type: Object}, //Stored as JSON, converted to BSON on backend
  //GoogleID field for passport.js OAuth login
  googleId: {type: String, required: false, sparse:true, unique: true}

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

//Method to determine if user is authenticated with OAuth
userSchema.methods.isOAuthUser = function () {
  return !!this.googleId && !this.password; // Returns true if the user has a googleId and no password set
};

// Prevent OverwriteModelError from other model imports
const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;

