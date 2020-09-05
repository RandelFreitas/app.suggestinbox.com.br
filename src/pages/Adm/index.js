import React from 'react';
import { Link } from 'react-router-dom';
import RoutesAdm from './routesAdm';

const Adm = () => {
  return(
    <div>
      <h1><img alt='logo' src='/assets/logo_palpitebox.png'/></h1>
      <header>
        <nav>
          <ul>
            <li><Link to='/'>Início</Link></li>
            <li>|</li>
            <li><Link to='/client/sobrenos'>Sobre nós</Link></li>
          </ul>
        </nav>
      </header>
      <div>
        <RoutesAdm/>
      </div>
      <div>
        <footer>
          <p>Colocar Suggest na sua empresa, <Link to='/'>clique aqui!</Link></p>
          <p>Suggest In Box - Todos os direitos reservados.</p>
          <p>© 2020 - Copyright</p>
        </footer>
      </div>
    </div>
  );
}

export default Adm;