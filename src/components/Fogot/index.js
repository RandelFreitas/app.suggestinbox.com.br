import React, { useCallback, useState} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReCAPTCHA from "react-google-recaptcha"
import history from '../../services/history';
import * as Yup from 'yup';
import { useFormik } from 'formik';


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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


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
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    history.push('/login');
  };

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
      <div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Um link de recuperação foi enviado para seu e-mail.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
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
            <ReCAPTCHA sitekey="6Lf2OKoZAAAAADMySEr-aZsfTDc1bc3bXjqHVlig" onChange={useCallback(() => setDisableSubmit(false))} />
            <Button type="submit" onClick={handleClickOpen} disabled={disableSubmit} fullWidth variant="contained" color="primary" className={classes.submit} onBlur={formik.handleBlur}>
              Enviar link para login
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({fogot}, dispatch);

export default connect(null, mapDispatchToProps)(Fogot);