import React, { useState, useEffect } from 'react';
import Router from 'next/router'
import Image from 'next/image'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MuiAlert from '@material-ui/lab/Alert';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { isEmail, isUsername } from '../common/validation/validation'
import { nowdataGet, nowdataUpdate, nowdataDelete } from '../common/backend/auth'
import { errorResponse } from '../common/backend/error';
import Layout from '../components/templates/Layout'
import Box from '@material-ui/core/Box';
import SimpleModal from '../components/organisms/Modal'

// CSSコンポーネント
const useStyles = makeStyles((theme) => ({
  avatar: {
    marginTop: 24
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    margin: theme.spacing(3, 0, 2),
  },
  box: {
    width: '100%',
    marginTop: 24,
    textAlign: 'center'
  },
  deletebutton: {
    marginTop: 32
  },
}));

// エラーメッセージ用のコンポーネント
const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ProfileEdit: React.FC = () => {

  // StyleSheet
  const classes = useStyles();

  // Hooks 
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [modalopen, setModalOpen] = useState(false);

  // Click Handler
  const submitHundler = async (e) => {

    // 既定のイベントを無効化
    e.preventDefault()

    // バリデーション
    let ErrorData = isEmail(email)
    if (ErrorData) {
      setError(ErrorData)
      return
    }
    ErrorData = isUsername(username)
    if (ErrorData) {
      setError(ErrorData)
      return
    }

    try {
      // ユーザー情報の更新
      const updateResult = await nowdataUpdate({ email, username })
      const responseType = updateResult.status.toString().slice(0, 1)
      if (responseType !== '2') {
        throw (updateResult)
      } else {
        Router.push('/home')
      }
    } catch (e) {
      // レスポンスコードに異常があればエラーメッセージ表示
      setError(await errorResponse(e))
      return
    }

  }

  // 現状のユーザー情報を取得する。
  const profileData = async () => {
    const result = await nowdataGet()
    const data = await result.json();

    setUsername(data.username)
    setEmail(data.email)
  }

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      profileData()
    }
    return () => { isMounted = false }
  }, [])

  return (

    <Layout
      title={"プロフィールの編集｜技術書籍感想文"}
      Header={true}>

      <Container component="main" maxWidth="xs">
        {/* アバター */}
        <Grid container justify="center">
          <Grid item xs={3} className={classes.avatar}
          >
            <Image
              src="/images/avatar.svg"
              alt="Picture of the author"
              width={300}
              height={300}
            />
          </Grid>
        </Grid>

        {/* エラーメッセージ */}
        <Grid container justify="center">
          {error && <Alert className={classes.error} severity="warning">{error}</Alert>}
        </Grid>

        <Grid container justify="center">
          <Typography component="h1" variant="h5"> プロフィールの修正 </Typography>
        </Grid>

        <form
          className={classes.form}
          noValidate
          onSubmit={((e) => { submitHundler(e) })}>
          <Grid container justify="center">

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="User Name"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Grid item xs={3}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              > 変更 </Button>
            </Grid>
          </Grid>
        </form>

        <Grid container justify="center">
          <Box borderTop={1} className={classes.box}>
            <Button
              variant="outlined"
              color="secondary"
              className={classes.deletebutton}
              startIcon={<DeleteIcon />}
              onClick={() => { setModalOpen(true) }}
            > ユーザーの削除 </Button>
          </Box>
        </Grid>

        <SimpleModal
          title="このアカウントを削除しますか？"
          massage="一度削除すると復旧することはできません。"
          open={modalopen}
          falseClick={() => { setModalOpen(false) }}
          trueClick={async () => {
            await Router.push('/')
            await nowdataDelete()
          }}
        />
      </Container >

    </Layout>
  );
}

export default ProfileEdit
