import axios from './axios';

// eslint-disable-next-line import/prefer-default-export
export const getStudentDetails = () => axios.get('/students/details');
