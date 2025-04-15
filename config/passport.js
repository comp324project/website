const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../public/models/User');

// Local Strategy for username/password authentication
passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    //find user by username
    const cursor = User.find({ username: username }).batchSize(10); // Create a cursor with a batch size of 10
    const user = await cursor.next; // Retrieve the first document from the cursor

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

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
  clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/google/callback',
},
async (accessToken, refreshToken, profile, done) => { // Use async here
  try {
    // Use await to find the user
    let user = await User.findOne({ googleId: profile.id });

    if (!user) {
      //If user does not have a google id (first time OAuth login), look up associated email
      const email = profile.emails[0].value; // Get the first email
      user = await User.findOne({ email: email });
      if (user){//If email is found, set googleId to profile.id
        user.googleId = profile.id;
        await user.save();
        return done(null, user);
      }
      // Create a new user if one doesn't exist
      const newUser = new User({
        googleId: profile.id,
        username: profile.displayName,
        email: email,
      });

      // Save the new user
      await newUser.save();
      return done(null, newUser);
    } else {
      // If the user exists, return the user
      return done(null, user);
    }
  } catch (err) {
    // Handle any errors
    return done(err);
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