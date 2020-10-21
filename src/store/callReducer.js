import api from '../services/api';
import history from '../services/history';
import { showMessage } from './messageReducer';

const ACTIONS = {
  LIST_CALLS: 'LISTCALLS',
  BY_ID_CALL: 'BYIDCALL',
  ADD_CALL: 'ADDCALL',
  UPDATE_CALL: 'UPDATECALL',
  DELETE_CALL: 'DELETECALL',
}
const INITIAL_STATE = {
  calls: [],
  infosCalls: [],
  callById: [],
}
export const callReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case ACTIONS.LIST_CALLS:
      return {...state, calls: action.calls, infosCalls: action.infosCalls}
    case ACTIONS.ADD_CALL:
      return {...state}
    case ACTIONS.BY_ID_CALL:
      return {...state, callById: action.callById}
    case ACTIONS.UPDATE_CALL:
      return state;
    case ACTIONS.DELETE_CALL:
      const id = action.id;
      const calls = state.calls.filter( call => call._id !== id);
      return {...state, calls: calls}
    default:
      return state;
  }
}
//LISTAR CALLS
export const listCalls = (page, nOfItems) => {
  return dispatch => {
    api.get(`/adm/all-calls?page=${page}&limit=${nOfItems}`)
    .then(Response => {
      const { docs, infos } = Response.data;
      dispatch({
        type: ACTIONS.LIST_CALLS,
        calls: docs,
        infosCalls: infos,
      })
    })
    .catch(error => {
      dispatch(
        showMessage("Servidor indisponível, tente mais tarde!"),
        console.log(error)
      )
    });
  }
}
//GET BY ID CALL
export const getCallById = (id) => {
  return dispatch => {
    api.get(`/adm/call/${id}`)
    .then(Response => {
      dispatch({
        type: ACTIONS.BY_ID_CALL,
        callById: Response.data,
      })
    })
    .catch(error => {
      dispatch(
        showMessage("Servidor indisponível, tente mais tarde!"),
        console.log(error)
      )
    });
  }
}
//UPDATE CALL
export const updateCall = (company, id, idUser) => {
  return dispatch => {
    api.put(`/adm/call/${id}`, company)
    .then(Response => {
      dispatch({
        type: ACTIONS.UPDATE_CALL,
      })
    }, history.push(`/suggest/call/?${idUser}/?${id}?page=1&limit=25`))
    .catch(error => {
      dispatch(
        showMessage("Servidor indisponível, tente mais tarde!"),
        console.log(error)
      )
    });
  }
}
//DELETE CALL
export const destroyCall = (idCall) => {
  return dispatch => {
    api.delete(`/adm/call/${idCall}`)
    .then(Response => {
      dispatch({
        type: ACTIONS.DELETE_CALL,
        id: idCall
      });
      if(Response.data.msg){
        dispatch(
          showMessage(Response.data.msg)
        )
      }
    })
    .catch(error => {
      dispatch(
        showMessage("Servidor indisponível, tente mais tarde!"),
        console.log(error)
      )}
    );
  }
}