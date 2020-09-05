import React from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logout } from '../../store/authReducer';
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

  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute">
          <Toolbar className={classes.toolbar}>
            <Typography component={Link} to='/user' variant="h6" color="inherit" noWrap className={classes.title}>
              SuggestInBox
            </Typography>
            <div className={classes.profile}>Randel</div>
            <IconButton component={Link} to='/user/setup' color="inherit">
              <SettingsIcon/>
            </IconButton>
            <IconButton onClick={props.logout} color="inherit">
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
  infos: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  infos: state.auth.infos,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({logout}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(User);