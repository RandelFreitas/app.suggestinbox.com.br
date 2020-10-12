import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const AtentionClient = (props) => {
  const { infos } = props;

  return(
    <div>
      <h2>Chamado enviado!</h2>
      <p>Chegaremos assim que possível.</p>
      <p>Enquanto isso você pode ver nosso cardápio online no botão abaixo:</p>
      <div>
        <Link to={`/client/cardapio/?${infos._id}`}>Ver cadápio online</Link>
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