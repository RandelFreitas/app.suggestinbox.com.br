import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { atvCompany, getCompanyById } from '../../../../store/companyReducer';

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

const Delivery = (props) => {
  const classes = useStyles();
  const { companyById } = props;
  const [ delivery, setDelivery ] = useState({
    check: companyById.delivery
  })

  const atvDelivery = (companyById) => {
    if(companyById.delivery){
      companyById.delivery = false;
      setDelivery({check: companyById.delivery});
      return props.atvCompany(companyById);
    }else{
      companyById.delivery = true;
      setDelivery({check: companyById.delivery});
      return props.atvCompany(companyById);
    }
  }

  return(
    <div>
      <Typography variant="h5" component="h2">Delivery</Typography>
      <Grid container>
        <Grid item>
          <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                checked={delivery.check}
                onClick={()=>atvDelivery(companyById)}
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

Delivery.prototypes = {
  companyById: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  companyById: state.company.companyById,
});

const mapsDispatchToProps = dispatch => 
  bindActionCreators({atvCompany, getCompanyById}, dispatch);

export default connect(mapStateToProps, mapsDispatchToProps)(Delivery);