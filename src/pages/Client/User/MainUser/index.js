import React, { useState, useEffect } from 'react';
import { Link, useRouteMatch} from 'react-router-dom';
import styles from './index.module.css';

const MainUser = () => {
  const match = useRouteMatch();
  //const { establishment } = props;
  const [ idUrl ] = useState(window.location.href.split('/?')[1]);

  useEffect(() => {
    //props.getEstablishment(idUrl);
    console.log(idUrl);
  },[]);

  return(
    <div>
      <div className={styles.info}>
        <h3>Restaurante Bom Almoço</h3>
        <p>Servindo bem para servir sempre</p>
      </div>
      <div className={styles.buttons}>
        <Link className={styles.link} to={`${match.url}/sugestao`}>Dar sugestão</Link>
        <Link className={styles.link} to={`${match.url}/cardapio`}>Cardápio online</Link>
        <Link className={styles.link} to={`${match.url}/atencao`}>Chamar garçom(a)</Link>
      </div>
    </div>
  );
}

export default MainUser;