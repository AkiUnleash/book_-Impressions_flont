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
import { impressionRead } from '../../common/backend/impression'
import marked from "marked";

type impression = {
  id: string,
  booktitle: string,
  imageurl: string,
  title: string,
  body: string,
}

export default function Output() {

  const router = useRouter();
  const [result, setResult] = useState<impression>({
    id: "",
    booktitle: "",
    imageurl: "",
    title: "",
    body: "",
  })
  const [id, setId] = useState<string>()

  const impressionData = async () => {

    if (id === undefined) { return }
    const searchResult = await impressionRead(id)
    const data = await searchResult.json();

    setResult(data);
  }

  useEffect(() => {
    if (router.asPath !== router.route) {
      setId((router.query.id).toString());
    }
  }, [router]);

  useEffect(() => {
    impressionData()
    return () => { impressionData() }
  }, [id])

  return (
    <>
      <Header />
      <Container maxWidth="md">

        {result.id && (
          <>
            <Grid container justify="center">
              <Grid item xs={3}>
                <img src={result.imageurl} />
              </Grid>
              <Grid item xs={6}>
                <div>{result.booktitle}</div>
                <div>{""}</div>
              </Grid>
            </Grid>

            <Grid container justify="center">
              <Grid item xs={12}>
                <h1>{result.title}</h1>
              </Grid>
            </Grid>

            <Grid container justify="center">
              <Grid item xs={12}>
                <span dangerouslySetInnerHTML={{ __html: marked(result.body) }} />
              </Grid>
            </Grid>
          </>
        )}



      </Container>
    </>
  )
}