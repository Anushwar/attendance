const express = require('express');
const {
  postAdminTeacherRegisterController,
  postAdminCreateCourseController,
  getAdminAllTeachersController,
  postAdminCreateClassController,
  getAdminAllCourseController,
  getAdminAllClassesController,
  postAdminCreateEnrollmentController,
  getAdminAllEnrollmentController,
  postAdminStudentRegisterController,
  postAdminCreateSlotController,
  getAdminAllSlotsController,
  getAdminTimetableFromClassController,
  postAdminCreateTimetableEntryFromClassController,
  getAdminCoursesFromClassController,
  postAdminCreateEnlitmentController,
  getAdminAllEnlistmentController,
  getAdminAllStudentsController,
} = require('../controllers/AdminController');
const { adminAuth } = require('../middlewares/auth');

const router = express.Router();
router.use(adminAuth);

/**
 * path : /admins/teachers
 *
 * request  :  { tid, name, password }
 *
 * response :  201 CREATED RESPONSE-USER
 */
router.post('/teachers', postAdminTeacherRegisterController);

/**
 * path : /admins/teachers
 *
 * request  :  {}
 *
 * response :  200 OK RESPONSE-TEACHER-LIST
 */
router.get('/teachers', getAdminAllTeachersController);

/**
 * path: /admins/courses
 *
 * request : { courseCode,courseName,courseHoursLecture, courseHoursTutorial,
 *              courseHoursPractical, courseCredits, courseDescription  }
 *
 * response: 201 CREATED RESPONSE-COURSE
 */
router.post('/courses', postAdminCreateCourseController);

/**
 * path : /admins/courses
 *
 * request  :  {}
 *
 * response :  200 OK RESPONSE-COURSE-LIST
 */
router.get('/courses', getAdminAllCourseController);

/**
 * path: /admins/classes
 *
 * request : { classID, semester, section, tid }
 *
 * response: 201 CREATED RESPONSE-COURSE
 */
router.post('/classes', postAdminCreateClassController);

/**
 * path : /admins/classes
 *
 * request  :  {}
 *
 * response :  200 OK RESPONSE-CLASS-LIST
 */
router.get('/classes', getAdminAllClassesController);

/**
 * path : /classes/:classID/timetables
 *
 * request  :  param:classID
 *
 * response :  200 OK RESPONSE-CLASS-LIST
 */
router.get('/classes/:classID/timetables', getAdminTimetableFromClassController);

/**
 * path : /classes/:classID/timetables
 *
 * request  :  param:classID
 *
 * response :  200 OK RESPONSE-CLASS-LIST
 */
router.post('/classes/:classID/timetables', postAdminCreateTimetableEntryFromClassController);

/**
 * path : /classes/:classID/courses
 *
 * request  :  param:classID
 *
 * response :  200 OK RESPONSE-CLASS-LIST
 */
router.get('/classes/:classID/courses', getAdminCoursesFromClassController);

/** enrollment section */
/**
 * path: /admins/enrollments
 *
 * request : { classID, semester, section, tid }
 *
 * response: 201 CREATED RESPONSE-COURSE
 */
router.post('/enrollments', postAdminCreateEnrollmentController);

/**
 * path : /admins/classes
 *
 * request  :  {}
 *
 * response :  200 OK RESPONSE-CLASS-LIST
 */
router.get('/enrollments', getAdminAllEnrollmentController);

/** student section */
/**
 * path : /admins/students
 *
 * request  :  { uid, name, password }
 *
 * response :  201 CREATED RESPONSE-USER
 */
router.post('/students', postAdminStudentRegisterController);

/** slot section */
/**
 * path : /admins/slots
 *
 * request  :  { name, startDate, endDate }
 *
 * response :  201 CREATED RESPONSE-USER
 */
router.post('/slots', postAdminCreateSlotController);

/**
 * path : /admins/slots
 *
 * request  :  { name, startDate, endDate }
 *
 * response :  201 CREATED RESPONSE-USER
 */
router.get('/slots', getAdminAllSlotsController);
/**
 * path : /admins/students
 *
 * request  :  { uid, name, password }
 *
 * response :  200 OK RESPONSE
 */
router.get('/students', getAdminAllStudentsController);

/**
 * path: /admins/enlistments
 *
 * request : { classID, semester, section, tid }
 *
 * response: 201 CREATED RESPONSE-COURSE
 */
router.post('/enlistments', postAdminCreateEnlitmentController);

/**
 * path : /admins/enlistments
 *
 * request  :  {}
 *
 * response :  200 OK RESPONSE-CLASS-LIST
 */
router.get('/enlistments', getAdminAllEnlistmentController);

module.exports = router;
