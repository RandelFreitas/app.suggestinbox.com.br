import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReCAPTCHA from "react-google-recaptcha"
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { hideMessage, showProgress, hideProgress } from '../../store/messageReducer';
import MessageDialog from '../Dialog';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { fogot } from '../../store/authReducer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  center: {
    textAlign: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  error: {
    color: 'red',
    fontSize: 12
  },
  link: {
    fontSize: 15 
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Fogot = (props) => {
  const classes = useStyles();
  const [disableSubmit, setDisableSubmit] = useState(false);

  useEffect(()=>{
    props.hideProgress();
  },[])

  const formik = useFormik ({
    initialValues: { email: ''},
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Email invalido')
        .required('Email obrigatório!'),
      }),
      onSubmit: values => {
        props.fogot(values);
      },
  });

  return (
    <div>
      <MessageDialog/>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
        <Typography variant="h6" noWrap>
          SuggestInBox
        </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Recuperar senha
          </Typography> 
          <form onSubmit={formik.handleSubmit}>
            <TextField 
              variant="outlined" 
              type="email" 
              name="email"
              margin="normal"
              fullWidth
              label="Email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              inputProps={{ maxLength: 70 }}
            />
            <div>
              {formik.touched.email && formik.errors.email ? (
                <Typography className={classes.error}>{formik.errors.email}</Typography>
              ) : null}
            </div>
            <ReCAPTCHA 
              sitekey="6LcdP8cZAAAAAMLbn_f2B0EDFSdtvkPQaEO1hx30" 
              onChange={() => setDisableSubmit(false)}/>
            <Button 
              type="submit" 
              onClick={()=> props.showProgress()} 
              disabled={disableSubmit} 
              fullWidth 
              variant="contained" 
              color="primary" 
              className={classes.submit} 
              onBlur={formik.handleBlur}>
              Enviar link para email
            </Button>
            <Grid container className={classes.center}>
              <Grid item xs>
                <Link to="/login" variant="body2">
                  Login
                </Link>
              </Grid>
            </Grid>
          </form>
          <div hidden={props.progress}>
            <CircularProgress/>
          </div>
          <MessageDialog/>
        </div>
      </Container>
    </div>
  );
}

const mapStateToProps = state => ({
  message: state.message.message,
  progress: state.message.progress
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({fogot, hideMessage, showProgress, hideProgress}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Fogot);