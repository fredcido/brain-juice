import * as React from 'react';
import GlobalState from '../models/GlobalState';
import GameStatus from '../models/GameStatus';

const initialState: GlobalState = {
  game: {
    name: '',
    status: GameStatus.PENDING,
    moderator: {
      id: '',
      name: '',
      joined: new Date()
    }
  },
  players: [],
}

interface StateSetter {
  state: GlobalState;
  setState(newState: GlobalState): void;
}

const Context = React.createContext<StateSetter>({
  state: initialState,
  setState: s => s,
});

export {
  initialState,
  Context,
}