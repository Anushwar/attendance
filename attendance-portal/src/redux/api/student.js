import axios from './axios';

// eslint-disable-next-line import/prefer-default-export
export const postStudentLogin = (uid, password) =>
  axios.post('/auth/students/login', { uid, password });

export const getStudentCourses = () => axios.get('/students/courses');

export const getStudentCourseDetails = (courseID) =>
  axios.get(`/students/courses/${courseID}`);
