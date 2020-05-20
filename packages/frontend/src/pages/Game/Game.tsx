import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { ListItem, ListItemText, Divider, List, ListItemIcon, Typography } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { useParams } from "react-router";
import io from 'socket.io-client';

import Player from '../../models/Player';
import Game from '../../models/Game';
import useStyles from './style';
import * as service from '../../services/game';
import WaitingRoom from './WaitingRoom';
import GameRoom from './GameRoom';

const EVENTS = {
  PLAYER_CONNECT: 'player-connected',
  PLAYERS: 'players',
  JOIN: 'join',
  GAME_START: 'game-start',
};

// TODO Consume global config
const url = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://mind-juice.herokuapp.com/'

const socket = io(url);

const GameMain: React.SFC = () => {
  const classes = useStyles();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [game, setGame] = useState<Partial<Game>>({});
  const [player, setPlayer] = useState('');

  useEffect(() => {
    setIsLoading(true);

    // All players
    socket.on(EVENTS.PLAYERS, (players: Player[]) => {
      console.log('Players connected', players);
      setPlayers(players);
    })

    // New player connected
    socket.on(EVENTS.PLAYER_CONNECT, (p: Player) => {
      console.log('New player connected');
      setPlayers(players => [...players, p]);
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
    const link = window.location.href;

    return (
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Typography variant="h5">
            {game.name}
          </Typography>
          <List>
            {players.map(player => (
              <React.Fragment key={player.name}>
                <ListItem button>
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
