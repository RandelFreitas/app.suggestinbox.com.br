import React, { useState} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReCAPTCHA from "react-google-recaptcha"
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { showMessage, hideMessage } from '../../store/messageReducer';


import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { fogot } from '../../store/authReducer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

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

const Fogot = (props) => {
  const classes = useStyles();
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [progress, setProgress] = useState(true);

  const formik = useFormik ({
    initialValues: { email: ''},
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Email invalido')
        .required('Email obrigatório!'),
      }),
      onSubmit: values => {
        setProgress(false);
        props.fogot(values);
      },
  });

  return (
    <div>
      <Dialog open={props.openDialog} onClick={()=> setProgress(true)} onClose={props.hideMessage}>
        <DialogTitle>
          Atenção
        </DialogTitle>
        <DialogContent>
          {props.message}
        </DialogContent>
        <DialogActions onClick={()=> setProgress(true)}>
          <Button onClick={props.hideMessage}>Fechar</Button>
        </DialogActions>
      </Dialog>
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
            />
            <div>
              {formik.touched.email && formik.errors.email ? (
                <Typography className={classes.error}>{formik.errors.email}</Typography>
              ) : null}
            </div>
            <ReCAPTCHA sitekey="6LcdP8cZAAAAAMLbn_f2B0EDFSdtvkPQaEO1hx30" onChange={() => setDisableSubmit(false)} />
            <Button type="submit" disabled={disableSubmit} fullWidth variant="contained" color="primary" className={classes.submit} onBlur={formik.handleBlur}>
              Enviar link para email
            </Button>
          </form>
          <div hidden={progress}>
            <CircularProgress/>
          </div>
        </div>
      </Container>
    </div>
  );
}

const mapStateToProps = state => ({
  openDialog: state.message.showMessage,
  message: state.message.message
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({fogot, showMessage, hideMessage}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Fogot);