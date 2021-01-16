import {
  UPDATE_TEACHER_USER,
  LOAD_TEACHER_COURSES,
  LOAD_TEACHER_COURSES_TODAY,
  LOAD_TEACHER_COURSE_DETAILS,
  LOAD_TEACHER_ATTENDANCES,
  LOAD_TEACHER_STUDENTS,
} from '../actions';

const teacherReducer = (
  state = {
    course: {
      semester: '',
      section: '',
      courseName: '',
      courseDescription: '',
    },
    attendances: [],
    students: [],
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
    case LOAD_TEACHER_ATTENDANCES:
      return { ...state, attendances: action.attendances };
    case LOAD_TEACHER_STUDENTS:
      return { ...state, students: action.students };
    default:
      return state;
  }
};

export default teacherReducer;
