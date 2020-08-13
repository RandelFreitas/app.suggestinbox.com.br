import React from 'react';
import styles from './index.module.css';

const Main = () => {
  return(
    <div className={styles.wrap}>
      <div className={styles.inline}>
        <div className={styles.filter}>
          <label>Filtrar por:</label>
          <div>
            <select className={styles.select} for='section'>
              <option value='comida'>Positivas</option>
              <option value='bebida'>Negativas</option>
              <option value='bebida'>Favoritas</option>
            </select>
            <select for='section'>
              <option value='comida'>Identificadas</option>
              <option value='bebida'>Anônimas</option>
            </select>
          </div>
        </div>
        <div className={styles.itens}>
          <label>Por página:</label>
          <div>
            <select for='section'>
              <option value='10'>10 sugestões</option>
              <option value='20'>20 sugestões</option>
            </select>
          </div>
        </div>
        <div className={styles.period}>
          <label>Período:</label>
          <div>
            <input  className={styles.select}type="date" id="de" name="de"/>
            <input type="date" id="ate" name="ate"/>
          </div>
        </div>
        <div className={styles.order}>
          <label>Ordenar por:</label>
          <div>
            <select for='section'>
              <option value='comida'>Melhor - Pior</option>
              <option value='bebida'>Pior - Melhor</option>
            </select>
          </div>
        </div>
      </div>
      <table>
        <tr className={styles.th}>
          <th className={styles.info}>Data</th>
          <th className={styles.name}>Nome</th>
          <th className={styles.tel}>Telefone</th>
          <th className={styles.note}>Nota</th>
          <th className={styles.ind}>Indica</th>
          <th className={styles.opn}>Opinião</th>
          <th className={styles.fav}></th>
        </tr>
        <tr className={styles.td}>
          <td>13/08/2020 12:45</td>
          <td>Fulano de Tal da silva martins</td>
          <td>(88) 99861-5555</td>
          <td>10</td>
          <td>Sim</td>
          <td>O arroz estava uma delicia delicia delicia delicia delicia delicia delicia!
          ma delicia delicia delicia delicia delicia delicia delicia
          ma delicia delicia delicia delicia delicia delicia delicia</td>
          <td>X</td>
        </tr>
        <tr className={styles.td}>
          <td>13/08/2020 12:45</td>
          <td>Fulano de Tal</td>
          <td>(88) 99861-5555</td>
          <td>10</td>
          <td>Sim</td>
          <td>O arroz estava uma delicia delicia delicia delicia delicia delicia delicia!
          ma delicia delicia delicia delicia delicia delicia delicia
          ma delicia delicia delicia delicia delicia delicia delicia</td>
          <td>X</td>
        </tr>
        <tr className={styles.td}>
          <td>13/08/2020 12:45</td>
          <td>Fulano de Tal</td>
          <td>(88) 99861-5555</td>
          <td>10</td>
          <td>Sim</td>
          <td>O arroz estava uma delicia delicia delicia delicia delicia delicia delicia!
          ma delicia delicia delicia delicia delicia delicia delicia
          ma delicia delicia delicia delicia delicia delicia delicia</td>
          <td>X</td>
        </tr>
        <tr className={styles.td}>
          <td>13/08/2020 12:45</td>
          <td>Fulano de Tal</td>
          <td>(88) 99861-5555</td>
          <td>10</td>
          <td>Sim</td>
          <td>O arroz estava uma delicia delicia delicia delicia delicia delicia delicia!
          ma delicia delicia delicia delicia delicia delicia delicia
          ma delicia delicia delicia delicia delicia delicia delicia</td>
          <td>X</td>
        </tr>
      </table>
      <div className={styles.pagination}>
        <p>Ant. - 1 2 3 - Prox.</p>
      </div>
    </div>
  );
}

export default Main;