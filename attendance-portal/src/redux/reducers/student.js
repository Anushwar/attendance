import { ADD_STUDENT_DETAILS, UPDATE_STUDENT_USER } from '../actions';

const studentReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_STUDENT_DETAILS:
      return { ...state, details: action.details };
    case UPDATE_STUDENT_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
};

export default studentReducer;
