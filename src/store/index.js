import { combineReducers } from 'redux';
import { createStore } from 'redux'

import { admReducer } from './admReducer';
import { authReducer } from './authReducer';

const mainReducer = combineReducers({
  adm: admReducer,
  auth: authReducer,
});

export const store = createStore(mainReducer);