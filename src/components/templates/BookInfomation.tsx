import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

type props = {
  title: string,
  auther: string,
  imageurl: string,
  description: string
}

// CSSコンポーネント
const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 32,
    marginBottom: 16,
  },
  image: {
    marginRight: 32,
    marginBottom: 32,
    textAlign: 'center'
  },
  title: {
    fontSize: 20
  },
  auther: {
    fontSize: 14
  },
  description: {
    fontSize: 14,
    color: '#616161',
    marginTop: 8
  }
}));

const BookInfomation: React.FC<props> = (props: props) => {

  const classes = useStyles();

  return (
    <Grid className={classes.container} container justify="center">
      <Grid className={classes.image} item md={3} sm={3} xs={12}>
        <img src={props.imageurl} />
      </Grid>
      <Grid item md={7} sm={7} xs={12}>
        <div className={classes.title}>{props.title}</div>
        <div className={classes.auther}>{props.auther}</div>
        <div className={classes.description}>{props.description}</div>
      </Grid>
    </Grid>
  );
}

export default BookInfomation