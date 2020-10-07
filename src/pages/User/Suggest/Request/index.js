import React, {useState} from 'react';

import Switch from "@material-ui/core/Switch";
import { makeStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) =>({
  button: {
    marginTop: '25px',
  },
}));

const Request = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    checkedA: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return(
    <div>
      <Typography variant="h5" component="h2">Pedidos</Typography>
      <Grid container>
        <Grid item>
          <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                checked={state.checkedB}
                onChange={handleChange}
                name="checkedA"
                color="primary"
              />
            }
            label="Ativar/Desativar"
          />
          </FormGroup>
          <Button className={classes.button} variant="contained" color="primary">
            Criar
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Request;