import api from '../services/api';
import history from '../services/history';

const ACTIONS = {
  LIST_USERS: 'LISTUSERS',
  BY_ID_USER: 'BYIDUSER',
  UPDATE_USER: 'UPDATEUSER',
}
const INITIAL_STATE = {
  users: [],
  userById: [],
  userUp: [],
  infosUsers: [],
}
export const userReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case ACTIONS.BY_ID_USER:
      return {...state, userById: action.userById}
    case ACTIONS.UPDATE_USER:
      return {...state, user: action.user}
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
      })
    })
    .catch(error => {
      console.log(error);
    });
  }
}
//GET BY ID USER
export const getUserById = (id) => {
  return dispatch => {
    api.get(`/adm/user/${id}`)
    .then(Response => {
      dispatch({
        type: ACTIONS.BY_ID_USER,
        userById: Response.data,
      })
    })
    .catch(error => {
      console.log(error);
    })
  }
}
//UPDATE USER
export const updateUser = (user, id) => {
  return dispatch => {
    api.put(`/adm/user/${id}`, user)
    .then(Response => {
      dispatch({
        type: ACTIONS.UPDATE_USER,
        userUp: Response.data
      })
    }, history.push(`/user/?${id}?page=1&limit=25`))
    .catch(error => {
      console.log(error)
    })
  }
}