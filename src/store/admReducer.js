import api from '../services/api';
//import history from '../services/history';

const ACTIONS = {
  LISTSUGGESTS: 'LISTSUGGESTS',
  LISTCOMPANIES: 'LISTCOMPANIES',
  FAVORITE: 'FAVORITE',
  TOFILE: 'TOFILE'
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
    case ACTIONS.FAVORITE:
      const listUp = [...state.suggests]
      listUp.forEach(suggest => {
        if(suggest._id === action._id){
          suggest.favorite = true;
        }
      })
      return {...state, suggests: listUp}
    case ACTIONS.TOFILE:
      const listUpOut = [...state.suggests]
      listUpOut.forEach(suggest => {
        if(suggest._id === action._id){
          suggest.outlier = true;
        }
      })
      return {...state, suggests: listUpOut}
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
export const favorite = (suggest) => {
  return dispatch => {
    api.put(`/adm/suggest/${suggest._id}`, suggest )
    .then(Response => {
      dispatch({
        type: ACTIONS.FAVORITE,
        id: suggest._id
      })
    })
  }
}
export const outlier = (suggest) => {
  return dispatch => {
    api.put(`/adm/suggest/${suggest._id}`, suggest )
    .then(Response => {
      dispatch({
        type: ACTIONS.TOFILE,
        id: suggest._id
      })
    })
  }
}