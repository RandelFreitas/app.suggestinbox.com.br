import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { listCalls, destroyCall } from '../../../../store/callReducer';
import { atvCompany } from '../../../../store/companyReducer';
import { parseISO } from 'date-fns';
import { format } from 'date-fns-tz';

import Switch from "@material-ui/core/Switch";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles(() =>({
  tables: {
    marginBottom: '25px',
  },
  center: {
    justifyContent: 'center',
    textAlign: 'center',
    margin: '20px'
  },
  hide: {
    display: 'none'
  },
  buttonAtv: {
    margin: '15px 0'
  }
}));

const Call = (props) => {
  const classes = useStyles();
  const { companyById, calls } = props;

  const [ call, setCall ] = useState({
    check: companyById.call
  });

  useEffect(() => {
    props.listCalls(1, 25)
  },[]);

  useEffect(() => {
    setCall({check: companyById.call});
  },[companyById.call])

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
        <Grid item className={classes.buttonAtv}>
          <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                checked={call.check? call.check : false}
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
        <Grid className={classes.tables} item>
          <Typography variant="h6">Chamados</Typography>
        </Grid>
      </Grid>

      <Paper>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align='center'>Mesa</TableCell>
                <TableCell align='center'>Hora</TableCell>
                <TableCell align='center'></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { calls.map( call => {
                return (
                  <TableRow hover key={call.createdAt} role="checkbox" tabIndex={-1}>
                    <TableCell align='center'>{call.table}</TableCell>
                    <TableCell align='center'>{format(parseISO(call.createdAt), 'dd/MM/yyyy HH:mm', {timeZone: 'America/Sao_Paulo'} )}</TableCell>
                    <TableCell align='center'>
                      <Button className={classes.button} onClick={()=>props.destroyCall(call._id)} variant="contained" color="primary">
                        Atendida
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}

Call.prototypes = {
  companyById: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  companyById: state.company.companyById,
  calls: state.call.calls,
});

const mapsDispatchToProps = dispatch => 
  bindActionCreators({listCalls, atvCompany, destroyCall}, dispatch);

export default connect(mapStateToProps, mapsDispatchToProps)(Call);