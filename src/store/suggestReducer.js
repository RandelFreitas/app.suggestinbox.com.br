import api from '../services/api';
import history from '../services/history';

const ACTIONS = {
  LIST_SUGGESTS: 'LISTSUGGESTS',
  FAVORITE: 'FAVORITE',
  TOFILE: 'TOFILE',
}
const INITIAL_STATE = {
  suggests: [],
  suggestById: [],
  infosSuggests: [],
}

export const suggestReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    //*********************SUGGESTS*********************
    case ACTIONS.LIST_SUGGESTS:
      return {...state, suggests: action.suggests, infosSuggests: action.infosSuggests}
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
//*******************************************SUGGESTS*********************************************
//LISTAR SUGGESTS
export const listSuggest = (idUrl, page, limit, type, fromDate, toDate) => {
  return dispatch => {
    api.get(`/adm/all-suggest/${idUrl}?page=${page}&limit=${limit}&type=${type}&fromDate=${fromDate}&toDate=${toDate}`)
    .then(Response => {
      const { docs, infos } = Response.data;
      dispatch({
        type: ACTIONS.LIST_SUGGESTS,
        suggests: docs,
        infosSuggests: infos,
      })
    })
    .catch(error => {
      console.log(error);
    });
  }
}
//FAVORITAR SUGGEST
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
//ARQUIVAR SUGGEST
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