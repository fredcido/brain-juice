import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText, Divider, List, ListItemIcon, Typography } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

import Player from '../../models/Player';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    display: "flex",
    alignItems: "center",
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    minHeight: '80vh',
  },
  gifContainer: {
    padding: theme.spacing(4),
  }
}));

export interface WaitingRoomProps { players: Array<Player>; }

const WaitingRoom : React.SFC<WaitingRoomProps>  = ({ players }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid container spacing={1}>
                <Grid item xs={3}>
                  <Typography variant="h5" gutterBottom>
                    Players
                  </Typography>
                  <List>
                    {players.map(player => (
                      <React.Fragment key={player.name}>
                        <ListItem button>
                          <ListItemIcon>
                            <PersonIcon />
                          </ListItemIcon>
                          <ListItemText primary={player.name} />
                        </ListItem>
                        <Divider />
                      </React.Fragment>
                    ))}
                  </List>
                </Grid>
                <Grid item xs={9} className={classes.gifContainer}>
                  <img src="imgs/cat.gif" />
                </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default WaitingRoom;
