import api from '../services/api';
import history from '../services/history';
import { setInfosLocalStorage, logoutUser } from '../services/auth';

const ACTIONS = {
  AUTH: 'AUTH',
}
const INITIAL_STATE = {
  infos:[]
}
export const authReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case ACTIONS.AUTH:
      return {...state, infos: action.infos}
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
export const logout = () =>{
  logoutUser();
  history.push(`/login`);
}