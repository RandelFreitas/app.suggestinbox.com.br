import React from 'react';
import styles from './index.module.css';

const Site = () => {
  return(
    <div className={styles.wrap}>
      <header className={styles.colorHeader}>
        <div className={`${styles.container} ${styles.header}`}>
          <a className={styles.a} href='#'>LOGO</a>
          <nav>
            <ul className={styles.menu}>
              <li><a className={styles.a} href='#'>SOBRE</a></li>
              <li><a className={styles.a} href='#'>SOLUÇÕES</a></li>
              <li><a className={styles.a} href='#'>CONTATO</a></li>
              <li><a className={styles.a} href='#'>ARTIGOS</a></li>
            </ul>
          </nav>
        </div>
      </header>
      <section className={styles.colorSection1}>
        <div className={`${styles.container} ${styles.section1}`}>
          <span>Qual a pessoa mais importante para seu negócio?</span>
          <img width='200' height='200' src='./assets/cliente.png'></img>
        </div>
      </section>
      <section className={styles.colorSection2}>
        <div className={`${styles.container} ${styles.section2}`}>
          <p>SEÇÃO 2</p>
        </div>
      </section>
      <section className={styles.colorFooter}>
        <div className={`${styles.container} ${styles.section3}`}>
          <p>SEÇÃO 3</p>
        </div>
      </section>
      <section className={styles.colorSection2}>
        <div className={`${styles.container} ${styles.section4}`}>
          <p>SEÇÃO 4</p>
        </div>
      </section>
      <footer className={styles.colorSection1}>
        <div className={`${styles.container} ${styles.footer}`}>
          <p>Rodapé!</p>
        </div>
      </footer>
    </div>
  );
}

export default Site;