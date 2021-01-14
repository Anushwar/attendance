import axios from './axios';

export const postAdminLogin = (aid, password) =>
  axios.post('/auth/admin/login', { aid, password });
// student section
export const postAdminRegisterStudent = (uid, name, password, classID) =>
  axios.post('/admins/students', { uid, name, password, classID });

export const getAdminStudentsList = () => axios.get('/admins/students');
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

export const getAdminTimetableOfClass = (classID) =>
  axios.get(`admins/classes/${classID}/timetables`);

export const postAdminTimetableOfClass = (classID, day, slotID, courseID) =>
  axios.post(`admins/classes/${classID}/timetables`, { day, slotID, courseID });

export const getAdminClassesList = () => axios.get('/admins/classes');

export const getAdminCoursesOfClass = (classID) =>
  axios.get(`admins/classes/${classID}/courses`);

// enrollment section
export const getAdminEnrollmentsList = () => axios.get('/admins/enrollments');

export const postAdminEnrollment = (classID, courseID, tid) =>
  axios.post('/admins/enrollments', { classID, courseID, tid });

// slot section
export const postAdminCreateSlot = (name, startTime, endTime) =>
  axios.post('/admins/slots', { name, startTime, endTime });

export const getAdminSlotList = () => axios.get('/admins/slots');
// enlistment section
export const getAdminEnlistmentsList = () => axios.get('/admins/enlistments');

export const postAdminEnlistment = (uid, courseID) =>
  axios.post('/admins/enlistments', { uid, courseID });
