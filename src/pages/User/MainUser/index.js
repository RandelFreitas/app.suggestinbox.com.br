import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { listSuggest } from '../../../store/admReducer';

import styles from './index.module.css';

const MainUser = (props) => {
  const {suggests, infos} = props;
  const [page, setPage] = useState(1);
  const [nOfItems, setNoOfItems] = useState(25);
  
  useEffect(() => {
    props.listSuggest(page, nOfItems);
    console.log(suggests);
  },[page, nOfItems]);

  const mapSuggest = (
    <React.Fragment>
      { suggests.map( suggest => {
        return (
          <tr className={styles.td} key={suggest._id}>
            <td>{suggest.createdAt}</td>
            <td>{suggest.name}</td>
            <td>{suggest.phone}</td>
            <td>{suggest.note}</td>
            <td>{suggest.recommends===true? 'Sim': 'Não'}</td>
            <td>{suggest.opinion}</td>
            <td>{suggest.favorite===true? 'Sim': 'Não'}</td>
          </tr>
        )
      })}
    </React.Fragment>
  )

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
            <th className={styles.createdAt}>Data</th>
            <th className={styles.name}>Nome</th>
            <th className={styles.phone}>Telefone</th>
            <th className={styles.note}>Nota</th>
            <th className={styles.ind}>Indica</th>
            <th className={styles.opn}>Opinião</th>
            <th className={styles.fav}>Favorito</th>
          </tr>
        </thead>
        <tbody>
          {mapSuggest}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <p>Ant. - 1 2 3 - Prox.</p>
      </div>
    </div>
  );
}

MainUser.prototypes = {
  suggests: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  suggests: state.adm.suggests,
  infos: state.adm.infos,
});

const mapsDispatchToProps = dispatch => 
  bindActionCreators({listSuggest}, dispatch);

export default connect(mapStateToProps, mapsDispatchToProps)(MainUser);