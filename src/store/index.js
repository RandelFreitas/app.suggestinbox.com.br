import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { clientReducer } from './clientReducer';
import { authReducer } from './authReducer';
import { userReducer } from './userReducer';
import { admReducer } from './admReducer';
import { messageReducer } from './messageReducer';

const mainReducer = combineReducers({
  adm: admReducer,
  auth: authReducer,
  message: messageReducer,
  user: userReducer,
  client: clientReducer,
});

export const store = applyMiddleware(thunk)(createStore)(mainReducer);