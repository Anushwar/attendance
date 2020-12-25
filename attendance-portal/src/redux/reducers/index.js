import { combineReducers } from 'redux';
import adminData from './admin';
import teacherData from './teacher';
import studentData from './student';

const reducer = combineReducers({
  adminData,
  teacherData,
  studentData,
});

export default reducer;
