import api from '../services/api';
//import history from '../services/history';

const ACTIONS = {
  LISTSUGGESTS: 'LISTSUGGESTS',
  LISTCOMPANIES: 'LISTCOMPANIES'
}
const INITIAL_STATE = {
  suggests: [],
  infosSuggests: [],
  companies: [],
  infosCompanies: [],
}
export const admReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case ACTIONS.LISTSUGGESTS:
      return {...state, suggests: action.suggests, infosSuggests: action.infosSuggests}
    case ACTIONS.LISTCOMPANIES:
      return {...state, companies: action.companies, infosCompanies: action.infosCompanies}
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
          type: ACTIONS.LISTSUGGESTS,
          suggests: docs,
          infosSuggests: infos,
      })
    })
    .catch(error => {
      console.log(error);
    });
  }
}
export const listCompanies = (page, nOfItems) => {
  return dispatch => {
    api.get(`/adm/company?page=${page}&limit=${nOfItems}`)
    .then(Response => {
      const { docs, infos } = Response.data;
      dispatch({
          type: ACTIONS.LISTCOMPANIES,
          companies: docs,
          infosCompanies: infos,
      })
    })
    .catch(error => {
      console.log(error);
    });
  }
}