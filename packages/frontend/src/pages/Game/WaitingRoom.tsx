import React from 'react';
import { Typography, Button } from '@material-ui/core';

export interface WaitingRoomProps {
  onStartGame: () => void,
  canStart: boolean;
}

const WaitingRoom: React.FunctionComponent<WaitingRoomProps> = ({ onStartGame, canStart }) => {
  const link = window.location.href;
  return (
    <>
      <Typography variant="h5">We are waiting for the players to join</Typography>
      <p>
        <img src="/imgs/cat.gif" alt="Cat gif" />
      </p>
      <p>
        You can share this link with your friends to join <b>{link}</b>
      </p>
      <p>
        <Button
          type="button"
          fullWidth
          variant="contained"
          color="primary"
          disabled={canStart}
          onClick={onStartGame}
        >
          Start the game
          </Button>
      </p>
    </>
  );
}

export default WaitingRoom;
