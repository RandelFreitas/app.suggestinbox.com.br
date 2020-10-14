import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: 'auto',
      width: '100%',
    },
  },
  centerText: {
    textAlign: 'center',
  },
  okText: {
    textAlign: 'center',
    margin: '15px'
  },
  button: {
    marginTop: '15px'
  },
  photo: {
    margin: '0 auto',
    marginBottom: '10px',
    marginTop: '20px',
    width: 128,
    height: 128,
  },
}));

const AtentionClient = (props) => {
  const classes = useStyles();
  const { infos } = props;

  return(
    <Grid container className={classes.root}>
      <CardMedia className={classes.photo} image="/assets/logoBar.png" title="Contemplative Reptile"/>
      <h3 className={classes.centerText}>{props.infos.name}</h3>
      <p className={classes.centerText}>{props.infos.slogan}</p>
      <Typography className={classes.okText} variant="h5">Chamado enviado!</Typography>
      <Typography className={classes.centerText}>Chegaremos assim que possível.</Typography>
      <Typography className={classes.centerText}>Enquanto isso você pode ver nosso cardápio online no botão abaixo:</Typography>
      <Button className={classes.button} component={Link} to={`/client/cardapio/?${infos._id}?table=${infos.idTable? infos.idTable: 0}`} variant="contained" color="primary">
        Cardápio online
      </Button>
    </Grid>
  );
}

AtentionClient.prototypes = {
  infos: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  infos: state.client.infos
});

export default connect(mapStateToProps)(AtentionClient);