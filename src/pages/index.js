import React from 'react';
import { Link, useRouteMatch} from 'react-router-dom';
import RoutesApp from './routesApp';
import styles from './index.module.css';

const App = () => {
  const match = useRouteMatch();
  
  return(
    <div>
      <h1 className={styles.logo}><img src='/logo_palpitebox.png'/></h1>
      <header className={styles.header}>
        <nav>
          <ul className={styles.menu}>
            <li><a>Sobre nós</a></li>
            <li>|</li>
            <li><a>Contato</a></li>
          </ul>
        </nav>
      </header>
      <div className={styles.back}>
        <RoutesApp/>
      </div>
      <footer className={styles.footer}>
        <p>Colocar Suggest na minha empresa, <a href='#'>clique aqui!</a></p>
        <p>SuggestIn Box - Todos os direitos reservados.</p>
        <p>© 2020 - Copyright</p>
      </footer>
    </div>
  );
}

export default App;