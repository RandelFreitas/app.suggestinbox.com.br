import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateCompany, getCompanyById } from '../../../../store/userStores/companyStores/companyReducer';
import { getMenuById } from '../../../../store/userStores/companyStores/menuReducer';

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
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(() =>({
  button: {
    marginTop: '25px',
  },
  formControl: {
    padding: '15px 0'
  },
  buttonAtv: {
    margin: '15px 0'
  },
  center: {
    textAlign: 'center',
    margin: 'auto',
  },
  paper: {
    margin: '20px 0',
    padding: '15px'
  },
  name: {
    maxWidth: '200px'
  },
  sectionName: {
    margin: 'auto',
    textAlign: 'start',
  },
  visu: {
    margin: '15px 0'
  },
  buttonEdit: {
    margin: '15px'
  },
  hide: {
    display: 'none'
  },
  paper2: {
    marginBottom: '50px'
  },
  tableHead: {
    background: 'black'
  },
  centerButton: {
    textAlign: 'end',
    margin: 'auto',
  }
}));

const Menu = (props) => {
  const classes = useStyles();
  const { companyById, sectionMenu } = props;
  const [ idCompany ] = useState(window.location.href.split('/?')[2]);
  const [ edit, setEdit ] = useState(true);
  const [ menu, setMenu ] = useState({
    check: companyById.menu
  });

  useEffect(() => {
    props.getMenuById(idCompany);
    setMenu({check: companyById.menu});
  },[companyById.menu])

  const atvMenu = (companyById) => {
    if(companyById.menu){
      companyById.menu = false;
      setMenu({check: companyById.menu});
      return props.updateCompany(companyById);
    }else{
      companyById.menu = true;
      setMenu({check: companyById.menu});
      return props.updateCompany(companyById);
    }
  }

  const [menuType, setMenuType] = useState(1);

  const handleChange = (event) => {
    setMenuType(event.target.value);
  };

  const editMenu = () => {
    if(edit){
      setEdit(false);
    }else{
      setEdit(true);
    }
  }

  return(
    <div>
      <Typography variant="h5" component="h2">Cardápio / Catálogo</Typography>
      <Grid container>
        <Grid item className={classes.buttonAtv}>
          <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                checked={menu.check? menu.check : false}
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
      <FormControl>
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

      <Paper className={classes.paper}>
        <Grid container>
          <Grid className={classes.sectionName} item xs={2}>
            <Typography>Seção:</Typography>
          </Grid>
          <Grid className={classes.center} item xs={6}>
            <TextField
              variant="outlined"
              label="Nome:"
              margin="dense"
              fullWidth
              name="name"
              inputProps={{ maxLength: 70 }}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid className={classes.centerButton} item xs={4}>
            <Button variant="contained" color="primary" endIcon={<AddCircleOutlineIcon/>}>
              Adicionar
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={classes.paper}>
        <Grid container>
          <Grid className={classes.sectionName} item xs={1}>
            <Typography>Item:</Typography>
          </Grid>
          <Grid className={classes.center} item xs={5}>
            <TextField
              variant="outlined"
              label="Nome:"
              margin="dense"
              fullWidth
              name="name"
              inputProps={{ maxLength: 70 }}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              variant="outlined"
              label="Descrição:"
              margin="dense"
              fullWidth
              name="Descrition"
              inputProps={{ maxLength: 70 }}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid className={classes.center} item xs={1}>
            <TextField
              variant="outlined"
              label="Valor:"
              margin="dense"
              fullWidth
              name="value"
              inputProps={{ maxLength: 70 }}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid className={classes.center} item xs={2}>
            <FormControl>
              <FormHelperText>Seção do item:</FormHelperText>
              <Select
                value={menuType}
                onChange={handleChange}
                displayEmpty
                className={classes.selectEmpty}
                inputProps={{ 'aria-label': 'Without label' }}
              >
              {sectionMenu.map(section => {
                return (
                  <MenuItem key={section._id} value={section.name}>{section.name}</MenuItem>
                )
              })}
              </Select>
            </FormControl>
          </Grid>
          <Grid className={classes.centerButton} item xs={2}>
            <Button variant="contained" color="primary" endIcon={<AddCircleOutlineIcon/>}>
              Adicionar
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <div className={classes.center}> 
        <Button rel="noopener noreferrer" className={edit? classes.buttonEdit : classes.hide} 
          target="_blank" href={`http://app.suggestinbox.com.br/client/?${idCompany}?table=1`} 
          variant="contained" color="primary"
          endIcon={<VisibilityIcon/>}>
          Vizualiar
        </Button>
        <Button className={classes.buttonEdit} onClick={()=> editMenu()} variant="outlined" color={edit? "default" : "secondary"} endIcon={edit? <EditIcon/> : <CancelIcon/> }>
          {edit? "Editar":"Cancelar"}
        </Button>
        <Button className={edit? classes.hide: classes.buttonEdit} onClick={()=> editMenu()} variant="contained" color="primary" endIcon={<SaveIcon />}>
          Salvar
        </Button>
      </div>

      <Paper className={classes.paper2}>
        {sectionMenu.sort((a, b) => a.index > b.index? 1 : -1).map(section => {
          return (
            <TableContainer key={section._id}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={3} align='left'>
                      <TextField
                        disabled={edit}
                        variant="outlined"
                        label="Seção:"
                        margin="dense"
                        value={section.name}
                        fullWidth
                        name="Descrition"
                        inputProps={{ maxLength: 70 }}
                        InputLabelProps={{ shrink: true }}
                      /> 
                    </TableCell>
                    <TableCell>
                      <FormControl>
                        <FormHelperText>Posição:</FormHelperText>
                        <Select
                          disabled={edit}
                          value={menuType}
                          onChange={handleChange}
                          displayEmpty
                          className={classes.selectEmpty}
                          inputProps={{ 'aria-label': 'Without label' }}
                        >
                          <MenuItem value={1}>1</MenuItem>
                          <MenuItem value={2}>2</MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell>
                      <Button disabled={edit} variant="outlined" color="primary">
                        <DeleteIcon/>
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {section.itemMenu.sort((a, b) => a.index > b.index? 1 : -1).map(item => {
                    return (
                      <TableRow key={item._id}>
                        <TableCell align='left'>
                          <TextField
                            disabled={edit}
                            variant="outlined"
                            label="Nome:"
                            margin="dense"
                            value={item.name}
                            fullWidth
                            name="Descrition"
                            inputProps={{ maxLength: 70 }}
                            InputLabelProps={{ shrink: true }}
                          />
                          <TextField
                            disabled={edit}
                            variant="outlined"
                            label="Descrição:"
                            margin="dense"
                            value={item.description}
                            fullWidth
                            name="Descrition"
                            inputProps={{ maxLength: 70 }}
                            InputLabelProps={{ shrink: true }}
                          /> 
                        </TableCell>
                        <TableCell align='right'>
                        <TextField
                          disabled={edit}
                          variant="outlined"
                          label="Valor:"
                          margin="dense"
                          value={(item.value).toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}
                          fullWidth
                          name="Descrition"
                          inputProps={{ maxLength: 70 }}
                          InputLabelProps={{ shrink: true }}
                        /> 
                        </TableCell>
                        <TableCell>
                          <FormControl>
                            <FormHelperText>Seção:</FormHelperText>
                            <Select
                              disabled={edit}
                              value={menuType}
                              onChange={handleChange}
                              displayEmpty
                              className={classes.selectEmpty}
                              inputProps={{ 'aria-label': 'Without label' }}
                            >
                              <MenuItem value={1}>Comida</MenuItem>
                              <MenuItem value={2}>Bebida</MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell>
                          <FormControl>
                            <FormHelperText>Posição:</FormHelperText>
                            <Select
                              disabled={edit}
                              value={menuType}
                              onChange={handleChange}
                              displayEmpty
                              className={classes.selectEmpty}
                              inputProps={{ 'aria-label': 'Without label' }}
                            >
                              <MenuItem value={1}>1</MenuItem>
                              <MenuItem value={2}>2</MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell align='right'>
                          <Button disabled={edit} variant="outlined" color="primary">
                            <DeleteIcon/>
                          </Button>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )})}
      </Paper>
    </div>
  );
}

Menu.prototypes = {
  companyById: PropTypes.array.isRequired,
  sectionMenu: PropTypes.array.isRequired,
  menuById: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  companyById: state.company.companyById,
  menuById: state.menu.menu,
  sectionMenu: state.menu.sectionMenu,
});

const mapsDispatchToProps = dispatch => 
  bindActionCreators({updateCompany, getCompanyById, getMenuById}, dispatch);

export default connect(mapStateToProps, mapsDispatchToProps)(Menu);