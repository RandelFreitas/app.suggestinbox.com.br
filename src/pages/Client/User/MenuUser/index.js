import React from 'react';
import styles from './index.module.css';

const MenuUser = () =>{
  return(
    <div className={styles.wrap}>
      <div className={styles.section}>
        <h3>Cardápio</h3>
        <div className={styles.wrap}>
          <label className={styles.name}>Seção: </label>
          <select for='section'>
            <option value='comida'>Comida</option>
            <option value='bebida'>Bebida</option>
          </select>
        </div>
      </div>
      <div>
        <div className={styles.grid}>
          <div className={styles.content}>
            <p className={styles.name}>Baião de dois</p>
            <p className={styles.description}>(Arroz e feijao)</p>
          </div>
          <div className={styles.value}>
            <p className={styles.name}>R$ 15,00</p>
          </div>
        </div>
      </div>
      <div className={styles.ten}>
        <span>Cobramos 10% de taxa de serviço</span>
      </div>
    </div>
  );
}

export default MenuUser;