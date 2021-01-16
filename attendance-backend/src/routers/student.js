const express = require('express');
const {
  getMyStudentDetailsController,
  getAllStudentCoursesController,
  getStudentCourseDetailsFromClassController,
  getStudentAttendanceDetailsController,
} = require('../controllers/StudentController');
const { studentAuth } = require('../middlewares/auth');

const router = express.Router();
router.use(studentAuth);

/**
 * path : /students/details
 *
 * request  :  EMPTY
 *
 * response :  200 OK Response
 */
router.get('/details', getMyStudentDetailsController);

/**
 * path : /students/courses
 *
 * request  :  EMPTY
 *
 * response :  200 OK Response
 */
router.get('/courses', getAllStudentCoursesController);

/**
 * path : /students/attendances/:courseID
 *
 * request  : COURSE - details
 *
 * response :  200 OK Response
 */
router.get('/courses/:courseID/attendances', getStudentAttendanceDetailsController);

/**
 * path : /students/courses/:courseID
 *
 * request  : COURSE - details
 *
 * response :  200 OK Response
 */
router.get('/courses/:courseID', getStudentCourseDetailsFromClassController);

module.exports = router;
