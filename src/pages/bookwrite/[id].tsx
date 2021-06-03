import Router from 'next/router'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router';
import { searchHandler } from '../../common/serch/googleapi'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { MarkDownEditor } from '../../components/templates/MarkDownEditor';
import Button from '@material-ui/core/Button';
import { impressionRegister, impressionsSearch, impressionUpdate } from '../../common/backend/impression'
import Layout from '../../components/templates/Layout'
import BookInfomation from '../../components/templates/BookInfomation'

type book = {
  id: string
  title: string,
  auther: string,
  imageurl: string,
  description: string
}

export default function Output() {

  const router = useRouter();
  const [result, setResult] = useState<book>({ id: "", title: "", auther: "", imageurl: "", description: "" })
  const [id, setID] = useState('')
  const [title, setTitle] = useState('')
  const [value, setValue] = useState('')
  const [bookid, setBookId] = useState<string>()
  const [flg, setFlg] = useState<'create' | 'update'>('create')
  const processing = useRef(false);

  const onChange = (value: string) => {
    setValue(value);
  };

  const bookData = async () => {
    if (bookid === undefined) { return }

    const keyword = bookid
    const maxResults = 0
    const searchResult = await searchHandler({ keyword, maxResults })
    const data = await searchResult.json();

    setResult({
      id: data.id,
      title: data.volumeInfo.title,
      auther: data.volumeInfo.authors,
      imageurl: data.volumeInfo.imageLinks ? data.volumeInfo.imageLinks.smallThumbnail : "",
      description: data.volumeInfo.description,
    });
  }

  const impressionData = async () => {
    if (bookid === undefined) { return }

    const searchResult = await impressionsSearch(bookid)
    const data = await searchResult.json();

    const responseType = await searchResult.status.toString().slice(0, 1)
    if (responseType == '2') {
      await setID(data[0].id)
      await setTitle(data[0].title)
      await setValue(data[0].body)
      await setFlg('update')
    } else {
      await setFlg('create')
    }
  }

  const createHandler = async () => {
    try {
      const inputResult = await impressionRegister({
        bookid: result.id,
        booktitle: result.title,
        imageurl: result.imageurl,
        title: title,
        body: value
      })
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

  const updateHandler = async () => {
    try {
      const inputResult = await impressionUpdate(
        id,
        {
          bookid: result.id,
          booktitle: result.title,
          imageurl: result.imageurl,
          title: title,
          body: value
        })
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

  // Click Handler
  const submitHundler = (e) => {
    e.preventDefault()

    // 多重クリック防止
    if (processing.current) return;
    processing.current = true;
    setTimeout(() => {
      processing.current = false;
    }, 5000);

    // 新規登録及び更新の確認
    if (flg == 'create') {
      createHandler();
    } else {
      updateHandler();
    }
  }

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (router.asPath !== router.route) {
        setBookId((router.query.id).toString());
      }
    }
    return () => { isMounted = false }
  }, [router]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      bookData()
      impressionData()
    }
    return () => { isMounted = false }
  }, [bookid])

  return (
    <Layout
      title={`${result.title}｜投稿｜技術書籍感想文（仮）`}
      Header={true}>

      <Container maxWidth="md">
        <form
          noValidate
          onSubmit={((e) => { submitHundler(e) })}>

          <BookInfomation
            title={result.title}
            auther={result.auther}
            imageurl={result.imageurl}
            description={result.description} />

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

    </Layout>
  )
}