const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;


app.use(express.static('public/html'));


server.listen(PORT, () => {
    console.log('Listening on port ' + PORT + '...');
});