import React from 'react';
import { Link } from 'react-router-dom';
import RoutesAppAdm from './routesAppAdm';
import styles from './index.module.css';

const App = () => {
  return(
    <div className={styles.body}>
      <h1 className={styles.logo}><img src='/logo_palpitebox.png'/></h1>
      <div className={styles.back}>
        <RoutesAppAdm/>
      </div>
      <footer className={styles.footer}>
        <p><Link to={'/'}>Suggest In Box</Link> - Todos os direitos reservados.</p>
        <p>© 2020 - Copyright</p>
      </footer>
    </div>
  );
}

export default App;