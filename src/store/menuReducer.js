import api from '../services/api';

const ACTIONS = {
  LIST_MENU: 'LISTMENU',
  ATV_MENU: 'ATVMENU'
}
const INITIAL_STATE = {
  menu: [],
}
export const menuReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case ACTIONS.LIST_MENU:
      return {...state, menu: action.menu, infosMenu: action.infosMenu}
    case ACTIONS.ATV_MENU:
      const menuUp = [...state.menu];
      if(menuUp.atv === true){
        menuUp.atv = false;
      }else{
        menuUp.atv = true;
      }
      return {...state, menu: menuUp}
    default:
      return state;
  }
}
//LISTAR MENU
export const listMenu = (idCompany) => {
  return dispatch => {
    api.get(`/adm/menu/${idCompany}`)
    .then(Response => {
      const { docs } = Response.data;
      dispatch({
        type: ACTIONS.LIST_MENU,
        menu: docs,
      })
    })
    .catch(error => {
      console.log(error);
    });
  }
}
//ATIVAR MENU
export const atvMenu = (company, id, idUser) => {
  return dispatch => {
    api.put(`/adm/company/${id}`, company)
    .then(Response => {
      dispatch({
        type: ACTIONS.ATV_MENU,
      })
    })
  }
}