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

const useStyles = makeStyles((theme) =>({
  button: {
    marginTop: '25px',
  },
  buttonAtv: {
    margin: '15px 0'
  }
}));

const Reservation = (props) => {
  const classes = useStyles();
  const { companyById } = props;
  const [ reservation, setReservation ] = useState({
    check: companyById.reservation
  });

  useEffect(() => {
    setReservation({check: companyById.reservation});
  },[companyById.reservation])

  const atvReservation = (companyById) => {
    if(companyById.reservation){
      companyById.reservation = false;
      setReservation({check: companyById.reservation});
      return props.updateCompany(companyById);
    }else{
      companyById.reservation = true;
      setReservation({check: companyById.reservation});
      return props.updateCompany(companyById);
    }
  }

  return(
    <div>
      <Typography variant="h5" component="h2">Reservas</Typography>
      <Grid container>
        <Grid item className={classes.buttonAtv}>
          <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                checked={reservation.check? reservation.check : false}
                onClick={()=>atvReservation(companyById)}
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

Reservation.prototypes = {
  companyById: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  companyById: state.company.companyById,
});

const mapsDispatchToProps = dispatch => 
  bindActionCreators({updateCompany, getCompanyById}, dispatch);

export default connect(mapStateToProps, mapsDispatchToProps)(Reservation);