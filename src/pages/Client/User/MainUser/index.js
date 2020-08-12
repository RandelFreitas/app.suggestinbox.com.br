import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

const MainUser = () => {
  //const { establishment } = props;
  //const [ idUrl ] = useState(window.location.href.split('/?')[1]);

  //useEffect(() => {
    //props.getEstablishment(idUrl);
  //  console.log(idUrl);
  //},[]);

  return(
    <div>
      <div className={styles.info}>
        <h3>Restaurante Bom Almoço</h3>
        <p>Servindo bem para servir sempre</p>
      </div>
      <div className={styles.buttons}>
        <Link className={styles.link} to='/app/opiniao'>Dar opinião</Link>
        <Link className={styles.link} to='/app/cardapio'>Cardápio online</Link>
        <Link className={styles.link} to='/app/atencao'>Chamar garçom(a)</Link>
      </div>
    </div>
  );
}

export default MainUser;