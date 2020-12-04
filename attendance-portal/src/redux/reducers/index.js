import { combineReducers } from 'redux';
import userReducer from './user';

const reducer = combineReducers({
  userData: userReducer,
});

export default reducer;
