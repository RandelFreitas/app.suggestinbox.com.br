import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { listCalls } from '../../../../store/callReducer';
import { atvCompany } from '../../../../store/companyReducer';
import { parseISO } from 'date-fns';
import { format } from 'date-fns-tz';

import Switch from "@material-ui/core/Switch";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Pagination from '@material-ui/lab/Pagination';

import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme) =>({
  tables: {
    marginTop: '25px'
  },
  center: {
    justifyContent: 'center',
    textAlign: 'center',
    margin: '20px'
  },
}));

const Call = (props) => {
  const classes = useStyles();
  const { companyById, calls } = props;
  const pages = 1;
  const [ page, setPage ] = useState(1);
  const [ limit, setLimit ] = useState(25);

  const [ call, setCall ] = useState({
    check: companyById.call
  });

  useEffect(() => {
    props.listCalls(1, 25)
  },[]);

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

  const handleChangePage=(event, value)=>{
    setPage(value);
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
                <TableCell align='center'>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { calls.map( call => {
                return (
                  <TableRow hover key={call.createdAt} role="checkbox" tabIndex={-1}>
                    <TableCell align='center'>{call.table}</TableCell>
                    <TableCell align='center'>{format(parseISO(call.createdAt), 'dd/MM/yyyy HH:mm', {timeZone: 'America/Sao_Paulo'} )}</TableCell>
                    <TableCell align='center'>{call.status? "Atendita" : "Esperando"}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid className={classes.center} container item xs={12} spacing={3}>
          <Box component="span">
            <Pagination
              count={pages}
              page={page}
              onChange={handleChangePage}
            />
          </Box>
        </Grid>
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
  bindActionCreators({listCalls, atvCompany}, dispatch);

export default connect(mapStateToProps, mapsDispatchToProps)(Call);