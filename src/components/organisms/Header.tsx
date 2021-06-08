import React from 'react';
import Link from 'next/link'
import Router from 'next/router'
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { logoutHandler } from '../../common/backend/auth';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
    cursor: 'pointer'
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

const Header: React.FC = () => {

  const classes = useStyles();

  const clickHundler = (e) => {

    // 既定のイベントを無効化
    e.preventDefault()

    // ログイン処理
    logoutHandler()

    Router.push('/login')
  }

  return (
    <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>

        <Link href={'/home'}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}> 技術書籍感想文（仮）</Typography>
        </Link>

        <Button href="#"
          color="primary"
          variant="outlined"
          className={classes.link}
          onClick={() => { Router.push('/booksearch') }}>
          感想文を書く </Button>

        <Button href="#"
          color="primary"
          variant="outlined"
          className={classes.link}
          onClick={async (e) => { clickHundler(e) }}>
          ログアウト </Button>

      </Toolbar >
    </AppBar >
  );
}

export default Header