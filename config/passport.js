const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../public/models/user');

// Local Strategy for username/password authentication
passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return done(null, false, { message: 'Incorrect username or password.' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return done(null, false, { message: 'Incorrect username or password.' });
    }

    // Authentication successful
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});