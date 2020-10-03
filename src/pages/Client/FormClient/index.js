import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { submitSuggest } from '../../../store/clientReducer'
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';

import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
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
    marginTop: "20px",
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

function getSteps() {
  return ["", "", "", ""];
}

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
  const [companyId] = useState(window.location.href.split('/?')[1]);
  const [checked, setChecked] = useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [values, setValues] = useState({
    name: '',
    phone: '',
    stars: 0,
    opinion: '',
    recommends: false,
    companyId
  });
  const[error] = useState({
    name: false,
    phone: false,
    stars: false,
    opinion: false,
    recommends: false,
  });

  const handleChange = (event) => {
    switch(event.target.value){
      case 'y':
        setValues({...values, [event.target.name]: true });
        break;
      case 'n':
        setValues({...values, [event.target.name]: false });
        break;
      case '1':
        setValues({...values, [event.target.name]: 1 });
        break;
      case '2':
        setValues({...values, [event.target.name]: 2 });
        break;
      case '3':
        setValues({...values, [event.target.name]: 3 });
        break;
      case '4':
        setValues({...values, [event.target.name]: 4 });
        break;
      case '5':
        setValues({...values, [event.target.name]: 5 });
        break;
      default:
        setValues({...values, [event.target.name]: event.target.value });
        break;
    }
  };
  const checkChange = (event) => {
    setValues({name: '', phone: ''});
    setChecked(event.target.checked);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    props.submitSuggest(values);
  }

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <div>
            <TextField
              label="Nome"
              error={error.name}
              disabled={checked}
              value={values.name} 
              onChange={handleChange}
              name="name"
              id="standard-basic"
              inputProps={{ maxLength: 70 }}
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
            control={<Checkbox color="primary" onChange={checkChange} name="checked" />}
          />
          </div>
        );
      case 1:
        return (
          <div>
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
          </div>
        );
      case 2:
        return (
          <div>
            <FormControl component="fieldset" error={error.recommends} className={classes.span}>
              <FormLabel component="legend">Nos recomendaria?</FormLabel>
              <RadioGroup onChange={handleChange} className={classes.recommends} row aria-label="position" name="recommends">
                <FormControlLabel
                  value="y"
                  control={<Radio color="primary" />}
                  label="Sim"
                  name="recommends"
                  labelPlacement="bottom"
                />
                <FormControlLabel
                  value="n"
                  control={<Radio color="primary" />}
                  label="Não"
                  name="recommends"
                  labelPlacement="bottom"
                />
              </RadioGroup>
            </FormControl>
          </div>
        );
      case 3:
        return (
          <div>
            <TextField className={classes.span}
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
          </div>
        );
      default:
        return (
          <div>
            ok
          </div>
        );
    }
  }

  return (
    <MuiThemeProvider theme={theme}>
      <form className={classes.root} onSubmit={handleSubmit}>

        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <div>
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Voltar
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext} className={classes.button}>
                {activeStep === steps.length - 1 ? "Enviar" : "Proxima"}
              </Button>
            </div>
          </div>
        </div>
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