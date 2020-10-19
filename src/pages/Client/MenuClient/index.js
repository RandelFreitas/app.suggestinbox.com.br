import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getMenu, addCall } from '../../../store/clientReducer';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TableHead } from '@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: 'auto',
      width: '100%',
    },
  },
  photo: {
    margin: '0 auto',
    marginBottom: '10px',
    marginTop: '20px',
    width: 128,
    height: 128,
  },
  center: {
    textAlign: 'center',
    margin: 'auto',
    marginBottom: '20px',
  },
  button: {
    marginTop: '20px',
  },
  buttonEnd: {
    marginTop: '20px',
    marginBottom: '50px'
  },
  hide: {
    display: 'none'
  }
}));

const MenuClient = (props) =>{
  const classes = useStyles();
  const { menu, sectionMenu, infos, idTable } = props;

  const [companyId] = useState(window.location.href.split('?')[1]);

  useEffect(() => {
    props.getMenu(companyId);
  },[])

  return(
    <div className={classes.root}>
      <div className={classes.center}>
        <CardMedia className={classes.photo} image="/assets/logoBar.png" title="Contemplative Reptile"/>
        <h3>{infos.name}</h3>
        <p>{infos.slogan}</p>
      </div>
      <h3 className={classes.center}>{menu.name}</h3>
      <Paper className={classes.menu}>
        {sectionMenu.sort((a, b) => a.index > b.index? 1 : -1).map(section => {
          return (
            <TableContainer key={section._id}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={2} align='center'>
                      <h4>{section.name}</h4>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {section.itemMenu.sort((a, b) => a.index > b.index? 1 : -1).map(item => {
                    return (
                      <TableRow key={item._id}>
                        <TableCell align='left'>
                          <h5>{item.name}</h5> 
                          <h6><i>({item.description})</i></h6>
                        </TableCell>
                        <TableCell align='right'>{(item.value).toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )})}
      </Paper>
        <Button className={classes.button}
          component={Link} to={`/client/?${infos._id}?table=${idTable}`}
          variant="contained" color="primary">
          Voltar ao Menu
        </Button>
        <Button className={props.infos.call && idTable != 0? classes.buttonEnd : classes.hide} 
          onClick={() => props.addCall(infos._id, idTable)}
          component={Link} to={`/client/atencao/?${infos._id}?table=${idTable? idTable: 0}`} 
          variant="contained" color="primary">
          Chamar garçom
        </Button>
    </div>
  );
}

MenuClient.prototypes = {
  infos: PropTypes.array.isRequired,
  idTable: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  infos: state.client.infos,
  idTable: state.client.idTable,
  menu: state.client.menu,
  sectionMenu: state.client.sectionMenu,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({getMenu, addCall}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MenuClient);