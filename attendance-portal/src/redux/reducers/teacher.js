import {
  UPDATE_TEACHER_USER,
  LOAD_TEACHER_COURSES,
  LOAD_TEACHER_COURSES_TODAY,
} from '../actions';

const teacherReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_TEACHER_USER:
      return { ...state, user: action.user };
    case LOAD_TEACHER_COURSES:
      return { ...state, courses: action.courses };
    case LOAD_TEACHER_COURSES_TODAY:
      return { ...state, coursesToday: action.courses };
    default:
      return state;
  }
};

export default teacherReducer;
