import api from '../services/api';
import history from '../services/history';
import { showMessage } from './messageReducer';

const ACTIONS = {
  LIST_COMPANIES: 'LIST_COMPANIES',
  BY_ID_COMPANY: 'BY_ID_COMPANY',
  UPDATE_COMPANY: 'UPDATE_COMPANY',
  ATV_COMPANY: 'ATV_COMPANY',
  CLEAN_COMPANY: 'CLEAN_COMPANY',
  ADD_COMPANY: 'ADD_COMPANY',
}
const INITIAL_STATE = {
  companies: [],
  companyById: [],
  infosCompanies: [],
  companyAtv: [],
  suggest: []
}
export const companyReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case ACTIONS.LIST_COMPANIES:
      return {...state, companies: action.companies, infosCompanies: action.infosCompanies}
    case ACTIONS.ADD_COMPANY:
      return {...state}
    case ACTIONS.BY_ID_COMPANY:
      return {...state, companyById: action.companyById}
    case ACTIONS.UPDATE_COMPANY:
      return {...state, companyById: action.companyById};
    case ACTIONS.CLEAN_COMPANY:
      return {...state, companyById: []}
    case ACTIONS.ATV_COMPANY:
      return {...state}
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
      });
      if(Response.data.error){
        dispatch(
          showMessage(Response.data.error),
        )
      }
    })
    .catch(error => {
      console.log(error);
    });
  }
}
//ADICIONAR COMPANY
export const addCompany = (company, idUser) => {
  return dispatch => {
    api.post('/adm/company', company)
    .then(Response => {
      dispatch({
        type: ACTIONS.ADD_COMPANY,
      });
      if(Response.data.error){
        dispatch(
          showMessage(Response.data.error)
        )
      }else{
        dispatch(
          showMessage("Companhia cadastrada com sucesso!")
        );
        history.push(`/user/?${idUser}?page=1&limit=25`)
      }
    })
    .catch(error => {
      dispatch(
        showMessage("Servido indisponivel, tente mais tarde!"),
        console.log(error)
      )
    });
  }
}
//GET BY ID COMPANY
export const getCompanyById = (idCompany) => {
  return dispatch => {
    api.get(`/adm/company/${idCompany}`)
    .then(Response => {
      dispatch({
        type: ACTIONS.BY_ID_COMPANY,
        companyById: Response.data,
      })
    })
    .catch(error => {
      dispatch(
        showMessage("Servido indisponivel, tente mais tarde!"),
        console.log(error)
      )
    })
  }
}
//UPDATE COMPANY
export const updateCompany = (company, idCompany, idUser) => {
  return dispatch => {
    api.put(`/adm/company/${idCompany}`, company)
    .then(Response => {
      dispatch({
        type: ACTIONS.UPDATE_COMPANY,
        companyById: Response.data,
      });
      if(Response.data.error){
        dispatch(
          showMessage(Response.data.error),
          history.push(`/suggest/?${idUser}/?${idCompany}?page=1&limit=25`)
        )
      }else{
        dispatch(
          showMessage('Companhia atualizada com sucesso!'),
          history.push(`/suggest/?${idUser}/?${idCompany}?page=1&limit=25`)
        )
      }
    })
    .catch(error => {
      dispatch(
        showMessage("Servido indisponivel, tente mais tarde!"),
        console.log(error)
      )
    });
  }
}
//LIMPAR CAMPOS COMPANY NAS ATAULIZAÇÕES
export const cleanCompany = () => {
  return {
    type: ACTIONS.CLEAN_COMPANY,
  }
}
//ATIVAR / DESATIVAR: MENU, PROMO, CALL
export const atvCompany = (company) => {
  return dispatch => {
    api.put(`/adm/company/${company._id}`, company)
    .then(Response => {
      dispatch({
        type: ACTIONS.ATV_COMPANY,
      });
      if(Response.data.error){
        dispatch(
          showMessage(Response.data.error)
        )
      }
    })
    .catch(error => {
      dispatch(
        showMessage("Servido indisponivel, tente mais tarde!"),
        console.log(error)
      )
    })
  }
}