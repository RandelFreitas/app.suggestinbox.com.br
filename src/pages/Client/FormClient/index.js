import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { submitSuggest } from '../../../store/clientReducer'
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Star from '@material-ui/icons/Star';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: 'auto',
      width: '100%',
    },
  },
  span: {
    fontSize: "15px",
    textAlign: 'center'
  },
  unknown: {
    margin: 0,
  },
  unknownChildren: {
    margin: 0,
    justifyContent: 'start',
    fontSize: "12px",
  },
  recommends: {
    justifyContent: 'center'
  },
  button: {
    marginTop: '20px',
    marginBottom: '20px'
  }
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1769aa',
    },
    secondary:{
      main: '#FFB701'
    }
  },
});

const NumberFormatCustom = (props) => {
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

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const FormClient = (props) => {
  const classes = useStyles();
  const { infos } = props;
  const [checked, setChecked] = useState(false);
  const [values, setValues] = useState({
    name: '',
    phone: '',
    stars: '',
    opinion: '',
    recommends: ''
  });
  const[error, setError] = useState({
    name: false,
    phone: false,
    stars: false,
    opinion: false,
    recommends: false,
  });

  const handleChange = (event) => {
    setValues({...values, [event.target.name]: event.target.value });
  };
  const checkChange = (event) => {
    setValues({name: '', phone: ''});
    setChecked(event.target.checked);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    props.submitSuggest(values, infos._id);
  }

  return (
    <MuiThemeProvider theme={theme}>
      <form className={classes.root} onSubmit={handleSubmit}>
        <TextField
          label="Nome"
          error={error.name}
          disabled={checked}
          value={values.name} 
          onChange={handleChange}
          name="name"
          id="standard-basic" 
        />
        <TextField
          label="Telefone"
          error={error.phone}
          disabled={checked}
          value={values.phone}
          onChange={handleChange}
          name="phone"
          id="formatted-numberformat-input"
          InputProps={{inputComponent: NumberFormatCustom}}
        />
        <FormControlLabel className={classes.unknown}
          label={<Typography className={classes.unknownChildren}>Desejo não me identificar</Typography>}
          size="small"
          control={<Checkbox color="primary" checked={values.checkedA} 
          onChange={checkChange} 
          name="checkedA" />}
        />
        <Box className={classes.span} component="fieldset" mb={3} borderColor="transparent">
          <FormLabel component="legend">Toque para classificar</FormLabel>
          <Rating
            name="stars"
            onChange={handleChange}
            defaultValue={0}
            icon={<Star fontSize="large" />}
            emptyIcon={<StarBorderIcon fontSize="large" />}
          />
        </Box>
        <FormControl component="fieldset" error={error.recommends} className={classes.span}>
          <FormLabel component="legend">Nos recomendaria?</FormLabel>
          <RadioGroup onChange={handleChange} className={classes.recommends} row aria-label="position" name="recommends" defaultValue="top">
            <FormControlLabel
              value="Y"
              control={<Radio color="primary" />}
              label="Sim"
              name="recommends"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="N"
              control={<Radio color="primary" />}
              label="Não"
              name="recommends"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
        <TextField error
          label="Deixe sua opinião"
          error={error.opinion}
          multiline
          rows={4}
          rowsMax={6}
          variant="outlined"
          value={values.opinion} 
          onChange={handleChange}
          name="opinion"
          id="text-basic" 
        />
        <Button className={classes.button} type="submit" variant="contained" color="primary">
          Enviar
        </Button>
      </form>
    </MuiThemeProvider>
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