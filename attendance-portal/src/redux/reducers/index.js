import { combineReducers } from "redux";
import userReducer from "./user";
import studentReducer from './student';

const reducer = combineReducers({
  userData: userReducer,
  studentData: studentReducer,
});

export default reducer;
