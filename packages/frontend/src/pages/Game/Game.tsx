import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import {
  ListItem,
  ListItemText,  
  List,  
  ListItemAvatar,
  Typography,
  Avatar,
  ListSubheader
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import Skeleton from '@material-ui/lab/Skeleton';
import { useParams } from "react-router";
import io from 'socket.io-client';
import shortid from 'shortid';

import config from '../../helpers/config';
import Player from '../../models/Player';
import { useLocalStorage } from '../../helpers/hooks';
import Game from '../../models/Game';
import useStyles from './style';
import * as service from '../../services/game';
import WaitingRoom from './WaitingRoom';
import GameRules from './GameRules';
import GameWaiting from './GameWaiting';
import GameMagic from './GameMagic';

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
  const [game, setGame] = useState<Game>();
  const [currentPlayer, setPlayerId] = useLocalStorage('player_id');
  const [currentPlayerName, setPlayerName] = useLocalStorage('player_name');
  const [doesUnderstandRule, setUnderStandRules] = useLocalStorage('understand_rules');

  const canStartGame = () => {
    return players.length > 1 && amIThisPayer(game?.moderator);
  }

  const amIThisPayer = (player: Player | undefined) => {
    return player?.id === currentPlayer;
  }

  const sortByMe = (players: Player[]) => {
    const sortIt = (a: Player, b: Player) => {
      if (a.id === currentPlayer) {
        return -1;
      }

      if (b.id === currentPlayer) {
        return 1;
      }

      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();

      let comparison = 0;
      if (nameA > nameB) {
        comparison = 1;
      } else if (nameA < nameB) {
        comparison = -1;
      }
      return comparison;
    };

    return players.sort(sortIt);
  }

  const onUnderstandTheRule = () => {
    game && game.id && setUnderStandRules(game.id);
  }

  useEffect(() => {
    setIsLoading(true);

    console.log('currenPlayer', currentPlayer);
    if (!currentPlayer) {
      const newId = shortid.generate();
      setPlayerId(newId);
    }

    if (!currentPlayerName) {
      const name = 'Player ' + (new Date()).getTime();
      setPlayerName(name);
    }

    // Listen to all players
    socket.on(EVENTS.PLAYERS, (players: Player[]) => {
      console.log('Players connected', players);
      setPlayers(players);
    })

    // Listen to new player connected
    socket.on(EVENTS.PLAYER_CONNECT, (p: Player) => {
      setPlayers(players => [...players, p]);
    });

    // List to player disconnected
    socket.on(EVENTS.PLAYER_DISCONNECT, (p: Player) => {
      console.log('Player disconnected', p);
      setPlayers(players => players.filter(player => player.id !== p.id));
    });

    // Listen to game has started
    socket.on(EVENTS.GAME_START, () => {
      console.log('Game has started');
      setIsGameStarted(true);
    });

    service.get(id).then(game => {
      setIsLoading(false);
      setGame(game);

      // Inform backend of player connected
      socket.emit(EVENTS.JOIN, {
        game,
        player: {
          name: currentPlayerName,
          id: currentPlayer,
        }
      });

    }).catch(() => {
      // setIsLoading(false);
    })
  }, [id]);

  function handleGameStart() {
    socket.emit(EVENTS.GAME_START, game);
  }

  const Room = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <List component="nav"            
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                {isLoading ? <Skeleton variant="text" /> : <span>Game: {game?.name}</span>}
              </ListSubheader>
            }>
            {sortByMe(players).map(player => (
              <React.Fragment key={player.name}>
                <ListItem button disabled={amIThisPayer(player)}>
                  <ListItemAvatar>
                    <Avatar>{player.name.charAt(0).toUpperCase()}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={player.name} secondary={`#${player.id}`} />
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        </Grid>
        <Grid item xs={10} className={classes.gameContainer}>
          {isGameStarted ? <GameRules onUnderstandTheRule={onUnderstandTheRule} /> : <WaitingRoom onStartGame={handleGameStart} canStart={canStartGame()} />}
        </Grid>
      </Grid>
    );
  };

  if (doesUnderstandRule && doesUnderstandRule === game?.id) {
    return <GameMagic players={players} game={game} />;
  }

  return (
    <div className={classes.root}>
      {isLoading ? <GameWaiting /> : <Room />}
    </div>
  );
}

export default GameMain;
