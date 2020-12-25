import axios from './axios';

// eslint-disable-next-line import/prefer-default-export
export const postAdminLogin = (aid, password) =>
  axios.post('/auth/admin/login', { aid, password });

export const postAdminRegisterTeacher = (tid, name, password) =>
  axios.post('/admins/teachers', { tid, name, password });

export const postAdminRegisterStudent = (uid, name, password) =>
  axios.post('/admins/students', { uid, name, password });
