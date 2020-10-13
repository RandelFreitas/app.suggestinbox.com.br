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
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: 'auto',
      width: '100%',
      background: '#fafafa',
    },
  },
  name: {
    textAlign: 'center',
  },

  span: {  
    textAlign: 'center'
  },
  namePhone: {
    width: '250px'
  },
  ident: {
    marginTop: '10px',
    maxWidth: "200px",
  },
  unknown: {
    fontSize: "12px",
  },
  center: {
    alignItems: 'center',
    textAlign: 'center',
    minHeight: '150px'
  },
  stars: {
    padding: '28px',
    alignItems: 'center',
    textAlign: 'center',
    minHeight: '150px'
  },
  recommends: {
    padding: '28px',
    alignItems: 'center',
    textAlign: 'center',
    minHeight: '150px'
  },
  button: {
    margin: '8px',
    marginTop: '25px'
  }
}));

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
  const [companyId] = useState(window.location.href.split('?')[1]);
  const [checked, setChecked] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set());
  const steps = ["", "", "", ""];

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
    recommends: '',
    companyId
  });

  const handleChange = (event) => {
    switch(event.target.value){
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
          <div >
            <TextField className={classes.namePhone}
              label="Nome"
              disabled={checked}
              value={values.name} 
              onChange={handleChange}
              name="name"
              id="standard-basic"
              inputProps={{ maxLength: 70 }}
            />
            <TextField className={classes.namePhone}
              label="Telefone"
              disabled={checked}
              value={values.phone}
              onChange={handleChange}
              name="phone"
              id="formatted-numberformat-input"
              InputProps={{inputComponent: NumberFormatCustom}}
            />
            <FormControlLabel className={classes.ident}
              label={<Typography className={classes.unknown}>Desejo não me identificar{infos.promo? " e não participar da promoção": ""}</Typography>}
              size="small"
              control={<Checkbox color="primary" onChange={checkChange} name="checked" />}
            />
          </div>
        );
      case 1:
        return (
          <div className={classes.stars}>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <FormLabel component="legend">Toque para classificar</FormLabel>
              <Rating
                name="stars"
                onChange={handleChange}
                defaultValue={0}
                value={values.stars}
                icon={<Star fontSize="large" />}
                emptyIcon={<StarBorderIcon fontSize="large" />}
              />
            </Box>
          </div>
        );
      case 2:
        return (
          <div className={classes.recommends}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Nos recomendaria?</FormLabel>
              <RadioGroup onChange={handleChange} value={values.recommends} row aria-label="position" name="recommends">
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
          <div className={classes.center}>
            <TextField
            label="Deixe sua opinião"
            multiline
            rows={4}
            rowsMax={7}
            variant="outlined"
            value={values.opinion} 
            onChange={handleChange}
            name="opinion"
            id="text-basic" 
            />
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
    <div>
      <h3 className={classes.name}>{props.infos.name}</h3>
      <p className={classes.name}>{props.infos.slogan}</p>
      <form className={classes.root} onSubmit={handleSubmit}>
        <Stepper activeStep={activeStep}>
          <Step>
            <StepLabel/>
          </Step>
          <Step>
            <StepLabel/>
          </Step>
          <Step>
            <StepLabel/>
          </Step>
          <Step>
            <StepLabel/>
          </Step>
        </Stepper>
        <div className={classes.center}>
          {getStepContent(activeStep)}
          <div className={classes.buttons}>
            <Button variant="contained" disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
              Voltar
            </Button>
            {activeStep === steps.length? (
              <Button className={classes.button} variant="contained" color="secondary" type="submit">
                Enviar
              </Button>
            ) : (
              <Button className={classes.button} variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length -1 ? "Enviar" : "Próximo"}
              </Button>)
            }
          </div>
        </div>
      </form>
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