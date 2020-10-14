import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { atvCompany, getCompanyById } from '../../../../store/companyReducer';

import { makeStyles } from '@material-ui/core/styles';
import Switch from "@material-ui/core/Switch";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { DragDropContext } from 'react-beautiful-dnd';

const useStyles = makeStyles(() =>({
  button: {
    marginTop: '25px',
  },
  formControl: {
    padding: '15px 0'
  }
}));

const Menu = (props) => {
  const classes = useStyles();
  const { companyById } = props;
  const [ menu, setMenu ] = useState({
    check: companyById.menu
  })

  const atvMenu = (companyById) => {
    if(companyById.menu){
      companyById.menu = false;
      setMenu({check: companyById.menu});
      return props.atvCompany(companyById);
    }else{
      companyById.menu = true;
      setMenu({check: companyById.menu});
      return props.atvCompany(companyById);
    }
  }

  const [menuType, setMenuType] = useState(1);

  const handleChange = (event) => {
    setMenuType(event.target.value);
  };

  return(
    <div>
      <Typography variant="h5" component="h2">Cardápio / Catálogo</Typography>
      <Grid container>
        <Grid item>
          <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                checked={menu.check}
                onClick={()=>atvMenu(companyById)}
                name="checkedA"
                color="primary"
              />
            }
            label="Ativar/Desativar"
          />
          </FormGroup>
        </Grid>
      </Grid>
      <FormControl className={classes.formControl}>
        <FormHelperText>Tipo:</FormHelperText>
        <Select
          value={menuType}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value={1}>Cardápio</MenuItem>
          <MenuItem value={2}>Catálogo</MenuItem>
        </Select>
      </FormControl>

    </div>
  );
}

Menu.prototypes = {
  companyById: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  companyById: state.company.companyById,
});

const mapsDispatchToProps = dispatch => 
  bindActionCreators({atvCompany, getCompanyById}, dispatch);

export default connect(mapStateToProps, mapsDispatchToProps)(Menu);