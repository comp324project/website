const { configDotenv } = require('dotenv');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

//dotenv.config();

//Serve html, css and js files
app.use(express.static('public/html'));
app.use('/css', express.static('public/css'));
app.use('/js', express.static('public/js'));
app.use('/routes', express.static('public/routes'));

// Middleware to parse json
app.use(express.json());

// API Routes
const bdroutes = require("./public/routes/brightDataRoutes");
app.use("/api", bdroutes);

// Webhook Routes
const webhookRoutes = require("./public/routes/webhookRoutes");
app.use("/webhook", webhookRoutes); 

server.listen(PORT, () => {
    console.log('Listening on port ' + PORT + '...');
});