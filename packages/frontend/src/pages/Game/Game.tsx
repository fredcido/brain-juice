import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { ListItem, ListItemText, Divider, List, ListItemIcon, Typography } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { useParams } from "react-router";
import io from 'socket.io-client';

import config from '../../helpers/config';
import Player from '../../models/Player';
import Game from '../../models/Game';
import useStyles from './style';
import * as service from '../../services/game';
import WaitingRoom from './WaitingRoom';
import GameRoom from './GameRoom';

const EVENTS = {
  PLAYER_CONNECT: 'player-connected',
  PLAYER_DISCONNECT: 'player-disconnected',
  PLAYERS: 'players',
  JOIN: 'join',
  LEAVE: 'leave',
  GAME_START: 'game-start',
};

const socket = io(config.BASE_URL);

const GameMain: React.SFC = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [game, setGame] = useState<Partial<Game>>({});
  const [name, setPlayer] = useState('');

  useEffect(() => {
    setIsLoading(true);

    // All players
    socket.on(EVENTS.PLAYERS, (players: Player[]) => {
      console.log('Players connected', players);
      setPlayers(players);
    })

    // New player connected
    socket.on(EVENTS.PLAYER_CONNECT, (p: Player) => {
      setPlayers(players => [...players, p]);
    });

    // Player disconnected
    socket.on(EVENTS.PLAYER_DISCONNECT, (p: Player) => {
      console.log('Player disconnected', p);
      setPlayers(players => players.filter(player => player.id !== p.id));
    });

    // Game has started
    socket.on(EVENTS.GAME_START, () => {
      console.log('Game has started');
      setIsGameStarted(true);
    });

    service.get(id).then(game => {
      setIsLoading(false);
      setGame(game);

      const name = 'Player ' + (new Date()).getTime();
      setPlayer(name);

      // Inform backend of player connected
      socket.emit(EVENTS.JOIN, {
        game,
        player: {
          name,
        }
      });

    }).catch(() => {
      setIsLoading(false);
    })
  }, [id]);

  function handleGameStart() {
    socket.emit(EVENTS.GAME_START, game);
  };

  const Room = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Typography variant="h5" className="p-5">
            {game.name}
          </Typography>
          <List>
            {players.map(player => (
              <React.Fragment key={player.name}>
                <ListItem button disabled={player.name === name}>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary={player.name} />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Grid>
        <Grid item xs={9} className={classes.gameContainer}>
          {isGameStarted ? <GameRoom /> : <WaitingRoom onStartGame={handleGameStart} canStart={players.length < 2} />}
        </Grid>
      </Grid>
    );
  };

  return (
    <div className={classes.root}>
      {isLoading || <Room />}
    </div>
  );
}

export default GameMain;
