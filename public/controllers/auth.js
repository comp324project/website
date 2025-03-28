const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if the username or email already exists
    const cursor = User.find({ $or: [{ username }, { email }] }).batchSize(10); // Create a cursor with a batch size of 10
    const firstUser = await cursor.next; // Retrieve the first document from the cursor
    

    if (firstUser) {
      return res.status(400).json({ error: 'Username or email already exists.' });
    }

    // Create and save the new user
    console.log("newUser");
    const newUser = new User({ username, email, password });
    await newUser.save();

    
    res.status(201).json({ message: 'User created successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
};

const passport = require('passport');

exports.loginUser = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ error: 'Error logging in' });
    }
    if (!user) {
      return res.status(401).json({ error: info.message });
    }
    if (user.isOAuthUser()) {
      return res.status(400).json({ message: 'Please log in with Google' });
    }

    // Log the user in (establish a session)
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error logging in' });
      }
      return res.status(200).json({ message: 'Login successful!', user });
    });
  })(req, res, next);
};

exports.checkAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.json({ authenticated: true, user: req.user });
  } else {
    res.json({ authenticated: false });
  }
};

//Callback middleware for Google OAuth
exports.googleCallback = (req, res, next) => {
  passport.authenticate('google', { failureRedirect: '/login' })(req, res, next);
};

exports.googleCallbackSuccess = (req, res) => {
  // Successful authentication, redirect to the user's profile page
  res.redirect('/master-resume.html');
};