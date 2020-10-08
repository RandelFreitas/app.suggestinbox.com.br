import api from '../services/api';

const ACTIONS = {
  LIST_PROMO: 'LISTPROMO',
  BY_ID_PROMO: 'BYIDPROMO',
  UPDATE_PROMO: 'UPDATEPROMO',
  ADD_PROMO: 'ADDPROMO',
}
const INITIAL_STATE = {
  promo: [],
  promoById: [],
}
export const promoReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case ACTIONS.ATV_PROMO:
      return {...state, companyById: action.companyById}
    default:
      return state;
  }
}
