import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getInfo } from '../../../../store/companyReducer';

import styles from './index.module.css';

const MainUser = (props) => {
  const { infos } = props;
  const [ idUrl ] = useState(window.location.href.split('/?')[1]);

  useEffect(() => {
    console.log(idUrl);
  },[idUrl]);

  return(
    <div>
      <div className={styles.info}>
        <h3>{infos.name}</h3>
        <p>{infos.slogan}</p>
      </div>
      <div className={styles.buttons}>
        <Link className={styles.link} to='/app/opiniao'>Dar opinião</Link>
        <Link className={styles.link} to='/app/cardapio'>Cardápio online</Link>
        <Link className={styles.link} to='/app/atencao'>Chamar garçom(a)</Link>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  infos: state.company.infos
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({getInfo}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainUser);