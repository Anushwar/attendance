import {
  UPDATE_TEACHER_USER,
  LOAD_TEACHER_COURSES,
  LOAD_TEACHER_COURSES_TODAY,
  LOAD_TEACHER_COURSE_DETAILS,
} from '../actions';

const teacherReducer = (
  state = {
    course: {
      semester: '',
      section: '',
      courseName: '',
      courseDescription: '',
    },
  },
  action
) => {
  switch (action.type) {
    case UPDATE_TEACHER_USER:
      return { ...state, user: action.user };
    case LOAD_TEACHER_COURSES:
      return { ...state, courses: action.courses };
    case LOAD_TEACHER_COURSES_TODAY:
      return { ...state, coursesToday: action.courses };
    case LOAD_TEACHER_COURSE_DETAILS:
      return { ...state, course: action.course };
    default:
      return state;
  }
};

export default teacherReducer;
