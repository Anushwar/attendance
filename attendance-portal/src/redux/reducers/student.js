import {
  UPDATE_STUDENT_USER,
  LOAD_STUDENT_COURSE_DETAILS,
  LOAD_STUDENT_COURSES,
  LOAD_STUDENT_COURSE_ATTENDANCE,
} from '../actions';

const studentReducer = (
  state = { course: { courseName: '' }, attendance: [] },
  action
) => {
  switch (action.type) {
    case UPDATE_STUDENT_USER:
      return { ...state, user: action.user };
    case LOAD_STUDENT_COURSES:
      return { ...state, courses: action.courses };
    case LOAD_STUDENT_COURSE_DETAILS:
      return { ...state, course: action.course };
    case LOAD_STUDENT_COURSE_ATTENDANCE:
      return { ...state, attendance: action.attendance };
    default:
      return state;
  }
};

export default studentReducer;
