import React, { useState, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import State from '../../state';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function GameStart() {
  const { setState } = useContext(State);
  const classes = useStyles();
  const [data, setData] = useState({ name:  '' });

  const handleInputChange = (event: React.SyntheticEvent) => {
    const { name, value } = event.target as HTMLInputElement;
    setData({...data, [name]: value})
  }

  const handleFormSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setState({
      game: data.name,
    })
  };

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <SportsEsportsIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Starts a new game
      </Typography>
      <form className={classes.form} noValidate onSubmit={handleFormSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Game name"
          name="name"
          value={data.name}
          onChange={handleInputChange}
          autoFocus
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Start game
        </Button>
        <Link to="/waiting">Waiting</Link>
      </form>
    </div>
  );
}
