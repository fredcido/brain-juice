const debug = require('debug')('backend:socket');
const socket = require('socket.io');

const EVENTS = {
  CONNECTION: 'connection',
  JOIN: 'join',
  PLAYER_CONNECT: 'player-connected',
  PLAYERS: 'players',
  GAME_START: 'game-start'
};

const register = (http) => {
  const io = socket(http);

  const games = {};

  const onJoin = socket => (data) => {
    debug('new player connected', data);
    const { game, player } = data;

    socket.join(game.id);

    if (!games[game.id]) {
      games[game.id] = {
        game,
        players: [],
      };
    }

    games[game.id].players = [...games[game.id].players, player];

    socket.to(game.id).emit(EVENTS.PLAYER_CONNECT, player);
    socket.emit(EVENTS.PLAYERS, games[game.id].players);

    debug('Players', games[game.id]);
  }

  const onGameStart = socket => (game) => {
    debug('Game has started', game);
    io.to(game.id).emit(EVENTS.GAME_START);
  };

  io.on(EVENTS.CONNECTION, (socket) => {
    debug('new connection received');

    socket.on(EVENTS.JOIN, onJoin(socket));
    socket.on(EVENTS.GAME_START, onGameStart(socket));
  });
};

module.exports = {
  register,
};
