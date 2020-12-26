import axios from './axios';

export const postAdminLogin = (aid, password) =>
  axios.post('/auth/admin/login', { aid, password });
// student section
export const postAdminRegisterStudent = (uid, name, password) =>
  axios.post('/admins/students', { uid, name, password });

// teacher section
export const postAdminRegisterTeacher = (tid, name, password) =>
  axios.post('/admins/teachers', { tid, name, password });

export const getAdminTeachersList = () => axios.get('/admins/teachers');

// course section
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

export const getAdminCoursesList = () => axios.get('/admins/courses');

// class section
export const postAdminCreateClass = (classID, semester, section, tid) =>
  axios.post('/admins/classes', { classID, semester, section, tid });

export const getAdminClassesList = () => axios.get('/admins/classes');

// enrollment section
export const getAdminEnrollmentsList = () => axios.get('/admins/enrollments');

export const postAdminEnrollment = (classID, courseID, tid) =>
  axios.post('/admins/enrollments', { classID, courseID, tid });
