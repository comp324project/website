const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists.' });
    }

    // Create and save the new user
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

    // Log the user in (establish a session)
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error logging in' });
      }
      return res.status(200).json({ message: 'Login successful!', user });
    });
  })(req, res, next);
};