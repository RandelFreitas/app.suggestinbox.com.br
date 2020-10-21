import api from '../services/api';
import { getCompanyById } from './companyReducer';
import { showMessage } from './messageReducer';

const ACTIONS = {
  LIST_SUGGESTS: 'LISTSUGGESTS',
  FAVORITE: 'FAVORITE',
  OUT_LINE: 'OUT_LINE',
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
    case ACTIONS.OUT_LINE:
      const id = action.id;
      const suggests1 = state.suggests.filter(suggest => suggest._id !== id) 
      return {...state, suggests: suggests1}
    default:
      return state;
  }
}
//*******************************************SUGGESTS*********************************************
//LISTAR SUGGESTS
export const listSuggest = (idUrl, page, limit, outlier, fromDate, toDate) => {
  return dispatch => {
    api.get(`/adm/all-suggest/${idUrl}?page=${page}&limit=${limit}&outlier=${outlier}&fromDate=${fromDate}&toDate=${toDate}`)
    .then(Response => {
      const { docs, infos } = Response.data;
      dispatch({
        type: ACTIONS.LIST_SUGGESTS,
        suggests: docs,
        infosSuggests: infos,
      })
    })
    .catch(error => {
      dispatch(
        showMessage("Servidor indisponível, tente mais tarde!"),
        console.log(error)
      )}
    );
  }
}
//FAVORITAR SUGGEST
export const favorite = (suggest) => {
  return dispatch => {
    api.put(`/adm/favorite-suggest/${suggest._id}`, suggest )
    .then(Response => {
      dispatch({
        type: ACTIONS.FAVORITE,
        id: suggest._id
      }) 
    })
    .catch(error => {
      dispatch(
        showMessage("Servidor indisponível, tente mais tarde!"),
        console.log(error)
      )}
    );
  }
}
//ARQUIVAR SUGGEST
export const outlier = (suggest) => {
  return dispatch => {
    api.put(`/adm/outlier-suggest/${suggest._id}`, suggest )
    .then(Response => {
      dispatch({
          type: ACTIONS.OUT_LINE,
          id: suggest._id
      })
    }).then(() => {
        dispatch(
          getCompanyById(suggest.companyId)
        )
      }
    )
    .catch(error => {
      dispatch(
        showMessage("Servidor indisponível, tente mais tarde!"),
        console.log(error)
      )}
    );
  }
}