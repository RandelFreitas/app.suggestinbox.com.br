import React, { useState, useEffect} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RoutesClient from './routesClient';
import { getInfo } from '../../store/clientReducer';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import MarkunreadMailboxIcon from '@material-ui/icons/MarkunreadMailbox';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  img:{
    padding: '10px'
  },
  menu: {
    height: '25px'
  },
  links:{
    margin: 'auto'
  },
  labelLink:{
    padding: '10px',
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  list: {
    width: 200,
  },
  center: {
    textAlign: 'center',
    justifyContent: 'center'
  },
  content: {
    width: '275px',
    margin: 'auto',
    paddingTop: '30px'
  },
}));

const Client = (props) => {
  const { infos } = props;
  const [ idCompany ] = useState(window.location.href.split('/?')[1]);
  const [ idTable ] = useState(window.location.href.split('table=')[1]);

  const [state, setState] = React.useState(false);
  const classes = useStyles();

  useEffect(() => {
    props.getInfo(idCompany, idTable);
  },[idCompany]);

  const toggleDrawer = (open) => (event) => {
    setState(open);
  };

  const list = (
    <div className={classes.list} onClick={toggleDrawer(false)} role="presentation" onKeyDown={toggleDrawer(false)}>
      <List>
        <ListItem button component={Link} to={`/client/?${infos._id}?table=${idTable? idTable: 0}`}>
          <ListItemIcon><HomeIcon/></ListItemIcon>
          <ListItemText primary='Início'/>
        </ListItem>
        <Divider/>
        <ListItem button component={Link} to={`/client/sobrenos/?${infos._id}?table=${idTable? idTable: 0}`}>
          <ListItemIcon><InfoIcon/></ListItemIcon>
          <ListItemText primary='Sobre nós'/>
        </ListItem>
        <Divider/>
        <ListItem button component={Link} to='/'>
          <ListItemIcon><MarkunreadMailboxIcon/></ListItemIcon>
          <ListItemText primary='Sobre o SuggestInBox' />
        </ListItem>
        <Divider/>
      </List>
    </div>
  )
  return(
    <div>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={toggleDrawer(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Drawer open={state} onClose={toggleDrawer(false)}>
            {list}
          </Drawer>
          <Typography variant="button" className={classes.links}>
            <Button color="inherit" component={Link} to={`/client/?${infos._id}?table=${idTable? idTable: 0}`}>SuggestInBox</Button>
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.content}>
        <RoutesClient/>
      </div>
    </div>
  );
}

Client.prototypes = {
  infos: PropTypes.array.isRequired,
  idTable: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  infos: state.client.infos,
  idTable: state.client.idTable
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({getInfo}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Client);