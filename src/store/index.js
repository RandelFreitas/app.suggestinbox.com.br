import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { admReducer } from './admReducer';
import { authReducer } from './authReducer';
import { messageReducer } from './messageReducer';
import { suggestReducer } from './suggestReducer';
import { userReducer } from './userReducer';
import { companyReducer } from './companyReducer';

const mainReducer = combineReducers({
  adm: admReducer,
  auth: authReducer,
  message: messageReducer,
  company: companyReducer,
  suggest: suggestReducer,
  user: userReducer,
});

export const store = applyMiddleware(thunk)(createStore)(mainReducer);