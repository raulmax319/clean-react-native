import { combineReducers } from '@reduxjs/toolkit';
import { login } from './ducks';

export const rootReducer = combineReducers({
  login,
});
