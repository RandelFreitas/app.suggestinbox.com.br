import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { listSuggest } from '../../../store/admReducer';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const MainUser = (props) => {
  const {suggests, infos} = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    props.listSuggest(1);
  },[page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <div>
        FILTROS
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
                <TableCell align='center'>Ação</TableCell>
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
                    <TableCell align='center'>{suggest.recommends}</TableCell>
                    <TableCell align='center'>{suggest.opinion}</TableCell>
                    <TableCell align='center'>F E E</TableCell>
                  </TableRow>
              )})}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={10}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

MainUser.prototypes = {
  suggests: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  suggests: state.adm.suggests,
  infos: state.adm.infos,
});

const mapsDispatchToProps = dispatch => 
  bindActionCreators({listSuggest}, dispatch);

export default connect(mapStateToProps, mapsDispatchToProps)(MainUser);