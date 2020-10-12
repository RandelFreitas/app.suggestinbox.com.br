import api from '../services/api';
import history from "../services/history";

const ACTIONS = {
  INFOS: 'INFOS',
  ADD: 'ADD_SUGGEST'
}
const INITIAL_STATE = {
  infos:[],
  idTable: [],
  suggest:[]
}
export const clientReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case ACTIONS.INFOS:
      return {...state, infos: action.infos, idTable: action.idTable}
    case ACTIONS.ADD:
      return {...state, suggest: action.suggest}
    default:
      return state;
  }
}
//OBTER INFOS DA COMPANIA
export const getInfo = (idCompany, idTable) => {
  return dispatch => {
    api.get(`/client/company/${idCompany}`)
    .then(Response => {
      dispatch({
        type: ACTIONS.INFOS,
        infos: Response.data,
        idTable: idTable
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
}
//ENVIAR SUGGEST
export const submitSuggest = (suggest) => {
  if(suggest.recommends === 'y'){
    suggest.recommends = true;
  }else{
    suggest.recommends = false;
  }
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
//ENVIAR CALL
export const addCall = (idCompany, idTable) => {
  const call = {
    table: idTable,
    companyId: idCompany
  };
  console.log(call);
  return dispatch => {
    api.post(`/client/company/call/${idCompany}`, call)
    .then(Response => {
      dispatch({
        type: ACTIONS.ADD_CALL,
      });
    }) //history.push(`/suggest/call/success`))
    .catch(error => {
      console.log(error);
    });
  }
}