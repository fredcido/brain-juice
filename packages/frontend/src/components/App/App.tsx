import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import TopBar from '../TopBar';

// Pages
import GameStart from '../../pages/GameStart';
import Game from '../../pages/Game';
import Home from '../../pages/Home';

import GlobalState from '../../models/GlobalState';
import { Context as StateContext, initialState } from '../../state';

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
        <Box>
          <Switch>
            <Route path="/game/:id">
              <Game />
            </Route>
            <Route path="/start">
              <GameStart />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Box>
      </StateContext.Provider>
    </Router>
  );
}