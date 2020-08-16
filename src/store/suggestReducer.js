import api from '../services/api';

const ACTIONS = {
  LIST: 'LIST',
}

const INITIAL_STATE = {
  suggest:[],
}

export const suggestReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case ACTIONS.LIST:
      return {...state, suggest: action.suggest}
    default:
      return state;
  }
}

export const listSuggest = (id) => {
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
