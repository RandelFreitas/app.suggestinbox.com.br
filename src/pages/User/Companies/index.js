import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getCompanies } from '../../../store/companyReducer';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CardActions from '@material-ui/core/CardActions';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) =>({
  root: {
    flexGrow: 1,
  },
  item: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  center: {
    justifyContent: 'center',
    textAlign: 'center',
    margin: '20px'
  },
  button: {
    margin: '15px'
  }
}));

const Companies = (props) => {
  const classes = useStyles();

  const { companies, infosCompanies = 0 } = props;
  const [ idUrl ] = useState(window.location.href.split('/?')[1].split('?')[0]);
  const nOfPages = infosCompanies.pages;
  const [page, setPage] = useState(0);
  const [nOfItems, setNoOfItems] = useState(25);

  useEffect(() => {
    props.getCompanies(page, nOfItems);
  },[page, nOfItems]);

  const handleChange=(event, value)=>{
    setPage(value);
  }
  const handleNofItems=(event)=>{
    setNoOfItems(event.target.value);
    setPage(1);
  }

  const mapCompanies = () => (
    <React.Fragment>
      {companies.map(company => {
        return(
          <Grid key={company.id} item md={4} sm={6} xs={12}>
            <div className={classes.item}>  
              <Card>
                <CardActionArea component={Link} to={`/suggest/?${idUrl}/?${company.id}?page=${page}&limit=${nOfItems}`}>
                  <CardContent>
                    <Typography noWrap variant="h5" component="h2">
                      {company.name}
                    </Typography>
                    <Typography noWrap variant="body2" color="textSecondary" component="p">
                      {company.address.city} - {company.address.state}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions className={classes.center}>
                  <Button component={Link} to={`/suggest/?${idUrl}/?${company.id}?page=${page}&limit=${nOfItems}`} variant="contained" color="primary">
                    Gerenciar
                  </Button>
                </CardActions>
              </Card>
            </div>
          </Grid>
        );
      })}
    </React.Fragment>
  );

  return(
    <div className={classes.root}>
      <Typography className={classes.center} variant="h5" component="h2">Companhias</Typography>
      <Button className={classes.button} component={Link} to={`/user/setup-company/?${idUrl}`} variant="contained" color="primary">
        Adicionar Companhia
      </Button>
      <Grid container item xs={12} spacing={3}>
        {mapCompanies}
      </Grid>
      <Grid className={classes.center} container item xs={12} spacing={3}>
        <Box component="span">
          <Pagination
            count={nOfPages}
            page={page}
            onChange={handleChange}
          />
        </Box>
      </Grid>
    </div>
  );
};

Companies.prototypes = {
  companies: PropTypes.array.isRequired,
  infosCompanies: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  companies: state.company.companies,
  infosCompanies: state.company.infosCompanies,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    getCompanies,
  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Companies);