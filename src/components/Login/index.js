import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { auth } from '../../store/authReducer';
import styles from './index.module.css';

const Login = (props) => {
  return(
    <Formik
      initialValues={{email: '', password: ''}}
      validationSchema={Yup.object({
        email: Yup.string()
        .email('Email inválido!')
        .required('Email obrigatório!'),
        password: Yup.string()
        .required('Senha obrigatória!'),
      })}
      onSubmit={(values) => {
        props.auth(values);
      }}
    >
      <div>
        <header>
          <div>
            <h1 className={styles.logo}><img src='/assets/logo_palpitebox.png' alt='logo'/></h1>
          </div>
        </header>
        <section>
          <div>
            <h3 className={styles.login}>Login</h3>
            <Form>
              <div className={styles.wrap}>
                <label className={styles.label} htmlFor='email'>Email:</label>
                <Field className={styles.input} name='email' type='email'/>
                <p className={styles.erro}><ErrorMessage name='email'/></p>
              </div>
              <div className={styles.wrap}>
                <label className={styles.label} htmlFor='password'>Senha:</label>
                <Field className={styles.input} name='password' type='password'/>
                <p className={styles.erro}><ErrorMessage name='password'/></p>
              </div>
              <div className={styles.wrap}>
                <Field name='fogotCheckbox' id='fogotCheckbox' type='checkbox'/>
                <label className={styles.labelCheckbox} htmlFor='fogotCheckbox'>Lembrar-me</label>
                <label className={styles.labelFogot}><Link to='/'>Esqueci minha senha</Link></label>
              </div>
              <div>
                <button className={styles.link} type='submit'>Entrar</button>
              </div>
            </Form>
          </div>
        </section>
        <footer className={styles.footer}>
          <div>
            <p>Colocar Suggest na sua empresa, <Link to='/'>clique aqui!</Link></p>
            <p>Suggest In Box - Todos os direitos reservados.</p>
            <p>© 2020 - Copyright</p>
          </div>
        </footer>
      </div>
    </Formik>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({auth}, dispatch);

export default connect(null, mapDispatchToProps)(Login);
