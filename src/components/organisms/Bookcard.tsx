import React from 'react';
import Link from 'next/link'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const theme = createMuiTheme({
  typography: {
    h2: {
      fontSize: 12,
    },
    body2: {
      fontSize: 12,
    }
  }
})

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 180,
  },
});

type props = {
  id: string,
  title: string,
  author: string,
  imageurl: string
}

const Bookcard = (props: props) => {

  const classes = useStyles();

  return (
    <Link href={{ pathname: 'bookwrite', query: { id: props.id } }}>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={props.imageurl}
            title="Contemplative Reptile"
          />
          <CardContent>
            <ThemeProvider theme={theme}>
              <Typography variant="h2" component="h2">{props.title}</Typography>
              <Typography variant="body2" color="textSecondary" component="p">{props.author}</Typography>
            </ThemeProvider>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}

export default Bookcard