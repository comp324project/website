const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

//Serve html, css and js files
app.use(express.static('public/html'));
app.use('/css', express.static('public/css'));
app.use('/js', express.static('public/js'));


server.listen(PORT, () => {
    console.log('Listening on port ' + PORT + '...');
});