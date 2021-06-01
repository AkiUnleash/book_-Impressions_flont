import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
  container: {
    padding: 24
  },
  number: {
    fontSize: 50,
    textAlign: 'center',
    color: '#ff9800'
  },
  massage: {
    fontSize: 24,
    textAlign: 'center',
    color: '#666'
  }
}));


const Custom500: React.FC = () => {

  // StyleSheet
  const classes = useStyles();


  return (

    <Container maxWidth="md">
      <Grid container justify="center" className={classes.container}>
        <Grid xs={12}>
          <div className={classes.number}>500 Page</div>
        </Grid>
        <Grid xs={12}>
          <div className={classes.massage}>このページは存在しません。</div>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Custom500
