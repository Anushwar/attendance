import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
import middlewares from './middlewares';

const composedEnhancer = composeWithDevTools(middlewares);

const store = createStore(reducers, {}, composedEnhancer);

export default store;
