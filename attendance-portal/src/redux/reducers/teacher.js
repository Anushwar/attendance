import {
  UPDATE_TEACHER_USER,
  LOAD_TEACHER_COURSES,
  LOAD_TEACHER_COURSES_TODAY,
  LOAD_TEACHER_COURSE_DETAILS,
  LOAD_TEACHER_ATTENDANCES,
  LOAD_TEACHER_STUDENTS,
  LOAD_TEACHER_ATTENDANCE_DETAILS,
  LOAD_TEACHER_STUDENT_ATTENDANCE,
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
    attendance: {
      date: '',
      semester: '',
      section: '',
      name: '',
      startTime: '',
      endTime: '',
      courseName: '',
      courseHoursLecture: '',
      courseHoursTutorial: '',
      courseHoursPractical: '',
      courseCredits: '',
      courseDescription: '',
    },
    student: [],
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
    case LOAD_TEACHER_ATTENDANCE_DETAILS:
      return { ...state, attendance: action.attendance };
    case LOAD_TEACHER_STUDENT_ATTENDANCE:
      return { ...state, student: action.student };
    default:
      return state;
  }
};

export default teacherReducer;
