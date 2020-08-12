import api from '../services/api';
import history from '../services/history';
import { setInfosLocalStorage, logoutApp } from '../services/auth';

const ACTIONS = {
  AUTH: 'AUTH',
}

const ESTADO_INICIAL = {
  token: '',
}

export const authReducer = (state = ESTADO_INICIAL, action) => {
  switch(action.type){
    case ACTIONS.AUTH:
      return {...state, manager: action.manager}
    default:
      return state;
  }
}

export const auth = (login) => {
  return dispatch => {
    api.post('/auth/authenticate', login)
    .then(Response => {
      dispatch({
          type: ACTIONS.AUTH,
          manager: Response.data,
        },
        setInfosLocalStorage(Response.data.token, Response.data.name),
        history.push(`/adm`)
      );
    });
  }
}

export const logout = () =>{
  logoutApp();
  history.push(`/`);
}