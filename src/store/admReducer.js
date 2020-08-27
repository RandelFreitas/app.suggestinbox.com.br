import api from '../services/api';
//import history from '../services/history';

const ACTIONS = {
  LIST: 'LIST',
}
const INITIAL_STATE = {
  suggests: [],
  infos: []
}
export const admReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case ACTIONS.LIST:
      return {...state, suggests: action.suggests, infos: action.infos}
    default:
      return state;
  }
}
export const listSuggest = (page, nOfItems) => {
  return dispatch => {
    api.get(`/adm/suggest?page=${page}&limit=${nOfItems}`)
    .then(Response => {
      const { docs, infos } = Response.data;
      dispatch({
          type: ACTIONS.LIST,
          suggests: docs,
          infos,
      })
    })
    .catch(error => {
      console.log(error);
    });
  }
}
