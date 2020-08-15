import api from '../services/api';

const ACTIONS = {
  GET_INFO: 'GET_INFO',
}

const INITIAL_STATE = {
  infos:[],
}

export const companyReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case ACTIONS.GET_INFO:
      return {...state, infos: action.infos}
    default:
      return state;
  }
}

export const getInfo = (id) => {
  return dispatch => {
    api.post('/infocompany', id)
    .then(Response => {
      dispatch({
          type: ACTIONS.GET_INFO,
          infos: Response.data,
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
}