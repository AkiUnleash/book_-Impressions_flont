import React, { useState, useEffect } from 'react';
import Router from 'next/router'
import Image from 'next/image'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MuiAlert from '@material-ui/lab/Alert';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { isEmail, isUsername } from '../common/validation/validation'
import Header from '../components/templates/Header';
import { nowdataGet, nowdataUpdate } from '../common/backend/auth'
import { errorResponse } from '../common/backend/error';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.warning.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const ProfileEdit: React.FC = () => {

  // StyleSheet
  const classes = useStyles();

  // Hooks 
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  // Click Handler
  const submitHundler = async (e) => {
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
      const updateResult = await nowdataUpdate({ email, username })
      const responseType = updateResult.status.toString().slice(0, 1)
      if (responseType !== '2') {
        throw (updateResult)
      } else {
        Router.push('/home')
      }
    } catch (e) {
      setError(await errorResponse(e))
      return
    }

  }

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
    <>

      <Header />

      <Container component="main" maxWidth="xs">
        <Grid container justify="center">
          <Grid item xs={3}>
            <Image
              src="/images/avatar.svg"
              alt="Picture of the author"
              width={300}
              height={300}
            />
          </Grid>
        </Grid>

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
      </Container >
    </>
  );
}

export default ProfileEdit
