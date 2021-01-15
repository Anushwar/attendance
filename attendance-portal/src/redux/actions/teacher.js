export const UPDATE_TEACHER_USER = 'UPDATE_TEACHER_USER';

export const LOAD_TEACHER_COURSES = 'LOAD_TEACHER_COURSES';

export const LOAD_TEACHER_COURSES_TODAY = 'LOAD_TEACHER_COURSES_TODAY';

export const LOAD_TEACHER_COURSE_DETAILS = 'LOAD_TEACHER_COURSE_DETAILS';

export const updateTeacherUser = (user) => ({
  type: UPDATE_TEACHER_USER,
  user,
});

export const loadTeacherCourses = (courses) => ({
  type: LOAD_TEACHER_COURSES,
  courses,
});

export const loadTeacherCoursesToday = (courses) => ({
  type: LOAD_TEACHER_COURSES_TODAY,
  courses,
});

export const loadTeacherCourseDetails = (course) => ({
  type: LOAD_TEACHER_COURSE_DETAILS,
  course,
});
