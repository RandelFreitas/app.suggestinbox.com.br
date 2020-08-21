import React from 'react';
import styles from './index.module.css';
import { Link } from 'react-router-dom'

const ConfirmUser = () => {
  return (
    <div className={styles.center}>
      <h3>Obrigado pela sua opinião!</h3>
      <p>Parabéns vocês ganhou uma caipirinha na sua proxima visita!</p>
      <div className={styles.cupom}>
        <h4>Cupom: 49FBA</h4>
        <p>Cupom disponível em 24h.</p>
      </div>
      <Link className={styles.link} to='/app'>Voltar ao inicio</Link>
    </div>
  );
}

export default ConfirmUser;