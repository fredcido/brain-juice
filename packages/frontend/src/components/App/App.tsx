import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import TopBar from '../TopBar';
import GameStart from '../../pages/GameStart';
import Game from '../../pages/Game';
import WaitingRoom from '../../pages/WaitingRoom/index';

import GlobalState from '../../models/GlobalState';
import { Context as StateContext, initialState } from '../../state';

const players = [
  {
    name: 'Fred',
  },
  {
    name: 'Klass',
  },
  {
    name: 'Laura',
  },
  {
    name: 'Misa',
  }
];

export default function App() {
  const [state, setGlobalState] = useState<GlobalState>(initialState);

  const setState = (newState: GlobalState) => {
    setGlobalState({
      ...state,
      ...newState,
    })
  };

  return (
    <Router>
      <StateContext.Provider value={{ setState, state }}>
        <CssBaseline />
        <TopBar />
        <Container>
          <Switch>
            <Route path="/waiting">
              <WaitingRoom players={players} />
            </Route>
            <Route path="/game">
              <Game />
            </Route>
            <Route path="/">
              <GameStart />
            </Route>
          </Switch>
        </Container>
      </StateContext.Provider>
    </Router>
  );
}