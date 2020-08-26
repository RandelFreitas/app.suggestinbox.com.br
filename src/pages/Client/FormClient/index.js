import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { submitSuggest } from '../../../store/clientReducer'
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Star from '@material-ui/icons/Star';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: 'auto',
      width: '33ch',
    },
  },
  center: {
    width: '275px',
    margin: 'auto',
    paddingTop: '30px'
  },
  span: {
    marginTop: '20px',
    fontSize: "15px",
    textAlign: 'center',
    alignItems: 'center'
  },
  desejo: {
    fontSize: "12px",
  },
  desejoPai: {
    margin: 0,
    justifyContent: 'start'
  },
  button: {
    marginTop: '20px'
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

const FormClient = () => {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  const [values, setValues] = useState({
    name: '',
    phone: '',
    stars: '',
    opinion: ''
  });

  const handleChange = (event) => {
    setValues({...values, [event.target.name]: event.target.value });
    console.log(values);
  };
  const checkChange = (event) => {
    setValues({name: '', phone: ''});
    setChecked(event.target.checked);
  };

  return (
    <div className={classes.center}>
      <MuiThemeProvider theme={theme}>
        <FormControl className={classes.root}>
          <TextField
            label="Nome"
            error
            disabled={checked}
            value={values.name} 
            onChange={handleChange}
            name="name"
            id="standard-basic" 
          />
          <TextField
            label="Telefone"
            error
            disabled={checked}
            value={values.phone}
            onChange={handleChange}
            name="phone"
            id="formatted-numberformat-input"
            InputProps={{inputComponent: NumberFormatCustom}}
          />
          <FormControlLabel className={classes.desejoPai}
            label={<Typography className={classes.desejo}>Desejo não me identificar</Typography>}
            size="small"
            control={<Checkbox color="primary" checked={values.checkedA} 
            onChange={checkChange} 
            name="checkedA" />}
          />
          <Box className={classes.span} component="fieldset" mb={3} borderColor="transparent">
            <Typography component="legend">Toque para classificar</Typography>
            <Rating
              name="stars"
              onChange={handleChange}
              defaultValue={0}
              icon={<Star fontSize="large" />}
              emptyIcon={<StarBorderIcon fontSize="large" />}
            />
          </Box>
          <TextField error
            label="Deixe sua opinião"
            multiline
            rows={4}
            rowsMax={6}
            variant="outlined"
            value={values.opinion} 
            onChange={handleChange}
            name="opinion"
            id="text-basic" 
          />
          <Button className={classes.button} variant="contained" color="primary">
            Enviar
          </Button>
        </FormControl>
      </MuiThemeProvider>
    </div>
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