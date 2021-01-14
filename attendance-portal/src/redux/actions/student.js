export const UPDATE_STUDENT_USER = 'UPDATE_STUDENT_USER';

export const LOAD_STUDENT_COURSES = 'LOAD_STUDENT_COURSES';

export const updateStudentUser = (user) => ({
  type: UPDATE_STUDENT_USER,
  user,
});

export const loadStudentCourses = (courses) => ({
  type: LOAD_STUDENT_COURSES,
  courses,
});
