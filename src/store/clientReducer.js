import api from '../services/api';
import history from "../services/history";

const ACTIONS = {
  INFOS: 'INFOS',
  ADD: 'ADD_SUGGEST'
}
const INITIAL_STATE = {
  infos:[],
  suggest:[]
}
export const clientReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case ACTIONS.INFOS:
      return {...state, infos: action.infos}
    case ACTIONS.ADD:
      return {...state, suggest: action.suggest}
    default:
      return state;
  }
}
export const getInfo = (id) => {
  return dispatch => {
    api.get(`/client/${id}`)
    .then(Response => {
      dispatch({
          type: ACTIONS.INFOS,
          infos: Response.data,
      });
    })
    .catch(error => {
      history.push('/');
      console.log(error);
    });
  }
}
export const submitSuggest = (suggest, id) => {
  return dispatch => {
    api.post('/client', suggest)
    .then(Response => {
      dispatch({
          type: ACTIONS.ADD,
          suggest: Response.data,
      });
    }, history.push(`/client/opiniao/sucesso/?${id}`))
    .catch(error => {
      history.push('/');
      console.log(error);
    });
  }
}