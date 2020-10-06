import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { listSuggest, favorite, outlier } from '../../../../store/admReducer';
import { parseISO } from 'date-fns';
import { format, addHours, zonedTimeToUtc } from 'date-fns-tz';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import { ptBR } from "date-fns/locale";

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import Box from '@material-ui/core/Box';
import Pagination from '@material-ui/lab/Pagination';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

const theme = createMuiTheme({
  palette: {
    secondary:{
      main: '#FFB701'
    }
  },
});

const useStyles = makeStyles((theme) =>({
  center: {
    justifyContent: 'center',
    textAlign: 'center',
    margin: '20px'
  },
  filter: {
    minWidth: '110px',
    marginLeft: '9px'
  },
  data: {
    margin: '9px',
    maxWidth: '140px'
  }
}));

const Suggest = (props) => {
  const classes = useStyles();
  const {suggests, infosSuggests} = props;
  const nOfPages = infosSuggests.pages;
  const [page, setPage] = useState(1);
  const [nOfItems, setNoOfItems] = useState(25);
  const [ idCompany ] = useState(window.location.href.split('/?')[2]);

  useEffect(() => {
    props.listSuggest(page, nOfItems, idCompany);
  },[page, nOfItems]);

  const handleChange=(event, value)=>{
    setPage(value);
  }
  const handleNofItems=(event)=>{
    setNoOfItems(event.target.value);
    setPage(1);
  }
  const favoriteUpdate = (suggest) => {
    if(suggest.favorite){
      suggest.favorite = false;
      return props.favorite(suggest)
    }else{
      suggest.favorite = true;
      return props.favorite(suggest)
    }
  }
  const outlierUpdate = (suggest) => {
    if(suggest.outlier){
      suggest.outlier = false;
      return props.outlier(suggest)
    }else{
      suggest.outlier = true;
      return props.outlier(suggest)
    }
  }
  const [selectedDate, setSelectedDate] = useState(Date.now);

  const handleDateChange = (date) => {
    const znDate = zonedTimeToUtc(date, 'America/Sao_Paulo');
    //setSelectedDate(date);
    console.log(znDate);
    console.log(date);
  };

  return (
    <div>
      <Typography variant="h5" component="h2">Sugestões</Typography>
       <div>
        <FormControl>
          <FormHelperText>Número por página:</FormHelperText>
          <Select
            value={nOfItems}
            onChange={handleNofItems}
            inputProps={{ 'aria-label': 'Without label' }}>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.filter}>
          <FormHelperText>Filtrar por:</FormHelperText>
          <Select
            value={nOfItems}
            onChange={handleNofItems}
            inputProps={{ 'aria-label': 'Without label' }}>
            <MenuItem value={10}>Todas</MenuItem>
            <MenuItem value={25}>Favoritas</MenuItem>
            <MenuItem value={50}>Arquivadas</MenuItem>
          </Select>
        </FormControl>
        <MuiPickersUtilsProvider locale={ptBR} utils={DateFnsUtils}>
          <KeyboardDatePicker
            className={classes.data}
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="De"
            size="small"
            invalidDateMessage="Data inválida."
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardDatePicker
            className={classes.data}
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="normal"
            id="date-picker-inline"
            label="Até"
            size="small"
            invalidDateMessage="Data inválida."
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
      </div>
      <Paper>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align='center'>Data</TableCell>
                <TableCell align='center'>Nome</TableCell>
                <TableCell align='center'>Telefone</TableCell>
                <TableCell align='center'>Avaliação</TableCell>
                <TableCell align='center'>Recomenda</TableCell>
                <TableCell align='center'>Opinião</TableCell>
                <TableCell align='center'/>
                <TableCell align='center'/>
              </TableRow>
            </TableHead>
            <TableBody>
              <MuiThemeProvider theme={theme}>
                { suggests.map( suggest => {
                  return (
                    <TableRow hover key={suggest._id} role="checkbox" tabIndex={-1}>
                      <TableCell align='center'>{format(parseISO(suggest.createdAt), 'dd/MM/yyyy HH:mm', {timeZone: 'America/Sao_Paulo'} )}</TableCell>
                      <TableCell align='center'>{suggest.name}</TableCell>
                      <TableCell align='center'>{suggest.phone}</TableCell>
                      <TableCell align='center'>
                        <Rating name="read-only" size="small" value={suggest.stars? suggest.stars: 0} precision={0.5} readOnly/>
                      </TableCell>
                      <TableCell align='center'>{suggest.recommends? (<CheckIcon/>) : (<CloseIcon/>)}</TableCell>
                      <TableCell align='center'>{suggest.opinion}</TableCell>
                      <TableCell align='center'>
                        <IconButton onClick={() => favoriteUpdate(suggest)}>
                          {suggest.favorite? (<StarIcon color='secondary'/>):(<StarBorderIcon/>)}
                        </IconButton>
                      </TableCell>
                      <TableCell align='center'>
                        <IconButton onClick={() => outlierUpdate(suggest)}>
                          {suggest.outlier? (<DeleteOutlineIcon color="disabled"/>):(<DeleteOutlineIcon/>)}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </MuiThemeProvider>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid className={classes.center} container item xs={12} spacing={3}>
          <Box component="span">
            <Pagination
              count={nOfPages}
              page={page}
              onChange={handleChange}
            />
          </Box>
        </Grid>
      </Paper>
    </div>
  );
}

Suggest.prototypes = {
  suggest: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  suggests: state.adm.suggests,
  infosSuggests: state.adm.infosSuggests,
});

const mapsDispatchToProps = dispatch => 
  bindActionCreators({listSuggest, favorite, outlier}, dispatch);

export default connect(mapStateToProps, mapsDispatchToProps)(Suggest);