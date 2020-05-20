import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import LinearProgress from '@material-ui/core/LinearProgress';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from "react-router-dom";

import Card from '../../components/Card';
import * as service from '../../services/game';

export default function GameEnter() {
  const history = useHistory();
  const [data, setData] = useState({ code: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (event: React.SyntheticEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    setData({ ...data, [name]: value })
  }

  const handleFormSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!data.code) return;

    setIsSaving(true);
    service.get(data.code).then(game => {
      setIsSaving(false);
      history.push(`/game/${game.id}`);
    }).catch(() => {
      setIsSaving(false);
      setError(`No game found with the code ${data.code}`);
    })
  };

  return (
    <Card title="Enter into an existing game">
      <form noValidate onSubmit={handleFormSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="code"
          label="Game code"
          name="code"
          error={!Boolean(data.code)}
          value={data.code}
          onChange={handleInputChange}
          autoFocus
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={isSaving}
        >
          Enter game
        </Button>
        {error && (
          <Alert severity="error" className="mt-3">
            {error}
          </Alert>
        )}
        {isSaving && <LinearProgress variant="query" />}
      </form>
    </Card>
  );
}
