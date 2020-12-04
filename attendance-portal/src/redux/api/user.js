import axios from './axios';

export const postAdminRegister = (uid, name, role, password) =>
  axios.post('/users/admins/register', { uid, name, role, password });

export const postAdminLogin = (uid, password) =>
  axios.post('/users/admins/login', { uid, password });
