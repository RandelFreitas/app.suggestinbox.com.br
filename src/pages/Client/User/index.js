import React from 'react';
import { Link, useRouteMatch} from 'react-router-dom';
import RoutesApp from './routesApp';
import styles from './index.module.css';

const App = () => {
  const match = useRouteMatch();
  
  return(
    <div>
      
      <header className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.container}>
            <img src='/assets/logo_palpitebox.png'/>
          </div>
        </div>
        <nav>
          <div className={styles.container}>
            <ul className={styles.menu}>
              <li><Link className={styles.link} to={`${match.url}`}>INÍCIO</Link></li>
              <li><Link className={styles.link} to={`${match.url}/sobrenos`}>SOBRE</Link></li>
            </ul>
          </div>
        </nav>
      </header>

      <section className={styles.back}>
        <div className={styles.container}>
          <RoutesApp/>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <p>Colocar Suggest na sua empresa, <Link to={'/'}>clique aqui!</Link></p>
          <p>Suggest In Box - Todos os direitos reservados.</p>
          <p>© 2020 - Copyright</p>
        </div>
      </footer>

    </div>
  );
}

export default App;