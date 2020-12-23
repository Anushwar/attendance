import axios from './axios';

// eslint-disable-next-line import/prefer-default-export
export const postAdminLogin = (aid, password) =>
  axios.post('/auth/admin/login', { aid, password });

export const postAdminRegisterTeacher = (tid, name, password) =>
  axios.post('/admins/teachers', { tid, name, password });

export const getAdminTeachers = () => axios.get('/admins/teachers');

export const postAdminCreateCourse = (
  courseCode,
  courseName,
  courseHoursLecture,
  courseHoursTutorial,
  courseHoursPractical,
  courseCredits,
  courseDescription
) =>
  axios.post('/admins/courses', {
    courseCode,
    courseName,
    courseHoursLecture,
    courseHoursTutorial,
    courseHoursPractical,
    courseCredits,
    courseDescription,
  });

export const postAdminCreateClass = (courseID, semester, section, tid) =>
  axios.post('/admins/classes', { courseID, semester, section, tid });
