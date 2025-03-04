require('dotenv').config(); //Allows use of environmental variables for API tokens/protected data
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const session = require('express-session');
const passport = require('passport');
const mongoStore = require('connect-mongo');
const PORT = process.env.PORT;


require('./config/passport'); // Import Passport configuration
const {connectDB, disconnectDB} = require("./config/mongo"); // Import DB connection
connectDB(); //Connect to DB

// Middleware to parse json
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//Serve html, css and js files
app.use(express.static('public/html'));
app.use('/css', express.static('public/css'));
app.use('/js', express.static('public/js'));

//Session initialization before route registration
app.use(
    session({
        secret:'Myles is awesome',//change for production
        saveUninitialized: false, //Do not save unmodified data to session store
        resave: false,
        store: mongoStore.create({ mongoUrl: process.env.MONGO_URI }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 3, //Miliseconds * Seconds * Minutes * Hours
            secure: true 
    }
}))

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

//Register routes
const routes = require("./public/routes/index");
app.use(routes);

server.listen(PORT, () => {
    console.log('Listening on port ' + PORT + '...');
});