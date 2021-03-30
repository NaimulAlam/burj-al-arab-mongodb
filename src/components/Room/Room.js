import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, makeStyles, Typography } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import LocalHotelIcon from '@material-ui/icons/LocalHotel';
import WcIcon from '@material-ui/icons/Wc';

import React from 'react';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Room({room}){
  const classes = useStyles();
  const history = useHistory()
    const handleBook = (bedType) => {
        history.push(`/book/${bedType}`);
    }
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {room.avatar}
          </Avatar>
        }
        title={room.title}
      />

      <CardMedia
        className={classes.media}
        image={room.imgUrl}
        title="Paella dish"
      />
      <img src={`/images/${room.bedType}.png`} alt=""/>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {room.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <LocalHotelIcon />: {room.bed} 
        </IconButton>
        <IconButton aria-label="share">
          <WcIcon />: {room.capacity} 
        </IconButton>
        <IconButton aria-label="price">
          <AttachMoneyIcon />: {room.price} 
        </IconButton>
        <Button onClick={() => handleBook(room.bedType)} variant="contained" color="primary">
            Book
        </Button>
      </CardActions>
    </Card>
  );
}
