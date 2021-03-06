import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateCompany, getCompanyById } from '../../../../store/userStores/companyStores/companyReducer';

import { makeStyles } from '@material-ui/core/styles';
import Switch from "@material-ui/core/Switch";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(() =>({
  button: {
    marginTop: '25px',
  },
  hide: {
    display: 'none'
  },
  buttonAtv: {
    margin: '15px 0'
  }
}));

const Promo = (props) => {
  const classes = useStyles();
  const { companyById } = props;
  
  const [ promo, setPromo ] = useState({
    check: companyById.promo
  });

  useEffect(() => {
    setPromo({check: companyById.promo});
  },[companyById.promo])

  const atvPromo = (companyById) => {
    if(companyById.promo){
      companyById.promo = false;
      setPromo({check: companyById.promo});
      return props.updateCompany(companyById);
    }else{
      companyById.promo = true;
      setPromo({check: companyById.promo});
      return props.updateCompany(companyById);
    }
  }

  return(
    <div>
      <Typography variant="h5" component="h2">Promoção</Typography>
      <Grid container>
        <Grid item className={classes.buttonAtv}>
          <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                checked={promo.check? promo.check : false}
                onClick={()=>atvPromo(companyById)}
                name="checkedA"
                color="primary"
              />
            }
            label="Ativar/Desativar"
          />
          </FormGroup>
        </Grid>
      </Grid>
    </div>
  );
}

Promo.prototypes = {
  companyById: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  companyById: state.company.companyById,
});

const mapsDispatchToProps = dispatch => 
  bindActionCreators({updateCompany, getCompanyById}, dispatch);

export default connect(mapStateToProps, mapsDispatchToProps)(Promo);