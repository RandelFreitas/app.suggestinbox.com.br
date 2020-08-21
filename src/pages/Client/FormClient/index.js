import React, { useState} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { submitSuggest } from '../../../store/clientReducer';

import styles from './index.module.css';

const FormClient = (props) => {
  const [ disab, setDisab] = useState(false);
  
  const desabilitar =() =>{
    if(disab === false){
      setDisab(true);
    }else{
      setDisab(false);
    }
  }

  return(
    <Formik
      initialValues={{
        name: '', 
        tel: '',
        note: '',
        recomends: '',
        opinion: '',
      }}
      validationSchema={Yup.object({
        note: Yup.string()
        .required('Que nota nós merecemos?'),
        recomends: Yup.string()
        .required('Nos recomendaria?'),
        opinion: Yup.string()
        .required('Alguma sugestão?'),
      })}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <Form>
        <div className={styles.wrap}>
          <label className={styles.label}>Nome:</label>
          <Field className={styles.input} disabled={disab} name='name' type='text' maxLength='50'></Field>
        </div>
        <div className={styles.wrap}>
          <label className={styles.label}>Telefone:</label>
          <Field className={styles.input} disabled={disab} name='tel' type='text' maxLength='11'/>
          <Field name='anonimus' type='checkbox' id='desab' onClick={()=>desabilitar()}/>
          <label className={styles.labelCheckbox} htmlFor='desab'>Desejo não me identificar</label>
        </div>
        <div className={styles.wrap}>
          <p className={styles.label}>Nota ao estabelecimento:*</p>
          <div className={styles.center}>
            <Field id='5' type='radio' name='note' value='5'/>
            <label className={styles.labelRadio} htmlFor='5'>5</label>
            <Field id='6' type='radio' name='note' value='6'/>
            <label className={styles.labelRadio} htmlFor='6'>6</label>
            <Field id='7' type='radio' name='note' value='7'/>
            <label className={styles.labelRadio} htmlFor='7'>7</label>
            <Field id='8' type='radio' name='note' value='8'/>
            <label className={styles.labelRadio} htmlFor='8'>8</label>
            <Field id='9' type='radio' name='note' value='9'/>
            <label className={styles.labelRadio} htmlFor='9'>9</label>
            <Field id='10' type='radio' name='note' value='10'/>
            <label className={styles.labelRadio} htmlFor='10'>10</label>
          </div>
          <p className={styles.erro}><ErrorMessage name='note'/></p>
        </div>
        <div className={styles.wrap}>
          <label className={styles.label}>Nos recomendaria a um amigo?*</label>
          <div className={styles.center}>
            <Field id='sim' type='radio' name='recomends' value='sim'/>
            <label className={styles.labelRadio} htmlFor='sim'>Sim</label>
            <Field id='nao' type='radio' name='recomends' value='nao'/>
            <label className={styles.labelRadio} htmlFor='nao'>Não</label>
          </div>
          <p className={styles.erro}><ErrorMessage name='recomends'/></p>
        </div>
        <div className={styles.wrap}>
          <label className={styles.label}> Deixe sua opinião:*</label>
          <Field className={styles.textArea} name='opinion' component='textarea' rows='5' cols='34' maxLength='300'/>
          <p className={styles.erro}><ErrorMessage name='opinion'/></p>
        </div>
        <div>
          <button className={styles.link} type='submit'>Enviar opinião</button>
        </div>
      </Form>
    </Formik>
  );
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({submitSuggest}, dispatch);

export default connect(null, mapDispatchToProps)(FormClient);