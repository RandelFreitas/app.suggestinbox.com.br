import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { clientReducer } from './clientReducer';
import { authReducer } from './authReducer';
import { companyReducer } from './companyReducer';
import { suggestReducer } from './suggestReducer';
import { promoReducer } from './promoReducer';
import { menuReducer } from './menuReducer';
import { messageReducer } from './messageReducer';
import { callReducer } from './callReducer';
import { notificationReducer } from './notificationReducer';
import { userReducer } from './userReducer';

const mainReducer = combineReducers({
  auth: authReducer,
  client: clientReducer,
  user: userReducer,
  company: companyReducer,
  suggest: suggestReducer,
  menu: menuReducer,
  promo: promoReducer,
  call: callReducer,
  message: messageReducer,
  notification: notificationReducer,
});

export const store = applyMiddleware(thunk)(createStore)(mainReducer);