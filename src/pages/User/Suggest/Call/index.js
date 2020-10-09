import React, {useState, useEffect} from 'react';
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
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles((theme) =>({
  tables: {
    marginTop: '25px'
  },
}));

const Call = (props) => {
  const classes = useStyles();
  const { companyById } = props;
  const [ call, setCall ] = useState({
    check: companyById.call
  })

  const atvCall = (companyById) => {
    if(companyById.call){
      companyById.call = false;
      setCall({check: companyById.call});
      return props.atvCompany(companyById);
    }else{
      companyById.call = true;
      setCall({check: companyById.call});
      return props.atvCompany(companyById);
    }
  }

  return(
    <div>
      <Typography variant="h5" component="h2">Chamada por mesa</Typography>
      <Grid container>
        <Grid item>
          <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                checked={call.check}
                onClick={()=>atvCall(companyById)}
                name="checkedA"
                color="primary"
              />
            }
            label="Ativar/Desativar"
          />
          </FormGroup>
        </Grid>
      </Grid>
      <Grid container>
        <AppBar className={classes.tables} position="static">
          <Toolbar>
            <Typography variant="h6">
              Mesa 1
            </Typography>
          </Toolbar>
        </AppBar>
      </Grid>
    </div>
  );
}

Call.prototypes = {
  companyById: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  companyById: state.company.companyById,
});

const mapsDispatchToProps = dispatch => 
  bindActionCreators({atvCompany, getCompanyById}, dispatch);

export default connect(mapStateToProps, mapsDispatchToProps)(Call);