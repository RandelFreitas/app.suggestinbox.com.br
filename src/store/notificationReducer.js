import api from '../services/api';

const ACTIONS = {
  LIST_NOTIFICATION: 'LIST_NOTIFICATION',
  DELETE_NOTIFICATION: 'DELETE_NOTIFICATION',
}
const INITIAL_STATE = {
  notifications: [],
}
export const notificationReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case ACTIONS.LIST_NOTIFICATION:
      return {...state, notification: action.notification}
    default:
      return state;
  }
}