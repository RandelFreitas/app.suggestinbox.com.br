import React from 'react';
import styles from './index.module.css';

const FormUser = () => {
  return(
    <div className={styles.form}>
      <div>
        <label>Nome:</label>
        <input type='text'></input>
      </div>
      <div>
        <label>Telefone:</label>
        <input type='text'></input>
      </div>
      <div>
        <label>Nota ao atendimento:</label>
        <input type='text'></input>
      </div>
      <div>
        <label>Nos recomendaria a um amigo?</label>
        <input type='text'></input>
      </div>
      <div>
        <label> Deixe sua opnião:</label>
        <input type='text'></input>
      </div>
    </div>
  );
}

export default FormUser;