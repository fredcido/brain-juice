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
import GameEnter from '../../pages/GameEnter';
import Game from '../../pages/Game';
import Home from '../../pages/Home';
import '../../styles/tailwind.css';
import GlobalState from '../../models/GlobalState';
import { Context as StateContext, initialState } from '../../state';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import { lightGreen, green } from '@material-ui/core/colors';

export let MindJuiceTheme = createMuiTheme({
  palette: {
    primary: {
      main: lightGreen['400'],
      contrastText: lightGreen['50'],
    },
    secondary: {
      main: green['400'],
      contrastText: green['50'],
    },
  }
});

MindJuiceTheme = responsiveFontSizes(MindJuiceTheme);

export default function App() {
  const [state, setGlobalState] = useState<GlobalState>(initialState);

  const setState = (newState: GlobalState) => {
    setGlobalState({
      ...state,
      ...newState,
    })
  };

  return (
    <ThemeProvider theme={MindJuiceTheme}>
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
              <Route path="/enter">
                <GameEnter />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Box>
        </StateContext.Provider>
      </Router>
    </ThemeProvider>
  );
}