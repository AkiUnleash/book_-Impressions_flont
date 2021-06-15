import React, { useState, useEffect } from 'react';
import Router from 'next/router'
import Image from 'next/image'
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

// CSSコンポーネント
const useStyles = makeStyles((theme) => ({
  infomation: {
    display: "inline-block",
    textAlign: "center",
    paddingBottom: 32
  },
  avatar: {
    paddingTop: 8
  },
  container: {
    padding: 24
  },
  username: {
    textAlign: 'center',
    paddingBottom: 8
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

  // ログインユーザーの感想文取得
  const bookData = async () => {
    const result = await impressionsRead()
    const data = await result.json();
    setImpression(data);
  }

  // ログインユーザー名の取得
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
      title={"ホーム｜技術書籍感想文"}
      Header={true}>

      <Container maxWidth="md">
        <Grid container justify="center" className={classes.container}>

          <Grid item md={3} sm={3} xs={12}>
            <Grid container justify="center" className={classes.infomation}>

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

          <Grid item md={9} sm={9} xs={12}>
            <Grid container spacing={2}>
              {impression[0] ?
                (
                  impression.map((i, index) => {
                    return (
                      <Grid item md={3} sm={6} xs={12} key={index}>
                        <Bookcard
                          path={'bookread'}
                          id={i.id}
                          title={i.booktitle}
                          author={i.title}
                          imageurl={i.imageurl}
                        />
                      </Grid>
                    )
                  })) :
                (
                  <div>右上の［感想文を書く］ボタンを押して、感想文を書きましょう。</div>
                )}
            </Grid>
          </Grid>

        </Grid>
      </Container>

    </Layout>
  );
}

export default Home
