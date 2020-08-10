import React from 'react';
import { Link, useRouteMatch} from 'react-router-dom';
import RoutesAppAdm from './routesAppAdm';
import styles from './index.module.css';

const App = () => {
  const match = useRouteMatch();
  return(
    <div className={styles.body}>
      <header>
        <div>
          <h1 className={styles.logo}><img src='/assets/logo_palpitebox.png'/></h1>
        </div>
        <nav>
          <div>
            <ul>
              <li><Link className={styles.link} to={`${match.url}`}>SUGESTÕES</Link></li>
              <li><Link className={styles.link} to={`${match.url}/promo`}>PROMOÇÕES</Link></li>
              <li><Link className={styles.link} to={`${match.url}/setup`}>CONFIGURAÇÕES</Link></li>
            </ul>
          </div>
        </nav>
      </header>
      
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