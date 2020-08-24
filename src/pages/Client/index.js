import React, { useState, useEffect} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RoutesClient from './routesClient';
import { getInfo } from '../../store/clientReducer';
import styles from './index.module.css';
import history from '../../services/history';

const Client = (props) => {
  const { infos } = props;
  const [ idUrl ] = useState(window.location.href.split('/?')[1]);

  useEffect(() => {
    if(idUrl){
      props.getInfo(idUrl);
    }else{
      history.push('/');
    }
  },[]);

  return(
    <div>
      <header className={styles.header}>
        <div className={styles.logo}>
          <div>
            <img src='/assets/logo_palpitebox.png' alt='logo'/>
          </div>
        </div>
        <nav>
          <div>
            <ul className={styles.menu}>
              <li><Link to={`/client/?${infos._id}`} className={styles.link}>INÍCIO</Link></li>
              <li><Link to={`/client/sobrenos/?${infos._id}`} className={styles.link}>SOBRE</Link></li>
            </ul>
          </div>
        </nav>
      </header>
      <div className={styles.section}>
        <RoutesClient/>
      </div>
      <footer className={styles.footer}>
        <div>
          <p>Colocar Suggest na sua empresa, <Link to='/'>clique aqui!</Link></p>
          <p>Suggest In Box - Todos os direitos reservados.</p>
          <p>© 2020 - Copyright</p>
        </div>
      </footer>
    </div>
  );
}

Client.prototypes = {
  infos: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  infos: state.client.infos
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({getInfo}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Client);