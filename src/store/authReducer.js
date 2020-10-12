import api from '../services/api';
import history from '../services/history';
import { setInfosLocalStorage } from '../services/auth';
import { showMessage } from './messageReducer';

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
    api.post('/auth', login)
    .then(Response => {
      dispatch({
        type: ACTIONS.AUTH,
        infos: Response.data,
      }); 
      if(!Response.data.token){
        dispatch(
          showMessage("Senha ou email inválidos!")
        )
      }else{
        setInfosLocalStorage(Response.data.token, Response.data.user);
        history.push(`/user/?${Response.data.user._id}?page=1&limit=25`);
      }
    })
    .catch(error => {
      dispatch(
        showMessage("Servidor indisponível, tente mais tarde!"),
        console.log(error)
      )}
    )
  }
}
//ESQUECI SENHA
export const fogot = (email) => {
  return dispatch => {
    api.post('/auth/fogot', email)
    .then(Response => {
      dispatch({
        type: ACTIONS.FOGOT,
        email: Response.data,
      });
      if(!Response.data.email){
        dispatch(
          showMessage("Usuario não encontrado!")
        )
      }else{
        dispatch(
          showMessage("Email enviado com sucesso!"),
          history.push('/login')
        )
      }
    })
    .catch(error => {
      dispatch(
        showMessage("Servidor indisponível, tente mais tarde!"),
        console.log(error)
      )}
    );
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
      });
      if(!Response.data.success){
        dispatch(
          showMessage("Usuario não encontrado!")
        )
      }else{
        dispatch(
          showMessage("Senha recuperada com sucesso!"),
          history.push('/login')
        )
      }
    })
    .catch(error => {
      dispatch(
        showMessage("Serviço indisponível, tente mais tarde!"),
        console.log(error)
      )}
    );
  }
}