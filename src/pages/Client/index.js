import React from 'react';
import { Link } from 'react-router-dom';
import RoutesClient from './routesClient';
import styles from './index.module.css';

const Client = () => {
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
              <li><Link to='/client' className={styles.link}>INÍCIO</Link></li>
              <li><Link to='/client/sobrenos' className={styles.link}>SOBRE</Link></li>
            </ul>
          </div>
        </nav>
      </header>
      <div className={styles.section}>
        <RoutesClient/>
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

export default Client;