import React, { ReactNode } from 'react';
import BaseCard from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import useStyles from './style';

interface CardProps {
  title?: string | ReactNode,
}

const Card: React.FunctionComponent<CardProps> = (props) => {
  const { title, children } = props;
  const classes = useStyles();

  return (
    <BaseCard className={classes.root}>
      <CardContent>
        {title ? <Typography component="h1" variant="h5">{title}</Typography> : ''}        
        {children}
      </CardContent>
    </BaseCard>
  )
}

Card.defaultProps = {
  title: ''
}

export default Card;
