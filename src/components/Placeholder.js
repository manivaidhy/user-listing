import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Placeholder({ user }) {
  const classes = useStyles();
  return (
    <div>
        {
            user && user.rep ? (
                <div>
                <Typography component="h2" variant="h6" color="primary">
                    Total Units
                </Typography>
                <Typography component="p" variant="h4">
                    {user.units}
                </Typography>
                <Typography color="textSecondary" className={classes.depositContext} gutterBottom>
                    {user.item}(s)
                </Typography>
                <Typography component="h2" variant="h6" color="primary">
                    Unit Cost
                </Typography>
                <Typography component="p" variant="h4" gutterBottom>
                    {user.unitCost}
                </Typography>
                <Typography component="h2" variant="h6" color="primary">
                    Total
                </Typography>
                <Typography component="p" variant="h4" gutterBottom>
                    {user.total}
                </Typography>
                </div>
            ) : null
        }
    </div>
  );
}

Placeholder.propTypes = {
    user: PropTypes.object,
  };