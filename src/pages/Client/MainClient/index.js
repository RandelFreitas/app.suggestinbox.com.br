import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: 'auto',
      width: '100%',
    },
  },
  center: {
    textAlign: 'center',
    margin: 'auto',
    marginBottom: '20px',
  },
  button: {
    marginBottom: "20px"
  },
  hidden: {
    display: 'none'
  }
}));

const MainClient = (props) => {
  const { infos } = props;
  const classes = useStyles();

  return(
    <div className={classes.root}>
      <div className={classes.center}>
        <h3>{infos.name}</h3>
        <p>{infos.slogan}</p>
      </div>
      <Button className={classes.button} component={Link} to={`/client/opiniao/?${infos._id}`} variant="contained" color="primary">
        Dar opinião
      </Button>
      <Button className={props.infos.menu? classes.button : classes.hidden} 
              component={Link} to={`/client/opiniao/?${infos._id}`} 
              variant="contained" color="primary">
        Cardápio online
      </Button>
      <Button className={props.infos.tables? classes.button : classes.hidden} 
              component={Link} to={`/client/opiniao/?${infos._id}`} 
              variant="contained" color="primary">
        Chamar garçom
      </Button>
    </div>
  );
}

MainClient.prototypes = {
  infos: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  infos: state.client.infos
});

export default connect(mapStateToProps)(MainClient);