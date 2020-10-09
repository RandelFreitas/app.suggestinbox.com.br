import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CardMedia from '@material-ui/core/CardMedia';

import { makeStyles } from '@material-ui/core/styles';
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
    marginBottom: "20px"
  },
  hidden: {
    display: 'none'
  }
}));

const MainClient = (props) => {
  const { infos, idTable } = props;
  const classes = useStyles();

  return(
    <div className={classes.root}>
      <CardMedia className={classes.photo} image={infos.urlImg? infos.urlImg : "..."} title="Contemplative Reptile"/>
      <div className={classes.center}>
        <h3>{infos.name}</h3>
        <p>{infos.slogan}</p>
      </div>
      <Button className={classes.button} component={Link} to={`/client/opiniao/?${infos._id}?table=${idTable? idTable: 0}`} variant="contained" color="primary">
        Dar opinião
      </Button>
      <Button className={props.infos.menu? classes.button : classes.hidden} 
              component={Link} to={`/client/opiniao/?${infos._id}?table=${idTable? idTable: 0}`} 
              variant="contained" color="primary">
        Cardápio online
      </Button>
      <Button className={props.infos.call? classes.button : classes.hidden} 
              component={Link} to={`/client/opiniao/?${infos._id}?table=${idTable? idTable: 0}`} 
              variant="contained" color="primary">
        Chamar garçom
      </Button>
    </div>
  );
}

MainClient.prototypes = {
  infos: PropTypes.array.isRequired,
  idTable: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  infos: state.client.infos,
  idTable: state.client.idTable
});

export default connect(mapStateToProps)(MainClient);