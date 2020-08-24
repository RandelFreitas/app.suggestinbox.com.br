import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const AtentionClient = (props) => {
  const { infos } = props;

  return(
    <div className={styles.center}>
      <h2>Chamado enviado!</h2>
      <p>Chegaremos assim que possível.</p>
      <p className={styles.suggest}>Enquanto isso você pode ver nosso cardápio online no botão abaixo:</p>
      <div className={styles.buttons}>
          <Link className={styles.link} to={`/client/cardapio/?${infos._id}`}>Ver cadápio online</Link>
        </div>
    </div>
  );
}

AtentionClient.prototypes = {
  infos: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  infos: state.client.infos
});

export default connect(mapStateToProps)(AtentionClient);