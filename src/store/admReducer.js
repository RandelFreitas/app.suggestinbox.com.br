import api from '../services/api';
import history from '../services/history';

const ACTIONS = {
  //SUGGEST
  LIST_SUGGESTS: 'LISTSUGGESTS',
  FAVORITE: 'FAVORITE',
  TOFILE: 'TOFILE',
  //COMPANY
  LIST_COMPANIES: 'LISTCOMPANIES',
  BY_ID_COMPANY: 'BYIDCOMPANY',
  UPDATE_COMPANY: 'UPDATECOMPANY',
  CLEAN_COMPANY: 'CLEANCOMPANY',
  ADD_COMPANY: 'ADDCOMPANY',
  //USER
  BY_ID_USER: 'BYIDUSER',
  UPDATE_USER: 'UPDATEUSER',
}
const INITIAL_STATE = {
  //SUGGEST
  suggests: [],
  suggest: [],
  suggestById: [],
  infosSuggests: [],
  //COMPANY
  companies: [],
  company: [],
  infosCompanies: [],
  companyById: [],
  loadingCompany: false,
  //USER
  userById: [],
  loadingUser: false,
}
export const admReducer = (state = INITIAL_STATE, action) => {
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
    case ACTIONS.TOFILE:
      const listUpOut = [...state.suggests]
      listUpOut.forEach(suggest => {
        if(suggest._id === action._id){
          suggest.outlier = true;
        }
      })
      return {...state, suggests: listUpOut}
    //*********************COMPANIES*********************
    case ACTIONS.LIST_COMPANIES:
      return {...state, companies: action.companies, infosCompanies: action.infosCompanies}
    case ACTIONS.ADD_COMPANY:
      return {...state, company: action.company}
    case ACTIONS.BY_ID_COMPANY:
      return {...state, companyById: action.companyById, loadingCompany: action.loadingCompany}
    case ACTIONS.UPDATE_COMPANY:
      return state;
    case ACTIONS.CLEAN_COMPANY:
      return {...state, companyById: []}
    //*********************COMPANIES*********************
    case ACTIONS.BY_ID_USER:
      return {...state, userById: action.userById, loadingUser: action.loadingUser}
    case ACTIONS.UPDATE_USER:
      return state;
    //DEFAULT
    default:
      return state;
  }
}
//*******************************************SUGGESTS*********************************************
//LISTAR SUGGESTS
export const listSuggest = (page, nOfItems, idUrl) => {
  return dispatch => {
    api.get(`/adm/all-suggest/${idUrl}?page=${page}&limit=${nOfItems}`)
    .then(Response => {
      const { docs, infos } = Response.data;
      dispatch({
        type: ACTIONS.LIST_SUGGESTS,
        suggests: docs,
        infosSuggests: infos,
      })
    })
    .catch(error => {
      console.log(error);
    });
  }
}
//FAVORITAR SUGGEST
export const favorite = (suggest) => {
  return dispatch => {
    api.put(`/adm/suggest/${suggest._id}`, suggest )
    .then(Response => {
      dispatch({
        type: ACTIONS.FAVORITE,
        id: suggest._id
      })
    })
  }
}
//ARQUIVAR SUGGEST
export const outlier = (suggest) => {
  return dispatch => {
    api.put(`/adm/suggest/${suggest._id}`, suggest )
    .then(Response => {
      dispatch({
        type: ACTIONS.TOFILE,
        id: suggest._id
      })
    })
  }
}
//*******************************************COMPANIES*********************************************
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
        company: Response.data,
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
        loadingCompany: true,
      })
    })
    .catch(error => {
      console.log(error);
    })
  }
}
//UPDATE COMPANY
export const updateCompany = (company, id) => {
  return dispatch => {
    api.put(`/adm/company/${id}`, company)
    .then(Response => {
      dispatch({
        type: ACTIONS.UPDATE_COMPANY,
        //company: Response.data
      })
    }, history.push('/user'))
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
//*******************************************USER*********************************************
//GET BY ID USER
export const getUserById = (id) => {
  return dispatch => {
    api.get(`/adm/user/${id}`)
    .then(Response => {
      dispatch({
        type: ACTIONS.BY_ID_USER,
        userById: Response.data,
        loadingUser: true,
      })
    })
    .catch(error => {
      console.log(error);
    })
  }
}
//UPDATE USER
export const updateUser = (user, id) => {
  return dispatch => {
    api.put(`/adm/user/${id}`, user)
    .then(Response => {
      dispatch({
        type: ACTIONS.UPDATE_USER,
        //user: Response.data
      })
    }, history.push(`/user/?${id}?page=1&limit=25`))
    .catch(error => {
      console.log(error)
    })
  }
}