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
//OBTER INFOS DA COMPANIA
export const getInfo = (id) => {
  return dispatch => {
    api.get(`/client/company/${id}`)
    .then(Response => {
      dispatch({
        type: ACTIONS.INFOS,
        infos: Response.data,
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
}
//ENVIAR SUGGEST
export const submitSuggest = (suggest) => {
  return dispatch => {
    api.post(`/client/company/${suggest.companyId}`, suggest)
    .then(Response => {
      dispatch({
        type: ACTIONS.ADD,
        suggest: Response.data,
      });
    }, history.push(`/client/opiniao/sucesso/?${suggest.companyId}`))
    .catch(error => {
      console.log(error);
    });
  }
}