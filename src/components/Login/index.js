import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

const Login = () => {
  return(
    <div>
      <header>
        <div>
          <h1 className={styles.logo}><img src='/assets/logo_palpitebox.png' alt='logo'/></h1>
        </div>
      </header>
      <section>
        <div className={styles.container}>
          <h3 className={styles.login}>Login</h3>
          <form>
            <div className={styles.wrap}>
              <label className={styles.label}>Email:</label>
              <input className={styles.input} id='name' type='text' maxlength='50'></input>
            </div>
            <div className={styles.wrap}>
              <label className={styles.label}>Senha:</label>
              <input className={styles.input} id='tel' type='password' maxlength='11'></input>
              <input type='checkbox'/>
              <label className={styles.labelCheckbox}>Lembra-me</label>
              <label className={styles.labelFogot}><Link>Esqueci minha senha</Link></label>
            </div>
            <div className={styles.buttons}>
              <Link className={styles.link} to='/app/opiniao'>Login</Link>
            </div>
          </form>
        </div>
      </section>
      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>Colocar Suggest na sua empresa, <Link to='/'>clique aqui!</Link></p>
          <p>Suggest In Box - Todos os direitos reservados.</p>
          <p>© 2020 - Copyright</p>
        </div>
      </footer>
    </div>
  );
}

export default Login;