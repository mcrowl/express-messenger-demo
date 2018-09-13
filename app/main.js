'use strict';

const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const userController = require('./controllers/randomUser');
const chatAppController = require('./controllers/chatApp');

const APP_PORT = process.env.PORT || 3000;


app.use((req, res, next) => {
  res.io = io;
  next();
});

//default page
app.get('/', (req, res) => {

  userController.getRandomUser(req, res);

});

app.get('/chat/:user', (req, res) => {

  res.io.emit('message', `User ${req.params.user} has joined`);

  chatAppController.getChatApp(req, res);

});

// healthcheck
app.get('/status', (req, res) => {

  return res.send('YESOK').status(200);

});

io.on('connection', (socket) => {
  console.log(`User ${socket.id} connected.`);
  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected.`);
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
