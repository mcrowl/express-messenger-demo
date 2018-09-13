'use strict';

const path = require('path');

function getChatApp(req, res) {

  return res.sendFile(path.resolve(__dirname + '/../../static/index.html'));

}

module.exports = {
  getChatApp
};
