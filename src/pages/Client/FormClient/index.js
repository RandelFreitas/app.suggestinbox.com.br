import React, { useState, useEffect} from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { submitSuggest } from '../../../store/clientReducer';

import styles from './index.module.css';

const FormClient = (props) => {
  const { infos } = props;
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
        phone: '',
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
        props.submitSuggest(values, infos._id);
      }}
    >
      <Form>
        <div className={styles.wrap}>
          <label className={styles.label}>Nome:</label>
          <Field className={styles.input} disabled={disab} name='name' type='text' maxLength='50'></Field>
        </div>
        <div className={styles.wrap}>
          <label className={styles.label}>Telefone:</label>
          <Field className={styles.input} disabled={disab} name='phone' type='text' maxLength='11'/>
          <Field name='anonimus' type='checkbox' id='desab' onClick={()=>desabilitar()}/>
          <label className={styles.labelCheckbox} htmlFor='desab'>Desejo não me identificar</label>
        </div>
        <div className={styles.wrap}>
          <p className={styles.label}>Nota ao estabelecimento:*</p>
          <div className={styles.center}>
            <Field id='1' type='radio' name='note' value='1'/>
            <label className={styles.labelRadio} htmlFor='1'>1</label>
            <Field id='2' type='radio' name='note' value='2'/>
            <label className={styles.labelRadio} htmlFor='2'>2</label>
            <Field id='3' type='radio' name='note' value='3'/>
            <label className={styles.labelRadio} htmlFor='3'>3</label>
            <Field id='4' type='radio' name='note' value='4'/>
            <label className={styles.labelRadio} htmlFor='4'>4</label>
            <Field id='5' type='radio' name='note' value='5'/>
            <label className={styles.labelRadio} htmlFor='5'>5</label>
          </div>
          <p className={styles.erro}><ErrorMessage name='note'/></p>
        </div>
        <div className={styles.wrap}>
          <label className={styles.label}>Nos recomendaria a um amigo?*</label>
          <div className={styles.center}>
            <Field id='sim' type='radio' name='recomends' value='Y'/>
            <label className={styles.labelRadio} htmlFor='sim'>Sim</label>
            <Field id='nao' type='radio' name='recomends' value='N'/>
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

FormClient.prototypes = {
  infos: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  infos: state.client.infos
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({submitSuggest}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FormClient);