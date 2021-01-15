export const UPDATE_STUDENT_USER = 'UPDATE_STUDENT_USER';

export const LOAD_STUDENT_COURSES = 'LOAD_STUDENT_COURSES';

export const LOAD_STUDENT_COURSE_DETAILS = 'LOAD_STUDENT_COURSE_DETAILS';

export const updateStudentUser = (user) => ({
  type: UPDATE_STUDENT_USER,
  user,
});

export const loadStudentCourses = (courses) => ({
  type: LOAD_STUDENT_COURSES,
  courses,
});

export const loadStudentCourseDetails = (course) => ({
  type: LOAD_STUDENT_COURSE_DETAILS,
  course,
});
