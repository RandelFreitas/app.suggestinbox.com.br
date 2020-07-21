import React from 'react';
import styles from './index.module.css';
import { Link, useRouteMatch } from 'react-router-dom';


const AtentionUser = () => {
  const match = useRouteMatch();

  return(
    <div className={styles.center}>
      <h2>Chamado enviado!</h2>
      <p>Chegaremos assim que possível.</p>
      <p className={styles.suggest}>Enquanto isso você pode ver nosso cardápio online no botão abaixo:</p>
      <div className={styles.buttons}>
          <Link className={styles.link} to={`${match.url}/cardapio`}>Ver cadápio online</Link>
        </div>
    </div>
  );
}

export default AtentionUser;