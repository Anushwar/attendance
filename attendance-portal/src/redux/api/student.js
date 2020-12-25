import axios from './axios';

export const getStudentDetails = () => axios.get('/students/details');

export const postStudentLogin = (uid, password) =>
  axios.post('/auth/students/login', { uid, password });
