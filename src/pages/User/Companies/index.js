import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { listCompanies } from '../../../store/admReducer' 

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
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
  media: {
    height: 20,
  },
  center: {
    justifyContent: 'center',
  },
  clinics: {
    justifyContent: 'space-between'
  },
}));

const Companies = (props) => {
  const classes = useStyles();

  const { companies, infosCompanies } = props;
  const nOfPages = infosCompanies.pages;
  const [page, setPage] = useState(1);
  const [nOfItems, setNoOfItems] = useState(10);

  useEffect(() => {
    props.listCompanies(page, nOfItems);
  },[page, nOfItems]);

  const handleChange=(event, value)=>{
    setPage(value);
  }
  const handleNofItems=(event)=>{
    setNoOfItems(event.target.value);
    setPage(1);
  }

  const mapCompanies = (
    <React.Fragment>
      {companies.map( company => {
          return(
            <Grid key={company._id} item md={4} sm={6} xs={12}>
              <div className={classes.item}>  
                <Card>
                  <CardActionArea component={Link} to={`/suggest?page=${page}&limit=${nOfItems}`}>
                    <CardMedia className={classes.media}/>
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
                    <Button component={Link} to='/' variant="contained" color="primary">
                      Gerenciar
                    </Button>
                    <Button component={Link} to='/' variant="contained" color="primary">
                      Configurações
                    </Button>
                  </CardActions>
                </Card>
              </div>
            </Grid>
          )})
        }
    </React.Fragment>
  )

  return(
    <div className={classes.root}>
      <Grid className={classes.center} container spacing={1}>
        <Typography noWrap variant="h5" component="h2">Estabelecimentos</Typography>
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
      </Grid>
    </div>
  )
}

Companies.prototypes = {
  companies: PropTypes.array.isRequired,
  infosCompanies: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  companies: state.adm.companies,
  infosCompanies: state.adm.infosCompanies,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({listCompanies}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Companies);