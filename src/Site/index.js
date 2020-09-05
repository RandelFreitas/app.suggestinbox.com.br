import React from 'react';

const Site = () => {
  return(
    <div>
      <header>
        <div>
          <nav>
            <a href='/'>LOGO  |</a>
            <ul>
              <li><a href='/'>SOBRE</a></li>
              <li><a href='/'>SOLUÇÕES</a></li>
              <li><a href='/'>CONTATO</a></li>
              <li><a href='/'>ARTIGOS</a></li>
            </ul>
          </nav>
          <div>
            <img alt='face' src='./assets/facebook.svg'/>
            <img alt='insta' src='./assets/instagram.svg'/>
            <img alt='youtube' src='./assets/youtube.svg'/>
            <button>Login</button>
          </div>
        </div>
      </header>

      <section>
        <div>
          <div>
            <h2>Qual a pessoa mais importante para seu negócio?</h2>
            <span>Se a sua resposta foi cliente, temos uma ótima notícia para você...</span>
          </div>
          <img width='304' height='294' alt='logo' src='./assets/cliente-2.png'></img>
        </div>
      </section>
      
      <section>
        <div>
          <img width='300' height='160' alt='satisfaction' src='./assets/satisfaction.png'></img>
          <div>
            <h2>Qual a pessoa mais importante para seu negócio?</h2>
            <span>Se a sua resposta foi cliente, temos uma ótima notícia para você...</span>
          </div>
        </div>
      </section>
      <section>
        <div>
          
        </div>
      </section>
      <section>
        <div>
          
        </div>
      </section>
      <footer>
        <div>
          Rodape
        </div>
      </footer>
    </div>
  );
}

export default Site;