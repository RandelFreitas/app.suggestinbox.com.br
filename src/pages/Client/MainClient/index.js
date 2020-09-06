import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: 'auto',
      width: '100%',
    },
  },
  center: {
    textAlign: 'center',
    margin: '20px auto'
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1769aa',
    },
    secondary:{
      main: '#FFB701'
    }
  },
});

const MainClient = (props) => {
  const { infos } = props;
  const classes = useStyles();

  return(
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <div className={classes.center}>
          <h3>{infos.name}</h3>
          <p>{infos.slogan}</p>
        </div>
        <Button component={Link} to={`/client/opiniao/?${infos._id}`} variant="contained" color="primary">
          Dar opinião
        </Button>
        <Button component={Link} to={`/client/opiniao/?${infos._id}`} variant="contained" color="primary">
          Cardápio online
        </Button>
        <Button component={Link} to={`/client/opiniao/?${infos._id}`} variant="contained" color="primary">
          Chamar garçom
        </Button>
        {/*
        <Link className={styles.link} to={`/client/cardapio/?${infos._id}`}>Cardápio online</Link>
        <Link className={styles.link} to={`/client/atencao/?${infos._id}`}>Chamar garçom(a)</Link>
        */}

      </div>
    </MuiThemeProvider>
  );
}

MainClient.prototypes = {
  infos: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  infos: state.client.infos
});

export default connect(mapStateToProps)(MainClient);