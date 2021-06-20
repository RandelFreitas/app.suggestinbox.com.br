import api from '../../services/api';
import history from '../../services/history';
import { setInfosLocalStorage } from '../../services/auth';
import { showMessage } from '../sharedStores/messageReducer';

const ACTIONS = {
  AUTH: 'AUTH',
  FOGOT: 'FOGOT'
}
const INITIAL_STATE = {
  infos:[],
  email:[],
  user:[],
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
//AUTENTICAÇÃO
export const auth = (login) => {
  return dispatch => {
    api.post('/auth/sign-in', login)
    .then(Response => {
      dispatch({
        type: ACTIONS.AUTH,
        infos: Response.data,
      });
      setInfosLocalStorage(Response.data.token, Response.data.name);
      history.push(`/user/?${Response.data.id}`);
    }).catch(error => {
      if(error.response){
        dispatch(
          showMessage(error.response.data.err),
        )
      }else{
        dispatch(
          showMessage("Servidor indisponível, tente mais tarde!"),
        );
      };
    });
  };
};
//ESQUECI SENHA
export const fogot = (email) => {
  return dispatch => {
    api.post('/auth/fogot-password', email)
    .then(Response => {
      dispatch({
        type: ACTIONS.FOGOT,
        email: Response.data,
      });
      dispatch(
        showMessage(Response.data.success),
      );
    }).catch(error => {
      if(error.response){
        dispatch(
          showMessage(error.response.data.err),
        );
      }else{
        dispatch(
          showMessage("Servidor indisponível, tente mais tarde!"),
        );
      };
    });
  }
}
//RESET SENHA
export const reset = (user) => {
  return dispatch => {
    api.post('/auth/reset-password', user)
    .then(Response => {
      dispatch({
        type: ACTIONS.FOGOT,
        user: Response.data,
      },
      showMessage(Response.data.msg),
      history.push('/login')
      );
    }).catch(error => {
      if(error.response){
        dispatch(
          showMessage(error.response.data.err),
        );
      }else{
        dispatch(
          showMessage("Servidor indisponível, tente mais tarde!"),
        );
      }}
    );
  }
}