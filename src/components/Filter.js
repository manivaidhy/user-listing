import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function Filter(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    binder: false,
    pen: false,
    pencil: false,
    east: false,
    central: false,
    west: false
  });

  useEffect(() => {
    setState({ ...state, ...props.combinedFilters })
  }, [props.combinedFilters])

  const handleChange = (event) => {
    let { onFilter } = props;
    setState({ ...state, [event.target.name]: !state[event.target.name] });
    onFilter('region', event.target.name, event.target.checked);
  };

  const handleItemChange = (event) => {
    let { onFilter } = props;
    setState({ ...state, [event.target.name]: !state[event.target.name] });
    onFilter('items', event.target.name, event.target.checked);
  }

  const { binder, pen, pencil } = state;
  const { east, central, west } = state;

  return (
    <div className={classes.root}>
        <Grid container>
        <Grid item>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Items</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={binder} onChange={handleItemChange} name="binder" />}
            label="Binder"
          />
          <FormControlLabel
            control={<Checkbox checked={pencil} onChange={handleItemChange} name="pencil" />}
            label="Pencil"
          />
          <FormControlLabel
            control={<Checkbox checked={pen} onChange={handleItemChange} name="pen" />}
            label="Pen"
          />
        </FormGroup>
      </FormControl>
      </Grid>
      <Grid item>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Region</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={east} onChange={handleChange} name="east" />}
            label="East"
          />
          <FormControlLabel
            control={<Checkbox checked={central} onChange={handleChange} name="central" />}
            label="Central"
          />
          <FormControlLabel
            control={<Checkbox checked={west} onChange={handleChange} name="west" />}
            label="West"
          />
        </FormGroup>
      </FormControl>
      </Grid>
      </Grid>
    </div>
  );
}

Filter.propTypes = {
  combinedFilters: PropTypes.object,
  onFilter: PropTypes.func
};
