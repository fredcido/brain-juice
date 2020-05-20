import React from 'react';
import { Typography, Button } from '@material-ui/core';

export interface WaitingRoomProps {
  onStartGame: () => void,
  canStart: boolean;
}

const WaitingRoom: React.FunctionComponent<WaitingRoomProps> = ({ onStartGame, canStart }) => {
  const link = window.location.href;
  return (
    <div className="flex flex-col items-center space-y-10">
      <Typography variant="h4">We are waiting for the players to join</Typography>
      <p>
        <img src={process.env.PUBLIC_URL + '/imgs/cat.gif'} alt="Cat gif" />
      </p>
      <p>
        <Typography variant="h5">You can share this link with your friends to join <b>{link}</b></Typography>
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
    </div>
  );
}

export default WaitingRoom;
