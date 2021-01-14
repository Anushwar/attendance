import { LOAD_STUDENT_COURSES, UPDATE_STUDENT_USER } from '../actions';

const studentReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_STUDENT_USER:
      return { ...state, user: action.user };
    case LOAD_STUDENT_COURSES:
      return { ...state, courses: action.courses };
    default:
      return state;
  }
};

export default studentReducer;
