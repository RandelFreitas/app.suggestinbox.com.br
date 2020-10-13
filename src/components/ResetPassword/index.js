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
import { reset } from '../../store/authReducer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
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
    fontSize: 15 
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Reset = (props) => {
  const classes = useStyles();
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [progress, setProgress] = useState(true);
  
  const [ token ] = useState(window.location.href.split('/?')[1]);
  const [ email ] = useState(window.location.href.split('/?')[2]);

  const formik = useFormik ({
    initialValues: { password: '', passwordConfirmation: ''},
    validationSchema: Yup.object({
      password: Yup.string()
        .required('Senha obrigatória!')
        .matches(/^(?=.*[A-Za-z])(?=.*[0-9])(?=.{6,})/,
          "A senha deve ter pelo menos uma letra maiuscula, um número e 6 caracteres!"
        )
        .max(40, 'Senha muito longa'),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Senha não confere')
        .required('Confirme a senha!')
      }),
      onSubmit: values => {
        setProgress(false);
        const user = {
          password: values.password,
          token: token,
          email: email
        }
        props.reset(user);
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
            Recuperar senha
          </Typography> 
          <form onSubmit={formik.handleSubmit}>
            <TextField 
              variant="outlined" 
              type="password" 
              name="password"
              margin="normal"
              fullWidth
              label="Nova senha"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              inputProps={{ maxLength: 70 }}
            />
            <div>
              {formik.touched.password && formik.errors.password ? (
                <Typography className={classes.error}>{formik.errors.password}</Typography>
              ) : null}
            </div>
            <TextField 
              variant="outlined" 
              type="password" 
              name="passwordConfirmation"
              margin="normal"
              fullWidth
              label="Confirme a senha"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.passwordConfirmation}
              inputProps={{ maxLength: 70 }}
            />
            <div>
              {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? (
                <Typography className={classes.error}>{formik.errors.passwordConfirmation}</Typography>
              ) : null}
            </div>
            <ReCAPTCHA sitekey="6LcgjtIZAAAAAANAHsE5_vCGEFFu8nCbHvk5AV7y" onChange={() => setDisableSubmit(false)} />
            <Button type="submit" disabled={disableSubmit} fullWidth variant="contained" color="primary" className={classes.submit} onBlur={formik.handleBlur}>
              Salvar
            </Button>
          </form>

          <Dialog open={props.openDialog} onClick={()=> setProgress(true)} onClose={props.hideMessage}>
            <DialogTitle>
              Atenção
            </DialogTitle>
            <DialogContent>
              {props.message}
            </DialogContent>
            <DialogActions>
              <Button onClick={props.hideMessage}>Fechar</Button>
            </DialogActions>
          </Dialog>

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
  bindActionCreators({reset, showMessage, hideMessage}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Reset);