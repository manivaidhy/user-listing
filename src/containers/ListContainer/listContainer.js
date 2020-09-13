import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Filter from '../../components/Filter';
import Table from '../../components/Table';
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

export default function ListContainer() {
  const [regions, setRegions] = useState([]);
  const [items, setItemFilter] = useState([]);
  const [showFilter, setShowFilter] = useState(true);

  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const fixedFilter = clsx(classes.filterSpacing, classes.paper, classes.fixedHeight);

  const onClickFilter = () => {
    setRegions([]);
    setItemFilter([]);
    setShowFilter(!showFilter);
  }

  const setLocalStorage = () => {
    localStorage.setItem('regions', JSON.stringify(regions));
    localStorage.setItem('items', JSON.stringify(items));
    localStorage.setItem('showFilter', JSON.stringify(showFilter));
  }

  useEffect(() => {
    const regions = JSON.parse(localStorage.getItem('regions'));
    const items = JSON.parse(localStorage.getItem('items'));
    const showFilter = JSON.parse(localStorage.getItem('showFilter'));
    regions !== null && setRegions(regions);
    items !== null && setItemFilter(items);
    showFilter !== null && setShowFilter(showFilter);
  }, []);

  useEffect(() => {
    setLocalStorage();
  }, [regions, items, showFilter])

  const onFilterClick = (origin, filterValue, checked) => {
    if (origin === 'region') {
      let newRegions;
      if (checked === true) {
        newRegions = regions.concat(filterValue.toLowerCase());
      } else {
        newRegions = regions.filter(region => region !== filterValue);
      }
      setRegions(newRegions);
    } else {
      let newItems;
      if (checked === true) {
        newItems = items.concat(filterValue.toLowerCase());
      } else {
        newItems = items.filter(region => region !== filterValue);
      }
      setItemFilter(newItems);
    }
  }

  const combinedFilters = {};
  regions.concat(items).map(filter => {
    combinedFilters[filter] = true
  });

  return (
    <main className={classes.content}>
      <div className={classes.appBarSpacer} />
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3} justify="space-between">
          <Grid item>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              Representative List
          </Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={onClickFilter}>
              Filter
              {regions.length > 0 || items.length > 0 ? (regions.length + items.length) < 6 ? `(${regions.length + items.length})` : null : null}
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          {/* Table */}
          <Grid item xs={12} md={showFilter ? 9 : 12} lg={showFilter ? 9 : 12}>
            <Paper className={fixedHeightPaper} >
              <Table regionFilters={regions} itemsFilter={items} />
            </Paper>
          </Grid>
          {/* Filter */}
          {
            showFilter ? <Grid item xs={12} md={3} lg={3} id="filter">
              <Paper className={fixedFilter}>
                <Filter onFilter={onFilterClick} combinedFilters={combinedFilters} />
              </Paper>
            </Grid>
              : null}
        </Grid>
        {copyright}
      </Container>
    </main>
  )


}