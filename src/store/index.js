import { combineReducers } from 'redux';
import { createStore } from 'redux'

import { admReducer } from './admReducer';

const mainReducer = combineReducers({
    adm: admReducer,
});

export const store = createStore(mainReducer);