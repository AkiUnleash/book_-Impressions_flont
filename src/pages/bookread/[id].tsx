import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { impressionRead } from '../../common/backend/impression'
import { searchHandler } from '../../common/serch/googleapi'
import marked from "marked";
import Layout from '../../components/templates/Layout'
import BookInfomation from '../../components/templates/BookInfomation'
import EditMenu from '../../components/templates/EditMenu'

type impression = {
  id: string,
  booktitle: string,
  imageurl: string,
  title: string,
  body: string,
}

type bookinfomation = {
  title: string,
  auther: string,
  imageurl: string,
  description: string
}

export default function Output() {

  const router = useRouter();
  const [impression, setImpression] = useState<impression>({
    id: "",
    booktitle: "",
    imageurl: "",
    title: "",
    body: "",
  })

  const [bookinfomation, setBookinfomation] = useState<bookinfomation>({
    title: "",
    auther: "",
    imageurl: "",
    description: ""
  })

  const [id, setId] = useState<string>()

  const impressionData = async () => {

    if (id === undefined) { return }
    const impressionResult = await impressionRead(id)
    const impressionData = await impressionResult.json();
    setImpression(impressionData);


    const keyword = impressionData.bookid
    const maxResults = 0
    const BookResult = await searchHandler({ keyword, maxResults })
    const bookData = await BookResult.json();

    if (bookData === undefined) { return }
    setBookinfomation({
      title: bookData.volumeInfo.title,
      auther: bookData.volumeInfo.authors,
      imageurl: bookData.volumeInfo.imageLinks ? bookData.volumeInfo.imageLinks.smallThumbnail : "",
      description: bookData.volumeInfo.description,
    });
  }

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (router.asPath !== router.route) {
        setId((router.query.id).toString());
      }
    }
    return () => { isMounted = false }
  }, [router]);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      impressionData()
    }
    return () => { isMounted = false }
  }, [id])

  return (
    <Layout
      title={`${impression.booktitle}｜閲覧｜技術書籍感想文（仮）`}
      Header={true}>

      <Container maxWidth="md">


        <BookInfomation
          title={bookinfomation.title}
          auther={bookinfomation.auther}
          imageurl={bookinfomation.imageurl}
          description={bookinfomation.description} />

        <Grid container justify="flex-end">
          <EditMenu
            id={id} />
        </Grid>

        <Grid container justify="center">
          <Grid item xs={12}>
            <h1>{impression.title}</h1>
          </Grid>
        </Grid>

        <Grid container justify="center">
          <Grid item xs={12}>
            <span dangerouslySetInnerHTML={{ __html: marked(impression.body) }} />
          </Grid>
        </Grid>

      </Container>
    </Layout>
  )
}