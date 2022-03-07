import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './root-reducer';

const middleware = applyMiddleware(thunk);

export const rootStore = createStore(rootReducer, middleware);
