import React from 'react';
import { Link } from 'react-router-dom';
import RoutesAdm from './routesAdm';
import styles from './index.module.css';

const Adm = () => {
  return(
    <div className={styles.body}>
      <h1 className={styles.logo}><img alt='logo' src='/assets/logo_palpitebox.png'/></h1>
      <header className={styles.header}>
        <nav>
          <ul className={styles.menu}>
            <li><Link className={styles.link} to='/'>Início</Link></li>
            <li>|</li>
            <li><Link className={styles.link} to='/client/sobrenos'>Sobre nós</Link></li>
          </ul>
        </nav>
      </header>
      <div className={styles.back}>
        <RoutesAdm/>
      </div>
      <div className={styles.wrapFooter}>
        <footer className={styles.footer}>
          <p>Colocar Suggest na sua empresa, <Link to='/'>clique aqui!</Link></p>
          <p>Suggest In Box - Todos os direitos reservados.</p>
          <p>© 2020 - Copyright</p>
        </footer>
      </div>
    </div>
  );
}

export default Adm;