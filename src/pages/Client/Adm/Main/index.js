import React from 'react';
import styles from './index.module.css';

const Main = () => {
  return(
    <div className={styles.wrap}>
      <div>
        <div>
          <label>Filtrar: </label>
          <select for='section'>
            <option value='comida'>Positivas</option>
            <option value='bebida'>Negativas</option>
          </select>
          <select for='section'>
            <option value='comida'>Com identificação</option>
            <option value='bebida'>Sem identificação</option>
          </select>
          <label>De: </label>
          <input type="date" id="de" name="de"/>
          <label>Até: </label>
          <input type="date" id="ate" name="ate"/>
        </div>
        <div>
          <label>Ordenar: </label>
          <select for='section'>
            <option value='comida'>Melhor Pior</option>
            <option value='bebida'>Pior Melhor</option>
          </select>
        </div>
      </div>
      <table>
        <tr className={styles.th}>
          <th className={styles.name}>Nome</th>
          <th className={styles.tel}>Telefone</th>
          <th className={styles.note}>Nota</th>
          <th className={styles.ind}>Indica</th>
          <th className={styles.opn}>Opinião</th>
        </tr>
        <tr className={styles.td}>
          <td>Fulano de Tal da silva martins</td>
          <td>(88) 99861-5555</td>
          <td>10</td>
          <td>Sim</td>
          <td>O arroz estava uma delicia delicia delicia delicia delicia delicia delicia!
          ma delicia delicia delicia delicia delicia delicia delicia
          ma delicia delicia delicia delicia delicia delicia delicia</td>
        </tr>
        <tr className={styles.td}>
          <td>Fulano de Tal</td>
          <td>(88) 99861-5555</td>
          <td>10</td>
          <td>Sim</td>
          <td>O arroz estava uma delicia delicia delicia delicia delicia delicia delicia!
          ma delicia delicia delicia delicia delicia delicia delicia
          ma delicia delicia delicia delicia delicia delicia delicia</td>
        </tr>
        <tr className={styles.td}>
          <td>Fulano de Tal</td>
          <td>(88) 99861-5555</td>
          <td>10</td>
          <td>Sim</td>
          <td>O arroz estava uma delicia delicia delicia delicia delicia delicia delicia!
          ma delicia delicia delicia delicia delicia delicia delicia
          ma delicia delicia delicia delicia delicia delicia delicia</td>
        </tr>
        <tr className={styles.td}>
          <td>Fulano de Tal</td>
          <td>(88) 99861-5555</td>
          <td>10</td>
          <td>Sim</td>
          <td>O arroz estava uma delicia delicia delicia delicia delicia delicia delicia!
          ma delicia delicia delicia delicia delicia delicia delicia
          ma delicia delicia delicia delicia delicia delicia delicia</td>
        </tr>
      </table>
    </div>
  );
}

export default Main;