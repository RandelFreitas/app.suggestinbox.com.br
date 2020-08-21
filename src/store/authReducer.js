import api from '../services/api';
import history from '../services/history';
import { setInfosLocalStorage, logoutAdm } from '../services/auth';

const ACTIONS = {
  AUTH: 'AUTH',
}
const INITIAL_STATE = {
  infos:[],
  token: '',
}
export const authReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case ACTIONS.AUTH:
      return {...state, manager: action.manager}
    default:
      return state;
  }
}
export const teste = (values) => {
  return dispatch => {
      console.log(values);
  }
}
export const auth = (login) => {
  return dispatch => {
    api.post('/auth/authenticate', login)
    .then(Response => {
      dispatch({
          type: ACTIONS.AUTH,
          infos: Response.data,
        },
        setInfosLocalStorage(Response.data.token, Response.data.name),
        history.push(`/adm`)
      );
    })
    .catch(error => {
      console.log(error);
    });
  }
}
export const logout = () =>{
  logoutAdm();
  history.push(`/login`);
}