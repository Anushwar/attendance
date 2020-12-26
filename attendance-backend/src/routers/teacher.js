const express = require('express');
const { getMyTeacherDetailsController, getAllTeacherCoursesController } = require('../controllers/TeacherController');
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

module.exports = router;
