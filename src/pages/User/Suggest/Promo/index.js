import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { atvPromo, getCompanyById } from '../../../../store/admReducer';

import { makeStyles } from '@material-ui/core/styles';
import Switch from "@material-ui/core/Switch";
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

const Promo = (props) => {
  const classes = useStyles();
  const { companyById } = props;
  const [ promo, setPromo ] = useState({
    check: companyById.promo
  })

  const atvPromo = (companyById) => {
    if(companyById.promo){
      companyById.promo = false;
      setPromo({check: companyById.promo});
      return props.atvPromo(companyById);
    }else{
      companyById.promo = true;
      setPromo({check: companyById.promo});
      return props.atvPromo(companyById);
    }
  }

  return(
    <div>
      <Typography variant="h5" component="h2">Promoção</Typography>
      <Grid container>
        <Grid item>
          <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                checked={promo.check}
                onClick={()=>atvPromo(companyById)}
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

Promo.prototypes = {
  companyById: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  companyById: state.adm.companyById,
});

const mapsDispatchToProps = dispatch => 
  bindActionCreators({atvPromo, getCompanyById}, dispatch);

export default connect(mapStateToProps, mapsDispatchToProps)(Promo);