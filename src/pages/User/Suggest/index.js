import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logoutUser } from '../../../services/auth';
import { getCompanyById } from '../../../store/companyReducer';
import { getUserById } from '../../../store/userReducer';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MoodIcon from '@material-ui/icons/Mood';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Rating from '@material-ui/lab/Rating';
import CardMedia from '@material-ui/core/CardMedia';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import BusinessIcon from '@material-ui/icons/Business';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';

import RoutesUser from './routesUser';

const drawerWidth = 210;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    textDecoration: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  icon: {
    textDecoration: 'none',
    color: 'white',
  },
  profile: {
    paddingRight: 17
  },
  avatar: {
    fontSize: '12px',
    width: '22px',
    height: '22px',
    backgroundColor: '#f50057',
    textAlign: 'center',
  },
  photo: {
    margin: '0 auto',
    marginBottom: '5px',
    marginTop: '20px',
    width: 128,
    height: 128,
  },
  card:{
    textAlign: 'center',
  },
}));

const MainSuggest = (props) => {
  const classes = useStyles();
  const { companyById } = props;
  const { stars, name } = companyById;
  const [ idUser ] = useState(window.location.href.split('/?')[1]);
  const [ idCompany ] = useState(window.location.href.split('/?')[2].split('?')[0]);

  useEffect(() => {
    if(idCompany){
      props.getCompanyById(idCompany);
    }
  },[]);

  const [open, setOpen] = useState(true );
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}>
              <MenuIcon />
            </IconButton>
            <Typography component={Link} to={`/suggest/?${idUser}/?${idCompany}?page=1&limit=25`} variant="h6" color="inherit" noWrap className={classes.title}>
                SuggestInBox
            </Typography>
            <IconButton component={Link} to={`/suggest/setup-company/?${idUser}/?${idCompany}`} color="inherit">
              <Avatar className={classes.avatar}>{name? name.split('', 1): "..."}</Avatar>
            </IconButton>
            <IconButton aria-label="show 11 new notifications" color="inherit">
              <Badge badgeContent={0} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton component={Link} to={`/suggest/setup-company/?${idUser}/?${idCompany}`} color="inherit">
              <SettingsIcon/>
            </IconButton>
            <IconButton onClick={()=>logoutUser()} color="inherit">
              <ExitToAppIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" classes={{paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)}} open={open}>
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <div>      
              <Card className={classes.card}>
                <div hidden={!open}>
                  <CardMedia className={classes.photo} image={companyById.urlImg? companyById.urlImg : "..."} title="Contemplative Reptile"/>
                  <Typography>{companyById.name}</Typography>
                </div>
                <CardContent hidden={!open}>
                  <Typography variant="h3" color="textSecondary" component="p">
                    {companyById.stars? parseFloat(companyById.stars).toFixed(1): "..."}
                  </Typography>
                  <Typography color="textSecondary" component="p">
                    {companyById.nStars} classificações
                  </Typography>
                  <Rating name="read-only" value={stars? stars: 0} precision={0.5} readOnly/>
                </CardContent>
              </Card>
              <ListItem button component={Link} to={`/suggest/?${idUser}/?${idCompany}?page=1&limit=25`}>
                <ListItemIcon>
                  <EqualizerIcon />
                </ListItemIcon>
                <ListItemText primary="Sugestões" />
              </ListItem>
              <ListItem button component={Link} to={`/suggest/call/?${idUser}/?${idCompany}?page=1&limit=25`}>
                <ListItemIcon>
                  <EmojiPeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Chamadas" />
              </ListItem>
              <ListItem button component={Link} to={`/suggest/promo/?${idUser}/?${idCompany}`}>
                <ListItemIcon>
                  <MoodIcon />
                </ListItemIcon>
                <ListItemText primary="Promoções" />
              </ListItem>
              <ListItem button component={Link} to={`/suggest/cardapio/?${idUser}/?${idCompany}`}>
                <ListItemIcon>
                  <MenuBookIcon/>
                </ListItemIcon>
                <ListItemText primary="Cardapio" />
              </ListItem>
              <ListItem button component={Link} to={`/suggest/delivery/?${idUser}/?${idCompany}`}>
                <ListItemIcon>
                  <MotorcycleIcon/>
                </ListItemIcon>
                <ListItemText primary="Delivery" />
              </ListItem>
              <ListItem button component={Link} to={`/suggest/reservation/?${idUser}/?${idCompany}`}>
                <ListItemIcon>
                  <AlarmOnIcon />
                </ListItemIcon>
                <ListItemText primary="Reservas" />
              </ListItem>
              <ListItem button component={Link} to={`/suggest/finances/?${idUser}/?${idCompany}`}>
                <ListItemIcon>
                  <AttachMoneyIcon />
                </ListItemIcon>
                <ListItemText primary="Financeiro" />
              </ListItem>
              <ListItem button component={Link} to={`/user/?${idUser}?page=1&limit=25`}>
                <ListItemIcon>
                  <BusinessIcon />
                </ListItemIcon>
                <ListItemText primary="Companhias" />
              </ListItem>
            </div>
          </List>
        <Divider />
        </Drawer>

        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid>
              <RoutesUser />
            </Grid>
          </Container>
        </main>
      </div>
    </div>
  );
};

MainSuggest.prototypes = {
  infos: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  infos: state.auth.infos,
  companyById: state.company.companyById,
  userById: state.user.userById,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({getCompanyById, getUserById}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainSuggest);