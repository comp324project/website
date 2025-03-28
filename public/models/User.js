const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },
  googleId: {type: String, required: false, sparse:true, unique: true}
}, { timestamps: true }); //This enables Mongo-side creation and update timestamps -> SUPER USEFUL);

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

module.exports = mongoose.model('User', userSchema);

// Prevent OverwriteModelError
//const User = mongoose.models.User || mongoose.model("User", UserSchema);