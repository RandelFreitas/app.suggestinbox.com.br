import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { clientReducer } from './clientStores/clientReducer';
import { authReducer } from './authStores/authReducer';
import { companyReducer } from './userStores/companyStores/companyReducer';
import { suggestReducer } from './userStores/companyStores/suggestReducer';
import { promoReducer } from './userStores/companyStores/promoReducer';
import { menuReducer } from './userStores/companyStores/menuReducer';
import { messageReducer } from './sharedStores/messageReducer';
import { callReducer } from './userStores/companyStores/callReducer';
import { notificationReducer } from './sharedStores/notificationReducer';
import { userReducer } from './userStores/userStores/userReducer';

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