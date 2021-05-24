import React, { useState } from 'react';
import Link from 'next/link'
import Router from 'next/router'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MuiAlert from '@material-ui/lab/Alert';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { loginHandler, signupHandler } from '../common/backend/auth'
import { errorResponse } from '../common/backend/error';
import { isEmail, isPassword } from '../common/validation/validation'
import { sign } from 'crypto';

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
    backgroundColor: theme.palette.info.dark,
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


const Signup: React.FC = () => {

  // StyleSheet
  const classes = useStyles();

  // Hooks 
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Click Handler
  const sumitHundler = async (e) => {
    e.preventDefault()

    // バリデーション
    let ErrorData = isEmail(email)
    if (ErrorData) {
      setError(ErrorData)
      return
    }
    ErrorData = isPassword(password)
    if (ErrorData) {
      setError(ErrorData)
      return
    }

    // サインイン処理
    try {

      const signinResult = await signupHandler({ email, password, username })
      let responseType = signinResult.status.toString().slice(0, 1)
      if (responseType !== '2') {
        throw (signinResult)
      }

      const loginResult = await loginHandler({ email, password })
      responseType = loginResult.status.toString().slice(0, 1)
      if (responseType !== '2') {
        throw (loginResult)
      } else {
        Router.push('/home')
      }

    } catch (e) {
      setError(await errorResponse(e))
      return
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon />
        </Avatar>

        {error && <Alert className={classes.error} severity="warning">{error}</Alert>}

        <Typography component="h1" variant="h5">
          アカウントの作成
        </Typography>

        <form
          className={classes.form}
          noValidate
          onSubmit={((e) => { sumitHundler(e) })}>

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

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            登録
          </Button>
          <Grid container justify="center">
            <Grid item>
              <Link href="/login">
                ログインはこちらへ
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container >
  );
}

export default Signup
