import React from 'react';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

  export const copyright = (
    <Box pt={4}>
        <Typography variant="body2" color="textSecondary" align="center">
          {' © '}
          <Link color="inherit">
            User Listing
          </Link>{' '}
          {new Date().getFullYear()}
        </Typography>
     </Box>
  );