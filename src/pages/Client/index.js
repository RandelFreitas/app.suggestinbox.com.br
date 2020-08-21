import React from 'react';
import { Link } from 'react-router-dom';
import RoutesApp from './routesApp';
import styles from './index.module.css';

const App = () => {
  return(
    <div>
      <header className={styles.header}>
        <div className={styles.logo}>
          <div>
            <img src='/assets/logo_palpitebox.png' alt='logo'/>
          </div>
        </div>
        <nav>
          <div>
            <ul className={styles.menu}>
              <li><Link to='/app' className={styles.link}>INÍCIO</Link></li>
              <li><Link to='/app/sobrenos' className={styles.link}>SOBRE</Link></li>
            </ul>
          </div>
        </nav>
      </header>
      <div className={styles.section}>
        <RoutesApp/>
      </div>
      <footer className={styles.footer}>
        <div>
          <p>Colocar Suggest na sua empresa, <Link to='/'>clique aqui!</Link></p>
          <p>Suggest In Box - Todos os direitos reservados.</p>
          <p>© 2020 - Copyright</p>
        </div>
      </footer>
    </div>
  );
}

export default App;