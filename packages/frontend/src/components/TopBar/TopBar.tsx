import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './style';

const TopBar = () => {
  const classes = useStyles();

  return (
      <AppBar elevation={0} position="static" color="transparent" className={classes.root}>
        <Toolbar>
          <Typography variant="h6">
            <Link to="/" className={classes.link}>
              Mind Juice
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
  );
}

export default TopBar;