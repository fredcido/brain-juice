import * as React from 'react';
import GlobalState from '../models/GlobalState';

const initialState: GlobalState = {
  game: {
    name: ''
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