import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Bookcard from '../components/organisms/Bookcard';
import TextField from '@material-ui/core/TextField';
import { searchHandler } from '../common/serch/googleapi'
import Layout from '../components/templates/Layout'

// CSSコンポーネント
const useStyles = makeStyles((theme) => ({
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
  },
  guidance: {
    textAlign: 'center'
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
    if (keyword.trim() === '') { return }
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
      title={"本の検索｜技術書籍感想文"}
      Header={true}>

      <Container maxWidth="md">

        <Grid container justify="center" className={classes.container}>
          <Grid item md={12} sm={12} xs={12} className={classes.search}>
            <form
              noValidate
              onSubmit={((e) => { sumitHundler(e) })}>
              <Grid container justify="center" alignItems="center">
                <Grid item md={8} sm={8} xs={12}>
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
                <Grid item md={1} sm={1} xs={5}>
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

          <Grid item md={12} sm={12} xs={12}>
            <Grid container spacing={2}>
              {result[0] ? (result.map((item, index) => {
                return (
                  <Grid item md={3} sm={6} xs={12} key={index}>
                    <Bookcard
                      path={"bookwrite"}
                      id={item.id}
                      title={item.volumeInfo.title}
                      author={item.volumeInfo.authors}
                      imageurl={item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.smallThumbnail : ''}
                    />
                  </Grid>
                )
              })) :
                (
                  <Grid item xs={12} className={classes.guidance}>
                    <div>感想文を書く本を検索してください。</div>
                  </Grid>
                )}

            </Grid>
          </Grid>
        </Grid>
      </Container>

    </Layout >
  );
}

export default Home
