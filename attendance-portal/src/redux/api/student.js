import axios from './axios'

export const getStudentDetails = () => axios.get('/students/details');