import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import useStyles from './style';

export default function TopBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar color="secondary">
          <Typography variant="h6">
            <Link to="/" className={classes.link}>
              Mind Juice
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}