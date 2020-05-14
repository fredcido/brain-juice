const debug = require('debug')('backend:socket');
const socket = require('socket.io');

const register = (http) => {
  const io = socket(http);

  io.on('connection', (socket) => {
    debug('new connection received');
  });
};

module.exports = {
  register,
}