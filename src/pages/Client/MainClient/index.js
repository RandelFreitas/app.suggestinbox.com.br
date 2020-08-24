import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import styles from './index.module.css';

const MainClient = (props) => {
  const { infos } = props;

  return(
    <div>
      <div className={styles.info}>
        <h3>{infos.name}</h3>
        <p>{infos.slogan}</p>
      </div>
      <div className={styles.buttons}>
        <Link className={styles.link} to={`/client/opiniao/?${infos._id}`}>Dar opinião</Link>
        {/*
        <Link className={styles.link} to={`/client/cardapio/?${infos._id}`}>Cardápio online</Link>
        <Link className={styles.link} to={`/client/atencao/?${infos._id}`}>Chamar garçom(a)</Link>
        */}
      </div>
    </div>
  );
}

MainClient.prototypes = {
  infos: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  infos: state.client.infos
});

export default connect(mapStateToProps)(MainClient);