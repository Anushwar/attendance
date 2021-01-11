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

module.exports = router;
