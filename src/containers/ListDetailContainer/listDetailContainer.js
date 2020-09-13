import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Profile from '../../components/Profile';
import Placeholder from '../../components/Placeholder';
import { useParams } from 'react-router-dom';
import { copyright } from '../../components/copyright';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 400,
  },
  filterSpacing: {
    padding: theme.spacing(2),
  },
}));

    export default function ListDetailsContainer() {
    const classes = useStyles();
    let { rep_id } = useParams();
    let [user, setUser] = useState({});
    useEffect(() => {
      fetch('/api/getData')
        .then((res) => res.json())
        .then((json) => {
          if (json.rows && json.rows.length > 0) {
            const user = json.rows.find(row => row.id === Number(rep_id));
            setUser(user);
          }
        })
    }, [rep_id]);
    const fixedFilter = clsx(classes.filterSpacing, classes.paper, classes.fixedHeight);
    return (
        <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3} justify="space-between">
          <Grid item>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          <Link to='/users'>List</Link> / { user ? user.rep : ''}
          </Typography>
          </Grid>
            </Grid>
            <Grid container spacing={3}>
            {/* Table */}
            <Grid item xs={12} md={9} lg={9}>
            <Paper className={fixedFilter} >
                <Profile user={user} />
              </Paper>
            </Grid>
            {/* Filter */}
            <Grid item xs={12} md={3} lg={3} id="filter">
              <Paper className={fixedFilter}>
                <Placeholder user={user} />
              </Paper>
            </Grid>
          </Grid>
          {copyright}
        </Container>
      </main>
    )
  }
