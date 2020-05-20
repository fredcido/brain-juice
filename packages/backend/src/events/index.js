const debug = require('debug')('backend:socket');
const socket = require('socket.io');

const EVENTS = {
  CONNECTION: 'connection',
  DISCONNECT: 'disconnect',
  JOIN: 'join',
  LEAVE: 'leave',
  PLAYER_CONNECT: 'player-connected',
  PLAYER_DISCONNECT: 'player-disconnected',
  PLAYERS: 'players',
  GAME_START: 'game-start',
};

const register = (http) => {
  const io = socket(http);

  const games = {};

  const onJoin = (socket) => (data) => {
    debug('new player connected', data);
    const { game, player } = data;

    socket.join(game.id);
    player.id = socket.id;

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
  };

  const onGameStart = (socket) => (game) => {
    debug('Game has started', game);
    io.to(game.id).emit(EVENTS.GAME_START);
  };

  const onDisconnect = (socket) => () => {
    debug('client disconnected', socket.id);

    for (let gameId in games) {
      games[gameId].players.filter((p) => {
        if (p.id === socket.id) {
          io.to(gameId).emit(EVENTS.PLAYER_DISCONNECT, { id: socket.id });
          return false;
        }
        return true;
      });
    }
  };

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
