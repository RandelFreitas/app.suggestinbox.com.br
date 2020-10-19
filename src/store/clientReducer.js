import api from '../services/api';
import history from "../services/history";

const ACTIONS = {
  INFOS: 'INFOS',
  ADD: 'ADD_SUGGEST',
  GET_MENU: 'GET_MENU'
}
const INITIAL_STATE = {
  infos:[],
  idTable: [],
  suggest:[],
  menu: [],
  sectionMenu: [],
}
export const clientReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case ACTIONS.INFOS:
      return {...state, infos: action.infos, idTable: action.idTable}
    case ACTIONS.GET_MENU:
      return {...state, menu: action.menu, sectionMenu: action.sectionMenu}
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
//LISTAR MENU
export const getMenu = (idCompany) => {
  return dispatch => {
    api.get(`/client/company/menu/${idCompany}`)
    .then(Response => {
      dispatch({
        type: ACTIONS.GET_MENU,
        menu: Response.data,
        sectionMenu: Response.data.sectionMenu,
      })
    })
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