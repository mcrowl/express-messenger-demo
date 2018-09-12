'use strict';

let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);
const path = require('path');

const APP_PORT = process.env.PORT || 3000;


//default page
app.get('/', (req, res) => {

  res.sendFile(path.resolve(__dirname + '/../static/index.html'));

});

// healthcheck
app.get('/status', (req, res) => {

  return res.send('YESOK').status(200);

});

io.on('connection', (socket) => {
  console.log('User connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('message', (message) => {
    console.log(`message: ${message}`);
    io.emit('message', message);
  });
});


//start server
function startServer(port) {

  http.listen(port, () => {
    console.log(`App started on localhost:${port}`);
  });

}

startServer(APP_PORT);
