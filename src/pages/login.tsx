import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MuiAlert from '@material-ui/lab/Alert';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { loginHandler } from '../common/backend/auth'
import { errorResponse } from '../common/backend/error';
import { isEmail, isPassword } from '../common/validation/validation'

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


const Login: React.FC = () => {

  // StyleSheet
  const classes = useStyles();

  // Hooks 
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

    try {
      const loginResult = await loginHandler({ email, password })
      console.log(loginResult);
    } catch (e) {
      setError(await errorResponse(e))
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        {error && <Alert className={classes.error} severity="warning">{error}</Alert>}

        <Typography component="h1" variant="h5">
          サインイン
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
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
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
            ログイン
          </Button>
          <Grid container justify="center">
            <Grid item>
              {/* <Link to="/signup">
                {"ユーザー登録はこちらへ"}
              </Link> */}
            </Grid>
          </Grid>
        </form>
      </div>
    </Container >
  );
}

export default Login
