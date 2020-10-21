import api from '../services/api';
import history from '../services/history';
import { showMessage } from './messageReducer';

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
    api.get(`/adm/user?page=${page}&limit=${nOfItems}`)
    .then(Response => {
      const { docs, infos } = Response.data;
      dispatch({
        type: ACTIONS.LIST_USERS,
        users: docs,
        infosUsers: infos,
      });
      if(Response.data.error){
        dispatch(
          showMessage(Response.data.error)
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
//GET BY ID USER
export const getUserById = (idUser) => {
  return dispatch => {
    api.get(`/adm/user/${idUser}`)
    .then(Response => {
      dispatch({
        type: ACTIONS.BY_ID_USER,
        userById: Response.data,
      });
      if(Response.data.error){
        dispatch(
          showMessage(Response.data.error)
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
//UPDATE USER
export const updateUser = (user, idUser) => {
  return dispatch => {
    api.put(`/adm/user/${idUser}`, user)
    .then(Response => {
      dispatch({
        type: ACTIONS.UPDATE_USER,
        userById: Response.data
      });
      if(Response.data.error){
        dispatch(
          showMessage(Response.data.error)
        )
      }else{
        dispatch(
          showMessage("Usuário atualizado com sucesso!"),
          history.push(`/user/?${idUser}?page=1&limit=25`)
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