import api from '../../../services/api';
import { showMessage } from '../../sharedStores/messageReducer';

const ACTIONS = {
  LIST_USERS: 'LISTUSERS',
  BY_ID_USER: 'BYIDUSER',
  UPDATE_USER: 'UPDATEUSER',
}
const INITIAL_STATE = {
  users: [],
  userById: [],
  infosUsers: [],
}
export const userReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case ACTIONS.BY_ID_USER:
      return {...state, userById: action.userById}
    case ACTIONS.UPDATE_USER:
      return {...state, userById: action.userById}
    default:
      return state;
  }
}
//LISTAR TODOS USUÁRIOS
export const listUser = (page, nOfItems) => {
  return dispatch => {
    api.get(`/user/user?page=${page}&limit=${nOfItems}`)
    .then(Response => {
      const { docs, infos } = Response.data;
      dispatch({
        type: ACTIONS.LIST_USERS,
        users: docs,
        infosUsers: infos,
      });
    }).catch(error => {
      if(error.response){
        dispatch(
          showMessage(error.response.data.err),
        )
      }else{
        dispatch(
          showMessage("Servidor indisponível, tente mais tarde!"),
        );
      }
    });
  }
}
//GET BY ID USER
export const getUserById = (idUser) => {
  return dispatch => {
    api.get(`/user/user/${idUser}`)
    .then(Response => {
      dispatch({
        type: ACTIONS.BY_ID_USER,
        userById: Response.data,
      });
    }).catch(error => {
      if(error.response){
        dispatch(
          showMessage(error.response.data.err),
        )
      }else{
        dispatch(
          showMessage("Servidor indisponível, tente mais tarde!"),
        );
      }
    });
  }
}
//UPDATE USER
export const updateUser = (user, idUser) => {
  console.log('ok');
  return dispatch => {
    api.patch(`/auth/user/${idUser}`, user)
    .then(Response => {
      dispatch({
        type: ACTIONS.UPDATE_USER,
        userById: Response.data
      });
    }).catch(error => {
      if(error.response){
        dispatch(
          showMessage(error.response.data.err),
        )
      }else{
        dispatch(
          showMessage("Servidor indisponível, tente mais tarde!"),
        );
      }
    });
  }
}