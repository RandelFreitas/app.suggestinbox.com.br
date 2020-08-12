import React from 'react';
import styles from './index.module.css';

const Site = () => {
  return(
    <div className={styles.wrap}>
      <header className={styles.colorHeader}>
        <div className={`${styles.container} ${styles.header}`}>
          <nav>
            <a className={styles.a} href='/'>LOGO  |</a>
            <ul className={styles.menu}>
              <li><a className={styles.a} href='/'>SOBRE</a></li>
              <li><a className={styles.a} href='/'>SOLUÇÕES</a></li>
              <li><a className={styles.a} href='/'>CONTATO</a></li>
              <li><a className={styles.a} href='/'>ARTIGOS</a></li>
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

      <section className={styles.colorSection1}>
        <div className={`${styles.container} ${styles.section1}`}>
          <div>
            <h2>Qual a pessoa mais importante para seu negócio?</h2>
            <span>Se a sua resposta foi cliente, temos uma ótima notícia para você...</span>
          </div>
          <img className={styles.asset} width='304' height='294' alt='logo' src='./assets/cliente-2.png'></img>
        </div>
      </section>
      
      <section className={styles.colorSection2}>
        <div className={`${styles.container} ${styles.section1}`}>
          <img className={styles.asset} width='300' height='160' alt='satisfaction' src='./assets/satisfaction.png'></img>
          <div>
            <h2>Qual a pessoa mais importante para seu negócio?</h2>
            <span>Se a sua resposta foi cliente, temos uma ótima notícia para você...</span>
          </div>
        </div>
      </section>
      <section className={styles.colorSection1}>
        <div className={`${styles.container} ${styles.section3}`}>
          
        </div>
      </section>
      <section className={styles.colorFooter}>
        <div className={`${styles.container} ${styles.section4}`}>
          
        </div>
      </section>
      <footer className={styles.colorSection2}>
        <div className={`${styles.container} ${styles.footer}`}>
          Rodape
        </div>
      </footer>
    </div>
  );
}

export default Site;