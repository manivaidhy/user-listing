import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Server } from "miragejs";
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import { getComparator, stableSort } from '../utils/utils';

let server = new Server()
server.get("/api/getData", {
  rows: [
    { id: 1, date: "2019-01-23", region: "East", rep: "Jones", item: "Pencil", units: 95, unitCost: 1.99, total: 189.05 },
    { id: 2, date: "2019-01-06", region: "Central", rep: "Kivell", item: "Binder", units: 50, unitCost: 19.99, total: 999.05 },
    { id: 3, date: "2019-02-09", region: "Central", rep: "Jardine", item: "Pencil", units: 36, unitCost: 4.99, total: 179.05 },
    { id: 4, date: "2019-02-26", region: "Central", rep: "Gill", item: "Pen", units: 39, unitCost: 19.99, total: 539.05 },
    { id: 5, date: "2019-03-15", region: "West", rep: "Sorvino", item: "Pencil", units: 26, unitCost: 2.99, total: 167.05 },
    { id: 6, date: "2019-04-01", region: "East", rep: "Jones", item: "Binder", units: 82, unitCost: 4.99, total: 299.05 },
    { id: 7, date: "2019-04-18", region: "Central", rep: "Andrews", item: "Pencil", units: 19, unitCost: 1.99, total: 149.05 },
    { id: 8, date: "2019-05-05", region: "West", rep: "Jardine", item: "Pencil", units: 44, unitCost: 4.99, total: 449.05 },
    { id: 9, date: "2019-06-22", region: "East", rep: "Thompson", item: "Pen", units: 92, unitCost: 1.99, total: 63.05 },
    { id: 10, date: "2019-07-08", region: "Central", rep: "Morgan", item: "Pencil", units: 52, unitCost: 8.99, total: 589.05 }
  ]
})

server.get("/api/getSchema", {
  headCells: [
    { id: 'date', numeric: false, disablePadding: false, label: 'Date', sort: true },
    { id: 'region', numeric: true, disablePadding: false, label: 'Region', sort: false },
    { id: 'rep', numeric: true, disablePadding: false, label: 'Rep', sort: true },
    { id: 'item', numeric: true, disablePadding: false, label: 'Item', sort: false },
    { id: 'units', numeric: true, disablePadding: false, label: 'Units', sort: true },
    { id: 'unitCost', numeric: true, disablePadding: false, label: 'Unit Cost', sort: true },
    { id: 'total', numeric: true, disablePadding: false, label: 'Total', sort: true },
  ]
})



function EnhancedTableHead(props) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  let [headCells, setSchema] = useState([]);
  useEffect(() => {
    fetch("/api/getSchema")
      .then((res) => res.json())
      .then((json) => {
        setSchema(json.headCells)
      })
  }, []);

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
        </TableCell>
        {
          headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'default'}
              sortDirection={headCell.sort ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={headCell.sort ? createSortHandler(headCell.id) : createSortHandler()}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export default function EnhancedTable(props) {
  let [rows, setUsers] = useState([]);
  let [originalRows, setOriginalRows] = useState([]);
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [page] = React.useState(0);
  const [rowsPerPage] = React.useState(10);

  useEffect(() => {
    fetch("/api/getData")
      .then((res) => res.json())
      .then((json) => {
        setUsers(json.rows);
        setOriginalRows(json.rows);
      })
    const order = JSON.parse(localStorage.getItem('order'));
    const orderBy = JSON.parse(localStorage.getItem('orderBy'));
    const selected = JSON.parse(localStorage.getItem('selected'));
    order != null && setOrder(order);
    orderBy !== null && setOrderBy(orderBy);
    selected !== null && setSelected(selected);
  }, [])

  useEffect(() => {

    let newSet = [...originalRows];
    if (props.regionFilters && props.regionFilters.length > 0) {
      newSet = newSet.filter(row => props.regionFilters.includes(row.region.toLowerCase()));
    }
    if (props.itemsFilter && props.itemsFilter.length > 0) {
      newSet = newSet.filter(row => props.itemsFilter.includes(row.item.toLowerCase()));
    }
    setUsers(newSet);

  }, [originalRows, props.regionFilters, props.itemsFilter]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    if (isAsc === false) {
      if (order === 'desc') {
        setOrderBy();
      }
    }
  };

  const setLocalStorage = () => {
    localStorage.setItem('order', JSON.stringify(order));
    localStorage.setItem('orderBy', JSON.stringify(orderBy));
    localStorage.setItem('selected', JSON.stringify(selected));
  };

  useEffect(() => {
    setLocalStorage();
  }, [order, orderBy, selected]);

  const handleClick = (event, date) => {
    const selectedIndex = selected.indexOf(date);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, date);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  return (

    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.date)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.date}
                    >
                      <TableCell padding="checkbox">
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">{row.date}</TableCell>
                      <TableCell align="right">{row.region}</TableCell>
                      <TableCell align="right"><Link to={`users/${row.id}`}>{row.rep}</Link></TableCell>
                      <TableCell align="right">{row.item}</TableCell>
                      <TableCell align="right">{row.units}</TableCell>
                      <TableCell align="right">{row.unitCost}</TableCell>
                      <TableCell align="right">{row.total}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
