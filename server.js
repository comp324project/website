require('dotenv').config(); //Allows use of environmental variables for API tokens/protected data
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const PORT = process.env.PORT;
const routes = require("./public/routes/index")

// Middleware to parse json
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//Serve html, css and js files
app.use(express.static('public/html'));
app.use('/css', express.static('public/css'));
app.use('/js', express.static('public/js'));



//Register routes
app.use("/api", routes);

server.listen(PORT, () => {
    console.log('Listening on port ' + PORT + '...');
});