import React from 'react';
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

export default function Bookcard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="http://books.google.com/books/content?id=8m5qBgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
          title="Contemplative Reptile"
        />
        <CardContent>
          <ThemeProvider theme={theme}>
            <Typography variant="h2" component="h2"> 本のタイトル </Typography>
            <Typography variant="body2" color="textSecondary" component="p"> 感想文の書き出し </Typography>
          </ThemeProvider>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}