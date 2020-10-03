import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReCAPTCHA from "react-google-recaptcha"
import * as Yup from 'yup';
import { useFormik } from 'formik';

import { auth } from '../../store/authReducer';
import { showMessage, hideMessage, showProgress } from '../../store/messageReducer';
import MessageDialog from '../Dialog';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 300,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
    textAlign: 'end'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const [disableSubmit, setDisableSubmit] = useState(true);

  const formik = useFormik ({
    initialValues: { email: '', password: ''},
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Email inválido')
        .required('Email obrigatório!'),
      password: Yup.string()
        .required('Senha obrigatória!')
        .max(40, 'Senha muito longa'),
      }),
      onSubmit: values => {
        props.auth(values);
      },
  });

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
        <Typography variant="h6" noWrap>
          SuggestInBox
        </Typography>
        </Toolbar>
      </AppBar>
      <Container className={classes.container} component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
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
            <TextField 
              variant="outlined" 
              type="password" 
              name="password"
              margin="normal"
              fullWidth
              label="Senha"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              inputProps={{ maxLength: 40 }}
            />
            <div>
              {formik.touched.password && formik.errors.password ? (
                <Typography className={classes.error}>{formik.errors.password}</Typography>
              ) : null}
            </div>
            <ReCAPTCHA sitekey="6LcgjtIZAAAAAANAHsE5_vCGEFFu8nCbHvk5AV7y" onChange={() => setDisableSubmit(false)} />
            <Button type="submit" onClick={()=>props.showProgress()} disabled={disableSubmit} fullWidth variant="contained" color="primary" className={classes.submit} onBlur={formik.handleBlur}>
              Entrar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/fogot-password" variant="body2">
                  Esqueci minha senha
                </Link>
              </Grid>
              <Grid className={classes.link} item xs>
                <Link to="/fogot-password" variant="body2">
                  Criar conta
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
  openDialog: state.message.showMessage,
  message: state.message.message,
  progress: state.message.progress
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({auth, showMessage, hideMessage, showProgress}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);