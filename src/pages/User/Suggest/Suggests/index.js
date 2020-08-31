import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { listSuggest } from '../../../../store/admReducer';

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

const Suggest = (props) => {
  const {suggests, infosSuggests} = props;
  const nOfPages = infosSuggests.pages;
  const [page, setPage] = useState(1);
  const [nOfItems, setNoOfItems] = useState(10);

  useEffect(() => {
    props.listSuggest(page, nOfItems);
  },[page, nOfItems]);

  const handleChange=(event, value)=>{
    setPage(value);
  }
  const handleNofItems=(event)=>{
    setNoOfItems(event.target.value);
    console.log(nOfPages);
    setPage(1);
  }

  return (
    <div>
      <Typography variant="h5" component="h2">Suggestões</Typography>
       <div>
        <FormControl>
          <FormHelperText>Número por página:</FormHelperText>
          <Select
            value={nOfItems}
            onChange={handleNofItems}
            inputProps={{ 'aria-label': 'Without label' }}>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
          </Select>
        </FormControl>
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
                <TableCell align='center'> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { suggests.map( suggest => {
                return (
                  <TableRow hover key={suggest._id} role="checkbox" tabIndex={-1}>
                    <TableCell align='center'>{suggest.createdAt}</TableCell>
                    <TableCell align='center'>{suggest.name}</TableCell>
                    <TableCell align='center'>{suggest.phone}</TableCell>
                    <TableCell align='center'>{suggest.stars}</TableCell>
                    <TableCell align='center'>{suggest.recommends === true? "Sim":"Não"}</TableCell>
                    <TableCell align='center'>{suggest.opinion}</TableCell>
                    <TableCell align='center'>{suggest.favorite === true? "Sim":"Não"}</TableCell>
                  </TableRow>
              )})}
            </TableBody>
          </Table>
        </TableContainer>
        <Box component="span">
          <Pagination
            count={nOfPages}
            page={page}
            onChange={handleChange}
          />
        </Box>
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
  bindActionCreators({listSuggest}, dispatch);

export default connect(mapStateToProps, mapsDispatchToProps)(Suggest);