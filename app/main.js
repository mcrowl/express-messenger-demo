'use strict';

const app = require('express')();
const bunyan = require('bunyan');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const userController = require('./controllers/randomUser');
const chatAppController = require('./controllers/chatApp');


let logger = setupLogger();

function setupLogger() {
  return bunyan.createLogger({name: 'express-messenger-demo'});
}

function setupMiddleware (app) {

  app.use((req, res, next) => {
    res.io = io;
    next();
  });

}

function setupRoutes(app) {

  //default page - assigns a username and redirects to chat app
  app.get('/', (req, res) => {

    userController.getRandomUser(req, res);

  });

  //chat app with username
  app.get('/chat/:user', (req, res) => {

    res.io.emit('message', `User ${req.params.user} has joined`);

    chatAppController.getChatApp(req, res);

  });

  // healthcheck
  app.get('/status', (req, res) => {

    return res.send('YESOK').status(200);

  });

}

function setupSocketIO(io) {

  io.on('connection', (socket) => {
    logger.info(`User ${socket.id} connected.`); // eslint-disable-line
    socket.on('disconnect', () => {
      logger.info(`User ${socket.id} disconnected.`); // eslint-disable-line
    });

    socket.on('message', (message) => {
      logger.info(`message: ${message}`); // eslint-disable-line
      io.emit('message', message);
    });

  });

}

//start server
function startServer(port) {

  setupMiddleware(app);
  setupRoutes(app);
  setupSocketIO(io);

  http.listen(port, () => {
    logger.info(`App started on localhost:${port}`); // eslint-disable-line
  });

}

module.exports = {
  startServer
};

