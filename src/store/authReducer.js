import api from '../services/api';
import history from '../services/history';
import { setInfosLocalStorage, logoutUser } from '../services/auth';

const ACTIONS = {
  AUTH: 'AUTH',
  FOGOT: 'FOGOT'
}
const INITIAL_STATE = {
  infos:[],
  email:[],
  user:[]
}
export const authReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case ACTIONS.AUTH:
      return {...state, infos: action.infos}
    case ACTIONS.FOGOT:
      return {...state, email: action.email}
    case ACTIONS.RESET:
      return {...state, user: action.user}
    default:
      return state;
  }
}
export const auth = (login) => {
  return dispatch => {
    api.post('/auth', login)
    .then(Response => {
      dispatch({
          type: ACTIONS.AUTH,
          infos: Response.data,
        },
        setInfosLocalStorage(Response.data.token, Response.data.user),
        history.push(`/user?page=1&limit=25`)
      );
    })
    .catch(error => {
      console.log(error);
    });
  }
}
export const fogot = (email) => {
  return dispatch => {
    api.post('/auth/fogot', email)
    .then(Response => {
      dispatch({
          type: ACTIONS.FOGOT,
          email: Response.data,
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
}
export const reset = (user) => {
  return dispatch => {
    api.post('/auth/reset_password', user)
    .then(Response => {
      dispatch({
          type: ACTIONS.FOGOT,
          user: Response.data,
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
}
export const logout = () =>{
  logoutUser();
  history.push(`/login`);
}