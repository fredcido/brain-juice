const debug = require('debug')('backend:socket');
const socket = require('socket.io');
const init = require('./handlers');

const { EVENTS } = require('./constants');

const register = (http) => {
  const io = socket(http);
  const { onJoin, onGameStart, onDisconnect } = init(io);

  io.on(EVENTS.CONNECTION, (socket) => {
    debug('new connection received', socket.id);

    socket.on(EVENTS.JOIN, onJoin(socket));
    socket.on(EVENTS.GAME_START, onGameStart(socket));
    socket.on(EVENTS.DISCONNECT, onDisconnect(socket));
  });
};

module.exports = {
  register,
};
