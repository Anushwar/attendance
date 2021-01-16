const express = require('express');
const {
  getMyTeacherDetailsController,
  getAllTeacherCoursesController,
  getAllTeacherCoursesForTodayController,
  getTeacherCourseDetailsFromClassController,
  getTeacherAttendanceFromClassController,
  getTeacherStudentFromClassController,
  getTeacherAttendanceDetailsController,
  getTeacherAllAttendanceOfStudent,
  postTeacherAttendanceController,
} = require('../controllers/TeacherController');
const { teacherAuth } = require('../middlewares/auth');

const router = express.Router();
router.use(teacherAuth);

/**
 * path : /teachers/me
 *
 * request  :  EMPTY
 *
 * response :  200 OK Response
 */
router.get('/me', getMyTeacherDetailsController);

/**
 * path : /teachers/courses
 *
 * request  : EMPTY
 *
 * response :  200 OK Response
 */
router.get('/courses', getAllTeacherCoursesController);

/**
 * path : /teachers/todays/courses
 *
 * request  : EMPTY
 *
 * response :  200 OK Response
 */
router.get('/todays/courses', getAllTeacherCoursesForTodayController);

/**
 * path : /classes/:classID/courses/:courseID/attendances
 *
 * request  : Attendance-List
 *
 * response :  200 OK Response
 */
router.get('/classes/:classID/courses/:courseID/attendances', getTeacherAttendanceFromClassController);

/**
 * path : /classes/:classID/courses/:courseID/attendances/:attendanceID
 *
 * request  : Attendance-List
 *
 * response :  200 OK Response
 */
router.get('/classes/:classID/courses/:courseID/attendances/:attendanceID', getTeacherAttendanceDetailsController);

/**
 * path : /classes/:classID/courses/:courseID/students
 *
 * request  : COURSE - details
 *
 * response :  200 OK Response
 */
router.get('/classes/:classID/courses/:courseID/students', getTeacherStudentFromClassController);

/**
 * path : /classes/:classID/courses/:courseID
 *
 * request  : COURSE - details
 *
 * response :  200 OK Response
 */
router.get('/classes/:classID/courses/:courseID', getTeacherCourseDetailsFromClassController);

/**
 * path : /attendances/:attendancesID
 *
 * request  : attendance
 *
 * response :  200 OK Response
 */
router.get('/attendances/:attendanceID', getTeacherAllAttendanceOfStudent);

/**
 * path : /attendances/
 *
 * request  : attendance
 *
 * response :  2101 Created Response
 */
router.post('/attendances', postTeacherAttendanceController);

module.exports = router;
