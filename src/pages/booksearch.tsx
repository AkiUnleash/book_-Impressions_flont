import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Bookcard from '../components/organisms/Bookcard';
import TextField from '@material-ui/core/TextField';
import { searchHandler } from '../common/serch/googleapi'
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
    marginLeft: 8
  },
  search: {
    marginTop: 8,
    marginBottom: 32
  }
}));


const Home: React.FC = () => {

  // StyleSheet
  const classes = useStyles();

  // Hooks 
  const [keyword, setKeyword] = useState('')
  const [result, setResult] = useState([])

  // Click Handler
  const sumitHundler = async (e) => {
    e.preventDefault()
    const maxResults = 40
    try {
      const searchResult = await searchHandler({ keyword, maxResults })
      const data = await searchResult.json();
      setResult(data.items);
    } catch (e) {
      return
    }
  }

  return (
    <Layout
      title={"本の検索｜技術書籍感想文（仮）"}
      Header={true}>

      <Container maxWidth="md">
        <CssBaseline />
        <Grid container justify="center" className={classes.container}>
          <Grid item xs={12} className={classes.search}>
            <form
              noValidate
              onSubmit={((e) => { sumitHundler(e) })}>
              <Grid container justify="center" alignItems="center">
                <Grid item xs={8}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="Keyword"
                    label="検索キーワードを入力してください。"
                    name="keyword"
                    autoComplete="keyword"
                    autoFocus
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={1}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.button}>
                    検索
                </Button>
                </Grid>
              </Grid>
            </form>

          </Grid>


          <Grid item xs={12}>
            <Grid container spacing={2}>
              {result.map((item, index) => {
                return (
                  <Grid item xs={3} key={index}>
                    <Bookcard
                      path={"bookwrite"}
                      id={item.id}
                      title={item.volumeInfo.title}
                      author={item.volumeInfo.authors}
                      imageurl={item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.smallThumbnail : ''}
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
