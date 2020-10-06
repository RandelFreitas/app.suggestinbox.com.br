import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

const Finances = () => {
  return(
    <div>
      <Typography variant="h5" component="h2">Financeiro</Typography>
      <Grid container>
        <Grid item>
          Financeiro em desenvolvimento
        </Grid>
      </Grid>
    </div>
  );
}

export default Finances;