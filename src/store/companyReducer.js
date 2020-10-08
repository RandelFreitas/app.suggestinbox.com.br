import api from '../services/api';
import history from '../services/history';

const ACTIONS = {
  LIST_COMPANIES: 'LISTCOMPANIES',
  BY_ID_COMPANY: 'BYIDCOMPANY',
  UPDATE_COMPANY: 'UPDATECOMPANY',
  ATV_MENU: 'ATVMENU',
  ATV_PROMO: 'ATVPROMO',
  CLEAN_COMPANY: 'CLEANCOMPANY',
  ADD_COMPANY: 'ADDCOMPANY',
}
const INITIAL_STATE = {
  companies: [],
  infosCompanies: [],
  companyById: [],
  companyAtv: [],
}
export const companyReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case ACTIONS.LIST_COMPANIES:
      return {...state, companies: action.companies, infosCompanies: action.infosCompanies}
    case ACTIONS.ADD_COMPANY:
      return {...state, companyById: action.companyById}
    case ACTIONS.BY_ID_COMPANY:
      return {...state, companyById: action.companyById}
    case ACTIONS.UPDATE_COMPANY:
      return state;
    case ACTIONS.ATV_MENU:
      return {...state, companyById: action.companyById}
    case ACTIONS.ATV_PROMO:
      return {...state, companyById: action.companyById}
    //DEFAULT
    default:
      return state;
  }
}
//LISTAR COMPANIAS
export const listCompanies = (page, nOfItems) => {
  return dispatch => {
    api.get(`/adm/company?page=${page}&limit=${nOfItems}`)
    .then(Response => {
      const { docs, infos } = Response.data;
      dispatch({
        type: ACTIONS.LIST_COMPANIES,
        companies: docs,
        infosCompanies: infos,
      })
    })
    .catch(error => {
      console.log(error);
    });
  }
}
//ADICIONAR COMPANY
export const addCompany = (company, id) => {
  return dispatch => {
    api.post('/adm/company', company)
    .then(Response => {
      dispatch({
        type: ACTIONS.ADD_COMPANY,
        companyById: Response.data,
      });
    }, history.push(`/user`))
    .catch(error => {
      console.log(error);
    });
  }
}
//GET BY ID COMPANY
export const getCompanyById = (id) => {
  return dispatch => {
    api.get(`/adm/company/${id}`)
    .then(Response => {
      dispatch({
        type: ACTIONS.BY_ID_COMPANY,
        companyById: Response.data,
      })
    })
    .catch(error => {
      console.log(error);
    })
  }
}
//UPDATE COMPANY
export const updateCompany = (company, id, idUser) => {
  return dispatch => {
    api.put(`/adm/company/${id}`, company)
    .then(Response => {
      dispatch({
        type: ACTIONS.UPDATE_COMPANY,
        //company: Response.data
      })
    }, history.push(`/suggest/?${idUser}/?${id}?page=1&limit=25`))
    .catch(error => {
      console.log(error)
    })
  }
}
//LIMPAR CAMPOS COMPANY
export const cleanCompany = () => {
  return {
    type: ACTIONS.CLEAN_COMPANY,
  }
}
//*******************************************PROMO*********************************************
//ATIVAR PROMO
export const atvPromo = (company) => {
  return dispatch => {
    api.put(`/adm/company/${company._id}`, company)
    .then(Response => {
      dispatch({
        type: ACTIONS.ATV_PROMO,
        companyById: company
      })
    })
  }
}
//*******************************************MENU*********************************************
//ATIVAR MENU
export const atvMenu = (company) => {
  return dispatch => {
    api.put(`/adm/company/${company._id}`, company)
    .then(Response => {
      dispatch({
        type: ACTIONS.ATV_MENU,
        companyById: company
      })
    })
  }
}