import axios from './axios';

// eslint-disable-next-line import/prefer-default-export
export const postTeacherLogin = (tid, password) =>
  axios.post('/auth/teacher/login', { tid, password });

export const getMyTeacherDetails = () => axios.get('/teachers/me');
