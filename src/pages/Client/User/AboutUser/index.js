import React from 'react';
import styles from './index.module.css';

const AboutUser = () => {
  return (
    <div className={styles.center}>
      <h3>Restaurante Bom Almoço</h3>
      <p>Em 1880 em Estócia nascia nosso fundador Mario Sergio Bugalho, 
      os pais morreram e ele herdou essa empresa. FIM</p>
      <h4>Localização</h4>
      <p>Rua dos Leopoldo Verdes Brilhantes Nº 195</p>
      <iframe className={styles.map} src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63695.95624351804!2d-38.560086091509596!3d-3.810670390317004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c74e4a78a20565%3A0xce1304c86cef7da7!2sR.%20A%20-%20Passar%C3%A9%2C%20Fortaleza%20-%20CE%2C%2060810-670!5e0!3m2!1spt-BR!2sbr!4v1595268668224!5m2!1spt-BR!2sbr" width="250" height="200" frameborder="0" aria-hidden="false" tabindex="0"/>
    </div>
  );
}

export default AboutUser;