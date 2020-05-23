import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,  
  CardActions,
  Typography,
  ButtonProps
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  card: {
    margin: theme.spacing(5),
    width: 320,
  }
}));

interface ActionCardProps {
  title: string,
  description: string,
  imgSrc: string,
  buttonText: string,
  buttonLink: string,
  buttonColor: ButtonProps['color']
};

export default function Home() {
  const classes = useStyles();
  const actions = [
    {
      title: 'Start',
      description: 'Start a new game',
      buttonText: 'Start a new game',
      buttonLink: '/start',
      buttonColor: "primary" as const,
      imgSrc: `${process.env.PUBLIC_URL}/imgs/logo.jpg`
    },
    {
      title: 'Enter',
      description: 'Enter a game',
      buttonText: 'Enter a new game',
      buttonLink: '/enter',
      buttonColor: "secondary" as const,
      imgSrc: `${process.env.PUBLIC_URL}/imgs/logo.jpg`
    }
  ];

  const ActionCard = (props: ActionCardProps) => {
    const { title, description, imgSrc, buttonLink, buttonText, buttonColor } = props;

    return <Card className={classes.card}>
      <CardContent>
          <img src={imgSrc} alt=""/>
          <Typography gutterBottom variant="h5" component="h2">{title}</Typography>
          <Typography variant="body2" color="textSecondary" component="p">{description}</Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" fullWidth color={buttonColor} component={RouterLink} to={buttonLink}>{buttonText}</Button>
        </CardActions>
    </Card>
  };

  return <Box display="flex" justifyContent="center" alignItems="center">
    {actions.map((action: ActionCardProps) => <ActionCard key={action.title} {...action} />)}
  </Box>
}
