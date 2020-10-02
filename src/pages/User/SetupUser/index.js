import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { makeStyles } from '@material-ui/core/styles';
import { Divider, Button, TextField, Card, Typography, Grid} from '@material-ui/core';
import { getUserById, updateUser } from '../../../store/admReducer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: 8
  },
  button: {
    float: 'right',
    margin: 8,
  },
  media: {
    margin: 'auto',
    width: 140,
    height: 140,
  },
  card: {
    marginBottom: 10,
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
  }
}));

const SetupUser = (props) => {
  const classes = useStyles();
  const { userById } = props;

  const [idUrl] = useState(window.location.href.split('/?')[1]);
  const defaultFormShape = {
    email: '',
    name: '',
    parentId: {
      cpf: '',
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
    },
  };

  useEffect(()=>{
    props.getUserById(idUrl);
  },[])

  return (
    <div>
      <Formik 
        initialValues= {userById._id? userById : defaultFormShape}
        enableReinitialize
        validationSchema={Yup.object({
          email: Yup.string()
            .required('Email obrigatório!'),
          name: Yup.string()
            .required('Nome obrigatório!'),
          parentId: Yup.object({
            cpf: Yup.string()
              .required('Cpf obrigatório!'),
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
              type: Yup.string()
                .required('Número obrigatorio!'),
              obs: Yup.string()
                .required('Número obrigatorio!'),
            }),
          }),
        })}

        onSubmit={(values) => {
          const { name, email } = values;
          const { phone, cpf } = values.parentId;
          const { state, city, street, number, type, district, zip, obs } = values.parentId.address;
          const address = {state, city, street, number, type, district, zip, obs};
          const userUpdate = { name, email, cpf, phone, address };
          props.updateCompany(userUpdate, userById._id);
        }}>
        {formik => (
          <Card >
            <form onSubmit={formik.handleSubmit}>
              <p style={{margin: 10}}>Dados</p>
              <Grid container>
                <Grid container item spacing={1} className={classes.grid}>
                  <Grid item xs={5}>
                    <TextField
                      variant="outlined"
                      label="Nome:"
                      margin="dense"
                      fullWidth
                      name="name"
                      InputLabelProps={{ shrink: true }}
                      {...formik.getFieldProps('name')}
                    />
                    <div>
                      {formik.touched.name && formik.errors.name ? (
                        <Typography className={classes.error}>{formik.errors.name}</Typography>
                      ) : null}
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      variant="outlined"
                      label="CPF:"
                      margin="dense"
                      fullWidth
                      name="cpf"
                      InputLabelProps={{ shrink: true }}
                      {...formik.getFieldProps('parentId.cpf')}
                    />
                    <div>
                      {formik.touched.parentId && formik.errors.parentId ? (
                        <Typography className={classes.error}>{formik.errors.parentId.cpf}</Typography>
                      ) : null}
                    </div>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      variant="outlined"
                      label="Email:"
                      margin="dense"
                      fullWidth
                      name="email"
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
                      InputLabelProps={{ shrink: true }}
                      {...formik.getFieldProps('parentId.phone')}
                    />
                    <div>
                      {formik.touched.parentId && formik.errors.parentId ? (
                        <Typography className={classes.error}>{formik.errors.parentId.phone}</Typography>
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
                      name="parentId.address.zip"
                      InputLabelProps={{ shrink: true }}
                      {...formik.getFieldProps('parentId.address.zip')}
                    />
                    <div>
                      {formik.touched.parentId && formik.errors.parentId ? (
                        <Typography className={classes.error}>{formik.errors.parentId.address.zip}</Typography>
                      ) : null}
                    </div>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      variant="outlined"
                      label="Rua:"
                      margin="dense"
                      fullWidth
                      name="parentId.address.street"
                      InputLabelProps={{ shrink: true }}
                      {...formik.getFieldProps('parentId.address.street')}
                    />
                    <div>
                      {formik.touched.parentId && formik.errors.parentId ? (
                        <Typography className={classes.error}>{formik.errors.parentId.address.street}</Typography>
                      ) : null}
                    </div>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      variant="outlined"
                      label="Bairro:"
                      margin="dense"
                      fullWidth
                      name="parentId.address.district"
                      InputLabelProps={{ shrink: true }}
                      {...formik.getFieldProps('parentId.address.district')}
                    />
                    <div>
                      {formik.touched.parentId && formik.errors.parentId ? (
                        <Typography className={classes.error}>{formik.errors.parentId.address.district}</Typography>
                      ) : null}
                    </div>
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      variant="outlined"
                      label="Cidade:"
                      margin="dense"
                      fullWidth
                      name="parentId.address.city"
                      InputLabelProps={{ shrink: true }}
                      {...formik.getFieldProps('parentId.address.city')}
                    />
                    <div>
                      {formik.touched.parentId && formik.errors.parentId ? (
                        <Typography className={classes.error}>{formik.errors.parentId.address.city}</Typography>
                      ) : null}
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      variant="outlined"
                      label="Estado:"
                      margin="dense"
                      fullWidth
                      name="parentId.address.state"
                      InputLabelProps={{ shrink: true }}
                      {...formik.getFieldProps('parentId.address.state')}
                    />
                    <div>
                      {formik.touched.parentId && formik.errors.parentId ? (
                        <Typography className={classes.error}>{formik.errors.parentId.address.state}</Typography>
                      ) : null}
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      variant="outlined"
                      label="Número:"
                      margin="dense"
                      fullWidth
                      name="parentId.address.number"
                      InputLabelProps={{ shrink: true }}
                      {...formik.getFieldProps('parentId.address.number')}
                    />
                    <div>
                      {formik.touched.parentId && formik.errors.parentId ? (
                        <Typography className={classes.error}>{formik.errors.parentId.address.number}</Typography>
                      ) : null}
                    </div>
                  </Grid>
                  <Grid item xs={2}>
                    <TextField
                      variant="outlined"
                      label="Tipo:"
                      margin="dense"
                      fullWidth
                      name="parentId.address.type"
                      InputLabelProps={{ shrink: true }}
                      {...formik.getFieldProps('parentId.address.type')}
                    />
                    <div>
                      {formik.touched.parentId && formik.errors.parentId ? (
                        <Typography className={classes.error}>{formik.errors.parentId.address.type}</Typography>
                      ) : null}
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      variant="outlined"
                      label="Complemento:"
                      margin="dense"
                      fullWidth
                      name="parentId.address.obs"
                      InputLabelProps={{ shrink: true }}
                      {...formik.getFieldProps('parentId.address.obs')}
                    />
                    <div>
                      {formik.touched.parentId && formik.errors.parentId ? (
                        <Typography className={classes.error}>{formik.errors.parentId.address.obs}</Typography>
                      ) : null}
                    </div>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Divider/>
                  <Button type="submit" className={classes.button} variant="contained" color="primary">
                    Atualizar
                  </Button>
                  <Button className={classes.button} component={Link} to={`/user/?${userById._id}?page=1&limit=25`} variant="outlined" color="primary">
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

SetupUser.prototypes = {
  userById: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  userById: state.adm.userById,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getUserById, updateUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SetupUser);