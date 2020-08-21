import React, { useEffect} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { listSuggest } from '../../../../store/admReducer';

import styles from './index.module.css';

const Main = (props) => {
  const suggests = [
    {
      'info':'25/12/2020',
      'name':'ok',
      'tel': '(88)998615555',
      'note': '10'
    },
    {
      'info':'25/12/2020',
      'name':'ok',
      'tel': '(88)998615555',
      'note': '10'
    },
    {
      'info':'25/12/2020',
      'name':'ok',
      'tel': '(88)998615555',
      'note': '10'
    },
    {
      'info':'25/12/2020',
      'name':'ok',
      'tel': '(88)998615555',
      'note': '10'
    },
  ];
  
  useEffect(() => {
    console.log('Deu certo redux');
  },[]);

  return(
    <div className={styles.wrap}>
      <div className={styles.inline}>
        <div className={styles.filter}>
          <label>Filtrar por:</label>
          <div>
            <select className={styles.select} htmlFor='section'>
              <option value='comida'>Positivas</option>
              <option value='bebida'>Negativas</option>
              <option value='bebida'>Favoritas</option>
            </select>
            <select htmlFor='section'>
              <option value='comida'>Identificadas</option>
              <option value='bebida'>Anônimas</option>
            </select>
          </div>
        </div>
        <div className={styles.itens}>
          <label>Por página:</label>
          <div>
            <select htmlFor='section'>
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
            <select htmlFor='section'>
              <option value='comida'>Melhor - Pior</option>
              <option value='bebida'>Pior - Melhor</option>
            </select>
          </div>
        </div>
      </div>
      <table>
        <thead>
          <tr className={styles.th}>
            <th className={styles.info}>Data</th>
            <th className={styles.name}>Nome</th>
            <th className={styles.tel}>Telefone</th>
            <th className={styles.note}>Nota</th>
            <th className={styles.ind}>Indica</th>
            <th className={styles.opn}>Opinião</th>
            <th className={styles.fav}></th>
          </tr>
        </thead>
        <tbody>
          { suggests.map( suggest => {
            return (
              <tr className={styles.td} key={suggest.id}>
                <td>{suggest.date}</td>
                <td>{suggest.name}</td>
                <td>{suggest.tel}</td>
                <td>{suggest.note}</td>
                <td>{suggest.recomends}</td>
                <td>{suggest.opinion}</td>
                <td>{suggest.fav}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <p>Ant. - 1 2 3 - Prox.</p>
      </div>
    </div>
  );
}
const mapStateToProps = state => ({
  suggests: state.user.list
});

const mapsDispatchToProps = dispatch => 
  bindActionCreators({listSuggest}, dispatch);

export default connect(mapStateToProps, mapsDispatchToProps)(Main);