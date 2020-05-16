import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from "react-router-dom";

import Card from '../../components/Card';
import useStyles from './style';
import * as service from '../../services/game';

export default function GameStart() {
  const history = useHistory();
  const classes = useStyles();
  const [data, setData] = useState({ name: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (event: React.SyntheticEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    setData({ ...data, [name]: value })
  }

  const handleFormSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!data.name) return;

    setIsSaving(true);

    service.add(data).then(game => {
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
          autoFocus
        />
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
