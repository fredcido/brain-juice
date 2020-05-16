import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Card from '../../components/Card';

import useStyles from './style';

export default function Home() {
  const classes = useStyles();

  return (
    <Card title="Choose an option">
      <Grid container className={classes.content}>
        <Grid item xs={6} className={classes.item}>
          <Button variant="contained" color="primary" component={RouterLink} to="/start">
            Start a game
          </Button>
        </Grid>
        <Grid item xs={6} className={classes.item}>
          <Button variant="contained" color="secondary" component={RouterLink} to="/enter">
            Enter a game
          </Button>
        </Grid>
      </Grid>
    </Card>
  )
}
