import axios from './axios';

// eslint-disable-next-line import/prefer-default-export
export const postTeacherLogin = (tid, password) =>
  axios.post('/auth/teacher/login', { tid, password });

export const getMyTeacherDetails = () => axios.get('/teachers/me');

export const getTeacherCourses = () => axios.get('/teachers/courses');

export const getTeacherCoursesToday = () =>
  axios.get('/teachers/todays/courses');

export const getTeacherCourseDetails = (classID, courseID) =>
  axios.get(`/teachers/classes/${classID}/courses/${courseID}`);

export const getTeacherAttendances = (classID, courseID) =>
  axios.get(`/teachers/classes/${classID}/courses/${courseID}/attendances`);
