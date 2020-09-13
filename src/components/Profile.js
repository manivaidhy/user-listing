import React from "react";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
});

export default function FeaturedUser({ user }) {  

  const classes = useStyles();

  return (
    <Grid item xs={12} md={6}>
      {
        user && user.rep ? (
          <Card className={classes.card}>
            <Hidden xsDown>
              <CardMedia className={classes.cardMedia} image="https://source.unsplash.com/random" title="new title" />
            </Hidden>
            <div className={classes.cardDetails}>
              <CardContent>
                <Typography component="h2" variant="h5" gutterBottom>
                  {user.rep}
                </Typography>
                <Typography variant="button" display="block">
                  Region:
              </Typography>
                <Typography variant="subtitle1" paragraph gutterBottom>
                  {user.region}
                </Typography>
                <Typography variant="button" display="block">
                  Address:
              </Typography>
                <Typography variant="subtitle1" paragraph>
                  India
              </Typography>
              </CardContent>
            </div>

          </Card>

        ) : null
      }

    </Grid>
  );
}

FeaturedUser.propTypes = {
  user: PropTypes.object,
};