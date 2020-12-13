import { combineReducers } from 'redux';
import adminData from './admin';
import teacherData from './teacher';

const reducer = combineReducers({
  adminData,
  teacherData,
});

export default reducer;
