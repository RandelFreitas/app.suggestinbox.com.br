import api from '../../../services/api';
import history from '../../../services/history';
import { showMessage } from '../../sharedStores/messageReducer';

const ACTIONS = {
  LIST_COMPANIES: 'LIST_COMPANIES',
  BY_ID_COMPANY: 'BY_ID_COMPANY',
  UPDATE_COMPANY: 'UPDATE_COMPANY',
  CLEAN_COMPANY: 'CLEAN_COMPANY',
  ADD_COMPANY: 'ADD_COMPANY',
}
const INITIAL_STATE = {
  companies: [],
  companyById: [],
  suggest: []
}
export const companyReducer = (state = INITIAL_STATE, action) => {
  switch(action.type){
    case ACTIONS.LIST_COMPANIES:
      return {...state, companies: action.companies}
    case ACTIONS.ADD_COMPANY:
      return {...state}
    case ACTIONS.BY_ID_COMPANY:
      return {...state, companyById: action.companyById}
    case ACTIONS.UPDATE_COMPANY:
      return {...state, companyById: action.companyById};
    case ACTIONS.CLEAN_COMPANY:
      return {...state, companyById: []}
    default:
      return state;
  }
}
//LISTAR COMPANIAS POR USUÁRIO
export const getCompanies = () => {
  return dispatch => {
    api.get(`/user/companies`)
    .then(Response => {
      dispatch({
        type: ACTIONS.LIST_COMPANIES,
        companies: Response.data,
      });
    }).catch(error => {
      if(error.response){
        dispatch(
          showMessage(error.response.data.err),
        )
      }else{
        dispatch(
          showMessage("Servidor indisponível, tente mais tarde!"),
        );
      }
    });
  }
}
//ADICIONAR COMPANY
export const addCompany = (company, idUser) => {
  return dispatch => {
    api.post('/user/company', company)
    .then(Response => {
      dispatch({
        type: ACTIONS.ADD_COMPANY,
      });
      dispatch(
        showMessage(Response.data.success),
      );
      history.push(`/user/?${idUser}`);
    }).catch(error => {
      if(error.response){
        dispatch(
          showMessage(error.response.data.err),
        )
      }else{
        dispatch(
          showMessage("Servidor indisponível, tente mais tarde!"),
        );
      };
    });
  }
}
//GET BY ID COMPANY
export const getCompanyById = (idCompany) => {
  return dispatch => {
    api.get(`/user/company/${idCompany}`)
    .then(Response => {
      dispatch({
        type: ACTIONS.BY_ID_COMPANY,
        companyById: Response.data,
      })
    }).catch(error => {
      if(error.response){
        dispatch(
          showMessage(error.response.data.err),
        )
      }else{
        dispatch(
          showMessage("Servidor indisponível, tente mais tarde!"),
        );
      }
    })
  }
}
//UPDATE COMPANY / CALL, SUGGEST, MENU...
export const updateCompany = (company, idCompany, idUser) => {
  return dispatch => {
    api.patch(`/user/company/${idCompany}`, company)
    .then(Response => {
      dispatch({
        type: ACTIONS.UPDATE_COMPANY,
        companyById: Response.data,
      });
      history.push(`/suggest/?${idUser}/?${idCompany}?page=1&limit=25`);
    }).catch(error => {
      if(error.response){
        dispatch(
          showMessage(error.response.data.err),
        )
      }else{
        dispatch(
          showMessage("Servidor indisponível, tente mais tarde!"),
        );
      }
    });
  }
}
//LIMPAR CAMPOS COMPANY NAS ATAULIZAÇÕES
export const cleanCompany = () => {
  return {
    type: ACTIONS.CLEAN_COMPANY,
  }
}