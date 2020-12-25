const express = require('express');
const {
  postAdminTeacherRegisterController,
  postAdminCreateCourseController,
  getAdminAllTeachersController,
  postAdminCreateClassController,
  getAdminAllCourseController,
  getAdminAllClassesController,
  postAdminCreateEnrollmentController,
} = require('../controllers/AdminController');
const { adminAuth } = require('../middlewares/auth');
const { getAllEnrollment } = require('../sql/enrollments');

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
router.get('/enrollments', getAllEnrollment);

module.exports = router;
