import React from 'react';
import { Link } from 'react-router-dom';
import RoutesAppAdm from './routesAppAdm';
import styles from './index.module.css';

const App = () => {
  return(
    <div className={styles.body}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.logo}><img src='/assets/logo_palpitebox.png' alt='logo'/></h1>
        </div>
        <nav>
          <div className={styles.nav}>
            <ul className={styles.menu}>
              <li><Link className={styles.link} to='/adm'>SUGESTÕES</Link></li>
              <li><Link className={styles.link} to='/adm/promo'>PROMOÇÕES</Link></li>
              <li><Link className={styles.link} to='/adm/setup'>CONFIGURAÇÕES</Link></li>
            </ul>
          </div>
        </nav>
      </header>
      <section>
        <div className={styles.back}>
          <RoutesAppAdm/>
        </div>
      </section>
      <footer className={styles.footer}>
        <div>
          <p>Suggest In Box - Todos os direitos reservados.</p>
          <p>© 2020 - Copyright</p>
        </div>
      </footer>
    </div>
  );
}

export default App;