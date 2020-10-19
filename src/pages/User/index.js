import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logoutUser } from '../../services/auth';
import { getUserById } from '../../store/userReducer';
import PropTypes from 'prop-types';
import RoutesUser from './routesUser';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  profile: {
    paddingRight: 17
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
}));

const User = (props) => {
  const classes = useStyles();
  const [ idUser ] = useState(window.location.href.split('?')[1].split('?')[0]);
  const { userById } = props;
  
  useEffect(() => {
    props.getUserById(idUser);
  },[]);

  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute">
          <Toolbar className={classes.toolbar}>
            <Typography component={Link} to={`/user/?${userById._id}?page=1&limit=25`} variant="h6" color="inherit" noWrap className={classes.title}>
              SuggestInBox
            </Typography>
            <div className={classes.profile}>{userById.name}</div>
            <IconButton aria-label="Ver notificações" color="inherit">
              <Badge badgeContent={0} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton component={Link} to={`/user/setup/?${userById._id}`} color="inherit">
              <SettingsIcon/>
            </IconButton>
            <IconButton onClick={()=>logoutUser()} color="inherit">
              <ExitToAppIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid>
              <RoutesUser />
            </Grid>
          </Container>
        </main>
      </div>
    </div>
  );
};

User.prototypes = {
  userById: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  userById: state.user.userById,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({getUserById}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(User);