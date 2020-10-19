import api from '../services/api';

const ACTIONS = {
  LIST_MENU: 'LISTMENU',
  ATV_MENU: 'ATVMENU'
}
const INITIAL_STATE = {
  menu: [],
  menuById: [],
}
export const menuReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case ACTIONS.LIST_MENU:
      return {...state, menu: action.menu, infosMenu: action.infosMenu}
    case ACTIONS.ADD_MENU:
      return {...state, menu: action.menu}
    case ACTIONS.BY_ID_MENU:
      return {...state, menuById: action.menuById}
    case ACTIONS.UPDATE_MENU:
      return state;
    default:
      return state;
  }
}
//LISTAR MENU
export const getMenu = (idCompany) => {
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
//ADICIONAR MENU
export const addMenu = (menu, id) => {
  return dispatch => {
    api.post('/adm/menu', menu)
    .then(Response => {
      dispatch({
        type: ACTIONS.ADD_MENU,
        menu: Response.data,
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
}
//GET BY ID MENU
export const getMenuById = (id) => {
  return dispatch => {
    api.get(`/adm/menu/${id}`)
    .then(Response => {
      dispatch({
        type: ACTIONS.BY_ID_MENU,
        menuById: Response.data,
      })
    })
    .catch(error => {
      console.log(error);
    })
  }
}
//UPDATE COMPANY
export const updateMenu = (menu, id, idUser) => {
  return dispatch => {
    api.put(`/adm/menu/${id}`, menu)
    .then(Response => {
      dispatch({
        type: ACTIONS.UPDATE_MENU,
        //company: Response.data
      })
    })
    .catch(error => {
      console.log(error)
    })
  }
}