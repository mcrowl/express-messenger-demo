'use strict';

const server = require('./main');

const APP_PORT = process.env.PORT || 3000;

server.startServer(APP_PORT);
