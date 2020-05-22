import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';
import shortid from 'shortid';

import Card from '../../components/Card';
import GameStatus from '../../models/GameStatus';
import useStyles from './style';
import * as service from '../../services/game';
import { useLocalStorage } from '../../helpers/hooks';

const initialState = {
  name: '',
  player: '',
};

export default function GameStart() {
  const history = useHistory();
  const classes = useStyles();
  const [data, setData] = useState(initialState);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [, setPlayerId] = useLocalStorage('player_id');
  const [, setPlayerName] = useLocalStorage('player_name');

  const handleInputChange = (event: React.SyntheticEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    setData({ ...data, [name]: value })
  }

  const handleFormSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!data.name || !data.player) return;

    setIsSaving(true);

    const playerId = shortid.generate();
    setPlayerId(playerId);
    setPlayerName(data.player);

    const game = {
      name: data.name,
      status: GameStatus.PENDING,
      moderator: {
        name: data.player,
        id: playerId,
        joined: new Date()
      }
    };

    service.add(game).then(game => {
      setIsSaving(false);
      history.push(`/game/${game.id}`);
    }).catch(() => {
      setIsSaving(false);
      setError('There was something wrong when starting the game');
    })
  };

  return (
    <Card title="Starts a new game">
      <form className={classes.form} noValidate onSubmit={handleFormSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="player"
            label="Your name"
            name="player"
            error={!Boolean(data.player)}
            value={data.player}
            onChange={handleInputChange}
            autoFocus
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Game name"
            name="name"
            error={!Boolean(data.name)}
            value={data.name}
            onChange={handleInputChange}
          />
        </div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={isSaving}
        >
          Start game
        </Button>
        {error && (
          <Alert severity="error">
            {error}
          </Alert>
        )}
        {isSaving && <LinearProgress variant="query" />}
      </form>
    </Card>
  );
}
