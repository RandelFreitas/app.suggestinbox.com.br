import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { clientReducer } from './clientReducer';
import { authReducer } from './authReducer';
import { admReducer } from './admReducer';
import { menuReducer } from './menuReducer';
import { messageReducer } from './messageReducer';

const mainReducer = combineReducers({
  adm: admReducer,
  menu: menuReducer,
  auth: authReducer,
  message: messageReducer,
  client: clientReducer,
});

export const store = applyMiddleware(thunk)(createStore)(mainReducer);