import React, { useState} from 'react';
import { Link, useRouteMatch} from 'react-router-dom';
import styles from './index.module.css';

const FormUser = () => {
  const match = useRouteMatch();
  const [ disab, setDisab] = useState(false);
  
  const desabilitar =() =>{
    if(disab === false){
      document.getElementById('tel').value='';
      document.getElementById('name').value='';
      setDisab(true);
    }else{
      setDisab(false);
    }
  }

  return(
    <div>
      <form className={styles.form}>
        <div className={styles.wrap}>
          <label className={styles.label}>Nome:</label>
          <input className={styles.input} disabled={disab} id='name' type='text' maxlength='50'></input>
        </div>
        <div className={styles.wrap}>
          <label className={styles.label}>Telefone:</label>
          <input className={styles.input} disabled={disab} id='tel' type='text' maxlength='11'></input>
          <input name='anonimus' type='checkbox' onClick={()=>desabilitar()}/>
          <label className={styles.labelCheckbox}>Desejo não me identificar</label>
        </div>
        <div className={styles.wrap}>
          <p className={styles.label}>Nota ao estabelecimento:</p>
          <div className={styles.center}>
            <input type='radio' name='note' value='5'/>
            <label className={styles.labelRadio} for='5'>5</label>
          
            <input type='radio' name='note' value='6'/>
            <label className={styles.labelRadio} for='6'>6</label>

            <input type='radio' name='note' value='7'/>
            <label className={styles.labelRadio} for='7'>7</label>

            <input type='radio' name='note' value='8'/>
            <label className={styles.labelRadio} for='8'>8</label>

            <input type='radio' name='note' value='9'/>
            <label className={styles.labelRadio} for='9'>9</label>

            <input type='radio' name='note' value='10'/>
            <label className={styles.labelRadio} for='10'>10</label>
          </div>
        </div>
        <div className={styles.wrap}>
          <label className={styles.label}>Nos recomendaria a um amigo?</label>
          <div className={styles.center}>
            <input type='radio' name='recommends' value='Sim'/>
            <label className={styles.labelRadio} for='Sim'>Sim</label>
            <input type='radio' name='recommends' value='Nao'/>
            <label className={styles.labelRadio} for='Nao'>Não</label>
          </div>
        </div>
        <div className={styles.wrap}>
          <label className={styles.label}> Deixe sua opinião:</label>
          <textarea className={styles.textArea} type='text' rows='5' cols='34' maxlength='300'></textarea>
        </div>
        <div className={styles.buttons}>
          <Link className={styles.link} to={`${match.url}/sucesso`}>Enviar opinião</Link>
        </div>
      </form>
    </div>
  );
}

export default FormUser;