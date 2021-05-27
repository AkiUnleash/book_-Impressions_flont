import React, { useState, useEffect } from 'react';
import Router from 'next/router'
import Image from 'next/image'
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Header from '../components/organisms/Header';
import Bookcard from '../components/organisms/Bookcard';
import Button from '@material-ui/core/Button';
import { impressionsRead } from '../common/backend/impression'
import { nowdataGet } from '../common/backend/auth'
import Layout from '../components/templates/Layout'


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

type impression = {
  id: string,
  bookid: string,
  booktitle: string,
  imageurl: string,
  title: string,
}


const Home: React.FC = () => {

  // StyleSheet
  const classes = useStyles();

  // Hooks 
  const [username, setUsername] = useState('')
  const [impression, setImpression] = useState<impression[]>([])

  const bookData = async () => {

    const result = await impressionsRead()
    const data = await result.json();

    setImpression(data);
  }

  const userData = async () => {

    const result = await nowdataGet()
    const data = await result.json();

    setUsername(data.username);
  }

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      bookData()
      userData()
    }
    return () => { isMounted = false }
  }, [])

  return (

    <Layout
      title={"ホーム｜技術書籍感想文（仮）"}
      Header={true}>

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
              <Typography className={classes.username}>{username}</Typography>
              <Button
                className={classes.button}
                variant="contained"
                onClick={() => { Router.push('/profileedit') }}
              >プロフィールの編集</Button>
            </Grid>
          </Grid>


          <Grid item xs={9}>
            <Grid container spacing={2}>
              {impression.map((i, index) => {
                return (
                  <Grid item xs={3} key={index}>
                    <Bookcard
                      path={'bookread'}
                      id={i.id}
                      title={i.booktitle}
                      author={i.title}
                      imageurl={i.imageurl}
                    />
                  </Grid>
                )
              })}
            </Grid>
          </Grid>
        </Grid>
      </Container>

    </Layout>
  );
}

export default Home
