import React, { useState, useEffect} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RoutesClient from './routesClient';
import { getInfo } from '../../store/clientReducer';
import history from '../../services/history';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  header:{
    background: '#FFB701',
    textAlign: 'center',
  },
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
    width: 220,
  },
  center: {
    textAlign: 'center',
    justifyContent: 'center'
  },
  offset: theme.mixins.toolbar,
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FED200',
    },
    secondary:{
      main: '#FFB701'
    }
  },
});

const Client = (props) => {
  const { infos } = props;
  const [ idUrl ] = useState(window.location.href.split('/?')[1]);
  const [state, setState] = React.useState(false);
  const classes = useStyles();

  useEffect(() => {
    if(idUrl){
      props.getInfo(idUrl);
    }else{
      history.push('/');
    }
  },[]);

  const toggleDrawer = (open) => (event) => {
    setState(open);
  };

  const list = (
    <div className={classes.list} onClick={toggleDrawer(false)} role="presentation" onKeyDown={toggleDrawer(false)}>
      <List>
        <ListItem button>
          <Button component={Link} to={`/client/?${infos._id}`}>
            <ListItemIcon><InboxIcon/></ListItemIcon>
            <ListItemText primary='Início' />
          </Button>
        </ListItem>
        <Divider/>
        <ListItem button>
          <Button component={Link} to={`/client/sobrenos/?${infos._id}`}>
            <ListItemIcon><InboxIcon/></ListItemIcon>
            <ListItemText primary='Sobre nós' />
          </Button>
        </ListItem>
        <Divider/>
      </List>
    </div>
  )
  return(
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar color="primary">
          <IconButton onClick={toggleDrawer(true)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Drawer open={state} onClose={toggleDrawer(false)}>
            {list}
          </Drawer>
          <Typography variant="button" className={classes.links}>
            <Button component={Link} to={`/client/?${infos._id}`}>SuggestInBox</Button>
          </Typography>
        </Toolbar>
      </AppBar>
      <div>
        <RoutesClient/>
      </div>
      <AppBar position="fixed" color="secondary" className={classes.appBar}>
        <Toolbar className={classes.center}>
          <Typography variant="caption" >SuggestInBox © - 2020 Copyright.</Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </MuiThemeProvider>
  );
}

Client.prototypes = {
  infos: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  infos: state.client.infos
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({getInfo}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Client);