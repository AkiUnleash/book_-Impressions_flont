import React, { useState } from 'react';
import Image from 'next/image'
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Header from '../components/templates/Header';
import Bookcard from '../components/organisms/Bookcard';
import Button from '@material-ui/core/Button';
import Link from 'next/link'


const useStyles = makeStyles((theme) => ({
  avatar: {
    paddingTop: 24
  },
  container: {
    padding: 24
  },
  username: {
    textAlign: 'center'
  },
  button: {
    margin: 'auto'
  }
}));


const Home: React.FC = () => {

  // StyleSheet
  const classes = useStyles();

  // Hooks 
  const [username, setUsername] = useState('')

  return (
    <>
      <Header />
      <Container maxWidth="md">
        <CssBaseline />
        <Grid container justify="center" className={classes.container}>
          <Grid item xs={3}>
            <Grid container justify="center">
              <div className={classes.avatar}>
                <Image
                  src="/images/avatar.svg"
                  alt="Picture of the author"
                  width={300}
                  height={300}
                />
              </div>
              <Typography className={classes.username}>Username</Typography>
              <Button className={classes.button} variant="contained">プロフィールの編集</Button>
            </Grid>
          </Grid>


          <Grid item xs={9}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Bookcard />
              </Grid>
              <Grid item xs={3}>
                <Bookcard />
              </Grid>
              <Grid item xs={3}>
                <Bookcard />
              </Grid>
              <Grid item xs={3}>
                <Bookcard />
              </Grid>
              <Grid item xs={3}>
                <Bookcard />
              </Grid>
              <Grid item xs={3}>
                <Bookcard />
              </Grid>
              <Grid item xs={3}>
                <Bookcard />
              </Grid>
              <Grid item xs={3}>
                <Bookcard />
              </Grid>
              <Grid item xs={3}>
                <Bookcard />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default Home
