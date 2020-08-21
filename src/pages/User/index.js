import React from 'react';
import { Link } from 'react-router-dom';
import RoutesUser from './routesUser';
import styles from './index.module.css';

const User = () => {
  return(
    <div className={styles.wrap}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.logo}><img src='/assets/logo_palpitebox.png' alt='logo'/></h1>
        </div>
        <nav>
          <div className={styles.nav}>
            <ul className={styles.menu}>
              <li><Link className={styles.link} to='/user'>SUGESTÕES</Link></li>
              <li><Link className={styles.link} to='/user/promo'>PROMOÇÕES</Link></li>
              <li><Link className={styles.link} to='/user/setup'>CONFIGURAÇÕES</Link></li>
              <li><Link className={styles.link} to='/user/finances'>FINANCEIRO</Link></li>
            </ul>
          </div>
        </nav>
      </header>
      <div className={styles.back}>
        <RoutesUser/>
      </div>
      <footer className={styles.footer}>
        <div>
          <p>Suggest In Box - Todos os direitos reservados.</p>
          <p>© 2020 - Copyright</p>
        </div>
      </footer>
    </div>
  );
}

export default User;