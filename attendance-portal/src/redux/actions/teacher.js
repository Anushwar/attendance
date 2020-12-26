export const UPDATE_TEACHER_USER = 'UPDATE_TEACHER_USER';

export const LOAD_TEACHER_COURSES = 'LOAD_TEACHER_COURSES';

export const updateTeacherUser = (user) => ({
  type: UPDATE_TEACHER_USER,
  user,
});

export const loadTeacherCourses = (courses) => ({
  type: LOAD_TEACHER_COURSES,
  courses,
});
