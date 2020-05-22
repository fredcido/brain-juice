const debug = require('debug')('backend:socket:handlers');
const shortid = require('shortid');
const { getRepository } = require('../db');

const { EVENTS } = require('./constants');

const gamesRepo = getRepository('games');
const playersRepo = getRepository('players');

const init = (io) => {
  const onJoin = (socket) => async (data) => {
    try {
      debug('new player connected', data);
      const { game, player } = data;

      socket.join(game.id);

      player.socket_id = socket.id;
      player.game_id = game.id;
      player.status = 'connected';
      if (!player.id) {
        player.id = shortid.generate();
      }

      // If player already exists
      try {
        await playersRepo.get(player.id);
        player.status = 'connected';
        debug('Player already connected', player);
        await playersRepo.edit(player.id, player);
      } catch (e) {
        await playersRepo.add(player);
        debug('Player created', player);
      }

      const players = await playersRepo.getBy({ game_id: game.id });

      socket.to(game.id).emit(EVENTS.PLAYER_CONNECT, player);
      socket.emit(EVENTS.PLAYERS, players);

      debug('Players', players);
    } catch (error) {
      debug('Error when player joined', error);
    }
  };

  const onGameStart = (socket) => (game) => {
    debug('Game has started', game);
    io.to(game.id).emit(EVENTS.GAME_START);
  };

  const onDisconnect = (socket) => async () => {
    try {
      debug('client disconnected', socket.id);

      const players = await playersRepo.getBy({ socket_id: socket.id });

      for (let player of players) {
        io.to(player.game_id).emit(EVENTS.PLAYER_DISCONNECT, { id: socket.id });
        player.status = 'disconnected';
        await playersRepo.edit(player.id, player);
      }
    } catch (error) {
      debug('Error when player left room', error);
    }
  };

  return {
    onJoin,
    onGameStart,
    onDisconnect,
  };
};

module.exports = init;
