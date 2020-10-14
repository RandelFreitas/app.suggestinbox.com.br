import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import NumberFormat from 'react-number-format';
import * as Yup from 'yup';
import QRCode from 'qrcode.react';

import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Button, TextField, Card, Typography, Grid} from '@material-ui/core';
import { addCompany, getCompanyById, updateCompany, cleanCompany } from '../../../store/companyReducer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 8
  },
  qrCode:{
    textAlign: 'center',
    maxWidth: '200px',
    margin: '15px'
  },
  button: {
    float: 'right',
    margin: 8,
  },
  buttonQr: {
    margin: '5px',
    padding: '5px',
    fontSize: '12px',
    width: '90px'
  },
  buttonPhoto:{
    margin: '5px',
    padding: '5px',
    fontSize: '12px',
    width: '110px'
  },
  media: {
    margin: 'auto',
    width: 140,
    height: 140,
  },
  cardMain: {
    marginBottom: '10px'
  },
  card: {
    marginBottom: 10,
  },
  sectionImg: {
    justifyContent: 'center'
  },
  photo: {
    marginBottom: '5px',
    width: 128,
    height: 128,
  },
  center: {
    margin: 'auto',
  },
  error: {
    color: 'red',
    fontSize: 12
  },
  grid: {
    justifyContent: 'center',
    padding: 8
  },
  hide: {
    display: 'none',
  },
  qrCodeTable: {
    textAlign: 'center',
    maxWidth: '300px',
    margin: '15px'
  },
  nTable: {
    width: '90px'
  },
  title: {
    margin: '15px'
  }
}));

const ZipFormatCustom = (props) => {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      isNumericString
      format='#####-###'
    />
  );
}

ZipFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const CnpjFormatCustom = (props) => {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      isNumericString
      format='##.###.###/####-##'
    />
  );
}

CnpjFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const PhoneFormatCustom = (props) => {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      isNumericString
      format='(##) #########'
    />
  );
}

PhoneFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const SetupCompany = (props) => {
  const classes = useStyles();
  const { companyById } = props;

  const [idUser] = useState(window.location.href.split('/?')[1]);
  const [idCompany] = useState(window.location.href.split('/?')[2]);

  const defaultFormShape = {
    name: '',
    cnpj: '',
    slogan: '',
    history: '',
    localization: '',
    email: '',
    phone: '',
    address: {
      state: '',
      city: '',
      street: '',
      number: '',
      type: '',
      district: '',
      zip: '',
      obs: ''
    },
  };
  
  const [ nTable, setNTable ] = useState(0);
  const tableChange = (event) => {
    setNTable(event.target.value);
  }

  useEffect(()=>{
    if(idCompany){
      props.getCompanyById(idCompany);
    }else{
      props.cleanCompany();
    }
  },[])

  return (
    <div>
      <Card className={classes.cardMain}>
        <Grid container className={classes.sectionImg}>
          <Grid className={classes.qrCode} item>
            <CardMedia
              className={classes.photo}
              image="/assets/logoBar.png"
              title="Contemplative Reptile"
            />
            <input
              accept="image/*"
              className={classes.input}
              style={{ display: 'none' }}
              id="raised-button-file"
              multiple
              type="file"
            />
            <Typography className={classes.title}>Foto perfil</Typography>
            <label htmlFor="raised-button-file">
              <Button className={classes.buttonPhoto} variant="outlined" component="span" color="primary">
                Alterar Foto
              </Button>
            </label>
          </Grid>
          <Grid className={idCompany?  classes.qrCode : classes.hide} item>
            <QRCode value={`https://app.suggestinbox.com.br/client/?${idCompany}?table=0`}/>
            <Typography className={classes.title}>QR Code geral</Typography>
            <Button rel="noopener noreferrer" className={classes.buttonQr} target="_blank" href={`http://app.suggestinbox.com.br/client/?${idCompany}?table=0`} variant="contained" color="primary">
              Ver Perfil
            </Button>
            <Button rel="noopener noreferrer" className={classes.buttonQr} target="_blank" href={`http://app.suggestinbox.com.br/client/?${idCompany}?table=0`} variant="outlined" color="primary">
              Imprimir
            </Button>
          </Grid>
          <Grid className={idCompany?  classes.qrCodeTable : classes.hide} item>
            <QRCode value={`https://app.suggestinbox.com.br/client/?${idCompany}?table=${nTable}`}/>
            <Typography className={classes.title}>QR Code por mesa</Typography>
            <TextField
              className={classes.nTable}
              id="standard-number"
              label="Nº da mesa"
              type="number"
              value={nTable}
              onChange={tableChange}
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button rel="noopener noreferrer" className={classes.buttonQr} target="_blank" href={`localhost:3000/client/?${idCompany}?table=0`} variant="outlined" color="primary">
              Imprimir
            </Button>
          </Grid>
        </Grid>
      </Card>

      <Formik 
        initialValues= {idCompany? companyById : defaultFormShape}
        enableReinitialize
        validationSchema={Yup.object({
          name: Yup.string()
            .required('Nome obrigatório!'),
          cnpj: Yup.string()
            .required('Cnpj obrigatório!'),
          slogan: Yup.string()
            .required('Slogan obrigatório'),
          history: Yup.string()
            .required('História obrigatória'),
          localization: Yup.string()
            .required('Localização obrigatória'),
          email: Yup.string()
            .required('Email obrigatório!'),
          phone: Yup.string()
            .required('Telefone obrigatório!'),
          address: Yup.object({
            zip: Yup.string()
              .required('Cep obrigatorio!'),
            street: Yup.string()
              .required('Rua obrigatorio!'),
            district: Yup.string()
              .required('Bairro obrigatorio!'),
            city: Yup.string()
              .required('Cidade obrigatorio!'),
            state: Yup.string()
              .required('Estado obrigatorio!'),
            number: Yup.string()
              .required('Número obrigatorio!'),
          }),
        })}

        onSubmit={(values) => {
          if(companyById._id){
            const { name, slogan, history, localization, email, cnpj, phone } = values;
            const { state, city, street, number, type, district, zip, obs } = values.address;
            const address = {state, city, street, number, type, district, zip, obs};
            const companyUpdate = { name, slogan, history, localization, email, cnpj, phone, address };
            props.updateCompany(companyUpdate, companyById._id, idUser);
          }else{
            props.addCompany(values, idUser);
          }
        }}>
        {formik => (
          <Card >
            <form onSubmit={formik.handleSubmit}>
              <p style={{margin: 10}}>Dados da companhia</p>
              <Grid container>
                <Grid container item spacing={1} className={classes.grid}>
                  <Grid item xs={4}>
                    <TextField
                      variant="outlined"
                      label="Nome:"
                      margin="dense"
                      fullWidth
                      name="name"
                      inputProps={{ maxLength: 70 }}
                      InputLabelProps={{ shrink: true }}
                      {...formik.getFieldProps('name')}
                    />
                    <div>
                      {formik.touched.name && formik.errors.name ? (
                        <Typography className={classes.error}>{formik.errors.name}</Typography>
                      ) : null}
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      variant="outlined"
                      label="Slogan:"
                      margin="dense"
                      fullWidth
                      name="slogan"
                      inputProps={{ maxLength: 50 }}
                      InputLabelProps={{ shrink: true }}
                      {...formik.getFieldProps('slogan')}
                    />
                    <div>
                      {formik.touched.slogan && formik.errors.slogan ? (
                        <Typography className={classes.error}>{formik.errors.slogan}</Typography>
                      ) : null}
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      variant="outlined"
                      label="História:"
                      margin="dense"
                      fullWidth
                      name="history"
                      inputProps={{ maxLength: 250 }}
                      InputLabelProps={{ shrink: true }}
                      {...formik.getFieldProps('history')}
                    />
                    <div>
                      {formik.touched.history && formik.errors.history ? (
                        <Typography className={classes.error}>{formik.errors.history}</Typography>
                      ) : null}
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      variant="outlined"
                      label="Localização:"
                      margin="dense"
                      fullWidth
                      name="localization"
                      inputProps={{ maxLength: 250 }}
                      InputLabelProps={{ shrink: true }}
                      {...formik.getFieldProps('localization')}
                    />
                    <div>
                      {formik.touched.localization && formik.errors.localization ? (
                        <Typography className={classes.error}>{formik.errors.localization}</Typography>
                      ) : null}
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      variant="outlined"
                      label="Email:"
                      margin="dense"
                      fullWidth
                      name="email"
                      inputProps={{ maxLength: 70 }}
                      InputLabelProps={{ shrink: true }}
                      {...formik.getFieldProps('email')}
                    />
                    <div>
                      {formik.touched.email && formik.errors.email ? (
                        <Typography className={classes.error}>{formik.errors.email}</Typography>
                      ) : null}
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      variant="outlined"
                      label="Telefone:"
                      margin="dense"
                      fullWidth
                      name="phone"
                      InputProps={{inputComponent: PhoneFormatCustom}}
                      InputLabelProps={{ shrink: true }}
                      {...formik.getFieldProps('phone')}
                    />
                    <div>
                      {formik.touched.phone && formik.errors.phone ? (
                        <Typography className={classes.error}>{formik.errors.phone}</Typography>
                      ) : null}
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      variant="outlined"
                      label="CNPJ:"
                      margin="dense"
                      fullWidth
                      name="cnpj"
                      InputProps={{inputComponent: CnpjFormatCustom}}
                      InputLabelProps={{ shrink: true }}
                      {...formik.getFieldProps('cnpj')}
                    />
                    <div>
                      {formik.touched.cnpj && formik.errors.cnpj ? (
                        <Typography className={classes.error}>{formik.errors.cnpj}</Typography>
                      ) : null}
                    </div>
                  </Grid>
                </Grid>
                <p style={{margin: 10}}>Endereço</p>
                <Grid container item spacing={1} className={classes.grid}>
                  <Grid item xs={2}>
                    <TextField
                      variant="outlined"
                      label="Cep:"
                      margin="dense"
                      fullWidth
                      name="address.zip"
                      InputProps={{inputComponent: ZipFormatCustom}}
                      InputLabelProps={{ shrink: true }}
                      {...formik.getFieldProps('address.zip')}
                    />
                    <div>
                      {formik.touched.address && formik.errors.address ? (
                        <Typography className={classes.error}>{formik.errors.address.zip}</Typography>
                      ) : null}
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      variant="outlined"
                      label="Rua:"
                      margin="dense"
                      fullWidth
                      name="address.street"
                      inputProps={{ maxLength: 70 }}
                      InputLabelProps={{ shrink: true }}
                      {...formik.getFieldProps('address.street')}
                    />
                    <div>
                      {formik.touched.address && formik.errors.address ? (
                        <Typography className={classes.error}>{formik.errors.address.street}</Typography>
                      ) : null}
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      variant="outlined"
                      label="Bairro:"
                      margin="dense"
                      fullWidth
                      name="address.district"
                      inputProps={{ maxLength: 70 }}
                      InputLabelProps={{ shrink: true }}
                      {...formik.getFieldProps('address.district')}
                    />
                    <div>
                      {formik.touched.address && formik.errors.address ? (
                        <Typography className={classes.error}>{formik.errors.address.district}</Typography>
                      ) : null}
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      variant="outlined"
                      label="Cidade:"
                      margin="dense"
                      fullWidth
                      name="address.city"
                      inputProps={{ maxLength: 70 }}
                      InputLabelProps={{ shrink: true }}
                      {...formik.getFieldProps('address.city')}
                    />
                    <div>
                      {formik.touched.address && formik.errors.address ? (
                        <Typography className={classes.error}>{formik.errors.address.city}</Typography>
                      ) : null}
                    </div>
                  </Grid>
                  <Grid item xs={1}>
                    <TextField
                      variant="outlined"
                      label="Estado:"
                      margin="dense"
                      fullWidth
                      name="address.state"
                      inputProps={{ maxLength: 30 }}
                      InputLabelProps={{ shrink: true }}
                      {...formik.getFieldProps('address.state')}
                    />
                    <div>
                      {formik.touched.address && formik.errors.address ? (
                        <Typography className={classes.error}>{formik.errors.address.state}</Typography>
                      ) : null}
                    </div>
                  </Grid>
                  <Grid item xs={1}>
                    <TextField
                      variant="outlined"
                      label="Número:"
                      margin="dense"
                      fullWidth
                      name="address.number"
                      inputProps={{ maxLength: 10 }}
                      InputLabelProps={{ shrink: true }}
                      {...formik.getFieldProps('address.number')}
                    />
                    <div>
                      {formik.touched.address && formik.errors.address ? (
                        <Typography className={classes.error}>{formik.errors.address.number}</Typography>
                      ) : null}
                    </div>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Divider/>
                  <Button type="submit" className={classes.button} variant="contained" color="primary">
                    {idCompany? 'Atualizar': 'Salvar'}
                  </Button>
                  <Button className={classes.button} component={Link} 
                    to={idCompany? `/suggest/?${idUser}/?${idCompany}?page=1&limit=25` : `/user/?${idUser}?page=1&limit=25`} variant="outlined" color="primary">
                    Cancelar
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Card>
        )}
      </Formik>
    </div>
  )
}

SetupCompany.prototypes = {
  companyById: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  companyById: state.company.companyById,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ addCompany, getCompanyById, updateCompany, cleanCompany }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SetupCompany);