import React, { useCallback, useState} from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReCAPTCHA from "react-google-recaptcha"

import * as Yup from 'yup';
import { useFormik } from 'formik';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { auth } from '../../store/authReducer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles((theme) => ({
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
    fontSize: 15 
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
        .email('Email invalido')
        .required('Email obrigatório!'),
      password: Yup.string()
        .required('Senha obrigatória!'),
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
          SIS Soluções
        </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xs">
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
            />
            <div>
              {formik.touched.password && formik.errors.password ? (
                <Typography className={classes.error}>{formik.errors.password}</Typography>
              ) : null}
            </div>
            <ReCAPTCHA sitekey="6LcdP8cZAAAAAMLbn_f2B0EDFSdtvkPQaEO1hx30" onChange={useCallback(() => setDisableSubmit(false))} />
            <Button type="submit" disabled={false} fullWidth variant="contained" color="primary" className={classes.submit} onBlur={formik.handleBlur}>
              Entrar
            </Button>
            <Grid container>
              <Grid item xs>
                <Link className={classes.link} to="/fogot-password" variant="body2">
                  Esqueci minha senha
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </div>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({auth}, dispatch);

export default connect(null, mapDispatchToProps)(Login);