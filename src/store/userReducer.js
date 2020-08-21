import api from '../services/api';

const ACTIONS = {
  LIST: 'LIST',
}
const INITIAL_STATE = {
  suggest:[],
}
export const userReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case ACTIONS.LIST:
      return {...state, suggest: action.suggest}
    default:
      return state;
  }
}
export const submitSuggest = (id) => {
  return dispatch => {
    api.post('/adm/listsuggest', id)
    .then(Response => {
      dispatch({
          type: ACTIONS.LIST,
          suggesr: Response.data,
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
}
