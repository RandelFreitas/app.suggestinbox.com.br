import React from 'react';
import { Link, useRouteMatch} from 'react-router-dom';
import RoutesApp from './routesApp';
import styles from './index.module.css';

const App = () => {
  const match = useRouteMatch();
  
  return(
    <div className={styles.body}>
      <h1 className={styles.logo}><img src='/logo_palpitebox.png'/></h1>
      <header className={styles.header}>
        <nav>
          <ul className={styles.menu}>
            <li><Link className={styles.link} to={`${match.url}`}>Início</Link></li>
            <li><Link className={styles.link} to={`${match.url}/sobrenos`}>Sobre nós</Link></li>
          </ul>
        </nav>
      </header>
      <div className={styles.back}>
        <RoutesApp/>
      </div>
      <div className={styles.wrapFooter}>
        <footer className={styles.footer}>
          <p>Colocar Suggest na minha empresa, <a href='#'>clique aqui!</a></p>
          <p>SuggestIn Box - Todos os direitos reservados.</p>
          <p>© 2020 - Copyright</p>
        </footer>
      </div>
    </div>
  );
}

export default App;