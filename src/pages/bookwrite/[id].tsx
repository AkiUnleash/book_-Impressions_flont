import Router from 'next/router'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import { searchHandler } from '../../common/serch/googleapi'
import Header from '../../components/templates/Header';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { MarkDownEditor } from '../../components/templates/MarkDownEditor';
import Button from '@material-ui/core/Button';
import { impressionRegister } from '../../common/backend/impression'

type book = {
  id: string
  title: string,
  auther: string,
  imageurl: string,
}

export default function Output() {

  const router = useRouter();

  const [result, setResult] = useState<book>({ id: "", title: "", auther: "", imageurl: "" })
  const [title, setTitle] = useState('')
  const [value, setValue] = useState('')
  const [id, setId] = useState<string>()

  const onChange = (value: string) => {
    setValue(value);
  };

  const bookData = async () => {

    if (id === undefined) { return }

    const keyword = id
    const maxResults = 0
    const searchResult = await searchHandler({ keyword, maxResults })
    const data = await searchResult.json();

    setResult({
      id: data.id,
      title: data.volumeInfo.title,
      auther: data.volumeInfo.authors,
      imageurl: data.volumeInfo.imageLinks ? data.volumeInfo.imageLinks.smallThumbnail : ""
    });
  }

  // Click Handler
  const submitHundler = async (e) => {
    e.preventDefault()

    // 
    try {
      const inputResult = await impressionRegister({
        bookid: result.id,
        booktitle: result.title,
        imageurl: result.imageurl,
        title: title,
        body: value
      })
      console.log(await inputResult);
      const responseType = inputResult.status.toString().slice(0, 1)
      if (responseType !== '2') {
        throw (inputResult)
      } else {
        Router.push('/home')
      }
    } catch (e) {
      return
    }

  }

  useEffect(() => {
    if (router.asPath !== router.route) {
      setId((router.query.id).toString());
    }
  }, [router]);

  useEffect(() => {
    bookData()
    return () => { bookData() }
  }, [id])

  return (
    <>
      <Header />
      <Container maxWidth="md">

        <form
          noValidate
          onSubmit={((e) => { submitHundler(e) })}>

          {result.id && (
            <Grid container justify="center">
              <Grid item xs={3}>
                <img src={result.imageurl} />
              </Grid>
              <Grid item xs={6}>
                <div>{result.title}</div>
                <div>{result.auther}</div>
              </Grid>
            </Grid>
          )}

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="Title"
            label="タイトル"
            name="title"
            autoComplete="title"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <MarkDownEditor
            value={value}
            onChange={onChange} />

          <Grid container justify="center">
            <Grid item xs={3}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              > 登録 </Button>
            </Grid>

          </Grid>
        </form>
      </Container>
    </>
  )
}