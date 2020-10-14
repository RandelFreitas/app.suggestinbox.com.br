import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ScratchCard from 'react-scratchcard';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: 'auto',
      width: '100%',
      touchAction: 'none',
    },
  },
  centerText: {
    border: '2px solid',
    textAlign: 'center',
    padding: '55px 0'
  },
  okText: {
    textAlign: 'center',
    margin: '15px'
  },
  button: {
    marginTop: '15px'
  },
  
}));

const ConfirmClient = (props) => {
  const classes = useStyles();
  const { infos } = props;

  const settings = {
    width: 200,
    height: 200,
    image: "/assets/scratch.jpg",
    finishPercent: 50,
    onComplete: () => console.log('The card is now clear!')
  };
  
  return (
    <Grid container className={classes.root}>
      <Typography className={classes.okText} variant="h5">Obrigado pela sua opinião!</Typography>
      <ScratchCard {...settings}>
        <Typography className={classes.centerText}>
          Tente novamente na sua próxima visita!
        </Typography>
      </ScratchCard>
      <Button className={classes.button} component={Link} to={`/client/?${infos._id}?table=${infos.idTable? infos.idTable: 0}`} variant="contained" color="primary">
        Voltar ao início
      </Button>
    </Grid>
  );
}

ConfirmClient.prototypes = {
  infos: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  infos: state.client.infos
});

export default connect(mapStateToProps)(ConfirmClient);