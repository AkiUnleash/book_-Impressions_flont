import Router from 'next/router'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Alert, AlertTitle } from '@material-ui/lab';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Layout from '../components/templates/Layout'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    margin: theme.spacing(4, 0, 3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    width: 300
  },
}));

const Top: React.FC = () => {

  // StyleSheet
  const classes = useStyles();

  return (
    <Layout
      title={"技術書籍感想文（仮）"}
      Header={false}>

      <Grid container component="main" className={classes.root}>

        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5}  >

          <div className={classes.paper}>
            <Typography component="h1" variant="h5" className={classes.title}> 技術書籍感想文（仮） </Typography>

            <Alert>
              <AlertTitle>どんなサイト？</AlertTitle>
              <p>技術書籍の感想文を残すためのサイトです。</p>
              <p>アウトプットをして知識を深めましょう。</p>
            </Alert>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => {
                Router.push('/login')
              }} >
              サインイン </Button>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
              onClick={() => {
                Router.push('/signup')
              }} > アカウントの登録 </Button>

          </div>
        </Grid>
      </Grid>

    </Layout>
  );
}
export default Top